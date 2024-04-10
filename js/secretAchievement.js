addLayer("sa", {
    startData() { return {
        unlocked: true,
    }},
    color: "#404040",
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Secret Achievements")
    },
    achievements: {
        rows: 4,
        cols: 6,
        11: {
            name: "The first one's always free.",
            done() {
                if (player.points.gte(0)) {
                    return true
                }
            },
            tooltip: "Free Secret Achievement",
        },
        12: {
            name: "Why don't you reset?",
            done() {
                 if (player.basic.best.lte(0)) {
                    if (player.points.gte(50)) {
                        return true
                    }
                 }
            },
            tooltip() {
                if (hasAchievement('sa', 12)) {
                    return "Req: 50 PF, without any best BP. (Reward: x1.05 PF)"
                }
                else {
                    return "reset. (Reward: x1.05 PF)"
                }
            },
        },
        13: {
            name: "Just reset already!",
            done() {
                 if(player.basic.best.lte(0)) {
                    if (player.points.gte(250)) {
                        return true
                    }
                 }
                },
            tooltip() {
                if (hasAchievement('sa', 13)) {
                    return "Req: 250 PF, without any best BP. (Reward: x1.05 PF, BP)"
                }
                else {
                    return "Getting angry (Reward: x1.05 PF, BP)"
                }
            },
        },
        14: {
            name: "You testing my patience, huh?",
            done() {
                 if(player.basic.best.lte(0)) {
                    if (player.points.gte(1000)) {
                        return true
                    }
                 }
                },
            tooltip() {
                if (hasAchievement('sa', 12)) {
                    return "Req: 1,000 PF, without any best BP. (Reward: x1.1 PF-BP)"
                }
                else {
                    return "Why. (Reward: x1.1 PF-BP)"
                }
            },
        },
        15: {
            name: "A long time",
            done() {
                 if(player.basic.best.lte(0)) {
                    if (player.points.gte(5000)) {
                        return true
                    }
                 }
                },
            tooltip() {
                if (hasAchievement('sa', 15)) {
                    return "Req: 5,000 PF, without any best BP. (Reward: x1.1 PF-BP, x1.05 RP)"
                }
                else {
                    return "Wait more (Reward: x1.1 PF-BP, x1.05 RP)"
                }
            },
        },
        16: {
            name: "Good luck. Getting this thing.",
            done() {
                 if(player.basic.best.lte(0)) {
                    if (player.points.gte(25000)) {
                        return true
                    }
                 }
                },
            tooltip() {
                if (hasAchievement('sa', 16)) {
                    return "Req: 25,000 PF, without any best BP. (Reward: x1.1 PF-RP)"
                }
                else {
                    return "no. (Reward: x1.1 PF-RP)"
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
            },
            tooltip() {
                if (hasAchievement('sa', 31)) {
                    return "Get 100K Mastery Points without completing the Mastery Challenge (Reward: x1.05 Mastery Points)"
                }
                else {
                    return "(Reward: x1.05 Mastery Points)"
                }
            },
        },
        32: {
            name: "Endgame [Changes Every Update]",
            done() {
                   if (player.points.gte("e5611000000")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 32)) {
                    return "Congrats! You have reached endgame at least once. (Reward: x1.05 Water, x1.02 SP)"
                }
                else {
                    return "Reach Endgame. (Reward: x1.05 Water, x1.02 SP)"
                }
            },
        },
        33: {
            name: "High Endgame [Changes Every Update]",
            done() {
                   if (player.points.gte("e5611222222")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 33)) {
                    return "Congrats! You have reached high endgame at least once. (Reward: x1.1 Water, x1.06 SP, x1.02 Mastery Points)"
                }
                else {
                    return "Reach High Endgame. (Reward: x1.1 Water, x1.06 SP, x1.02 Mastery Points)"
                }
            },
        },
        34: {
            name: "Absolute True Endgame [Changes Every Update]",
            done() {
                   if (player.points.gte("e5611360000")) {
                       return true
                   }
               },
            tooltip() {
                if (hasAchievement('sa', 34)) {
                    return "Congrats! You have reached Absolute True endgame at least once. (Reward: x1.25 Water, x1.15 SP, x1.07 Mastery Points)"
                }
                else {
                    return "Reach Absolute True Endgame. (Reward: x1.25 Water, x1.15 SP, x1.07 Mastery Points)"
                }
            },
        },
    tabFormat: [
        "blank", 
        "main-display",
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