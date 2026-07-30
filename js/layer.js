const UPG_COUNT = 4000;
const automationReqs = [1e6, 100, 25, 15, 10, 6, 4, 3, 3]
const automationBuyablePrice = [1, 2, 4, 10, 50, 500, 5000]

// Pre-compute each upgrade's boost multiplier: upgEffects[n] = Decimal
// upgEffects[1] = 2
// upgEffects[n] = upgEffects[n-1] * (1.5 + 0.05*n + 0.0025*n^2)
const upgEffects = new Array(UPG_COUNT + 1);
{
    upgEffects[1] = new Decimal(2);
    for (let n = 2; n <= UPG_COUNT; n++) {
        let factor = 1.5 + 0.05 * n + 0.0025 * n * n;
        upgEffects[n] = upgEffects[n - 1].mul(factor);
    }
}
const totalUpgEffects = new Array(UPG_COUNT + 1);
{
    totalUpgEffects[0] = new Decimal(1);
    for (let n = 1; n <= UPG_COUNT; n++) {
        totalUpgEffects[n] = totalUpgEffects[n - 1].mul(upgEffects[n]);
    }
}

const timewallDuration = new Array(UPG_COUNT + 1);
{
    for (let n = 1; n <= UPG_COUNT; n++) {
        timewallDuration[n] = n / (1.1 ** Math.floor(n / 50));
    }
}

// Build a flat array of precomputed Decimal costs indexed by UpgNum (1-based)
// costs[N] = cost of upgradeN  (costs[0] unused)
const upgCosts = new Array(UPG_COUNT + 1);
{
    let runningPowerGen = new Decimal(1); // power gen before any upgrade
    for (let n = 1; n <= UPG_COUNT; n++) {
        // cost = n * (current power gen before buying this upg)
        upgCosts[n] = new Decimal(timewallDuration[n]).mul(runningPowerGen);
        // after buying upg n, power gen gets multiplied by upgEffects[n]
        runningPowerGen = runningPowerGen.mul(upgEffects[n]);
    }
}

// Returns the TMT upgrade ID for UpgNum n
function upgId(n) {
    return (Math.floor((n - 1) / 5) * 10 + ((n - 1) % 5 + 1)) + 10;
}

function getMaxUnlockedRow() {
    if (!player || !player.p) return 0;
    let maxRow = 0;
    let maxUnlockedRows = Math.floor((player.p.upsunlocked || 500) / 5);
    for (let r = 0; r < maxUnlockedRows; r++) {
        if (r === 0 || hasUpgrade("p", upgId(r * 5))) {
            maxRow = r;
        } else {
            break;
        }
    }
    return maxRow;
}

const upgDescriptions = new Array(UPG_COUNT + 1);

for (let n = 1; n <= UPG_COUNT; n++) {
    let added = "";
    if (n % 50 == 0)
        added = " [BONUS BOOST - FURTHER UPGRADES TAKE 10% SHORTER!]";

    upgDescriptions[n] =
        "Multiplies Power by " + format(upgEffects[n], 2) + "x." + added;
}

function buildUpgrades() {
    let upgs = {};
    for (let n = 1; n <= UPG_COUNT; n++) {
        let id = upgId(n);
        let cost = upgCosts[n];
        // The last upgrade of the previous row unlocks this row
        let row = Math.floor((n - 1) / 5);
        let prevRowLastId = row > 0 ? upgId(row * 5) : null;
        let added = ""
        if (n%50 == 0) added = " [BONUS BOOST - FURTHER UPGRADES TAKE 10% SHORTER!]"
        upgs[id] = {
            title: "Upgrade " + n,
            description: upgDescriptions[n],
            cost: cost,
            currencyInternalName: "points",
            currencyDisplayName: "Power",
            unlocked() {
                if (row >= Math.floor((player.p.upsunlocked) / 5)) return false;
                if (row >= Math.floor((UPG_COUNT) / 5)) return false;
                let visibleRows = Math.ceil(player.p.nextUpgToAuto / 5);

                if (row > (visibleRows-1)) return false;

                if (player.p.compactView) {
                    return row >= Math.max(0, player.p.maxUnlockedRow - 4);
                }
                return true;
            },
        };
    }
    return upgs;
}

