addLayer("rebirth", {
    name: "Rebirth Points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasUpgrade('basic', 34) || player.rebirth.unlocked) visible = true
       return visible
     },
    upgrades: {
        11: {
            title: "Welcome to rebirth. Here's a x4 point fragments for you.",
            description: "x4 Point fragments..",
            cost: new Decimal(1),
        },
        12: {
            title: "That's a while since the last one. How about some Point boosts?",
            description: "X5 Basic Points, X10 Point Fragments",
            cost: new Decimal(400),
            unlocked() { return hasUpgrade("rebirth", 11) },
        },
        13: {
            title: "Boosts to all",
            description: "X1.28 Rebirth Points, Basic Points and Point Fragments",
            cost: new Decimal(12000),
            unlocked() { return hasUpgrade("rebirth", 12) },
        },
        14: {
            title: "Point Fragmenting",
            description: "AN INSANE X50 BOOST TO Point Fragments",
            cost: new Decimal(40000),
            unlocked() { return hasUpgrade("rebirth", 13) },
        },
        21: {
            title: "Booster",
            description: "X1.36 RP (Rebirth Point), X2 BP (Basic Point), X100 PF (Point Fragment)",
            cost: new Decimal(300000),
            unlocked() { return hasUpgrade("rebirth", 14) },
        },
        22: {
            title: "Another Exponent?",
            description: "+^0.01 BP, ^1.02 PF",
            cost: new Decimal(12500000),
            unlocked() { return hasUpgrade("rebirth", 21) },
        },
        23: {
            title: "Boost",
            description: "X2 RP, X10 PF",
            cost: new Decimal(50000000),
            unlocked() { return hasUpgrade("rebirth", 21) },
        },
        24: {
            title: "Final Reb Upg before Pres",
            description: "X1.28 RP, X2.22 BP, X20 PF",
            cost: new Decimal(600000000),
            unlocked() { return hasUpgrade("rebirth", 23) },
        },
        31: {
            title: "Extension 1 - Upgrade Boosting",
            description: "Basic Upgrade 10 is boosted.",
            cost: new Decimal(6.9e42),
            unlocked() { return hasUpgrade("prestige", 21) && hasUpgrade("rebirth", 24) },
        },
        32: {
            title: "1111Quad",
            description: "x1.11 PP, x11.11 RP, x1111.11 BP, x1111111.11 PF",
            cost: new Decimal(1e48),
            unlocked() { return hasUpgrade("rebirth", 31) },
        },
        33: {
            title: "Rebirth Upgrade 11: Mega Edition",
            description: "Rebirth softcap after e1,500 is less. (^0.35 to ^0.375)",
            cost: new Decimal("e2570"),
            unlocked() { return hasMilestone("mega", 6) && hasUpgrade("rebirth", 32) },
        },
        34: {
            title: "THE BIG TRADE-OFF",
            description: "Basic Point Exponent -^0.08, BUT Point Fragments ^1.06, Mega Points x10, Point Fragments x1e200",
            cost: new Decimal("e2700"),
            unlocked() { return hasMilestone("mega", 6) && hasUpgrade("rebirth", 33) },
        },
        41: {
            title: "Extension, again.",
            description: "Point Fragments x1e2,000, Mega Points x1e10",
            cost: new Decimal("e63200"),
            unlocked() { return hasMilestone("sac", 9) && hasUpgrade("rebirth", 34) },
        },
        42: {
            title: "Rebirth Extension 3: Finale",
            description: "Rebirth Softcap is less.",
            cost: new Decimal("e69250"),
            unlocked() { return hasMilestone("sac", 9) && hasUpgrade("rebirth", 41) },
        },
        43: {
            title: "Rebirth Extension 4: Energy Edition",
            description: "Rebirth Softcap is less",
            cost: new Decimal("e302900"),
            unlocked() { return hasMilestone("sac", 14) && hasUpgrade("rebirth", 42) },
        },
        44: {
            title: "Rebirth Extension 4: End",
            description: "Rebirth Supercap is less",
            cost: new Decimal("e312600"),
            unlocked() { return hasMilestone("sac", 14) && hasUpgrade("rebirth", 43) },
        },
        51: {
            title: "Rebirth Rep Upgrades 1/4",
            description: "Softcap is less, +^(0.01 * (1 + ((RepUpgNo - 1) / 2))) RP",
            cost: new Decimal("e2545360"),
            unlocked() { return hasMilestone("sac", 23) && hasUpgrade("rebirth", 44) },
        },
        52: {
            title: "Rebirth Rep Upgrades 2/4",
            description: "Softcap is less, +^(0.01 * (1 + ((RepUpgNo - 1) / 2))) RP",
            cost: new Decimal("e2626100"),
            unlocked() { return hasMilestone("sac", 23) && hasUpgrade("rebirth", 51) },
        },
        53: {
            title: "Rebirth Rep Upgrades 3/4",
            description: "Softcap is less, +^(0.01 * (1 + ((RepUpgNo - 1) / 2))) RP",
            cost: new Decimal("e2731050"),
            unlocked() { return hasMilestone("sac", 23) && hasUpgrade("rebirth", 52) },
        },
        54: {
            title: "Rebirth Rep Upgrades 4/4",
            description: "Softcap is less, +^(0.01 * (1 + ((RepUpgNo - 1) / 2))) RP",
            cost: new Decimal("e2863400"),
            unlocked() { return hasMilestone("sac", 23) && hasUpgrade("rebirth", 52) },
        },
    },
    milestones: {
        1: {
            requirementDescription: "3 RP",
            effectDescription: "4 New Basic Point Upgrades",
            done() { return player["rebirth"].points.gte(3) }
        },
        2: {
            requirementDescription: "20 RP",
            effectDescription: "Generate 100% of Basic Points a sec",
            done() { return player["rebirth"].points.gte(20) }
        },
        3: {
            requirementDescription: "2,000 RP",
            effectDescription: "Generate 10,000% of Basic Points a sec",
            done() { return player["rebirth"].points.gte(2000) }
        },
        4: {
            requirementDescription: "RP Millionaire",
            effectDescription: "Automation! Autobuy all Basic Point Upgs",
            done() { return player["rebirth"].points.gte(1000000) }
        },
        5: {
            requirementDescription: "RP Billionaire",
            effectDescription: "4 MOAR BP Upgrades",
            done() { return player["rebirth"].points.gte(1000000000) }
        },
    },
    color: "#0F52BA",
    requires: new Decimal(50000000), // Can be a function that takes requirement increases into account
    resource: "Rebirth Points", // Name of currency
    baseResource: "Point Fragments", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.12, // Prestige currency exponent
    passiveGeneration() {
        if (hasMilestone('mega', 1)) return 10000
        if (hasMilestone('prestige', 5)) return 100
        if (hasMilestone('prestige', 3)) return 1
        return 0
    },
    autoUpgrade() {
        let auto = false
        if (hasMilestone('prestige', 6)) auto = true
        return auto
    },
    doReset(prestige) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[prestige].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
        if (hasMilestone('prestige', 4) && hasUpgrade(this.layer, 31)) keptUpgrades.push(31);
    
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
        if (hasMilestone('prestige', 4)) keep.push("milestones");
    
        // Stage 4, do the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },    
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        if (layers.mega.effect().gte(1)) mult = mult.times(layers.mega.effect())
        if (hasUpgrade('prestige', 22)) mult = mult.times(upgradeEffect('prestige', 22))
        if (hasUpgrade('basic', 81)) mult = mult.times(upgradeEffect('basic', 81))
        if (hasUpgrade('basic', 41)) mult = mult.times(1.19)
        if (hasUpgrade('basic', 42)) mult = mult.times(1.277)
        if (hasUpgrade('basic', 44)) mult = mult.times(2)
        if (hasUpgrade('basic', 52)) mult = mult.times(2.5)
        if (hasUpgrade('basic', 54)) mult = mult.times(5)
        if (hasUpgrade('rebirth', 13)) mult = mult.times(1.28)
        if (hasUpgrade('rebirth', 21)) mult = mult.times(1.36)
        if (hasUpgrade('rebirth', 23)) mult = mult.times(2)
        if (hasUpgrade('rebirth', 24)) mult = mult.times(1.28)
        if (hasUpgrade('rebirth', 32)) mult = mult.times(11.11)
        if (hasUpgrade('prestige', 11)) mult = mult.times(2)
        if (hasUpgrade('prestige', 12)) mult = mult.times(1.75)
        if (hasUpgrade('prestige', 13)) mult = mult.times(10)
        if (hasUpgrade('prestige', 14)) mult = mult.times(10)
        if (hasUpgrade('prestige', 21)) mult = mult.times(25)
        if (hasMilestone('prestige', 3)) mult = mult.times(1000)
        if (hasUpgrade('prestige', 31)) mult = mult.times(1000)
        if (hasUpgrade('prestige', 33)) mult = mult.times(1e100)
        if (hasUpgrade('mega', 11)) mult = mult.times(10)
        if (hasUpgrade('mega', 12)) mult = mult.times(250)
        if (hasUpgrade('mega', 24)) mult = mult.times(1e15)
        if (hasMilestone('sac', 1)) mult = mult.times(1e15)
        if (hasAchievement("a", 93)) mult = mult.times("1e9000")
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade('basic', 53)) exp = exp.add(0.005)
        if (hasUpgrade('basic', 54)) exp = exp.add(0.005)
        if (hasUpgrade('prestige', 32)) exp = exp.add(0.01)
        if (hasUpgrade('mega', 13)) exp = exp.add(0.01)
        if (hasUpgrade('mega', 22)) exp = exp.add(0.02)
        if (hasMilestone('sac', 18)) exp = exp.add(0.01)
        if (hasUpgrade('rebirth', 51)) exp = exp.add(0.01)
        if (hasUpgrade('rebirth', 52)) exp = exp.add(0.015)
        if (hasUpgrade('rebirth', 53)) exp = exp.add(0.02)
        if (hasUpgrade('rebirth', 54)) exp = exp.add(0.025)
        return exp
    },
    effect(){
        let eff = player.rebirth.points.add(1).pow(1.57)
        let sc = 0.35
        if (hasUpgrade('rebirth', 33)) sc = 0.375
        if (hasAchievement('a', 56)) sc = 0.4
        if (hasAchievement('a', 64)) sc = 0.42
        if (hasMilestone('sac', 8)) sc = 0.43
        if (hasUpgrade('rebirth', 42)) sc = 0.445
        if (hasUpgrade('rebirth', 43)) sc = 0.475
        if (hasMilestone('sac', 16)) sc = 0.49
        if (hasUpgrade('basic', 35)) sc = 0.55
        if (hasMilestone('sac', 17)) sc = 0.58
        if (hasUpgrade('basic', 55)) sc = 0.64
        if (hasUpgrade('rebirth', 51)) sc = 0.67
        if (hasUpgrade('rebirth', 52)) sc = 0.7
        if (hasUpgrade('rebirth', 53)) sc = 0.73
        if (hasUpgrade('rebirth', 54)) sc = 0.77
        softcappedEffect = softcap(eff, new Decimal("e1500"), new Decimal(sc))
        let sprcap = 0.4
        if (hasUpgrade('rebirth', 44)) sprcap = 0.45
        if (hasUpgrade('basic', 65)) sprcap = 0.5
        softcappedEffect = softcap(softcappedEffect, new Decimal("e100000"), new Decimal(sprcap))
        return softcappedEffect
       },
        effectDescription() {
            let des = "which is boosting point fragments by x" + format(tmp[this.layer].effect);
            return des;
        },
    branches: ["basic"], 
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for Rebirth points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

})