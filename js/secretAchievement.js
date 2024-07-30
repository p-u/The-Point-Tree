addLayer("sa", {
    startData() { return {
        unlocked: true,
        minigameNum: new Decimal(1),
        pdx: new Decimal(0)
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
                 if(options.formatE == "3") {
                    return true
                 }
                },
            tooltip() {
                if (hasAchievement('sa', 13)) {
                    return "Make formatE 3"
                }
                else {
                    return "Lower than e1,000"
                }
            },
        },
        14: {
            name: "I love long numbers!!",
            done() {
                if(options.formatE == "15") {
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
                   if (player.points.gte("e5.011135425235e19")) {
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
                   if (player.points.gte("e5.01113542524e19")) {
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
                   if (player.points.gte("e5.011135425243e19")) {
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
                   if (player.points.gte("e5.011135425246e19")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 35)) {
                    return "Congrats! You have reached Insanity True endgame at least once. This will be the best endgame tier! (Reward: x1.1 Era Crystals, x1.07 Mastery Points)"
                }
                else {
                    return "Reach Insanity True Endgame. (Reward: x1.1 Era Crystals, x1.07 Mastery Points)"
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
            name: "Reach the leet number",
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
            name: "Reach the ULTIMATE LEET Number",
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
        136: {
            name: "Reach 3.029679879579 [some buffer] (Extreme 01/07)",
            done() {
                if ((player.sa.minigameNum.gte(3.02967987)) && (player.sa.minigameNum.lte(3.02967988))) {
                    return true
                }
               },
            tooltip() {
                if (hasAchievement('sa', 136)) {
                    return "good job [Extreme 01]"
                }
                else {
                    return "Hint: 7 buttons [not including =1]"
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
                    return "grind starts"
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
                    return "long time, isn't it?"
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
                    return "passing EEs like nothing"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 143)) return true
            }
        },
        145: {
            name: "Even higher (ee200)",
            done() {
                   if (player.sa.minigameNum.gte("ee200")) {
                       return true
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
            name: "LAST ACHIEVEMENT WOW FOR MINIGAME (EE500)",
            done() {
                   if (player.sa.minigameNum.gte("ee500")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 146)) {
                    return "now get all titles [Reward: ^2 button!! and /7]"
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
                    return true
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
                    return true
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
                    return true
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
                    return true
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
            name: "Astronomical (ee70k)",
            done() {
                   if (player.sa.minigameNum.gte("ee70000")) {
                       return true
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
            name: "UTTER INSANITY (ee1.5M)",
            done() {
                   if (player.sa.minigameNum.gte("ee1.5e6")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 156)) {
                    return "stupidly insane [unlock: ^e250 button, x1.01 PF!!!! wow thats a lot of boosts!!]"
                }
                else {
                    return "who would grind this? [Extreme 07]"
                }
            },
            unlocked() { 
                if(hasAchievement("sa", 155)) return true
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
                if (player.sa.minigameNum.lt(0)) dis = "below negative?"
                if ((player.sa.minigameNum.gte(1.61803)) && (player.sa.minigameNum.lte(1.61804))) dis = "The Golden Ratio"
                if ((player.sa.minigameNum.gte(2.71828)) && (player.sa.minigameNum.lte(2.71829))) dis = "e"
                if ((player.sa.minigameNum.gte(3.14159)) && (player.sa.minigameNum.lte(3.1416))) dis = "pi"
                if (player.sa.minigameNum.eq(69)) dis = "nice"
                if (player.sa.minigameNum.eq(404)) dis = "404 ERROR"
                if (player.sa.minigameNum.eq(420)) dis = "not funny"
                if (player.sa.minigameNum.eq(666)) dis = "devil"
                if (player.sa.minigameNum.eq(777)) dis = "lucky"
                if (player.sa.minigameNum.eq(911)) dis = "what's your emergency?"
                if (player.sa.minigameNum.eq(1337)) dis = "leet"
                if (player.sa.minigameNum.eq(69420)) dis = "very nice"
                if (player.sa.minigameNum.eq(9223372036854775807)) dis = "if you know, you know."
                if (player.sa.minigameNum.gte("1e100")) dis = "Breaking bounds"
                if (player.sa.minigameNum.gte("1e10000")) dis = "Order of Exponentiating Magnitude"
                if (player.sa.minigameNum.gte("ee6")) dis = "Impressive."
                if (player.sa.minigameNum.gte("ee10")) dis = "Hyperion"
                if (player.sa.minigameNum.gte("ee15")) dis = "Insanity"
                if (player.sa.minigameNum.gte("e5.011135425235e19")) dis = "Past the Endgame"
                if (player.sa.minigameNum.gte("ee100")) dis = "Transcending"
                if (player.sa.minigameNum.gte("ee500")) dis = "Omega"
                if (player.sa.minigameNum.gte("ee2000")) dis = "Infinite"
                if (player.sa.minigameNum.gte("ee25000")) dis = "Èternal"
                if (player.sa.minigameNum.gte("ee150000")) dis = "Infinite Eternal"
                if (player.sa.minigameNum.gte("eee6")) dis = "Utter Infinite Eternal"
                if (player.sa.minigameNum.gte("eee7")) dis = "oNlY 1% oF pEoPlE cAn gEt ThIs!"
                if (player.sa.minigameNum.gte("eee8")) dis = "True No-Life"
                if (player.sa.minigameNum.gte("eee9")) dis = "Absolute True No-Life"
                if (player.sa.minigameNum.gte("ee4e9")) dis = "Another 5 more to go!"
                if (player.sa.minigameNum.gte("ee1e10")) dis = "Keep it up!"
                if (player.sa.minigameNum.gte("ee2.5e10")) dis = "Holy Heavens"
                if (player.sa.minigameNum.gte("ee5e10")) dis = "Transcending Eternity"
                if (player.sa.minigameNum.gte("ee7.5e10")) dis = "Meta-Reality"
                if (player.sa.minigameNum.gte("ee1e11")) dis = "Absolute True Insane Transcedental Meta-Reality"
                return dis
            },
            canClick() {return false},
        },
        12: {
            title(){
                title = notationChooser(player[this.layer].pdx) + " pdx"
                return title
            },
            display() { 
                dis = "A new feature, pdx, has appeared. PDX is gained by clicking the divide buttons. Some clickables needs you to stay below a certain pdx. /3 and /7: +1 pdx. /2: +3 pdx. /10: +10 pdx"
                return dis
            },
            unlocked() {return hasAchievement("sa", 151)},
            canClick() {return false},
        },
        21: {
            title: "+1",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.add(1)},
            onHold() {return player[this.layer].minigameNum = player[this.layer].minigameNum.add(1)}
        },
        22: {
            title: "x2",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.times(2)},
            onHold() {return player[this.layer].minigameNum = player[this.layer].minigameNum.times(2)}
        },
        23: {
            title: "=1",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = decimalOne
                player[this.layer].pdx = new Decimal(0)
            },
        },
        31: {
            title: "x69",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.times(69)},
            unlocked() {return hasAchievement("sa", 113)},
            onHold() {return player[this.layer].minigameNum = player[this.layer].minigameNum.times(69)}
        },
        32: {
            title: "x911",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.times(911)},
            unlocked() {return hasAchievement("sa", 116)},
            onHold() {return player[this.layer].minigameNum = player[this.layer].minigameNum.times(911)}
        },
        33: {
            title: "/3",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(3)
                player[this.layer].pdx = player[this.layer].pdx.add(1)
            },
            unlocked() {return hasAchievement("sa", 116)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(3)
                player[this.layer].pdx = player[this.layer].pdx.add(1)
            }
        },
        41: {
            title: "x10^10",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.times(1e10)},
            unlocked() {return hasAchievement("sa", 125)},
            onHold() {return player[this.layer].minigameNum = player[this.layer].minigameNum.times(1e10)}
        },
        42: {
            title: "x3",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.times(3)},
            unlocked() {return hasAchievement("sa", 126)},
            onHold() {return player[this.layer].minigameNum = player[this.layer].minigameNum.times(3)}
        },
        43: {
            title: "/2",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(2)
                player[this.layer].pdx = player[this.layer].pdx.add(3)
            },
            unlocked() {return hasAchievement("sa", 126)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(2)
            }
        },
        51: {
            title: "x10",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.times(10)},
            unlocked() {return hasAchievement("sa", 133)},
            onHold() {return player[this.layer].minigameNum = player[this.layer].minigameNum.times(10)}
        },
        52: {
            title: "^1.01",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1.01)},
            unlocked() {return hasAchievement("sa", 135)},
            onHold() {return player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1.01)}
        },
        53: {
            title: "^0.99",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.pow(0.99)},
            unlocked() {return hasAchievement("sa", 135)},
            onHold() {return player[this.layer].minigameNum = player[this.layer].minigameNum.pow(0.99)}
        },
        61: {
            title: "^1.1",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1.1)},
            unlocked() {return hasAchievement("sa", 143)},
            onHold() {return player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1.1)}
        },
        62: {
            title: "^2",
            canClick() {return true},
            onClick() {return player[this.layer].minigameNum = player[this.layer].minigameNum.pow(2)},
            unlocked() {return hasAchievement("sa", 146)},
            onHold() {return player[this.layer].minigameNum = player[this.layer].minigameNum.pow(2)}
        },
        63: {
            title: "/7",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(7)
                player[this.layer].pdx = player[this.layer].pdx.add(1)
            },
            unlocked() {return hasAchievement("sa", 146)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(7)
            }
        },
        71: {
            title: "/10",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(10)
                player[this.layer].pdx = player[this.layer].pdx.add(10)
            },
            unlocked() {return hasAchievement("sa", 151)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.div(10)
                player[this.layer].pdx = player[this.layer].pdx.add(10)
            }
        },
        72: {
            title: "^10",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.pow(10)
            },
            unlocked() {return hasAchievement("sa", 154)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.pow(10)
            }
        },
        73: {
            title: "^1e10",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1e10)
            },
            unlocked() {return hasAchievement("sa", 155)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1e10)
            }
        },
        74: {
            title: "^1e250",
            canClick() {return true},
            onClick() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1e250)
            },
            unlocked() {return hasAchievement("sa", 156)},
            onHold() {
                player[this.layer].minigameNum = player[this.layer].minigameNum.pow(1e250)
            }
        },
    },
})