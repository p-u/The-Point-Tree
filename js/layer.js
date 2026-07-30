const UPG_COUNT = 4000;

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
            description: function() {
                return "Multiplies Power by " + notationChooser(upgEffects[n], 3) + "x." + added;
            },
            cost: cost,
            currencyInternalName: "points",
            currencyDisplayName: "Power",
            unlocked() {
                if (row >= Math.floor((player.p.upsunlocked || 500) / 5)) return false;
                if (row > 0 && !hasUpgrade("p", prevRowLastId)) return false;

                if (player.p.compactView) {
                    let maxRow = getMaxUnlockedRow();
                    let minRow = Math.max(0, maxRow - 4);
                    if (row < minRow) return false;
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
        };
    },

    layerShown() { return true; },

    tabFormat: [
        ["display-text", function() {
            return "You have <h2 style='color:#FFAA00;display:inline;'>" + notationChooser(player.points) + "</h2> Power"
                 + "<br>Power/sec: " + notationChooser(tmp.pointGen);
        }],
        "blank",
        ["clickables", [1]],
        "blank",
        "upgrades",
    ],
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
                player.p.nextUpgToAuto = n + 1
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
        player.aura.luck = new Decimal(1)
        player.aura.luck = player.aura.luck.mul((1+(player.aura.totalRolls/1000)))
        player.aura.luck = player.aura.luck.mul(buyableEffect("pr",11))
        if (player.aura.cd && player.aura.cd.gt(0)) {
            player.aura.cd = player.aura.cd.sub(diff).max(0);
        }
        player.p.upsunlocked = (buyableEffect("pr",14).add(100)).toNumber()
        player.p.autoMult = new Decimal(automationReqs[getBuyableAmount("pr",12).toNumber()])
        player.pr.totalPresMulti = (buyableEffect("pr",15).add(buyableEffect("pr",16)).add(buyableEffect("pr",17)).add(buyableEffect("pr",18)).add(buyableEffect("pr",19))).div(100).add(1)
    },
});