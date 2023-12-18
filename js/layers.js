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
        cols: 5,
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
                return player.points.add(500000).pow(0.055)
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
            unlocked() { return hasMilestone("rebirth", 1) },
        },
        42: {
            title: "Super Upgrade 2",
            description: "Rebirth Points x1.277, Point Fragments x7.77",
            cost: new Decimal(2.5e9),
            unlocked() { return hasMilestone("rebirth", 1) },
        },
        43: {
            title: "Super Upgrade 3: EXPONENTS!",
            description: "Basic Points +^0.01, Point Fragments +^0.025",
            cost: new Decimal(8e10),
            unlocked() { return hasMilestone("rebirth", 1) },
        },
        44: {
            title: "Super Upgrade 4",
            description: "Rebirth Points x2, Basic Points x4, Point Fragments x10",
            cost: new Decimal(2e15),
            unlocked() { return hasMilestone("rebirth", 1) },
        },
    },
    color: "#add8e6",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Basic Points", // Name of currency
    baseResource: "Point Fragments", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        if (hasUpgrade('basic', 13)) mult = mult.times(upgradeEffect('basic', 13))
        if (hasUpgrade('basic', 21)) mult = mult.times(upgradeEffect('basic', 21))
        if (hasUpgrade('basic', 14)) mult = mult.times(1.35)
        if (hasUpgrade('basic', 23)) mult = mult.times(1.39)
        if (hasUpgrade('basic', 41)) mult = mult.times(1.91)
        if (hasUpgrade('basic', 44)) mult = mult.times(4)
        if (hasUpgrade('rebirth', 12)) mult = mult.times(5)
        if (hasUpgrade('rebirth', 13)) mult = mult.times(1.28)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade('basic', 43)) exp = exp.add(0.02)
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
		points: new Decimal(4),
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
    },
    milestones: {
        1: {
            requirementDescription: "3 RP",
            effectDescription: "4 New Basic Point Upgrades",
            done() { return player["rebirth"].points.gte(3) }
        },
    },
    color: "#00008b",
    requires: new Decimal(50000000), // Can be a function that takes requirement increases into account
    resource: "Rebirth Points", // Name of currency
    baseResource: "Point Fragments", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.12, // Prestige currency exponent
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        if (hasUpgrade('basic', 41)) mult = mult.times(1.19)
        if (hasUpgrade('basic', 42)) mult = mult.times(1.277)
        if (hasUpgrade('basic', 44)) mult = mult.times(2)
        if (hasUpgrade('rebirth', 13)) mult = mult.times(1.28)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
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
    layerShown(){return true}

})