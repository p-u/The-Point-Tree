addLayer("m", {
    name: "Mastery", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { 
        return {
            unlocked: true,
		    points: new Decimal(0),
        }
    },
    layerShown(){
        let visible = false
        if ((hasMilestone('sac', 42)) || (inChallenge("m", 11))) visible = true
       return visible
    },
    passiveGeneration() {
        if (hasMilestone('sac', 42)) return 1
        return 0
    },
    infoboxes: {
        info: {
            title: "NOTE",
            body() { return "Mastery resets everything. To get a new column of Mastery Upgrades, you must buy all upgrades in the previous column. To get a new row, complete mastery challenges." },
        },
    },
    tabFormat: {
        "Upgrades": {
            content: [
                "main-display",
                "blank",
                "blank",
                "upgrades",
            ],
        },
        "Challenges": {
            content: [
                "main-display",
                "blank",
                "blank",
                "blank",
                "challenges",
            ],
            unlocked() {return (hasUpgrade("m", 15) && hasUpgrade("m", 25) && hasUpgrade("m", 35))}
        },
    },
    color: "red",
    requires: new Decimal(71), // Can be a function that takes requirement increases into account
    resource: "Mastery Points", // Name of currency
    baseResource: "Sacrifice", // Name of resource prestige is based on
    baseAmount() {return player.sac.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.00000000000000001,  // Balance is needed. 
    upgrades: {
        11: {
            title: "MMP 1",
            description: "Increase base mastery points to 3 a sec",
            cost: new Decimal(50)
        },
        21: {
            title: "PFP 1",
            description: "^1.02 PF",
            cost: new Decimal(80)
        },
        31: {
            title: "UB 1",
            description: "MU31 is stronger",
            cost: new Decimal(110)
        },
        12: {
            title: "MMP 2",
            description: "Increase base mastery points to 5 a sec",
            cost: new Decimal(180),
            unlocked() { return (hasUpgrade("m", 11) && hasUpgrade("m", 21) && hasUpgrade("m", 31)) },
        },
        22: {
            title: "PFP 2",
            description: "^1.02 PF",
            cost: new Decimal(100),
            unlocked() { return (hasUpgrade("m", 11) && hasUpgrade("m", 21) && hasUpgrade("m", 31)) },
        },
        32: {
            title: "UB 2",
            description: "SU21, 51 and 52 is boosted.",
            cost: new Decimal(150),
            unlocked() { return (hasUpgrade("m", 11) && hasUpgrade("m", 21) && hasUpgrade("m", 31)) },
        },
        13: {
            title: "MMP 3",
            description: "Multiply Mastery Points by 2.5",
            cost: new Decimal(300),
            unlocked() { return (hasUpgrade("m", 12) && hasUpgrade("m", 22) && hasUpgrade("m", 32)) },
        },
        23: {
            title: "PFP 3",
            description: "^1.03 PF",
            cost: new Decimal(400),
            unlocked() { return (hasUpgrade("m", 12) && hasUpgrade("m", 22) && hasUpgrade("m", 32)) },
        },
        33: {
            title: "UB 3",
            description: "BB2 and BB3 is boosted.",
            cost: new Decimal(500),
            unlocked() { return (hasUpgrade("m", 12) && hasUpgrade("m", 22) && hasUpgrade("m", 32)) },
        },
        14: {
            title: "MMP 4",
            description: "Multiply Mastery Points by 4",
            cost: new Decimal(800),
            unlocked() { return (hasUpgrade("m", 13) && hasUpgrade("m", 23) && hasUpgrade("m", 33)) },
        },
        24: {
            title: "PFP 4",
            description: "^1.025 PF",
            cost: new Decimal(1500),
            unlocked() { return (hasUpgrade("m", 13) && hasUpgrade("m", 23) && hasUpgrade("m", 33)) },
        },
        34: {
            title: "UB 4",
            description: "Energy effect is boosted tremendously",
            cost: new Decimal(2750),
            unlocked() { return (hasUpgrade("m", 13) && hasUpgrade("m", 23) && hasUpgrade("m", 33)) },
        },
        15: {
            title: "MMP 5",
            description: "Mastery Point Base is increased to 12/s.",
            cost: new Decimal(3000),
            unlocked() { return (hasUpgrade("m", 14) && hasUpgrade("m", 24) && hasUpgrade("m", 34)) },
        },
        25: {
            title: "PFP 5",
            description: "^1.05 PF",
            cost: new Decimal(7500),
            unlocked() { return (hasUpgrade("m", 14) && hasUpgrade("m", 24) && hasUpgrade("m", 34)) },
        },
        35: {
            title: "UB 5",
            description: "All Supreme Buyables are boosted.",
            cost: new Decimal(7000),
            unlocked() { return (hasUpgrade("m", 14) && hasUpgrade("m", 24) && hasUpgrade("m", 34)) },
        },
    },
    challenges: {
        11: {
            name: "Mastery Challenge. [OP Reward] [Need Ach 146]",
            challengeDescription: "^0.1 PF, ^0.2 BP to MP, ^0.1 Mastery Points, ^0.4 Energy to SP",
            canComplete: function() {return player.points.gte("e29880000")},
            goalDescription: "Get e29.88M PF.",
            rewardDescription: "Unlock new Mastery Upgrades [Coming Soon], ^1.12 PF"
        },
    },
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        let base = new Decimal(1)
        // base
        if (hasUpgrade('m', 11)) base = new Decimal(3)
        if (hasUpgrade('m', 12)) base = new Decimal(5)
        if (hasUpgrade('m', 15)) base = new Decimal(12)
        // mult
        if (hasUpgrade('m', 13)) mult = mult.times(2.5)
        if (hasUpgrade('m', 14)) mult = mult.times(4)
        if (hasUpgrade('m', 11)) mult = mult.times(base)
        if (hasAchievement('sa', 31)) mult = mult.times(1.05)
        if (hasAchievement('sa', 33)) mult = mult.times(1.02)
        if (hasAchievement('sa', 34)) mult = mult.times(1.07)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (inChallenge('m', 11)) exp = exp.mul(0.1)
        return exp
    },
    branches: ["s", "sac", "w"],
    row: 99, // Row the layer is in on the tree (0 is the first row)
    displayRow: 6,
})