addLayer("sa", {
    startData() { return {
        unlocked: true,
        minigameNum: new Decimal(1)
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
                ["clickables", [1, 2, 3, 4, 5, 6, 7, 8]],
                "blank",
                "blank",
                ["achievements", [11, 12, 13, 14, 15, 16, 17]],
            ],
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
            name: "I hate long numbers!",
            done() {
                 if(player.formatE == "3") {
                    return true
                 }
                },
            tooltip() {
                if (hasAchievement('sa', 13)) {
                    return "Make formatE 6"
                }
                else {
                    return "Lower than e1,000,000"
                }
            },
        },
        14: {
            name: "I love long numbers!!",
            done() {
                if(player.formatE == "15") {
                   return true
                }
               },
           tooltip() {
               if (hasAchievement('sa', 14)) {
                   return "Make formatE 15"
               }
               else {
                   return "I can deal with e787,392,693,204!"
               }
           },
        },
        15: {
            name: "a challenge",
            done() {
                if(player.dp = -1) {
                   return true
                }
               },
           tooltip() {
               if (hasAchievement('sa', 15)) {
                   return "Make dp (showdp) 1"
               }
               else {
                   return "e1.1e111"
               }
           },
        },
        16: {
            name: "Best combo ever",
            done() {
                 if((player.dp = 12) && (player.formatE = "3")) {
                    return true
                 }
                },
            tooltip() {
                if (hasAchievement('sa', 16)) {
                    return "showdp 14 and formatE 3"
                }
                else {
                    return "e8.284927582940e3 Sacrifices"
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
            name: ".--- ..- ... - / --. . - / ... ..- .--. .-. . -- .",
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
                },
            tooltip() {
                if (hasAchievement('sa', 32)) {
                    return "Get e29,245,225e6 PF before Era 1 (Reward: x1.03 Era Crystals)"
                }
                else {
                    return "It is also High Endgame in v2.5! (Reward: x1.03 Era Crystals)"
                }
            },
        },
        33: {
            name: "Endgame [Changes Every Update]",
            done() {
                   if (player.points.gte("e1.3294765716e18")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 33)) {
                    return "Congrats! You have reached endgame at least once. (Reward: x1.2 Water and SP)"
                }
                else {
                    return "Reach Endgame. (Reward: x1.2 Water and SP)"
                }
            },
        },
        34: {
            name: "High Endgame [Changes Every Update]",
            done() {
                   if (player.points.gte("e1.32947657162222e18")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 34)) {
                    return "Congrats! You have reached high endgame at least once. (Reward: x1.03 Era Crystals, x1.01 Mastery Points)"
                }
                else {
                    return "Reach High Endgame. (Reward: x1.03 Era Crystals, x1.01 Mastery Points)"
                }
            },
        },
        35: {
            name: "Absolute True Endgame [Changes Every Update]",
            done() {
                   if (player.points.gte("e1.32947657164e18")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 35)) {
                    return "Congrats! You have reached Absolute True endgame at least once. (Reward: x1.05 Era Crystals, x1.03 Mastery Points)"
                }
                else {
                    return "Reach Absolute True Endgame. (Reward: x1.05 Era Crystals, x1.03 Mastery Points)"
                }
            },
        },
        36: {
            name: "Insanity True Endgame [Changes Every Update]",
            done() {
                   if (player.points.gte("e1.329476571655e18")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 35)) {
                    return "Congrats! You have reached Insanity True endgame at least once. This will be the best endgame tier! (Reward: x1.1 Era Crystals, x1.07 Mastery Points)"
                }
                else {
                    return "Reach Absolute True Endgame. (Reward: x1.1 Era Crystals, x1.07 Mastery Points)"
                }
            },
        },
        111: {
            name: "Reach the nice number",
            done() {
                   if (player.sa.minigameNum.eq(69)) {
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
            name: "Reach the NSFW number",
            done() {
                   if (player.sa.minigameNum.eq(1337)) {
                       return true
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
                   if (player.sa.minigameNum.eq(69420)) {
                       return true
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
                   if (player.sa.minigameNum.eq(9001)) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 114)) {
                    return "funny?"
                }
                else {
                    return "one above it"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 113)) return true
            }
        },
        115: {
            name: "Reach the Insanity Number (10^69)",
            done() {
                   if (player.sa.minigameNum.eq(1e69)) {
                       return true
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
            name: "Reach the ULTIMATE NSFW Number",
            done() {
                   if ((player.sa.minigameNum.gte("9.99e1336")) && (player.sa.minigameNum.lte("1.01e1337"))) {
                       return true
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
                    return "straightforward"
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
                    return "straightforward"
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
                    return "straightforward"
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
                    return "straightforward"
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
                    return "straightforward"
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
                    return "straightforward"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 125)) return true
            }
        },
        131: {
            name: "Reach 0.6328125",
            done() {
                   if (player.sa.minigameNum.eq(0.6328125)) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 131)) {
                    return "good job [1/5 HARD]"
                }
                else {
                    return "how do you get below 1??"
                }
            },
        },
        132: {
            name: "Reach 0.134765625",
            done() {
                   if (player.sa.minigameNum.eq(0.134765625)) {
                       return true
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
                   if (player.sa.minigameNum.eq(446.34375)) {
                       return true
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
                    return true
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
                    return true
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
        141: {
            name: "Even higher (e1M)",
            done() {
                   if (player.sa.minigameNum.gte("ee6")) {
                       return true
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
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 142)) {
                    return "supremely big"
                }
                else {
                    return "straightforward"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 141)) return true
            }
        },
        143: {
            name: "Even higher (e1 Qt)",
            done() {
                   if (player.sa.minigameNum.gte("ee18")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 143)) {
                    return "very insanely big (Reward: Unlock ^1.1 button)"
                }
                else {
                    return "straightforward"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 142)) return true
            }
        },
        144: {
            name: "Even higher (ee75)",
            done() {
                   if (player.sa.minigameNum.gte("ee75")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 144)) {
                    return "breaking bounds"
                }
                else {
                    return "straightforward"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 143)) return true
            }
        },
        145: {
            name: "Even higher (ee250)",
            done() {
                   if (player.sa.minigameNum.gte("ee250")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 145)) {
                    return "breaking bounds"
                }
                else {
                    return "straightforward"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 144)) return true
            }
        },
        146: {
            name: "LAST ACHIEVEMENT WOW FOR MINIGAME (EE1,000)",
            done() {
                   if (player.sa.minigameNum.gte("ee1000")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 146)) {
                    return "now get all titles [Reward: ^2 button!! and ^0.1]"
                }
                else {
                    return "straightforward"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 145)) return true
            }
        },
    },
    clickables: {
        11: {
            title(){
                title = formatWhole(player[this.layer].minigameNum)
                return title
            },
            display() { dis = ""
                if (player.sa.minigameNum.eq(0)) dis = "how"
                if (player.sa.minigameNum.lt(0)) dis = "below negative?"
                if (player.sa.minigameNum.eq(69)) dis = "nice"
                if (player.sa.minigameNum.eq(420)) dis = "not funny"
                if (player.sa.minigameNum.eq(69420)) dis = "very nice"
                if (player.sa.minigameNum.gte("1e100")) dis = "Breaking bounds"
                if (player.sa.minigameNum.gte("1e10000")) dis = "Order of Exponentiating Magnitude"
                if (player.sa.minigameNum.gte("ee6")) dis = "Impressive."
                if (player.sa.minigameNum.gte("ee10")) dis = "Hyperion"
                if (player.sa.minigameNum.gte("ee15")) dis = "Insanity"
                if (player.sa.minigameNum.gte("ee100")) dis = "Transcending"
                if (player.sa.minigameNum.gte("ee500")) dis = "Omega"
                if (player.sa.minigameNum.gte("ee2000")) dis = "Infinite"
                if (player.sa.minigameNum.gte("ee25000")) dis = "Èternal"
                if (player.sa.minigameNum.gte("ee150000")) dis = "Infinite Eternal"
                if (player.sa.minigameNum.gte("eee6")) dis = "oNlY 1% oF pEoPlE cAn gEt ThIs!"
                if (player.sa.minigameNum.gte("eee7")) dis = "True No-Life"
                if (player.sa.minigameNum.gte("eee8")) dis = "Absolute True No-Life"
                if (player.sa.minigameNum.gte("eee10")) dis = "CHEATER!!"
                return dis
            },
            canClick() {return false},
        },
        21: {
            title: "+1",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.add(1)},
        },
        22: {
            title: "x2",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.times(2)},
        },
        23: {
            title: "=1",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = decimalOne},
        },
        31: {
            title: "x69",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.times(69)},
            unlocked() {return hasAchievement("sa", 113)}
        },
        32: {
            title: "x911",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.times(911)},
            unlocked() {return hasAchievement("sa", 116)}
        },
        33: {
            title: "/3",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.div(3)},
            unlocked() {return hasAchievement("sa", 116)}
        },
        41: {
            title: "x10^10",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.times(1e10)},
            unlocked() {return hasAchievement("sa", 123)}
        },
        42: {
            title: "x3",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.times(3)},
            unlocked() {return hasAchievement("sa", 126)}
        },
        43: {
            title: "/2",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.div(2)},
            unlocked() {return hasAchievement("sa", 126)}
        },
        51: {
            title: "x10",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.times(10)},
            unlocked() {return hasAchievement("sa", 133)}
        },
        52: {
            title: "^1.01",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1.01)},
            unlocked() {return hasAchievement("sa", 135)}
        },
        53: {
            title: "^0.99",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.pow(0.99)},
            unlocked() {return hasAchievement("sa", 135)}
        },
        61: {
            title: "^1.1",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1.1)},
            unlocked() {return hasAchievement("sa", 143)}
        },
        62: {
            title: "^2",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.pow(2)},
            unlocked() {return hasAchievement("sa", 145)}
        },
        63: {
            title: "^0.1",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.pow(0.1)},
            unlocked() {return hasAchievement("sa", 145)}
        },
    },
})