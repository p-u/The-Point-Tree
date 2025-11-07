addLayer("st", {
    name: "Star Tier", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ST", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    exponent() {
        let exp = new Decimal(2.6)
        if (hasMilestone("st", 7)) exp = new Decimal(2.955)
        if (hasMilestone("st", 9)) exp = new Decimal(2.98)
        if (hasMilestone("st", 11)) exp = new Decimal(3.0121)
        if (hasMilestone("st", 14)) exp = new Decimal(3.0774)
        if (hasMilestone("st", 15)) exp = new Decimal(3.26)
        if (hasMilestone("st", 16)) exp = new Decimal(0.11).add(player.st.points.div(5))
        if (hasUpgrade("n", 11)) exp = exp.sub(0.01)
        if (hasUpgrade("s", 42)) exp = exp.sub(player.n.points.slog().div(10))
        if (hasMilestone("st", 22)) exp = exp.sub(0.00433)
        if (hasMilestone("st", 24)) exp = exp.sub(0.1275)
        return exp
    }, // Prestige currency exponent
    
    color: "#a9a9a9",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "Star Tier", // Name of currency
    baseResource: "Stars", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    tabFormat: {
        "Main tab": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                "blank",
                "milestones",
            ],
        },
    },
    milestones: {
        1: {
            requirementDescription: "Star Tier 1",
            effectDescription: "x2 Sparks, unlock 1 new upgrade. Also, this milestone marks the beginning of offline time, starting at 1min. Every Star Tier multiplies the offline time by 1.1.",
            done() { return player["st"].points.gte(1) }
        },
        2: {
            requirementDescription: "Star Tier 2",
            effectDescription: "Unlock yet another new upgrade. +25% Stars per star tier.",
            done() { return player["st"].points.gte(2) },
            unlocked() { return player["st"].points.gte(1)}
        },
        3: {
            requirementDescription: "Star Tier 3 [08/40]",
            effectDescription: "xStar Tier Sparks. Stars boost Sparks gain after 300 Stars. Unlock two new upgrades.",
            done() { return player["st"].points.gte(3) },
            unlocked() { return player["st"].points.gte(2)}
        },
        4: {
            requirementDescription: "Star Tier 4",
            effectDescription: "Unlock new upgrades. Star Tier 2's 'Star Tier' is changed to 'Star Tier^2', and generate 20% of passive Stars a second, but remove the ability to gain stars manually. Also, extend Star Upgrade 24 to double Sparks gain at 10M, 50M, 200M, 1B, 10B, 100B and 1T stars.",
            done() { return player["st"].points.gte(4) },
            unlocked() { return player["st"].points.gte(3)}
        },
        5: {
            requirementDescription: "Star Tier 5 [13/40]",
            effectDescription: "Star generation is now 100% a second, and pentuple Sparks gain. Unlock a Star Buyable. Triple Sparks at 25T, 1Qd, 1Qt, 1Sx, 1Sp, 1Oc, 1No and 1De Stars. Unlock a new reset layer with some upgrades.",
            done() { return player["st"].points.gte(5) },
            unlocked() { return player["st"].points.gte(4)}
        },
        6: {
            requirementDescription: "Star Tier 6",
            effectDescription: "Unlock 1 more Star upgrade. xStar Tier/2 Galaxies, xlog2Star Tier Sparks and Stars.",
            done() { return player["st"].points.gte(6) },
            unlocked() { return player["st"].points.gte(5)}
        },
        7: {
            requirementDescription: "Star Tier 7",
            effectDescription: "Unlock 1 more Galaxy and 1 more Star Upgrade. Gain 1% of Galaxies a second, but prevent you from reseting for Galaxies. Also, Quadruple Star gain, and keep the first 2 rows of Star upgrades on any reset.",
            done() { return player["st"].points.gte(7) },
            unlocked() { return player["st"].points.gte(6)}
        },
        8: {
            requirementDescription: "Star Tier 8 [18/40]",
            effectDescription: "x8 Galaxies, Stars and Sparks. Unlock 1 new upgrade, and automate the Spark Increaser.",
            done() { return player["st"].points.gte(8) },
            unlocked() { return player["st"].points.gte(7)}
        },
        9: {
            requirementDescription: "Star Tier 9",
            effectDescription: "x99 Sparks. Automate the Star Increaser. Every 30 OOMs starting from e123 and ending at e303 Sparks, x9 Sparks gain. Unlock the Galaxy Increaser. At e175 Sparks, Star Upgrade 23 is stronger.",
            done() { return player["st"].points.gte(9) },
            unlocked() { return player["st"].points.gte(8)}
        },
        10: {
            requirementDescription: "Star Tier 10 [20/40]",
            effectDescription: "x1,000 Sparks, x10 Stars.",
            done() { return player["st"].points.gte(10) },
            unlocked() { return player["st"].points.gte(9)}
        },
        11: {
            requirementDescription: "Star Tier 11",
            effectDescription: "At e250, e300 Sparks, x3 Galaxies. Unlock a new upgrade.",
            done() { return player["st"].points.gte(11) },
            unlocked() { return player["st"].points.gte(10)}
        },
        12: {
            requirementDescription: "Star Tier 12 [22/40]",
            effectDescription: "Star Tier 11's Galaxy boost also extends to e200, e400 and e500 Sparks, and the boost is increased to 5x. Galaxy Up. 15 is stronger at e425 Stars. Unlock a new upgrade.",
            done() { return player["st"].points.gte(12) },
            unlocked() { return player["st"].points.gte(11)}
        },
        13: {
            requirementDescription: "Star Tier 13",
            effectDescription: "x13,333 Stars.",
            done() { return player["st"].points.gte(13) },
            unlocked() { return player["st"].points.gte(12)}
        },
        14: {
            requirementDescription: "Star Tier 14",
            effectDescription: "x14 Galaxies.",
            done() { return player["st"].points.gte(14) },
            unlocked() { return player["st"].points.gte(13)}
        },
        15: {
            requirementDescription: "Star Tier 15",
            effectDescription: "Unlock a new reset layer! Star Up. 25 is stronger.",
            done() { return player["st"].points.gte(15) },
            unlocked() { return player["st"].points.gte(14)}
        },
        16: {
            requirementDescription: "Star Tier 16",
            effectDescription: "x166 Galaxies. Nebulae boost Galaxies, automate the Galaxy Increaser.",
            done() { return player["st"].points.gte(16) },
            unlocked() { return player["st"].points.gte(15)}
        },
        17: {
            requirementDescription: "Star Tier 17",
            effectDescription: "Double the base of Nebula Upgrade 2, x17 Galaxies and Nebulae. Unlock a new Star Upgrade.",
            done() { return player["st"].points.gte(17) },
            unlocked() { return player["st"].points.gte(16)}
        },
        18: {
            requirementDescription: "Star Tier 18",
            effectDescription: "+^0.01 Galaxies. Unlock a Nebula Upgrade.",
            done() { return player["st"].points.gte(18) },
            unlocked() { return player["st"].points.gte(17)}
        },
        19: {
            requirementDescription: "Star Tier 19",
            effectDescription: "For every Star Tier, x1.5 Galaxies. At e27,850 Sparks, increase the base of this upgrade by 0.5. Unlock a star upgrade.",
            done() { return player["st"].points.gte(19) },
            unlocked() { return player["st"].points.gte(18)}
        },
        20: {
            requirementDescription: "Star Tier 20",
            effectDescription: "Double the second Nebula Upgrade's base. At 2^1024 Nebulae, +^0.01 to Stars, Galaxies and Nebulae.",
            done() { return player["st"].points.gte(20) },
            unlocked() { return player["st"].points.gte(19)}
        },
        21: {
            requirementDescription: "Star Tier 21",
            effectDescription: "^1.01 to Stars.",
            done() { return player["st"].points.gte(21) },
            unlocked() { return player["st"].points.gte(20)}
        },
        22: {
            requirementDescription: "Star Tier 22",
            effectDescription: "First Star Tier to have no IMMEDIATE boosts...but at e74,250 Sparks, ^1.01 Sparks.",
            done() { return player["st"].points.gte(22) },
            unlocked() { return player["st"].points.gte(21)}
        },
        23: {
            requirementDescription: "Star Tier 23 [29/40]",
            effectDescription: "xe1,000 Stars. Unlock a new Nebula upgrade.",
            done() { return player["st"].points.gte(23) },
            unlocked() { return player["st"].points.gte(22)}
        },
        24: {
            requirementDescription: "Star Tier 24",
            effectDescription: "well, its 24...what more boosts do you want?",
            done() { return player["st"].points.gte(24) },
            unlocked() { return player["st"].points.gte(23)}
        },
        25: {
            requirementDescription: "Star Tier 25",
            effectDescription: "The Start of the Reality-Breaking...As you progress through star tiers (and realities), some stars get lost along the way. For every ST past 24, ^0.98 Stars. Unlock new upgrades",
            done() { return player["st"].points.gte(25) },
            unlocked() { return player["st"].points.gte(24)}
        },
    },
    gainMult() { // Energy
        let gain = new Decimal(1)
        return gain
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    displayRow: 1,
    hotkeys: [
        {key: "t", description: "t: Reset for a Star Tier", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["s"],
    layerShown(){
        let visible = false
        if (hasUpgrade('s', 15) || player.st.unlocked || player["st"].points.gte(1)) visible = true
       return visible
    },
})