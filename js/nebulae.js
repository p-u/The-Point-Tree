addLayer("n", {
    name: "Nebulae", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    exponent() {
        if (!hasUpgrade("n", 11)) return 0.00000001
        if (hasUpgrade("n", 11)) return 0.01
    }, // Prestige currency exponent
    color: "pink",
    requires: new Decimal("1e960"), // Can be a function that takes requirement increases into account
    resource: "Nebulae", // Name of currency
    baseResource: "Sparks", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    tabFormat: {
        "Main tab": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                "milestones",
                "blank",
                "upgrades",
                "blank",
                "blank",
                ["infobox", "main"],
            ],
            unlocked() {return (!hasUpgrade("n", 11))}
        },
        "Main tab.": {
            content: [
                "main-display",
                "blank",
                "milestones",
                "blank",
                "upgrades",
                "blank",
                "blank",
                ["infobox", "main"],
            ],
            unlocked() {return (hasUpgrade("n", 11))}
        },
    },
    passiveGeneration() {
        if (hasUpgrade("n", 11)) return 0.0001
        return 0
    },
    upgrades: {
        11: {
            title: "The great reset. [24/40]",
            description: "^1.01 Sparks gain, Star Tier 12's effect also applies at e700, e900, e1000, e1200, e1500, e1750 Sparks. x100 Galaxies, Stars, Sparks, generate 1% of Galaxies and Stars/sec. When buying Increasers, buy max them and they don't reduce currency. [RE-CLICK ON THE TABS TO GET THE RESET BUTTON]",
            cost: new Decimal(1),
        },
        12: {
            title: "Star Tier xXx Sparks [25/40]",
            description: "x5^ST Sparks. At e2222 Sparks, increase the base by 2. Add a further 1.5 to the base at e2500 Sparks.",
            cost: new Decimal(200e9),
        },
        13: {
            title: "How good is that upgrade going to be? [27/40]",
            description: "'Delayed boostage' is stronger but divide stars. Half the nerf at 1.5e91 Nebulae, and +^0.01 Stars at 5e97 Nebulae.",
            cost: new Decimal(1e84),
            unlocked() {return (hasMilestone("st", 18) && hasUpgrade("n", 12))}
        },
        14: {
            title: "another insane bump",
            description: "You can buy max the Nebula Increaser, and the base of Nebula Up. 2 is now ST^ST. also intended 60hr timewall... (then again)",
            cost: new Decimal("2.782e2782"),
            unlocked() {return (hasMilestone("st", 23) && hasUpgrade("n", 13))}
        },
    },
    infoboxes: {
        main: {
            title: "The Nebula(e) reset layer",
            body() { return "Wait, it is Nebula or Nebulae? These two terms will be used interchangeably. Nebulae is the second-to-last reset layer. The first reset automates Nebulae, and gives an OP boost to all previous currencies including max-buying Buyables! However, the first reset of Nebulae (to get the first upgrade) resets ALL currencies including Galaxies and Star Tier! With some upgrades, Nebulae boosts many currencies." },
        },
    },
    gainMult() { // Energy
        let gain = new Decimal(1)
	    if (hasMilestone("st", 17)) gain = gain.times(17)
        if (hasUpgrade("s", 43)) gain = gain.times(upgradeEffect("s", 43))
        if (hasMilestone("st", 19)) gain = gain.times(new Decimal(1.2).pow(player.st.points))
        return gain
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (player.n.points.gte(new Decimal(2).pow(1024))) exp = exp.add(0.01)
        return exp
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    branches: ["st", "s", "g"],
    layerShown(){
        let visible = false
        if (hasMilestone('st', 15) || player.n.unlocked || player["n"].points.gte(1)) visible = true
       return visible
    },
})