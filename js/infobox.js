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
                ["infobox", "ach"],
                "blank",
                "blank",
                ["infobox", "milestone"],
                "blank",
                "blank",
                ["infobox", "ext"],
                "blank",
                "blank",
                ["infobox", "passive"],
                "blank",
                "blank",
                ["infobox", "keep"],
                "blank",
                "blank",
                ["infobox", "cap"],
                "blank",
                "blank",
                ["infobox", "buyable"],
                "blank",
                "blank",
                ["infobox", "challenge"],
            ],
        },
        "Basic Layer": {
            content: [
                ["infobox", "basic"],
                "blank",
                "blank",
                ["infobox", "NSU"],
            ],
        },
        "Rebirth Layer": {
            unlocked() { return player.rebirth.points.gte(1)},
            content: [
                ["infobox", "reb"],
            ],
        },
        "Prestige Layer": {
            unlocked() { return player.prestige.points.gte(1)},
            content: [
                ["infobox", "pres"],
            ],
        },
        "Mega Layer": {
            unlocked() { return player.mega.points.gte(1)},
            content: [
                ["infobox", "mega"],
            ],
        },
        "Sacrifice and Energy Layer": {
            unlocked() { return player.sac.points.gte(1)},
            content: [
                ["infobox", "sac"],
                "blank",
                "blank",
                ["infobox", "energy"],
                "blank",
                "blank",
                ["infobox", "dimshift"],
            ],
        },
        "Supreme and Water Layer": {
            unlocked() { return player.s.points.gte(1)},
            content: [
                ["infobox", "supreme"],
                "blank",
                "blank",
            ],
        },
    },
    infoboxes: {
        main: {
            title: "Welcome to The Point Tree!",
            body() { return "Explore many unique upgrades, and get the biggest numbers possible! In this game, you will go through many different layers, unlock new and unique features like upgrades, milestones and buyables. Please visit this layer often." },
        },
        ach: {
            title: "Achievements",
            body() { return "Achievements give you a sense of progress. Every row of the achievements means a new stage. Achievements can have rewards." },
        },
        basic: {
            title: "The Basic layer",
            body() { return "The first layer of the game, requires 10 Point Fragments. The start to big numbers." },
        },
        NSU: {
            title: "Non-static Upgrades",
            body() { return "Upgrade 2 and 3 is the first of the upgrades that changes by a currency" },
            unlocked() { return (hasUpgrade('basic', 11))}
        },
        reb: {
            title: "The rebirth Layer",
            body() { return "More numbers to achieve. Focus on getting the first milestone! Rebirth Points (RP) also boost Point Fragments (PF). Softcaps ^0.35 at xe1500 (exponent can be increased). Supercaps a further ^0.4 at xe100,000" },
            unlocked() { return (hasUpgrade('basic', 34))}
        },
        ext: {
            title: "Extensions",
            body() { return "The first extension is at Rebirth Milestone 1. This adds new upgrades to previous layers" },
            unlocked() { return (hasUpgrade('basic', 34))}
        },
        passive: {
            title: "Passive Generation",
            body() { return "At 20 RP, Passive Generation is unlocked." },
            unlocked() { return (hasMilestone('rebirth', 2))}
        },
        milestone: {
            title: "Milestones",
            body() { return "Milestones are like upgrades, but they do not take away your currency." },
            unlocked() { return (hasMilestone('rebirth', 1))}
        },
        keep: {
            title: "Keeping Upgrades",
            body() { return "At 100 RP, Upgrade Keeping is unlocked. This allows you to click less for a new layer." },
            unlocked() { return (hasMilestone('rebirth', 3))}
        },
        cap: {
            title: "Softcaps and Supercaps",
            body() { return "Softcaps and Supercaps nerfs the boost. There are upgrades to reduce the nerf." },
            unlocked() { return player.rebirth.points.gte(new Decimal(1))}
        },
        pres: {
            title: "Prestige Layer",
            body() { return "In here, you can get numbers up to e1,500! For now, choose whether you want to buy the upgrade. Prestige effect softcaps at xe6,500 and supercaps at xe1M." },
            unlocked() { return player.prestige.points.gte(new Decimal("1"))}
        },
        mega: {
            title: "Mega Layer",
            body() { return "Legend says that this layer is super OP. Effect: multiplies all previous layers. Caps at e30,000, with a ^0.3" },
            unlocked() { return player.mega.points.gte(new Decimal("1"))}
        },
        buyable: {
            title: "About Buyables",
            body() { return "Buyables are a way to gain boosts, but unlike upgrades, they can be bought more than one time." },
            unlocked() { return (hasUpgrade('mega', 33))}
        },
        sac: {
            title: "Sacrifice Layer",
            body() { return "Sacrifice is the first static layer, which means that the price will change based on how many sacrifices you have. Anyways, this is the MOST OP Layer, and it is used to provide insane boosts." },
            unlocked() { return player.sac.points.gte(new Decimal("1"))}
        },
        dimshift: {
            title: "Dimensional Shift",
            body() { return "At 15 Sacrifices, you will unlock a new row of upgrades [Row 5]. This is the most OP row." },
            unlocked() { return player.sac.points.gte(new Decimal("10"))}
        },
        energy: {
            title: "Energy Layer",
            body() { return "Energy is the first resource that can be passively generated by its own. This layer boosts Point Fragments immensely!" },
            unlocked() { return player.e.points.gte(new Decimal("1"))}
        },
        challenge: {
            title: "Challenges",
            body() { return "Challenges nerfs progression by a few ways. It also gives unique challenge-specific upgrades which only can be bought in that challenge. Method 1: ^x of a particular currency. x is lower than 1. Method 2: Nerfing upgrade boost, or even removing it entirely. Method 3: [Most Time Consuming] Disabling passive generation and/or automation." },
            unlocked() { return player.sac.points.gte(new Decimal("20"))}
        },
        supreme: {
            title: "The SUPREME Layer",
            body() { return "Remember the MEGA LAYER? It is OP, alright. But, this requires e82,500 Mega Points to unlock. That's how OP it is! And, sacrifice milestones will not come every 1 sac." },
            unlocked() { return player.s.points.gte(new Decimal("1"))}
        },
        water: {
            title: "The Water Layer",
            body() { return "Basically, a more advanced version of energy. Boosts energy." },
            unlocked() { return player.w.points.gte(new Decimal("1"))}
        },
    },
}, 
)