addLayer("a", {
    startData() { return {
        unlocked: true,
        point: new Decimal(0),
        ultra: new Decimal(0),
        hyper: new Decimal(0),
        omega: new Decimal(0),
        ultimate: new Decimal(0),
        penultimate: new Decimal(0),
        godlike: new Decimal(0),
        level: new Decimal(0)
    }},
    color: "yellow",
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    tabFormat: {
        "Achievements [1]": {
            content: [
                ["display-text", function() { return "Achievements: "+player.a.achievements.length+"/"+(Object.keys(tmp.a.achievements).length-4) }],
                ["achievements", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]],
                "blank",
                ],
        },
        "Achievements [2]": {
            content: [
                ["display-text", function() { return "Achievements: "+player.a.achievements.length+"/"+(Object.keys(tmp.a.achievements).length-4) }],
                ["achievements", [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]],
                "blank",
                ],
                unlocked() { return hasAchievement("a", 186)},
        },
        "Playtime Milestones": {
            content: [
                "milestones"
            ],
        },
        "BPP (???)": {
            content: [
                ["display-text", function() { return "What is a BPP??" }],
                ["display-text", function() { return "BPP is a hidden feature found in the Achievements layer, unlocked when the theme is set to Void." }],
                ["display-text", function() { return "BPP stands for 'Beyond Points Progression', and here we will discover other currencies which are 'Point' related and compile all 'Point' related currencies." }],
                "blank",
                "blank",
                "blank",
                ["display-text", function() { return "Point Fragments: " + notationChooser(player.points) }],
                ["display-text", function() { return "Points: " + notationChooser(player.a.point) + ". Formula: PF^0.5 * BP^0.5" }],
                ["display-text", function() { return "Basic Points: " + notationChooser(player.basic.points) }],
                ["display-text", function() { return "Prestige Points: " + notationChooser(player.prestige.points) }],
                ["display-text", function() { return "Mega Points: " + notationChooser(player.mega.points) }],
                ["display-text", function() { return "Ultra Points: " + notationChooser(player.a.ultra) + ". Formula: (MP/1e250)^(1/(7+slog(PF)))" }],
                ["display-text", function() { return "Hyper Points: " + notationChooser(player.a.hyper) + ". Formula: UP^(1/(9+2slog(MP)))" }],
                ["display-text", function() { return "Supreme Points: " + notationChooser(player.s.points) }],
                ["display-text", function() { return "Omega Points: " + notationChooser(player.a.omega) + ". Formula: (SP/1e20)^(1/(3+2slog(SP)*slog(PF)*slog(MP)))" }],
                ["display-text", function() { return "Ultimate Points: " + notationChooser(player.a.ultimate) + ". Formula: (OP/1e10)^(1/(5slog(PF)^slog(OP)))" }],
                ["display-text", function() { return "Penultimate Points: " + notationChooser(player.a.penultimate) + ". Formula: (UP/1e100)^(1/(10^2slog(UP)))" }],
                ["display-text", function() { return "Godlike Points: " + notationChooser(player.a.godlike) + ". Formula: (PUP/1e308)^(1/(777*slog(PUP)))" }],
                ["display-text", function() { return "Level Points: " + notationChooser(player.a.level) + ". Formula: slog(Point)^slog(PF)^slog(Point)^slog(PF)" }],
                ["display-text", function() { return "Mastery Points: " + notationChooser(player.m.points) }],
            ],
            unlocked() { return options.theme == 'void'},
        },
    },
    milestones: {
        1: {
            requirementDescription: "1 minute of playtime",
            effectDescription: "Thanks for playing my game! I hope you enjoy it",
            done() { return player.timePlayed > 60 }
        },
        2: {
            requirementDescription: "30 minutes of playtime",
            effectDescription: "So, how do you find the game so far? Oh, btw, don't lose track of real-life time",
            done() { return player.timePlayed > 1800 },
            unlocked() { return hasMilestone("a", 1) }
        },
        3: {
            requirementDescription: "5 hours of playtime",
            effectDescription: "Remember to drink water :) and rest your eyes",
            done() { return player.timePlayed > (60 * 60 * 5) },
            unlocked() { return hasMilestone("a", 2) }
        },
        4: {
            requirementDescription: "10 hours of playtime",
            effectDescription: "You probably are at the Era stage if you did not venture into the minigame and played optimally. But if you are still at the beginning stage, here's a x1.5 PF for you",
            done() { return player.timePlayed > (60 * 60 * 10) },
            unlocked() { return hasMilestone("a", 3) }
        },
        5: {
            requirementDescription: "1 day of playtime",
            effectDescription: "Remember to join my discord server! Reminder 2 to drink water :) and rest your eyes. (Fun fact, you could have watched Jurrasic Park 11.3 times...)",
            done() { return player.timePlayed > (60 * 60 * 24) },
            unlocked() { return hasMilestone("a", 4) }
        },
        6: {
            requirementDescription: "3 days of playtime",
            effectDescription: "Addicted. Assuming you take 5 seconds to drink 50ml of water, you would have drank 259.2 litres (68.47 gallons) of water if you continuously drank it",
            done() { return player.timePlayed > (60 * 60 * 24 * 3) },
            unlocked() { return hasMilestone("a", 5) }
        },
        7: {
            requirementDescription: "1 week of playtime",
            effectDescription: "Reminder 3 to drink water, rest your eyes, eat and sleep, take a walk. Fun fact 3: Assuming you read at an average pace of 0.5 pages/minute, you would have read about 5,040 pages by now if you did not sleep... That's probably more than you've ever read. Anyway, here's a x20 Rebirth Point boost if you are still there... and an x3 Prestige Point boost",
            done() { return player.timePlayed > (60 * 60 * 24 * 7) },
            unlocked() { return hasMilestone("a", 6) }
        },
        8: {
            requirementDescription: "1 month of playtime",
            effectDescription: "You could watch the ENTIRE Avengers Cinematic Universe 11.625 times... well... and also xe100 PF",
            done() { return player.timePlayed > (60 * 60 * 24 * 30) },
            unlocked() { return hasMilestone("a", 7) }
        },
        9: {
            requirementDescription: "100 days of playtime",
            effectDescription: "Screenshot proof of this achievement and send it in my discord for an exclusive role!",
            done() { return player.timePlayed > (60 * 60 * 24 * 100) },
            unlocked() { return hasMilestone("a", 8) }
        },
        10: {
            requirementDescription: "200 days of playtime",
            effectDescription: "You either are a cheater OR a absolute true godly no-life... Fun fact 4: If you have just left your computer on for 200 days, it will use 1200 kWh for a desktop and 360 kWh for a laptop (averages). Assuming you are in Los Angeles, you can drive a Tesla Model 3 to Beaumont, Texas for a laptop and to Montreal, Canada there, back and there again for a desktop... Oh also xe1,000,000 PF...",
            done() { return player.timePlayed > (60 * 60 * 24 * 200) },
            unlocked() { return hasMilestone("a", 9) }
        },
        11: {
            requirementDescription: "1 year of playtime",
            effectDescription: "I don't think anyone is daring enough to sit there and wait for a FULL YEAR for a single achievement... Well played. You 100%ed the game.",
            done() { return player.timePlayed > (60 * 60 * 24 * 365) },
            unlocked() { return hasMilestone("a", 10) }
        },
    },
    achievements: {
        rows: 40,
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
            name: "The start of a new layer",
            done() {
                return player.rebirth.points.gte(1) 
            },
            tooltip() {
                let tt = "Get 1 Rebirth Point"
                return tt
            },
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
            tooltip: "Get 1e100 point fragments. Unlock the next 3 rows of achievements.",
            style() {
                return {
                "border-color": "red",
                "border-width": "3px"
                }
            }
        },
        31: {
            name: "PRESTIGE",
            done() { return player.prestige.points.gte(1) },
            tooltip: "Prestige!",
            unlocked() { return hasAchievement("a", 26) },
        },
        32: {
            name: "1e100 2X!",
            done() { return player.points.gte(1e200) },
            tooltip: "Get 1e200 point fragments.",
            unlocked() { return hasAchievement("a", 26) },
        },
        33: {
            name: "Last of Rebirths",
            done() { return (hasUpgrade('rebirth', 32)) },
            tooltip: "Get the last Extended-Rebirth Upgrade (RU10).",
            unlocked() { return hasAchievement("a", 26) },
        },
        34: {
            name: "Fiver Hundo",
            done() { return  player.points.gte(new Decimal("e500")) },
            tooltip: "Get 1e500 point fragments.",
            unlocked() { return hasAchievement("a", 26) },
        },
        35: {
            name: "10 to the power of Ten Hundred?",
            done() { return  player.points.gte(new Decimal("e1000")) },
            tooltip: "Get 1e1000 point fragments.",
            unlocked() { return hasAchievement("a", 26) },
        },
        36: {
            name: "Even More?",
            done() { return  player.points.gte(new Decimal("e1500")) },
            tooltip: "Get 1e1500 point fragments.",
            unlocked() { return hasAchievement("a", 26) },
        },
        41: {
            name: "Layer 4: MEGA!",
            done() { return  player.mega.points.gte(1) },
            tooltip: "Get 1 mega point.",
            unlocked() { return hasAchievement("a", 26) },
        },
        42: {
            name: "Keep Prestige Milestone!!",
            done() { return  (hasMilestone('mega', 2)) },
            tooltip: "Get the second mega milestone",
            unlocked() { return hasAchievement("a", 26) },
        },
        43: {
            name: "Tres thou.",
            done() { return player.points.gte(new Decimal("e3000")) },
            tooltip: "Get 1e3,000 points. Reward: x1e30 points.",
            unlocked() { return hasAchievement("a", 26) },
        },
        44: {
            name: "Are you kidding me?",
            done() { return (hasUpgrade('mega', 21)) },
            tooltip: "Get the fifth mega upgrade. ",
            unlocked() { return hasAchievement("a", 26) },
        },
        45: {
            name: "Seemingly random",
            done() { return player.points.gte(new Decimal("e10218")) },
            tooltip: "A mystery... But it is over e10,000 points and below e10,250. Reward: x1e68 PF.",
            unlocked() { return hasAchievement("a", 26) },
        },
        51: {
            name: "More Pres Keep",
            done() { return (hasMilestone('mega', 5)) },
            tooltip: "Mega Milestone 5",
            unlocked() { return hasAchievement("a", 26) },
        },
        52: {
            name: "So many Megas!",
            done() { return  player.mega.points.gte(1.8e18) },
            tooltip: "Have 1.8e18 Mega Points. Reward: x1e18 Prestige Points.",
            unlocked() { return hasAchievement("a", 26) },
        },
        53: {
            name: "Are you able to buy?",
            done() { return (hasUpgrade('mega', 33))  },
            tooltip: "Get Mega Buyable 1.",
            unlocked() { return hasAchievement("a", 26) },
        },
        54: {
            name: "THE TRADE-OFF OF THE CENTURY",
            done() { return  (hasUpgrade('rebirth', 34)) },
            tooltip: "Buy Rebirth Upgrade 34",
            unlocked() { return hasAchievement("a", 26) },
        },
        55: {
            name: "Seemingly Random Version 2",
            done() { return  player.points.gte(new Decimal("e32772")) },
            tooltip: "A mystery... But it is over e32,500 points and below e33,000. Reward: x2.72e272 PF.",
            unlocked() { return hasAchievement("a", 26) },
        },
        56: {
            name: "e70.6 Thousand",
            done() { return  player.points.gte(new Decimal("e70600")) },
            tooltip: "Get e70,600 Point Fragments. Reward: Rebirth Softcap is less strong. (^0.375 to ^0.4). Also, unlock the next 2 rows of achievements.",
            unlocked() { return hasAchievement("a", 26) },
            style() {
                return {
                "border-color": "red",
                "border-width": "3px"
                }
            }
        },
        61: {
            name: "Sacrifice!!",
            done() { return  player.sac.points.gte(1) },
            tooltip: "Get Sacrifice 1. Reward: You love passive generation, right? Gain 1.84% of Mega Points a second. [Ultra Rarity]",
            unlocked() { return hasAchievement("a", 56) },
        },
        62: {
            name: "Stronger than ever!",
            done() { return  player.sac.points.gte(2) },
            tooltip: "Get Sacrifice 2.",
            unlocked() { return hasAchievement("a", 56) },
        },
        63: {
            name: "Pentac",
            done() { return  player.sac.points.gte(5) },
            tooltip: "Get Sacrifice 5!",
            unlocked() { return hasAchievement("a", 56) },
        },
        64: {
            name: "DubleX100K",
            done() { return  player.points.gte(new Decimal("e200000")) },
            tooltip: "Get e200,000 points. Reward: Rebirth Softcap is less strong.",
            unlocked() { return hasAchievement("a", 56) },
        },
        65: {
            name: "Buyable 2",
            done() { return  (hasMilestone('mega', 13)) },
            tooltip: "Get mega buyable 2 [Elusive Rarity]",
            unlocked() { return hasAchievement("a", 56) },
        },
        66: {
            name: "Seemingly random III",
            done() { return  player.points.gte(new Decimal("e528528")) },
            tooltip: "A mystery... But it is over e528,000 points and below e529,000. Reward: x1e500 PF.",
            unlocked() { return hasAchievement("a", 56) },
        },
        71: {
            name: "Energy I",
            done() { return  player.e.points.gte(new Decimal("1")) },
            tooltip: "Start gaining energy. [Elusive Rarity]",
            unlocked() { return hasAchievement("a", 56) },
        },
        72: {
            name: "Energy Milestonation",
            done() { return  (hasMilestone('e', 1)) },
            tooltip: "Get the first energy milestone.",
            unlocked() { return hasAchievement("a", 56) },
        },
        73: {
            name: "eMilillionaire",
            done() { return player.points.gte(new Decimal("e1000000")) },
            tooltip: "E1M POINTS!! Reward: xe10,000 Points.",
            unlocked() { return hasAchievement("a", 56) },
        },
        74: {
            name: "Stage 3 Pres Upgs",
            done() { return (hasUpgrade('prestige', 41))},
            tooltip: "Prestige Upgrade 13 [Elusive Rarity].",
            unlocked() { return hasAchievement("a", 56) },
        },
        75: {
            name: "e(1x2)M",
            done() { return player.points.gte(new Decimal("e2000000")) },
            tooltip: "E2M POINTS!! Reward: xe10,000 Points and x100 energy",
            unlocked() { return hasAchievement("a", 56) },
        },
        76: {
            name: "Sac 15",
            done() { return player.sac.points.gte(new Decimal(15)) },
            tooltip: "Sacrifice 15 [Elusive Rarity]. Unlock the next 3 rows of achievements.",
            unlocked() { return hasAchievement("a", 56) },
            style() {
                return {
                "border-color": "red",
                "border-width": "3px"
                }
            }
        },
        81: {
            name: "Dimensional Shift 1 Upgrade 1",
            done() { return (hasUpgrade('basic', 15)) },
            tooltip: "BUS 1 [Exclusive Rarity]",
            unlocked() { return hasAchievement("a", 76) },
        },
        82: {
            name: "Power Crazily Increase",
            done() { return (hasUpgrade('basic', 45)) },
            tooltip: "x1B Energy? That's insane!",
            unlocked() { return hasAchievement("a", 76) },
        },
        83: {
            name: "e8100 Mega Points",
            done() { return player.mega.points.gte(new Decimal("e8100")) },
            tooltip: "e8,100 MP. Reward: x1e81 MP",
            unlocked() { return hasAchievement("a", 76) },
        },
        84: {
            name: "Mega Buyable 3",
            done() { return (hasMilestone('mega', 14)) },
            tooltip: "Mega Buyable 3",
            unlocked() { return hasAchievement("a", 76) },
        },
        85: {
            name: "Mega Rep Upgrades",
            done() { return (hasUpgrade('mega', 61)) },
            tooltip: "Rep Upgrades [Exclusive Rarity]",
            unlocked() { return hasAchievement("a", 76) },
        },
        86: {
            name: "The last of it all",
            done() { return (hasUpgrade('basic', 75)) },
            tooltip: "The final Basic Upgrade S. Reward: ^1.00025 PF.",
            unlocked() { return hasAchievement("a", 76) },
        },
        91: {
            name: "A Challenge Done!",
            done() { return (hasChallenge('sac', 11)) },
            tooltip: "Challenges [Insane Rarity]",
            unlocked() { return hasAchievement("a", 76) },
        },
        92: {
            name: "1.00E1.00E7",
            done() { return player.points.gte(new Decimal("e10000000")) },
            tooltip: "E10,000,000 POINT FRAGMENTS!.",
            unlocked() { return hasAchievement("a", 76) },
        },
        93: {
            name: "BP9M",
            done() { return player.basic.points.gte(new Decimal("e9000000")) },
            tooltip: "E9,000,000 Basic Points. Reward: xe9K RP, xe27K BP, xe54K PF",
            unlocked() { return hasAchievement("a", 76) },
        },
        94: {
            name: "15 Million Digits",
            done() { return player.points.gte(new Decimal("e15000000")) },
            tooltip: "E15,000,000 Point Fragments. Reward: xe100K PF",
            unlocked() { return hasAchievement("a", 76) },
        },
        95: {
            name: "Mega Rise!",
            done() { return player.mega.points.gte(new Decimal("e19500")) },
            tooltip: "E19.5K Mega Points. Reward: xe195 MP, xe95K PF",
            unlocked() { return hasAchievement("a", 76) },
        },
        96: {
            name: "25 Million Digits",
            done() { return player.points.gte(new Decimal("e25000000")) },
            tooltip: "E25,000,000 Point Fragments.",
            unlocked() { return hasAchievement("a", 76) },
        },
        101: {
            name: "Basic Points boosts all currencies (except sac)",
            done() { return (hasUpgrade('basic', 84)) },
            tooltip: "Get Basic Boost 4. [Exclusive Rarity]",
            unlocked() { return hasAchievement("a", 76) },
        },
        102: {
            name: "30 Million Digits",
            done() { return player.points.gte(new Decimal("e30000000")) },
            tooltip: "E30,000,000 Point Fragments.",
            unlocked() { return hasAchievement("a", 76) },
        },
        103: {
            name: "Completion of Dimensional Shift 2",
            done() { return (hasUpgrade('rebirth', 55)) },
            tooltip: "Get the fifth upgrade in the Dimensional Shift Series! [Insane Rarity]",
            unlocked() { return hasAchievement("a", 76) },
        },
        104: {
            name: "PP Madness",
            done() { return player.prestige.points.gte(new Decimal("e500000")) },
            tooltip: "Get e500,000 PP. Reward: xe250K PF.",
            unlocked() { return hasAchievement("a", 76) },
        },
        105: {
            name: "Another Extension...",
            done() { return (hasUpgrade('prestige', 51)) },
            tooltip: "Another Prestige Extension.",
            unlocked() { return hasAchievement("a", 76) },
        },
        106: {
            name: "150 Million Digits",
            done() { return player.points.gte(new Decimal("e150000000")) },
            tooltip: "Get e150,000,000 Point Fragments. Reward: xe150K PF. Unlock the next 2 rows of achievements.",
            unlocked() { return hasAchievement("a", 76) },
            style() {
                return {
                "border-color": "red",
                "border-width": "3px"
                }
            }
        },
        111: {
            name: "Supreme",
            done() { return player.s.points.gte(new Decimal(1)) },
            tooltip: "Get 1 Supreme Point [Super Exclusive Rarity]",
            unlocked() { return hasAchievement("a", 106) },
        },
        112: {
            name: "More Supreme",
            done() { return player.s.points.gte(new Decimal(15)) },
            tooltip: "Get 15 Supreme Points [Super Exclusive Rarity]",
            unlocked() { return hasAchievement("a", 106) },
        },
        113: {
            name: "Many Supreme",
            done() { return player.s.points.gte(new Decimal(1000)) },
            tooltip: "Get 1,000 Supreme Point [Super Exclusive Rarity]. Reward: Unlock 'Supreme Buyable' tab.",
            unlocked() { return hasAchievement("a", 106) },
        },
        114: {
            name: "Water",
            done() { return player.w.points.gte(new Decimal(1)) },
            tooltip: "Get water. [Super Exclusive Rarity]",
            unlocked() { return hasAchievement("a", 106) },
        },
        115: {
            name: "Passively Supreme",
            done() { return (hasUpgrade('s', 42)) },
            tooltip: "Unlock Supreme Buyable 2 [Super Exclusive Rarity]. ",
            unlocked() { return hasAchievement("a", 106) },
        },
        116: {
            name: "Finally, a milestone",
            done() { return (hasMilestone('sac', 33)) },
            tooltip: "Get Sac Milestone 33. ",
            unlocked() { return hasAchievement("a", 106) },
        },
        121: {
            name: "Get Loads of Water",
            done() { return player.w.points.gte(new Decimal(1e10)) },
            tooltip: "Get 10^10 Water [Mega Exclusive Rarity]. ",
            unlocked() { return hasAchievement("a", 106) },
        },
        122: {
            name: "How big is that?",
            done() { return player.points.gte(new Decimal("e290000000")) },
            tooltip: "Get e290M PF. Reward: ^1.015 PF",
            unlocked() { return hasAchievement("a", 106) },
        },
        123: {
            name: "Get Insanely Many Water",
            done() { return player.w.points.gte(new Decimal(1e30)) },
            tooltip: "Get 10^30 Water [Mega Exclusive Rarity]. ",
            unlocked() { return hasAchievement("a", 106) },
        },
        124: {
            name: "How big is that+?",
            done() { return player.points.gte(new Decimal("e407.4e6")) },
            tooltip: "Get e407.4M PF. Reward: ^1.014074 PF",
            unlocked() { return hasAchievement("a", 106) },
        },
        125: {
            name: "Mega a lot",
            done() { return player.mega.points.gte(new Decimal("e280000")) },
            tooltip: "Get e280K MP. Reward: xe2.8M PF, xe2.94K MP",
            unlocked() { return hasAchievement("a", 106) },
        },
        126: {
            name: "[Warning] Too Much Water!",
            done() { return player.w.points.gte(new Decimal(4e51)) },
            tooltip: "Get 4e51 Water. Reward: xe4.51M PF, x45.1 Water, x4.51 SP. Also unlock the next 7 milestones.",
            unlocked() { return hasAchievement("a", 106) },
            style() {
                return {
                "border-color": "red",
                "border-width": "3px"
                }
            }
        },
        131: {
            name: "True Supremacy",
            done() { return (hasUpgrade('s', 63)) },
            tooltip: "Unlock Supreme Buyable 4 [Mega Exclusive Rarity]. ",
            unlocked() { return hasAchievement("a", 126) },
        },
        132: {
            name: "Choice Row Upgs Start",
            done() { return ((hasUpgrade('s', 71)) || (hasUpgrade('s', 81))) },
            tooltip: "Choose and buy one of the two starting choice row upgs [Unique Rarity]",
            unlocked() { return hasAchievement("a", 126) },
        },
        133: {
            name: "Choice Row Upgs 2",
            done() { return ((hasUpgrade('s', 71)) && (hasUpgrade('s', 81))) },
            tooltip: "Choose and buy both of the starting choice row upgs [Unique Rarity]",
            unlocked() { return hasAchievement("a", 126) },
        },
        134: {
            name: "I NEED ONE MORE MILLION!",
            done() { return player.basic.points.gte(new Decimal("e199000000")) },
            tooltip: "Get e199M BP. Reward: +^0.01 BP, ^1.01 PF",
            unlocked() { return hasAchievement("a", 126) },
        },
        135: {
            name: "41414141414141414141414141414141",
            done() { return player.e.points.gte(new Decimal("4.141e4141")) },
            tooltip: "Get 4.141e4141 Energy. Reward: xe14.141M PF",
            unlocked() { return hasAchievement("a", 126) },
        },
        136: {
            name: "[CRITICAL Warning] Too Much Water!",
            done() { return player.w.points.gte(new Decimal(1e115)) },
            tooltip: "Get 1e115 Water. Reward: x1000 Water, xe10M PF",
            unlocked() { return hasAchievement("a", 126) },
        },
        141: {
            name: "More Milestones",
            done() { return (hasMilestone('sac', 40)) },
            tooltip: "Sac MS40. Unlock the next 15 achievements.",
            unlocked() { return hasAchievement("a", 126) },
            style() {
                return {
                "border-color": "red",
                "border-width": "3px"
                }
            }
        },
        142: {
            name: "Basic Milestones?",
            done() { return (hasMilestone('basic', 1)) },
            tooltip: "Basic MS1. [Unique Rarity]",
            unlocked() { return hasAchievement("a", 141) },
        },
        143: {
            name: "The New Reset Layer",
            done() { return (hasMilestone('sac', 42)) },
            tooltip: "Sac MS42. ",
            unlocked() { return hasAchievement("a", 141) },
        },
        144: {
            name: "OP Energy",
            done() { return (hasUpgrade('m', 34)) },
            tooltip: "Mastery Upg 34",
            unlocked() { return hasAchievement("a", 141) },
        },
        145: {
            name: "9131",
            done() { return player.basic.points.gte(new Decimal("e913095000")) },
            tooltip: "Get e913,095,000 BP. Reward: ^1.029 PF",
            unlocked() { return hasAchievement("a", 141) },
        },
        146: {
            name: "Energy Overload",
            done() { return player.e.points.gte(new Decimal("e9600")) },
            tooltip: "Get e9600 Energy. Reward: xe9.6M PF [Crazy Rarity]",
            unlocked() { return hasAchievement("a", 141) },
        },
        151: {
            name: "Mastery Challenge - First Milestone",
            done() { return hasMilestone("basic", 4) },
            tooltip: "Find out a way to get BM4.",
            unlocked() { return hasAchievement("a", 141) },
        },
        152: {
            name: "Then what?",
            done() { 
                if (inChallenge("m", 11)) {
                    if (hasMilestone("sac", 10)) {
                        return true
                    }
                }
            },
            tooltip: "Continue on.",
            unlocked() { return hasAchievement("a", 141) },
        },
        153: {
            name: "Then more energy",
            done() { 
                if (inChallenge("m", 11)) {
                    if (hasUpgrade("e", 24)) {
                        return true
                    }
                }
            },
            tooltip: "Continue on.",
            unlocked() { return hasAchievement("a", 141) },
        },
        154: {
            name: "5.378",
            done() { return player.points.gte(new Decimal("e5.378e9")) },
            tooltip: "Get e5.378B PF. Reward: xe53.78M PF",
            unlocked() { return hasAchievement("a", 141) },
        },
        155: {
            name: "Some Compound?",
            done() { return (hasUpgrade('m', 42)) },
            tooltip: "Mastery Upg 42",
            unlocked() { return hasAchievement("a", 141) },
        },
        156: {
            name: "8964",
            done() { return player.points.gte(new Decimal("e8964646464")) },
            tooltip: "Get e8964646464 PF. Reward: xe64.64M PF",
            unlocked() { return hasAchievement("a", 141) },
        },
        161: {
            name: "DS4",
            done() { return player.sac.points.gte(new Decimal("92")) },
            tooltip: "Unlock DS4. [Crazy Rarity]",
            unlocked() { return hasAchievement("a", 141) },
        },
        162: {
            name: "e700",
            done() { return player.s.points.gte(new Decimal("e700")) },
            tooltip: "Get e700 SP. Reward: xe70M PF [Crazy Rarity]",
            unlocked() { return hasAchievement("a", 141) },
        },
        163: {
            name: "Really OP",
            done() { return (hasUpgrade('mega', 85)) },
            tooltip: "Get MU85.",
            unlocked() { return hasAchievement("a", 141) },
        },
        164: {
            name: "Mystery amount of PF",
            done() { return player.points.gte(new Decimal("e19876094372")) },
            tooltip: "???? Reward: xe96.87M PF (HINT: >e19B, and reward may be a hint). Unlock the next 14 achievements.",
            unlocked() { return hasAchievement("a", 141) },
            style() {
                return {
                "border-color": "red",
                "border-width": "3px"
                }
            }
        },
        165: {
            name: "'New' thing",
            done() { return (hasUpgrade('s', 102)) },
            tooltip: "Unlock Supreme Buyable V. [Mastered Rarity]",
            unlocked() { return hasAchievement("a", 164) },
        },
        166: {
            name: "6.892",
            done() { return player.basic.points.gte(new Decimal("e6.892e9")) },
            tooltip: "Get e6.892B BP. Reward: xe168.92M PF",
            unlocked() { return hasAchievement("a", 164) },
        },
        171: {
            name: "Level 10 Water Planet",
            done() { return player.w.points.gte(new Decimal("e868")) },
            tooltip: "Get e868 Water. Reward: xe186.8M PF, ^1.02 Water",
            unlocked() { return hasAchievement("a", 164) },
        },
        172: {
            name: "e1.9k",
            done() { return player.s.points.gte(new Decimal("e1900")) },
            tooltip: "Get e1900 SP. Reward: xe300M PF[Mastered Rarity]",
            unlocked() { return hasAchievement("a", 164) },
        },
        173: {
            name: "Loads of BP",
            done() { return player.basic.points.gte(new Decimal("e18537500000")) },
            tooltip: "Get e18.5375B BP. Reward: xe300M PF",
            unlocked() { return hasAchievement("a", 164) },
        },
        174: {
            name: "Loads of Water",
            done() { return player.w.points.gte(new Decimal("e2049")) },
            tooltip: "Get e2,049 Water. Reward: xe400M PF",
            unlocked() { return hasAchievement("a", 164) },
        },
        175: {
            name: "True Supremacy",
            done() { return player.s.points.gte(new Decimal("e4214")) },
            tooltip: "Get e4,214 SP. Reward: xe421.4M PF",
            unlocked() { return hasAchievement("a", 164) },
        },
        176: {
            name: "Insane Supremacy",
            done() { return player.s.points.gte(new Decimal("e12000")) },
            tooltip: "Get e12K SP. Reward: xe1B PF [Mastered Rarity]",
            unlocked() { return hasAchievement("a", 164) },
        },
        181: {
            name: "PP Insanity",
            done() { return player.prestige.points.gte(new Decimal("e1869400000")) },
            tooltip: "Get e1,869,400,000 PP. Reward: +^0.035 PP.",
            unlocked() { return hasAchievement("a", 164) },
        },
        182: {
            name: "Supreme Supremacy",
            done() { return player.s.points.gte(new Decimal("e30700")) },
            tooltip: "Get e30.7K SP. Reward: xe1B PF, Perma-Unlock Max Sacrifices, UNLOCK MASTERY CHALLENGE 2!!! [Mastered Rarity]",
            unlocked() { return hasAchievement("a", 164) },
        },
        183: {
            name: "An ungodly amount",
            done() { return player.points.gte(new Decimal("e1855334e6")) },
            tooltip: "Get e1,855,334e6 PF. Reward: xe1.85B PF, x3.4 Mastery Points",
            unlocked() { return hasAchievement("a", 164) },
        },
        184: {
            name: "4t!",
            done() { return player.points.gte(new Decimal("e4e12")) },
            tooltip: "Get e4T PF. Wow. [Mastered Rarity]",
            unlocked() { return hasAchievement("a", 164) },
        },
        185: {
            name: "Mega Compoundation",
            done() { return player.mega.points.gte(new Decimal("e2696672e3")) },
            tooltip: "Get e2.696672B MP. Reward: xe2.696672B PF",
            unlocked() { return hasAchievement("a", 164) },
        },
        186: {
            name: "Basically Insane",
            done() { return player.basic.points.gte(new Decimal("e3098945e6")) },
            tooltip: "Get e3.098945T BP. Reward: xe7B PF and unlock A NEW TAB??",
            unlocked() { return hasAchievement("a", 164) },
            style() {
                return {
                "border-color": "red",
                "border-width": "6px"
                }
            }
        },
        191: {
            name: "A new beginning",
            done() { return (hasMilestone('era', 1)) },
            tooltip: "Get Era 1. [Dimensional Rarity]",
            unlocked() { return hasAchievement("a", 186) },
        },
        192: {
            name: "A tree upgrade?",
            done() { return (hasUpgrade('era', 11)) },
            tooltip: "Get ErUp 1.[Dimensional Rarity]",
            unlocked() { return hasAchievement("a", 186) },
        },
        193: {
            name: "It costs sacs too?",
            done() { return (hasUpgrade('era', 32)) },
            tooltip: "Get ErUp 4B. ",
            unlocked() { return hasAchievement("a", 186) },
        },
        194: {
            name: "Leading to extensions?",
            done() { return (hasUpgrade('era', 52)) },
            tooltip: "Get ErUp 6B.",
            unlocked() { return hasAchievement("a", 186) },
        },
        195: {
            name: "KSac",
            done() { return player.sac.points.gte(new Decimal("1000")) },
            tooltip: "Get 1,000 Sacrifices! Reward: Reduce sac scaling by a tiny bit [Dimensional Rarity]",
            unlocked() { return hasAchievement("a", 186) },
        },
        196: {
            name: "Multi-currency?",
            done() { return (hasUpgrade('era', 91)) },
            tooltip: "Get ErUp 11.",
            unlocked() { return hasAchievement("a", 186) },
        },
        201: {
            name: "What now...",
            done() { return (hasMilestone('era', 2)) },
            tooltip: "Get Era 2. [Multi-Dimensional Rarity]",
            unlocked() { return hasAchievement("a", 186) },
        },
        202: {
            name: "How is water boosting energy? Isn't it electrocution?",
            done() { return (hasUpgrade('era', 133)) },
            tooltip: "Get ErUp 18B.",
            unlocked() { return hasAchievement("a", 186) },
        },
        203: {
            name: "e614193390m pf",
            done() { return player.points.gte(new Decimal("e614193390e6")) },
            tooltip: "Get e614T+ PF. Reward: ^1.005 PF",
            unlocked() { return hasAchievement("a", 186) },
        },
        204: {
            name: "ERA 2: Stage 2 STARTS NOW!",
            done() { return hasUpgrade("era", 143) },
            tooltip: "Get your first ERA Buyable. [Multi-Dimensional Rarity]. Unlock new achievements.",
            unlocked() { return hasAchievement("a", 203) },
            style() {
                return {
                "border-color": "red",
                "border-width": "3px"
                }
            }
        },
        205: {
            name: "More milestones!",
            done() { return hasUpgrade("era", 161) },
            tooltip: "Get more milestones",
            unlocked() { return hasAchievement("a", 204) },
        },
        206: {
            name: "The grind continues.",
            done() { return hasUpgrade("era", 173) },
            tooltip: "Another one?",
            unlocked() { return hasAchievement("a", 204) },
        },
        211: {
            name: "e5.102650295e15 pf",
            done() { return player.points.gte(new Decimal("e5.102650295e15")) },
            tooltip: "Get e5 Qd+ PF. Reward: xe5T PF",
            unlocked() { return hasAchievement("a", 204) },
        },
        212: {
            name: "Buyable VI!",
            done() { return hasUpgrade("s", 55) },
            tooltip: "Is it really OP? [Multi-Dimensional Rarity]",
            unlocked() { return hasAchievement("a", 204) },
        },
        213: {
            name: "Astronomical Amount of PP",
            done() { return player.prestige.points.gte(new Decimal("e45826707200e3")) },
            tooltip: "Get e45826707200e3 PP. Reward: xe3T PP",
            unlocked() { return hasAchievement("a", 204) },
        },
        214: {
            name: "Era Buyable Boosts?",
            done() { return hasUpgrade("era", 212) },
            tooltip: "Get the upgrade where it boosts Era Buyables. [Multi-Dimensional Rarity]",
            unlocked() { return hasAchievement("a", 204) },
        },
        215: {
            name: "10,000 Sacrifices!!",
            done() { return player.sac.points.gte(new Decimal("10000")) },
            tooltip: "or e4 [Multi-Dimensional Rarity]",
            unlocked() { return hasAchievement("a", 204) },
        },
        216: {
            name: "Exponential!",
            done() { return hasUpgrade("era", 241) },
            tooltip: "era up. unlock more achievement",
            unlocked() { return hasAchievement("a", 204) },
            style() {
                return {
                "border-color": "red",
                "border-width": "3px"
                }
            }
        },
        221: {
            name: "Finally, a Mastery Extension",
            done() { return hasUpgrade("era", 245) },
            tooltip: "woohoo! [Transcending Rarity]",
            unlocked() { return hasAchievement("a", 216) },
        },
        222: {
            name: "Mastery is boosted by... ?!",
            done() { return hasUpgrade("m", 103) },
            tooltip: "it does make some sense.",
            unlocked() { return hasAchievement("a", 216) },
        },
        223: {
            name: "I expected stronger",
            done() { return hasUpgrade("era", 254) },
            tooltip: "but the Insanitycap killed it.",
            unlocked() { return hasAchievement("a", 216) },
        },
        224: {
            name: "HUGE SP Exponent",
            done() { return hasUpgrade("era", 273) },
            tooltip: "More SP!!",
            unlocked() { return hasAchievement("a", 216) },
        },
        225: {
            name: "Very Lucky EC",
            done() { return player.era.ec.gte(new Decimal("7.77e77")) },
            tooltip: "Get 7.77e77 EC. Reward: ^1.00777 PF AND xe777T PF [Transcending Rarity]",
            unlocked() { return hasAchievement("a", 216) },
        },
        226: {
            name: "Meta-Mega",
            done() { return player.mega.points.gte(new Decimal("e619538393033333")) },
            tooltip: "Get e619538393033333 MP. Reward: Extend Mega Upgrades",
            unlocked() { return hasAchievement("a", 216) },
        },
        231: {
            name: "More upgrades, more scrolling",
            done() { return (hasMilestone('era', 3)) },
            tooltip: "Get Era 3. [Transcending Rarity]. Unlock new achievement.",
            unlocked() { return hasAchievement("a", 216) },
            style() {
                return {
                "border-color": "red",
                "border-width": "3px"
                }
            },
        },
        232: {
            name: "More EC",
            done() { return (player.era.ec.gte(new Decimal("3e96")) && hasUpgrade("era", 54) && hasUpgrade("era", 55)) },
            tooltip: "Get 3e96 EC and Era Up 54 and 55. Reward: Unlock the 3rd EC Buyable [Transcending Rarity]",
            unlocked() { return hasAchievement("a", 231) },
        },
        233: {
            name: "Nice.",
            done() { return player.sac.points.gte(new Decimal("69000")) },
            tooltip: "Get 69K Sacs. Reward: Reduced Sacrifice Scaling + Pres Extension",
            unlocked() { return hasAchievement("a", 231) },
        },
        234: {
            name: "<1 PF Power",
            done() { return hasUpgrade("prestige", 85) },
            tooltip: "^0.99 PF",
            unlocked() { return hasAchievement("a", 231) },
        },
        235: {
            name: "That's a lot of mults",
            done() { return hasUpgrade("era", 12) },
            tooltip: "Get EU12 (what?)",
            unlocked() { return hasAchievement("a", 231) },
        },
        236: {
            name: "SOFTCAP IMMINENT [Over^2 Load of Energy]",
            done() { return player.e.points.gte(new Decimal("e5.230532755685e13")) },
            tooltip: "Get a lot of energy. Really a lot. Reward: Unlock the last few Tree 1 Era Upgrades. [Transcending Rarity]",
            unlocked() { return hasAchievement("a", 231) },
        },
        241: {
            name: "Get Tree 1 - Last row last upgrade [305]",
            done() { return hasUpgrade("era", 305) },
            tooltip: "Finish Tree 1. [Universal Rarity]",
            unlocked() { return hasAchievement("a", 231) },
        },
        242: {
            name: "Seemingly Random IV (starts with e8.72)",
            done() { return player.points.gte(new Decimal("e8.723216172271e19")) },
            tooltip: "Real random. Reward: xe8.72e12 Energy.",
            unlocked() { return hasAchievement("a", 231) },
            style() {
                return {
                "border-color": "red",
                "border-width": "3px"
                }
            },
        },
        243: {
            name: "Get e1.02334138177091e20 PF. Now you are ready for MC1x2. (2nd completion of MC1)",
            done() { return player.points.gte(new Decimal("e1.02334138177091e20")) },
            tooltip: "Real random. Reward: Era resets nothing on Mastery Reset/Entering mastery challenges, unlock a new Era Buyable but ^0.1 EC when in MC1, Unlock more upgrades in MC1, Gain SA32 if you haven't already, and you are now ready to go into the challenge. [Universal Rarity]",
            unlocked() { return hasAchievement("a", 242) },
        },
        244: {
            name: "Halfway there",
            done() { return hasUpgrade("m", 1123) },
            tooltip: "8/15",
            unlocked() { return hasAchievement("a", 242) },
        },
        245: {
            name: "Crazy Mastery Point",
            done() { return player.m.points.gte(new Decimal("1e61")) },
            tooltip: "Get 1e61 Mastery Points. Reward: x61 Mastery Points",
            unlocked() { return hasAchievement("a", 242) },
        },
        246: {
            name: "Funny Mastery Point",
            done() { return player.m.points.gte(new Decimal("1e69")) },
            tooltip: "Get 1e69 Mastery Points. Reward: Unlock Era Tree 2! x1e10 Era Points, SB5 HC +^0.01 [Universal Rarity]",
            unlocked() { return hasAchievement("a", 242) },
        },
        251: {
            name: "Era Buyable 4!",
            done() { return hasUpgrade("era", 341) },
            tooltip: "Base changes now [Universal Rarity]",
            unlocked() { return hasAchievement("a", 242) },
        },
        252: {
            name: "Sac Strength 3",
            done() { return player.sac.sacstr.gte(3) },
            tooltip: "Get the 3rd Sac Strength. [Universal Rarity]",
            unlocked() { return hasAchievement("a", 242) },
        },
        253: {
            name: "More and more EC",
            done() { return player.era.ec.gte(new Decimal("1e245")) },
            tooltip: "Get 1e245 Era Crystals. Reward: Another xe1e18 PF [Universal Rarity]",
            unlocked() { return hasAchievement("a", 242) },
        },
        254: {
            name: "44440",
            done() { return player.points.gte(new Decimal("e1.44440444404444e21")) },
            tooltip: "Get 1.4444044440... PF. Reward: xe2.444404444e18 PF",
            unlocked() { return hasAchievement("a", 242) },
        },
        255: {
            name: "A NEW LAYER!",
            done() { return player.sac.points.gte(new Decimal(695000)) },
            tooltip: "Unlock the next layer. [Multiversal Rarity]",
            unlocked() { return hasAchievement("a", 242) },
            style() {
                return {
                "border-color": "red",
                "border-width": "3px"
                }
            },
        },
        256: {
            name: "250,000x",
            done() { return player.c.points.gte(new Decimal(250000)) },
            tooltip: "Get 250,000 cells.",
            unlocked() { return hasAchievement("a", 255) },
        },
        261: {
            name: "6 Era Buyables",
            done() { return hasUpgrade("era", 463) },
            tooltip: "Unlock the 5th and 6th era buyable. [Multiversal Rarity]",
            unlocked() { return hasAchievement("a", 255) },
        },
        262: {
            name: "11,111,111,111",
            done() { return player.c.points.gte(new Decimal(1.11e11)) },
            tooltip: "Get 1.11e11 cells. Cell softcap starts at 11,111 cells, and unlock the Cell Milestones tab",
            unlocked() { return hasAchievement("a", 255) },
        },
        263: {
            name: "player.c.points.mag = 20",
            done() { return player.c.points.gte(new Decimal(1e20)) },
            tooltip: "Get 10^20 cells. x1.5 cell base mult, increase effect of Cell Buyable 2 and 3 [Multiversal Rarity]",
            unlocked() { return hasAchievement("a", 255) },
        },
        264: {
            name: "Era Phase 2",
            done() { return hasUpgrade("era", 501) },
            tooltip: "Unlock Era Phase 2, and Era Fragments [Omniversal Rarity]",
            unlocked() { return hasAchievement("a", 255) },
            style() {
                return {
                "border-color": "red",
                "border-width": "3px"
                }
            },
        },
        265: {
            name: "A new Era Milestone! Finally!",
            done() { return (hasMilestone('era', 101)) },
            tooltip: "Get EF Milestone 1. [Multiversal Rarity]",
            unlocked() { return hasAchievement("a", 186) },
        },
        266: {
            name: "-0.1 goes a long way.",
            done() { return (hasUpgrade('era', 1043)) },
            tooltip: "Decrease the nerf of EF!!",
            unlocked() { return hasAchievement("a", 186) },
        },
    tabFormat: [
        "blank", 
        ["display-text", function() { return "Achievements: "+player.a.achievements.length+"/"+(Object.keys(tmp.a.achievements).length-2) }], 
        "blank", "blank",
        "achievements",
    ],
    update(diff) {    
        // Added this section to call adjustNotificationTime every tick, to reduce notification timers
        adjustNotificationTime(diff);
    },
}, 
})