addLayer("mo", {
    name: "Molecules", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MO", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        molecule: new Decimal(0),
        MResetTime: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasMilestone("cf", 1)) visible = true
       return visible
     },
    tabFormat: {
        "Main tab": {
            content: [
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `You have resetted for a total of
                        <h2><span style="color: #A3D5FF; text-shadow: 0px 0px 10px #FFFFFF; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.mo.points)}</span></h2> Molecules, which multiplies Matter gain by `
                        a = a + notationChooser(tmp[this.layer].effect) + "x."
                        return a
                    }
                ],
                "blank",
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `You have 
                        <h2><span style="color: #A3D5FF; text-shadow: 0px 0px 10px #FFFFFF; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.mo.molecule)}</span></h2> Molecules (+`
                        a = a + notationChooser(player.mo.points.div(10)) + "/s)"
                        return a
                    }
                ],
                "blank",
                "blank",
                "prestige-button",
                "blank",
                "milestones",
                "blank",
                "blank",
                "upgrades",
                "blank",
                "blank",
                ["infobox", "mol"],
            ],
        },
    },
    color: "#A3D5FF",
    requires: new Decimal(1e150), // Can be a function that takes requirement increases into account
    resource: "Molecules", // Name of currency
    baseResource: "Atoms", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.03, // Prestige currency exponent
    infoboxes: {
        mol: {
            title: "Molecules",
            body() { return "The second layer. Molecules resets all previous progress, but don't fret, Click Mastery and Achievements stay! Molecule Milestone 1 is OP, cherish that! Gain molecules a second based on your total resetted molecules / 10. This is a big step in your journey to grow the world. Oh, and also, Molecules boost Matter gain." },
        },
    },
    milestones: {
        1: {
            requirementDescription: "1 total resetted molecules",
            effectDescription: "Generate 10% of Energy reset and 1% of Matter reset a sec!",
            done() { return player.mo.total.gte(1) }
        },
        2: {
            requirementDescription: "4 total resetted molecules [VERY OP]",
            effectDescription: "Gen 2's boost also boosts Power gain (Requires Generator² Upgrade).",
            unlocked() { return hasMilestone("mo", 1)},
            done() { return player.mo.total.gte(4) }
        },
    },
    upgrades: {
        11: {
            title: "U1: Basic Bonding",
            description: "Double Energy, Atom and x1.5 Click Mastery Gain",
            cost: new Decimal(5),
            currencyDisplayName: "Molecules",
            currencyInternalName: "molecule",
            currencyLayer: "mo",
        },
        12: {
            title: "U2: Stronger Bonds",
            description: "Triple Energy, Atom and Matter Gain",
            cost: new Decimal(12),
            currencyDisplayName: "Molecules",
            currencyInternalName: "molecule",
            currencyLayer: "mo",
            unlocked() { return hasUpgrade("mo", 11) }, 
        },
        13: {
            title: "U3: Industry",
            description: "x4 Power, ^1.04 Power, Buy Max Gen 4",
            cost: new Decimal(27.5),
            currencyDisplayName: "Molecules",
            currencyInternalName: "molecule",
            currencyLayer: "mo",
            unlocked() { return hasUpgrade("mo", 12) }, 
        },
        14: {
            title: "U4: Hi, dev, pls finish the row.",
            description: "Add the last energy upgrade of row 7. x7 Energy",
            cost: new Decimal(111.1),
            currencyDisplayName: "Molecules",
            currencyInternalName: "molecule",
            currencyLayer: "mo",
            unlocked() { return hasUpgrade("mo", 13) }, 
        },
        15: {
            title: "U5: Small boosts add up.",
            description: "x1.5 Molecules, x2 Matter, x3 Power, x4 Energy, x5 Atoms",
            cost: new Decimal(1250),
            currencyDisplayName: "Molecules",
            currencyInternalName: "molecule",
            currencyLayer: "mo",
            unlocked() { return hasUpgrade("mo", 12) }, 
        },
    },
    setRT() {
        if ((player.mo.points.gte(1)) && (player.mo.MResetTime == 0)) {
            player.mo.MResetTime = player.timePlayed
        }
    },
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        if (player.cm.clickmastery.gte(6e9)) mult = mult.times(player.cm.clickmastery.div(4000).log(4000))
        if (hasUpgrade("mo", 15)) mult = mult.times(1.5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    effect(){
        let effectBoost = 0.75
        let eff = player.mo.points.add(1).pow(effectBoost)
        return eff
    },
    effectDescription() {
        let softcapDescription = ""
        let layerEffect = tmp[this.layer].effect
        let des = "which is boosting Matter by x" + notationChooser(layerEffect) + softcapDescription
        return des;
    },
    branches: ["ma"], 
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "o", description: "O: Reset to gain Molecules", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    update(diff) {
        if (player.mo.points.gt(0)) {
            let gain = player.mo.points.div(10)
            gain = gain.times(diff)
            player.mo.molecule = player.mo.molecule.add(gain)
        }
    }
})