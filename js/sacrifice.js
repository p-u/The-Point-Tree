addLayer("sac", {
    name: "Sacrifice", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasMilestone('mega', 10) || player.sac.unlocked || player["sac"].points.gte(1)) visible = true
       return visible
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
            ],
        },
        "Dimensional Shift": {
            content: [
                "main-display",
                "blank",
                "blank",
                ["bar", "DS1"],
                "blank",
                ["bar", "DS2"],
                "blank",
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
            unlocked() {return player.sac.points.gte(20)}
        },
    },
    milestones: {
        1: {
            requirementDescription: "The First Sacrifice",
            effectDescription: "x1e100 Point Fragments, x1e15 Rebirth Points, x10 Mega Points",
            done() { return player["sac"].points.gte(1) }
        },
        2: {
            requirementDescription: "The Second Sacrifice",
            effectDescription: "x1e30 Basic Points, x10K Prestige Points",
            unlocked() {return player["sac"].points.gte(1)},
            done() { return player["sac"].points.gte(2) }
        },
        3: {
            requirementDescription: "The Third Sacrifice",
            effectDescription: "x6 Mega Passive Generation, Mega Buyable is weaker and boost is way stronger",
            unlocked() {return player["sac"].points.gte(2)},
            done() { return player["sac"].points.gte(3) }
        },
        4: {
            requirementDescription: "The Fourth Sacrifice",
            effectDescription: "x2.28 Mega Passive Gen, 1 new mega upgrade, x2.5M MP and x1e250 PF.",
            unlocked() {return player["sac"].points.gte(3)},
            done() { return player["sac"].points.gte(4) }
        },
        5: {
            requirementDescription: "The Fifth Sacrifice",
            effectDescription: "x1.9 Mega Passive Gen, 1 new mega upgrade, ^1.02 Point Fragments",
            unlocked() {return player["sac"].points.gte(4)},
            done() { return player["sac"].points.gte(5) }
        },
        6: {
            requirementDescription: "Sacrifice 6",
            effectDescription: "Mega Upgrade 14 is stronger. Also... x1e1,000 points... and 1 more mega upgrade.",
            unlocked() {return player["sac"].points.gte(5)},
            done() { return player["sac"].points.gte(6) }
        },
        7: {
            requirementDescription: "Sacrifice 7",
            effectDescription: "1 new row of basic upgrades. X10 Mega Passive Gen. x8e888 PF.",
            unlocked() {return player["sac"].points.gte(6)},
            done() { return player["sac"].points.gte(7) }
        },
        8: {
            requirementDescription: "Sacrifice 8",
            effectDescription: "1 new mega upgrade, Autobuy Mega Buyable 1, x1e400 PF, x1e400 BP, Rebirth and Pres softcap exp +0.01",
            unlocked() {return player["sac"].points.gte(7)},
            done() { return player["sac"].points.gte(8) }
        },
        9: {
            requirementDescription: "Sacrifice 9",
            effectDescription: "Autobuy Mega Upgrades, Mega Buyable 2 is 2x as strong, Mega Upgrade 14 is stronger, unlock 2 new rebirth upgrades",
            unlocked() {return player["sac"].points.gte(8)},
            done() { return player["sac"].points.gte(9) }
        },
        10: {
            requirementDescription: "Sacrifice 10",
            effectDescription: "Keep Mega Milestones and Upgrades 1-8. ^1.006 PF. Unlock Energy. Energy is boosted by sacrifice. Clicking for energy gives 1 energy, but passively generating energy gives 20 times the energy.",
            unlocked() {return player["sac"].points.gte(9)},
            done() { return player["sac"].points.gte(10) }
        },
        11: {
            requirementDescription: "Sacrifice 11",
            effectDescription: "x5 Energy, ^1.005 PF, 2 new mega upgrades, x10 Mega Points",
            unlocked() {return player["sac"].points.gte(10)},
            done() { return player["sac"].points.gte(11) }
        },
        12: {
            requirementDescription: "Sacrifice 12",
            effectDescription: "x10 Energy, energy boost is stronger and Autobuy Mega Buyable 2. More Mega Upgrades. ^1.0015 PF.",
            unlocked() {return player["sac"].points.gte(11)},
            done() { return player["sac"].points.gte(12) }
        },
        13: {
            requirementDescription: "Sacrifice 13",
            effectDescription: "More Prestige Upgrades, ^1.005 PF, x25 Energy, Keep first 2 rows of energy upgrades on sac.",
            unlocked() {return player["sac"].points.gte(12)},
            done() { return player["sac"].points.gte(13) }
        },
        14: {
            requirementDescription: "Sacrifice 14",
            effectDescription: "^1.005 PF, x1,000 Energy, x1e10K PF, extend rebirth upgrades",
            unlocked() {return player["sac"].points.gte(13)},
            done() { return player["sac"].points.gte(14) }
        },
        15: {
            requirementDescription: "Sacrifice 15",
            effectDescription: "^1.005 PF, x10,000 Energy, x1e15K PF, UNLOCK DIMENSIONAL SHIFT",
            unlocked() {return player["sac"].points.gte(14)},
            done() { return player["sac"].points.gte(15) }
        },
        16: {
            requirementDescription: "Sacrifice 16",
            effectDescription: "Rebirth softcap is weaker, x1e20K PF, Energy Upg 8 is stronger",
            unlocked() {return player["sac"].points.gte(15)},
            done() { return player["sac"].points.gte(16) }
        },
        17: {
            requirementDescription: "Sacrifice 17",
            effectDescription: "Rebirth and Prestige softcap is weaker, x1M Energy, Keep Energy Upgrades row 3 on sac.",
            unlocked() {return player["sac"].points.gte(16)},
            done() { return player["sac"].points.gte(17) }
        },
        18: {
            requirementDescription: "Sacrifice 18",
            effectDescription: "^1.0375 PF, -^0.05 BP, +^0.01 RP",
            unlocked() {return player["sac"].points.gte(17)},
            done() { return player["sac"].points.gte(18) }
        },
        19: {
            requirementDescription: "Sacrifice 19",
            effectDescription: "^1.02 PF, x100 Energy, more mega upgrades",
            unlocked() {return player["sac"].points.gte(18)},
            done() { return player["sac"].points.gte(19) }
        },
        20: {
            requirementDescription: "Sacrifice 20",
            effectDescription: "Unlock Challenge tab, More Mega Upgrades, x2,000 Energy",
            unlocked() {return player["sac"].points.gte(19)},
            done() { return player["sac"].points.gte(20) }
        },
        21: {
            requirementDescription: "Sacrifice 21",
            effectDescription: "-^0.1 BP, BUT xe10 Energy, Automate Mega Buyable 3",
            unlocked() {return player["sac"].points.gte(20)},
            done() { return player["sac"].points.gte(21) }
        },
        22: {
            requirementDescription: "Sacrifice 22",
            effectDescription: "More Prestige Upgrades, Keep Row 4 energy upgrades. xe40K PF.",
            unlocked() {return player["sac"].points.gte(21)},
            done() { return player["sac"].points.gte(22) }
        },
        23: {
            requirementDescription: "Sacrifice 23",
            effectDescription: "All buyables are MUCH MORE EXPENSIVE, but are MUCH stronger. Add 1 row of Rebirth Upgrades.",
            unlocked() {return player["sac"].points.gte(22)},
            done() { return player["sac"].points.gte(23) }
        },
        24: {
            requirementDescription: "Sacrifice 24",
            effectDescription: "xe10K PP. ^1.01 PF.",
            unlocked() {return player["sac"].points.gte(23)},
            done() { return player["sac"].points.gte(24) }
        },
        25: {
            requirementDescription: "Sacrifice 25",
            effectDescription: "More Basic Upgrades over Sac 25 and 26. ^1.01 PF.",
            unlocked() {return player["sac"].points.gte(24)},
            done() { return player["sac"].points.gte(25) }
        },
        26: {
            requirementDescription: "Sacrifice 26",
            effectDescription: "x100M Energy. Mega Buyable 1 scaling is weaker. Unlock 1 new mega milestone.",
            unlocked() {return player["sac"].points.gte(25)},
            done() { return player["sac"].points.gte(26) }
        },
        27: {
            requirementDescription: "Sacrifice 27",
            effectDescription: "Unlock Dimensional Shift 2. ^1.006 PF, +^0.025 RP and PP, x2727 Energy",
            unlocked() {return player["sac"].points.gte(26)},
            done() { return player["sac"].points.gte(27) }
        },
        28: {
            requirementDescription: "Sacrifice 28",
            effectDescription: "^1.008 PF, x2828282828 Energy",
            unlocked() {return player["sac"].points.gte(27)},
            done() { return player["sac"].points.gte(28) }
        },
        29: {
            requirementDescription: "Sacrifice 29",
            effectDescription: "xe292929 PF, Prestige Softcap is weaker, Keep Row 5 Energy Upgs, x292929 Energy",
            unlocked() {return player["sac"].points.gte(28)},
            done() { return player["sac"].points.gte(29) }
        },
        30: {
            requirementDescription: "Sacrifice 30",
            effectDescription: "xe300K PF, ^1.01 PF, add 1 more row of Pres Upgs.",
            unlocked() {return player["sac"].points.gte(29)},
            done() { return player["sac"].points.gte(30) }
        },
        31: {
            requirementDescription: "Sacrifice 31",
            effectDescription: "^1.001 PF, x2 Energy, Keep Row 6 Energy Upgs",
            unlocked() {return player["sac"].points.gte(30)},
            done() { return player["sac"].points.gte(31) }
        },
        32: {
            requirementDescription: "Sacrifice 32",
            effectDescription: "^1.01 PF, Unlocks a new RESET LAYER!! (V2.0.0)",
            unlocked() {return player["sac"].points.gte(31)},
            done() { return player["sac"].points.gte(32) }
        },
    },
    challenges: {
        11: {
            name: "Sac Challenge 1 [Recommended Having 'The last of it all' achievement",
            challengeDescription: "^0.5 Point Fragments",
            canComplete: function() {return player.points.gte("e291250")},
            goalDescription: "Get e291.25K PF.",
            rewardDescription: "x10B Energy and xe25K PF"
        },
        12: {
            name: "Sac Challenge 2",
            challengeDescription: "Basic Upgrades 8,10 gives no boost. [Recommended Sac 21]",
            canComplete: function() {return player.points.gte("e1097000")},
            goalDescription: "Get e1,097,000 PF.",
            rewardDescription: "xe75K PF",
            unlocked() { return hasChallenge("sac", 11) },
        },
        13: {
            name: "Sac Challenge 3",
            challengeDescription: "^0.1 PF. [Recommended Sac 24]",
            canComplete: function() {return player.points.gte("e166000")},
            goalDescription: "Get e166,000 PF.",
            rewardDescription: "xe400K PF",
            unlocked() { return hasChallenge("sac", 12) },
        },
        14: {
            name: "Sac Challenge 4",
            challengeDescription: "All layers ^0.5. [Recommended Sac 28]",
            canComplete: function() {return player.points.gte("e1753753")}, // change and add upg
            goalDescription: "Get e1,753,753 PF.", // change this
            rewardDescription: "^1.015 PF, xe20 Energy",
            unlocked() { return hasChallenge("sac", 13) },
        },
    },
    bars: {
        DS1: {
            direction: RIGHT,
            width: 650,
            height: 40,
            fillStyle: { 'background-color': "#79029b" },
            borderStyle() { return { "border-color": "white" } },
            progress() {
                let prog = player.sac.points.div(15)
                if (player.sac.best.gte(15)) prog = 1
                return prog
            },
            display() {
                if (player.sac.best.lte(14))
                    return "Unlock dimensional shift 1: " + format(player.sac.points) + "/15 sacrifices."
                else
                    return "You have unlocked Dimensional Shift 1. Dimensional Shifts add another column to the upgrades (Column 5). Adds another row to Basic Upgrades."
            }
        },
        DS2: {
            direction: RIGHT,
            width: 650,
            height: 40,
            fillStyle: { 'background-color': "#79029b" },
            borderStyle() { return { "border-color": "white" } },
            progress() {
                let prog = player.sac.points.div(27)
                if (player.sac.best.gte(27)) prog = 1
                return prog
            },
            display() {
                if (player.sac.best.lte(26))
                    return "Unlock dimensional shift 2: " + format(player.sac.points) + "/27 sacrifices. [COMING SOON]"
                else
                    return "You have unlocked Dimensional Shift 2. Dimensional Shifts add another column to the upgrades (Column 5). Adds another row to Rebirth Upgrades."
            },
            unlocked() { return player.sac.best.gte(15) }
        },
    },   
    color: "#79029b",
    requires: new Decimal(1.11e111), // Can be a function that takes requirement increases into account
    resource: "Sacrifice", // Name of currency
    baseResource: "Mega Points", // Name of resource prestige is based on
    baseAmount() {return player.mega.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 3.6,  // Balance is needed. Balanced to SAC 3. Have to balance to sac 4 // Prestige currency exponent
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Sacrifice!", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["mega"],
})