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
        rows: 25,
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
        56: {
            name: "e70.6 Thousand",
            done() { return  player.points.gte(new Decimal("e70600")) },
            tooltip: "Get e70,600 Point Fragments. Reward: Rebirth Softcap is less strong. (^0.375 to ^0.4)",
        },
        61: {
            name: "Sacrifice!!",
            done() { return  player.sac.points.gte(1) },
            tooltip: "Get Sacrifice 1. Reward: You love passive generation, right? Gain 1.84% of Mega Points a second.",
        },
        62: {
            name: "Stronger than ever!",
            done() { return  player.sac.points.gte(2) },
            tooltip: "Get Sacrifice 2.",
        },
        63: {
            name: "Pentac",
            done() { return  player.sac.points.gte(5) },
            tooltip: "Get Sacrifice 5!",
        },
        64: {
            name: "DubleX100K",
            done() { return  player.points.gte(new Decimal("e200000")) },
            tooltip: "Get e200,000 points. Reward: Rebirth Softcap is less strong.",
        },
        65: {
            name: "Buyable 2",
            done() { return  (hasMilestone('mega', 11)) },
            tooltip: "Get mega buyable 2 [Elusive Rarity]",
        },
        66: {
            name: "Seemingly random III",
            done() { return  player.points.gte(new Decimal("e528528")) },
            tooltip: "A mystery... But it is over e528,000 points and below e529,000. Reward: x1e500 PF.",
        },
        71: {
            name: "Energy I",
            done() { return  player.e.points.gte(new Decimal("1")) },
            tooltip: "Start gaining energy.",
        },
        72: {
            name: "Energy Milestonation",
            done() { return  (hasMilestone('e', 1)) },
            tooltip: "Get the first energy milestone.",
        },
        73: {
            name: "eMilillionaire",
            done() { return player.points.gte(new Decimal("e1000000")) },
            tooltip: "E1M POINTS!! Reward: xe10,000 Points.",
        },
        74: {
            name: "Era 3 Pres Upgs",
            done() { return (hasUpgrade('prestige', 41))},
            tooltip: "Prestige Upgrade 13 [Elusive Rarity].",
        },
        75: {
            name: "e(1x2)M",
            done() { return player.points.gte(new Decimal("e2000000")) },
            tooltip: "E2M POINTS!! Reward: xe10,000 Points and x100 energy",
        },
        76: {
            name: "Sac 15",
            done() { return player.sac.points.gte(new Decimal(15)) },
            tooltip: "Sacrifice 15 [Elusive Rarity]",
        },
        81: {
            name: "Dimensional Shift 1 Upgrade 1",
            done() { return (hasUpgrade('basic', 15)) },
            tooltip: "BUS 1 [Exclusive Rarity]",
        },
        82: {
            name: "Power Crazily Increase",
            done() { return (hasUpgrade('basic', 45)) },
            tooltip: "x1B Energy? That's insane!",
        },
        83: {
            name: "e8100 Mega Points",
            done() { return player.mega.points.gte(new Decimal("e8100")) },
            tooltip: "e8,100 MP. Reward: x1e81 MP",
        },
        84: {
            name: "Mega Buyable 3",
            done() { return (hasMilestone('mega', 12)) },
            tooltip: "Mega Buyable 3",
        },
        85: {
            name: "Mega Rep Upgrades",
            done() { return (hasUpgrade('mega', 61)) },
            tooltip: "Rep Upgrades [Exclusive Rarity]",
        },
        86: {
            name: "The last of it all",
            done() { return (hasUpgrade('basic', 75)) },
            tooltip: "The final Basic Upgrade S. Reward: ^1.00025 PF.",
        },
        91: {
            name: "A Challenge Done!",
            done() { return (hasChallenge('sac', 11)) },
            tooltip: "Challenges [Insane Rarity]",
        },
        92: {
            name: "1.00E1.00E7",
            done() { return player.points.gte(new Decimal("e10000000")) },
            tooltip: "E10,000,000 POINT FRAGMENTS!.",
        },
        93: {
            name: "BP9M",
            done() { return player.basic.points.gte(new Decimal("e9000000")) },
            tooltip: "E9,000,000 Basic Points. Reward: xe9K RP, xe27K BP, xe54K PF",
        },
        94: {
            name: "15 Million Digits",
            done() { return player.points.gte(new Decimal("e15000000")) },
            tooltip: "E15,000,000 Point Fragments. Reward: xe100K PF",
        },
        95: {
            name: "Mega Rise!",
            done() { return player.mega.points.gte(new Decimal("e19500")) },
            tooltip: "E19.5K Mega Points. Reward: xe195 MP, xe95K PF",
        },
        96: {
            name: "25 Million Digits",
            done() { return player.points.gte(new Decimal("e25000000")) },
            tooltip: "E25,000,000 Point Fragments.",
        },
        101: {
            name: "Basic Points boosts all currencies (except sac)",
            done() { return (hasUpgrade('basic', 84)) },
            tooltip: "Get Basic Boost 4. [Exclusive Rarity]",
        },
        102: {
            name: "30 Million Digits",
            done() { return player.points.gte(new Decimal("e30000000")) },
            tooltip: "E30,000,000 Point Fragments.",
        },
        103: {
            name: "Completion of Dimensional Shift 2",
            done() { return (hasUpgrade('rebirth', 55)) },
            tooltip: "Get the fifth upgrade in the Dimensional Shift Series! [Insane Rarity]",
        },
        104: {
            name: "PP Madness",
            done() { return player.prestige.points.gte(new Decimal("e500000")) },
            tooltip: "Get e500,000 PP. Reward: xe250K PF.",
        },
        105: {
            name: "Another Extension...",
            done() { return (hasUpgrade('prestige', 51)) },
            tooltip: "Get e500,000 PP. Reward: xe250K PF.",
        },
        106: {
            name: "150 Million Digits",
            done() { return player.points.gte(new Decimal("e150000000")) },
            tooltip: "E150,000,000 Point Fragments. Reward: xe150K PF",
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