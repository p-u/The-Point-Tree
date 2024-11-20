addLayer("i", {
    startData() { return {
        unlocked: true,
    }},
    color: "blue",
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Info")
    },
    tabFormat: {
        "Main": {
            content: [
                ["infobox", "main"],
                "blank",
                "blank",
                ["infobox", "ns"],
                "blank",
                "blank",
                ["infobox", "ach"],
                "blank",
                "blank",
                ["infobox", "upgrade"],
                "blank",
                "blank",
                ["infobox", "milestone"],
            ],
        },
    },
    infoboxes: {
        main: {
            title: "Welcome to The Point Tree!",
            body() { return "Explore many unique upgrades, and get the biggest numbers possible! In this game, you will go through many different layers, unlock new and unique features like upgrades, milestones and buyables. Please visit this layer often." },
        },
        ach: {
            title: "Achievements [Ach]",
            body() { return "Achievements give you a sense of progress. Every row of the achievements means a new stage. Achievements can have rewards. Red-bordered achievements unlock more achievements. Thick red-bordered achievements unlock a new ????" },
        },
        ns: {
            title: "Naming System",
            body() { return "In every layer, there may or may not be one (or two) letters to identify the layer. This is given in the layer infobox. U stands for Upgrades, M stands for Milestones, B stands for buyables. In a milestone, the naming is just [Layer]M[MS#]. However, things get complicated in upgrades. First upgrades may say the upgrade number, while later upgrades will say [Layer]U[Row][Column]. Same goes with achievements. (Ach [Row][Column])" },
        },
        upgrades: {
            title: "Upgrades",
            body() { return "Upgrades are basically a broad class that only can be bought once, and gives a boost. It could be static (x), to effects, non-static, power (^), or boosts to later features" },
        },
    },
}, 
)