addLayer("p", {
    name: "Upgrades",
    symbol: "⚡",
    color: "#FFAA00",
    row: 0,

    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            upsunlocked: 100,
            autoMult: new Decimal(1e6),
            nextUpgToAuto: 1,
            compactView: true,
            totalPresMulti: new Decimal(1),
            maxUnlockedRow: 0,
        };
    },

    layerShown() { return true; },

    tabFormat: {
        "Upgrades": {
            content: [
                ["display-text", function() {
                    return "You have <h2 style='color:#FFAA00;display:inline;'>" + notationChooser(player.points) + "</h2> Power"
                        + "<br>Power/sec: " + notationChooser(tmp.pointGen);
                }],
                "blank",
                ["clickables", [1]],
                "blank",
                "upgrades",
            ],
        },
        "PRESTIGE!": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                ["display-text",
                    function(){
                        let a = "Total Buyable Prestige Multiplier x"
                        a = a + player.p.totalPresMulti
                        return a + "   [NOTE THAT EACH PRESTIGE BUYABLE IS ADDITIVE!!]"
                    }
                ],
                "blank",
                "blank",
                "blank",
                "buyables",
            ],
        },
    },
    clickables: {
        11: {
            title() {
                return player.p.compactView ? "View Mode: Recent 5 Rows (ON)" : "View Mode: All Unlocked Rows (OFF)";
            },
            canClick() { return true; },
            onClick() {
                player.p.compactView = !player.p.compactView;
            },
            style() {
                return {
                    'min-width': '220px',
                    'padding': '6px 12px',
                    'font-size': '13px',
                    'font-weight': 'bold',
                };
            },
        },
    },
    automate() {
        // to only auto upgrade if and only if power>upgcost*(Value)
        let startN = player.p.nextUpgToAuto || 1;
        
        while (startN <= player.p.upsunlocked && hasUpgrade("p", upgId(startN))) {
            startN++;
        }
        player.p.nextUpgToAuto = startN
        
        for (let n = startN; n <= UPG_COUNT; n++) {
            let id = upgId(n);
            if (hasUpgrade("p", id)) continue
            
            let row = Math.floor((n - 1) / 5)
            if (row >= Math.floor(player.p.upsunlocked / 5)) break
            if (row > 0 && !hasUpgrade("p", upgId(row * 5))) break
            
            let cost = upgCosts[n]
            if (player.points.gt(cost.mul(player.p.autoMult))) {
                buyUpgrade("p", id)

                if (hasUpgrade("p", id)) {
                    player.p.nextUpgToAuto = n + 1
                } else {
                    break
                }
            } else {
                break
            }
        }
    },
    tooltip() {
        if (player.points.lte(1e10)) return "You have a long way to go..."
        if (player.points.lte(1e200)) return "A reset layer is looming..."
        if (player.points.lte("1e1500")) return "Prestige unveils itself! Should you, though..."
        if (player.points.lte("1e7500")) return "You are making good progress! Many more awaits..."
        if (player.points.lte("1e40000")) return "Does it feel a that it takes a long time to get upgrades?"
        if (player.points.lte("1e150000")) return "The boost is really helpful!"
        if (player.points.lte("1e400000")) return "You are doing great!"
        if (player.points.lte("1e1000000")) return "Keep on going!"
        if (player.points.lte("1e3000000")) return "Prestige, then rinse and repeat!"
        if (player.points.lte("1e7500000")) return "Dedication."
        if (player.points.lte("1e15000000")) return "A true master!"
        if (player.points.gte("1e15000000")) return "An absolute true master!"
    },
    upgrades: buildUpgrades(),
    requires: new Decimal("e200"), // Can be a function that takes requirement increases into account
    resource: "Prestiges", // Name of currency
    baseResource: "Power", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, 
    gainMult() { // Prestige multiplier
        let mult = player.p.totalPresMulti
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    canReset() {
        return tmp.p.baseAmount.gte(tmp.p.requires)
    },
    getResetGain() {
        if (player.points.lte(0)) return new Decimal(0)
        return (player.points.max(1).log(10).div(200)).mul(player.p.totalPresMulti).floor()
    },
    getNextAt() {
        let target = tmp.p.getResetGain.add(1)
        return Decimal.pow(10, target.mul(200).div(player.p.totalPresMulti))
    },
    onPrestige() {
        player.p.upgrades = []
        player.p.nextUpgToAuto = 1
    },
    buyables: {
        11: {
            title: "Multiply Aura Luck Significantly!",
            cost(x) {
                return new Decimal(1).mul(Decimal.pow(2, x)).floor()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Prestiges." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Multiply Aura luck by x" + notationChooser(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base1 = new Decimal(4)
                base2 = x
                expo = new Decimal(1)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
            tooltip() {
                return "x4 Aura Luck which translates to about an x1.15 multiplier."
            }
        },
        12: {
            title: "Better Auto",
            cost(x) {
                if (x <= 7) {
                    return new Decimal(automationBuyablePrice[x])
                } else {
                    return new Decimal("e1e6")
                }
            },
            display() {
                let x = getBuyableAmount(this.layer, this.id)
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Prestiges." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: To automate an upgrade, you need " + automationReqs[x.toNumber()] + "x >> " + automationReqs[x.toNumber()+1] + "x upgrade cost to autobuy."
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base1 = new Decimal(4)
                base2 = x
                expo = new Decimal(1)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
            tooltip() {
                return "Cost+Effect: 1Mx (free) -> 100x (1) -> 25x (2) -> 15x (4) -> 10x (10) -> 6x (50) -> 4x (500) -> 3x (5,000)."
            }
        },
        13: {
            title: "Surge Multiplier",
            cost(x) {
                return new Decimal(3).mul(Decimal.pow(1.9, x)).round()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Prestiges." + "<br>When you have not bought Upgrade " + (getBuyableAmount(this.layer, this.id)*50) + ", x" + notationChooser(buyableEffect(this.layer, this.id)) + " Power Multiplier"
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = new Decimal(1)
                if (x.gt(0)) {
                    eff = new Decimal(x).add(2)
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                return "Every buy increase upgrade max by 50 and multi by 1 (starts at 3 for first buy)"
            }
        },
        14: {
            title: "MORE!!",
            cost(x) {
                return new Decimal(1).mul(Decimal.pow(1.8, x)).round()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Prestiges." + "<br>Maximum Upgrade that can be unlocked: " + buyableEffect("p",14).add(100)
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                return x.mul(100)
            },
            tooltip() {
                return "Every buy increase upgrade max by 100"
            }
        },
        15: {
            title: "Greater Prestige",
            cost(x) {
                return new Decimal(4).mul(Decimal.pow(3, x)).round()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Prestiges." + "<br>Effect: +" + buyableEffect("p",15) + "% Prestiges"
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                return x.mul(30)
            },
            tooltip() {
                return "+30% Prestiges/level."
            }
        },
        16: {
            title: "Enhanced Prestige",
            cost(x) {
                return new Decimal(25).mul(Decimal.pow(5, x)).round()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Prestiges." + "<br>Effect: +" + buyableEffect("p",16) + "% Prestiges"
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                return x.mul(60)
            },
            tooltip() {
                return "+60% Prestiges/level."
            },
            unlocked() {return getBuyableAmount("p", 15).gte(1)}
        },
        17: {
            title: "Super Prestige",
            cost(x) {
                return new Decimal(250).mul(Decimal.pow(9, x)).round()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Prestiges." + "<br>Effect: +" + buyableEffect("p",17) + "% Prestiges"
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                return x.mul(110)
            },
            tooltip() {
                return "+110% Prestiges/level."
            },
            unlocked() {return getBuyableAmount("p", 16).gte(1)}
        },
        18: {
            title: "Insane Prestige",
            cost(x) {
                return new Decimal(5000).mul(Decimal.pow(12,x)).round()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Prestiges." + "<br>Effect: +" + buyableEffect("p",18) + "% Prestiges"
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                return x.mul(160)
            },
            tooltip() {
                return "+160% Prestiges/level."
            },
            unlocked() {return getBuyableAmount("p", 17).gte(1)}
        },
        19: {
            title: "Omega Prestige",
            cost(x) {
                return new Decimal(400000).mul(Decimal.pow(20, x)).round()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Prestiges." + "<br>Effect: +" + buyableEffect("p",19) + "% Prestiges"
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                return x.mul(280)
            },
            tooltip() {
                return "+280% Prestiges/level."
            },
            unlocked() {return getBuyableAmount("p", 18).gte(1)}
        },
    },
    prestigeButtonText() {
        if (tmp.p.canReset) {
            return "Prestige for " + formatWhole(tmp.p.resetGain) + " " + tmp.p.resource + "!<br>(Next at " + formatWhole(getNextAt("p")) + ")"
        }
        return "Reach " + formatWhole(tmp.p.requires) + " " + tmp.p.baseResource + " to prestige<br>(Next at " + formatWhole(getNextAt("p")) + ")"
    },
});


const FIXED_AURAS = [
    { name: "Nothing", rarity: 1, multi: 1.00 },
    { name: "Miniscule", rarity: 3, multi: 1.01 },
    { name: "Airy", rarity: 10, multi: 1.02 },
    { name: "Particles", rarity: 40, multi: 1.04 },
    { name: "Bad", rarity: 100, multi: 1.07 },
    { name: "Meh", rarity: 200, multi: 1.12 },
    { name: "Subpar", rarity: 500, multi: 1.17 },
    { name: "Fine", rarity: 1000, multi: 1.24 },
    { name: "Average", rarity: 2400, multi: 1.35 },
    { name: "Decent", rarity: 6000, multi: 1.49 },
    { name: "Good", rarity: 15000, multi: 1.66 },
    { name: "Great", rarity: 35000, multi: 1.80 },
    { name: "Awesome", rarity: 55000, multi: 1.90 },
    { name: "Radiating", rarity: 85000, multi: 2.00 },
];

const AURA_BASES = ["Volcanic", "Earthquake", "Mastered", "Superior", "Insane", "Beast", "Serpent", "Overlord"];
const AURA_SUFFIXES = ["Super", "Mega", "Ultra", "Omega", "Hyper", "Celestial", "Crazy", "Prismatic", "Transcendent", "Godly", "Otherworldly", "Omnipotent", "Absolute"];

function getAuraData(index) {
    if (index < FIXED_AURAS.length) {
        let f = FIXED_AURAS[index];
        return { name: f.name, rarity: new Decimal(f.rarity), multi: new Decimal(f.multi) };
    }
    let step = index - FIXED_AURAS.length;
    let rarity = new Decimal(100000).mul(new Decimal(2).pow(step));
    let multiVal = 1.8 * Math.pow(1.07, step + 1);
    let multi = new Decimal((Math.round(multiVal * 100) / 100).toFixed(2));
    
    let base = AURA_BASES[step % AURA_BASES.length];
    let suffix = AURA_SUFFIXES[Math.floor(step / AURA_BASES.length) % AURA_SUFFIXES.length];
    let tier = Math.floor(step / (AURA_BASES.length * AURA_SUFFIXES.length));
    let name = suffix + " " + base + (tier > 0 ? " +" + tier : "");

    return { name, rarity, multi };
}

function rollAura() {
    let r = Math.random();
    if (r <= 0) r = 1e-15;
    let luck = (tmp.aura && tmp.aura.luck) ? tmp.aura.luck : (player.aura.luck ? new Decimal(player.aura.luck) : new Decimal(1));
    let rollVal = new Decimal(1).div(r).mul(luck);
    
    let earnedIndex = 0;
    if (rollVal.gte(200000)) {
        let step = rollVal.div(200000).log2().floor().toNumber();
        earnedIndex = FIXED_AURAS.length + step;
    } else {
        let num = rollVal.toNumber();
        for (let i = FIXED_AURAS.length - 1; i >= 0; i--) {
            if (num >= FIXED_AURAS[i].rarity) {
                earnedIndex = i;
                break;
            }
        }
    }
    
    let aura = getAuraData(earnedIndex);
    player.aura.lastAura = aura;
    player.aura.totalRolls = (player.aura.totalRolls || 0) + 1;
    
    if (earnedIndex > (player.aura.bestIndex || 0)) {
        player.aura.bestIndex = earnedIndex;
        player.aura.bestName = aura.name;
        player.aura.bestMulti = aura.multi;
        player.aura.bestRarity = aura.rarity;
    }
    
    player.aura.cd = new Decimal(2.5);
}

addLayer("aura", {
    name: "The Aura Minigame",
    symbol: "A",
    startData() {
        return {
            unlocked: true,
            luck: new Decimal(1),
            cd: new Decimal(0),
            bestIndex: 0,
            bestName: "Nothing",
            bestRarity: new Decimal(1),
            bestMulti: new Decimal(1),
            lastAura: null,
            totalRolls: 0,
        };
    },
    color: "grey",
    row: "side",
    tooltip() {
        return "Aura Minigame";
    },
    luck() {
        return player.aura.luck ? new Decimal(player.aura.luck) : new Decimal(1);
    },
    powerMult() {
        return player.aura.bestMulti ? new Decimal(player.aura.bestMulti) : new Decimal(1);
    },
    tabFormat: [
        ["display-text", function() {
            let activeMulti = tmp.aura.powerMult ? tmp.aura.powerMult : new Decimal(1);
            let luckMulti = tmp.aura.luck ? tmp.aura.luck : new Decimal(1);
            let nextAura = getAuraData((player.aura.bestIndex || 0) + 1);
            
            let text = "<h2>Aura Multiplier: " + activeMulti.toFixed(2) + "x</h2><br>";
            text += "Luck Multiplier: <b>x" + notationChooser(luckMulti) + "</b><br><br>";
            text += "Because you rolled <b>" + player.aura.totalRolls + "</b> auras, you will gain a x"+ (1+(player.aura.totalRolls/1000)) +" Luck Multiplier.<br><br>";
            text += "Best Aura: <b>" + player.aura.bestName + "</b> (1/" + notationChooser(new Decimal(player.aura.bestRarity)) + ")<br>";
            if (player.aura.lastAura) {
                text += "Last Rolled: <b>" + player.aura.lastAura.name + "</b> (1/" + notationChooser(new Decimal(player.aura.lastAura.rarity)) + ") - x" + new Decimal(player.aura.lastAura.multi).toFixed(2) + "<br>";
            } else {
                text += "Last Rolled: None<br>";
            }
            text += "Next Goal: <b>" + nextAura.name + "</b> (1/" + notationChooser(nextAura.rarity) + ") - x" + nextAura.multi.toFixed(2) + "<br>";
            return text;
        }],
        "blank",
        ["clickables", [1]],
        "blank",
        "blank",
        ["infobox", "main"],
    ],
    clickables: {
        11: {
            title() {
                if (player.aura.cd && player.aura.cd.gt(0)) {
                    return "Wait " + player.aura.cd.toFixed(1) + "s";
                }
                return "Roll Aura";
            },
            canClick() {
                return !player.aura.cd || player.aura.cd.lte(0);
            },
            onClick() {
                rollAura();
            },
            style() {
                return {
                    'width': '600px',
                    'height': '200px',
                    'font-size': '16px',
                };
            },
        },
    },
    infoboxes: {
        main: {
            title: "Welcome to The Aura Minigame!",
            body() { return "Roll for Auras which has different rarities! Rarer auras give rarer boosts...albeit small. Rarest aura unlocked boosts power" },
        },
    },
    update(diff) {
        player.p.maxUnlockedRow = getMaxUnlockedRow();
        player.aura.luck = new Decimal(1)
        player.aura.luck = player.aura.luck.mul((1+(player.aura.totalRolls/1000)))
        player.aura.luck = player.aura.luck.mul(buyableEffect("p",11))
        if (player.aura.cd && player.aura.cd.gt(0)) {
            player.aura.cd = player.aura.cd.sub(diff).max(0);
        }
        player.p.upsunlocked = (buyableEffect("p",14).add(100)).toNumber()
        player.p.autoMult = new Decimal(automationReqs[getBuyableAmount("p",12).toNumber()])
        player.p.totalPresMulti = (buyableEffect("p",15).add(buyableEffect("p",16)).add(buyableEffect("p",17)).add(buyableEffect("p",18)).add(buyableEffect("p",19))).div(100).add(1)
    },
});