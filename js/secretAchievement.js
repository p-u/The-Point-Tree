addLayer("sa", {
    startData() { return {
        unlocked: true,
        minigameNum: new Decimal(1),
        pdx: new Decimal(0),
        bp: new Decimal(0),
        minigamePoints: new Decimal(0),
        updateFreq: new Decimal(1),
        baseUpdateFreq: new Decimal(1),
        minigamePtsMult: new Decimal(1),
    }},
    color: "grey",
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Secret Achievements")
    },
    tabFormat: {
        "Achievements": {
            content: [
                "blank", 
                ["achievements", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
            ],
        },
        "Minigame": {
            content: [
                ["clickables", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
                "blank",
                "blank",
                ["achievements", [11, 12, 13, 14, 15, 16, 17, 18, 19]],
            ],
        },
        "Minigame Infoboxes": {
            content: [
                ["infobox", "main"],
                "blank",
                "blank",
                ["infobox", "r1"],
                "blank",
                "blank",
                ["infobox", "r2"],
                "blank",
                "blank",
                ["infobox", "r3"],
                "blank",
                "blank",
                ["infobox", "r4"],
                "blank",
                "blank",
                ["infobox", "r5"],
                "blank",
                "blank",
                ["infobox", "r6"],
                "blank",
                "blank",
                ["infobox", "r7"],
                "blank",
                "blank",
                ["infobox", "r8"],
            ],
        },
        "Minigame Points and Upgrades": {
            content: [
                ["clickables", [1]],
                "blank",
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + "Minigame Points can be gotten by pressing some buttons. The buttons and point values are:"
                        return a
                    }
                ],
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        if (hasUpgrade("sa", 15)) {
                            a = a + "Minigame Points Multipliers: x2.25 (MU5), "
                            if (hasUpgrade("sa", 24)) {
                                a = a + "x2 (MU9), "
                            }
                            if (hasUpgrade("sa", 25)) {
                                a = a + "x5 (MU10), "
                            }
                            if (hasUpgrade("sa", 34)) {
                                a = a + "x14 (MU14), "
                            }
                            if (hasUpgrade("sa", 35)) {
                                a = a + "x5 (MU15), "
                            }
                            if (hasMilestone("sa", 5)) {
                                a = a + "x10 (MM5), "
                            }
                            if (hasMilestone("sa", 6)) {
                                a = a + "x100 (MM6), "
                            }
                            if (hasMilestone("sa", 7)) {
                                a = a + "x1,000 (MM7). "
                            }
                        }
                        if (hasUpgrade("sa", 21)) {
                            a = a + "x5.0 when below 100,000, "
                            a = a + "x2.0 when below 1,000,000 (MU6), "
                        }
                        if (hasUpgrade("sa", 23)) {
                            a = a + "x3.0 when below 10,000,000, (MU8), "
                        }
                        if (hasUpgrade("sa", 22)) {
                            a = a + "x" + Math.max(player.points.slog(), 2) + " (MU7)"
                        }
                        return a
                    }
                ],
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + "+2 MiP for any divide button, "
                        a = a + "+1 MiP for any subtract or add button"
                        return a
                    }
                ],
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        if (hasUpgrade("sa", 15)) {
                            a = a + "+1.00 MiP for ^e10 button, "
                            a = a + "+3.00 MiP for ^e250 button, "
                            if (hasUpgrade("sa", 23)) {
                                a = a + "+5.00 MiP for ^e5K button, "
                                a = a + "+3.00 MiP for ^e20K button, "
                                a = a + "+1.00 MiP for ^e250K button, "
                            } else {
                                a = a + "+3.00 MiP for ^e5K button, "
                                a = a + "+1.00 MiP for ^e20K button, "
                                a = a + "-1.00 MiP for ^e250K button, "
                            }
                            if (hasUpgrade("sa", 25)) {
                                a = a + "+30 MiP for ^0.99 button, "
                            }
                            if (hasUpgrade("sa", 35)) {
                                a = a + "+100 MiP for ^0.5 button, "
                            }
                            if (hasUpgrade("sa", 42)) {
                                a = a + "+1,000 MiP for ^1.01 button. "
                            }
                        }
                        return a
                    }
                ],
                "blank",
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + "To unlock Minigame Upgrades, it requires 100,000 Minigame Points"
                        return a
                    }
                ],
                "blank",
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + "To unlock Minigame Milestones, it requires Era 1 and the last Minigame Upgrade. [Optional, huge timewalls!]"
                        return a
                    }
                ],
                "blank",
                "blank",
                "milestones",
                "blank",
                "blank",
                ["upgrades", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]],
            ],
            unlocked() {return hasAchievement("sa", 176)}
        },
    },
    achievements: {
        rows: 11,
        cols: 6,
        11: {
            name: "Aquarium-like",
            done() {
                if (options.theme == "aqua") {
                    return true
                }
            },
            tooltip() {
                if (hasAchievement('sa', 11)) {
                    return "Switch to aqua mode"
                }
                else {
                    return "Peace and quiet"
                }
            },
        },
        12: {
            name: "Ahh!! My eyes!",
            done() {
                 if (options.theme == "light") {
                    return true
                 }
            },
            tooltip() {
                if (hasAchievement('sa', 12)) {
                    return "Switch to light mode."
                }
                else {
                    return "really blinding"
                }
            },
        },
        13: {
            name: "The intended way to play",
            done() {
                 if(options.offlineProd == false) {
                    return true
                 }
                },
            tooltip() {
                if (hasAchievement('sa', 13)) {
                    return "Turn off offline progress"
                }
                else {
                    return "In Settings"
                }
            },
        },
        14: {
            name: "Not annoying anymore",
            done() {
                if(options.hideMilestonePopups == true) {
                   return true
                }
               },
           tooltip() {
               if (hasAchievement('sa', 14)) {
                   return "Hide popups"
               }
               else {
                   return "In Settings"
               }
           },
        },
        15: {
            name: "Infinite possibilities",
            done() {
                if(options.notation == 'infinity') {
                   return true
                }
               },
           tooltip() {
               if (hasAchievement('sa', 15)) {
                   return "Infinite Notation"
               }
               else {
                   return "Antimatter Dimensions"
               }
           },
        },
        16: {
            name: "Verdantly beautiful",
            done() {
                 if(options.theme == "verdant") {
                    return true
                 }
                },
            tooltip() {
                if (hasAchievement('sa', 16)) {
                    return "Switch to Verdant theme"
                }
                else {
                    return "Trees."
                }
            },
        },
        21: {
            name: "no rebirth basic",
            done() {
                 if(player.rebirth.best.lte(0)) {
                    if (player.points.gte(5e8)) {
                        return true
                    }
                 }
            },
            tooltip() {
                if (hasAchievement('sa', 21)) {
                    return "Req: 5e8 PF, without any best RP. (Reward: x1.1 RP)"
                }
                else {
                    return "no rebirth get point (Reward: x1.1 RP)"
                }
            },
        },
        22: {
            name: "no rebirth rebirth",
            done() {
                 if(player.rebirth.best.lte(0)) {
                    if (player.points.gte(4e9)) {
                        return true
                    }
                 }
                },
            tooltip() {
                if (hasAchievement('sa', 22)) {
                    return "Req: 4e9 PF, without any best RP. (Reward: x1.25 RP)"
                }
                else {
                    return "=XReb (Reward: x1.25 RP)"
                }
            },
        },
        23: {
            name: "e78,000 PF but... (find the catch)",
            done() {
                 if(player.sac.best.lte(1)) {
                    if (player.points.gte("e78000")) {
                        return true
                    }
                 }
                },
            tooltip() {
                if (hasAchievement('sa', 23)) {
                    return "Req: e78K PF, with less than 2 Sacrifice. (Reward: x1.2 MP)"
                }
                else {
                    return "e78000 point fragments. (Reward: x1.2 MP)"
                }
            },
        },
        24: {
            name: "It's just e250 higher. What's the big deal?",
            done() {
                if (!(hasChallenge('sac', 13))) {
                    if (inChallenge("sac", 13)) {
                        if (player.points.gte("e191450")) {
                            return true
                        }
                    }
                 }
                },
            tooltip() {
                if (hasAchievement('sa', 24)) {
                    return "Req: In Sac Challenge 3, without completing it before, get e191,450 PF. (Reward: x1.1 Energy)"
                }
                else {
                    return "soCmething3. (Reward: x1.1 Energy)"
                }
            },
        },
        25: {
            name: ".--- ..- ... - / ... - .- .-.. .-.. / ... ..- .--. .-. . -- .",
            done() {
                if(player.s.best.lte(0)) {
                   if (player.points.gte("e152980000")) {
                       return true
                   }
                }
            },
            tooltip() {
                if (hasAchievement('sa', 25)) {
                    return "Req: Get e152,980,000 PF, without any supreme (Reward: x1.04 SP)"
                }
                else {
                    return "Morse Code (Reward: x1.04 SP)"
                }
            },
        },
        26: {
            name: "Something to do with DS3, well, we gotta wait and see",
            done() {
                if(!(hasUpgrade('prestige', 55))) {
                   if (player.points.gte("e388100000")) {
                       return true
                   }
                }
            },
            tooltip() {
                if (hasAchievement('sa', 26)) {
                    return "Req: Before Getting Pres Upg 55, get e388.1M PF. (Reward: x1.05 SP)"
                }
                else {
                    return " (Reward: x1.05 SP)"
                }
            },
        },
        31: {
            name: "I'm scared of this imminent thing. Let's not.",
            done() {
                if(!(hasChallenge('m', 11))) {
                    if (player.m.points.gte(100000)) {
                        return true
                    }
                }
                if (hasMilestone("era", 1)) {
                    return true
                }
            },
            tooltip() {
                if (hasAchievement('sa', 31)) {
                    return "Get 100K Mastery Points without completing the Mastery Challenge [OR GET ERA 1] (Reward: x1.05 Mastery Points)"
                }
                else {
                    return "(Reward: x1.05 Mastery Points)"
                }
            },
        },
        32: {
            name: "Stall before Era Layer.",
            done() {
                 if(!(player.era.points.gte(1))) {
                    if (player.points.gte("e29245225e6")) {
                        return true
                    }
                 }
                 if (hasAchievement("a", 243)) {
                    return true
                 }
                },
            tooltip() {
                if (hasAchievement('sa', 32)) {
                    return "Get e29,245,225e6 PF before Era 1 (Reward: x1.04 Era Crystals)"
                }
                else {
                    return "It is also High Endgame in v2.5! (Reward: x1.04 Era Crystals)"
                }
            },
        },
        33: {
            name: "Endgame [Changes Every Update]",
            done() {
                   if (player.points.gte("e1.0830250e22")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 33)) {
                    return "Congrats! You have reached endgame at least once. (Reward: x1.2 Water and SP, x1.02 Era Crystals)"
                }
                else {
                    return "Reach Endgame. (Reward: x1.2 Water and SP, x1.02 Era Crystals)"
                }
            },
        },
        34: {
            name: "High Endgame [Changes Every Update]",
            done() {
                   if (player.points.gte("e1.08308e22")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 34)) {
                    return "Congrats! You have reached high endgame at least once. (Reward: x1.04 Era Crystals, x1.03 Mastery Points)"
                }
                else {
                    return "Reach High Endgame. (Reward: x1.04 Era Crystals, x1.03 Mastery Points)"
                }
            },
        },
        35: {
            name: "Absolute True Endgame [Changes Every Update]",
            done() {
                   if (player.points.gte("e1.10278e22")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 35)) {
                    return "Congrats! You have reached Absolute True endgame at least once. (Reward: x1.07 Era Crystals, x1.06 Mastery Points, x1.01 Cell Base Multiplier)"
                }
                else {
                    return "Reach Absolute True Endgame. (Reward: x1.07 Era Crystals, x1.06 Mastery Points, x1.01 Cell Base Multiplier)"
                }
            },
        },
        36: {
            name: "Insanity True Endgame [Changes Every Update]",
            done() {
                   if (player.points.gte("e1.1028038e22")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 36)) {
                    return "Congrats! You have reached Insanity True endgame at least once. This will be the best endgame tier! (Reward: x1.1 Era Crystals, x1.07 Mastery Points, x1.04 Cell Base Multiplier)"
                }
                else {
                    return "Reach Insanity True Endgame. (Reward: x1.1 Era Crystals, x1.07 Mastery Points, x1.04 Cell Base Multiplier)"
                }
            },
        },
        111: {
            name: "Reach the nice number",
            done() {
                   if ((player.sa.minigameNum.gte(68.9999)) && (player.sa.minigameNum.lte(69.0001))) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 111)) {
                    return "nice"
                }
                else {
                    return "Which numbers do you think is nice?"
                }
            },
        },
        112: {
            name: "Reach the leet number",
            done() {
                   if ((player.sa.minigameNum.gte(1336.999)) && (player.sa.minigameNum.lte(1337.001))) {
                        if (hasAchievement("sa", 111)) {
                            return true
                        }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 112)) {
                    return "very nsfw"
                }
                else {
                    return "hint: 4 digits"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 111)) return true
            }
        },
        113: {
            name: "Reach the very nice number",
            done() {
                   if ((player.sa.minigameNum.gte(69419.999)) && (player.sa.minigameNum.lte(69420.001))) {
                    if (hasAchievement("sa", 112)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 113)) {
                    return "very nice (Reward: Add a x69 button)"
                }
                else {
                    return "Which numbers do you think is very nice?"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 112)) return true
            }
        },
        114: {
            name: "Reach the Dragon Ball Z number",
            done() {
                   if ((player.sa.minigameNum.gte(9000.99)) && (player.sa.minigameNum.lte(9001.001))) {
                    if (hasAchievement("sa", 113)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 114)) {
                    return "funny?"
                }
                else {
                    return "It's over ___! (add 1 to it)"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 113)) return true
            }
        },
        115: {
            name: "Reach the Insanity Number (10^69)",
            done() {
                   if ((player.sa.minigameNum.gte(9.999e68)) && (player.sa.minigameNum.lte(1.0001e69))) {
                    if (hasAchievement("sa", 114)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 115)) {
                    return "funny?"
                }
                else {
                    return "now 10^"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 114)) return true
            }
        },
        116: {
            name: "Reach the ULTIMATE LEET Number",
            done() {
                   if ((player.sa.minigameNum.gte("9.99e1336")) && (player.sa.minigameNum.lte("1.01e1337"))) {
                    if (hasAchievement("sa", 115)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 116)) {
                    return "funny? [Reward: get a x911 button and a /3 button]"
                }
                else {
                    return "now 10^"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 115)) return true
            }
        },
        121: {
            name: "Exceeding 10^10",
            done() {
                   if (player.sa.minigameNum.gte(1e10)) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 121)) {
                    return "a bit big"
                }
                else {
                    return "more"
                }
            },
        },
        122: {
            name: "Exceeding 10^100",
            done() {
                   if (player.sa.minigameNum.gte(1e100)) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 122)) {
                    return "big"
                }
                else {
                    return "even more"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 121)) return true
            }
        },
        123: {
            name: "Exceeding 10^1,000",
            done() {
                   if (player.sa.minigameNum.gte("1e1000")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 123)) {
                    return "very big"
                }
                else {
                    return "way more"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 122)) return true
            }
        },
        124: {
            name: "Exceeding 10^4,000",
            done() {
                   if (player.sa.minigameNum.gte("1e4000")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 124)) {
                    return "hugely big"
                }
                else {
                    return "grind"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 123)) return true
            }
        },
        125: {
            name: "Exceeding 10^10,000",
            done() {
                   if (player.sa.minigameNum.gte("1e10000")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 125)) {
                    return "insanely big (Reward: x1e10 button)"
                }
                else {
                    return "very grindy"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 124)) return true
            }
        },
        126: {
            name: "Exceeding 10^50,000",
            done() {
                   if (player.sa.minigameNum.gte("1e50000")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 126)) {
                    return "insanely big (Reward: x3, /2 button)"
                }
                else {
                    return "grind ^2"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 125)) return true
            }
        },
        131: {
            name: "Reach 0.6328125",
            done() {
                   if ((player.sa.minigameNum.gte(0.632812)) && (player.sa.minigameNum.lte(0.632813))) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 131)) {
                    return "good job [1/5 HARD]"
                }
                else {
                    return "how do you get below 1?? Hint: Hard achievements require working backwards, and using different operations."
                }
            },
        },
        132: {
            name: "Reach 0.134765625",
            done() {
                   if ((player.sa.minigameNum.gte(0.13476562)) && (player.sa.minigameNum.lte(0.13476563))) {
                    if (hasAchievement("sa", 131)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 132)) {
                    return "good job [2/5 HARD]"
                }
                else {
                    return "how so specific?"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 131)) return true
            }
        },
        133: {
            name: "Reach 446.34375",
            done() {
                   if ((player.sa.minigameNum.gte(446.3437)) && (player.sa.minigameNum.lte(446.3438))) {
                    if (hasAchievement("sa", 132)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 133)) {
                    return "good job [3/5 HARD] (Reward: x10 button)"
                }
                else {
                    return "how?"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 132)) return true
            }
        },
        134: {
            name: "Reach 3.74897119 [some buffer] {When all previous achievements are done, Unlock The LAST HARD ACHIEVEMENT.}",
            done() {
                if ((player.sa.minigameNum.gte(3.74897)) && (player.sa.minigameNum.lte(3.748972))) {
                    if (hasAchievement("sa", 133)) {
                        return true
                    }
                }
               },
            tooltip() {
                if (hasAchievement('sa', 134)) {
                    return "good job [4/5 HARD]"
                }
                else {
                    return "how?"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 133)) return true
            }
        },
        135: {
            name: "Reach 1e-200 and lower.",
            done() {
                if (player.sa.minigameNum.lte(1e-200)) {
                    if(hasAchievement("sa", 134) && hasAchievement("sa", 126) && hasAchievement("sa", 116)) {
                        return true
                    }
                }
               },
            tooltip() {
                if (hasAchievement('sa', 135)) {
                    return "good job [ALL HARD COMPLETE], Unlock ^1.01 button, ^0.99 button"
                }
                else {
                    return "how?"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 134) && hasAchievement("sa", 126) && hasAchievement("sa", 116)) return true
            }
        },
        136: {
            name: "Reach 3.029679879579 [some buffer] (Extreme 01/07)",
            done() {
                if ((player.sa.minigameNum.gte(3.02967987)) && (player.sa.minigameNum.lte(3.02967988))) {
                    if (hasAchievement("sa", 146)) {
                        return true
                    }
                }
               },
            tooltip() {
                if (hasAchievement('sa', 136)) {
                    return "good job [Extreme 01]"
                }
                else {
                    return "Hint: 7 buttons [not including =1], usage of ^0.99 needed"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 146)) return true
            }
        },
        141: {
            name: "Even higher (e1M)",
            done() {
                   if (player.sa.minigameNum.gte("ee6")) {
                    if (hasAchievement("sa", 135)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 141)) {
                    return "megaly big"
                }
                else {
                    return "straightforward"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 135)) return true
            }
        },
        142: {
            name: "Even higher (e1B)",
            done() {
                   if (player.sa.minigameNum.gte("ee9")) {
                    if (hasAchievement("sa", 141)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 142)) {
                    return "supremely big"
                }
                else {
                    return "grind starts"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 141)) return true
            }
        },
        143: {
            name: "Even higher (e1 Sp)",
            done() {
                   if (player.sa.minigameNum.gte("ee24")) {
                    if (hasAchievement("sa", 142)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 143)) {
                    return "very insanely big (Reward: Unlock ^1.1 button)"
                }
                else {
                    return "long time, isn't it?"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 142)) return true
            }
        },
        144: {
            name: "Even higher (ee100)",
            done() {
                   if (player.sa.minigameNum.gte("ee100")) {
                    if (hasAchievement("sa", 143)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 144)) {
                    return "breaking bounds"
                }
                else {
                    return "passing EEs like nothing"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 143)) return true
            }
        },
        145: {
            name: "Much higher (ee400)",
            done() {
                   if (player.sa.minigameNum.gte("ee400")) {
                    if (hasAchievement("sa", 144)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 145)) {
                    return "breaking bounds"
                }
                else {
                    return "theres more???"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 144)) return true
            }
        },
        146: {
            name: "Insanely High (EE1,200)",
            done() {
                   if (player.sa.minigameNum.gte("ee1200")) {
                    if (hasAchievement("sa", 145)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 146)) {
                    return "now get all titles [Reward: ^2 button!! and /7 and x1.01 PF!!]"
                }
                else {
                    return "straightforward"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 145)) return true
            }
        },
        151: {
            name: "Reach 8.856444797045 [some buffer] (Extreme 02/07)",
            done() {
                if ((player.sa.minigameNum.gte(8.8564447970)) && (player.sa.minigameNum.lte(8.8564447971))) {
                    if (hasAchievement("sa", 136)) {
                        return true
                    }
                }
               },
            tooltip() {
                if (hasAchievement('sa', 151)) {
                    return "nicely done [Extreme 02]. Unlock /10 button"
                }
                else {
                    return "Hint: 1 button, then press and hold a button"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 136)) return true
            }
        },
        152: {
            name: "Reach pi (wait what, pi??) yes, to 15 digits [3.14159265358979] (Extreme 03/07)",
            done() {
                if ((player.sa.minigameNum.gte(3.14159265358979)) && (player.sa.minigameNum.lte(3.1415926535898))) {
                    if (hasAchievement("sa", 151)) {
                        return true
                    }
                }
               },
            tooltip() {
                if (hasAchievement('sa', 152)) {
                    return "nicely done [Extreme 03] Unlock pdx value show up"
                }
                else {
                    return "Hint: Only need 2 unique buttons!"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 151)) return true
            }
        },
        153: {
            name: "Get less than 1.0000000001, and more than 1.000000000001, without using more than 3 pdx.",
            done() {
                if ((player.sa.minigameNum.lte(1.0000000001)) && (player.sa.minigameNum.gte(1.000000000001)) && (player.sa.pdx.lte(3))) {
                    if (hasAchievement("sa", 152)) {
                        return true
                    }
                }
               },
            tooltip() {
                if (hasAchievement('sa', 153)) {
                    return "nicely done [Extreme 04]"
                }
                else {
                    return "Hint: 1 button, then press and hold a button"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 152)) return true
            }
        },
        154: {
            name: "Get less than 1e-1e20",
            done() {
                let MNL = player.sa.minigameNum.layer
                let MNM = player.sa.minigameNum.mag
                if ((MNL >= 2) && (MNM < -20)) {
                    if (hasAchievement("sa", 153)) {
                        return true
                    }
                }
               },
            tooltip() {
                if (hasAchievement('sa', 154)) {
                    return "nicely done [Extreme 05] Unlock ^10 button :)"
                }
                else {
                    return "might take a while"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 153)) return true
            }
        },
        155: {
            name: "Astronomical (ee40k)",
            done() {
                   if (player.sa.minigameNum.gte("ee40000")) {
                    if (hasAchievement("sa", 154)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 155)) {
                    return "insane [unlock: ^1e10 button]"
                }
                else {
                    return "thats crazy [Extreme 06]"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 154)) return true
            }
        },
        156: {
            name: "UTTER INSANITY (ee800K)",
            done() {
                   if (player.sa.minigameNum.gte("ee800e3")) {
                    if (hasAchievement("sa", 155)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 156)) {
                    return "stupidly insane [unlock: ^e250 button, -0.01 button, x2 PF!!!! wow thats a lot of boosts!!]"
                }
                else {
                    return "who would grind this? [Extreme 07]"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 155)) return true
            }
        },
        161: {
            name: "-Infinity (-1.797693e308, -2^1024)",
            done() {
                   if ((player.sa.minigameNum.gte("-1.797694e308")) && (player.sa.minigameNum.lte("-1.797693e308"))) {
                    if (hasAchievement("sa", 156)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 161)) {
                    return "Row 6: Into the negatives"
                }
                else {
                    return "Negative Error?"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 156)) return true
            }
        },
        162: {
            name: "Get -2284.73015 (Some buffer)",
            done() {
                   if ((player.sa.minigameNum.gte("-2284.73016")) && (player.sa.minigameNum.lte("-2284.73015"))) {
                    if (hasAchievement("sa", 161)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 162)) {
                    return "Wow! You master the +1 at random spots feature. Reward: Gain a *-1 button, and a x5 button."
                }
                else {
                    return "Hint: After getting -1, use 9 buttons. "
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 161)) return true
            }
        },
        163: {
            name: "-3^1000 x 5^1000 [-1.23384e1176] [Exactly 1000 presses of x3 and x5 are required]",
            done() {
                   if ((player.sa.minigameNum.gte("-1.233841e1176")) && (player.sa.minigameNum.lte("-1.2338399e1176"))) {
                    if (hasAchievement("sa", 162)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 163)) {
                    return "That's very precise."
                }
                else {
                    return "Torturous. Hint: Get 3^1000 first, which is exactly 1.322e477, then spam x5"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 162)) return true
            }
        },
        164: {
            name: "We love the x5 very much. (Get -6.003e3882)",
            done() {
                   if ((player.sa.minigameNum.gte("-6.004e3882")) && (player.sa.minigameNum.lte("-6.003e3882"))) {
                    if (hasAchievement("sa", 163)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 164)) {
                    return "AAAAAAA (Unlock the x7 button)"
                }
                else {
                    return "Press the x5 button 5,555 times, and then *-1."
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 162)) return true
            }
        },
        165: {
            name: "Now PUSH. [Get -1ee15M]",
            done() {
                   if ((player.sa.minigameNum.lte("-ee1.5e7"))) {
                    if (hasAchievement("sa", 164)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 165)) {
                    return "Unlock the ^1e5,000 button!"
                }
                else {
                    return "Insane, but flipped, so its super bad"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 164)) return true
            }
        },
        166: {
            name: "NYOOM [Get ee700e6]",
            done() {
                   if ((player.sa.minigameNum.gte("ee700e6"))) {
                    if (hasAchievement("sa", 165)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 166)) {
                    return "Great job for spending ~5 hours on this minigame. Add a new sub-currency and x2 MP."
                }
                else {
                    return "HOW the fk.."
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 165)) return true
            }
        },
        171: {
            name: "Less Button Press 1 (LBP1): Get 8436.57 in less than 5 button presses",
            done() {
                   if ((player.sa.minigameNum.gt(8436.57)) && (player.sa.minigameNum.lt(8436.58)) && (player.sa.bp.lt(5))) {
                    if (hasAchievement("sa", 166)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 171)) {
                    return "Oh, so now you are doing this."
                }
                else {
                    return "Semi-easy Difficulty"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 166)) return true
            }
        },
        172: {
            name: "LBP2: Get 277585344 in less than 7 button presses",
            done() {
                   if ((player.sa.minigameNum.gt(277585343.999)) && (player.sa.minigameNum.lt(277585344.001)) && (player.sa.bp.lt(7))) {
                    if (hasAchievement("sa", 171)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 172)) {
                    return "Reward: Add 2 buttons"
                }
                else {
                    return "Medium Difficulty"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 171)) return true
            }
        },
        173: {
            name: "LBP3: Get 5075.57 (+-0.002) in less than 7 button presses",
            done() {
                   if ((player.sa.minigameNum.gt(5075.57)) && (player.sa.minigameNum.lt(5075.572)) && (player.sa.bp.lt(7))) {
                    if (hasAchievement("sa", 172)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 173)) {
                    return "Now more complex!"
                }
                else {
                    return "Looks simple at first"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 172)) return true
            }
        },
        174: {
            name: "LBP4: Get 1718664748210526 (+-1) in less than 8 button presses",
            done() {
                   if ((player.sa.minigameNum.gt(1718664748210526)) && (player.sa.minigameNum.lt(1718664748210527)) && (player.sa.bp.lt(8))) {
                    if (hasAchievement("sa", 173)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 174)) {
                    return "Add 2 more buttons :)"
                }
                else {
                    return "Semi-Hard Difficulty"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 173)) return true
            }
        },
        175: {
            name: "LBP5: Get 1.621683e16 in less than 9 button presses",
            done() {
                   if ((player.sa.minigameNum.gt(1.621683e16)) && (player.sa.minigameNum.lt(1.621684e16)) && (player.sa.bp.lt(9))) {
                    if (hasAchievement("sa", 174)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 175)) {
                    return "Now you are prepared for the final challenge."
                }
                else {
                    return "Hard Difficulty"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 174)) return true
            }
        },
        176: {
            name: "LBP6: Get 2.423357e58 in less than 10 button presses",
            done() {
                   if ((player.sa.minigameNum.gt(2.423356e58)) && (player.sa.minigameNum.lt(2.423358e58)) && (player.sa.bp.lt(10))) {
                    if (hasAchievement("sa", 175)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 176)) {
                    return "CONGRATS! You finished Minigame Part 5! Unlock Minigame Points (replaces pdx) and the next row of achievements... Also a ^e20K button and x2 SP"
                }
                else {
                    return "Very Hard Difficulty"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 175)) return true
            }
        },
        181: {
            name: "Unlock the Minigame Upgrades section.",
            done() {
                   if ((player.sa.minigamePoints.gte(100000))) {
                    if (hasAchievement("sa", 176)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 181)) {
                    return "Now, its time. Go on child, get the highest number!"
                }
                else {
                    return "HOW the fk.."
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 176)) return true
            }
        },
        182: {
            name: "Get 10^^4.",
            done() {
                   if ((player.sa.minigameNum.gte("eee10"))) {
                    if (hasAchievement("sa", 181)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 182)) {
                    return "Continue."
                }
                else {
                    return "HOW the fk.."
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 176)) return true
            }
        },
        183: {
            name: "Get 500,000 Minigame Points.",
            done() {
                   if ((player.sa.minigamePoints.gte(500000))) {
                    if (hasAchievement("sa", 182)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 183)) {
                    return "Go on, there is 20 upgrades."
                }
                else {
                    return "Yes."
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 182)) return true
            }
        },
        184: {
            name: "Get ee5e12.",
            done() {
                   if ((player.sa.minigameNum.gte("ee5e12"))) {
                    if (hasAchievement("sa", 183)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 184)) {
                    return "Continue."
                }
                else {
                    return "Yup, don't get bored."
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 183)) return true
            }
        },
        185: {
            name: "Get 25,000,000 Minigame Points.",
            done() {
                   if ((player.sa.minigamePoints.gte(25e6))) {
                    if (hasAchievement("sa", 184)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 185)) {
                    return "Go on, there is 20 upgrades."
                }
                else {
                    return "Yes."
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 184)) return true
            }
        },
        186: {
            name: "Get eee16.",
            done() {
                   if ((player.sa.minigameNum.gte("eee16"))) {
                    if (hasAchievement("sa", 185)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 186)) {
                    return "Push on! Don't give up! (Reward: x1.02 Mastery Points, x2 Water)"
                }
                else {
                    return "Yup, don't get bored."
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 185)) return true
            }
        },
        191: {
            name: "Get 500,000,000 Minigame Points.",
            done() {
                   if ((player.sa.minigamePoints.gte(500e6))) {
                    if (hasAchievement("sa", 186)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 191)) {
                    return "Let's go!!"
                }
                else {
                    return "Yes. Yes. Yes."
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 186)) return true
            }
        },
        192: {
            name: "Get eee70.",
            done() {
                   if ((player.sa.minigameNum.gte("eee70"))) {
                    if (hasAchievement("sa", 191)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 192)) {
                    return "Push on! Don't give up!"
                }
                else {
                    return "Continue, something's waiting."
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 191)) return true
            }
        },
        193: {
            name: "Get 5B Minigame Points.",
            done() {
                   if ((player.sa.minigamePoints.gte(5e9))) {
                    if (hasAchievement("sa", 192)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 193)) {
                    return "Way to go!"
                }
                else {
                    return "Yes. (repeats it 100 times)"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 192)) return true
            }
        },
        194: {
            name: "Get eee1,000.",
            done() {
                   if ((player.sa.minigameNum.gte("eee1000"))) {
                    if (hasAchievement("sa", 193)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 194)) {
                    return "You're on the express route"
                }
                else {
                    return "To grind or not to grind, that is the question."
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 193)) return true
            }
        },
        195: {
            name: "Get eeee1,000.",
            done() {
                   if ((player.sa.minigameNum.gte("eeee1000"))) {
                    if (hasAchievement("sa", 194)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 195)) {
                    return "Get the 'Infinite Void' title!"
                }
                else {
                    return "Wat, a whole e from the previous achievement?"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 194)) return true
            }
        },
        196: {
            name: "Get e(20)10.",
            done() {
                   if ((player.sa.minigameNum.gte("eeeeeeeeeeeeeeeeeeee10"))) {
                    if (hasAchievement("sa", 195)) {
                        return true
                    }
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 196)) {
                    return "Get the 'Infinite Void' title! (Reward: x1.05 EC, x100 BP-MP, x10 Energy)"
                }
                else {
                    return "Thats the last achievement!"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 195)) return true
            }
        },
    },
    clickables: {
        11: {
            title(){
                title = notationChooserMinigame(player[this.layer].minigameNum)
                return title
            },
            display() { dis = ""
                if (player.sa.minigameNum.eq(0)) dis = "how"
                if (player.sa.minigameNum.eq(1)) dis = "The Start"
                if (player.sa.minigameNum.eq(2)) dis = "Doing a double (or +1)"
                if (player.sa.minigameNum.eq(10)) dis = "10^Start"
                if (player.sa.minigameNum.eq(10000000000)) dis = "10^10^Start"
                if ((player.sa.minigameNum.gte(0.30102)) && (player.sa.minigameNum.lte(0.30103))) dis = "log(2)"
                if ((player.sa.minigameNum.gte(1.41421)) && (player.sa.minigameNum.lte(1.41422))) dis = "sqrt(2)"
                if ((player.sa.minigameNum.gte(1.61803)) && (player.sa.minigameNum.lte(1.61804))) dis = "The Golden Ratio"
                if ((player.sa.minigameNum.gte(2.71828)) && (player.sa.minigameNum.lte(2.71829))) dis = "e"
                if ((player.sa.minigameNum.gte(3.14159)) && (player.sa.minigameNum.lte(3.1416))) dis = "pi"
                if ((player.sa.minigameNum.gte(6.28318)) && (player.sa.minigameNum.lte(6.28319))) dis = "tau"
                if (player.sa.minigameNum.eq(69)) dis = "nice"
                if (player.sa.minigameNum.eq(100)) dis = "100 years makes a century"
                if (player.sa.minigameNum.eq(365)) dis = "Days in a standard year"
                if (player.sa.minigameNum.eq(404)) dis = "404 ERROR"
                if (player.sa.minigameNum.eq(420)) dis = "not funny"
                if (player.sa.minigameNum.eq(666)) dis = "devil"
                if (player.sa.minigameNum.eq(777)) dis = "lucky"
                if (player.sa.minigameNum.eq(911)) dis = "what's your emergency?"
                if (player.sa.minigameNum.eq(1000)) dis = "The first suffix (K)"
                if (player.sa.minigameNum.eq(1337)) dis = "leet"
                if (player.sa.minigameNum.eq(69420)) dis = "very nice"
                if (player.sa.minigameNum.eq(86400)) dis = "Seconds in a day"
                if (player.sa.minigameNum.eq(31536000)) dis = "Seconds in a year"
                if (player.sa.minigameNum.eq(123456789)) dis = "Every number, 0 to 9"
                if (player.sa.minigameNum.eq(9223372036854775807)) dis = "if you know, you know."
                if (player.sa.minigameNum.eq(new Decimal(10).pow(69))) dis = "10^Nice"
                if (player.sa.minigameNum.eq(new Decimal(2).pow(1024))) dis = "Infinite"
                if (player.sa.minigameNum.eq(new Decimal(2).pow(2).pow(1024))) dis = "Eternal"
                if (player.sa.minigameNum.eq(new Decimal(2).pow(2).pow(2).pow(1024))) dis = "Transcend"
                if (player.sa.minigameNum.eq(new Decimal(2).pow(2).pow(2).pow(2).pow(1024))) dis = "Quantum"
                if (player.sa.minigameNum.gte("1e25")) dis = "Pushing through"
                if (player.sa.minigameNum.gte("1e100")) dis = "Breaking bounds"
                if (player.sa.minigameNum.gte("1e1000")) dis = "Increasing faster"
                if (player.sa.minigameNum.gte("1e10000")) dis = "Order of Exponentiating Magnitude"
                if (player.sa.minigameNum.gte("1e100000")) dis = "Speeding Up"
                if (player.sa.minigameNum.gte("ee6")) dis = "Great."
                if (player.sa.minigameNum.gte("ee8")) dis = "Impressive."
                if (player.sa.minigameNum.gte("ee10")) dis = "Hyperion"
                if (player.sa.minigameNum.gte("ee15")) dis = "Insanity"
                if (player.sa.minigameNum.gte("ee25")) dis = "Super Insanity"
                if (player.sa.minigameNum.gte("ee50")) dis = "Mega Insanity"
                if (player.sa.minigameNum.gte("ee75")) dis = "Giga Insanity"
                if (player.sa.minigameNum.gte("e5.011135425235e19")) dis = "Past the Endgame"
                if (player.sa.minigameNum.gte("ee100")) dis = "Transcending"
                if (player.sa.minigameNum.gte("ee200")) dis = "Transcending Mk.2"
                if (player.sa.minigameNum.gte("ee500")) dis = "Omega"
                if (player.sa.minigameNum.gte("ee1000")) dis = "Epsilon"
                if (player.sa.minigameNum.gte("ee2000")) dis = "Infinite"
                if (player.sa.minigameNum.gte("ee5000")) dis = "Infinite+"
                if (player.sa.minigameNum.gte("ee10000")) dis = "Inter-finite"
                if (player.sa.minigameNum.gte("ee25000")) dis = "Crazed Eternal"
                if (player.sa.minigameNum.gte("ee150000")) dis = "Infinite Eternal"
                if (player.sa.minigameNum.gte("eee6")) dis = "Utter Infinite Eternal"
                if (player.sa.minigameNum.gte("eee7")) dis = "oNlY 1% oF pEoPlE cAn gEt ThIs!"
                if (player.sa.minigameNum.gte("eee8")) dis = "True No-Life"
                if (player.sa.minigameNum.gte("eee10")) dis = "Absolute True No-Life"
                if (player.sa.minigameNum.gte("eee11")) dis = "Eternal No-Life"
                if (player.sa.minigameNum.gte("eee12")) dis = "True Eternal No-Life"
                if (player.sa.minigameNum.gte("eee13")) dis = "Greater-Infinity"
                if (player.sa.minigameNum.gte("eee14")) dis = "Meta-Infinity"
                if (player.sa.minigameNum.gte("eee15")) dis = "Transcending Infinity"
                if (player.sa.minigameNum.gte("eee17")) dis = "Eternity"
                if (player.sa.minigameNum.gte("eee20")) dis = "Supra-Eternity"
                if (player.sa.minigameNum.gte("eee24")) dis = "Greater-Eternity"
                if (player.sa.minigameNum.gte("eee30")) dis = "Meta-Eternity"
                if (player.sa.minigameNum.gte("eee40")) dis = "Transcending Eternity"
                if (player.sa.minigameNum.gte("eee50")) dis = "Reality"
                if (player.sa.minigameNum.gte("eee60")) dis = "Supra-Reality"
                if (player.sa.minigameNum.gte("eee70")) dis = "Greater-Reality"
                if (player.sa.minigameNum.gte("eee85")) dis = "Meta-Reality"
                if (player.sa.minigameNum.gte("eee100")) dis = "Transcending Reality"
                if (player.sa.minigameNum.gte("eee150")) dis = "Infinite Reality"
                if (player.sa.minigameNum.gte("eee200")) dis = "Eternal Reality"
                if (player.sa.minigameNum.gte("eee250")) dis = "Infinite Eternal Reality"
                if (player.sa.minigameNum.gte("eee500")) dis = "Infinite Eternal Transcending Reality"
                if (player.sa.minigameNum.gte("eee1000")) dis = "Dimensional"
                if (player.sa.minigameNum.gte("eee1500")) dis = "Greater-Dimensional"
                if (player.sa.minigameNum.gte("eee5000")) dis = "Multi-Dimensional"
                if (player.sa.minigameNum.gte("eeee4")) dis = "Mega-Dimensional"
                if (player.sa.minigameNum.gte("eeee5")) dis = "Ultra-Dimensional"
                if (player.sa.minigameNum.gte("eeee6")) dis = "Meta-Dimensional"
                if (player.sa.minigameNum.gte("eeee9")) dis = "Transcending-Dimensional"
                if (player.sa.minigameNum.gte("eeee15")) dis = "Infinite Dimensional"
                if (player.sa.minigameNum.gte("eeee40")) dis = "Eternal Dimensional"
                if (player.sa.minigameNum.gte("eeee100")) dis = "Reality Dimensional"
                if (player.sa.minigameNum.gte("eeee500")) dis = "I.E.R. Dimensional"
                if (player.sa.minigameNum.gte("eeeee6")) dis = "T.I.E.R. Dimensional"
                if (player.sa.minigameNum.gte("eeeee9")) dis = "M.T.I.E.R. Dimensional"
                if (player.sa.minigameNum.gte("eeeee15")) dis = "S.M.T.I.E.R. Dimensional"
                if (player.sa.minigameNum.gte("eeeeee3")) dis = "U.S.M.T.I.E.R. Dimensional"
                if (player.sa.minigameNum.gte("eeeeee10")) dis = "A.T.U.S.M.T.I.E.R Dimensional"
                if (player.sa.minigameNum.gte("eeeeee100")) dis = "C.A.T.U.I.S.M.T.I.E.R. Dimensional"
                if (player.sa.minigameNum.gte("eeeeeee10")) dis = "C.A.T.H.U.I.S.M.T.I.E.R. Dimensional"
                if (player.sa.minigameNum.layer > 10) dis = "Void"
                if (player.sa.minigameNum.layer > 50) dis = "Vast Void"
                if (player.sa.minigameNum.layer > 250) dis = "Boundless Void"
                if (player.sa.minigameNum.layer > 1000) dis = "Endless Void"
                if (player.sa.minigameNum.layer > 3000) dis = "Unlimited Void"
                if (player.sa.minigameNum.layer > 10000) dis = "Immense Void"
                if (player.sa.minigameNum.layer > 50000) dis = "Infinite Void"
                if (player.sa.minigameNum.layer > 200000) dis = "Infinite Vast Void"
                if (player.sa.minigameNum.layer > 1000000) dis = "Eternal Void"
                if (player.sa.minigameNum.layer > 3e6) dis = "Eternal Vast Void"
                if (player.sa.minigameNum.layer > 20e6) dis = "Infinite Eternal Void"
                if (player.sa.minigameNum.layer > 500e6) dis = "Transcending Void"
                if (player.sa.minigameNum.layer > 2e9) dis = "Transcending Vast Void"
                if (player.sa.minigameNum.layer > 2e10) dis = "Transcending Infinite Void"
                if (player.sa.minigameNum.layer > 1e12) dis = "Transcending Eternal Void"
                if (player.sa.minigameNum.layer > 1e14) dis = "Transcending Infinite Eternal Void"
                if (player.sa.minigameNum.layer > 1e16) dis = "Transcending Infinite Eternal Vast Void"
                if (player.sa.minigameNum.layer > 1e20) dis = "Reality Void"
                if (player.sa.minigameNum.layer > 1e21) dis = "Reality Vast Void"
                if (player.sa.minigameNum.layer > 1e22) dis = "Reality Infinite Void"
                if (player.sa.minigameNum.layer > 1e24) dis = "Reality Eternal Void"
                if (player.sa.minigameNum.layer > 1e26) dis = "Reality Infinite Eternal Void"
                if (player.sa.minigameNum.layer > 1e27) dis = "Reality Infinite Eternal Vast Void"
                if (player.sa.minigameNum.layer > 1e30) dis = "Reality Transcending Void"
                if (player.sa.minigameNum.layer > 1e31) dis = "Reality Transcending Vast Void"
                if (player.sa.minigameNum.layer > 1e33) dis = "Reality Transcending Infinite Void"
                if (player.sa.minigameNum.layer > 1e36) dis = "Reality Transcending Eternal Void"
                if (player.sa.minigameNum.layer > 1e40) dis = "Reality Transcending Infinite Eternal Void"
                if (player.sa.minigameNum.layer > 1e45) dis = "Reality Transcending Infinite Eternal Vast Void"
                if (player.sa.minigameNum.layer > 1e50) dis = "Reality Transcending Infinite Eternal Endless Vast Void"
                if (player.sa.minigameNum.lt(0)) dis = "negative?"
                if (player.sa.minigameNum.lt("-1e100")) dis = "big negative"
                if (player.sa.minigameNum.lt("-ee1000")) dis = "huge negative"
                if (player.sa.minigameNum.lt("-eee6")) dis = "nega-megative"
                if (player.sa.minigameNum.lt("-eee10")) dis = "nega-hypertive"
                if (player.sa.minigameNum.lt("-eee100")) dis = "negodtive"
                if (player.sa.minigameNum.lt("-eee1000")) dis = "negativextreme"
                if (player.sa.minigameNum.lt("-eeee6")) dis = "negodtivextreme"
                if (player.sa.minigameNum.lt("-eeee8")) dis = "negodtivextremega"
                if (player.sa.minigameNum.lt("-eeee10")) dis = "negodtivextremegabsolute"
                if (player.sa.minigameNum.lt("-eeee12")) dis = "negodtivextremegabsolutera"
                return dis
            },
            style() {return {
                'width': '267px',
            }},
            canClick() {return false},
        },
        12: {
            title(){
                if (hasAchievement("sa", 176)) {
                    title = notationChooser(player[this.layer].minigamePoints) + " Minigame Points"
                } else {
                    title = notationChooser(player[this.layer].pdx) + " pdx"
                }
                return title
            },
            display() { 
                if (hasAchievement("sa", 176)) {
                    dis = "Minigame Points are given when you press certain buttons. The gain of Minigame Points can be seen in the subtab 'Minigame Points and Upgrades'."
                } else {dis = "A new feature, pdx, has appeared. PDX is gained by clicking the divide buttons. Some clickables needs you to stay below a certain pdx. /3 and /7: +1 pdx. /2: +3 pdx. /10: +10 pdx"}
                return dis
            },
            unlocked() {return hasAchievement("sa", 151)},
            canClick() {return false},
        },
        13: {
            title(){
                title = notationChooser(player[this.layer].bp) + " button presses"
                return title
            },
            display() { 
                dis = "Any operation gives +1 button press."
                return dis
            },
            unlocked() {return hasAchievement("sa", 166)},
            canClick() {return false},
        },
        21: {
            title: "+1",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.add(1)
                player[this.layer].bp = player[this.layer].bp.add(1)
                if (hasAchievement("sa", 176)) { player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(1).mul(player.sa.minigamePtsMult)) }
            },
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.add(1)
                player[this.layer].bp = player[this.layer].bp.add(1)
                if (hasAchievement("sa", 176)) { player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(1).mul(player.sa.minigamePtsMult)) }
            }
        },
        22: {
            title: "x2",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(2)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(2)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        23: {
            title: "=1",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = decimalOne
                player[this.layer].pdx = new Decimal(0)
                player[this.layer].bp = new Decimal(0)
            },
        },
        24: {
            title: "-0.01",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.sub(0.01)
                player[this.layer].bp = player[this.layer].bp.add(1)
                if (hasAchievement("sa", 176)) { player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(1).mul(player.sa.minigamePtsMult)) }
            },
            unlocked() {return hasAchievement("sa", 156)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.sub(0.01)
                player[this.layer].bp = player[this.layer].bp.add(1)
                if (hasAchievement("sa", 176)) { player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(1).mul(player.sa.minigamePtsMult)) }
            }
        },
        31: {
            title: "x69",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(69)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 113)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(69)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        32: {
            title: "x911",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(911)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 116)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(911)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        33: {
            title: "/3",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(3)
                player[this.layer].pdx = player[this.layer].pdx.add(1)
                player[this.layer].bp = player[this.layer].bp.add(1)
                if (hasAchievement("sa", 176)) { player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(2).mul(player.sa.minigamePtsMult)) }
            },
            unlocked() {return hasAchievement("sa", 116)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(3)
                player[this.layer].pdx = player[this.layer].pdx.add(1)
                player[this.layer].bp = player[this.layer].bp.add(1)
                if (hasAchievement("sa", 176)) { player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(2).mul(player.sa.minigamePtsMult)) }
            }
        },
        34: {
            title: "x(-1)",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(-1)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 162)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(-1)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        41: {
            title: "x10^10",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times("1e10")
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 125)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times("1e10")
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        42: {
            title: "x3",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(3)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 126)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(3)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        43: {
            title: "/2",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(2)
                player[this.layer].pdx = player[this.layer].pdx.add(3)
                player[this.layer].bp = player[this.layer].bp.add(1)
                if (hasAchievement("sa", 176)) { player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(2).mul(player.sa.minigamePtsMult)) }
            },
            unlocked() {return hasAchievement("sa", 126)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(2)
                player[this.layer].pdx = player[this.layer].pdx.add(3)
                player[this.layer].bp = player[this.layer].bp.add(1)
                if (hasAchievement("sa", 176)) { player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(2).mul(player.sa.minigamePtsMult)) }
            }
        },
        44: {
            title: "x5",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(5)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 162)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(5)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        51: {
            title: "x10",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(10)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 133)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(10)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        52: {
            title: "^1.01 [All ^ buttons require a positive number to work]",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1.01)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            },
            unlocked() {return hasAchievement("sa", 135)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1.01)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            }
        },
        53: {
            title: "^0.99",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(0.99)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    if (hasUpgrade("sa", 25)) player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(30).mul(player.sa.minigamePtsMult))
                }
            },
            unlocked() {return hasAchievement("sa", 135)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(0.99)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    if (hasUpgrade("sa", 25)) player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(30).mul(player.sa.minigamePtsMult))
                }
            }
        },
        54: {
            title: "x7",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(7)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 164)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(7)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        61: {
            title: "^1.1",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1.1)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    if (hasUpgrade("sa", 42)) player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(1000).mul(player.sa.minigamePtsMult))
                    
                }
            },
            unlocked() {return hasAchievement("sa", 143)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1.1)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    if (hasUpgrade("sa", 42)) player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(1000).mul(player.sa.minigamePtsMult))
                }
            }
        },
        62: {
            title: "^2",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(2)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            },
            unlocked() {return hasAchievement("sa", 146)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(2)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            }
        },
        63: {
            title: "/7",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(7)
                player[this.layer].pdx = player[this.layer].pdx.add(1)
                player[this.layer].bp = player[this.layer].bp.add(1)
                if (hasAchievement("sa", 176)) { player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(2).mul(player.sa.minigamePtsMult)) }
            },
            unlocked() {return hasAchievement("sa", 146)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(7)
                player[this.layer].pdx = player[this.layer].pdx.add(1)
                player[this.layer].bp = player[this.layer].bp.add(1)
                if (hasAchievement("sa", 176)) { player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(2).mul(player.sa.minigamePtsMult)) }
            }
        },
        64: {
            title: "^1e5,000",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow("1e5000")
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    if (hasUpgrade("sa", 23)) {
                        player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(5).mul(player.sa.minigamePtsMult))
                    } else if (hasUpgrade("sa", 15)) {
                        player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(3).mul(player.sa.minigamePtsMult))
                    }
                }
            },
            unlocked() {return hasAchievement("sa", 165)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow("1e5000")
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    if (hasUpgrade("sa", 23)) {
                        player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(5).mul(player.sa.minigamePtsMult))
                    } else if (hasUpgrade("sa", 15)) {
                        player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(3).mul(player.sa.minigamePtsMult))
                    }
                }
            }
        },
        71: {
            title: "/10",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(10)
                player[this.layer].pdx = player[this.layer].pdx.add(10)
                player[this.layer].bp = player[this.layer].bp.add(1)
                if (hasAchievement("sa", 176)) { player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(2).mul(player.sa.minigamePtsMult)) }
            },
            unlocked() {return hasAchievement("sa", 151)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(10)
                player[this.layer].pdx = player[this.layer].pdx.add(10)
                player[this.layer].bp = player[this.layer].bp.add(1)
                if (hasAchievement("sa", 176)) { player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(2).mul(player.sa.minigamePtsMult)) }
            }
        },
        72: {
            title: "^10",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(10)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            },
            unlocked() {return hasAchievement("sa", 154)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(10)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            }
        },
        73: {
            title: "^1e10",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1e10)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    if (hasUpgrade("sa", 15)) player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(1).mul(player.sa.minigamePtsMult))
                }
            },
            unlocked() {return hasAchievement("sa", 155)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1e10)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    if (hasUpgrade("sa", 15)) player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(1).mul(player.sa.minigamePtsMult))
                }
            }
        },
        74: {
            title: "^1e250",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1e250)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    if (hasUpgrade("sa", 15)) player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(3).mul(player.sa.minigamePtsMult))
                }
            },
            unlocked() {return hasAchievement("sa", 156)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1e250)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    if (hasUpgrade("sa", 15)) player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(3).mul(player.sa.minigamePtsMult))
                }
            }
        },
        81: {
            title: "x13",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(13)
                player[this.layer].bp = player[this.layer].bp.add(1)
            },
            unlocked() {return hasAchievement("sa", 172)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.times(13)
                player[this.layer].bp = player[this.layer].bp.add(1)
            }
        },
        82: {
            title: "/99",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(99)
                player[this.layer].bp = player[this.layer].bp.add(1)
                if (hasAchievement("sa", 176)) { player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(2).mul(player.sa.minigamePtsMult)) }
            },
            unlocked() {return hasAchievement("sa", 172)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(3)
                player[this.layer].bp = player[this.layer].bp.add(1)
                if (hasAchievement("sa", 176)) { player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(2).mul(player.sa.minigamePtsMult)) }
            }
        },
        83: {
            title: "^3",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(3)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            },
            unlocked() {return hasAchievement("sa", 174)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(3)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            }
        },
        84: {
            title: "^0.5",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(0.5)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    if (hasUpgrade("sa", 35)) player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(100).mul(player.sa.minigamePtsMult))
                }
            },
            unlocked() {return hasAchievement("sa", 174)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(0.5)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    if (hasUpgrade("sa", 35)) player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(100).mul(player.sa.minigamePtsMult))
                }
            }
        },
        91: {
            title: "^1e20,000",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    let multiplier = hasUpgrade(this.layer, 11) ? 1.5 : 1
                    if (hasUpgrade("sa", 12)) multiplier = multiplier * ((Math.log(player.timePlayed,3)/7)+1)
                    if (hasUpgrade("sa", 13)) multiplier = multiplier * Math.max(player.sa.minigameNum.slog(), 1)
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(new Decimal(10).pow(new Decimal(20000).mul(multiplier)))
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    if (hasUpgrade("sa", 23)) {
                        player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(3).mul(player.sa.minigamePtsMult))
                    } else if (hasUpgrade("sa", 15)) {
                        player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(1).mul(player.sa.minigamePtsMult))
                    }
                }
            },
            unlocked() {return hasAchievement("sa", 176)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    let multiplier = hasUpgrade(this.layer, 11) ? 1.5 : 1
                    if (hasUpgrade("sa", 12)) multiplier = multiplier * ((Math.log(player.timePlayed,3)/7)+1)
                    if (hasUpgrade("sa", 13)) multiplier = multiplier * Math.max(player.sa.minigameNum.slog(), 1)
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(new Decimal(10).pow(new Decimal(20000).mul(multiplier)))
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    if (hasUpgrade("sa", 23)) {
                        player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(3).mul(player.sa.minigamePtsMult))
                    } else if (hasUpgrade("sa", 15)) {
                        player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(1).mul(player.sa.minigamePtsMult))
                    }
                }
            }
        },
        92: {
            title: "^1e250,000",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    let multiplier = ((Math.log2(player.timePlayed)/13)+1)
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(new Decimal(10).pow(new Decimal(250000).mul(multiplier)))
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    if (hasUpgrade("sa", 23)) {
                        player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(1).mul(player.sa.minigamePtsMult))
                    } else if (hasUpgrade("sa", 15)) {
                        player[this.layer].minigamePoints = player[this.layer].minigamePoints.sub(new Decimal(1).mul(player.sa.minigamePtsMult))
                    }
                }
            },
            unlocked() {return hasUpgrade("sa", 14)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    let multiplier = ((Math.log2(player.timePlayed)/13)+1)
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(new Decimal(10).pow(new Decimal(250000).mul(multiplier)))
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    if (hasUpgrade("sa", 23)) {
                        player[this.layer].minigamePoints = player[this.layer].minigamePoints.add(new Decimal(1).mul(player.sa.minigamePtsMult))
                    } else if (hasUpgrade("sa", 15)) {
                        player[this.layer].minigamePoints = player[this.layer].minigamePoints.sub(new Decimal(1).mul(player.sa.minigamePtsMult))
                    }
                }
            }
        },
        93: {
            title: "^1e500,000",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    let multiplier = ((Math.log(player.timePlayed)/10)+1)
                    multiplier = multiplier * Math.max((Math.log10(player.sa.minigamePoints)-4.5)*3, 1)
                    if (hasUpgrade("sa", 22)) multiplier = multiplier * Math.max(player.points.slog(), 2)
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(new Decimal(10).pow(new Decimal(500000).mul(multiplier)))
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    player[this.layer].minigamePoints = player[this.layer].minigamePoints.sub(new Decimal(0.25).mul(player.sa.minigamePtsMult))
                }
            },
            unlocked() {return hasUpgrade("sa", 21)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    let multiplier = ((Math.log(player.timePlayed)/10)+1)
                    multiplier = multiplier * Math.max((Math.log10(player.sa.minigamePoints)-4.5)*3, 1)
                    if (hasUpgrade("sa", 22)) multiplier = multiplier * Math.max(player.points.slog(), 2)
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(new Decimal(10).pow(new Decimal(500000).mul(multiplier)))
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    player[this.layer].minigamePoints = player[this.layer].minigamePoints.sub(new Decimal(0.25).mul(player.sa.minigamePtsMult))
                }
            }
        },
        94: {
            title: "^1e10M",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    let multiplier = ((Math.log10(player.timePlayed)/10)+1)
                    multiplier = multiplier * Math.max((Math.log10(player.sa.minigamePoints)-3.5)*0.5, 0.5)
                    multiplier = multiplier * Math.max(player.points.slog(), 2)
                    multiplier = multiplier * Math.max(player.sa.minigameNum.slog(), 1)
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(new Decimal(10).pow(new Decimal(10e6).mul(multiplier)))
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    player[this.layer].minigamePoints = player[this.layer].minigamePoints.sub(new Decimal(0.5).mul(player.sa.minigamePtsMult))
                }
            },
            unlocked() {return hasUpgrade("sa", 24)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    let multiplier = ((Math.log10(player.timePlayed)/10)+1)
                    multiplier = multiplier * Math.max((Math.log10(player.sa.minigamePoints)-3.5)*0.5, 0.5)
                    multiplier = multiplier * Math.max(player.points.slog(), 2)
                    multiplier = multiplier * Math.max(player.sa.minigameNum.slog(), 1)
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(new Decimal(10).pow(new Decimal(10e6).mul(multiplier)))
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    player[this.layer].minigamePoints = player[this.layer].minigamePoints.sub(new Decimal(0.5).mul(player.sa.minigamePtsMult))
                }
            }
        },
        101: {
            title: "^e10B",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    let multiplier = Math.max(player.points.slog(), 2)
                    multiplier = multiplier * Math.max(player.sa.minigameNum.slog()-1, 1)
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(new Decimal(10).pow(new Decimal(1e10).mul(multiplier)))
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    player[this.layer].minigamePoints = player[this.layer].minigamePoints.sub(new Decimal(15).mul(player.sa.minigamePtsMult))
                }
            },
            unlocked() {return hasUpgrade("sa", 31)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    let multiplier = Math.max(player.points.slog(), 2)
                    multiplier = multiplier * Math.max(player.sa.minigameNum.slog()-1, 1)
                    player[this.layer].minigameNum = player[this.layer].minigameNum.pow(new Decimal(10).pow(new Decimal(1e10).mul(multiplier)))
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    player[this.layer].minigamePoints = player[this.layer].minigamePoints.sub(new Decimal(15).mul(player.sa.minigamePtsMult))
                }
            }
        },
        102: {
            title: "Mag += 0.00005",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    let mult = 1
                    let cost = 25
                    if (hasUpgrade("sa", 34)) {
                        cost = 10
                        mult = mult * 4
                        mult = mult * (Math.max(player.sa.minigameNum.slog()-1, 1)/6)+1
                    }
                    if (hasUpgrade("sa", 33)) {
                        mult = mult * 3
                        mult = mult * (Math.max(player.points.slog(), 2)/20)+1
                        mult = mult * ((Math.log(player.timePlayed)/40)+1)
                    }
                    if (hasUpgrade("sa", 35)) {
                        cost = 4
                        mult = mult * 5
                        mult = mult * (Math.max((Math.log10(player.sa.minigamePoints)-3.5)*0.22, 0.5))
                    }
                    if (hasUpgrade("sa", 41)) {
                        cost = 1
                        mult = mult * 8
                    }
                    player[this.layer].minigameNum.mag = player[this.layer].minigameNum.mag + (0.00005 * mult)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    player[this.layer].minigamePoints = player[this.layer].minigamePoints.sub(new Decimal(cost).mul(mult).mul(player.sa.minigamePtsMult))
                }
            },
            unlocked() {return hasUpgrade("sa", 32)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    let mult = 1
                    let cost = 25
                    let holdmult = 1
                    if (hasUpgrade("sa", 34)) {
                        cost = 10
                        mult = mult * 4
                        mult = mult * (Math.max(player.sa.minigameNum.slog()-1, 1)/6)+1
                        holdmult = 1.5
                    }
                    if (hasUpgrade("sa", 33)) {
                        mult = mult * 3
                        mult = mult * (Math.max(player.points.slog(), 2)/20)+1
                        mult = mult * ((Math.log(player.timePlayed)/40)+1)
                    }
                    if (hasUpgrade("sa", 35)) {
                        cost = 4
                        mult = mult * 5
                        mult = mult * (Math.max((Math.log10(player.sa.minigamePoints)-3.5)*0.22, 0.5))
                    }
                    if (hasUpgrade("sa", 41)) {
                        cost = 1
                        mult = mult * 8
                    }
                    player[this.layer].minigameNum.mag = player[this.layer].minigameNum.mag + (0.00005 * mult * holdmult)
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    player[this.layer].minigamePoints = player[this.layer].minigamePoints.sub(new Decimal(cost).mul(mult).mul(player.sa.minigamePtsMult))
                }
            }
        },
        103: {
            title: "Mag *= 1.0001",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    let mult = 1
                    mult = mult * (Math.max(player.sa.minigameNum.slog()-1, 1)/9)+1
                    mult = mult * (Math.max(player.points.slog(), 2)/10)+1
                    let cost = 5000
                    if (hasUpgrade("sa", 43)) {
                        cost = 1500
                        mult = mult * 1.5
                    }
                    if (hasUpgrade("sa", 44)) {
                        cost = 250
                        mult = mult * 2.5
                    }
                    if (hasUpgrade("sa", 45)) {
                        cost = 0
                        mult = mult * 7
                    }
                    if (hasMilestone("sa", 1)) mult = mult * 1.2
                    if (hasMilestone("sa", 2)) mult = mult * Math.log10(player.timePlayed)/10*1.2+1
                    if (hasMilestone("sa", 4)) mult = mult * Math.log10(player.sa.minigamePoints)/20+1
                    if (hasMilestone("sa", 4)) mult = mult * 2
                    if (hasMilestone("sa", 3)) mult = mult * (Math.max(player.points.slog(), 2)/5)+1
                    if (hasMilestone("sa", 3)) mult = mult * 1.5
                    if (hasMilestone("sa", 5)) mult = mult * 3
                    if (hasMilestone("sa", 6)) mult = mult * 2
                    if (hasMilestone("sa", 6)) mult = mult * Math.log10(player.timePlayed)/10*1.2+1
                    if (hasMilestone("sa", 7)) mult = mult * 4
                    if (hasMilestone("sa", 8)) mult = mult * 5
                    if (hasMilestone("sa", 9)) mult = mult * 10
                    player[this.layer].minigameNum.mag = player[this.layer].minigameNum.mag * (1 + (0.0001 * mult))
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    player[this.layer].minigamePoints = player[this.layer].minigamePoints.sub(new Decimal(cost).mul(player.sa.minigamePtsMult))
                }
            },
            unlocked() {return hasUpgrade("sa", 42)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    let mult = 1
                    let einc = 0
                    mult = mult * (Math.max(player.sa.minigameNum.slog()-1, 1)/9)+1
                    mult = mult * (Math.max(player.points.slog(), 2)/10)+1
                    let cost = 5000
                    if (hasUpgrade("sa", 43)) {
                        cost = 1500
                        mult = mult * 1.5
                    }
                    if (hasUpgrade("sa", 44)) {
                        cost = 250
                        mult = mult * 2.5
                    }
                    if (hasUpgrade("sa", 45)) {
                        cost = 0
                        mult = mult * 7
                    }
                    if (hasMilestone("sa", 1)) mult = mult * 1.2
                    if (hasMilestone("sa", 2)) mult = mult * Math.log10(player.timePlayed)/10*1.2+1
                    if (hasMilestone("sa", 4)) mult = mult * Math.log10(player.sa.minigamePoints)/20+1
                    if (hasMilestone("sa", 4)) mult = mult * 2
                    if (hasMilestone("sa", 3)) mult = mult * (Math.max(player.points.slog(), 2)/5)+1
                    if (hasMilestone("sa", 3)) mult = mult * 1.5
                    if (hasMilestone("sa", 5)) mult = mult * 3
                    if (hasMilestone("sa", 6)) mult = mult * 2
                    if (hasMilestone("sa", 6)) mult = mult * Math.log10(player.timePlayed)/10*1.2+1
                    if (hasMilestone("sa", 7)) mult = mult * 4
                    if (hasMilestone("sa", 8)) mult = mult * 5
                    if (hasMilestone("sa", 9)) mult = mult * 10
                    if (hasMilestone("sa", 8)) einc = 1
                    if (hasMilestone("sa", 9)) einc = 2
                    player[this.layer].minigameNum.mag = player[this.layer].minigameNum.mag * (1 + (0.0001 * mult))
                    player[this.layer].minigameNum.layer = player[this.layer].minigameNum.layer + einc
                    player[this.layer].bp = player[this.layer].bp.add(1)
                    player[this.layer].minigamePoints = player[this.layer].minigamePoints.sub(new Decimal(cost).mul(player.sa.minigamePtsMult))
                }
            }
        },
        104: {
            title: "Layer *= 1 + (1/200K)",
            canClick() {return true},
            onClick() {
                if (player[this.layer].minigameNum.gte(0)) {
                    let mult = 1
                    if (hasMilestone("sa", 11)) {
                        mult = mult * (Math.max(player.points.slog(), 2)/50)+1
                        mult = mult * (Math.max(player.sa.minigamePoints.slog(), 1)/15)+1
                        mult = mult * 1.8
                    }
                    if (hasMilestone("sa", 12)) mult = mult * 1.5
                    player[this.layer].minigameNum.layer = player[this.layer].minigameNum.layer * (1 + (0.000005 * mult))
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            },
            unlocked() {return hasMilestone("sa", 10)},
            onHold() {
                if (player[this.layer].minigameNum.gte(0)) {
                    let mult = 1
                    if (hasMilestone("sa", 11)) {
                        mult = mult * (Math.max(player.points.slog(), 2)/50)+1
                        mult = mult * (Math.max(player.sa.minigamePoints.slog(), 1)/15)+1
                        mult = mult * 1.8
                    }
                    if (hasMilestone("sa", 12)) mult = mult * 1.5
                    player[this.layer].minigameNum.layer = player[this.layer].minigameNum.layer * (1 + (0.000005 * mult))
                    player[this.layer].bp = player[this.layer].bp.add(1)
                }
            }
        },
    },
    upgrades: {
        11: {
            title: "MiUp 1: Passive Numbers?",
            description: "Multiply the exponent of the ^e20K button by 1.5, and add passive generation. Passive Generation: Every 1.0 seconds, ^e120K the Number.",
            cost: new Decimal("ee1.2e9"),
            currencyDisplayName: "Number",
            currencyInternalName: "minigameNum",
            currencyLayer: "sa",
            unlocked() {return (hasAchievement("sa", 176) && player.sa.minigamePoints.gte(100000))}
        },
        12: {
            title: "MiUp 2: I want you to play more.",
            description: "Multiply the exponent of the ^e20K button based on your playtime.",
            cost: new Decimal("ee3e9"),
            currencyDisplayName: "Number",
            currencyInternalName: "minigameNum",
            currencyLayer: "sa",
            unlocked() {return (hasUpgrade("sa", 11) && player.sa.minigamePoints.gte(100000))}
        },
        13: {
            title: "MiUp 3: Numbered Number",
            description: "Multiply the exponent of the ^e20K button based on your Number. Also, passive generation increases to Every 0.90 seconds, ^e1M Number.",
            cost: new Decimal("ee1e10"),
            currencyDisplayName: "Number",
            currencyInternalName: "minigameNum",
            currencyLayer: "sa",
            unlocked() {return (hasUpgrade("sa", 12) && player.sa.minigamePoints.gte(100000))}
        },
        14: {
            title: "MiUp 4: Finally, a new button!",
            description: "Unlock a new ^e250K button. MU2 affects it at a decreasing rate while MU3 does not affect it.",
            cost: new Decimal("ee3.5e10"),
            currencyDisplayName: "Number",
            currencyInternalName: "minigameNum",
            currencyLayer: "sa",
            unlocked() {return (hasUpgrade("sa", 13) && player.sa.minigamePoints.gte(100000))}
        },
        15: {
            title: "MiUp 5: Minigame Points Renaissance",
            description: "x2.25 Minigame Points. Also, unlock more buttons for Minigame Points (shown on top)",
            cost: new Decimal("ee8e10"),
            currencyDisplayName: "Number",
            currencyInternalName: "minigameNum",
            currencyLayer: "sa",
            unlocked() {return (hasUpgrade("sa", 14) && player.sa.minigamePoints.gte(100000))}
        },
        21: {
            title: "MiUp 6: Minigame Number",
            description: "x5 Minigame Points when below 100,000. x2 Minigame Points when below 1,000,000. Unlock a new ^e500K button. MU2 affects it at a reduced rate and Minigame Points affect it. Passive generation increases to Every 0.75 seconds, ^e10M Number. [-0.25 MiP per press!]",
            cost: new Decimal("325000"),
            currencyDisplayName: "Minigame Points",
            currencyInternalName: "minigamePoints",
            currencyLayer: "sa",
            unlocked() {return (hasUpgrade("sa", 15) && player.sa.minigamePoints.gte(100000))}
        },
        22: {
            title: "MiUp 7: Point Fragment-Number",
            description: "Point Fragments affect the ^e500K button and Minigame Points at a low rate. [NEXT UP REQUIRES eee12 Minigame Points to Unlock]",
            cost: new Decimal("ee3.5e11"),
            currencyDisplayName: "Number",
            currencyInternalName: "minigameNum",
            currencyLayer: "sa",
            unlocked() {return (hasUpgrade("sa", 21) && player.sa.minigamePoints.gte(100000))}
        },
        23: {
            title: "MiUp 8: Minigame Points Insanity",
            description: "x3 MiP when below 10M. ^e5000 to ^e250K buttons +2 MiP per. Passive Gen increases to Every 0.60 seconds, ^e40M Number. [Cost ee1e12 Number and 1M Minigame Points]",
            cost: new Decimal(1e6),
            currencyDisplayName: "Minigame Points",
            currencyInternalName: "minigamePoints",
            currencyLayer: "sa",
            unlocked() {return (hasUpgrade("sa", 22) && player.sa.minigamePoints.gte(100000) && player.sa.minigameNum.gte("ee1e12"))}
        },
        24: {
            title: "MiUp 9: Well, that's a big jump.",
            description: "x2 MiP. Also, passively generate 2 MiP every 0.50 seconds. Unlock a new ^e10M Button! MU2, Minigame Points, Point Fragments and Number affect it. [-0.50 MiP per press!] Passive gen increases to Every 0.50 seconds, ^e500M Number.",
            cost: new Decimal(5e6),
            currencyDisplayName: "Minigame Points",
            currencyInternalName: "minigamePoints",
            currencyLayer: "sa",
            unlocked() {return (hasUpgrade("sa", 23) && player.sa.minigamePoints.gte(100000))}
        },
        25: {
            title: "MiUp 10: Minigame Points Supremacy",
            description: "The ^0.99 button now has +30 minigame points... and x5 minigame points. Also x5 the passive gen MiP amount :)",
            cost: new Decimal("ee3e13"),
            currencyDisplayName: "Number",
            currencyInternalName: "minigameNum",
            currencyLayer: "sa",
            unlocked() {return (hasUpgrade("sa", 24) && player.sa.minigamePoints.gte(100000))}
        },
        31: {
            title: "MiUp 11: Big boost, big nerf",
            description: "Adds a new ^ee10 button. This button is boosted by PF and Number only. It decreases your MiP by 15 every press...",
            cost: new Decimal(140e6),
            currencyDisplayName: "Minigame Points",
            currencyInternalName: "minigamePoints",
            currencyLayer: "sa",
            unlocked() {return (hasUpgrade("sa", 25) && player.sa.minigamePoints.gte(100000))}
        },
        32: {
            title: "MiUp 12: Wheres the exponential?",
            description: "Adds a new button, called 'Mag += 0.00005'... but decreases your MiP by 25 per press. This is the start of the rapid inflation series.",
            cost: new Decimal("eee16"),
            currencyDisplayName: "Number",
            currencyInternalName: "minigameNum",
            currencyLayer: "sa",
            unlocked() {return (hasUpgrade("sa", 31) && player.sa.minigamePoints.gte(100000))}
        },
        33: {
            title: "MiUp 13: With more power comes greater costs...",
            description: "The button's effect is multiplied by 3, but the cost is also multiplied by 3. Playtime and PF also affects it, very slightly. Half all passive generation times, and buff passive generation to ^ee18/0.25s.",
            cost: new Decimal("eee20"),
            currencyDisplayName: "Number",
            currencyInternalName: "minigameNum",
            currencyLayer: "sa",
            unlocked() {return (hasUpgrade("sa", 32) && player.sa.minigamePoints.gte(100000))}
        },
        34: {
            title: "MiUp 14: EVEN HIGHER!!",
            description: "x14 Minigame Points, The button's cost is decreased to 10 per press, but the cost is also multiplied by 4 together with the effect. Number affects it. Buff passive generation to ^ee28/0.2s and +12/0.2s respectively. When you hold the button, it gives x1.5 multiplier (doesn't increase MiP cost)",
            cost: new Decimal("eee30"),
            currencyDisplayName: "Number",
            currencyInternalName: "minigameNum",
            currencyLayer: "sa",
            unlocked() {return (hasUpgrade("sa", 33) && player.sa.minigamePoints.gte(100000))}
        },
        35: {
            title: "MiUp 15: WAY HIGHER!!",
            description: "x5 Minigame Points, The button's cost is decreased to 4 per press, but the cost is also multiplied by 5 together with the effect. Minigame Points affects it. Buff passive generation to ^ee49/0.1s and +25/0.1s respectively. The ^0.5 button now gives +100 MiP.",
            cost: new Decimal("eee50"),
            currencyDisplayName: "Number",
            currencyInternalName: "minigameNum",
            currencyLayer: "sa",
            unlocked() {return (hasUpgrade("sa", 34) && player.sa.minigamePoints.gte(100000))}
        },
        41: {
            title: "MiUp 16: SHEER BOOST!!",
            description: "The button's cost is decreased to 1 per press, but the cost is also multiplied by 8 together with the effect. Buff passive generation to ^ee111/0.05s and +50/0.05s respectively.",
            cost: new Decimal("ee1.11e111"),
            currencyDisplayName: "Number",
            currencyInternalName: "minigameNum",
            currencyLayer: "sa",
            unlocked() {return (hasUpgrade("sa", 35) && player.sa.minigamePoints.gte(100000))}
        },
        42: {
            title: "MiUp 17: Wait, what's that? A glimmer of hope, any hope needed to reach e(1M)10...",
            description: "Buff passive generation to ^ee500/0.05s. ^1.1 button now gives +1,000 MiP on click. Add a new button, which deletes 5,000 MiP on click (Number and PF boosts it).",
            cost: new Decimal("eee500"),
            currencyDisplayName: "Number",
            currencyInternalName: "minigameNum",
            currencyLayer: "sa",
            unlocked() {return (hasUpgrade("sa", 41) && player.sa.minigamePoints.gte(100000))}
        },
        43: {
            title: "MiUp 18: Sky HIGH",
            description: "Buff passive generation to ^ee11111/0.05s. The Mag *= 1.0001 button now costs only 1500 MiP, and the effect is x1.5.",
            cost: new Decimal("eee10000"),
            currencyDisplayName: "Number",
            currencyInternalName: "minigameNum",
            currencyLayer: "sa",
            unlocked() {return (hasUpgrade("sa", 42) && player.sa.minigamePoints.gte(100000))}
        },
        44: {
            title: "MiUp 19: To the MOON!",
            description: "Buff passive generation to ^ee2e9/0.05s. The Mag *= 1.0001 button now costs only 250 MiP, and the effect is x2.5.",
            cost: new Decimal("eeee9"),
            currencyDisplayName: "Number",
            currencyInternalName: "minigameNum",
            currencyLayer: "sa",
            unlocked() {return (hasUpgrade("sa", 43) && player.sa.minigamePoints.gte(100000))}
        },
        45: {
            title: "MiUp 20: That's the game. We are at the edge of the universe. Want to go further?",
            description: "The Mag *= 1.0001 button does not cost ANY MiP, and the effect is x7. Unlock some Minigame Milestones. (You have to get Era 1 to unlock them)",
            cost: new Decimal("eeeee1000000"),
            currencyDisplayName: "Number",
            currencyInternalName: "minigameNum",
            currencyLayer: "sa",
            unlocked() {return (hasUpgrade("sa", 44) && player.sa.minigamePoints.gte(100000))}
        },
    },
    milestones: {
        1: {
            requirementDescription: "Minigame Milestone 1: e(10) 10 Number",
            effectDescription: "Make the *= mag button 1.2 times stronger!",
            done() { return player.sa.minigameNum.layer > 9.9 },
            unlocked() { return hasMilestone("era", 1)},
        },
        2: {
            requirementDescription: "Minigame Milestone 2: e(100) 10 Number",
            effectDescription: "Make the *= mag button be based on your playtime",
            done() { return player.sa.minigameNum.layer > 99.9 },
            unlocked() { return (hasMilestone("sa", 1) && hasMilestone("era", 1))},
        },
        3: {
            requirementDescription: "Minigame Milestone 3: e(1,000) 10 Number",
            effectDescription: "Make the *= button 1.5 times stronger, and be based on Point Fragments",
            done() { return player.sa.minigameNum.layer > 999.9 },
            unlocked() { return (hasMilestone("sa", 2) && hasMilestone("era", 1))},
        },
        4: {
            requirementDescription: "Minigame Milestone 4: e(7,500) 10 Number",
            effectDescription: "Make the *= button 2 times stronger, and be based on Minigame Points",
            done() { return player.sa.minigameNum.layer > 7499.9 },
            unlocked() { return (hasMilestone("sa", 3) && hasMilestone("era", 1))},
        },
        5: {
            requirementDescription: "Minigame Milestone 5: e(50,000) 10 Number",
            effectDescription: "Make the *= button 3 times stronger, and boost Minigame Points by 10x",
            done() { return player.sa.minigameNum.layer > 49999.9 },
            unlocked() { return (hasMilestone("sa", 4) && hasMilestone("era", 1))},
        },
        6: {
            requirementDescription: "Minigame Milestone 6: e(200,000) 10 Number",
            effectDescription: "Make the *= button be based on Playtime again (same effect) and make it 2 times stronger. Minigame Points gets boosted by 100x. Every 10 seconds, increase the amount of e by 1.",
            done() { return player.sa.minigameNum.layer > 199999.9 },
            unlocked() { return (hasMilestone("sa", 5) && hasMilestone("era", 1))},
        },
        7: {
            requirementDescription: "Minigame Milestone 7: e(500,000) 10 Number",
            effectDescription: "Make the *= button 4 times stronger!! Minigame Points x1,000!!! Passive generation is 10 times stronger.",
            done() { return player.sa.minigameNum.layer > 499999.9 },
            unlocked() { return (hasMilestone("sa", 6) && hasMilestone("era", 1))},
        },
        8: {
            requirementDescription: "Minigame Milestone 8: e(1,000,000) 10 Number",
            effectDescription: "Make the *= button 5 times stronger… Passive generation is 5 times stronger... The *= button adds 1 'e' on click.",
            done() { return player.sa.minigameNum.layer > 999999.9 },
            unlocked() { return (hasMilestone("sa", 7) && hasMilestone("era", 1))},
        },
        9: {
            requirementDescription: "Minigame Milestone 9: e(4,000,000) 10 Number",
            effectDescription: "Make the mag part of the *= button 10 times stronger… Passive generation is now 8 times stronger. The *= button adds 1 more 'e' on click.",
            done() { return player.sa.minigameNum.layer > 3999999.9 },
            unlocked() { return (hasMilestone("sa", 8) && hasMilestone("era", 1))},
        },
        10: {
            requirementDescription: "Minigame Milestone 10: e(12,000,000) 10 Number",
            effectDescription: "Unlock a new button. Passive generation is now 100 times stronger. (Reward: x1.05 EC)",
            done() { return player.sa.minigameNum.layer > 11999999.9 },
            unlocked() { return (hasMilestone("sa", 9) && hasMilestone("era", 1))},
        },
        11: {
            requirementDescription: "Minigame Milestone 11: F1e9, or e(1e9) Number",
            effectDescription: "Passive generation is now 300 times stronger. Layer *= button is now 1.8 times stronger, and based on PF and Minigame Points.",
            done() { return player.sa.minigameNum.layer >= 999999999.99 },
            unlocked() { return (hasMilestone("sa", 10) && hasMilestone("era", 1))},
        },
        12: {
            requirementDescription: "Minigame Milestone 12: F1e16, or e(1e16) Number",
            effectDescription: "The layer *= button is now 1.5 times stronger. Every 0.05 seconds, passively generates the Layer *= button, with 1/20 of the effect.",
            done() { return player.sa.minigameNum.layer >= 9999999999999999.99 },
            unlocked() { return (hasMilestone("sa", 11) && hasMilestone("era", 1))},
        },
    },
    update(diff) {
        player.sa.minigamePtsMult = new Decimal(1)
        if (hasUpgrade("sa", 15)) player.sa.minigamePtsMult = player.sa.minigamePtsMult.mul(2.25)
        if (hasUpgrade("sa", 24)) player.sa.minigamePtsMult = player.sa.minigamePtsMult.mul(2)
        if (hasUpgrade("sa", 25)) player.sa.minigamePtsMult = player.sa.minigamePtsMult.mul(5)
        if (hasUpgrade("sa", 34)) player.sa.minigamePtsMult = player.sa.minigamePtsMult.mul(14)
        if (hasUpgrade("sa", 35)) player.sa.minigamePtsMult = player.sa.minigamePtsMult.mul(5)
        if (hasMilestone("sa", 5)) player.sa.minigamePtsMult = player.sa.minigamePtsMult.mul(10)
        if (hasMilestone("sa", 6)) player.sa.minigamePtsMult = player.sa.minigamePtsMult.mul(100)
        if (hasMilestone("sa", 7)) player.sa.minigamePtsMult = player.sa.minigamePtsMult.mul(1000)
        if (hasUpgrade("sa", 21)) {
            if (player.sa.minigamePoints.lt(99999)) {
                player.sa.minigamePtsMult = player.sa.minigamePtsMult.mul(5)
            }
            if (player.sa.minigamePoints.lt(999999)) {
                player.sa.minigamePtsMult = player.sa.minigamePtsMult.mul(2)
            }
            if (hasUpgrade("sa", 23)) {
                if (player.sa.minigamePoints.lt(9999999)) {
                    player.sa.minigamePtsMult = player.sa.minigamePtsMult.mul(3)
                }
            }
        }
        if (hasUpgrade("sa", 22)) {
            player.sa.minigamePtsMult = player.sa.minigamePtsMult.mul(Math.max(player.points.slog(), 2))
        }
        if (hasUpgrade("sa", 11)) {
            let expopow = new Decimal(120000)
            let minigameinc = new Decimal(0)
            let egain = 0
            let mult = 0
            if (hasMilestone("sa", 12)) mult = 1
            if (hasMilestone("sa", 11)) {
                mult = mult * (Math.max(player.points.slog(), 2)/50)+1
                mult = mult * (Math.max(player.sa.minigamePoints.slog(), 1)/15)+1
                mult = mult * 1.8
            }
            if (hasMilestone("sa", 12)) mult = mult * 1.5
            if (hasUpgrade("sa", 24)) minigameinc = new Decimal(2)
            if (hasUpgrade("sa", 25)) minigameinc = new Decimal(10) 
            if (hasUpgrade("sa", 34)) minigameinc = new Decimal(12) 
            if (hasUpgrade("sa", 35)) minigameinc = new Decimal(25) 
            if (hasUpgrade("sa", 41)) minigameinc = new Decimal(50) 
            if (hasUpgrade("sa", 13)) {
                player.sa.baseUpdateFreq = new Decimal(0.90)
                expopow = new Decimal(1000000)
            }
            if (hasUpgrade("sa", 21)) {
                player.sa.baseUpdateFreq = new Decimal(0.75)
                expopow = new Decimal(10000000)
            }
            if (hasUpgrade("sa", 22)) {
                player.sa.baseUpdateFreq = new Decimal(0.6)
                expopow = new Decimal(40000000)
            }
            if (hasUpgrade("sa", 24)) {
                player.sa.baseUpdateFreq = new Decimal(0.5)
                expopow = new Decimal(500e6)
            }
            if (hasUpgrade("sa", 33)) {
                player.sa.baseUpdateFreq = new Decimal(0.25)
                expopow = new Decimal(1e18)
            }
            if (hasUpgrade("sa", 34)) {
                player.sa.baseUpdateFreq = new Decimal(0.2)
                expopow = new Decimal(1e28)
            }
            if (hasUpgrade("sa", 35)) {
                player.sa.baseUpdateFreq = new Decimal(0.1)
                expopow = new Decimal(1e49)
            }
            if (hasUpgrade("sa", 41)) {
                player.sa.baseUpdateFreq = new Decimal(0.05)
                expopow = new Decimal(1e111)
            }
            if (hasUpgrade("sa", 42)) {
                expopow = new Decimal("1e500")
            }
            if (hasUpgrade("sa", 43)) {
                expopow = new Decimal("1e11111")
            }
            if (hasUpgrade("sa", 44)) {
                expopow = new Decimal("e2e9")
            }
            if (hasMilestone("sa", 6)) {
                player.sa.baseUpdateFreq = new Decimal(0.05)
                egain = 1/200
            }
            if (hasMilestone("sa", 7)) {
                egain = 1/20
            }
            if (hasMilestone("sa", 8)) {
                egain = 1/4
            }
            if (hasMilestone("sa", 9)) {
                egain = 2
            }
            if (hasMilestone("sa", 10)) {
                egain = 200
            }
            if (hasMilestone("sa", 11)) {
                egain = 60000
            }
            player.sa.updateFreq = player.sa.updateFreq.sub(diff)
            if (player.sa.updateFreq.lt(0)) {
                player.sa.minigameNum = player.sa.minigameNum.pow(new Decimal(10).pow(expopow))
                player.sa.minigamePoints = player.sa.minigamePoints.add(minigameinc.mul(player.sa.minigamePtsMult))
                player[this.layer].minigameNum.layer = player[this.layer].minigameNum.layer + egain
                if (hasMilestone("sa", 12)) {
                    player[this.layer].minigameNum.layer = player[this.layer].minigameNum.layer * (1 + (0.000005 * mult / 20))
                }
                player.sa.updateFreq = player.sa.baseUpdateFreq
            }
        }
    },
    infoboxes: {
        main: {
            title: "Welcome to The Minigame Layer!",
            body() { return "This is a side layer. It is not needed to progress. The Minigame Layer in The Point Tree encompasses 8 rows of achievements, 30+ buttons, 6 parts, huge numbers, strategic manipulation, and MORE! Unlock new buttons from most achievements. The last achivement of rows 4-8 gives boosts. p.s. For Rows 1-3, order matters. You are not supposed to get all in order but when you can get them. Buttons from some achievements will be useful in other rows." },
        },
        r1: {
            title: "Row 1 is the 'Funny Number' row.",
            body() { return "haha funny number i.e. 69, 420. will only occur in row 1 achievements." },
        },
        r2: {
            title: "Row 2 is the start of the Big Numbers",
            body() { return "Woah! These are so big! Progressively gets bigger. Will go beyond TPT's ENDGAME in PF eventually." },
        },
        r3: {
            title: "Row 3 is the start of the Strategic Manipulation row.",
            body() { return "The first layer of the game, requires 10 Point Fragments. The start to big numbers." },
        },
        r4: {
            title: "Row 4",
            body() { return "Row 4 pushes the boundaries of earlier achievements with bigger numbers into the double-es! (10^10^x)" },
            unlocked() { return (hasAchievement('sa', 136))}
        },
        r5: {
            title: "Row 5",
            body() { return "Unlock a new currency that is used for only 1 upgrade. Some strategic manipulation, low numbers of 1e-1ex and higher numbers" },
            unlocked() { return (hasAchievement('sa', 146))}
        },
        r6: {
            title: "Row 6",
            body() { return "Adds Negative Numbers! Row 6 also has HUGE numbers of over eee8!" },
            unlocked() { return (hasAchievement('sa', 156))}
        },
        r7: {
            title: "Row 7",
            body() { return "The Least Button Presses Series continues, and is the finale of the Strategic Manipulation series." },
            unlocked() { return (hasAchievement('sa', 166))}
        },
        r8: {
            title: "Row 8 [Early, before 1,000,000 Minigame Points]",
            body() { return "Introduces Minigame Points, where it can be used to buy Minigame Upgrades together with Number. Unlocks boosts to buttons, passive generation, and more!" },
            unlocked() { return (hasAchievement('sa', 176))}
        },
        r9: {
            title: "Row 9",
            body() { return "There are only 4 new buttons here. Buttons now decrease your Minigame Point amount alot, you may have to keep your Minigame Points at a suitable level. The mag buttons will be the star of the show, pushing you from MU12 to MM8." },
            unlocked() { return (hasAchievement('sa', 186))}
        },
    },
})