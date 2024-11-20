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
    tabFormat: {
        "Achievements": {
            content: [
                ["display-text", function() { return "Achievements: "+player.a.achievements.length+"/"+(Object.keys(tmp.a.achievements).length-4) }],
                ["achievements", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]],
                "blank",
                ],
        },
        "Playtime Milestones": {
            content: [
                "milestones"
            ],
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
    },
    achievements: {
        rows: 40,
        cols: 6,
        11: {
            name: "Test Milestone",
            done() { return player.points.gte(10) },
            tooltip: "Get Basic Upgrade 1.",
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