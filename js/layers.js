addLayer("a", {
    startData() { return {
        unlocked: true,
    }},
    color: "yellow",
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    achievements: {
        rows: 16,
        cols: 6,
        11: {
            name: "The first boost",
            done() { return (hasUpgrade('basic', 11)) },
            tooltip: "Get Basic Upgrade 1.",
        },
        12: {
            name: "Boosting each other",
            done() { return (hasUpgrade('basic', 12)) },
            tooltip: "Get Basic Upgrade 2.",
        },
        13: {
            name: "Point Fragmentation",
            done() { return player.points.gte(1000) },
            tooltip: "Reach 1,000 Points.",
        },
        14: {
            name: "More than a double",
            done() { return (hasUpgrade('basic', 31)) },
            tooltip: "Get basic Upgrade 9.",
        },
        15: {
            name: "Going to reset",
            done() { return (hasUpgrade('basic', 34)) },
            tooltip: "Have basic Upgrade 12.",
        },
        21: {
            name: "Rebirth Upgrades are OP",
            done() { return (hasUpgrade('rebirth', 11)) },
            tooltip: "Get Rebirth Upgrade 1!",
        },
        22: {
            name: "Advanced?",
            done() { return (hasUpgrade('basic', 41)) },
            tooltip: "Get Basic Super Upgrade 1",
        },
        23: {
            name: "Another upgrade",
            done() { return (hasUpgrade('rebirth', 12)) },
            tooltip: "Get Rebirth Upgrade 2",
        },
        24: {
            name: "The second row!",
            done() { return (hasUpgrade('rebirth', 21)) },
            tooltip: "Get Rebirth Upgrade 5",
        },
        25: {
            name: "88888888",
            done() { return (hasUpgrade('rebirth', 24)) },
            tooltip: "Get Rebirth Upgrade 8",
        },
        26: {
            name: "1e100!",
            done() { return player.points.gte(1e100) },
            tooltip: "Get 1e100 point fragments.",
        },
        31: {
            name: "PRESTIGE",
            done() { return player.prestige.points.gte(1) },
            tooltip: "Prestige!",
        },
        32: {
            name: "1e100 2X!",
            done() { return player.points.gte(1e200) },
            tooltip: "Get 1e200 point fragments.",
        },
        33: {
            name: "Last of Rebirths",
            done() { return (hasUpgrade('rebirth', 32)) },
            tooltip: "Get the last Extended-Rebirth Upgrade (RU10).",
        },
        34: {
            name: "Fiver Hundo",
            done() { return  player.points.gte(new Decimal("e500")) },
            tooltip: "Get 1e500 point fragments.",
        },
        35: {
            name: "10 to the power of Ten Hundred?",
            done() { return  player.points.gte(new Decimal("e1000")) },
            tooltip: "Get 1e1000 point fragments.",
        },
        36: {
            name: "Even More?",
            done() { return  player.points.gte(new Decimal("e1500")) },
            tooltip: "Get 1e1500 point fragments.",
        },
        41: {
            name: "Layer 4: MEGA!",
            done() { return  player.mega.points.gte(1) },
            tooltip: "Get 1 mega point.",
        },
        42: {
            name: "Keep Prestige Milestone!!",
            done() { return  (hasMilestone('mega', 2)) },
            tooltip: "Get the second mega milestone",
        },
        43: {
            name: "Tres thou.",
            done() { return player.points.gte(new Decimal("e3000")) },
            tooltip: "Get 1e3,000 points. Reward: x1e30 points.",
        },
        44: {
            name: "Are you kidding me?",
            done() { return (hasUpgrade('mega', 21)) },
            tooltip: "Get the fifth mega upgrade. ",
        },
        45: {
            name: "Seemingly random",
            done() { return player.points.gte(new Decimal("e10218")) },
            tooltip: "A mystery... But it is over e10,000 points and below e10,250. Reward: x1e68 PF.",
        },
        51: {
            name: "Prestige Automation",
            done() { return (hasMilestone('mega', 5)) },
            tooltip: "Mega Milestone 5",
        },
        52: {
            name: "So many Megas!",
            done() { return  player.mega.points.gte(1e18) },
            tooltip: "Have 1e18 Mega Points. Reward: x1e18 Prestige Points.",
        },
        53: {
            name: "Are you able to buy?",
            done() { return (hasUpgrade('mega', 33))  },
            tooltip: "Get Mega Buyable 1.",
        },
        54: {
            name: "THE TRADE-OFF OF THE CENTURY",
            done() { return  (hasUpgrade('rebirth', 34)) },
            tooltip: "Rebirth Upgrade 12",
        },
        55: {
            name: "Seemingly Random Version 2",
            done() { return  player.points.gte(new Decimal("e32872")) },
            tooltip: "A mystery... But it is over e32,500 points and below e33,000. Reward: x2.72e272 PF.",
        },
    tabFormat: [
        "blank", 
        ["display-text", function() { return "Achievements: "+player.a.achievements.length+"/"+(Object.keys(tmp.a.achievements).length-2) }], 
        "blank", "blank",
        "achievements",
    ],
    update(diff) {    // Added this section to call adjustNotificationTime every tick, to reduce notification timers
        adjustNotificationTime(diff);
    },
}, 
})

