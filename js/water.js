addLayer("w", {
    name: "Water", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasMilestone('s', 5) || player.w.unlocked) visible = true
       return visible
    },
    passiveGeneration() {
        if (hasMilestone('s', 5)) return 5
        if (inChallenge("m", 11) && hasUpgrade("w", 31)) return 0.4
        return 0
    },
    tabFormat: {
        "Upgrades": {
            content: [
                ["infobox", "info"],
                "main-displayX",
                "blank",
                "prestige-button",
                "blank",
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        if (inChallenge("m", 11)) {
                            a = a + "This layer will truly be unlocked when the Energy Milestone is unlocked. Immediately aim for Upgrade 11 (costing 60B Water) to gain an x4 multiplier of MaP."
                        }
                        return a 
                    }
                ],
                "blank",
                "upgrades"
            ],
        },
        "Milestones": {
            content: [
                "main-display",
                "blank",
                "blank",
                "blank",
                "milestones"
            ],
        },
    },
    doReset(w) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[w].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
    
    
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
        if (hasMilestone("era", 3)) keep.push("upgrades");
        if (hasMilestone("era", 3)) keep.push("milestones");
    
        // Stage 4, do the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },  
    infoboxes: {
        info: {
            title: "NOTE",
            body() { return "Click Water button to be able to buy upgrades. [Won't reset sacs or Supreme Points]" },
        },
    },   
    color: "blue",
    requires() {
        let req = new Decimal("1e1000")
        if (hasMilestone('e', 15)) req = new Decimal("150e30")
        return req
    }, // Can be a function that takes requirement increases into account
    resource: "Water", // Name of currency
    baseResource: "Energy", // Name of resource prestige is based on
    baseAmount() {return player.e.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.01,  // Balance is needed. Balanced to SAC 3. Have to balance to sac 4 // Prestige currency exponent
    upgrades: {
        11: {
            title: "How is this any different from energy?",
            description: "x2 Water, and x1e2.5e5 PF",
            cost: new Decimal(200),
        },
        12: {
            title: "Another x2?",
            description: "x2 Water, and x1e2e3 PP",
            cost: new Decimal(400),
            unlocked() { return hasUpgrade("w", 11) },
        },
        13: {
            title: "Woah, I love compounding. (Compounding IX)",
            description: "Water gets boosted based on itself.",
            cost: new Decimal(1250),
            unlocked() { return hasUpgrade("w", 12) },
            main() {
                w3exp = 0.111
                if (hasUpgrade('w', 31)) w3exp = 0.13
                if (hasUpgrade('w', 43)) w3exp = 0.145
                if (hasMilestone('w', 1)) w3exp = 0.16
                if (hasUpgrade('w', 52)) w3exp = 0.175
                if (hasUpgrade('s', 25)) w3exp = new Decimal(0.2)
                if (hasUpgrade('era', 252)) w3exp = new Decimal(0.225)
                if (hasUpgrade('s', 122)) w3exp = new Decimal(0.237)
                if (hasUpgrade('era', 361)) w3exp = new Decimal(0.25)
                if (hasUpgrade("w", 55)) w3exp = new Decimal(0.27)
                softcapDescriptionw13 = ""
                sdsc = ""
                scpow = 0.58
                upgEffectw13 = upgradeEffect(this.layer, this.id)
                if (upgEffectw13.gte(new Decimal("e5e13")) ) {
                    softcapDescriptionw13 = " (Softcapped)"
                    sdsc = ". Softcaps ^" + scpow + " at e5e13"
                }
            },
            effect() {
                let eff = player["w"].points.add(1).pow(w3exp)
                eff = softcap(eff, new Decimal("e1e14"), scpow)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionw13
            },
            tooltip() {
                return "Formula: Water^"  + w3exp + sdsc
            },
        },
        14: {
            title: "Super Water",
            description: "x2.5 Water, and x10B Energy",
            cost: new Decimal(3333),
            unlocked() { return hasUpgrade("w", 13) },
        },
        21: {
            title: "That's actually useful",
            description: "x1.25 SP, x3.8 Water",
            cost: new Decimal(12500),
            unlocked() { return hasUpgrade("w", 14) },
        },
        22: {
            title: "Water Plus",
            description: "x3.19 Water, Water boosts energy more",
            cost: new Decimal(70000),
            unlocked() { return hasUpgrade("w", 21) },
        },
        23: {
            title: "Water Too OP?",
            description: "Water boosts energy LESS, xe25 Energy, x4 Water",
            cost: new Decimal(325000),
            unlocked() { return hasUpgrade("w", 22) },
        },
        24: {
            title: "Water Supreme",
            description: "x3 Water, x3 SP, unlock more Supreme Upgrades.",
            cost: new Decimal(5e6),
            unlocked() { return hasUpgrade("w", 23) },
        },
        31: {
            title: "Water Crazy",
            description() {
                let desc = "Water boosts energy more, WU13 is stronger"
                if (inChallenge("m", 11)) desc += `<br><p style="color: gold;">[MC1-Specific] Add very slight passive generation of water (QoL) - holding is still much better though, and intended!`
                return desc
            },
            cost: new Decimal(4e9),
            unlocked() { return hasUpgrade("w", 24) },
        },
        32: {
            title: "Water Power!",
            description: "x5 Water, ^1.01 Water, ^1.01 PF",
            cost: new Decimal(1.2e10),
            unlocked() { return hasUpgrade("w", 31) },
        },
        33: {
            title: "Water Prestige",
            description() {
                let desc = "x3 Water, xe70e3 PP"
                if (inChallenge("m", 11)) desc += `<br><p style="color: gold;">[MC1-Specific] Multiply Mastery Points by 4.1!`
                return desc
            },
            cost: new Decimal(6e10),
            unlocked() { return hasUpgrade("w", 32) },
        },
        34: {
            title: "Water Blaster",
            description: "x50 Water, x8 SP, xe2e6 PF",
            cost: new Decimal(1e12),
            unlocked() { return hasUpgrade("w", 33) },
        },
        41: {
            title: "40,000 Bo'o'waters",
            description: "x40.000 Water, xe1e6 BP",
            cost: new Decimal(2.4e28),
            unlocked() { return hasUpgrade("w", 34) && hasUpgrade("s", 52) },
        },
        42: {
            title: "Water Gun",
            description: "x5 Water, xe200e3 RP, xe1.5e6 PF",
            cost: new Decimal(2e30),
            unlocked() { return hasUpgrade("w", 41) },
        },
        43: {
            title: "Water Water",
            description: "Water Upg 13 is better",
            cost: new Decimal(2.2e31),
            unlocked() { return hasUpgrade("w", 42) },
        },
        44: {
            title: "Water Mastery Boost",
            description: "The most insane boost. xe5e6 PF. Yes. E5e6. You heard that right.",
            cost: new Decimal(1.1e32),
            unlocked() { return hasUpgrade("w", 43) },
        },
        51: {
            title: "Water, Woo!",
            description: "x10e12 Water, x10e6 SP",
            cost: new Decimal(5e257),
            unlocked() { return hasMilestone("sac", 45) && hasUpgrade("w", 44) },
        },
        52: {
            title: "More itself",
            description: "WU13 is stronger",
            cost: new Decimal(2.4e274),
            unlocked() { return hasMilestone("sac", 45) && hasUpgrade("w", 51) },
        },
        53: {
            title: "Strong Water",
            description: "x1 Qi Water, xe28e6 PF",
            cost: new Decimal(8e279),
            unlocked() { return hasMilestone("sac", 45) && hasUpgrade("w", 52) },
        },
        54: {
            title: "Break Infinity",
            description: "^1.011 PF, x100 Mastery Points if have Mastery Challenge 1",
            cost: new Decimal(7e307),
            unlocked() { return hasMilestone("sac", 45) && hasUpgrade("w", 53) },
        },
        61: {
            title: "All again, another.",
            description: "xe150e6 PF",
            cost: new Decimal("1.5e1152"),
            unlocked() { return hasMilestone("sac", 58) && hasUpgrade("w", 54) },
        },
        62: {
            title: "Quattuorquinquagintillioning",
            description: "xe167 Water",
            cost: new Decimal("1e1164"),
            unlocked() { return hasMilestone("sac", 58) && hasUpgrade("w", 61)  }, 
        },
        63: {
            title: "More sacrifices",
            description: "MP +^0.05, PP +^0.1",
            cost: new Decimal("2e1388"),
            unlocked() { return hasMilestone("sac", 58) && hasUpgrade("w", 62)  }, 
        },
        64: {
            title: "Buyaboost",
            description: "Supreme Buyable 1,3,5 is stronger",
            cost: new Decimal("2.4e1419"),
            unlocked() { return hasMilestone("sac", 58) && hasUpgrade("w", 63)  }, 
        },
        71: {
            title: "A big jump in price",
            description: "xe2e6 Water",
            cost: new Decimal("2e10401459"),
            unlocked() { return hasUpgrade("era", 161) && hasUpgrade("w", 64)  }, 
        },
        72: {
            title: "Water Power",
            description: "+^0.1 Water, ^1.0072 PF",
            cost: new Decimal("0.6e11887902"),
            unlocked() { return hasUpgrade("era", 161) && hasUpgrade("w", 71)  }, 
        },
        73: {
            title: "Water Power",
            description: "Raise SU52's water effect to the 500TH POWER!",
            cost: new Decimal("0.3e12730927"),
            unlocked() { return hasUpgrade("era", 161) && hasUpgrade("w", 72)  }, 
        },
        74: {
            title: "Completion",
            description: "xe20e12 PF and reduce sacrifice scaling by a teeny weeny bit",
            cost: new Decimal("7e14545523"),
            unlocked() { return hasUpgrade("era", 161) && hasUpgrade("w", 73)  }, 
        },
        81: {
            title: "Is it just repeating??",
            description: "xe10e9 Water",
            cost: new Decimal("1e45164322793"),
            unlocked() { return hasMilestone("sac", 99) && hasUpgrade("w", 74)  }, 
        },
        82: {
            title: "no",
            description: "Supreme Buyables are stronger [POWER EFFECT???]",
            cost: new Decimal("3e56555043545"),
            unlocked() { return hasMilestone("sac", 99) && hasUpgrade("w", 81)  }, 
        },
        83: {
            title: "Water Power Mk. 2",
            description: "xe2e9 Water, +^0.1 Water, ^1.001 PF",
            cost: new Decimal("1.3e67540292272"),
            unlocked() { return hasMilestone("sac", 99) && hasUpgrade("w", 82)  }, 
        },
        84: {
            title: "To 50K Sacs.",
            description: "xe10 Qd PF",
            cost: new Decimal("1.8e87842343930"),
            unlocked() { return hasMilestone("sac", 99) && hasUpgrade("w", 83)  }, 
        },
        91: {
            title: "Energy is everything.",
            description: "xe1.5e15 Energy, +^0.05 Energy, Energy softcap is weaker",
            cost: new Decimal("e4.275e14"),
            unlocked() { return hasMilestone("era", 102) && hasUpgrade("w", 84)  }, 
        },
        92: {
            title: "Limitedless",
            description: "Water softcap is weaker, and sacrifice scaling is reduced",
            cost: new Decimal("e4.7825e14"),
            unlocked() { return hasMilestone("era", 102) && hasUpgrade("w", 91)  }, 
        },
        93: {
            title: "Cellular Power",
            description: "x4 Cells Base Mult, Cell boosts EC at an increased rate, cells now boost EF (before nerf).",
            cost: new Decimal("e4.8778e14"),
            unlocked() { return hasMilestone("era", 102) && hasUpgrade("w", 92)  }, 
            effect() {
                return Decimal.max(player.c.points.log10()/20, 1)
            },
            effectDisplay() {
                let upgEffect = upgradeEffect(this.layer, this.id)
                return "This upgrade multiplies Era Fragments by x" + notationChooser(upgEffect)+"."
            },
            tooltip() {
                return "Formula: log10(Cells)/20"
            },
        },
        94: {
            title: "Omega Insane Upgrade!! (Timewally, but all worth the wait)",
            description: "Base EF is multiplied by slog(EC) again. Extend EF upgrades. xee20 PF, ^1.04 EC",
            cost: new Decimal("e4.8929e14"),
            unlocked() { return hasMilestone("era", 102) && hasUpgrade("w", 93)  }, 
        },
        15: {
            title: "Bond Strengthening",
            description: "Supreme Upgrade 65 is 30% stronger.",
            cost: new Decimal("e1.02088e15"),
            unlocked() { return hasMilestone("sac", 121) && hasUpgrade("w", 14)  }, 
            style() {return {
                'width': '150px',
            }},
        },
        25: {
            title: "Actual 'Booster Plus'",
            description: "Era Buyable 2, 'Booster Plus' base effect is also increased based on the amount of Water upgrades. 'Booster Plus' also affects Water gain, at a rate of xe4e12 per buy.",
            effect() {
                return new Decimal("e4e12").pow(player.era.buyables[12])
            },
            effectDisplay() {
                let upgEffect = upgradeEffect(this.layer, this.id)
                return "This upgrade multiplies Water by x" + notationChooser(upgEffect)+"."
            },
            tooltip() {
                return "Formula: e4e12^BuyableBuys"
            },
            cost: new Decimal("e1.11375e15"),
            unlocked() { return hasMilestone("sac", 121) && hasUpgrade("w", 15)  }, 
            style() {return {
                'width': '150px',
            }},
        },
        35: {
            title: "TSUNAMI!!!! RUN!!!",
            description: "xe2e14 Water",
            cost: new Decimal("e1.32923e15"),
            unlocked() { return hasMilestone("sac", 121) && hasUpgrade("w", 25)  }, 
            style() {return {
                'width': '150px',
            }},
        },
        45: {
            title: "Quick! Everybody, up!",
            description: "As the immense amount of Water increases, many civillians are killed. People struggle to go on high ground. However, the water continues spreading. +^0.05 Water.",
            cost: new Decimal("e2.1895e15"),
            unlocked() { return hasMilestone("sac", 121) && hasUpgrade("w", 35)  }, 
            style() {return {
                'width': '150px',
            }},
        },
        55: {
            title: "Further Amplification",
            description: "In an instant, rain poured down the land, and further exacerbated the seriousness of the situation. The amount of water increases based on itself.",
            cost: new Decimal("e2.2767e15"),
            unlocked() { return hasMilestone("sac", 121) && hasUpgrade("w", 45)  }, 
            style() {return {
                'width': '150px',
            }},
        },
        65: {
            title: "Further Amplification",
            description: "Due to the amount of Water, the amount of cells naturally increases. log(Water) delays Cells softcap.",
            cost: new Decimal("e2.32e15"),
            effect() {
                return player.w.points.add(2).log10()
            },
            effectDisplay() {
                let upgEffect = upgradeEffect(this.layer, this.id)
                return "This upgrade delays Cells softcap by a factor of " + notationChooser(upgEffect)+"."
            },
            tooltip() {
                return "Formula: lg(Water)"
            },
            unlocked() { return hasMilestone("sac", 121) && hasUpgrade("w", 55)  }, 
            style() {return {
                'width': '150px',
            }},
        },
        75: {
            title: "The Master that you, yourself are",
            description: "As you look down below, you see the many citizens that need help, as they are injured. Well, you have to research some new technology. 'More EC = More Mastery' is stronger.",
            cost: new Decimal("e2.356e15"),
            unlocked() { return hasMilestone("sac", 121) && hasUpgrade("w", 65)  }, 
            style() {return {
                'width': '150px',
            }},
        },
        85: {
            title: "Re-building people's fundementals",
            description: "The water rises at an impressive pace. You, as the leader of the pack, realise that you have to educate others to survive through the disaster. The fundementals would have to be re-learnt. xe2.1e21 BP.",
            cost: new Decimal("e2.6312e15"),
            unlocked() { return hasMilestone("sac", 121) && hasUpgrade("w", 75)  }, 
            style() {return {
                'width': '150px',
            }},
        },
        95: {
            title: "Saving the city, for good!",
            description: "Due to your efforts, the city is saved with minimal casualties in this horrifying disaster. The water eventually subsides after 3 days. The Prime Minister honours you, thus he gives you the Nobel Prize. (Nobel Prize Benefits: xee19 MP)",
            cost: new Decimal("e3.529e15"),
            unlocked() { return hasMilestone("sac", 121) && hasUpgrade("w", 85)  }, 
            style() {return {
                'width': '150px',
            }},
        },
    },
    milestones: {
        1: {
            requirementDescription: "The First Water Milestone (3.33e135 Water)",
            effectDescription: "^1.025 PF, WU13 is stronger",
            done() { return player["w"].points.gte("3.33e135") },
            unlocked() {return player["sac"].points.gte(64) || hasMilestone("w", 3)},
        },
        2: {
            requirementDescription: "The Second Water Milestone (1.111e1111 Water)",
            effectDescription: "+^0.1111 PP",
            done() { return player["w"].points.gte("1.111e1111") },
            unlocked() {return player["sac"].points.gte(132)},
        },
        3: {
            requirementDescription: "OP Mastery Challenge 2 Specific Milestone (6.99e299 Water)",
            effectDescription: "^1.05 PF, Water Milestone 1 is visible in Mastery Challenge 2, PP +^0.1, MP +^0.055",
            done() {
                if (inChallenge("m", 12)) {
                    if (player["w"].points.gte("6.99e299")) {
                        return true
                    }
                }
            },
            unlocked() {return inChallenge("m", 12)},
        },
        4: {
            requirementDescription: "Mastery Challenge 2 Specific Milestone 2 (1e668 Water)",
            effectDescription: "^1.04 PF, Sac Scaling weaker",
            done() {
                if (inChallenge("m", 12)) {
                    if (player["w"].points.gte("e668")) {
                        return true
                    }
                }
            },
            unlocked() {return (inChallenge("m", 12) && hasMilestone('w', 3))},
        },
        5: {
            requirementDescription: "A new water milestone (1e1e12 Water)",
            effectDescription: "+^0.1 Water",
            done() { return player["w"].points.gte("1e1e12") },
            unlocked() {return player["sac"].points.gte(132)},
        },
        6: {
            requirementDescription: "Water Madness (e7.16e14 Water)",
            effectDescription: "Increase the efficacy of Supreme Buyables 4,6 and 7",
            done() { return player["w"].points.gte("e7.16e14") },
            unlocked() {return hasMilestone("w", 5)},
        },
    },
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        if (hasUpgrade('basic', 111)) mult = mult.times(upgradeEffect('basic', 111))
        if (hasUpgrade('s', 63)) mult = mult.times(buyableEffect('s', 14))
        if (hasAchievement('sa', 186)) mult = mult.times(2)
        if (hasUpgrade('w', 11)) mult = mult.times(2)
        if (hasUpgrade('w', 12)) mult = mult.times(2)
        if (hasUpgrade('w', 13)) mult = mult.times(upgradeEffect('w', 13))
        if (hasUpgrade('w', 25)) mult = mult.times(upgradeEffect('w', 25))
        if (hasUpgrade('w', 14)) mult = mult.times(2.5)
        if (hasUpgrade('w', 21)) mult = mult.times(3.8)
        if (hasUpgrade('w', 22)) mult = mult.times(3.19)
        if (hasUpgrade('w', 23)) mult = mult.times(4)
        if (hasUpgrade('w', 24)) mult = mult.times(3)
        if (hasUpgrade('s', 41)) mult = mult.times(2)
        if (hasMilestone('s', 6)) mult = mult.times(15)
        if (hasUpgrade('w', 32)) mult = mult.times(5)
        if (hasUpgrade('w', 33)) mult = mult.times(3)
        if (hasUpgrade('w', 34)) mult = mult.times(50)
        if (hasMilestone('e', 14)) mult = mult.times(1e6)
        if (hasMilestone('e', 15)) mult = mult.times(1e6)
        if (hasUpgrade('mega', 84)) mult = mult.times(200)
        if (hasUpgrade('s', 52)) mult = mult.times(upgradeEffect('s', 52))
        if (hasUpgrade('w', 41)) mult = mult.times(40)
        if (hasUpgrade('w', 42)) mult = mult.times(5)
        if (hasMilestone('sac', 34)) mult = mult.times(5)
        if (hasUpgrade('prestige', 45)) mult = mult.times(5)
        if (hasUpgrade('prestige', 55)) mult = mult.times(35)
        if (hasUpgrade('s', 53)) mult = mult.times(buyableEffect('s', 13))
        if (hasUpgrade('s', 54)) mult = mult.times(10)
        if (hasMilestone('e', 13)) mult = mult.times(10)
        if (hasAchievement('a', 126)) mult = mult.times(45.1)
        if (hasAchievement('a', 136)) mult = mult.times(1000)
        if (hasUpgrade('w', 51)) mult = mult.times(1e13)
        if (hasUpgrade('w', 53)) mult = mult.times(1e18)
        if (hasUpgrade('rebirth', 75)) mult = mult.times(3.77)
        if (hasUpgrade('w', 62)) mult = mult.times(1e167)
        if (hasUpgrade("m", 1004) && inChallenge("m", 11)) mult = mult.times(75)
        if (hasUpgrade('w', 71)) mult = mult.times("e2000000")
        if (hasUpgrade('era', 233)) mult = mult.times("e50e6")
        if (hasUpgrade('mega', 105)) mult = mult.times("e10e9")
        if (hasUpgrade('w', 81)) mult = mult.times("e10e9")
        if (hasUpgrade('w', 83)) mult = mult.times("e10e9")
        if (hasUpgrade('era', 93)) mult = mult.times("e50e9")
        if (hasUpgrade('s', 121)) mult = mult.times("e50e9")
        if (hasUpgrade('era', 394)) mult = mult.times("e7e11")
        if (hasUpgrade('rebirth', 91)) mult = mult.times("e2.2e12")
        if (hasMilestone('sac', 114)) mult = mult.times("e5e13")
        if (hasUpgrade('w', 35)) mult = mult.times("e2e14")
        if (hasUpgrade('s', 65)) mult = mult.times(upgradeEffect('s', 65))
        if (inChallenge("m", 13)) mult = mult.pow(player.m.rngpower)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade('w', 32)) exp = exp.add(0.01)
        if (hasUpgrade('s', 61)) exp = exp.add(0.01)
        if (hasAchievement('a', 171)) exp = exp.add(0.02)
        if (hasUpgrade('m', 81)) exp = exp.add(0.1)
        if (hasUpgrade('mega', 94)) exp = exp.add(0.005)
        if (hasUpgrade("era", 23)) exp = exp.add(0.05)
        if (hasUpgrade('w', 72)) exp = exp.add(0.1)
        if (hasUpgrade('s', 15)) exp = exp.add(0.08)
        if (hasUpgrade("era", 423)) exp = exp.add(player.era.everythingpower)
        if (hasUpgrade('era', 274)) exp = exp.add(0.09)
        if (hasUpgrade('w', 83)) exp = exp.add(0.1)
        if (hasMilestone('w', 5)) exp = exp.add(0.1)
        if (hasUpgrade('era', 165)) exp = exp.add(0.05)
        if (hasUpgrade("era", 432)) exp = exp.add(0.08)
        if (hasUpgrade("era", 1034)) exp = exp.add(upgradeEffect("era", 1034))
        if (hasMilestone('era', 102)) exp = exp.add(buyableEffect('s', 17))
        if (hasUpgrade("w", 45)) exp = exp.add(0.05)
        let expinmc1 = new Decimal(0.5)
        if (inChallenge("m", 11)) exp = exp.mul(expinmc1)
        return exp
    },
    branches: ["s", "e"],
    effectSoftcapInfo() {
        let weffpow = 3
        if (hasUpgrade('w', 22)) weffpow = 4
        if (hasUpgrade('w', 23)) weffpow = 2
        if (hasUpgrade('w', 31)) weffpow = 3
        if (hasUpgrade('e', 65)) weffpow = 5
        if (hasUpgrade("era", 133)) weffpow = 17.5
        if (hasUpgrade("m", 152)) weffpow = 21.25
        let cap = 0.3
        if (hasUpgrade("w", 92)) cap = 0.35
        let sprcap = 0.25
        return {
            formula: `(Water + 1)^${weffpow}`,
            exponent: weffpow,
            target: "Energy",
            stages: [
                { label: "Softcap", start: "e5e13", power: cap },
                { label: "Supercap", start: "e1e17", power: sprcap },
            ],
        }
    },
    effect(){
        const info = this.effectSoftcapInfo()
        return applyEffectSoftcaps(player.w.points.add(1).pow(info.exponent), info.stages)
           },
            effectDescription() {
                let softcapDescription = ""
                let layerEffect = tmp[this.layer].effect
                if (layerEffect.gte(new Decimal("e5e13")) ) {
                    softcapDescription = " (Softcapped)"
                }
                if (layerEffect.gte(new Decimal("e1e17")) ) {
                    softcapDescription = " (Supercapped)"
                }
                let desc = "which is boosting Energy by x" + notationChooser(tmp[this.layer].effect) + softcapDescription;
                return desc;
            },
    row: 5, // Row the layer is in on the tree (0 is the first row)
})
