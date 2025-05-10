addLayer("sac", {
    name: "Sacrifice", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        sacstr: new Decimal(0),
        nextsstr: new Decimal(0),
        se1: new Decimal(0),
        se2: new Decimal(0),
        se3: new Decimal(0)
    }},
    layerShown(){
        let visible = false
        if (hasMilestone('mega', 12) || player.sac.unlocked || player["sac"].points.gte(1)) visible = true
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
                ["bar", "DS3"],
                "blank",
                ["bar", "DS4"],
                "blank",
                ["bar", "DS5"],
                "blank",
                ["bar", "DS6"],
                "blank",
            ],
        },
        "Challenges": {
            content: [
                "main-display",
                "blank",
                "blank",
                ["display-text", "Look inside Info layer to see recommended completion of Sacrifice Challenges!"],
                "blank",
                "challenges",
            ],
            unlocked() {return player.sac.points.gte(20) && (!(hasChallenge("m", 12))) && (!(inChallenge("m", 12)))}
        },
        "Sacrifice Strength": {
            content: [
                "main-display",
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `You have 
                        <h2><span style="color: red; text-shadow: 0px 0px 10px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.sac.sacstr)}</span></h2> Sacrifice Strength.`
                        return a
                    }
                ],
                "blank",
                "blank",
                ["display-text", "Every OOM of Sac Strength, there will be a softcap. Get past this softcap to get more Sac Strengths!"],
                "blank",
                ["display-text", "Sac Strength gives boosts."],
                ["display-text",
                    function(){
                        let a = "Next Boost: 2 Sac Strength"
                        if (player.sac.sacstr.gte(2)) {
                            a = "Next Boost: 5 Sac Strength"
                        }
                        if (player.sac.sacstr.gte(5)) {
                            a = "You have unlocked all current boosts!"
                        }
                        return a
                    }
                ],
                "blank",
                "blank",
                ["bar", "SacStr"],
                "blank",
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `Your Mega Points has an increase of ^ 
                        <h2> ${format(player.sac.se1)}</span></h2>.`
                        return a
                    }
                ],
                ["display-text", "Formula: log1.234(SS+0.5)/30, with cap at +^0.5"],
                "blank",
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        if (player.sac.sacstr.gte(2)) {
                            a = a + `Your Prestige Points has an increase of ^ 
                            <h2> ${format(player.sac.se2)}</span></h2>.`
                        }
                        return a
                    }
                ],
                ["display-text",
                    function(){
                        let a = ""
                        if (player.sac.sacstr.gte(2)) {
                            a = a + "Formula: log1.275(SS-1)/33, with cap at +^0.5"
                        }
                        return a
                    }
                ],
                "blank",
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        if (player.sac.sacstr.gte(5)) {
                            a = a + `Your Point Fragments are getting powered by 
                            <h2> ${minigameFormat(player.sac.se3)}</span></h2>.`
                        }
                        return a
                    }
                ],
                ["display-text",
                    function(){
                        let a = ""
                        if (player.sac.sacstr.gte(5)) {
                            a = a + "Formula: (log1.38(SS-3.4))/180, with cap at ^1.4"
                        }
                        return a
                    }
                ],
            ],
            unlocked() {return player.sac.points.gte(50000)}
        },
    },
    canBuyMax(){
        let buyMaxSac = false
        if (hasMilestone("sac", 35)) buyMaxSac = true
        if (inChallenge('m', 11)) buyMaxSac = true
        if (hasAchievement('a', 182)) buyMaxSac = true
       return buyMaxSac
     },
    milestones: {
        1: {
            requirementDescription: "The First Sacrifice",
            effectDescription: "x1e100 Point Fragments, x1e15 Rebirth Points, x10 Mega Points.",
            done() { return player["sac"].points.gte(1) }
        },
        2: {
            requirementDescription: "The Second Sacrifice",
            effectDescription: "x1e30 Basic Points, x10K Prestige Points. Keep PU33 and PU34 on reset.",
            unlocked() {return player["sac"].points.gte(1)},
            done() { return player["sac"].points.gte(2) }
        },
        3: {
            requirementDescription: "The Third Sacrifice",
            effectDescription: "x6 Mega Passive Generation, Mega Buyable is weaker and boost is way stronger. Also keep mega milestones.",
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
            effectDescription: "1 new row of basic upgrades. X10 Mega Passive Gen. x8e888 PF. Keep Mega Upgs Rows 1 and 2",
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
            effectDescription: "Mega Buyable 2 is 2x as strong, Mega Upgrade 14 is stronger, unlock 2 new rebirth upgrades",
            unlocked() {return player["sac"].points.gte(8)},
            done() { return player["sac"].points.gte(9) }
        },
        10: {
            requirementDescription: "Sacrifice 10",
            effectDescription: "Keep Mega Row 3 Upgs. ^1.006 PF. Unlock Energy. Energy is boosted by sacrifice. Clicking for energy gives 1 energy, but passively generating energy gives 20 times the energy. If in Mastery Challenge, ^1.05 PF.",
            unlocked() {return player["sac"].points.gte(9)},
            done() { return player["sac"].points.gte(10) }
        },
        11: {
            requirementDescription: "Sacrifice 11",
            effectDescription: "x5 Energy, ^1.005 PF, 2 new mega upgrades, x10 Mega Points. Keep Row 7 Basic Upgs.",
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
            effectDescription: "^1.005 PF, x1,000 Energy, x1e10K PF, extend rebirth upgrades. Keep Row 4 Mega Upgs and Keep RU41 and 42",
            unlocked() {return player["sac"].points.gte(13)},
            done() { return player["sac"].points.gte(14) }
        },
        15: {
            requirementDescription: "Sacrifice 15",
            effectDescription: "^1.005 PF, x10,000 Energy, x1e15K PF, UNLOCK DIMENSIONAL SHIFT. Keep PU41 and 42",
            unlocked() {return player["sac"].points.gte(14)},
            done() { return player["sac"].points.gte(15) }
        },
        16: {
            requirementDescription: "Sacrifice 16",
            effectDescription: "Rebirth softcap is weaker, x1e20K PF, Energy Upg 8 is stronger. Keep Row 5 mega upgs",
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
            effectDescription: "^1.0375 PF, -^0.05 BP, +^0.01 RP. Keep RU43 and 44",
            unlocked() {return player["sac"].points.gte(17)},
            done() { return player["sac"].points.gte(18) }
        },
        19: {
            requirementDescription: "Sacrifice 19",
            effectDescription: "^1.02 PF, x100 Energy, more mega upgrades, Keep Basic Upgrades S on Reset",
            unlocked() {return player["sac"].points.gte(18)},
            done() { return player["sac"].points.gte(19) }
        },
        20: {
            requirementDescription: "Sacrifice 20",
            effectDescription: "Unlock Challenge tab, More Mega Upgrades, x2,000 Energy. Keep Energy Milestones.",
            unlocked() {return player["sac"].points.gte(19)},
            done() { return player["sac"].points.gte(20) }
        },
        21: {
            requirementDescription: "Sacrifice 21",
            effectDescription: "-^0.1 BP, BUT xe10 Energy, Automate Mega Buyable 3. If in Mastery Challenge 2, negate the effect by adding 0.1 to the BP Power and ^1.01 PF.",
            unlocked() {return player["sac"].points.gte(20)},
            done() { return player["sac"].points.gte(21) }
        },
        22: {
            requirementDescription: "Sacrifice 22",
            effectDescription: "More Prestige Upgrades, Keep Row 4 energy upgrades. xe40K PF. Also Keep Row 6 mega upgs",
            unlocked() {return player["sac"].points.gte(21)},
            done() { return player["sac"].points.gte(22) }
        },
        23: {
            requirementDescription: "Sacrifice 23",
            effectDescription: "All buyables are MUCH MORE EXPENSIVE, but are MUCH stronger. [Automatically applies, post Era] Add 1 row of Rebirth Upgrades. Buyable Nerf does NOT apply to Mastery Challenge 2.",
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
            effectDescription: "x100M Energy. Mega Buyable 1 scaling is weaker. Unlock 1 new mega milestone. Keep PU43 and 44",
            unlocked() {return player["sac"].points.gte(25)},
            done() { return player["sac"].points.gte(26) }
        },
        27: {
            requirementDescription: "Sacrifice 27",
            effectDescription: "Unlock Dimensional Shift 2. ^1.006 PF, +^0.025 RP and PP, x2727 Energy. Keep BU81-84",
            unlocked() {return player["sac"].points.gte(26)},
            done() { return player["sac"].points.gte(27) }
        },
        28: {
            requirementDescription: "Sacrifice 28",
            effectDescription: "^1.008 PF, x2828282828 Energy. Keep Rebirth Row 5.",
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
            effectDescription: "^1.001 PF, x2 Energy, Keep Row 6 Energy Upgs, Keep BU85",
            unlocked() {return player["sac"].points.gte(30)},
            done() { return player["sac"].points.gte(31) }
        },
        32: {
            requirementDescription: "Sacrifice 32",
            effectDescription: "^1.01 PF, Unlocks a new RESET LAYER!! (V2.0.0), Keep Pres Row 5 Upgs on Reset",
            unlocked() {return player["sac"].points.gte(31)},
            done() { return player["sac"].points.gte(32) }
        },
        33: {
            requirementDescription: "Sacrifice 38 - Finally, a new milestone",
            effectDescription: "Unlock a row of Mega Upgrades, ^1.004 PF",
            unlocked() {return player["sac"].points.gte(35)},
            done() { return player["sac"].points.gte(38) }
        },
        34: {
            requirementDescription: "Sacrifice 41",
            effectDescription: "Dimensional Shift 3 unlock, x5 SP, Water, ^1.012 PF",
            unlocked() {return player["sac"].points.gte(38)},
            done() { return player["sac"].points.gte(41) }
        },
        35: {
            requirementDescription: "Sacrifice 45",
            effectDescription: "Able to buy max sacrifices.",
            unlocked() {return player["sac"].points.gte(42)},
            done() { return player["sac"].points.gte(45) }
        },
        36: {
            requirementDescription: "Sacrifice 47",
            effectDescription: "Keep DS3 on reset.",
            unlocked() {return player["sac"].points.gte(45)},
            done() { return player["sac"].points.gte(47) }
        },
        37: {
            requirementDescription: "Sacrifice 54",
            effectDescription: "Unlock a row of Rebirth Upgrades, +^0.02 RP-MP",
            unlocked() {return player["sac"].points.gte(50)},
            done() { return player["sac"].points.gte(54) }
        },
        38: {
            requirementDescription: "Sacrifice 59",
            effectDescription: "Unlock a row of Basic Upgrades, +^0.02 BP, Unlock 1 new RP Milestone",
            unlocked() {return player["sac"].points.gte(54)},
            done() { return player["sac"].points.gte(59) }
        },
        39: {
            requirementDescription: "Sacrifice 63",
            effectDescription: "Keep Row 9 Basic Upgrades, ^1.02 PF",
            unlocked() {return player["sac"].points.gte(59)},
            done() { return player["sac"].points.gte(63) }
        },
        40: {
            requirementDescription: "Sacrifice 64",
            effectDescription: "xe10M PF, Unlock many milestones.",
            unlocked() {return player["sac"].points.gte(62)},
            done() { return player["sac"].points.gte(64) }
        },
        41: {
            requirementDescription: "Sacrifice 69",
            effectDescription: "Nice. Do you know what's nice as well? Keeping Basic Milestones!",
            unlocked() {return player["sac"].points.gte(67)},
            done() { return player["sac"].points.gte(69) }
        },
        42: {
            requirementDescription: "Sacrifice 71",
            effectDescription: "New ??? Layer",
            unlocked() {return player["sac"].points.gte(70)},
            done() { return player["sac"].points.gte(71) }
        },
        43: {
            requirementDescription: "Sacrifice 75",
            effectDescription: "xe17.5M PF",
            unlocked() {return player["sac"].points.gte(71)},
            done() { return player["sac"].points.gte(75) }
        },
        44: {
            requirementDescription: "Sacrifice 79",
            effectDescription: "xe22.5M PF",
            unlocked() {return player["sac"].points.gte(75)},
            done() { return player["sac"].points.gte(79) }
        },
        45: {
            requirementDescription: "Sacrifice 81",
            effectDescription: "^1.0081 PF, More Water Upgs",
            unlocked() {return player["sac"].points.gte(78)},
            done() { return player["sac"].points.gte(81) }
        },
        46: {
            requirementDescription: "Sacrifice 86",
            effectDescription: "Autobuy Supreme Buyable 1",
            unlocked() {return player["sac"].points.gte(82)},
            done() { return player["sac"].points.gte(86) }
        },
        47: {
            requirementDescription: "Sacrifice 92",
            effectDescription: "Unlock the elusive DS4!, ^1.0092 PF",
            unlocked() {return player["sac"].points.gte(85)},
            done() { return player["sac"].points.gte(92) }
        },
        48: {
            requirementDescription: "Sacrifice 96",
            effectDescription: "Autobuy Supreme Buyable 2",
            unlocked() {return player["sac"].points.gte(92)},
            done() { return player["sac"].points.gte(96) }
        },
        49: {
            requirementDescription: "Sacrifice 100!!!",
            effectDescription: "xe100M PF",
            unlocked() {return player["sac"].points.gte(96)},
            done() { return player["sac"].points.gte(100) }
        },
        50: {
            requirementDescription: "Sacrifice 106",
            effectDescription: "xe106 SP",
            unlocked() {return player["sac"].points.gte(102)},
            done() { return player["sac"].points.gte(106) }
        },
        51: {
            requirementDescription: "Sacrifice 109",
            effectDescription: "Autobuy Supreme Buyable 3, extend Prestige Upgrades, ^1.0109 PF",
            unlocked() {return player["sac"].points.gte(105)},
            done() { return player["sac"].points.gte(109) }
        },
        52: {
            requirementDescription: "Sacrifice 113",
            effectDescription: "Keep DS4 upgs",
            unlocked() {return player["sac"].points.gte(111)},
            done() { return player["sac"].points.gte(113) }
        },
        53: {
            requirementDescription: "Sacrifice 115",
            effectDescription: "Supreme Buyable 4 cost formula is weaker and effect is stronger, unlock more supreme upgrades",
            unlocked() {return player["sac"].points.gte(111)},
            done() { return player["sac"].points.gte(115) }
        },
        54: {
            requirementDescription: "Sacrifice 118",
            effectDescription: "^1.0118 PF",
            unlocked() {return player["sac"].points.gte(113)},
            done() { return player["sac"].points.gte(118) }
        },
        55: {
            requirementDescription: "Sacrifice 124",
            effectDescription: "Keep Prestige Row 6 Upgrades on sac",
            unlocked() {return player["sac"].points.gte(120)},
            done() { return player["sac"].points.gte(124) }
        },
        56: {
            requirementDescription: "Sacrifice 126",
            effectDescription: "^1.0126 PF, extend Rebirth Upgrades",
            unlocked() {return player["sac"].points.gte(120)},
            done() { return player["sac"].points.gte(126) }
        },
        57: {
            requirementDescription: "Sacrifice 132",
            effectDescription: "^1.0132 PF, unlock BM6, WM2 and RM11",
            unlocked() {return player["sac"].points.gte(126)},
            done() { return player["sac"].points.gte(132) }
        },
        58: {
            requirementDescription: "Sacrifice 140",
            effectDescription:  function(){
				return "PF is raised by your sacrifices. Currently: ^"+(tmp.sac.sacms58eff)+". Formula: 1 + [Sacrifices / 10000] **After 750 sacs, softcaps, and has a hardcap of 2,500 sacs. Also, unlock more Water Upgrades.";
			},
            unlocked() {return player["sac"].points.gte(135)},
            done() { return player["sac"].points.gte(140) },
        },
        59: {
            requirementDescription: "Sacrifice 150",
            effectDescription: "^1.015 PF, xe500M PF, Unlock DS5",
            unlocked() {return player["sac"].points.gte(140)},
            done() { return player["sac"].points.gte(150) }
        },
        60: {
            requirementDescription: "Sacrifice 160",
            effectDescription: "^1.016 PF, Keep Mega Buyables on Sac",
            unlocked() {return player["sac"].points.gte(150)},
            done() { return player["sac"].points.gte(160) }
        },
        61: {
            requirementDescription: "Sacrifice 170",
            effectDescription: "^1.017 PF, extend Basic Upgrades, Unlock EM19",
            unlocked() {return player["sac"].points.gte(160)},
            done() { return player["sac"].points.gte(170) }
        },
        62: {
            requirementDescription: "Sacrifice 180",
            effectDescription: "^1.018 PF, Unlock RM12",
            unlocked() {return player["sac"].points.gte(170)},
            done() { return player["sac"].points.gte(180) }
        },
        63: {
            requirementDescription: "Sacrifice 200!!",
            effectDescription: "^1.02 PF, xe500M PF, x13.5 SP, Unlock Supreme Milestone 7",
            unlocked() {return player["sac"].points.gte(195)},
            done() { return player["sac"].points.gte(200) }
        },
        64: {
            requirementDescription: "Sacrifice 225",
            effectDescription: "^1.02 PF, Unlock EM20",
            unlocked() {return player["sac"].points.gte(210)},
            done() { return player["sac"].points.gte(225) }
        },
        65: {
            requirementDescription: "Sacrifice 240",
            effectDescription: "xe650M PF, Keep Basic Upgrades on Reset, Unlock EM21",
            unlocked() {return player["sac"].points.gte(225)},
            done() { return player["sac"].points.gte(240) }
        },
        66: {
            requirementDescription: "Sacrifice 250",
            effectDescription: "xe1B PF... [NEW STAGE UNLOCKED]",
            unlocked() {return player["sac"].points.gte(240)},
            done() { return player["sac"].points.gte(250) }
        },
        67: {
            requirementDescription: "Sacrifice 280",
            effectDescription: "xe1B PF...",
            unlocked() {return player["sac"].points.gte(260)},
            done() { return player["sac"].points.gte(280) }
        },
        68: {
            requirementDescription: "Sacrifice 335",
            effectDescription: "xe2.023B PF... and unlock a basic milestone",
            unlocked() {return player["sac"].points.gte(300)},
            done() { return player["sac"].points.gte(335) }
        },
        69: {
            requirementDescription: "Sacrifice 360 [1 full round]",
            effectDescription: "xe360M PP, Energy Row 10 Upgs are automated",
            unlocked() {return player["sac"].points.gte(345)},
            done() { return player["sac"].points.gte(360) }
        },
        70: {
            requirementDescription: "Sacrifice 450",
            effectDescription: "xe2.5B PF",
            unlocked() {return player["sac"].points.gte(400)},
            done() { return player["sac"].points.gte(450) }
        },
        71: {
            requirementDescription: "Sacrifice 515",
            effectDescription: "Sacrifices reset nothing, ^1.008 PF, unlock a MP Extension.",
            unlocked() {return player["sac"].points.gte(475)},
            done() { return player["sac"].points.gte(515) }
        },
        72: {
            requirementDescription: "Sacrifice 680",
            effectDescription: "Autobuy Mega Buyable 4, ^1.004 PF",
            unlocked() {return player["sac"].points.gte(600)},
            done() { return player["sac"].points.gte(680) }
        },
        73: {
            requirementDescription: "Sacrifice 761",
            effectDescription: "Unlock ?&!?!#$&!??",
            unlocked() {return player["sac"].points.gte(750)},
            done() { return player["sac"].points.gte(761) }
        },
        74: {
            requirementDescription: "Sacrifice 835",
            effectDescription: "xe40,000,000,000 Point Fragments",
            unlocked() {return player["sac"].points.gte(800)},
            done() { return player["sac"].points.gte(835) }
        },
        75: {
            requirementDescription: "Sacrifice 945",
            effectDescription: "xe234B PF",
            unlocked() {return player["sac"].points.gte(900)},
            done() { return player["sac"].points.gte(945) }
        },
        76: {
            requirementDescription: "Sacrifice 1068",
            effectDescription: "+^0.0068 to SB5 cap",
            unlocked() {return player["sac"].points.gte(1000)},
            done() { return player["sac"].points.gte(1068) }
        },
        77: {
            requirementDescription: "Sacrifice 1200",
            effectDescription: "+^0.01 to SB5 cap",
            unlocked() {return player["sac"].points.gte(1111)},
            done() { return player["sac"].points.gte(1200) }
        },
        78: {
            requirementDescription: "Sacrifice 1350",
            effectDescription: "Sac scaling is slightly weaker",
            unlocked() {return player["sac"].points.gte(1250)},
            done() { return player["sac"].points.gte(1350) }
        },
        79: {
            requirementDescription: "Sacrifice 1500: The Final Push",
            effectDescription: "^1.0065 PF",
            unlocked() {return player["sac"].points.gte(1400)},
            done() { return player["sac"].points.gte(1500) }
        },
        80: {
            requirementDescription: "Sacrifice 1594",
            effectDescription: "+^0.002 SB5 Cap, x4 Era Crystals",
            unlocked() {return player["sac"].points.gte(1580)},
            done() { return player["sac"].points.gte(1594) }
        },
        81: {
            requirementDescription: "Sacrifice 1,800",
            effectDescription: "xe1T PF",
            unlocked() {return player["sac"].points.gte(1700)},
            done() { return player["sac"].points.gte(1800) }
        },
        82: {
            requirementDescription: "Sacrifice 2,000",
            effectDescription: "Sac scaling is slightly weaker",
            unlocked() {return player["sac"].points.gte(1900)},
            done() { return player["sac"].points.gte(2000) }
        },
        83: {
            requirementDescription: "Sacrifice 2,250",
            effectDescription: "Sac scaling is slightly weaker",
            unlocked() {return player["sac"].points.gte(2125)},
            done() { return player["sac"].points.gte(2250) }
        },
        84: {
            requirementDescription: "Sacrifice 2,500",
            effectDescription: "+^0.002 SB5 HC, x25 Era Crystals",
            unlocked() {return player["sac"].points.gte(2400)},
            done() { return player["sac"].points.gte(2500) }
        },
        85: {
            requirementDescription: "Sacrifice 3,000",
            effectDescription: "+^0.007 SB5 HC, x30 Era Crystals",
            unlocked() {return player["sac"].points.gte(2997)},
            done() { return player["sac"].points.gte(3000) }
        },
        86: {
            requirementDescription: "Sacrifice 3,250",
            effectDescription:  function(){
				return "PF is raised by your sacrifices. Currently: ^"+(tmp.sac.sacms86eff)+". Formula: 1 + (log2.5(Best Sac / 2500) / 400)";
			},
            unlocked() {return player["sac"].points.gte(3200)},
            done() { return player["sac"].points.gte(3250) },
        },
        87: {
            requirementDescription: "Sacrifice 4,000",
            effectDescription: "UNLOCK DS6, ^1.014 PF!, xe4T PF",
            unlocked() {return player["sac"].points.gte(3600)},
            done() { return player["sac"].points.gte(4000) }
        },
        88: {
            requirementDescription: "Sacrifice 4,500",
            effectDescription: "xe20T PF",
            unlocked() {return player["sac"].points.gte(4444)},
            done() { return player["sac"].points.gte(4500) }
        },
        89: {
            requirementDescription: "Sacrifice 5,000",
            effectDescription: "Autobuy Era Buyable 1",
            unlocked() {return player["sac"].points.gte(4700)},
            done() { return player["sac"].points.gte(5000) }
        },
        90: {
            requirementDescription: "Sacrifice 6,000",
            effectDescription: "^1.006 PF",
            unlocked() {return player["sac"].points.gte(5200)},
            done() { return player["sac"].points.gte(6000) }
        },
        91: {
            requirementDescription: "Sacrifice 9,000",
            effectDescription: "xe90T PF",
            unlocked() {return player["sac"].points.gte(8000)},
            done() { return player["sac"].points.gte(9000) }
        },
        92: {
            requirementDescription: "Sacrifice 10K",
            effectDescription: "xe100T PF, ^1.01 PF, x100 EC, Autobuy Era Buyable 2",
            unlocked() {return player["sac"].points.gte(9000)},
            done() { return player["sac"].points.gte(10000) }
        },
        93: {
            requirementDescription: "Sacrifice 15K",
            effectDescription: "x15 EC, SB5 HC +^0.05, xe10 Mastery Points",
            unlocked() {return player["sac"].points.gte(12500)},
            done() { return player["sac"].points.gte(15000) }
        },
        94: {
            requirementDescription: "Sacrifice 18K",
            effectDescription: "x180 EC, xe1.8e15 PF",
            unlocked() {return player["sac"].points.gte(17500)},
            done() { return player["sac"].points.gte(18000) }
        },
        95: {
            requirementDescription: "Sacrifice 20K",
            effectDescription: "Less Sac scaling.",
            unlocked() {return player["sac"].points.gte(19250)},
            done() { return player["sac"].points.gte(20000) }
        },
        96: {
            requirementDescription: "Sacrifice 25K",
            effectDescription: "SB5 HC +^0.01",
            unlocked() {return player["sac"].points.gte(22500)},
            done() { return player["sac"].points.gte(25000) }
        },
        97: {
            requirementDescription: "Sacrifice 28K",
            effectDescription: "x280 EC, xe2e15 PF",
            unlocked() {return player["sac"].points.gte(26500)},
            done() { return player["sac"].points.gte(28000) }
        },
        98: {
            requirementDescription: "Sacrifice 35K",
            effectDescription: "SB5 HC +^0.01",
            unlocked() {return player["sac"].points.gte(30000)},
            done() { return player["sac"].points.gte(35000) }
        },
        99: {
            requirementDescription: "Sacrifice 45K",
            effectDescription: "Extend Water Upgrades, Mega Points +^0.04",
            unlocked() {return player["sac"].points.gte(40000)},
            done() { return player["sac"].points.gte(45000) }
        },
        100: {
            requirementDescription: "Sacrifice 50K [100th Milestone]",
            effectDescription: "Unlock a new Sacrifice Feature, and unlock a new Era Feature.",
            unlocked() {return player["sac"].points.gte(45000)},
            done() { return player["sac"].points.gte(50000) }
        },
        101: {
            requirementDescription: "Sacrifice 66,666",
            effectDescription: "Feeling Devilish, huh? xe1.66e16 PF.",
            unlocked() {return player["sac"].points.gte(60000)},
            done() { return player["sac"].points.gte(66666) }
        },
        102: {
            requirementDescription: "Sacrifice 80K",
            effectDescription: "^1.008 PF, xe8e15 PF",
            unlocked() {return player["sac"].points.gte(70000)},
            done() { return player["sac"].points.gte(80000) }
        },
        103: {
            requirementDescription: "Sacrifice 120,000",
            effectDescription: "x12 EC, Reduce Sac Scaling",
            unlocked() {return player["sac"].points.gte(100000)},
            done() { return player["sac"].points.gte(120000) }
        },
        104: {
            requirementDescription: "Sacrifice 175,000",
            effectDescription: "+^0.01 SB5 HC",
            unlocked() {return player["sac"].points.gte(140000)},
            done() { return player["sac"].points.gte(175000) }
        },
        105: {
            requirementDescription: "Sacrifice 250,000",
            effectDescription: "Autobuy Era Buyable 3.",
            unlocked() {return player["sac"].points.gte(200000)},
            done() { return player["sac"].points.gte(250000) }
        },
        106: {
            requirementDescription: "Sacrifice 333,333",
            effectDescription: "xe3.33e18 Basic Points",
            unlocked() {return player["sac"].points.gte(275000)},
            done() { return player["sac"].points.gte(333333) }
        },
        107: {
            requirementDescription: "Sacrifice 400,000",
            effectDescription: "x4 EC",
            unlocked() {return player["sac"].points.gte(377777)},
            done() { return player["sac"].points.gte(400000) }
        },
        108: {
            requirementDescription: "Sacrifice 500,000",
            effectDescription: "x10 EC",
            unlocked() {return player["sac"].points.gte(444444)},
            done() { return player["sac"].points.gte(500000) }
        },
        109: {
            requirementDescription: "Sacrifice 640,000",
            effectDescription: "+^0.0064 to SB5 HC",
            unlocked() {return player["sac"].points.gte(555555)},
            done() { return player["sac"].points.gte(640000) }
        },
        110: {
            requirementDescription: "Sacrifice 695,000",
            effectDescription: "Unlock a NEW LAYER!",
            unlocked() {return player["sac"].points.gte(660000)},
            done() { return player["sac"].points.gte(695000) }
        },
        111: {
            requirementDescription: "Sacrifice 750,000",
            effectDescription: "Automate Era Buyable 4, xe2.5e18 PF",
            unlocked() {return player["sac"].points.gte(720000)},
            done() { return player["sac"].points.gte(750000) }
        },
        112: {
            requirementDescription: "Sacrifice 850,000",
            effectDescription: "/1.5 Cell Replication Rate, x3 cells, x9 EC",
            unlocked() {return player["sac"].points.gte(800000)},
            done() { return player["sac"].points.gte(850000) }
        },
        113: {
            requirementDescription: "Sacrifice 1,000,000",
            effectDescription: "x10 delayed cell softcap start, xee19 PF, x100 EC",
            unlocked() {return player["sac"].points.gte(900000)},
            done() { return player["sac"].points.gte(1000000) }
        },
        114: {
            requirementDescription: "Sacrifice 1,250,000",
            effectDescription: "x12.5 EC, xe5e13 Water",
            unlocked() {return player["sac"].points.gte(900000)},
            done() { return player["sac"].points.gte(1000000) }
        },
    },
    sacms58eff() {
        var sm58e=player.sac.best;
        if (sm58e.lte(750)) {
            sm58e = sm58e.div(10000)
        } else {
            let nsm58e = sm58e.sub(750)
            if (nsm58e.gt(1750)) {
                sm58e = new Decimal(0.11)
            } else {
                nsm58e = nsm58e.div(50000)
                sm58e = nsm58e.add(0.075)
            }
        }
        sm58e = sm58e.add(1)
		return sm58e;
    },
    sacms86eff() {
        var amtsac=player.sac.best;
        amtsac = amtsac.div(2500)
        let eff = new Decimal(1)
        eff = amtsac.log(2.5)
        eff = eff.div(400)
        eff = eff.add(1)
        return eff;
    },

    // calculation: sac strength
    sstr() {
        if (player.sac.points.gte(50000)) {
            player.sac.sacstr = player.sac.points.div(50000).log(3).add(1).floor()
        }
        if (player.sac.sacstr.gte(10)) {
            player.sac.sacstr = player.sac.points.div(50000).log(5).add(1).floor()
            if (player.sac.sacstr.lte(10)) player.sac.sacstr = new Decimal(10)
        }
        if (player.sac.sacstr.gte(100)) {
            player.sac.sacstr = player.sac.points.div(50000).log(9).add(1).floor()
            if (player.sac.sacstr.lte(100)) player.sac.sacstr = new Decimal(100)
        }
        if (player.sac.sacstr.gte(1000)) {
            player.sac.sacstr = player.sac.points.div(50000).log(15).add(1).floor()
            if (player.sac.sacstr.lte(1000)) player.sac.sacstr = new Decimal(1000)
        }
        if (player.sac.sacstr.gte(10000)) {
            player.sac.sacstr = player.sac.points.div(50000).log(25).add(1).floor()
            if (player.sac.sacstr.lte(10000)) player.sac.sacstr = new Decimal(10000)
        }
        if (player.sac.sacstr.gte(100000)) {
            player.sac.sacstr = player.sac.points.div(50000).log(40).add(1).floor()
            if (player.sac.sacstr.lte(100000)) player.sac.sacstr = new Decimal(100000)
        }
        if (player.sac.sacstr.gte(1000000)) {
            player.sac.sacstr = player.sac.points.div(50000).log(70).add(1).floor()
            if (player.sac.sacstr.lte(1000000)) player.sac.sacstr = new Decimal(1000000)
        }

        // next sstr
        player.sac.nextsstr = new Decimal(3).pow(player.sac.sacstr).mul(50000)
        if (player.sac.sacstr.gte(10)) {
            player.sac.nextsstr = new Decimal(5).pow(player.sac.sacstr).mul(50000)
        }
        if (player.sac.sacstr.gte(100)) {
            player.sac.nextsstr = new Decimal(9).pow(player.sac.sacstr).mul(50000)
        }
        if (player.sac.sacstr.gte(1000)) {
            player.sac.nextsstr = new Decimal(15).pow(player.sac.sacstr).mul(50000)
        }
        if (player.sac.sacstr.gte(10000)) {
            player.sac.nextsstr = new Decimal(25).pow(player.sac.sacstr).mul(50000)
        }
        if (player.sac.sacstr.gte(100000)) {
            player.sac.nextsstr = new Decimal(40).pow(player.sac.sacstr).mul(50000)
        }
        if (player.sac.sacstr.gte(1000000)) {
            player.sac.nextsstr = new Decimal(70).pow(player.sac.sacstr).mul(50000)
        }

        if (player.sac.points.gte(50000)) { 
            player.sac.se1 = player.sac.sacstr.add(0.5).log(1.234).div(30).min(0.5)
        } else {
            player.sac.se1 = new Decimal(1)
        }

        if (player.sac.sacstr.gte(2)) { 
            player.sac.se2 = player.sac.sacstr.sub(0.75).log(1.275).div(33).min(0.5)
        } else {
            player.sac.se2 = new Decimal(0)
        }

        if (player.sac.sacstr.gte(5)) { 
            player.sac.se3 = player.sac.sacstr.sub(3.4).log(1.38).div(180).add(1).min(1.4)
        } else {
            player.sac.se3 = new Decimal(1)
        }
    },
    challenges: {
        11: {
            name: "Sac Challenge 1",
            challengeDescription: "^0.5 Point Fragments",
            canComplete: function() {return player.points.gte("e516500") && (!(hasChallenge("m", 12))) && (!(inChallenge("m", 12)))},
            goalDescription: "Get e516.5K PF.",
            rewardDescription: "x10B Energy and xe25K PF",
        },
        12: {
            name: "Sac Challenge 2",
            challengeDescription: "Basic Upgrades 8,10 gives no boost.",
            canComplete: function() {return player.points.gte("e1552500") && (!(hasChallenge("m", 12))) && (!(inChallenge("m", 12)))},
            goalDescription: "Get e1,552,500 PF.",
            rewardDescription: "xe75K PF",
            unlocked() { return hasChallenge("sac", 11) },
        },
        13: {
            name: "Sac Challenge 3",
            challengeDescription: "^0.1 PF.",
            canComplete: function() {return player.points.gte("e191200") && (!(hasChallenge("m", 12))) && (!(inChallenge("m", 12)))},
            goalDescription: "Get e191,200 PF.",
            rewardDescription: "xe400K PF",
            unlocked() { return hasChallenge("sac", 12) },
        },
        14: {
            name: "Sac Challenge 4",
            challengeDescription: "All layers ^0.5.",
            canComplete: function() {return player.points.gte("e3153153") && (!(hasChallenge("m", 12))) && (!(inChallenge("m", 12)))}, 
            goalDescription: "Get e3,153,153 PF.", 
            rewardDescription: "^1.015 PF, xe20 Energy",
            unlocked() { return hasChallenge("sac", 13) },
        },
    },
    bars: {
        DS1: {
            direction: RIGHT,
            width: 600,
            height: 60,
            fillStyle: { 'background-color': "#79029b" },
            borderStyle() { return { "border-color": "white" } },
            progress() {
                let prog = player.sac.points.div(15)
                if (player.sac.best.gte(15)) prog = 1
                return prog
            },
            display() {
                if (player.sac.best.lte(14))
                    return "Unlock dimensional shift 1: " + notationChooser(player.sac.points) + "/15 sacrifices."
                else
                    return "You have unlocked Dimensional Shift 1. Dimensional Shifts add another column to the upgrades (Column 5). Adds another row to Basic Upgrades."
            }
        },
        DS2: {
            direction: RIGHT,
            width: 600,
            height: 60,
            fillStyle: { 'background-color': "#79029b" },
            borderStyle() { return { "border-color": "white" } },
            progress() {
                let prog = player.sac.points.div(27)
                if (player.sac.best.gte(27)) prog = 1
                return prog
            },
            display() {
                if (player.sac.best.lte(26))
                    return "Unlock dimensional shift 2: " + notationChooser(player.sac.points) + "/27 sacrifices."
                else
                    return "You have unlocked Dimensional Shift 2. Dimensional Shifts add another column to the upgrades (Column 5). Adds another row to Rebirth Upgrades."
            },
            unlocked() { return player.sac.best.gte(15) }
        },
        DS3: {
            direction: RIGHT,
            width: 600,
            height: 70,
            fillStyle: { 'background-color': "#79029b" },
            borderStyle() { return { "border-color": "white" } },
            progress() {
                let prog = player.sac.points.div(41)
                if (player.sac.best.gte(41)) prog = 1
                return prog
            },
            display() {
                if (player.sac.best.lte(40))
                    return "Unlock dimensional shift 3: " + notationChooser(player.sac.points) + "/41 sacrifices."
                else
                    return "You have unlocked Dimensional Shift 3. Dimensional Shifts add another column to the upgrades (Column 5). Adds another row to Prestige Upgrades."
            },
            unlocked() { return player.sac.best.gte(27) }
        },
        DS4: {
            direction: RIGHT,
            width: 650,
            height: 80,
            fillStyle: { 'background-color': "#79029b" },
            borderStyle() { return { "border-color": "white" } },
            progress() {
                let prog = player.sac.points.div(92)
                if (player.sac.best.gte(92)) prog = 1
                return prog
            },
            display() {
                if (player.sac.best.lte(91))
                    return "Unlock dimensional shift 4: " + notationChooser(player.sac.points) + "/92 sacrifices. [Wait, how do I get so many?]"
                else
                    return "You have unlocked Dimensional Shift 4. Dimensional Shifts add another column to the upgrades (Column 5). Adds another row to MEGA Upgrades."
            },
            unlocked() { return player.sac.best.gte(41) }
        },
        DS5: {
            direction: RIGHT,
            width: 700,
            height: 80,
            fillStyle: { 'background-color': "#79029b" },
            borderStyle() { return { "border-color": "white" } },
            progress() {
                let prog = player.sac.points.div(150)
                if (player.sac.best.gte(150)) prog = 1
                return prog
            },
            display() {
                if (player.sac.best.lte(149))
                    return "Unlock dimensional shift 5: " + notationChooser(player.sac.points) + "/150 sacrifices."
                else
                    return "You have unlocked Dimensional Shift 5. Dimensional Shifts add another column to the upgrades (Column 5). Adds another row to ENERGY Upgrades. You may control the world's power supply after this."
            },
            unlocked() { return player.sac.best.gte(92) }
        },
        DS6: {
            direction: RIGHT,
            width: 750,
            height: 80,
            fillStyle: { 'background-color': "red" },
            borderStyle() { return { "border-color": "white" } },
            progress() {
                let prog = player.sac.points.div(4000)
                if (player.sac.best.gte(4000)) prog = 1
                return prog
            },
            display() {
                if (player.sac.best.lte(3999))
                    return "Unlock dimensional shift 6: " + notationChooser(player.sac.points) + "/4000 sacrifices. Wait... What?"
                else
                    return "You have unlocked Dimensional Shift 6. Dimensional Shifts add another column to the upgrades (Column 5). Adds another row to SUPREME Upgrades. That's err... 11 upgrades??"
            },
            unlocked() { return hasMilestone("era", 2) }
        },
        SacStr: {
            direction: RIGHT,
            width: 500,
            height: 60,
            fillStyle: { 'background-color': "#79029b" },
            borderStyle() { return { "border-color": "white" } },
            progress() {
                let prog = player.sac.points.div(player.sac.nextsstr)
                if (player.sac.points.gte(player.sac.nextsstr)) prog = 1
                return prog
            },
            display() {
                return "You have " + notationChooser(player.sac.sacstr) + " Sac Strength. (" + notationChooser(player.sac.points) + "/" + notationChooser(player.sac.nextsstr) + ")"
            },
            unlocked() { return hasMilestone("sac", 100) }
        },
    },   
    color: "#79029b",
    requires: new Decimal(1.11e111), // Can be a function that takes requirement increases into account
    resource: "Sacrifice", // Name of currency
    baseResource: "Mega Points", // Name of resource prestige is based on
    baseAmount() {return player.mega.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    resetsNothing: function() {
        if (hasMilestone('sac', 71)) return true
        if (hasMilestone("era", 1)) return true
        return false
    },
    exponent() {
        let exp = new Decimal(3.6)
        if (inChallenge('m', 12)) {
            exp = new Decimal(7)
            if (hasMilestone('mega', 21)) exp = 6.5
            if (hasMilestone('basic', 7)) exp = 6.1
            if (hasMilestone('prestige', 10)) exp = 5.75
            if (hasMilestone('s', 8)) exp = 5.5
            if (hasMilestone("w", 4)) exp = 5.25
            if (hasMilestone("mega", 22)) exp = 5.5
        }
        if ((hasChallenge('m', 12)) && (!(hasMilestone("era", 2)))) exp = new Decimal(3.5)
        if (hasUpgrade('mega', 92)) exp = new Decimal(3.6)
        if (hasAchievement("a", 195)) exp = exp.sub(0.01)
        if (hasUpgrade('prestige', 74)) exp = exp.sub(0.01)
        if (hasUpgrade("era", 113)) exp = exp.sub(0.008)
        if (hasMilestone("sac", 78)) exp = exp.sub(0.006)
        if (hasMilestone("era", 2)) exp = exp.sub(0.006)
        if (hasMilestone("sac", 82)) exp = exp.sub(0.006)
        if (hasMilestone("sac", 83)) exp = exp.sub(0.006)
        if (hasUpgrade("era", 142)) exp = exp.sub(0.005)
        if (hasUpgrade("w", 74)) exp = exp.sub(0.00031762827)
        if (hasUpgrade("era", 214)) exp = exp.sub(0.012)
        if (hasUpgrade("era", 245)) exp = exp.sub(0.01)
        if (hasUpgrade("era", 272)) exp = exp.sub(0.01)
        if (hasMilestone("sac", 95)) exp = exp.sub(0.0095)
        if (hasUpgrade("e", 153)) exp = exp.sub(0.01)
        if (hasMilestone("era", 3)) exp = exp.sub(0.025)
        if (hasUpgrade("mega", 104)) exp = exp.sub(0.01)
        if (hasUpgrade("era", 34)) exp = exp.sub(0.0122)
        if (hasUpgrade("prestige", 81)) exp = exp.sub(0.12)
        if (hasMilestone("sac", 103)) exp = exp.sub(0.0103)
        if (hasUpgrade("era", 351)) exp = exp.sub(0.0077)
        if (hasUpgrade("era", 401)) exp = exp.sub(0.0021)
        if (hasUpgrade("era", 412)) exp = exp.sub(0.005)
        if (hasUpgrade("c", 54)) exp = exp.sub(0.0072)
        if (hasUpgrade('s', 55)) exp = exp.sub(buyableEffect('s', 16))
        return exp
    },  // Balance is needed. Balanced to SAC 3. Have to balance to sac 4 // Prestige currency exponent
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    autoPrestige() {
        if (hasMilestone("era", 1)) return true
        else return false
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Sacrifice!", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["mega"],
})