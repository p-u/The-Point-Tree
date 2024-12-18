addLayer("ma", {
    name: "Matter", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        MResetTime: 0,
    }},
    layerShown(){
        let visible = false
        if (hasUpgrade('en', 45) || player.ma.unlocked) visible = true
       return visible
     },
    tabFormat: {
        "Main tab": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                "milestones",
                "blank",
                "blank",
                "upgrades",
                "blank",
                "blank",
                ["infobox", "mat"],
            ],
        },
    },
    color: "#0F52BA",
    requires: new Decimal(500000000), // Can be a function that takes requirement increases into account
    resource: "Matter", // Name of currency
    baseResource: "Atoms", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    upgrades: {
        11: {
            title: "The Matter layer",
            description: "x3 Power, x2 Energy",
            cost: new Decimal(1),
        },
        12: {
            title: "Boosts all around",
            description: "x1.5 Gen 3 and 4 generation, x4 Atoms",
            cost: new Decimal(2),
        },
        13: {
            title: "Five",
            description: "^1.05 Atoms, +^0.05 Energy, x1.5 Gen 1,5 generation",
            cost: new Decimal(8),
        },
        14: {
            title: "Next.",
            description: "x8 Atoms, x2 Gen 2 production",
            cost: new Decimal(60),
        },
    },
    milestones: {
        1: {
            requirementDescription: "2 total Matter",
            effectDescription: "Generate 2.5% of energy on reset a sec",
            done() { return player.ma.total.gte(2) }
        },
        2: {
            requirementDescription: "5 total Matter",
            effectDescription: "x4 Energy Passive Generation, x2.5 Power, unlock more energy upgrades",
            done() { return player.ma.total.gte(5) }
        },
        3: {
            requirementDescription: "30 total Matter",
            effectDescription: "x3.0 Power",
            done() { return player.ma.total.gte(30) }
        },
    },
    infoboxes: {
        mat: {
            title: "Matter",
            body() { return "You did your first reset! All of your hard-earned progress, generators, energy and atoms, are just wiped. However, it unlocks new upgrades, and a new layer with more features. Enter Milestones, where total Matter is used, and it gives boosts without spending any of your Matter!" },
        },
    },
    setRT() {
        if ((player.ma.points.gte(1)) && (player.ma.MResetTime == 0)) {
            player.ma.MResetTime = player.timePlayed
        }
    },
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    effect(){
        let effectBoost = 1.7
        let eff = player.ma.points.add(1).pow(effectBoost)
        return eff
    },
    effectDescription() {
        let softcapDescription = ""
        let layerEffect = tmp[this.layer].effect
        let des = "which is boosting atoms by x" + notationChooser(layerEffect) + softcapDescription
        return des;
    },
    branches: ["en"], 
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset to gain Matter", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
})