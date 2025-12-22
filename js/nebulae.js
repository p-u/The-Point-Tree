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
        "Main tab (click to have the reset button)": {
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
        "Main tab  (click to have no reset button)": {
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
            description: "x5^ST Sparks. At e2222 Sparks, increase the base by 2. Add a further 1.5 to the base at e2500 Sparks. Unlock the Presses Mechanic in the Star layer, where you can hold to gain boosts on ALL stats (past, present and future)",
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
        15: {
            title: "oh youre still here?",
            description: "ok you finally got this upgrade, this actually took less time to get than the previous upgrade (1d19h vs 2d12h). Bad thing is, you will have to live with screenshake. Unlock the Screenshake option in 'Research Special Mults'. Hints for the secret Screenshake: Earthquake - need Ultra action mode, Scientific2 Notation and ????? ON. stop.: ()Theme, ()Notation and ????? OFF with Earthquake Action mode.<br> At 10^14,150 Nebulae, Nebulae boosts Galaxies more, and x14.15 Research.",
            cost: new Decimal("e14116"),
            unlocked() {return (hasMilestone("st", 26) && hasUpgrade("n", 14))},
            style() {return {
                'width': '175px',
            }},
        },
        21: {
            title: "you like this game. well...",
            description: "increase the 'Factory' buyable base by 2 for every Nebula Upgrade. Increase that by 0.1 for every 100 OOMs of Nebulae, until e30,250 Nebulae.",
            cost: new Decimal("e29433"),
            unlocked() {return (hasMilestone("st", 26) && hasUpgrade("n", 15))},
            style() {return {
                'width': '175px',
            }},
            effectDisplay() {
                return "+" + new Decimal(2).add(player.n.points.max("e29436").log10().sub(29436).min(814).div(1000)) + " to the base"
            }
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
        gain = gain.times(player.s.cmult)
	    if (hasUpgrade("st", 35)) gain = gain.times("e2500")
	    if (hasUpgrade("st", 43)) gain = gain.times("e800")
        gain = gain.times(buyableEffect("s", 14))
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