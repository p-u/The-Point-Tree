addLayer("g", {
    name: "Galaxy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    exponent() {
        return 0.16
    }, // Prestige currency exponent
    color: "purple",
    requires: new Decimal(5e15), // Can be a function that takes requirement increases into account
    resource: "Galaxies", // Name of currency
    baseResource: "Stars", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    tabFormat: {
        "Main tab (click to have the reset button)": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                ["display-text", function() {
                    return "Galaxies per sec: "+ notationChooser(getResetGain("g").div(Math.max(player.a.tSLRG, 0))) +"."
                }], 
                "blank",
                "milestones",
                "blank",
                "upgrades",
                "blank",
                "blank",
                ["infobox", "main"],
            ],
            unlocked() {return (!hasMilestone("st", 7))}
        },
        "Main tab (click to have no reset button)": {
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
            unlocked() {return (hasMilestone("st", 7))}
        },
    },
    passiveGeneration() {
        if (hasMilestone("st", 7)) return 0.01
        if (hasUpgrade("n", 11)) return 0.01
        return 0
    },
    upgrades: {
        11: {
            title: "The stars above you disappear... [14/40]",
            description: "Come back stronger than ever! Multiply Sparks based on the amount of Stars, with higher Stars yielding lower multipliers. Min: x2.5",
            cost: new Decimal(1),
            effect() {
                return Decimal.max(new Decimal(20).sub(player.s.points.add(1).log10()), new Decimal(2.5))
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionSp25
            },
            tooltip() {
                return "Formula: Max(19-lgStars,2.5)"
            },
            unlocked() { return true }, 
        },
        12: {
            title: "Again and again. [15/40]",
            description: "Spark Increaser is stronger (x2 -> x2.2/buy), and unlock the Star Increaser. x1.5 Stars gain at 500M, 25B, 25Qa stars.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("g",11) }, 
        },
        13: {
            title: "what jump [17/40]",
            description: "Galaxies boost Sparks at a reduced rate, BUT reduce the gain of Stars. At 1 Ocd (e57) Sparks, x5 Sparks gain, and at 100 Ocd (e59) Sparks, x3 Stars. At 10 Nod (e61) Sparks, x2 Galaxies. At 1 Dvg (e69) Sparks, x1,000 Sparks!",
            cost: new Decimal(30e6),
            effect() {
                eff = new Decimal(0.5)
                if (hasUpgrade("s", 34)) eff = new Decimal(0.65)
                if (hasUpgrade("g", 21)) eff = new Decimal(0.8)
                return player.g.points.add(1).pow(eff)
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x"
            },
            tooltip() {
                return "Formula: Galaxies^" + eff
            },
            unlocked() { return (hasUpgrade("g",12) && hasMilestone("st", 7)) }, 
        },
        14: {
            title: "A cosmos [19/40]",
            description: "Galaxy's effect to Stars is stronger. At e136 Stars, increase that effect. (Galaxies^0.7 -> Galaxies^0.75 -> Galaxies^0.8)",
            cost: new Decimal(2e21),
            unlocked() { return (hasUpgrade("g",13) && hasMilestone("st", 8)) }, 
        },
        15: {
            title: "Galaxy Descendants [21/40]",
            description: "Galaxies boost its gain...oh gosh thats op",
            cost: new Decimal(1e60),
            effect() {
                exp = new Decimal(0.0225)
                if (hasMilestone("st", 12) && player.s.points.gt("1e425")) exp = new Decimal(0.035)
                if (hasUpgrade("st", 23)) exp = new Decimal(0.045)
                return player.g.points.add(1).pow(exp)
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x"
            },
            tooltip() {
                return "Formula: Galaxies^" + exp
            },
            unlocked() { return (hasUpgrade("g",14) && hasMilestone("st", 11)) }, 
        },
        21: {
            title: "Trade-off B",
            description: "Galaxy's effect to Stars is WEAKER (Galaxies^0.8 -> Galaxies^0.65), though increase the 3rd Galaxy up's effect (Galaxies^0.65 -> Galaxies^0.8) and boost Spark Increaser's base (x2.2 -> x2.25/buy).",
            cost: new Decimal("e960"),
            unlocked() { return (hasUpgrade("g",15)) }, 
        },
        22: {
            title: "Mainly for the next tier, but OK!",
            description: "xe1,000 Sparks.",
            cost: new Decimal("e2550"),
            unlocked() { return (hasUpgrade("g",21)) }, 
        },
        23: {
            title: "holy thats long...",
            description: "xe1,000 Galaxies.",
            cost: new Decimal("e72250"),
            unlocked() { return (hasUpgrade("g",22)) }, 
        },
        24: {
            title: "holy thats long...",
            description: "Square the Notation effect on Research. Scientific2 notation gives +4.5 base mult. Also, +^0.02 Galaxies.",
            cost: new Decimal("e154845"),
            unlocked() { return (hasUpgrade("st",43)) }, 
        },
    },
    infoboxes: {
        main: {
            title: "The Galaxies reset layer",
            body() { return "Galaxies reset Stars, but Star Tiers reset Galaxies also! Serves as a way to boost Star/Spark gain. With more galaxies, comes a greater boost to Stars." },
        },
    },
    doReset(g) {
        player.a.timegal = player.timePlayed
        // Stage 1: Prevent resetting if the layer is too high
        if (layers[g].row <= this.row) return;
    
        // Stage 2: Track which specific subfeatures to keep (e.g., upgrades)
        let keptUpgrades = [];
        for(i=1;i<6;i++){ //rows
            let cutoff = 6
            for(v=1;v<cutoff;v++){ //columns
              if ((hasMilestone('st', 1000)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
        }
        let keep = [];
    
        // Stage 4: Perform the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5: Add back the specific subfeatures saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },   
    gainMult() { // Energy
        let gain = new Decimal(1)
        if (hasMilestone("st", 6)) gain = gain.times(2)
        if (hasUpgrade("s", 32)) gain = gain.times(2)
	    if (hasMilestone("st", 8)) gain = gain.times(8)
	    if (hasMilestone("st", 14)) gain = gain.times(14)
	    if (hasMilestone("st", 16)) gain = gain.times(166)
	    if (hasMilestone("st", 17)) gain = gain.times(17)
        let e = new Decimal(0.1)
        if (hasUpgrade("s", 35)) {
            e = new Decimal(0.225)
            if (player.g.points.gte("e670")) e = new Decimal(0.25)
        }
        if (player.n.points.gte("e14150") && hasUpgrade("n", 15)) e = new Decimal(0.33)
	    if (hasMilestone("st", 16)) gain = gain.times(player.n.points.pow(e))
        if (hasUpgrade("g", 15)) gain = gain.times(upgradeEffect("g", 15))
        if (hasMilestone("st", 12)) {
            if (player.points.gte(1e200)) gain = gain.times(5)
            if (player.points.gte(1e250)) gain = gain.times(5)
            if (player.points.gte(1e300)) gain = gain.times(5)
            if (player.points.gte("1e400")) gain = gain.times(5)
            if (player.points.gte("1e500")) gain = gain.times(5)
            if (hasUpgrade("n", 11)) {
                if (player.points.gte("1e700")) gain = gain.times(5)
                if (player.points.gte("1e900")) gain = gain.times(5)
                if (player.points.gte("e1000")) gain = gain.times(5)
                if (player.points.gte("1e1200")) gain = gain.times(5)
                if (player.points.gte("1e1500")) gain = gain.times(5)
                if (player.points.gte("e1750")) gain = gain.times(5)
            }
        } else if (hasMilestone("st", 11)) {
            if (player.points.gte(1e250)) gain = gain.times(3)
            if (player.points.gte(1e300)) gain = gain.times(3)
        }
        if (hasUpgrade("st", 13)) gain = gain.times(upgradeEffect("st", 13))
	    if (hasUpgrade("n", 11)) gain = gain.times(100)
	    if (hasUpgrade("g", 23)) gain = gain.times("e1000")
	    if (hasMilestone("st", 27)) gain = gain.times("e2700")
        gain = gain.times(player.s.cmult)
        let b = 1.5
        if (player.points.gte("e27850")) b = b + 0.5
        if (hasMilestone("st", 19)) gain = gain.times(new Decimal(b).pow(player.st.points))
		gain = gain.times(buyableEffect("s", 13))
        if (player.points.gte(1e61) && hasUpgrade("g", 13)) gain = gain.mul(2)
        return gain
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade("st", 43) && player.st.research.gte(1e68) && player.st.research.lte(4.2e75)) exp = new Decimal(0.8)
        if (hasMilestone("st", 18)) exp = exp.mul(1.01)
        if (player.n.points.gte(new Decimal(2).pow(1024))) exp = exp.add(0.01)
        if (hasUpgrade("g", 24)) exp = exp.add(0.02)
        return exp
    },
    effect(){
        let exp = 0.7
        if (hasUpgrade("g", 14)) {
            exp = 0.75
            if (player.s.points.gte(1e136)) exp = 0.8
        }
        if (hasUpgrade("g", 21)) exp = 0.65
        let eff = player.g.points.add(1).pow(exp)
        let softcapstart = new Decimal("e1250")
        let sc = 0.5
        softcappedEffect = softcap(eff, softcapstart, new Decimal(sc))
        return softcappedEffect
    },
    effectDescription() {
        let softcapDescription = ""
        let layerEffect = tmp[this.layer].effect
        if (layerEffect.gte("1e1250") ) {
            softcapDescription = " (Softcapped at e1250x)"
        }
        let des = "which is boosting Stars by x" + notationChooser(layerEffect) + softcapDescription
        return des;
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Reset for Galaxies", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["st", "s"],
    layerShown(){
        let visible = false
        if (hasMilestone('st', 5) || player.g.unlocked || player["g"].points.gte(1)) visible = true
       return visible
    },
    update(diff) {
        player.a.tSLRG = player.timePlayed - player.a.timegal
        player.a.cgps = getResetGain("g").div(Math.max(player.a.tSLRG, 0.01))
    }
})