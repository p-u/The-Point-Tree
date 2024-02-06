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
    autoUpgrade() {
        let auto = false
        if (hasMilestone('sac', 9)) auto = true
        return auto
    },
    doReset(mega) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[mega].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
        if (hasMilestone('sac', 10)) keptUpgrades.push(11);
        if (hasMilestone('sac', 10)) keptUpgrades.push(12);
        if (hasMilestone('sac', 10)) keptUpgrades.push(13);
        if (hasMilestone('sac', 10)) keptUpgrades.push(14);
        if (hasMilestone('sac', 10)) keptUpgrades.push(21);
        if (hasMilestone('sac', 10)) keptUpgrades.push(22);
        if (hasMilestone('sac', 10)) keptUpgrades.push(23);
        if (hasMilestone('sac', 10)) keptUpgrades.push(24);
    
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
        if (hasMilestone('sac', 10)) keep.push("milestones");
    
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
            description: "x10M PF, x1K BP, x10 RP",
            cost: new Decimal(1),
        },
        12: {
            title: "How about another upgrade?",
            description: "x250 RP and x10B PF",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("mega", 11) },
        },
        13: {
            title: "Is it a pain to grind?",
            description: "^1.02 PF, +^0.01 RP",
            cost: new Decimal(6),
            unlocked() { return hasUpgrade("mega", 12) },
        },
        14: {
            title: "More upgrades?",
            description: "Prestige Points gets boosted based on itself.",
            cost: new Decimal(500),
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
            cost: new Decimal(40e6),
            unlocked() { return hasUpgrade("mega", 14) },
        },
        22: {
            title: "123 Exponent",
            description: "+^0.01 PP, +^0.02 RP, +^0.03 BP",
            cost: new Decimal(250e6),
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
            cost: new Decimal(2e12),
            unlocked() { return hasUpgrade("mega", 23) },
        },
        31: {
            title: "Mega is useful at achieving big numbers.",
            description: "Mega boosts point fragments heavily.",
            cost: new Decimal(2e13),
            unlocked() { return hasUpgrade("mega", 24) },
            effect() {
                let mu9exp = 8.5
                if (hasUpgrade("mega", 33)) mu9exp = 12.5
                return player["mega"].points.add(1).pow(mu9exp)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        32: {
            title: "Exponents 2",
            description: "Point fragments ^1.025.",
            cost: new Decimal(1.9e14),
            unlocked() { return hasUpgrade("mega", 31) },
        },
        33: {
            title: "Buyablility",
            description: "Unlock Mega Buyable 1! MU9 is also stronger.",
            cost: new Decimal(2e17),
            unlocked() { return hasUpgrade("mega", 32) },
        },
        34: {
            title: "Strength Plus",
            description: "Buyables are 2 TIMES AS STRONG!",
            cost: new Decimal(4e32),
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
                return player["mega"].points.add(1).pow(mbiupgexp)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
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
            unlocked() { return hasMilestone("sac", 20) && hasUpgrade("mega", 62) },
        },
        // done with mega rep upg, left is to do the last basic upg s and to write changelog
    },
    milestones: {
        1: {
            requirementDescription: "3 MP",
            effectDescription: "Generate 1B% of Basic Points a second AND 1M% of Rebirth Points a second",
            done() { return player["mega"].points.gte(3) }
        },
        2: {
            requirementDescription: "15 MP",
            effectDescription: "Keep Prestige Milestones and Prestige upgrade 21",
            done() { return player["mega"].points.gte(15) }
        },
        3: {
            requirementDescription: "2,500 MP",
            effectDescription: "Get an extension to Basic Upgrades.",
            done() { return player["mega"].points.gte(2500) }
        },
        4: {
            requirementDescription: "100,000 MP",
            effectDescription: "Gain 100% of Prestige Points every second.",
            done() { return player["mega"].points.gte(100000) }
        },
        5: {
            requirementDescription: "1e9 MP",
            effectDescription: "Gain 5,000% of Prestige Points every second and autobuy Prestige Upgrades",
            done() { return player["mega"].points.gte(1e9) }
        },
        6: {
            requirementDescription: "8e24 MP",
            effectDescription: "Extend Rebirth Upgrades.",
            done() { return player["mega"].points.gte(8e24) }
        },
        7: {
            requirementDescription: "4e37 MP",
            effectDescription: "x1e111 Point Fragments.",
            done() { return player["mega"].points.gte(4e37) }
        },
        8: {
            requirementDescription: "8e44 MP",
            effectDescription: "Extend Prestige Upgrades.",
            done() { return player["mega"].points.gte(8e44) }
        },
        9: {
            requirementDescription: "1e65 MP",
            effectDescription: "X2.2 Mega Points",
            done() { return player["mega"].points.gte(1e65) }
        },
        10: {
            requirementDescription: "1e110 MP",
            effectDescription: "Unlock the next reset layer!",
            done() { return player["mega"].points.gte(1e110) }
        },
        11: {
            requirementDescription: "4.74e474 MP",
            effectDescription: "Unlock the second mega buyable!",
            done() { return player["mega"].points.gte("4.74e474") }
        },
        12: {
            requirementDescription: "1e9065 MP",
            effectDescription: "Unlock the third mega buyable!",
            done() { return player["mega"].points.gte("1e9065") }
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
                let expo = new Decimal(1.005)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
        },
        12: {
            title: "Mega Buyable 2: Mega Mega",
            unlocked() { return hasMilestone("mega", 11) },
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
                let expo = new Decimal(1.015)
                if (hasUpgrade('mega', 51)) expo = 1.0175
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
        },
        13: {
            title: "Mega Buyable 3: Energy Duplication",
            unlocked() { return hasMilestone("mega", 12) },
            cost(x) {
                let exp3 = 1.2
                if (hasMilestone('sac', 23)) exp3 = 1.5
                return new Decimal("1e6600").mul(Decimal.pow(1.28, x)).mul(Decimal.pow(x , Decimal.pow(exp3 , x))).floor()
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
        if (hasUpgrade('basic', 71)) mult = mult.times(7.77e7)
        if (hasUpgrade('rebirth', 34)) mult = mult.times(10)
        if (hasUpgrade('rebirth', 41)) mult = mult.times(1e10)
        if (hasUpgrade('prestige', 34)) mult = mult.times(6e6)
        if (hasMilestone('mega', 9)) mult = mult.times(2.2)
        if (hasMilestone('sac', 1)) mult = mult.times(10)
        if (hasMilestone('sac', 11)) mult = mult.times(10)
        if (hasMilestone('sac', 4)) mult = mult.times(2.5e6)
        if (hasUpgrade('mega', 44)) mult = mult.times(0.0075)
        if (hasUpgrade('e', 13)) mult = mult.times(1e25)
        if (hasUpgrade('e', 24)) mult = mult.times(1e40)
        if (hasAchievement('a', 83)) mult = mult.times(1e81)
        if (hasUpgrade('e', 52)) mult = mult.div(1e50)
        if (hasUpgrade('basic', 45)) mult = mult.times(11.85)
        if (hasAchievement('a', 95)) mult = mult.times(1e195)
        if (hasUpgrade('e', 73)) mult = mult.times("1e300")
        if (hasUpgrade('e', 74)) mult = mult.times("1e150")
        if (inChallenge("sac", 13)) {
            if (hasUpgrade('e', 131)) mult = mult.times(7.77e77)
        }
        mult = mult.times(buyableEffect('mega', 12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasMilestone('e', 1)) exp = exp.add(0.02)
        if (hasUpgrade('e', 64)) exp = exp.sub(0.025)
        return exp
    },
    effect(){
        let eff = player.mega.points.add(1).pow(1)
        let cap = 0.3
        softcappedEffect = softcap(eff, new Decimal("e30000"), new Decimal(cap))
        return softcappedEffect
       },
        effectDescription() {
            let desc = "which is boosting all previous reset layers by x" + format(tmp[this.layer].effect);
            return desc;
        },
    branches: ["prestige"], 
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for MEGA points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
})