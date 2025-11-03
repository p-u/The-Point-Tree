addLayer("a", {
    startData() { return {
        unlocked: true,
        lrstars: new Decimal(0),
        timestars: 0,
        timeSinceLastReset: 0,
        csps: new Decimal(0),
        tSLRG: 0,
        timegal: 0,
        cgps: new Decimal(0),
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
    },
    achievements: {
        rows: 40,
        cols: 6,
        11: {
            name: "The Start",
            done() { return hasUpgrade("s", 11) },
            tooltip: "Start generating atoms",
        },
        12: {
            name: "A Tier!",
            done() { return hasMilestone("st", 1) },
            tooltip: "Get Star Tier 1.",
        },
        13: {
            name: "4 Tiers! -> Passive Generation",
            done() { return hasMilestone("st", 4) },
            tooltip: "Get Star Tier 4.",
        },
        14: {
            name: "New reset layer!",
            done() { return player.g.points.gte(1) },
            tooltip: "Get 1 Galaxy.",
        },
        15: {
            name: "A ray of light",
            done() { return player.points.gte(1e33) },
            tooltip: "Get 1De Sparks.",
        },
        16: {
            name: "Galaxy Supercluster",
            done() { return player.g.points.gte(1e15) },
            tooltip: "Get 1Qa Galaxies.",
        },
        21: {
            name: "Decka-Tier",
            done() { return player.st.points.gte(10) },
            tooltip: "Get Star Tier 10!",
        },
        22: {
            name: "The next reset...",
            done() { return player.n.points.gte(1) },
            tooltip: "Star Tier 15's reset layer",
        },
        23: {
            name: "Hypera-Tier",
            done() { return player.st.points.gte(20) },
            tooltip: "Get Star Tier 20!",
        },
        24: {
            name: "aTt5earS2i",
            done() { return player.st.points.gte(25) },
            tooltip: "Oh no this is breaking faster than expected",
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