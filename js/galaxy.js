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
        "Main tab": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                ["display-text", function() {
                    return "Stars per sec: "+ notationChooser(getResetGain("g").div(Math.max(player.a.tSLRG, 0))) +"."
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
        "Main tab": {
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
        return 0
    },
    upgrades: {
        11: {
            title: "The stars above you disappear... [14/40]",
            description: "Come back stronger than ever! Multiply Sparks based on the amount of Stars, with higher Stars yielding lower multipliers. Min: x2.5",
            cost: new Decimal(1),
            effect() {
                return Decimal.max(new Decimal(20).sub(player.s.points.log10()), new Decimal(2.5))
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
            description: "Spark Increaser is stronger, and unlock the Star Increaser. x1.5 Stars gain at 500M, 25B, 25Qa stars.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("g",11) }, 
        },
        13: {
            title: "what jump [17/40]",
            description: "Galaxies boost Sparks at a reduced rate, BUT reduce the gain of Stars. At 1 Ocd (e57) Sparks, x5 Sparks gain, and at 100 Ocd (e59) Sparks, x3 Stars. At 10 Nod (e61) Sparks, x2 Galaxies. At 1 Dvg (e69) Sparks, x1,000 Sparks!",
            cost: new Decimal(30e6),
            effect() {
                return player.g.points.add(1).pow(0.5)
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x"
            },
            tooltip() {
                return "Formula: Galaxies^0.5"
            },
            unlocked() { return (hasUpgrade("g",12) && hasMilestone("st", 7)) }, 
        },
        14: {
            title: "A cosmos [19/40]",
            description: "Galaxy's effect to Stars is stronger. At e136 Stars, increase that effect.",
            cost: new Decimal(2e21),
            unlocked() { return (hasUpgrade("g",13) && hasMilestone("st", 8)) }, 
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
		gain = gain.times(buyableEffect("s", 13))
        if (player.points.gte(1e61) && hasUpgrade("g", 13)) gain = gain.mul(2)
        return gain
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    effect(){
        let exp = 0.7
        if (hasUpgrade("g", 14)) {
            exp = 0.75
            if (player.s.points.gte(1e136)) exp = 0.8
        }
        let eff = player.g.points.add(1).pow(exp)
        return eff
    },
    effectDescription() {
        let softcapDescription = ""
        let layerEffect = tmp[this.layer].effect
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
        player.a.cgps = getResetGain("g").div(Math.max(player.a.tSLRG, 0))
    }
})