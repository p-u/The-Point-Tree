addLayer("s", {
    name: "Supreme", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SU", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        sb5eff: new Decimal(1),
        sb5hc: new Decimal(1.25),
    }},
    layerShown(){
        let visible = false
        if (hasMilestone('sac', 32) || player.s.unlocked || player["s"].points.gte(1)) visible = true
       return visible
    },
    passiveGeneration() {
        if (hasUpgrade('s', 42)) return (buyableEffect('s', 12))
        return 0
    },
    tabFormat: {
        "Main tab": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                "blank",
                "milestones",
                "blank",
                "blank",
                "blank",
                "upgrades"
            ],
        },
        "Supreme Buyables": {
            unlocked() { return (hasAchievement('a', 112))},
            content: [
                "main-display",
                "blank",
                "blank",
                "buyables"
            ],
        },
    },
    automate() {
		if (hasMilestone('sac', 46)) {
			if (layers.s.buyables[11].canAfford()) {
				layers.s.buyables[11].buy();
			};
		};
        if (hasMilestone('sac', 48)) {
			if (layers.s.buyables[12].canAfford()) {
				layers.s.buyables[12].buy();
			};
		};
        if (hasMilestone('sac', 51)) {
			if (layers.s.buyables[13].canAfford()) {
				layers.s.buyables[13].buy();
			};
		};
        if (hasUpgrade('s', 101)) {
			if (layers.s.buyables[14].canAfford()) {
				layers.s.buyables[14].buy();
			};
		};
        if (hasMilestone('s', 9)) {
			if (layers.s.buyables[15].canAfford()) {
				layers.s.buyables[15].buy();
			};
		};
        if (hasMilestone('s', 9)) {
			if (layers.s.buyables[16].canAfford()) {
				layers.s.buyables[16].buy();
			};
		};
	},
    doReset(s) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[s].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
    
    
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
        if (hasMilestone("era", 3)) keep.push("upgrades");
        if (hasMilestone("era", 3)) keep.push("milestones");
        if (hasMilestone("era", 3)) keep.push("buyables");
    
        // Stage 4, do the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },  
    color: "#63e5ff",
    requires: new Decimal("e78250"), // Can be a function that takes requirement increases into account
    resource: "Supreme Points", // Name of currency
    baseResource: "Mega Points", // Name of resource prestige is based on
    baseAmount() {return player.mega.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0001, 
    milestones: {
        1: {
            requirementDescription: "The First Supreme",
            effectDescription: "x5 Energy, Keep Dim Shift Reb Upgs on reset",
            done() { return player["s"].points.gte(1) }
        },
        2: {
            requirementDescription: "Wow, QoL [15 Supreme Pts]",
            effectDescription: "Keep Energy Upgs row 7 and 8 on reset",
            done() { return player["s"].points.gte(15) }
        },
        3: {
            requirementDescription: "More QoL [50 Supreme Pts]",
            effectDescription: "Keep Energy Upgs row 9 on reset",
            unlocked() {return player["s"].points.gte(15)},
            done() { return player["s"].points.gte(50) }
        },
        4: {
            requirementDescription: "Supreme Extension 1 - More Energy [12K Supreme Pts]",
            effectDescription: "Unlock 4 new upgs",
            unlocked() {return (hasUpgrade('s', 24))},
            done() { return player["s"].points.gte(12000) }
        },
        5: {
            requirementDescription: "New Reset Layer [35K Supreme Pts]",
            effectDescription: "Unlock Reset Layer: Water",
            unlocked() {return (hasUpgrade('s', 34))},
            done() { return player["s"].points.gte(35000) }
        },
        6: {
            requirementDescription: "A ton of supreme points - 25M",
            effectDescription: "xee6 PF, x15 Water",
            unlocked() {return (hasUpgrade('w', 24))},
            done() { return player["s"].points.gte(25e6) }
        },
        7: {
            requirementDescription: "Too Much SP - e13,015",
            effectDescription: "SU21 and SU52 is MUCH STRONGER",
            unlocked() {return (hasMilestone('sac', 63))},
            done() { return player["s"].points.gte("e13015") }
        },
        8: {
            requirementDescription: "MC2S (Supreme I) - 1.6e1446",
            effectDescription: "+^0.08 MP, Sacrifice Scaling slightly lower",
            done() {
                if (inChallenge("m", 12)) {
                    if (player["s"].points.gte("1.6e1446")) {
                        return true
                    }
                }
            },
            unlocked() {return (inChallenge("s", 12))},
        },
        9: {
            requirementDescription: "e2B Supreme",
            effectDescription: "Autobuy Supreme Buyable 5 and 6, xe50T PF",
            unlocked() {return (hasUpgrade('s', 115))},
            done() { return player["s"].points.gte("e2e9") }
        },
        10: {
            requirementDescription: "e10T Supreme",
            effectDescription: "+^0.01 SB5 HC",
            unlocked() {return (hasUpgrade('s', 115))},
            done() { return player["s"].points.gte("e1e13") }
        },
    },
    upgrades: {
        11: {
            title: "Supremely Good",
            description: "xe300K PF",
            cost: new Decimal(2),
        },
        12: {
            title: "Supreme Power",
            description: "^1.01 PF",
            cost: new Decimal(7),
            unlocked() { return hasUpgrade("s", 11) },
        },
        13: {
            title: "Supreme Mega Good",
            description: "xe600K PF, xe1K MP",
            cost: new Decimal(25),
            unlocked() { return hasUpgrade("s", 12) },
        },
        14: {
            title: "Supreme Power II",
            description: "^1.01 PF, +^0.01 PP",
            cost: new Decimal(125),
            unlocked() { return hasUpgrade("s", 13) },
        },
        21: {
            title: "Sac Energy",
            description: "Every sac x2 energy",
            cost: new Decimal(100),
            effect() {
                let supu5 = new Decimal(2)
                let exp = new Decimal(1)
                if (hasUpgrade('s', 52)) exp = new Decimal(25)
                if (hasUpgrade('m', 32)) exp = new Decimal(50)
                if (hasUpgrade('m', 64)) exp = new Decimal(80)
                if (hasMilestone('s', 7)) exp = new Decimal(800)
                if (hasUpgrade("era", 131)) exp = new Decimal(25000)
                if (hasUpgrade("m", 101)) exp = new Decimal(2.5e6)
                let sacpt = player["sac"].points
                let eff = supu5.pow(sacpt).pow(exp)
                return eff
            },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                return "This upgrade boosts Energy by " + notationChooser(upgEffect)+"x" + softcapDescription
            },
            unlocked() { return hasUpgrade("s", 14) },
        },
        22: {
            title: "The Supremely OP UPG",
            description: "xe1.5M PF",
            cost: new Decimal(480),
            unlocked() { return hasUpgrade("s", 21) },
        },
        23: {
            title: "Choice 1",
            description: "Supreme Buyable 1 base x1.3 to x1.4",
            cost: new Decimal(3500),
            unlocked() { return hasUpgrade("s", 22) },
        },
        24: {
            title: "Choice 1",
            description: "^1.004 PF",
            cost: new Decimal(3500),
            unlocked() { return hasUpgrade("s", 23) },
        },
        31: {
            title: "Supremegy",
            description: "xe15 Energy",
            cost: new Decimal(7000),
            unlocked() { return hasUpgrade("s", 24) && hasMilestone("s", 4) },
        },
        32: {
            title: "Supremelegy",
            description: "xe25 Energy",
            cost: new Decimal(9000),
            unlocked() { return hasUpgrade("s", 31) && hasMilestone("s", 4) },
        },
        33: {
            title: "Supremeletegy",
            description: "xe30 Energy",
            cost: new Decimal(10000),
            unlocked() { return hasUpgrade("s", 32) && hasMilestone("s", 4) },
        },
        34: {
            title: "Supremeletewegy",
            description: "xe30 Energy",
            cost: new Decimal(12000),
            unlocked() { return hasUpgrade("s", 33) && hasMilestone("s", 4) },
        },
        41: {
            title: "Supreme-e-water",
            description: "xe1M PF, x2 Water",
            cost: new Decimal(225000),
            unlocked() { return hasUpgrade("w", 24) && hasUpgrade("s", 34) },
        },
        42: {
            title: "Unlock the 2nd supreme buyable",
            description: "Yay!",
            cost: new Decimal(9.25e5),
            unlocked() { return hasUpgrade("w", 24) && hasUpgrade("s", 41) },
        },
        43: {
            title: "Supremely Boost",
            description: "xe1M PF, x1.8 SP",
            cost: new Decimal(3e6),
            unlocked() { return hasUpgrade("w", 24) && hasUpgrade("s", 42) },
        },
        44: {
            title: "Supremer than ever",
            description: "xe2.1M PF, Supreme Buyable 2 has better effect formula",
            cost: new Decimal(7e11),
            unlocked() { return hasUpgrade("w", 24) && hasUpgrade("s", 43) },
        },
        51: {
            title: "Yes! Compounding X",
            description: "Supreme boosts itself",
            cost: new Decimal(1.7e19),
            unlocked() { return hasUpgrade("mega", 84) && hasUpgrade("s", 44) },
            effect() {
                let cxexp = 0.0325
                if (hasUpgrade('m', 32)) cxexp = new Decimal(0.075)
                if (hasUpgrade('s', 25)) cxexp = new Decimal(0.115)
                if (hasUpgrade('era', 251)) cxexp = new Decimal(0.14)
                if (hasUpgrade('s', 122)) cxexp = new Decimal(0.165)
                return player["s"].points.add(1).pow(cxexp)
            },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                return "This upgrade boosts Supreme Points by " + notationChooser(upgEffect)+"x" + softcapDescription
            },
        },
        52: {
            title: "Sac is OP",
            description: "Every sac above 30 x2 water, and Supreme Upg 21 is MUCH STRONGER. Extend Water Upgs",
            cost: new Decimal(2e20),
            effect() {
                let supu5 = new Decimal(2)
                if (hasUpgrade('m', 32)) supu5 = new Decimal(4)
                if (hasMilestone('s', 7)) supu5 = new Decimal(40)
                let sacpt = player["sac"].points
                let eff = supu5.pow(sacpt.sub(30))
                if (hasUpgrade("w", 73)) eff = eff.pow(500)
                if (hasUpgrade("m", 101)) eff = eff.pow(12.5)
                return eff
            },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                return "This upgrade boosts Water by " + notationChooser(upgEffect)+"x" + softcapDescription
            },
            unlocked() { return hasUpgrade("s", 51) },
        },
        53: {
            title: "FINALLY!",
            description: "Unlock Supreme Buyable 3. Supreme Buyable 1 has better formula",
            cost: new Decimal(3e33),
            unlocked() { return hasUpgrade("s", 52) },
        },
        54: {
            title: "8-Boost...",
            description: "PF xe2M, BP xe500K, RP xe120K, PP xe40K, MP xe6K, Energy xe20, Water xe1, SP xe0.5",
            cost: new Decimal(7e33),
            unlocked() { return hasUpgrade("s", 53) },
        },
        61: {
            title: "Game-Changer",
            description: "^1.01 PF, xe10,000,000 PF [WOW!!]",
            cost: new Decimal(2e41),
            unlocked() { return hasUpgrade("s", 54) },
        },
        62: {
            title: "Buyable Stronk",
            description: "SB1 and SB3 is stronger",
            cost: new Decimal(1.25e46),
            unlocked() { return hasUpgrade("s", 61) },
        },
        63: {
            title: "Supremacy Buyable",
            description: "^1.03 PF, Supreme Strong, but scales insanely",
            cost: new Decimal(1.1e50),
            unlocked() { return hasUpgrade("s", 62) },
        },
        64: {
            title: "SP Gets Boosted based on PF.",
            description: "Yeah.",
            effect() {
                let sppfbe = 0.0000000025
                if (hasUpgrade("m", 61)) sppfbe = 0.0000000035
                let eff = player.points.add(1).pow(sppfbe)
                eff = softcap(eff, new Decimal("1e100"), 0.5)
                return eff
            },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("e100")) ) {
                    softcapDescription = " (Softcapped)"
                }
                return "This upgrade boosts Supreme Points by " + notationChooser(upgEffect)+"x" + softcapDescription
            },
            cost: new Decimal(2.5e59),
            unlocked() { return hasUpgrade("s", 63) },
        },
        71: {
            title: "Massive Choice Upgrades (1: xe5M PF)",
            description: "Choose one row. 7 or 8. The other row scales in price immensely.",
            cost:() => {
                let price = new Decimal("1.2e61")
                if (hasUpgrade("s", 84)) price = new Decimal ("3.3e72")
                return price
            },
            unlocked() { 
                if (hasUpgrade("s", 64)) {
                    if (hasUpgrade("s", 81)) {
                        if (hasUpgrade("s", 84)) {
                            return true;
                        } else {
                            if (hasUpgrade("s", 74)) {
                                return true
                            } else {
                                return false
                            }
                        }
                    } else {
                        return true;
                    }
                } else {
                    return false; // or any other appropriate behavior
                }
            },            
        },
        72: {
            title: "Massive Choice Upgrades (2: xe6M PF)",
            description: "Choose one row. 7 or 8. The other row scales in price immensely.",
            cost:() => {
                let price = new Decimal("4e62")
                if (hasUpgrade("s", 84)) price = new Decimal ("1.125e74")
                return price
            },
            unlocked() { return hasUpgrade("s", 71) },
        },
        73: {
            title: "Massive Choice Upgrades (3: xe8M PF)",
            description: "Choose one row. 7 or 8. The other row scales in price immensely.",
            cost:() => {
                let price = new Decimal("5e66")
                if (hasUpgrade("s", 84)) price = new Decimal ("6.6e75")
                return price
            },
            unlocked() { return hasUpgrade("s", 72) },
        },
        74: {
            title: "Massive Choice Upgrades (4: xe10M PF)",
            description: "Choose one row. 7 or 8. The other row scales in price immensely.",
            cost:() => {
                let price = new Decimal("1e69")
                if (hasUpgrade("s", 84)) price = new Decimal ("1.9e78")
                return price
            },
            unlocked() { return hasUpgrade("s", 73) },
        },
        81: {
            title: "Massive Choice Upgrades (1: x50 SP)",
            description: "Choose one row. 7 or 8. The other row scales in price immensely.",
            cost:() => {
                let price = new Decimal("1.2e61")
                if (hasUpgrade("s", 74)) price = new Decimal ("1e72")
                return price
            },
            unlocked() { 
                if (hasUpgrade("s", 64)) {
                    if (hasUpgrade("s", 71)) {
                        if (hasUpgrade("s", 74)) {
                            return true
                        } else {
                            if (hasUpgrade("s", 84)) {
                                return true
                            } else {
                                return false
                            }
                        }
                    } else {
                        return true
                    }
                } else {
                    return false
                }
            },    
        },                    
        82: {
            title: "Massive Choice Upgrades (2: +^0.025 MP)",
            description: "Choose one row. 7 or 8. The other row scales in price immensely.",
            cost:() => {
                let price = new Decimal("7e62")
                if (hasUpgrade("s", 74)) price = new Decimal ("7.35e73")
                return price
            },
            unlocked() { return hasUpgrade("s", 81) },
        },
        83: {
            title: "Massive Choice Upgrades (3: Supremacy Buyable is Stronger)",
            description: "Choose one row. 7 or 8. The other row scales in price immensely.",
            cost:() => {
                let price = new Decimal("8e66")
                if (hasUpgrade("s", 74)) price = new Decimal ("4e75")
                return price
            },
            unlocked() { return hasUpgrade("s", 82) },
        },
        84: {
            title: "Massive Choice Upgrades (4: +^0.025 PP)",
            description: "Choose one row. 7 or 8. The other row scales in price immensely.",
            cost:() => {
                let price = new Decimal("1.7e71")
                if (hasUpgrade("s", 74)) price = new Decimal ("1.45e80")
                return price
            },
            unlocked() { return hasUpgrade("s", 83) },
        },
        91: {
            title: "Basic Love",
            description: "xe10M BP. x1.0M PF",
            cost: new Decimal(3.33e81),
            unlocked() { return hasUpgrade("s", 84) },
        },
        92: {
            title: "Less Nerfs",
            description: "Rebirth and Prestige Softcap is weaker",
            cost: new Decimal(1e105),
            unlocked() { return hasUpgrade("s", 91) },
        },
        93: {
            title: "PP is a must.",
            description: "+^0.05 PP",
            cost: new Decimal(2.3e136),
            unlocked() { return hasUpgrade("s", 92) },
        },
        94: {
            title: "The Last Upgrade, before the next Reset Layer",
            description: "^1.04 PF",
            cost: new Decimal(3.6e179),
            unlocked() { return hasUpgrade("s", 93) },
        },
        101: {
            title: "More!",
            description: "xe100M PF, Autobuy Supreme Buyable 4",
            cost: new Decimal("5e1229"),
            unlocked() { return hasUpgrade("s", 94) && hasMilestone("sac", 53) },
        },
        102: {
            title: "Unleash the Ultimate Weapon!",
            description: "Unlock Supreme Buyable 5. It's not the same as the others...",
            cost: new Decimal("4.75e1266"),
            unlocked() { return hasUpgrade("s", 101) && hasMilestone("sac", 53) },
        },
        103: {
            title: "Another SB4 buff",
            description: "SB4 effect has been increased from x1e8 per buy to x1e15 per buy",
            cost: new Decimal("1e1405"),
            unlocked() { return hasUpgrade("s", 102) && hasMilestone("sac", 53) },
        },
        104: {
            title: "Yes!",
            description: "^1.025 PF, xe125M PF",
            cost: new Decimal("1.4e1529"),
            unlocked() { return hasUpgrade("s", 103) && hasMilestone("sac", 53) },
        },
        111: {
            title: "I want XTra Mult!",
            description: "xe25B PF, xe100B BP, xe35B RP, xe3B PP, xe250M MP",
            cost: new Decimal("1.5e1331626"),
            unlocked() { return hasUpgrade("s", 104) && hasUpgrade("era", 52) },
        },
        112: {
            title: "Capping Later",
            description: "Supreme Buyable 5 now caps at ^1.26 instead of ^1.25",
            cost: new Decimal("5e1507864"),
            unlocked() { return hasUpgrade("s", 111) && hasUpgrade("era", 52) },
        },
        113: {
            title: "More power...",
            description: "^1.012 PF",
            cost: new Decimal("5e1566058"),
            unlocked() { return hasUpgrade("s", 111) && hasUpgrade("era", 52) },
        },
        114: {
            title: "More EC and a really huge amount of mult",
            description: "xe250B PF, x15 Era Crystals, unlock more Era Ups",
            cost: new Decimal("1e1727316"),
            unlocked() { return hasUpgrade("s", 111) && hasUpgrade("era", 52) },
        },

        // ds6
        15: {
            title: "Another DS, another struggle",
            description: "+^0.08 Supreme Points and Water",
            cost: new Decimal("5e138615545"),
            unlocked() { return hasMilestone("sac", 87) },
        },
        25: {
            title: "Compoundation",
            description: "Both SP and Water Compounding Upgrades are stronger.",
            cost: new Decimal("9e149391536"),
            unlocked() { return hasUpgrade("s", 15) && hasMilestone("sac", 87) },
        },
        35: {
            title: "Hardening",
            description: "Supreme Buyable 1, 3, 4 is stronger",
            cost: new Decimal("2e153164040"),
            unlocked() { return hasUpgrade("s", 25) && hasMilestone("sac", 87) },
        },
        45: {
            title: "Supreme Dimensional Fragmentation",
            description: "xe15T PF",
            cost: new Decimal("6e167720991"),
            unlocked() { return hasUpgrade("s", 35) && hasMilestone("sac", 87) },
        },
        55: {
            title: "Release it.",
            description: "Is it OP?",
            cost: new Decimal("7e182341984"),
            unlocked() { return hasUpgrade("s", 45) && hasMilestone("sac", 87) },
        },
        65: {
            title: "Supreme Points boost Water.",
            description: "Yeah.",
            cost: new Decimal("1.8e239503265"),
            effect() {
                let spbw = 0.0325
                return player["s"].points.add(1).pow(spbw)
            },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                return "This upgrade boosts Water by " + notationChooser(upgEffect)+"x" + softcapDescription
            },
            unlocked() { return hasUpgrade("s", 55) && hasMilestone("sac", 87) },
        },
        75: {
            title: "Water boost Supreme Points.",
            description: "Yeah.",
            cost: new Decimal("1e240514236"),
            effect() {
                let wbsp = 0.69
                return player["w"].points.add(1).pow(wbsp)
            },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                return "This upgrade boosts Supreme Points by " + notationChooser(upgEffect)+"x" + softcapDescription
            },
            unlocked() { return hasUpgrade("s", 65) && hasMilestone("sac", 87) },
        },
        85: {
            title: "More Mega from SP",
            description: "MU84 is stronger",
            cost: new Decimal("3.5e263155312"),
            unlocked() { return hasUpgrade("s", 75) && hasMilestone("sac", 87) },
        },
        95: {
            title: "Prestige Stuff",
            description: "Supercap is weaker",
            cost: new Decimal("4e288522191"),
            unlocked() { return hasUpgrade("s", 85) && hasMilestone("sac", 87) },
        },
        105: {
            title: "Hardening II",
            description: "Supreme Buyable 5 HC +^0.005, Supreme Buyable 6 is better",
            cost: new Decimal("3.9e308881539"),
            unlocked() { return hasUpgrade("s", 95) && hasMilestone("sac", 87) },
        },
        115: {
            title: "Epitome of Supreme",
            description: "xe50T PF, ^1.005 PF, x115 Era Crystals, Extend EC Upgrades, Add 1 more Supreme Milestone",
            cost: new Decimal("5e424451358"),
            unlocked() { return hasUpgrade("s", 105) && hasMilestone("sac", 87) },
        },


        121: {
            title: "Even Bias",
            description: "All Even Layer# are boosted. [Reb, Mega, Energy, Water, Era]",
            cost: new Decimal("e5.38789735353e12"),
            unlocked() { return hasUpgrade("s", 115) && hasUpgrade("era", 305) },
        },
        122: {
            title: "Hycomp",
            description: "Compounding 9-11 is stronger.",
            cost: new Decimal("e5.685027196305e12"),
            unlocked() { return hasUpgrade("s", 121) && hasUpgrade("era", 305) },
        },
        123: {
            title: "yay ig",
            description: "xe1e17 PF!!",
            cost: new Decimal("e5.8231486151189e12"),
            unlocked() { return hasUpgrade("s", 122) && hasUpgrade("era", 305) },
        },
        124: {
            title: "Super Unoriginal Title, yea",
            description: "Oh yea, I forgot to bring the boost to you. It's err... +^0.01 SB5 cap? well, hope that's op enough for you",
            cost: new Decimal("e6.4666410712209e12"),
            unlocked() { return hasUpgrade("s", 123) && hasUpgrade("era", 305) },
        },
        125: {
            title: "Finaling ro twel fff",
            description: "Something imminent is coming up. ^1.01 PF.",
            cost: new Decimal("e6.72782802933975e12"),
            unlocked() { return hasUpgrade("s", 124) && hasUpgrade("era", 305) },
        },
    },
    buyables: {
    11: {
        title: "Supreme Buyable 1: Compounder",
        unlocked() { return (hasAchievement('a', 113)) },
        cost(x) {
            let exp2 = new Decimal(1.1)
            return new Decimal(200).mul(Decimal.pow(1.2, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
        },
        display() {
            return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " supreme points." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Supreme Points gain by x" + notationChooser(buyableEffect(this.layer, this.id))
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
            let base1 = new Decimal(1.3)
            if (hasUpgrade('s', 23)) base1 = new Decimal(1.4)
            if (hasUpgrade('s', 53)) base1 = new Decimal(1.45)
            if (hasUpgrade('s', 62)) base1 = new Decimal(1.8)
            if (hasUpgrade('m', 35)) base1 = new Decimal(2.5)
            if (hasUpgrade('m', 63)) base1 = new Decimal(3.2)
            if (hasUpgrade('w', 64)) base1 = new Decimal(25)
            if (hasUpgrade('basic', 104)) base1 = new Decimal(125)
            let base2 = x
            if (hasUpgrade('era', 44)) base2 = x.mul(new Decimal(333))
            if (hasUpgrade('s', 35)) base2 = x.mul(new Decimal(40000))
            if (hasUpgrade('era', 221)) base2 = x.mul(new Decimal(225000))
            if (hasUpgrade('m', 114)) base2 = x.mul(new Decimal(1e6))
            if (hasUpgrade("w", 82)) base2 = base2.pow(1.3)
            if (hasUpgrade("era", 75)) base2 = base2.pow(1.1)
            let expo = new Decimal(1.001)
            let eff = base1.pow(Decimal.pow(base2, expo))
            return eff
        },
    },
    12: {
        title: "Supreme Buyable 2: Passive Supreme Gen [CAP AT 150 PURCHASES]",
        unlocked() { return (hasUpgrade('s', 42)) },
        cost(x) {
            let exp2 = new Decimal(1.1)
            return new Decimal(100000).mul(Decimal.pow(1.175, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
        },
        display() {
            return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " supreme points." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Gain " + notationChooser(buyableEffect(this.layer, this.id)) + "x of manual reset"
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
            let base1 = new Decimal(1.1)
            if (hasUpgrade('s', 44)) base1 = new Decimal(1.15)
            if (hasUpgrade('m', 35)) base1 = new Decimal(1.5)
            if (hasUpgrade('m', 63)) base1 = new Decimal(1.9)
            if (hasUpgrade('basic', 104)) base1 = new Decimal(6)
            let base2 = x
            if (base2.gte(150)) base2 = new Decimal(150)
            if (base2.gte(150)) x = new Decimal(150)
            let expo = new Decimal(1.001)
            let eff = (base1.pow(Decimal.pow(base2, expo)) - new Decimal(0.99))
            return eff
        },
    },
    13: {
        title: "Supreme Buyable 3: Water Mult",
        unlocked() { return (hasUpgrade('s', 53)) },
        cost(x) {
            let exp2 = new Decimal(1.1)
            return new Decimal(1e30).mul(Decimal.pow(1.195, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
        },
        display() {
            return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " supreme points." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Multiply water by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
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
            let base1 = new Decimal(1.38)
            if (hasUpgrade('s', 62)) base1 = new Decimal(1.8)
            if (hasUpgrade('m', 35)) base1 = new Decimal(2.25)
            if (hasUpgrade('m', 63)) base1 = new Decimal(2.75)
            if (hasUpgrade('w', 64)) base1 = new Decimal(50)
            if (hasUpgrade('basic', 104)) base1 = new Decimal(75)
            let base2 = x
            if (hasUpgrade('era', 44)) base2 = x.mul(new Decimal(123))
            if (hasUpgrade('s', 35)) base2 = x.mul(new Decimal(12345))
            if (hasUpgrade('m', 114)) base2 = x.mul(new Decimal(33333))
            if (hasUpgrade("w", 82)) base2 = base2.pow(1.4)
            if (hasUpgrade("era", 75)) base2 = base2.pow(1.15)
            let expo = new Decimal(1.005)
            let eff = (base1.pow(Decimal.pow(base2, expo)))
            return eff
        },
    },
    14: {
        title: "Supreme Buyable 4: Supremacy",
        unlocked() { return (hasUpgrade('s', 63)) },
        cost(x) {
            let exp2 = new Decimal(3)
            if (hasMilestone('sac', 53)) exp2 = new Decimal(1.75)
            return new Decimal(1e50).mul(Decimal.pow(1.5, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
        },
        display() {
            return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " supreme points." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Multiply SP AND WATER by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
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
            let base1 = new Decimal(100)
            if (hasUpgrade('s', 83)) base1 = new Decimal(1000)
            if (hasUpgrade('m', 35)) base1 = new Decimal(10000)
            if (hasUpgrade('m', 63)) base1 = new Decimal(1000000)
            if (hasMilestone('sac', 53)) base1 = new Decimal(1e8)
            if (hasUpgrade('s', 103)) base1 = new Decimal(1e15)
            if ((hasUpgrade('basic', 104)) && !(hasMilestone("era", 1))) base1 = new Decimal(1e25)
            let base2 = x
            if (hasUpgrade('era', 44)) base2 = x.mul(new Decimal(100))
            if (hasUpgrade('s', 35)) base2 = x.mul(new Decimal(10000))
            if (hasUpgrade('m', 114)) base2 = x.mul(new Decimal(40000))
            if (hasUpgrade("w", 82)) base2 = base2.pow(1.5)
            if (hasUpgrade("era", 75)) base2 = base2.pow(1.1)
            let expo = new Decimal(1.005)
            let eff = (base1.pow(Decimal.pow(base2, expo)))
            return eff
        },
    },
    15: {
        title: "Supreme Buyable 5: PF Power!",
        unlocked() { return (hasUpgrade('s', 102)) },
        cost(x) {
            let exp2 = 2.5
            if (hasUpgrade('rebirth', 72)) exp2 = 2
            return new Decimal("1e1266").mul(Decimal.pow(1.75, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
        },
        display() {
            return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " supreme points." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: ^" + (tmp.s.sb5effect) + " Point Fragments."
        },
        canAfford() {
            return player[this.layer].points.gte(this.cost())
        },
        buy() {
            let cost = new Decimal (1)
            player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
    },
    16: {
        title: "Supreme Buyable 6: Weaker Sac Scaling (Cap -0.5)",
        unlocked() { return (hasUpgrade('s', 55)) },
        cost(x) {
            let exp2 = 2
            return new Decimal("1e182341000").mul(Decimal.pow(1.75, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
        },
        display() {
            return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " supreme points." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: -" + format(buyableEffect(this.layer, this.id)) + " to Sacrifice Scaling."
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
            let base1 = new Decimal(1.0012)
            if(hasUpgrade("s", 105)) base1 = new Decimal(1.0015)
            if(hasUpgrade("era", 221)) base1 = new Decimal(1.0018)
            if(hasUpgrade("w", 82)) base1 = new Decimal(1.0019)
            let base2 = x
            let expo = new Decimal(1.006)
            let eff = base1.pow(Decimal.pow(base2, expo)).sub(1)
            let hcap = new Decimal(0.5)
            if (eff.gte(hcap)) eff = hcap
            return eff
        },
    },
},  
    sb5effect() {
        let base1 = new Decimal(1.008)
        if (hasUpgrade('w', 64)) base1 = new Decimal(1.011)
        if (hasUpgrade('basic', 104)) base1 = new Decimal(1.013)
        let base2 = getBuyableAmount(this.layer, 15)
        let expo = new Decimal(1.004)
        let eff = base1.pow(Decimal.pow(base2, expo))
        let hcap = player.s.sb5hc
        if(hasUpgrade("s", 112)) hcap = hcap.add(0.01)
            if(hasUpgrade("era", 71)) hcap = hcap.add(0.008)
            if(hasUpgrade("era", 84)) hcap = hcap.add(0.005)
            if(hasMilestone("sac", 76)) hcap = hcap.add(0.0068)
            if(hasMilestone("sac", 77)) hcap = hcap.add(0.01)
            if(hasUpgrade("era", 102)) hcap = hcap.add(0.0066)
            if(hasUpgrade("era", 112)) hcap = hcap.add(0.0066)
            if(hasMilestone("sac", 80)) hcap = hcap.add(0.002)
            if(hasUpgrade("era", 132)) hcap = hcap.add(0.005)
            if(hasUpgrade("era", 152)) hcap = hcap.add(0.005)
            if(hasMilestone("sac", 84)) hcap = hcap.add(0.002)
            if(hasMilestone("sac", 85)) hcap = hcap.add(0.007)
            if(hasUpgrade("era", 192)) hcap = hcap.add(0.003)
            if(hasUpgrade("era", 193)) hcap = hcap.add(0.003)
            if(hasUpgrade("s", 105)) hcap = hcap.add(0.01)
            if(hasUpgrade("era", 223)) hcap = hcap.add(0.01)
            if(hasUpgrade("basic", 112)) hcap = hcap.add(0.0055)
            if(hasMilestone("sac", 93)) hcap = hcap.add(0.005)
            if(hasUpgrade("era", 232)) hcap = hcap.add(0.003)
            if(hasMilestone("sac", 96)) hcap = hcap.add(0.01)
            if(hasMilestone("sac", 98)) hcap = hcap.add(0.01)
            if(hasUpgrade("era", 134)) hcap = hcap.add(0.01)
            if(hasMilestone("sac", 104)) hcap = hcap.add(0.01)
            if(hasMilestone("s", 10)) hcap = hcap.add(0.01)
            if(hasUpgrade("s", 124)) hcap = hcap.add(0.01)
            if(hasUpgrade("m", 112)) hcap = hcap.add(0.01)
            if (hasAchievement("a", 246)) hcap = hcap.add(0.01)
            if ((hasUpgrade('m', 1134)) && inChallenge("m", 11)) hcap = hcap.add(0.038)
        if (eff.gte(hcap)) eff = hcap
        return eff
    },
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        mult = mult.times(buyableEffect('s', 11))
        if (hasUpgrade('basic', 102)) mult = mult.times(upgradeEffect('basic', 102))
        if (hasUpgrade('s', 63)) mult = mult.times(buyableEffect('s', 14))
        if (hasUpgrade('w', 21)) mult = mult.times(1.25)
        if (hasUpgrade('w', 24)) mult = mult.times(3)
        if (hasUpgrade('s', 43)) mult = mult.times(1.8)
        if (hasUpgrade('w', 34)) mult = mult.times(8)
        if (hasUpgrade('mega', 84)) mult = mult.times(200)
        if (hasUpgrade('s', 51)) mult = mult.times(upgradeEffect('s', 51))
        if (hasMilestone('sac', 34)) mult = mult.times(5)
        if (hasUpgrade('prestige', 45)) mult = mult.times(3)
        if (hasUpgrade('prestige', 55)) mult = mult.times(10)
        if (hasUpgrade('s', 54)) mult = mult.times(3.162277)
        if (hasMilestone('e', 13)) mult = mult.times(2.5)
        if (hasAchievement('a', 126)) mult = mult.times(4.51)
        if (hasUpgrade('s', 64)) mult = mult.times(upgradeEffect('s', 64))
        if (hasUpgrade('s', 81)) mult = mult.times(50)
        if (hasUpgrade('rebirth', 64)) mult = mult.times(111.11)
        if (hasUpgrade('basic', 91)) mult = mult.times(99.99)
        if (hasUpgrade('w', 51)) mult = mult.times(1e7)
        if (hasMilestone('sac', 50)) mult = mult.times("e106")
        if (hasUpgrade('rebirth', 74)) mult = mult.times(2)
        if (hasMilestone('sac', 63)) mult = mult.times(13.5)
        if (hasUpgrade('s', 75)) mult = mult.times(upgradeEffect('s', 75))
        if (hasUpgrade('mega', 105)) mult = mult.times("e50e9")
        if (hasUpgrade('m', 121)) mult = mult.times("e1e12")

        // secret achievement
        if (hasAchievement('sa', 25)) mult = mult.times(1.05)
        if (hasAchievement('sa', 26)) mult = mult.times(1.05)
        if (hasAchievement('sa', 33)) mult = mult.times(1.2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade('s', 61)) exp = exp.add(0.01)
        if (hasUpgrade('m', 84)) exp = exp.add(0.05)
        if (hasUpgrade('mega', 94)) exp = exp.add(0.005)
        if (hasUpgrade('s', 15)) exp = exp.add(0.08)
        if (hasUpgrade('era', 165)) exp = exp.add(0.05)
            if (hasUpgrade('era', 273)) exp = exp.add(0.125)
        if (inChallenge('m', 11)) exp = exp.mul(0.4)
        if ((inChallenge("m", 11)) && (hasUpgrade("m", 1113))) exp = exp.add(0.15)
        return exp
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Supreme (because s,p,r is taken)!", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["mega", "sac", "e"],
})