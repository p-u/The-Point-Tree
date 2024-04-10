addLayer("mega", {
    name: "Mega Points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    passiveGeneration() {
        if (hasMilestone('sac', 7)) return 4.782528
        if (hasMilestone('sac', 5)) return 0.4782528
        if (hasMilestone('sac', 4)) return 0.251712
        if (hasMilestone('sac', 3)) return 0.1104
        if (hasMilestone('sac', 1)) return 0.0184
        return 0
    },
    doReset(mega) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[mega].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
        for(i=1;i<5;i++){ //rows
            for(v=1;v<3;v++){ //columns
                if ((hasMilestone('sac', 7)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
              }
            for(v=3;v<4;v++){ //columns
                if ((hasMilestone('sac', 10)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
              }
            for(v=4;v<5;v++){ //columns
              if ((hasMilestone('sac', 14)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
            for(v=5;v<6;v++){ //columns
                if ((hasMilestone('sac', 16)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
              }
              for(v=6;v<7;v++){ //columns
                if ((hasMilestone('sac', 22)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
              }
            for(v=7;v<8;v++){ //columns
                if ((hasMilestone('mega', 16)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
              }
            for(v=8;v<9;v++){ //columns
                if ((hasMilestone('mega', 17)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
              }
          }
    
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
        if (hasMilestone('sac', 3)) keep.push("milestones");
    
        // Stage 4, do the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },  
    layerShown(){
        let visible = false
        if (hasUpgrade('prestige', 32) || player.mega.unlocked) visible = true
       return visible
     },
     automate() {
		if (hasMilestone('sac', 8)) {
			if (layers.mega.buyables[11].canAfford()) {
				layers.mega.buyables[11].buy();
			};
		};
        if (hasMilestone('sac', 12)) {
			if (layers.mega.buyables[12].canAfford()) {
				layers.mega.buyables[12].buy();
			};
		};
        if (hasMilestone('sac', 21)) {
			if (layers.mega.buyables[13].canAfford()) {
				layers.mega.buyables[13].buy();
			};
		};
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
        "Buyables": {
            content: [
                ["infobox", "buyable"],
                "main-display",
                "blank",
                "blank",
                "buyables"
            ],
        },
    },
    upgrades: {
        11: {
            title: "Mega upgrades come with MEGA boosts.",
            description: "x10B PF, x1K BP, x10 RP",
            cost: new Decimal(1),
        },
        12: {
            title: "How about another upgrade?",
            description: "x250 RP and x10M PF",
            cost: new Decimal(1),
            unlocked() { return hasUpgrade("mega", 11) },
        },
        13: {
            title: "Is it a pain to grind?",
            description: "^1.02 PF, +^0.01 RP",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("mega", 12) },
        },
        14: {
            title: "Price Jump",
            description: "Prestige Points gets boosted based on itself.",
            cost: new Decimal(450),
            unlocked() { return hasUpgrade("mega", 13) },
            effect() {
                let mu4exp = 0.055
                if (hasUpgrade('basic', 63)) mu4exp = 0.08
                if (hasUpgrade('mega', 41)) mu4exp = 0.1
                if (hasUpgrade('e', 64)) mu4exp = 0.155
                return player["prestige"].points.add(1).pow(mu4exp)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            title: "THE PRICE...",
            description: "x1e50 PF",
            cost: new Decimal(35e6),
            unlocked() { return hasUpgrade("mega", 14) },
        },
        22: {
            title: "123 Exponent",
            description: "+^0.01 PP, +^0.02 RP, +^0.03 BP",
            cost: new Decimal(150e6),
            unlocked() { return hasUpgrade("mega", 21) },
        },
        23: {
            title: "Exponents",
            description: "^1.03 Point Fragments...",
            cost: new Decimal(5e9),
            unlocked() { return hasUpgrade("mega", 22) },
        },
        24: {
            title: "'To' upgrades",
            description: "x1 Qi Rebirth Points to Point Fragments",
            cost: new Decimal(1.2e12),
            unlocked() { return hasUpgrade("mega", 23) },
        },
        31: {
            title: "Mega is useful at achieving big numbers.",
            description: "Mega boosts point fragments heavily.",
            cost: new Decimal(1e13),
            unlocked() { return hasUpgrade("mega", 24) },
            effect() {
                let mu9exp = 8.5
                if (hasUpgrade("mega", 33)) mu9exp = 12.5
                if (hasUpgrade("e", 95)) mu9exp = 14.25
                if (hasUpgrade('m', 31)) mu9exp = 22.5
                if (inChallenge("m", 11)) {
                    if (hasMilestone('mega', 19)) mu9exp = 5750
                }
                return player["mega"].points.add(1).pow(mu9exp)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        32: {
            title: "Exponents 2",
            description: "Point fragments ^1.025.",
            cost: new Decimal(1.8e14),
            unlocked() { return hasUpgrade("mega", 31) },
        },
        33: {
            title: "Buyablility",
            description: "Unlock Mega Buyable 1! MU9 is also stronger.",
            cost: new Decimal(3.5e17),
            unlocked() { return hasUpgrade("mega", 32) },
        },
        34: {
            title: "Strength Plus",
            description: "Buyables are 2 TIMES AS STRONG!",
            cost: new Decimal(2e32),
            unlocked() { return hasUpgrade("mega", 33) },
        },
        41: {
            title: "Dub-Upgrade Boost",
            description: "Prestige upgrade 6 and mega upgrade 4 is boosted.",
            cost: new Decimal(5e141),
            unlocked() { return hasMilestone("sac", 4) && hasUpgrade("mega", 34) },
        },
        42: {
            title: "Compounding V",
            description: "Mega boosts itself, slightly",
            cost: new Decimal(4.44e197),
            unlocked() { return hasMilestone("sac", 5) && hasUpgrade("mega", 41) },
            effect() {
                let mbiupgexp = 0.0325
                if (hasMilestone("sac", 6)) mbiupgexp = 0.05
                if (hasUpgrade("basic", 73)) mbiupgexp = 0.07
                if (hasUpgrade("basic", 74)) mbiupgexp = 0.094
                if (hasMilestone("sac", 9)) mbiupgexp = 0.115
                if (hasUpgrade("mega", 52)) mbiupgexp = 0.1515
                let eff = player["mega"].points.add(1).pow(mbiupgexp)
                eff = softcap(eff, new Decimal("1e8000"), 0.4)
                return eff
            },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("e8000")) ) {
                    softcapDescription = " (Softcapped)"
                }
                return "This upgrade boosts Mega Points by " + format(upgEffect)+"x" + softcapDescription
            },
        },
        43: {
            title: "Buyable Boost Boost",
            description: "Buyables are significantly stronger",
            cost: new Decimal(1e247),
            unlocked() { return hasMilestone("sac", 6) && hasUpgrade("mega", 42) },
        },
        44: {
            title: "A trade-off?",
            description: "Mega Buyable 1 is 2x as strong!! but less mega point (only slightly)",
            cost: new Decimal("5.49e549"),
            unlocked() { return hasMilestone("sac", 8) && hasUpgrade("mega", 43) },
        },
        51: {
            title: "BuyableX",
            description: "8x Energy, Mega Buyables 1 and 2 are stronger.",
            cost: new Decimal("2e1424"),
            unlocked() { return hasMilestone("sac", 11) && hasUpgrade("mega", 44) },
        },
        52: {
            title: "Increasing",
            description: "Mega Upgrade 14 is stronger.",
            cost: new Decimal("5e1634"),
            unlocked() { return hasMilestone("sac", 11) && hasUpgrade("mega", 51) },
        },
        53: {
            title: "Energy Energy",
            description: "x50 Energy.",
            cost: new Decimal("1e2032"),
            unlocked() { return hasMilestone("sac", 11) && hasUpgrade("mega", 52) },
        },
        54: {
            title: "MASSIVE BOOST",
            description: "x1e40K PF",
            cost: new Decimal("1.11e11007"),
            unlocked() { return hasMilestone("sac", 19) && hasUpgrade("mega", 53) },
        },
        61: {
            title: "Mega Rep Upgrade 1",
            description: "Each Rep Upgrade gives xe4K to PF",
            cost: new Decimal("1e11985"),
            unlocked() { return hasMilestone("sac", 19) && hasUpgrade("mega", 54) },
        },
        62: {
            title: "Mega Rep Upgrade 2",
            description: "Each Rep Upgrade gives xe4K to PF",
            cost: new Decimal("1e12090"),
            unlocked() { return hasMilestone("sac", 19) && hasUpgrade("mega", 61) },
        },
        63: {
            title: "Mega Rep Upgrade 3",
            description: "Each Rep Upgrade gives xe4K to PF",
            cost: new Decimal("1e12300"),
            unlocked() { return hasMilestone("sac", 20) && hasUpgrade("mega", 62) },
        },
        64: {
            title: "Mega Rep Upgrade 4",
            description: "Each Rep Upgrade gives xe4K to PF",
            cost: new Decimal("1e12400"),
            unlocked() { return hasMilestone("sac", 20) && hasUpgrade("mega", 63) },
        },
        71: {
            title: "HYPER MASSIVE BOOST",
            description: "x1e180K PF",
            cost: new Decimal("2.5e32835"),
            unlocked() { return hasMilestone("mega", 15) && hasUpgrade("mega", 64) },
        },
        72: {
            title: "Boost to Previous Upgrade",
            description: "Mega Upgrade 71 effect is ^1.8.",
            cost: new Decimal("1e33509"),
            unlocked() { return hasMilestone("mega", 15) && hasUpgrade("mega", 71) },
        },
        73: {
            title: "Prestigating",
            description: "Mega Upgrade 71 boosts prestige by ^0.015 of the PF boost.",
            cost: new Decimal("1e33509"),
            unlocked() { return hasMilestone("mega", 15) && hasUpgrade("mega", 72) },
        },
        74: {
            title: "Boost again",
            description: "Mega Upgrade 71 effect is ^1.5.",
            cost: new Decimal("2e34942"),
            unlocked() { return hasMilestone("mega", 15) && hasUpgrade("mega", 73) },
        },
        81: {
            title: "Oh, extension, huh?",
            description: "Mega softcap is weaker",
            cost: new Decimal("e134408"),
            unlocked() { return hasMilestone("sac", 33) && hasUpgrade("mega", 74) },
        },
        82: {
            title: "Buyables are way better",
            description: "All buyables are much better",
            cost: new Decimal("e136435"),
            unlocked() { return hasMilestone("sac", 33) && hasUpgrade("mega", 81) },
        },
        83: {
            title: "Some improvement",
            description: "^1.02 PP and MP, MP Softcap weaker",
            cost: new Decimal("e140393"),
            unlocked() { return hasMilestone("sac", 33) && hasUpgrade("mega", 82) },
        },
        84: {
            title: "Supreme Mega",
            description: "x200 SP, x200 Water, SP boosts MP",
            cost: new Decimal("e155039"),
            effect() {
                let sprmegaexp = 400
                let eff = player["s"].points.add(1).pow(sprmegaexp)
                eff = softcap(eff, new Decimal("1e25000"), 0.1)
                return eff
            },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("e25000")) ) {
                    softcapDescription = " (Softcapped)"
                }
                return "This upgrade boosts Mega Points by " + format(upgEffect)+"x" + softcapDescription
            },
            unlocked() { return hasMilestone("sac", 33) && hasUpgrade("mega", 83) },
        },
    },
    milestones: {
        1: {
            requirementDescription: "2 MP",
            effectDescription: "Generate 1B% of Basic Points a second AND 1M% of Rebirth Points a second",
            done() { return player["mega"].points.gte(2) }
        },
        2: {
            requirementDescription: "20 MP",
            effectDescription: "Keep Prestige Milestones and Prestige upgrade 21",
            done() { return player["mega"].points.gte(20) }
        },
        3: {
            requirementDescription: "1,600 MP",
            effectDescription: "Get an extension to Basic Upgrades.",
            done() { return player["mega"].points.gte(1600) }
        },
        4: {
            requirementDescription: "70,000 MP",
            effectDescription: "Gain 100% of Prestige Points every second and keep PU11-14.",
            done() { return player["mega"].points.gte(70000) }
        },
        5: {
            requirementDescription: "8e8 MP",
            effectDescription: "Gain 5,000% of Prestige Points every second and keep PU21-24",
            done() { return player["mega"].points.gte(8e8) }
        },
        6: {
            requirementDescription: "1e10 MP",
            effectDescription: "Keep Row 6 Basic Upgs.",
            done() { return player["mega"].points.gte(1e10) }
        },
        7: {
            requirementDescription: "5e24 MP",
            effectDescription: "Extend Rebirth Upgrades and keep PU31 and PU32.",
            done() { return player["mega"].points.gte(5e24) }
        },
        8: {
            requirementDescription: "2e37 MP",
            effectDescription: "x1e111 Point Fragments.",
            done() { return player["mega"].points.gte(2e37) }
        },
        9: {
            requirementDescription: "1e43 MP",
            effectDescription: "Keep RU33 and RU34 on Reset",
            done() { return player["mega"].points.gte(1e43) }
        },
        10: {
            requirementDescription: "4e44 MP",
            effectDescription: "Extend Prestige Upgrades.",
            done() { return player["mega"].points.gte(4e44) }
        },
        11: {
            requirementDescription: "4e65 MP",
            effectDescription: "X2.9 Mega Points",
            done() { return player["mega"].points.gte(4e65) }
        },
        12: {
            requirementDescription: "1e110 MP",
            effectDescription: "Unlock the next reset layer!",
            done() { return player["mega"].points.gte(1e110) }
        },
        13: {
            requirementDescription: "4.74e474 MP",
            effectDescription: "Unlock the second mega buyable!",
            unlocked() {return player["mega"].points.gte("2e17")},
            done() { return player["mega"].points.gte("4.74e474") }
        },
        14: {
            requirementDescription: "1e9065 MP",
            effectDescription: "Unlock the third mega buyable!",
            unlocked() {return player["mega"].points.gte("4.74e474")},
            done() { return player["mega"].points.gte("1e9065") }
        },
        15: {
            requirementDescription: "1e32835 MP",
            effectDescription: "Unlock one more row of mega upgrades!",
            unlocked() {return player["sac"].points.gte(26)},
            done() { return player["mega"].points.gte("1e32835") }
        },
        16: {
            requirementDescription: "1e40000 MP",
            effectDescription: "Keep that row of mega upgrades!",
            unlocked() {return player["mega"].points.gte("1e32835")},
            done() { return player["mega"].points.gte("1e40000") }
        },
        17: {
            requirementDescription: "1e200K MP",
            effectDescription: "Keep 8th row of mega upgrades!",
            unlocked() {return player["sac"].points.gte(38)},
            done() { return player["mega"].points.gte("1e200000") }
        },
        18: {
            requirementDescription: "e1105.39e3 MP",
            effectDescription: "+^0.07 MP, ^1.011 PF, xe11.0539M PF",
            unlocked() {return player["sac"].points.gte(64)},
            done() { return player["mega"].points.gte("e1105390") }
        },
        19: {
            requirementDescription: "mu31 [MCS Upg] - 9.78e978 MP [Req Sac 10]",
            effectDescription: "MU31 is insanely strong!",
            unlocked() {return inChallenge("m", 11)  && hasMilestone("sac", 10)},
            done() {
                if (inChallenge("m", 11)) {
                    if (hasMilestone("sac", 10)) {
                        if (player["mega"].points.gte("9.78e978")) {
                            return true
                        }
                    }
                }
            },
        },
        20: {
            requirementDescription: "[MCS] e1210 MP [Req Sac 10]",
            effectDescription: "+^0.3 MP",
            unlocked() {return inChallenge("m", 11) && hasMilestone("sac", 10) && hasMilestone("mega", 19)},
            done() {
                if (inChallenge("m", 11)) {
                    if (hasMilestone("sac", 10)) {
                            if (player["mega"].points.gte("e1210")) {
                            return true
                        }
                    }
                }
            },
        },
    },
    buyables: {
        11: {
            title: "Mega Buyable 1: Point Insanity",
            unlocked() { return hasUpgrade("mega", 33) },
            cost(x) {
                let exp2 = 1.1
                if (hasMilestone('sac', 3)) exp2 = 1.09125
                if (hasUpgrade('mega', 43)) exp2 = 1.069
                if (hasUpgrade('e', 31)) exp2 = 1.035
                if (hasMilestone('sac', 23)) exp2 = 1.35
                if (hasMilestone('sac', 26)) exp2 = 1.225
                return new Decimal(1e19).mul(Decimal.pow(1.3, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " mega" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Point Fragments gain by x" + format(buyableEffect(this.layer, this.id))
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
                let base1 = new Decimal(1e10)
                let base2 = x
                if (hasUpgrade('mega', 34)) base2 = x.mul(new Decimal(2))
                if (hasMilestone('sac', 3)) base2 = x.mul(new Decimal(3))
                if (hasUpgrade('mega', 43)) base2 = x.mul(new Decimal(4))
                if (hasUpgrade('mega', 44)) base2 = x.mul(new Decimal(8))
                if (hasUpgrade('mega', 51)) base2 = x.mul(new Decimal(10))
                if (hasUpgrade('e', 34)) base2 = x.mul(new Decimal(14))
                if (hasUpgrade('e', 44)) base2 = x.mul(new Decimal(20))
                if (hasMilestone('sac', 23)) base2 = x.mul(new Decimal(300))
                if (hasUpgrade('mega', 82)) base2 = x.mul(new Decimal(1800))
                let expo = new Decimal(1.005)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
        },
        12: {
            title: "Mega Buyable 2: Mega Mega",
            unlocked() { return hasMilestone("mega", 13) },
            cost(x) {
                let exp2 = 1.1
                if (hasUpgrade('e', 22)) exp2 = 1.085
                if (hasUpgrade('e', 42)) exp2 = 1.05
                if (hasMilestone('sac', 23)) exp2 = 1.5
                return new Decimal("1e474").mul(Decimal.pow(1.28, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " mega" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Mega Point gain by x" + format(buyableEffect(this.layer, this.id))
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
                let base1 = new Decimal(10)
                let base2 = x
                if (hasUpgrade('mega', 34)) base2 = x.mul(new Decimal(2))
                if (hasUpgrade('e', 44)) base2 = x.mul(new Decimal(4))
                if (hasMilestone('sac', 23)) base2 = x.mul(new Decimal(50))
                if (hasUpgrade('mega', 82)) base2 = x.mul(new Decimal(120))
                let expo = new Decimal(1.015)
                if (hasUpgrade('mega', 51)) expo = 1.0175
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
        },
        13: {
            title: "Mega Buyable 3: Energy Duplication",
            unlocked() { return hasMilestone("mega", 14) },
            cost(x) {
                let exp3 = 0.2
                if (hasMilestone('sac', 23)) exp3 = 0.5
                return new Decimal("1e6600").mul(Decimal.pow(1.28, x)).mul(Decimal.pow(x , Decimal.pow(1 + exp3 , x))).floor()
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " mega" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boosts Energy by x" + format(buyableEffect(this.layer, this.id))
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
                let base1 = new Decimal(2)
                let base2 = x
                if (hasMilestone('sac', 23)) base2 = x.mul(new Decimal(4))
                if (hasUpgrade('mega', 82)) base2 = x.mul(new Decimal(10))
                let expo = new Decimal(1.015)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
        },
    },
    infoboxes: {
        buyable: {
            title: "Buyables info",
            body() { return "Buyables can be bought more than once and gives OP effects" },
        },
    }, 
    color: "#FF5733",
    requires: new Decimal(1e13), // Can be a function that takes requirement increases into account
    resource: "Mega Points", // Name of currency
    baseResource: "Prestige Points", // Name of resource prestige is based on
    baseAmount() {return player.prestige.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        if (hasUpgrade('mega', 42)) mult = mult.times(upgradeEffect('mega', 42))
        if (hasUpgrade('mega', 84)) mult = mult.times(upgradeEffect('mega', 84))
        if (hasUpgrade('basic', 83)) mult = mult.times(upgradeEffect('basic', 83))
        if (hasUpgrade('basic', 71)) mult = mult.times(7.77e7)
        if (hasUpgrade('rebirth', 34)) mult = mult.times(10)
        if (hasUpgrade('rebirth', 41)) mult = mult.times(1e10)
        if (hasUpgrade('prestige', 34)) mult = mult.times(6e6)
        if (hasMilestone('mega', 11)) mult = mult.times(2.9)
        if (hasMilestone('sac', 1)) mult = mult.times(10)
        if (hasMilestone('sac', 11)) mult = mult.times(10)
        if (hasMilestone('sac', 4)) mult = mult.times(2.5e6)
        if (hasUpgrade('mega', 44)) mult = mult.times(0.0075)
        if (hasUpgrade('e', 13)) mult = mult.times(1e25)
        if (hasUpgrade('e', 24)) mult = mult.times(1e40)
        if (inChallenge("m", 11)) {
            if (hasUpgrade('e', 24)) mult = mult.times("1e460")
        }
        if (hasAchievement('a', 83)) mult = mult.times(1e81)
        if (hasUpgrade('e', 52)) mult = mult.div(1e50)
        if (hasUpgrade('basic', 45)) mult = mult.times(11.85)
        if (hasAchievement('a', 95)) mult = mult.times(1e195)
        if (hasUpgrade('e', 73)) mult = mult.times("1e300")
        if (hasUpgrade('e', 74)) mult = mult.times("1e150")
        if (hasUpgrade('e', 83)) mult = mult.times("1e700")
        if (inChallenge("sac", 13)) {
            if (hasUpgrade('e', 131)) mult = mult.times(7.77e77)
        }
        if (inChallenge("sac", 14)) {
            if (hasUpgrade('e', 142)) mult = mult.times("1e1600")
        }
        if (hasUpgrade('prestige', 54)) mult = mult.div("e800")
        if (hasUpgrade('s', 13)) mult = mult.times("e1000")
        mult = mult.times(buyableEffect('mega', 12))
        if (hasUpgrade('s', 54)) mult = mult.times("e6000")
        if (hasAchievement('a', 125)) mult = mult.times("e2940")
        if (hasUpgrade('rebirth', 64)) mult = mult.times("e11.111e3")

        // secret achievement
        if (hasAchievement('sa', 23)) mult = mult.times(1.2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasMilestone('e', 1)) exp = exp.add(0.02)
        if (hasUpgrade('e', 64)) exp = exp.sub(0.025)
        if (hasUpgrade('rebirth', 25)) exp = exp.sub(0.08)
        if (hasUpgrade('rebirth', 35)) exp = exp.sub(0.09)
        if (hasUpgrade('rebirth', 35)) exp = exp.add(0.05)
        if (hasMilestone('e', 12)) exp = exp.sub(0.1)
        if (inChallenge('sac', 14)) exp = exp.mul(0.5)
        if (hasUpgrade('mega', 83)) exp = exp.add(0.02)
        if (hasUpgrade('s', 61)) exp = exp.add(0.01)
        if (hasUpgrade('s', 82)) exp = exp.add(0.025)
        if (hasMilestone('sac', 37)) exp = exp.add(0.02)
        if (hasMilestone('mega', 18)) exp = exp.add(0.07)
        if (inChallenge("m", 11)) {
            if (hasMilestone('rebirth', 10)) exp = exp.add(0.25)
            if (hasMilestone('mega', 20)) exp = exp.add(0.3)
        }
        if (inChallenge('m', 11)) exp = exp.mul(0.2)
        return exp
    },
    effect(){
        let eff = player.mega.points.add(1).pow(1)
        let cap = 0.3
        if (hasUpgrade('mega', 81)) cap = 0.45
        if (hasUpgrade('mega', 83)) cap = 0.6125
        softcappedEffect = softcap(eff, new Decimal("e30000"), new Decimal(cap))
        return softcappedEffect
       },
        effectDescription() {
            let softcapDescription = ""
            let layerEffect = tmp[this.layer].effect
            if (layerEffect.gte(new Decimal("e30000")) ) {
                softcapDescription = " (Softcapped)"
            }
            let desc = "which is boosting all previous reset layers by x" + format(tmp[this.layer].effect) + softcapDescription;
            return desc;
        },
    branches: ["prestige"], 
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for MEGA points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
})