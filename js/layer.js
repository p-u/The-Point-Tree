const UPG_COUNT = 4000;
const automationReqs = [1e6, 100, 25, 15, 10, 6, 4, 3, 2.5, 2, 2]
const automationBuyablePrice = [1, 2, 4, 10, 50, 500, 5000, 100000, 2e6]

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
        timewallDuration[n] = n / (1.05 ** Math.floor(n / 50));
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
    if ((n % 50 == 0) && n < 1000) added = " [BONUS BOOST - FURTHER UPGRADES TAKE 10% SHORTER!]";

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
        if ((n % 50 == 0) && n < 1000) added = " [BONUS BOOST - FURTHER UPGRADES TAKE 10% SHORTER!]"
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
            timesincelast: new Decimal(0),
            compactView: true,
            totalPresMulti: new Decimal(1),
            maxUnlockedRow: 0,
            energy: new Decimal(0),
            holdCombo: 0,
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
                ["display-text",
                    function(){
                        let a = "Unlock a new Mechanic at e50,000 Power!"
                        if (player.points.lt("e50000")) return a
                    }
                ],
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
                        let a = "You have "
                        a = a + notationChooser(player.p.total)
                        return a + " total Prestiges."
                    }
                ],
                "blank",
                ["display-text",
                    function(){
                        let a = "Total Prestige Multiplier x"
                        a = a + formatWhole(player.p.totalPresMulti,2)
                        return a + "   [NOTE THAT EACH PRESTIGE BUYABLE IS ADDITIVE!!]"
                    }
                ],
                "blank",
                "blank",
                ["milestones", [1,2,3,4,5,6]],
                "blank",
                "blank",
                "blank",
                ["buyables", [1]],
            ],
        },
        "Energy": {
            content: [
                "main-display",
                "blank",
                ["display-text", function() {
                    return "You have <h2 style='color:#FFAA00;display:inline;'>" + notationChooser(player.points) + "</h2> Power"
                        + "<br>Power/sec: " + notationChooser(tmp.pointGen);
                }],
                "blank",
                ["display-text", function() {
                    mult = new Decimal(1)
                    if (hasMilestone("p",8)) mult = mult.mul(1.25)
                    if (hasMilestone("p",10)) mult = mult.mul(2)
                    if (hasMilestone("p",19)) mult = mult.mul(1.75)
                    if (hasMilestone("p",22)) mult = mult.mul(100)
                    if (hasMilestone("p",15) && (player.aura.totalRolls>4000)) mult = mult.mul(1.5)
                    if (hasMilestone("p",21) && (player.aura.totalRolls>20000)) mult = mult.mul(2)
                    if (hasMilestone("p",21) && (player.aura.totalRolls>75000)) mult = mult.mul(2)
                    if (hasMilestone("p",21) && (player.points.gte("e15e6"))) mult = mult.mul(2)
                    return "Base Energy gain: <h2 style='color:#FFAA00;display:inline;'>" + notationChooser(player.points.add(1).log10().add(1).log(1.1).mul(player.p.points.add(1).log(1.1)).mul(mult).floor()) + "</h2> (affected by current Power and Prestiges)"
                        + "<br>Formula: log1.1(log10(Power))*log1.1(Prestiges)";
                }],
                "blank",
                ["display-text", function() {
                    let a = "Energy: <h2 style='color:#FFAA00;display:inline;'>" + notationChooser(player.p.energy) + "</h2>. This boosts Prestiges by " +notationChooser(new Decimal(1.2).pow(player.p.energy.div(1e5).add(1).log10()));
                    if (hasMilestone("p",17)) a = a + " and Aura Luck by " + notationChooser(new Decimal(1.07).pow(player.p.energy.div(1e9).add(1).log10())) + "."
                    return a
                }],
                "blank",
                ["display-text", function() {
                    return "Hold Combo: <h2 style='color:#FFAA00;display:inline;'>" + notationChooser(player.p.holdCombo) + "</h2> (directly boosts Energy gain)";
                }],
                "blank",
                "blank",
                ["clickables", [2]],
                "blank",
                "blank",
                "blank",
                ["milestones", [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]],
            ],
            unlocked() {return player.points.gte("e50000")}
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
        21: {
            title() {
                mult = new Decimal(1)
                if (hasMilestone("p",8)) mult = mult.mul(1.25)
                if (hasMilestone("p",10)) mult = mult.mul(2)
                if (hasMilestone("p",19)) mult = mult.mul(1.75)
                if (hasMilestone("p",22)) mult = mult.mul(100)
                if (hasMilestone("p",15) && (player.aura.totalRolls>4000)) mult = mult.mul(1.5)
                if (hasMilestone("p",21) && (player.aura.totalRolls>20000)) mult = mult.mul(2)
                if (hasMilestone("p",21) && (player.aura.totalRolls>75000)) mult = mult.mul(2)
                if (hasMilestone("p",21) && (player.points.gte("e15e6"))) mult = mult.mul(2)
                return "Gain "+ notationChooser(player.points.add(1).log10().add(1).log(1.1).mul(player.p.points.add(1).log(1.1)).mul(player.p.holdCombo+1).mul(mult)) +" Energy! (HOLD THE BUTTON, NOT CLICK IT!)";
            },
            canClick() { return true; },
            canHold() { return true; },
            onHold() {
                player.p.energy = player.p.energy.add(player.points.add(1).log10().add(1).log(1.1).mul(player.p.points.add(1).log(1.1)).mul(player.p.holdCombo+1).mul(mult))
                player.p.holdCombo = player.p.holdCombo + 1
                player.p.timesincelast = new Decimal(0)
            },
            style() {
                return {
                    'width': '700px',
                    'font-size': '14px',
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
    requires: new Decimal("e150"), // Can be a function that takes requirement increases into account
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
        return (player.points.max(1).log(10).div(150)).mul(player.p.totalPresMulti).floor()
    },
    getNextAt() {
        let target = tmp.p.getResetGain.add(1)
        return Decimal.pow(10, target.mul(150).div(player.p.totalPresMulti))
    },
    onPrestige() {
        player.p.upgrades = []
        player.p.nextUpgToAuto = 1
    },
    milestones: {
        1: {
            requirementDescription: "10 total Prestiges",
            effectDescription: "Unlock Prestige Buyables. Also increase Prestiges gain by 10%.",
            done() { return player.p.total.gte(10) }
        },
        2: {
            requirementDescription: "100 total Prestiges",
            effectDescription: "Reduce Aura roll cooldown by 1 second!",
            done() { return player.p.total.gte(100) },
            unlocked() {return player.p.total.gte(10)}
        },
        3: {
            requirementDescription: "1,000 total Prestiges",
            effectDescription: "Double Prestige gain if you have rolled 1,000 auras. Double it again if you rolled 10,000 of them!",
            done() { return player.p.total.gte(1000) },
            unlocked() {return player.p.total.gte(100)}
        },
        4: {
            requirementDescription: "10,000 total Prestiges",
            effectDescription: "Small boost - Reduce aura roll cooldown by 0.5s, and multiply Aura luck by 1.4",
            done() { return player.p.total.gte(10000) },
            unlocked() {return player.p.total.gte(1000)}
        },
        5: {
            requirementDescription: "100,000 total Prestiges",
            effectDescription: "Double Power gain!",
            done() { return player.p.total.gte(1e5) },
            unlocked() {return player.p.total.gte(1e4)}
        },
        6: {
            requirementDescription: "1M total Prestiges - The Last Milestone...",
            effectDescription: "Triple Prestiges gain! Also reduce aura roll cooldown by another 0.7s.",
            done() { return player.p.total.gte(1e6) },
            unlocked() {return player.p.total.gte(1e5)}
        },
        7: {
            requirementDescription: "e100K Power",
            effectDescription: "+25% Power gain",
            done() { return player.points.gte("e100e3") },
            unlocked() {return player.points.gte("e50e3")},
            style() {
                return {
                    'width': '700px',
                    'font-size': '16px',
                };
            },
        },
        8: {
            requirementDescription: "e250K Power",
            effectDescription: "+25% Energy gain",
            done() { return player.points.gte("e250e3") },
            unlocked() {return player.points.gte("e100e3")},
            style() {
                return {
                    'width': '700px',
                    'font-size': '16px',
                };
            },
        },
        9: {
            requirementDescription: "e500K Power",
            effectDescription: "Half the price of the ‘Better Auto’ buyable.",
            done() { return player.points.gte("e500e3") },
            unlocked() {return player.points.gte("e250e3")},
            style() {
                return {
                    'width': '700px',
                    'font-size': '16px',
                };
            },
        },
        10: {
            requirementDescription: "e1M Power",
            effectDescription: "+100% Prestiges, Energy",
            done() { return player.points.gte("e1000e3") },
            unlocked() {return player.points.gte("e500e3")},
            style() {
                return {
                    'width': '700px',
                    'font-size': '16px',
                };
            },
        },
        11: {
            requirementDescription: "e2M Power",
            effectDescription: "Increase the effect of the ‘Enhanced Prestige’ buyable to +80%.",
            done() { return player.points.gte("e2e6") },
            unlocked() {return player.points.gte("e1e6")},
            style() {
                return {
                    'width': '700px',
                    'font-size': '16px',
                };
            },
        },
        12: {
            requirementDescription: "e4M Power",
            effectDescription: "Increase the effect of the ‘Insane Prestige’ buyable to +230%",
            done() { return player.points.gte("e4e6") },
            unlocked() {return player.points.gte("e2e6")},
            style() {
                return {
                    'width': '700px',
                    'font-size': '16px',
                };
            },
        },
        13: {
            requirementDescription: "e8M Power",
            effectDescription: "Reduce the price of the ‘MORE!!’ buyable by tenfold",
            done() { return player.points.gte("e8e6") },
            unlocked() {return player.points.gte("e4e6")},
            style() {
                return {
                    'width': '700px',
                    'font-size': '16px',
                };
            },
        },
        14: {
            requirementDescription: "e14M Power",
            effectDescription: "Reduce the price of the ‘Surge Multiplier’ buyable by tenfold",
            done() { return player.points.gte("e14e6") },
            unlocked() {return player.points.gte("e8e6")},
            style() {
                return {
                    'width': '700px',
                    'font-size': '16px',
                };
            },
        },
        15: {
            requirementDescription: "1B Energy",
            effectDescription: "When 4,000 Auras is rolled, multiply Energy by 1.5.",
            done() { return player.p.energy.gte("1e9") },
            unlocked() {return player.p.energy.gte("1")},
            style() {
                return {
                    'width': '700px',
                    'font-size': '16px',
                };
            },
        },
        16: {
            requirementDescription: "5B Energy",
            effectDescription: "The ‘Greater Prestige’ buyable is increased to +40%",
            done() { return player.p.energy.gte("5e9") },
            unlocked() {return player.p.energy.gte("1e9")},
            style() {
                return {
                    'width': '700px',
                    'font-size': '16px',
                };
            },
        },
        17: {
            requirementDescription: "50B Energy",
            effectDescription: "Unlock a boost to Aura Luck!",
            done() { return player.p.energy.gte("50e9") },
            unlocked() {return player.p.energy.gte("5e9")},
            style() {
                return {
                    'width': '700px',
                    'font-size': '16px',
                };
            },
        },
        18: {
            requirementDescription: "400B Energy",
            effectDescription: "Time that it takes Hold Combo to reset is increased from 150ms to 10s",
            done() { return player.p.energy.gte("400e9") },
            unlocked() {return player.p.energy.gte("50e9")},
            style() {
                return {
                    'width': '700px',
                    'font-size': '16px',
                };
            },
        },
        19: {
            requirementDescription: "5T Energy",
            effectDescription() {
                mult = new Decimal(1)
                if (hasMilestone("p",8)) mult = mult.mul(1.25)
                if (hasMilestone("p",10)) mult = mult.mul(2)
                if (hasMilestone("p",19)) mult = mult.mul(1.75)
                if (hasMilestone("p",22)) mult = mult.mul(100)
                if (hasMilestone("p",15) && (player.aura.totalRolls>4000)) mult = mult.mul(1.5)
                if (hasMilestone("p",21) && (player.aura.totalRolls>20000)) mult = mult.mul(2)
                if (hasMilestone("p",21) && (player.aura.totalRolls>75000)) mult = mult.mul(2)
                if (hasMilestone("p",21) && (player.points.gte("e15e6"))) mult = mult.mul(2)
                let des = "Passive Energy gain, though it is very weak. Also +75% Energy."
                des = des + " (Currently: +" + notationChooser(player.points.add(1).log10().add(1).log(1.1).mul(player.p.points.add(1).log(1.1)).mul(mult).floor()) + " Energy/sec)"
                return des
            },
            done() { return player.p.energy.gte("5e12") },
            unlocked() {return player.p.energy.gte("400e9")},
            style() {
                return {
                    'width': '700px',
                    'font-size': '16px',
                };
            },
        },
        20: {
            requirementDescription: "20T Energy",
            effectDescription: "Hold combo is never reset.",
            done() { return player.p.energy.gte("20e12") },
            unlocked() {return player.p.energy.gte("5e12")},
            style() {
                return {
                    'width': '700px',
                    'font-size': '16px',
                };
            },
        },
        21: {
            requirementDescription: "150T Energy",
            effectDescription: "When 20,000 and 75,000 Auras is rolled, double Energy gain. Double Energy gain again if Power >e15M",
            done() { return player.p.energy.gte("150e12") },
            unlocked() {return player.p.energy.gte("20e12")},
            style() {
                return {
                    'width': '700px',
                    'font-size': '16px',
                };
            },
        },
        22: {
            requirementDescription: "5Qd Energy",
            effectDescription: "x100 Energy gain!!",
            done() { return player.p.energy.gte("5e15") },
            unlocked() {return player.p.energy.gte("150e12")},
            style() {
                return {
                    'width': '700px',
                    'font-size': '16px',
                };
            },
        },
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
                let n = 1
                if (hasMilestone("p", 9)) n = 0.5
                if (x <= 8) {
                    return new Decimal(automationBuyablePrice[x]*n)
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
                return "Cost+Effect: 1Mx (free) -> 100x (1) -> 25x (2) -> 15x (4) -> 10x (10) -> 6x (50) -> 4x (500) -> 3x (5,000) -> 2.5x (100K) -> 2x (2M)."
            }
        },
        13: {
            title: "Surge Multiplier",
            cost(x) {
                let costdiv = new Decimal(1)
                if (hasMilestone("p",14)) costdiv = new Decimal(10)
                return new Decimal(3).mul(Decimal.pow(1.9, x)).div(costdiv).round()
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
                let costdiv = new Decimal(1)
                if (hasMilestone("p",13)) costdiv = new Decimal(10)
                return new Decimal(1).mul(Decimal.pow(1.8, x)).div(costdiv).round()
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
                b = 30
                if (hasMilestone("p",16)) b = 40
                return x.mul(b)
            },
            tooltip() {
                return "+"+b+"% Prestiges/level."
            },
            unlocked() {
                return hasMilestone("p",1)
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
                b = 60
                if (hasMilestone("p",11)) b = 80
                return x.mul(b)
            },
            tooltip() {
                return "+"+b+"% Prestiges/level."
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
                b = 160
                if (hasMilestone("p",12)) b = 230
                return x.mul(b)
            },
            tooltip() {
                return "+"+b+"% Prestiges/level."
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
    { name: "Miniscule", rarity: 3, multi: 1.1 },
    { name: "Airy", rarity: 10, multi: 1.2 },
    { name: "Particles", rarity: 40, multi: 1.34 },
    { name: "Bad", rarity: 100, multi: 1.47 },
    { name: "Meh", rarity: 200, multi: 1.63 },
    { name: "Subpar", rarity: 500, multi: 1.83 },
    { name: "Fine", rarity: 1000, multi: 2.05 },
    { name: "Average", rarity: 2400, multi: 2.42 },
    { name: "Decent", rarity: 6000, multi: 2.88 },
    { name: "Good", rarity: 15000, multi: 3.37 },
    { name: "Great", rarity: 35000, multi: 4.06 },
    { name: "Awesome", rarity: 55000, multi: 4.58 },
    { name: "Radiating", rarity: 85000, multi: 5.02 },
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
    let multiVal = 5.57 * Math.pow(1.11, step + 1);
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
    
    player.aura.cd = player.aura.basecd;
}

addLayer("aura", {
    name: "The Aura Minigame",
    symbol: "A",
    startData() {
        return {
            unlocked: true,
            luck: new Decimal(1),
            cd: new Decimal(0),
            basecd: new Decimal(2.5),
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
                mult = new Decimal(1)
                if (hasMilestone("p",8)) mult = mult.mul(1.25)
                if (hasMilestone("p",10)) mult = mult.mul(2)
                if (hasMilestone("p",19)) mult = mult.mul(1.75)
                if (hasMilestone("p",22)) mult = mult.mul(100)
                if (hasMilestone("p",15) && (player.aura.totalRolls>4000)) mult = mult.mul(1.5)
                if (hasMilestone("p",21) && (player.aura.totalRolls>20000)) mult = mult.mul(2)
                if (hasMilestone("p",21) && (player.aura.totalRolls>75000)) mult = mult.mul(2)
                if (hasMilestone("p",21) && (player.points.gte("e15e6"))) mult = mult.mul(2)
        player.p.maxUnlockedRow = getMaxUnlockedRow();
        player.aura.luck = new Decimal(1)
        if (hasMilestone("p",19)) player.p.energy = player.p.energy.add(player.points.add(1).log10().add(1).log(1.1).mul(player.p.points.add(1).log(1.1)).floor().mul(mult).mul(diff))
        player.p.timesincelast = player.p.timesincelast.add(diff)
        let letsecs = new Decimal(0.15)
        if (hasMilestone("p",18)) letsecs = new Decimal(10)
        if (hasMilestone("p",20)) letsecs = new Decimal(1e100)
        if (player.p.timesincelast.gt(letsecs)) player.p.holdCombo = 0
        player.aura.luck = player.aura.luck.mul((1+(player.aura.totalRolls/1000)))
        player.aura.luck = player.aura.luck.mul(buyableEffect("p",11))
        if (player.aura.cd && player.aura.cd.gt(0)) {
            player.aura.cd = player.aura.cd.sub(diff).max(0);
        }
        player.p.upsunlocked = (buyableEffect("p",14).add(100)).toNumber()
        player.p.autoMult = new Decimal(automationReqs[getBuyableAmount("p",12).toNumber()])
        player.p.totalPresMulti = (buyableEffect("p",15).add(buyableEffect("p",16)).add(buyableEffect("p",17)).add(buyableEffect("p",18)).add(buyableEffect("p",19))).div(100).add(1)
        if (hasMilestone("p",1)) player.p.totalPresMulti = player.p.totalPresMulti.mul(1.1)
        if (hasMilestone("p",10)) player.p.totalPresMulti = player.p.totalPresMulti.mul(2)
        player.p.totalPresMulti = player.p.totalPresMulti.mul(new Decimal(1.2).pow(player.p.energy.div(1e5).add(1).log10()))
        if (hasMilestone("p",3)) {
            if (player.aura.totalRolls>1000) player.p.totalPresMulti = player.p.totalPresMulti.mul(2)
            if (player.aura.totalRolls>10000) player.p.totalPresMulti = player.p.totalPresMulti.mul(2)
        }
        if (hasMilestone("p",4)) player.aura.luck = player.aura.luck.mul(1.4)
        if (hasMilestone("p",17)) player.aura.luck = player.aura.luck.mul(new Decimal(1.07).pow(player.p.energy.div(1e9).add(1).log10()))
        if (hasMilestone("p",2)) player.aura.basecd = new Decimal(1.5)
        if (hasMilestone("p",4)) player.aura.basecd = new Decimal(1)
        if (hasMilestone("p",6)) player.aura.basecd = new Decimal(0.3)
    },
});