addLayer("basic", {
    name: "Basic Points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    upgrades: {
        11: {
            title: "The first upgrade!",
            description: "Doubles your point fragment gain.",
            cost: new Decimal(1),

        },
        12: {
            title: "Upgrade 2",
            description: "Basic points boost point fragments.",
            cost: new Decimal(2),
            effect() {
                let expu2 = 0.35
                if (hasUpgrade("basic", 62)) expu2 = 0.3575
                return player[this.layer].points.add(1).pow(expu2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() { return hasUpgrade("basic", 11) },

        },
        13: {
            title: "Upgrade 3",
            description: "Point Fragments boost basic points.",
            cost: new Decimal(5),
            effect() {
                return player.points.add(1).pow(0.16)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() { return hasUpgrade("basic", 12) },
        },
        14: {
            title: "Upgrade 4",
            description: "Boost basic points and point fragments by 1.35x.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("basic", 13) },
        },
        21: {
            title: "Upgrade 5",
            description: "Basic Points boosts itself.",
            cost: new Decimal(25),
            effect() {
                return player[this.layer].points.add(1).pow(0.175)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() { return hasUpgrade("basic", 14) },
        },
        22: {
            title: "Upgrade 6",
            description: "Point Fragments are doubled again!",
            cost: new Decimal(100),
            unlocked() { return hasUpgrade("basic", 21) },
        },
        23: {
            title: "Upgrade 7",
            description: "Basic Points are multiplied by 1.39",
            cost: new Decimal(250),
            unlocked() { return hasUpgrade("basic", 22) },
        },
        24: {
            title: "Upgrade 8",
            description: "Point Fragments boosts itself",
            cost: new Decimal(500),
            effect() {
                return player.points.add(1).pow(0.1625)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() { return hasUpgrade("basic", 23) },
        },
        31: {
            title: "Upgrade 9",
            description: "Point fragments are TRIPLED!!",
            cost: new Decimal(1500),
            unlocked() { return hasUpgrade("basic", 24) },
        },
        32: {
            title: "Upgrade 10",
            description: "Point fragments boost itself, again, but less",
            cost: new Decimal(5500),
            effect() {
                let expu10 = 0.055
                if (hasUpgrade('rebirth', 31)) expu10 = 0.075
                if (hasUpgrade('prestige', 32)) expu10 = 0.09
                return player.points.add(500000).pow(expu10)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() { return hasUpgrade("basic", 31) },
        },
        33: {
            title: "Upgrade 11",
            description: "Point fragments are multiplied by 2.5",
            cost: new Decimal(20000),
            unlocked() { return hasUpgrade("basic", 32) },
        },
        34: {
            title: "Upgrade 12",
            description: "The final upgrade before the next reset layer: X5 POINT FRAGMENTS!!",
            cost: new Decimal(60000),
            unlocked() { return hasUpgrade("basic", 33) },
        },
        41: {
            title: "Super Upgrade 1",
            description: "Rebirth Points x1.19, Basic Points x1.91, Point Fragments x9.11",
            cost: new Decimal(100e6),
            unlocked() { return hasMilestone("rebirth", 1) && hasUpgrade("basic", 34)},
        },
        42: {
            title: "Super Upgrade 2",
            description: "Rebirth Points x1.277, Point Fragments x7.77",
            cost: new Decimal(2.5e9),
            unlocked() { return hasUpgrade("basic", 41) },
        },
        43: {
            title: "Super Upgrade 3: EXPONENTS!",
            description: "Basic Points +^0.02, Point Fragments ^1.05",
            cost: new Decimal(8e10),
            unlocked() { return hasUpgrade("basic", 42) },
        },
        44: {
            title: "Super Upgrade 4",
            description: "Rebirth Points x2, Basic Points x4, Point Fragments x10",
            cost: new Decimal(2e15),
            unlocked() { return hasUpgrade("basic", 43) },
        },
        51: {
            title: "Super Upgrade 5",
            description: "Point Fragments x100",
            cost: new Decimal(2e66),
            unlocked() { return hasMilestone("rebirth", 5) && hasUpgrade("basic", 44)},
        },
        52: {
            title: "Super Upgrade 6",
            description: "PF X100, RP X2.5, BP X10",
            cost: new Decimal(2.5e71),
            unlocked() { return hasUpgrade("basic", 51) },
        },
        53: {
            title: "Super Upgrade 7: RP Exponent!",
            description: "PF X10K, BP +^0.02, RP +^0.005",
            cost: new Decimal(1.2e82),
            unlocked() { return hasUpgrade("basic", 52) },
        },
        54: {
            title: "Super Upgrade 8: Final before NEXT RESET LAYER!",
            description: "PF X1K, PF^1.04, BP X100, BP+^0.02, RP X5, RP+^0.005",
            cost: new Decimal(1e101),
            unlocked() { return hasUpgrade("basic", 53) },
        },
        61: {
            title: "MEGA UPGRADE 01",
            description: "Multiply point fragments by...1e25...",
            cost: new Decimal("e4000"),
            unlocked() { return hasMilestone("mega", 3) && hasUpgrade("basic", 54) },
        },
        62: {
            title: "MEGA UPGRADE 02",
            description: "Basic Upgrade 2 is boosted.",
            cost: new Decimal("e4545"),
            unlocked() { return hasMilestone("mega", 3) && hasUpgrade("basic", 61) },
        },
        63: {
            title: "MEGA UPGRADE 03",
            description: "Mega Upgrade 4 is boosted.",
            cost: new Decimal("e5700"),
            unlocked() { return hasMilestone("mega", 3) && hasUpgrade("basic", 62) },
        },
        64: {
            title: "MEGA UPGRADE 04",
            description: "Point fragments x1e50",
            cost: new Decimal("e6600"),
            unlocked() { return hasMilestone("mega", 3) && hasUpgrade("basic", 63) },
        },
    },
    infoboxes: {
        info: {
            title: "Welcome to The Point Tree!",
            body() { return "Explore many unique upgrades, and get the biggest numbers possible!" },
        },
    },
    color: "#add8e6",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Basic Points", // Name of currency
    baseResource: "Point Fragments", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    passiveGeneration() {
        if (hasMilestone('mega', 1)) return 10000000
        if (hasMilestone('prestige', 1)) return 10000
        if (hasMilestone('rebirth', 3)) return 100
        if (hasMilestone('rebirth', 2)) return 1
        return 0
    },
    autoUpgrade() {
        let auto = false
        if (hasMilestone('rebirth', 4)) auto = true
        return auto
    },
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        if (layers.prestige.effect().gte(1)) mult = mult.times(layers.prestige.effect())
        if (layers.mega.effect().gte(1)) mult = mult.times(layers.mega.effect())
        if (hasUpgrade('basic', 13)) mult = mult.times(upgradeEffect('basic', 13))
        if (hasUpgrade('basic', 21)) mult = mult.times(upgradeEffect('basic', 21))
        if (hasUpgrade('basic', 14)) mult = mult.times(1.35)
        if (hasUpgrade('basic', 23)) mult = mult.times(1.39)
        if (hasUpgrade('basic', 41)) mult = mult.times(1.91)
        if (hasUpgrade('basic', 44)) mult = mult.times(4)
        if (hasUpgrade('basic', 52)) mult = mult.times(10)
        if (hasUpgrade('basic', 54)) mult = mult.times(100)
        if (hasUpgrade('rebirth', 12)) mult = mult.times(5)
        if (hasUpgrade('rebirth', 13)) mult = mult.times(1.28)
        if (hasUpgrade('rebirth', 21)) mult = mult.times(2)
        if (hasUpgrade('rebirth', 24)) mult = mult.times(2.22)
        if (hasUpgrade('rebirth', 32)) mult = mult.times(1111.11)
        if (hasUpgrade('prestige', 11)) mult = mult.times(5)
        if (hasUpgrade('prestige', 21)) mult = mult.times(25)
        if (hasUpgrade('prestige', 21)) mult = mult.times(1e8)
        if (hasUpgrade('mega', 11)) mult = mult.times(1000)
        if (hasUpgrade('mega', 24)) mult = mult.times(1e15)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade('basic', 43)) exp = exp.add(0.02)
        if (hasUpgrade('basic', 53)) exp = exp.add(0.02)
        if (hasUpgrade('basic', 54)) exp = exp.add(0.02)
        if (hasUpgrade('rebirth', 22)) exp = exp.add(0.01)
        if (hasUpgrade('prestige', 12)) exp = exp.add(0.01)
        if (hasUpgrade('prestige', 24)) exp = exp.add(0.02)
        if (hasUpgrade('prestige', 32)) exp = exp.add(0.025)
        if (hasUpgrade('mega', 22)) exp = exp.add(0.03)
        if (hasUpgrade('rebirth', 34)) exp = exp.sub(0.08)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for basic points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
}),
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
            cost: new Decimal(250),
            unlocked() { return hasUpgrade("rebirth", 11) },
        },
        13: {
            title: "Rebirth Upgrade 3: Boosts to all",
            description: "X1.28 Rebirth Points, Basic Points and Point Fragments",
            cost: new Decimal(5000),
            unlocked() { return hasUpgrade("rebirth", 12) },
        },
        14: {
            title: "Rebirth Upgrade 4: Point Fragmenting",
            description: "AN INSANE X50 BOOST TO Point Fragments",
            cost: new Decimal(12500),
            unlocked() { return hasUpgrade("rebirth", 13) },
        },
        21: {
            title: "Rebirth Upgrade 5: Booster",
            description: "X1.36 RP (Rebirth Point), X2 BP (Basic Point), X100 PF (Point Fragment)",
            cost: new Decimal(300000),
            unlocked() { return hasUpgrade("rebirth", 14) },
        },
        22: {
            title: "Rebirth Upgrade 6: Another Exponent?",
            description: "+^0.01 BP, ^1.02 PF",
            cost: new Decimal(5000000),
            unlocked() { return hasUpgrade("rebirth", 21) },
        },
        23: {
            title: "Rebirth Upgrade 7",
            description: "X2 RP, X10 PF",
            cost: new Decimal(12500000),
            unlocked() { return hasUpgrade("rebirth", 21) },
        },
        24: {
            title: "Rebirth Upgrade 8",
            description: "X1.28 RP, X2.22 BP, X20 PF",
            cost: new Decimal(150000000),
            unlocked() { return hasUpgrade("rebirth", 23) },
        },
        31: {
            title: "Rebirth Upgrade 9",
            description: "Basic Upgrade 10 is boosted.",
            cost: new Decimal(6.9e42),
            unlocked() { return hasUpgrade("prestige", 21) && hasUpgrade("rebirth", 24) },
        },
        32: {
            title: "Rebirth Upgrade 10",
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
            title: "Rebirth Upgrade 12: THE BIG TRADE-OFF",
            description: "Basic Point Exponent -^0.08, BUT Point Fragments ^1.06, Mega Points x10, Point Fragments x1e200",
            cost: new Decimal("e2700"),
            unlocked() { return hasMilestone("mega", 6) && hasUpgrade("rebirth", 33) },
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
    infoboxes: {
        info: {
            title: "Welcome to the Rebirth Layer",
            body() { return "More numbers to achieve. Focus on getting the first milestone! Rebirth Points (RP) also boost Point Fragments (PF). Softcaps ^0.35 at xe1500." },
        },
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
        if (hasUpgrade('prestige', 11)) mult = mult.times(1.4)
        if (hasUpgrade('prestige', 12)) mult = mult.times(2.5)
        if (hasUpgrade('prestige', 13)) mult = mult.times(10)
        if (hasUpgrade('prestige', 14)) mult = mult.times(10)
        if (hasUpgrade('prestige', 21)) mult = mult.times(25)
        if (hasMilestone('prestige', 3)) mult = mult.times(1000)
        if (hasUpgrade('prestige', 31)) mult = mult.times(1000)
        if (hasUpgrade('mega', 11)) mult = mult.times(10)
        if (hasUpgrade('mega', 12)) mult = mult.times(250)
        if (hasUpgrade('mega', 24)) mult = mult.times(1e15)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade('basic', 53)) exp = exp.add(0.005)
        if (hasUpgrade('basic', 54)) exp = exp.add(0.005)
        if (hasUpgrade('prestige', 32)) exp = exp.add(0.01)
        if (hasUpgrade('mega', 13)) exp = exp.add(0.01)
        if (hasUpgrade('mega', 22)) exp = exp.add(0.02)
        return exp
    },
    effect(){
        let eff = player.rebirth.points.add(1).pow(1.57)
        let sc = 0.35
        if (hasUpgrade('rebirth', 33)) sc = 0.375
        softcappedEffect = softcap(eff, new Decimal("e1500"), new Decimal(sc))
        return softcappedEffect
       },
        effectDescription() {
            let des = "which is boosting point fragments by x" + format(tmp[this.layer].effect);
            return des;
        }, 
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for Rebirth points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

}),
addLayer("prestige", {
    name: "Prestige Points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasUpgrade('basic', 54) || player.prestige.unlocked) visible = true
       return visible
     },
     passiveGeneration() {
        if (hasMilestone('mega', 5)) return 50
        if (hasMilestone('mega', 4)) return 1
        return 0
    },
    autoUpgrade() {
        let auto = false
        if (hasMilestone('mega', 5)) auto = true
        return auto
    },
    upgrades: {
        11: {
            title: "You Prestiged! This is the first upgrade.",
            description: "x20 PF, x5 BP, x1.4 RP",
            cost: new Decimal(1),
        },
        12: {
            title: "Prestige Upgrade 2",
            description: "+^0.01 BP, x10 PF, x2.5 RP",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("prestige", 11) },
        },
        13: {
            title: "Prestige Upgrade 3",
            description: "x10 RP, x100 PF",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("prestige", 12) },
        },
        14: {
            title: "Prestige Upgrade 4",
            description: "x10 RP, x1K PF",
            cost: new Decimal(25),
            unlocked() { return hasUpgrade("prestige", 13) },
        },
        21: {
            title: "Prestige Upgrade 5",
            description: "x25 RP, BP and PF. Unlock 2 new RP Upgrades.",
            cost: new Decimal(50),
            unlocked() { return hasUpgrade("prestige", 14) },
        },
        22: {
            title: "Prestige Upgrade 6: A big one!",
            description: "Rebirth Points boosts itself.",
            cost: new Decimal(500),
            unlocked() { return hasUpgrade("prestige", 21) },
            effect() {
                return player["rebirth"].points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        23: {
            title: "Prestige Upgrade 7",
            description: "x10^10 PF",
            cost: new Decimal(2500),
            unlocked() { return hasUpgrade("prestige", 22) },
        },
        24: {
            title: "Prestige Upgrade 8",
            description: "+^0.02 BP, ^1.02 PF",
            cost: new Decimal(20000),
            unlocked() { return hasUpgrade("prestige", 23) },
        },
        31: {
            title: "Prestige Upgrade 9: Insanely OP, but with a catch",
            description: "x1e20 PF, x1e8 BP, x1e3 RP, BUT /10 PP",
            cost: new Decimal(10000000),
            unlocked() { return hasUpgrade("prestige", 24) },
        },
        32: {
            title: "Prestige Upgrade 10: The last Upgrade before the reset",
            description: "Basic Upgrade 10 is buffed, and +^0.01 RP, +^0.03 BP",
            cost: new Decimal(200e6),
            unlocked() { return hasUpgrade("prestige", 31) },
        },
    },
    milestones: {
        1: {
            requirementDescription: "3 PP",
            effectDescription: "Generate 1,000,000% of Basic Points a second",
            done() { return player["prestige"].points.gte(3) }
        },
        2: {
            requirementDescription: "10 PP",
            effectDescription: "x100 PF.",
            done() { return player["prestige"].points.gte(10) }
        },
        3: {
            requirementDescription: "400 PP",
            effectDescription: "Generate 100% of Rebirth Points a second. Also x1,000 RP.",
            done() { return player["prestige"].points.gte(400) }
        },
        4: {
            requirementDescription: "20K PP",
            effectDescription: "Keep Rebirth Milestone and Rebirth Upgrade 9.",
            done() { return player["prestige"].points.gte(20000) }
        },
        5: {
            requirementDescription: "500,000 PP",
            effectDescription: "Generate 10,000% of Rebirth Points a second. Also x1,000 RP.",
            done() { return player["prestige"].points.gte(500000) }
        },
        6: {
            requirementDescription: "1e10 PP",
            effectDescription: "You asked for this. Autobuy all RP upgrades.",
            done() { return player["prestige"].points.gte(1e10) }
        },
    },
    infoboxes: {
        info: {
            title: "Welcome to the Prestige Layer",
            body() { return "In here, you can get numbers up to e1,500! You also can automate layers. For now, choose whether you want to buy the upgrade." },
        },
    },
    doReset(prestige) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[prestige].row <= this.row) return;
      
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 11, Challenge 32, Buyable 12
        let keptUpgrades = []
        if ((hasMilestone('mega', 2)) && hasUpgrade(this.layer, 21)) keptUpgrades.push(21)
      
        // Stage 3, track which main features you want to keep - all upgrades, total points, specific toggles, etc.
        let keep = [];
        if ((hasMilestone('mega', 2))) keep.push("milestones");
      
        // Stage 4, do the actual data reset
        layerDataReset(this.layer, keep);
      
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades)
      },
    color: "#338333",
    requires: new Decimal(1e150), // Can be a function that takes requirement increases into account
    resource: "Prestige Points", // Name of currency
    baseResource: "Basic Points", // Name of resource prestige is based on
    baseAmount() {return player.basic.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.01, // Prestige currency exponent
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        if (layers.mega.effect().gte(1)) mult = mult.times(layers.mega.effect())
        if (hasUpgrade('mega', 14)) mult = mult.times(upgradeEffect('mega', 14))
        if (hasUpgrade('rebirth', 32)) mult = mult.times(1.11)
        if (hasUpgrade('prestige', 31)) mult = mult.times(0.1)
        if (hasAchievement('a', 52)) mult = mult.times(1e18)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade('mega', 22)) exp = exp.add(0.01)
        return exp
    },
    effect(){
        let eff = player.prestige.points.add(1).pow(2.5)
       return eff
       },
        effectDescription() {
            let desc = "which is boosting basic points and point fragments by x" + format(tmp[this.layer].effect);
            return desc;
        },
        
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for Prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

}),
addLayer("mega", {
    name: "Mega Points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasUpgrade('prestige', 32) || player.mega.unlocked) visible = true
       return visible
     },
     tabFormat: {
        "Main tab": {
            content: [
                ["infobox", "info"],
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
                "main-display",
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
                return player["prestige"].points.add(1).pow(mu4exp)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            title: "Mega Upgrade 5: THE PRICE...",
            description: "x1e50 PF",
            cost: new Decimal(40e6),
            unlocked() { return hasUpgrade("mega", 14) },
        },
        22: {
            title: "Mega Upgrade 6",
            description: "+^0.01 PP, +^0.02 RP, +^0.03 BP",
            cost: new Decimal(250e6),
            unlocked() { return hasUpgrade("mega", 21) },
        },
        23: {
            title: "Mega Upgrade 7",
            description: "^1.03 Point Fragments...",
            cost: new Decimal(6e9),
            unlocked() { return hasUpgrade("mega", 22) },
        },
        24: {
            title: "Mega Upgrade 8",
            description: "x1 Qi Rebirth Points to Point Fragments",
            cost: new Decimal(3e12),
            unlocked() { return hasUpgrade("mega", 23) },
        },
        31: {
            title: "Mega is useful at achieving big numbers.",
            description: "Mega boosts point fragments heavily.",
            cost: new Decimal(3e13),
            unlocked() { return hasUpgrade("mega", 24) },
            effect() {
                let mu9exp = 8.5
                if (hasUpgrade("mega", 33)) mu9exp = 12.5
                return player["mega"].points.add(1).pow(mu9exp)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        32: {
            title: "Mega Upgrade X",
            description: "Point fragments ^1.025.",
            cost: new Decimal(5.5e14),
            unlocked() { return hasUpgrade("mega", 31) },
        },
        33: {
            title: "Mega Upgrade XI",
            description: "Unlock Mega Buyable 1! MU9 is also stronger.",
            cost: new Decimal(5.5e14),
            unlocked() { return hasUpgrade("mega", 32) },
        },
        34: {
            title: "Mega Upgrade 12",
            description: "Buyables are 2 TIMES AS STRONG!",
            cost: new Decimal(5e32),
            unlocked() { return hasUpgrade("mega", 33) },
        },
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
            requirementDescription: "250,000 MP",
            effectDescription: "Gain 100% of Prestige Points every second.",
            done() { return player["mega"].points.gte(250000) }
        },
        5: {
            requirementDescription: "7e12 MP",
            effectDescription: "Gain 5,000% of Prestige Points every second AND Autobuy Prestige Upgrades.",
            done() { return player["mega"].points.gte(7e12) }
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
    },
    buyables: {
        // Formula and title done, but no effect yet. The effect is also not finalised.
        11: {
            title: "Mega Buyable 1 (1e10 PF/buy, amount of PF increases as you buy)",
            unlocked() { return hasUpgrade("mega", 33) },
            cost(x) {
                return new Decimal(1e19).mul(Decimal.pow(1.3, x)).mul(Decimal.pow(x , Decimal.pow(1.1 , x))).floor()
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
                let expo = new Decimal(1.005)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
        },
    },
    infoboxes: {
        info: {
            title: "Welcome to the Mega Layer",
            body() { return "This is the newest layer!" },
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
        if (hasUpgrade('rebirth', 34)) mult = mult.times(10)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    effect(){
        let eff = player.mega.points.add(1).pow(1)
       return eff
       },
        effectDescription() {
            let desc = "which is boosting all previous reset layers by x" + format(tmp[this.layer].effect);
            return desc;
        },
        
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for MEGA points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

})
