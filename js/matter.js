addLayer("ma", {
    name: "Matter", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        MResetTime: 0,
    }},
    layerShown(){
        let visible = false
        if (hasUpgrade('en', 45) || player.ma.unlocked) visible = true
       return visible
     },
    passiveGeneration() {
        if (hasMilestone("mo", 1)) return 0.01
        return 0
    },
    tabFormat: {
        "Main tab": {
            content: [
                "main-display",
                ["display-text", function() {
                    return "You have "+ notationChooser(player.ma.total) +" total Matter" 
                }],
                "blank",
                "prestige-button",
                "blank",
                "milestones",
                "blank",
                "blank",
                "upgrades",
                "blank",
                "blank",
                ["infobox", "mat"],
            ],
        },
    },
    color: "#0F52BA",
    requires: new Decimal(500000000), // Can be a function that takes requirement increases into account
    resource: "Matter", // Name of currency
    baseResource: "Atoms", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    upgrades: {
        11: {
            title: "01: Hydrogen",
            description: "x3 Power, x2 Energy",
            cost: new Decimal(1),
        },
        12: {
            title: "02: Helium",
            description: "x1.5 Gen 3 and 4 generation, x4 Atoms",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("ma", 11) }, 
        },
        13: {
            title: "03: Lithium",
            description: "^1.05 Atoms, +^0.05 Energy, x1.5 Gen 1,5 generation",
            cost: new Decimal(8),
            unlocked() { return hasUpgrade("ma", 12) }, 
        },
        14: {
            title: "04: Beryllium",
            description: "x4 Atoms, x2 Energy Passive Generation",
            cost: new Decimal(60),
            unlocked() { return hasUpgrade("ma", 13) }, 
        },
        15: {
            title: "05: Boron",
            description: "+^0.02 Power-Atom and Power-Energy boost",
            cost: new Decimal(2500),
            unlocked() { return hasUpgrade("ma", 14) }, 
        },
        21: {
            title: "06: Carbon",
            description: "Gen 1-3 cost nothing and are automated, and have at least 10 Gen 5s on Matter reset",
            cost: new Decimal(34567),
            unlocked() { return hasUpgrade("ma", 15) }, 
        },
        22: {
            title: "07: Nitrogen",
            description: "Gen 4 costs nothing, Gain 100% of your energy on reset, x7 Power",
            cost: new Decimal(2e6),
            unlocked() { return hasUpgrade("ma", 21) }, 
        },
        23: {
            title: "08: Oxygen",
            description: "x8 atoms",
            cost: new Decimal(20e6),
            unlocked() { return hasUpgrade("ma", 22) }, 
        },
        24: {
            title: "09: Fluorine",
            description: "Auto Gen 4, ^1.029 Atoms, x2.9 Power, unlock 1 energy upgrade",
            cost: new Decimal(100e6),
            unlocked() { return hasUpgrade("ma", 23) }, 
        },
        25: {
            title: "10: Neon",
            description: "Buy Max Gen 1 and 2, Matter effect is stronger, unlock 2 new Energy upgrades",
            cost: new Decimal(10e9),
            unlocked() { return hasUpgrade("ma", 24) }, 
        },
        31: {
            title: "11: Sodium",
            description: "Increases Matter gain based on Energy",
            cost: new Decimal(5e12),
            effect() {
                return player.en.points.log10().div(10)
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x"
            },
            tooltip() {
                return "Formula: log10(Energy)/10"
            },
            unlocked() { return hasUpgrade("ma", 25) }, 
        },
        32: {
            title: "12: Magnesium",
            description: "Generator 1, 2, 6 and 7 generations is increased by x1.25, x123 Power",
            cost: new Decimal(7e16),
            unlocked() { return (hasUpgrade("ma", 31) && hasMilestone("w", 2)) }, 
        },
        33: {
            title: "13: Aluminium",
            description: "Boosts matter based on itself",
            cost: new Decimal(2.5e17),
            effect() {
                mattermatter = 0.09
                softcapDescriptionma33 = ""
                sdsc = ""
                upgEffectma33 = upgradeEffect(this.layer, this.id)
                let eff = player.ma.points.add(1).pow(mattermatter)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionma33
            },
            tooltip() {
                return "Formula: (Matter+1)^"  + mattermatter + sdsc
            },
            unlocked() { return hasUpgrade("ma", 32) }, 
        },
        34: {
            title: "14: Silicon",
            description: "Generator² is increasingly stronger for each passing generator",
            cost: new Decimal(1.24e24),
            unlocked() { return (hasUpgrade("ma", 33) && hasMilestone("w", 2)) }, 
        },
        35: {
            title: "15: Phosphorous",
            description: "x5 Matter",
            cost: new Decimal(3e31),
            unlocked() { return (hasUpgrade("ma", 34) && hasMilestone("w", 2)) }, 
        },
    },
    milestones: {
        1: {
            requirementDescription: "2 total Matter",
            effectDescription: "Generate 2.5% of energy on reset a sec",
            done() { return player.ma.total.gte(2) }
        },
        2: {
            requirementDescription: "5 total Matter",
            effectDescription: "x4 Energy Passive Generation, x2.5 Power, unlock more energy upgrades",
            unlocked() { return hasMilestone("ma", 1)},
            done() { return player.ma.total.gte(5) }
        },
        3: {
            requirementDescription: "30 total Matter",
            effectDescription: "x3.0 Power",
            unlocked() { return hasMilestone("ma", 2)},
            done() { return player.ma.total.gte(30) }
        },
        4: { 
            requirementDescription: "250 total Matter",
            effectDescription: "x2 Gen 2 production, Keep Gen 4 on reset",
            unlocked() { return hasMilestone("ma", 3)},
            done() { return player.ma.total.gte(250) }
        },
        5: {
            requirementDescription: "17,500 total Matter",
            effectDescription: "+^0.05 Energy Gain",
            unlocked() { return hasMilestone("ma", 4)},
            done() { return player.ma.total.gte(17500) }
        },
        6: {
            requirementDescription: "125,000 total Matter",
            effectDescription: "Unlock Gen 6 and more upgrades",
            unlocked() { return hasMilestone("ma", 5)},
            done() { return player.ma.total.gte(125000) }
        },
        7: {
            requirementDescription: "1e7 total Matter",
            effectDescription: "Unlock Click Mastery (Optional, but recommended to get at least 1-5K clicks) and unlock 6 achievements related to Click Mastery.",
            unlocked() { return hasMilestone("ma", 6)},
            done() { return player.ma.total.gte(10e6) }
        },
        8: {
            requirementDescription: "4e9 total Matter",
            unlocked() { return hasMilestone("ma", 7)},
            effectDescription: "Keep first 4 rows of energy upgrades on reset, x2 energy and power",
            done() { return player.ma.total.gte(4e9) }
        },
        9: {
            requirementDescription: "2.5e15 total Matter",
            unlocked() { return hasMilestone("ma", 8)},
            effectDescription: "Autobuy Gen 5, Buy Max Gen 3, x1.25 Click Multiplier (With this upgrade, it is now recommended to get 10K-200K Clicks), ^1.01 Power and Atoms",
            done() { return player.ma.total.gte(2.5e15) }
        },
        10: {
            requirementDescription: "2.0e20 total Matter",
            effectDescription: "x2 Energy, Extend Energy Upgrades, unlock a side layer named 'Content Features'",
            unlocked() { return hasMilestone("ma", 9)},
            done() { return player.ma.total.gte(2e20) }
        },
    },
    infoboxes: {
        mat: {
            title: "Matter",
            body() { return "You did your first reset! All of your hard-earned progress, generators, energy and atoms, are just wiped. However, it unlocks new upgrades, and a new layer with more features. Enter Milestones, where total Matter is used, and it gives boosts without spending any of your Matter!" },
        },
    },
    setRT() {
        if ((player.ma.points.gte(1)) && (player.ma.MResetTime == 0)) {
            player.ma.MResetTime = player.timePlayed
        }
    },
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        if (hasMilestone("w", 1)) mult = mult.times(1.5)
        if (hasUpgrade("en", 54)) mult = mult.times(2)
        if (hasUpgrade("en", 62)) mult = mult.times(3)
        if (hasUpgrade("en", 75)) mult = mult.times(2)
        if (hasUpgrade("mo", 12)) mult = mult.times(3)
        if (hasUpgrade("mo", 15)) mult = mult.times(2)
        if (hasUpgrade("ma", 35)) mult = mult.times(5)
        if (hasAchievement("a", 33)) mult = mult.times(1.05)
        if (hasUpgrade("en", 65)) mult = mult.times(1.1)
        if (hasUpgrade("ma", 31)) mult = mult.times(upgradeEffect("ma", 31))
        if (hasUpgrade("ma", 33)) mult = mult.times(upgradeEffect("ma", 33))
        if (hasMilestone("w", 2)) mult = mult.times(new Decimal(1.1).pow(player.w.points))
        if (player.cm.clickmastery.gte(1e7)) mult = mult.times(player.cm.clickmastery.div(3333).log(333))
        if (player.cm.clickmastery.gte(2e9)) mult = mult.times(player.cm.clickmastery.mul(70).log(700000))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    effect(){
        let effectBoost = 1.7
        if (hasUpgrade("ma", 25)) effectBoost = 1.85
        let eff = player.ma.points.add(1).pow(effectBoost)
        return eff
    },
    effectDescription() {
        let softcapDescription = ""
        let layerEffect = tmp[this.layer].effect
        let des = "which is boosting atoms by x" + notationChooser(layerEffect) + softcapDescription
        return des;
    },
    branches: ["en"], 
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset to gain Matter", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
})