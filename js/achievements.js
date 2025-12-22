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
    tooltip() {
        return player.a.achievements.length+"/"+(Object.keys(tmp.a.achievements).length-4) + " Achievements"
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
            tooltip: "Start generating Sparks",
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
        25: {
            name: "10B Research",
            done() { return (player.st.research.gte(1e10) && hasUpgrade("st", 15)) },
            tooltip: "+x0.5 Research",
            unlocked() {return hasUpgrade("st", 15)}
        },
        26: {
            name: "1T Research",
            done() { return (player.st.research.gte(1e12) && hasUpgrade("st", 15)) },
            tooltip: "+x0.5 Research",
            unlocked() {return hasUpgrade("st", 15)}
        },
        31: {
            name: "1Qd Research",
            done() { return (player.st.research.gte(1e15) && hasUpgrade("st", 15)) },
            tooltip: "+x0.5 Research",
            unlocked() {return hasUpgrade("st", 15)}
        },
        32: {
            name: "1Qn Research",
            done() { return (player.st.research.gte(1e18) && hasUpgrade("st", 15)) },
            tooltip: "+x0.5 Research",
            unlocked() {return hasUpgrade("st", 15)}
        },
        33: {
            name: "1Sp Research",
            done() { return (player.st.research.gte(1e24) && hasUpgrade("st", 15)) },
            tooltip: "+x0.5 Research",
            unlocked() {return hasUpgrade("st", 15)}
        },
        34: {
            name: "1De Research",
            done() { return (player.st.research.gte(1e33) && hasUpgrade("st", 15)) },
            tooltip: "+x0.5 Research",
            unlocked() {return hasUpgrade("st", 15)}
        },
        35: {
            name: "1e40 Research",
            done() { return (player.st.research.gte(1e40) && hasUpgrade("st", 15)) },
            tooltip: "+x0.5 Research",
            unlocked() {return hasUpgrade("st", 15)}
        },
        36: {
            name: "Star Tier 26",
            done() { return (player.st.points.gte(26)) },
            tooltip: "Wait, it takes THIS long? Unlock more achievements.",
            unlocked() {return hasUpgrade("st", 15)}
        },
        41: {
            name: "7 Factory Buyables",
            done() { return (getBuyableAmount("st", 12).gte(7) && hasAchievement("a", 36)) },
            tooltip: "+x0.5 Research",
            unlocked() {return hasAchievement("a", 36)}
        },
        42: {
            name: "70 Researcher Buyables",
            done() { return (getBuyableAmount("st", 11).gte(70) && hasAchievement("a", 36)) },
            tooltip: "+x0.5 Research",
            unlocked() {return hasAchievement("a", 36)}
        },
        43: {
            name: "1 Industry Buyables",
            done() { return (getBuyableAmount("st", 13).gte(1) && hasAchievement("a", 36)) },
            tooltip: "+x0.5 Research",
            unlocked() {return hasAchievement("a", 42)}
        },
        44: {
            name: "3 Industry Buyables",
            done() { return (getBuyableAmount("st", 13).gte(3) && hasAchievement("a", 36)) },
            tooltip: "+x0.5 Research",
            unlocked() {return hasAchievement("a", 43)}
        },
        45: {
            name: "6 Industry Buyables",
            done() { return (getBuyableAmount("st", 13).gte(6) && hasAchievement("a", 36)) },
            tooltip: "+x0.5 Research",
            unlocked() {return hasAchievement("a", 44)}
        },
        46: {
            name: "10 Industry Buyables",
            done() { return (getBuyableAmount("st", 13).gte(10) && hasAchievement("a", 36)) },
            tooltip: "+x0.5 Research",
            unlocked() {return hasAchievement("a", 45)}
        },
        51: {
            name: "Unsearch - Get negative research, somehow.",
            done() { return (player.st.research.lt(0)) },
            tooltip: "+x0.5 Research + ONLY THIS ACHIEVEMENT: x15 Research",
            unlocked() {return hasAchievement("a", 36)}
        },
        52: {
            name: "Unfinity - Get negative Infinity (2^1024) research, somehow.",
            done() { return (player.st.research.lt(new Decimal(2).pow(1024).mul(-1))) },
            tooltip: "+x0.5 Research",
            unlocked() {return hasAchievement("a", 51)}
        },
        53: {
            name: "1.5e327 Research [34/40]",
            done() { return (player.st.research.gte("1.5e327")) },
            tooltip: "Stellar Evo v0.85 Endgame/Unlock the Madness Challenge",
            unlocked() {return hasUpgrade("st", 55)}
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