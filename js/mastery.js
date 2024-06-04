addLayer("m", {
    name: "Mastery", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MAS", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { 
        return {
            unlocked: true,
		    points: new Decimal(0),
        }
    },
    layerShown(){
        let visible = false
        if (((hasMilestone('sac', 42)) || (inChallenge("m", 11))) || (inChallenge("m", 12))) visible = true
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
    exponent: 0.0000000000000000001,  // Balance is needed. 
    upgrades: {
        11: {
            title: "MMP (More Mastery Points) 1",
            description: "Increase base mastery points to 3 a sec",
            cost: new Decimal(50)
        },
        21: {
            title: "PFP (PF Power) 1",
            description: "^1.02 PF",
            cost: new Decimal(80)
        },
        31: {
            title: "UB (Upgrade Boost) 1",
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
        41: {
            title: "MMP 6",
            description: "Pentuple Mastery Point Gain",
            cost: new Decimal(700000),
            unlocked() { return (hasUpgrade("w", 54) && hasChallenge("m", 11)) },
        },
        51: {
            title: "MM (Many Mult) 1",
            description: "xe100K MP",
            cost: new Decimal(3000000),
            unlocked() { return (hasUpgrade("w", 54) && hasChallenge("m", 11)) },
        },
        61: {
            title: "UB 6",
            description: "SU64 is boosted.",
            cost: new Decimal(2750000),
            unlocked() { return (hasUpgrade("w", 54) && hasChallenge("m", 11)) },
        },
        42: {
            title: "MMP 7",
            description: "Mastery Points gets boosted based on itself",
            cost: new Decimal(3500000),
            unlocked() { return (hasUpgrade("m", 41) && hasUpgrade("m", 51) && hasUpgrade("m", 61)) },
            effect() {
                let mmp6exp = 0.111
                if (hasUpgrade('m', 72)) mmp6exp = 0.139
                return player["m"].points.add(1).pow(mmp6exp)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        52: {
            title: "MM 2",
            description: "xe20M BP",
            cost: new Decimal(15000000),
            unlocked() { return (hasUpgrade("m", 41) && hasUpgrade("m", 51) && hasUpgrade("m", 61)) },
        },
        62: {
            title: "UB 7",
            description: "MU31 is boosted.",
            cost: new Decimal(17500000),
            unlocked() { return (hasUpgrade("m", 41) && hasUpgrade("m", 51) && hasUpgrade("m", 61)) },
        },
        43: {
            title: "MMP 8",
            description: "x9 Mastery Points",
            cost: new Decimal(30000000),
            unlocked() { return (hasUpgrade("m", 42) && hasUpgrade("m", 52) && hasUpgrade("m", 62)) },
        },
        53: {
            title: "MM 3",
            description: "xe70M PF",
            cost: new Decimal(250000000),
            unlocked() { return (hasUpgrade("m", 42) && hasUpgrade("m", 52) && hasUpgrade("m", 62)) },
        },
        63: {
            title: "UB 8",
            description: "Supreme Buyables are stronger, again",
            cost: new Decimal(15000000),
            unlocked() { return (hasUpgrade("m", 42) && hasUpgrade("m", 52) && hasUpgrade("m", 62)) },
        },
        44: {
            title: "MMP 9",
            description: "Increase base to 85/s",
            cost: new Decimal(300000000),
            unlocked() { return (hasUpgrade("m", 43) && hasUpgrade("m", 53) && hasUpgrade("m", 63)) },
        },
        54: {
            title: "MM 4",
            description: "xe2.5M PP",
            cost: new Decimal(2.5e9),
            unlocked() { return (hasUpgrade("m", 43) && hasUpgrade("m", 53) && hasUpgrade("m", 63)) },
        },
        64: {
            title: "UB 9",
            description: "SU21 is stronger",
            cost: new Decimal(2e9),
            unlocked() { return (hasUpgrade("m", 43) && hasUpgrade("m", 53) && hasUpgrade("m", 63)) },
        },
        45: {
            title: "MMP 10",
            description: "x100 Mastery Points",
            cost: new Decimal(3e9),
            unlocked() { return (hasUpgrade("m", 44) && hasUpgrade("m", 54) && hasUpgrade("m", 64)) },
        },
        55: {
            title: "MM 5: Wow, that's crazy.",
            description: "xe130M PF",
            cost: new Decimal(700e9),
            unlocked() { return (hasUpgrade("m", 44) && hasUpgrade("m", 54) && hasUpgrade("m", 64)) },
        },
        65: {
            title: "UB 10: Finally! Some love!",
            description: "ALL MEGA BUYABLES ARE STRONGER!",
            cost: new Decimal(350e9),
            unlocked() { return (hasUpgrade("m", 44) && hasUpgrade("m", 54) && hasUpgrade("m", 64)) },
        },
        71: {
            title: "MMP XI",
            description: "Mastery Point gain x78.2",
            cost: new Decimal(1.4e16),
            unlocked() { return (hasChallenge("m", 12)) },
        },
        81: {
            title: "PU [Power UP] 1",
            description: "Water Gain +^0.1",
            cost: new Decimal(1e18),
            unlocked() { return (hasChallenge("m", 12)) },
        },
        91: {
            title: "SR [Softcap Reduction] 1",
            description: "Reduce Mega Layer effect softcap",
            cost: new Decimal(1.6e18),
            unlocked() { return (hasChallenge("m", 12)) },
        },
        72: {
            title: "MMP 12",
            description: "Mastery Upgrade 42 is stronger",
            cost: new Decimal(2.25e18),
            unlocked() { return (hasUpgrade("m", 71) && hasUpgrade("m", 81) && hasUpgrade("m", 91)) },
        },
        82: {
            title: "PU 2",
            description: "^1.01 PF",
            cost: new Decimal(1.5e18),
            unlocked() { return (hasUpgrade("m", 71) && hasUpgrade("m", 81) && hasUpgrade("m", 91)) },
        },
        92: {
            title: "SR 2",
            description: "Reduce Energy Upg 14 softcap",
            cost: new Decimal(1e18),
            unlocked() { return (hasUpgrade("m", 71) && hasUpgrade("m", 81) && hasUpgrade("m", 91)) },
        },
        73: {
            title: "MMP 13",
            description: "Increase base to 2,500/sec",
            cost: new Decimal(6.5e18),
            unlocked() { return (hasUpgrade("m", 72) && hasUpgrade("m", 82) && hasUpgrade("m", 92)) },
        },
        83: {
            title: "PU 3",
            description: "MP +^0.05",
            cost: new Decimal(3.5e20),
            unlocked() { return (hasUpgrade("m", 72) && hasUpgrade("m", 82) && hasUpgrade("m", 92)) },
        },
        93: {
            title: "SR 3",
            description: "Mega Upgrade 84 softcap is reduced",
            cost: new Decimal(2.5e20),
            unlocked() { return (hasUpgrade("m", 72) && hasUpgrade("m", 82) && hasUpgrade("m", 92)) },
        },
        74: {
            title: "MMP 14",
            description: "x420 Mastery Points",
            cost: new Decimal(2.5e21),
            unlocked() { return (hasUpgrade("m", 73) && hasUpgrade("m", 83) && hasUpgrade("m", 93)) },
        },
        84: {
            title: "PU 4",
            description: "SP +^0.05",
            cost: new Decimal(1e24),
            unlocked() { return (hasUpgrade("m", 73) && hasUpgrade("m", 83) && hasUpgrade("m", 93)) },
        },
        94: {
            title: "SR 4",
            description: "PU22 softcap is reduced",
            cost: new Decimal(1.35e24),
            unlocked() { return (hasUpgrade("m", 73) && hasUpgrade("m", 83) && hasUpgrade("m", 93)) },
        },
        75: {
            title: "MMP 15",
            description: "Increase Mastery Points base to 5M/sec!",
            cost: new Decimal(1.75e24),
            unlocked() { return (hasUpgrade("m", 73) && hasUpgrade("m", 83) && hasUpgrade("m", 93)) },
        },
        85: {
            title: "PU 5",
            description: "^1.015 PF",
            cost: new Decimal(1.35e28),
            unlocked() { return (hasUpgrade("m", 73) && hasUpgrade("m", 83) && hasUpgrade("m", 93)) },
        },
        95: {
            title: "SR 5",
            description: "BU32 softcap is reduced",
            cost: new Decimal(9.5e27),
            unlocked() { return (hasUpgrade("m", 73) && hasUpgrade("m", 83) && hasUpgrade("m", 93)) },
        },
    },
    challenges: {
        11: {
            name: "Mastery Challenge 1. [OP Reward] [Need Ach 146]",
            challengeDescription: "^0.1 PF, ^0.2 BP to MP, ^0.1 Mastery Points, ^0.4 Energy to SP",
            canComplete: function() {return player.points.gte("e29880000")},
            goalDescription: "Get e29.88M PF.",
            rewardDescription: "Unlock new Mastery Upgrades and x100 Mastery Points [Only after WU54 bought], ^1.12 PF"
        },
        12: {
            name: "Mastery Challenge 2. [Need Ach 182]",
            challengeDescription: "Sacrifice Cost Scaling is now increased from 3.6 to 7.5 exponent.",
            canComplete: function() {return player.points.gte("e81643000000")},
            goalDescription: "Get e81.643B PF.",
            rewardDescription: "Unlock new Mastery Upgrades and x10,000 Mastery Points, Sac Scaling decreased to 3.5",
            unlocked() { return hasAchievement("a", 182) },
        },
    },
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        let base = new Decimal(1)
        // base
        if (hasUpgrade('m', 11)) base = new Decimal(3)
        if (hasUpgrade('m', 12)) base = new Decimal(5)
        if (hasUpgrade('m', 15)) base = new Decimal(12)
        if (hasUpgrade('m', 44)) base = new Decimal(85)
        if (hasUpgrade('m', 73)) base = new Decimal(2500)
        if (hasUpgrade('m', 75)) base = new Decimal(5e6)
        // mult
        if (hasUpgrade('m', 42)) mult = mult.times(upgradeEffect('m', 42))
        if (hasUpgrade('m', 13)) mult = mult.times(2.5)
        if (hasUpgrade('m', 14)) mult = mult.times(4)
        if (hasUpgrade('m', 41)) mult = mult.times(5)
        if (hasUpgrade('m', 43)) mult = mult.times(9)
        if (hasUpgrade('m', 45)) mult = mult.times(100)
        if (hasUpgrade('m', 11)) mult = mult.times(base)
        if (hasAchievement('sa', 31)) mult = mult.times(1.05)
        if (hasAchievement('sa', 33)) mult = mult.times(1.01)
        if (hasAchievement('sa', 34)) mult = mult.times(1.06)
        if (hasUpgrade("w", 54)) {
            if (hasChallenge("m", 11)) mult = mult.times(100)
        }
        if (hasChallenge("m", 12)) mult = mult.times(10000)
        if (hasUpgrade('m', 71)) mult = mult.times(78.2)
        if (hasAchievement('a', 183)) mult = mult.times(3.4)
        if (hasUpgrade('m', 74)) mult = mult.times(420)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade('mega', 94)) exp = exp.add(0.005)
        if (inChallenge('m', 11)) exp = exp.mul(0.1)
        return exp
    },
    branches: ["s", "sac", "w"],
    row: 99, // Row the layer is in on the tree (0 is the first row)
    displayRow: 6,
})