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
            name: "AUTOMATION!!",
            done() { return (hasMilestone('prestige', 2)) },
            tooltip: "Get Prestige Milestone 2.",
        },
        34: {
            name: "Last of Rebirths",
            done() { return (hasUpgrade('rebirth', 32)) },
            tooltip: "Get the last Extended-Rebirth Upgrade (RU10).",
        },
        35: {
            name: "Fiver Hundo",
            done() { return  player.points.gte(new Decimal("e500")) },
            tooltip: "Get 1e500 point fragments.",
        },
        36: {
            name: "10 to the power of Ten Hundred?",
            done() { return  player.points.gte(new Decimal("e1000")) },
            tooltip: "Get 1e1000 point fragments.",
        },
        41: {
            name: "Layer 4: MEGA!",
            done() { return  player.mega.points.gte(1) },
            tooltip: "Get 1 mega point.",
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
                return player[this.layer].points.add(1).pow(0.35)
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
        if (hasUpgrade('basic', 34)) visible = true
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
            unlocked() { return hasUpgrade("prestige", 21) },
        },
        32: {
            title: "Rebirth Upgrade 10",
            description: "x1.11 PP, x11.11 RP, x1111.11 BP, x1111111.11 PF",
            cost: new Decimal(1e48),
            unlocked() { return hasUpgrade("rebirth", 31) },
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
            done() { return player["rebirth"].points.gte(2000) }
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
        if (hasMilestone('prestige', 3)) return 100
        if (hasMilestone('prestige', 77)) return 1
        return 0
    },
    autoUpgrade() {
        let auto = false
        if (hasMilestone('prestige', 4)) auto = true
        return auto
    },
    infoboxes: {
        info: {
            title: "Welcome to the Rebirth Layer",
            body() { return "More numbers to achieve. Focus on getting the first milestone! Rebirth Points (RP) also boost Point Fragments (PF)." },
        },
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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade('basic', 53)) exp = exp.add(0.005)
        if (hasUpgrade('basic', 54)) exp = exp.add(0.005)
        if (hasUpgrade('prestige', 32)) exp = exp.add(0.01)
        return exp
    },
    effect(){
        let eff = player.rebirth.points.add(1).pow(1.57)
       return eff
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
        if (hasUpgrade('basic', 54)) visible = true
       return visible
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
        },
        13: {
            title: "Prestige Upgrade 3",
            description: "x10 RP, x100 PF",
            cost: new Decimal(5),
        },
        14: {
            title: "Prestige Upgrade 4",
            description: "x10 RP, x100K PF",
            cost: new Decimal(25),
        },
        21: {
            title: "Prestige Upgrade 5",
            description: "x25 RP, BP and PF. Unlock 2 new RP Upgrades.",
            cost: new Decimal(50),
        },
        22: {
            title: "Prestige Upgrade 6: A big one!",
            description: "Rebirth Points boosts itself.",
            cost: new Decimal(500),
            effect() {
                return player["rebirth"].points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        23: {
            title: "Prestige Upgrade 7",
            description: "x10^10 PF",
            cost: new Decimal(2500),
        },
        24: {
            title: "Prestige Upgrade 8",
            description: "+^0.02 BP, ^1.02 PF",
            cost: new Decimal(20000),
        },
        31: {
            title: "Prestige Upgrade 9: Insanely OP, but with a catch",
            description: "x1e20 PF, x1e8 BP, x1e3 RP, BUT /10 PP",
            cost: new Decimal(10000000),
        },
        32: {
            title: "Prestige Upgrade 10: The last Upgrade before the reset",
            description: "Basic Upgrade 10 is buffed, and +^0.01 RP, +^0.03 BP",
            cost: new Decimal(200e6),
        },
    },
    milestones: {
        1: {
            requirementDescription: "3 PP",
            effectDescription: "Generate 10,000% of Basic Points a second",
            done() { return player["prestige"].points.gte(3) }
        },
        2: {
            requirementDescription: "10 PP",
            effectDescription: "x100 PF.",
            done() { return player["prestige"].points.gte(10) }
        },
        77: {
            requirementDescription: "400 PP",
            effectDescription: "Generate 100% of Rebirth Points a second. Also x1,000 RP.",
            done() { return player["prestige"].points.gte(500000) }
        },
        3: {
            requirementDescription: "500,000 PP",
            effectDescription: "Generate 10,000% of Rebirth Points a second. Also x1,000 RP.",
            done() { return player["prestige"].points.gte(500000) }
        },
        4: {
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
        if (hasUpgrade('rebirth', 32)) mult = mult.times(1.11)
        if (hasUpgrade('prestige', 31)) mult = mult.times(0.1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
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
        if (hasUpgrade('prestige', 32)) visible = true
       return visible
     },
    upgrades: {
        11: {
            title: "Mega upgrades come with MEGA boosts.",
            description: "x10M PF, x1K BP, x10 RP",
            cost: new Decimal(1),
        },
        12: {
            title: "How about another upgrade?",
            description: "x250 RP and x1B PF",
            cost: new Decimal(2),
        },
    },
    milestones: {
        1: {
            requirementDescription: "3 PP",
            effectDescription: "Generate 10M% of Basic Points a second AND 10K% of Rebirth Points a second",
            done() { return player["mega"].points.gte(3) }
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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    effect(){
        let eff = player.mega.points.add(1).pow(0.6)
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
