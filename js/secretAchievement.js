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
                 if(player.basic.best.lte(0)) {
                    if (player.points.gte(100)) {
                        return true
                    }
                 }
            },
            tooltip: "reset.",
        },
        13: {
            name: "Just reset already!",
            done() {
                 if(player.basic.best.lte(0)) {
                    if (player.points.gte(1000)) {
                        return true
                    }
                 }
                },
            tooltip: "Getting angry (Reward: x1.1 PF)",
        },
        14: {
            name: "You testing my patience, huh?",
            done() {
                 if(player.basic.best.lte(0)) {
                    if (player.points.gte(5000)) {
                        return true
                    }
                 }
                },
            tooltip: "Why. (Reward: x1.05 PF-RP)",
        },
        15: {
            name: "free 6hr playtime",
            done() {
                 if(player.basic.best.lte(0)) {
                    if (player.points.gte(21600)) {
                        return true
                    }
                 }
                },
            tooltip: "Yay! Extra 6 hrs of playtime (Reward: x1.1 PF-PP)",
        },
        16: {
            name: "Good luck. Getting this thing. You can rebirth.",
            done() {
                 if(player.basic.best.lte(0)) {
                    if (player.points.gte(50000000)) {
                        return true
                    }
                 }
                },
            tooltip: "no. (Reward: x1.1 PF-Water)",
        },
        21: {
            name: "no rebirth basic",
            done() {
                 if(player.rebirth.best.lte(0)) {
                    if (player.points.gte(1e9)) {
                        return true
                    }
                 }
                },
            tooltip: "no rebirth get point (Reward: x1.2 RP)",
        },
        22: {
            name: "no rebirth rebirth",
            done() {
                 if(player.rebirth.best.lte(0)) {
                    if (player.points.gte(1e10)) {
                        return true
                    }
                 }
                },
            tooltip: "=XReb (Reward: x2 RP)",
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
            tooltip: "e78000 point fragments. (Reward: x1.1 MP)",
        },
        24: {
            name: "It's just e250 higher. What's the big deal?",
            done() {
                if (!(hasChallenge('sac', 13))) {
                    if (inChallenge("sac", 13)) {
                        if (player.points.gte("e191000")) {
                            return true
                        }
                    }
                 }
                },
            tooltip: "soCmething3. (Reward: x1.1 Energy)",
        },
        25: {
            name: "dont get last layer",
            done() {
                if(player.s.best.lte(1)) {
                   if (player.points.gte("e152980000")) {
                       return true
                   }
                }
               },
           tooltip: "no supreme just stall (Reward: x1.05 SP)",
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
           tooltip: "(Reward: x1.05 SP)",
        },
        31: {
            name: "True Endgame [Changes Every Update]",
            done() {
                   if (player.points.gte("e511400000")) {
                       return true
                   }
               },
           tooltip: "Absolute Endgame (Reward: x1.1 SP)",
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