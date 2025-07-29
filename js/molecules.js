addLayer("mo", {
    name: "Molecules", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MO", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        molecule: new Decimal(0),
        MResetTime: new Decimal(0),
        boosterBase: new Decimal(5),
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
                        a = a + `You have 
                        <h2><span style="color: #A3D5FF; text-shadow: 0px 0px 10px #FFFFFF; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.mo.points)}</span></h2> Molecule Bonds, which multiplies Matter gain by `
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
        "Boosters": {
            content: [
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `You have 
                        <h2><span style="color: #A3D5FF; text-shadow: 0px 0px 10px #FFFFFF; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.mo.points)}</span></h2> Molecule Bonds, which multiplies Matter gain by `
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
                "blank",
                "buyables",
                "blank",
                "blank",
                ["infobox", "boost"],
            ],
            unlocked() {return hasMilestone("cf", 2)}
        },
    },
    color: "#A3D5FF",
    requires: new Decimal(1e150), // Can be a function that takes requirement increases into account
    resource: "Molecule Bonds", // Name of currency
    baseResource: "Atoms", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.03, // Prestige currency exponent
    infoboxes: {
        mol: {
            title: "Molecules",
            body() { return "The third layer. Molecules resets all previous progress, but don't fret, Click Mastery and Achievements stay! Molecule Milestone 1 is OP, cherish that! Gain molecules a second based on Molecule Bonds / 10. This is a big step in your journey to grow the world. Oh, and also, Molecules boost Matter gain. Recommended and Intended: After about x4 Molecules, reset" },
        },
        boost: {
            title: "Boosters",
            body() { return "Boosters boost respective generator gain by 5 times per buy (can be increased with future upgrades)! However, it costs Molecule Bonds... Future upgrades will be more timewally (you might want to get more clicks to 50-250M), takes 2-6mins per upgrade" },
        },
    },
    milestones: {
        1: {
            requirementDescription: "1 Molecule Bonds",
            effectDescription: "Generate 10% of Energy reset and 0.5% of Matter reset a sec! Permanently unlock the Content Features layer.",
            done() { return player.mo.points.gte(1) }
        },
        2: {
            requirementDescription: "4 Molecule Bonds [VERY OP]",
            effectDescription: "Gen 2's boost also boosts Power gain (Requires Generator² Upgrade).",
            unlocked() { return hasMilestone("mo", 1)},
            done() { return player.mo.points.gte(4) }
        },
        3: {
            requirementDescription: "2,750 Molecule Bonds (wait what, that much??)",
            effectDescription: "Gain 2.5% of Matter reset a second and 100% of Energy reset a second. ^1.0175 Atom gain.",
            unlocked() { return hasUpgrade("mo", 15)},
            done() { return player.mo.points.gte(2750) }
        },
        4: {
            requirementDescription: "2e6 Molecule Bonds",
            effectDescription: "Gen 3's boost also boosts Power gain (Requires Generator² Upgrade). Keep the first and second row of Matter Upgrades",
            unlocked() { return hasMilestone("mo", 3)},
            done() { return player.mo.points.gte(2e6) }
        },
        5: {
            requirementDescription: "9e7 Molecule Bonds",
            effectDescription: "Gen 4's boost also boosts Power gain (Requires Generator² Upgrade). Gen 7 resets nothing, and Gen 5 buys max. Keep the first 5 rows of Energy upgrades.",
            unlocked() { return hasMilestone("mo", 4)},
            done() { return player.mo.points.gte(9e7) }
        },
        6: {
            requirementDescription: "8e9 Molecule Bonds",
            effectDescription: "Increase Booster Base to 6. Keep the third row of Matter Upgrades.",
            unlocked() { return hasMilestone("mo", 5)},
            done() { return player.mo.points.gte(8e9) }
        },
        7: {
            requirementDescription: "5e12 Molecule Bonds",
            effectDescription: "Automate Gen 7 (Requires Matter milestone 11). x77 Power, Atoms and Matter. Keep the first 7 rows of energy upgrades.",
            unlocked() { return hasMilestone("mo", 6)},
            done() { return player.mo.points.gte(5e12) }
        },
        8: {
            requirementDescription: "2.5e15 Molecule Bonds",
            effectDescription: "Generator 7 gives extra levels to Generator 5",
            unlocked() { return hasMilestone("mo", 7)},
            done() { return player.mo.points.gte(2.5e15) }
        },
        9: {
            requirementDescription: "2.25e17 Molecule Bonds",
            effectDescription: "Generator 6-8 also boosts Power gain",
            unlocked() { return hasMilestone("mo", 8)},
            done() { return player.mo.points.gte(2.25e17) }
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
            description: "Add the last energy upgrade of row 7. x7 Energy, double Matter Generation",
            cost: new Decimal(111.1),
            currencyDisplayName: "Molecules",
            currencyInternalName: "molecule",
            currencyLayer: "mo",
            unlocked() { return hasUpgrade("mo", 13) }, 
        },
        15: {
            title: "U5: Small boosts add up.",
            description: "x1.5 Molecule Bonds, x2 Matter, x3 Power, x4 Energy, x5 Atoms. Unlock Molecule Milestone 3.",
            cost: new Decimal(1250),
            currencyDisplayName: "Molecules",
            currencyInternalName: "molecule",
            currencyLayer: "mo",
            unlocked() { return hasUpgrade("mo", 14) }, 
        },
        21: {
            title: "U6: One huge boost.",
            description: "x1,000 Power",
            cost: new Decimal(12.5e6),
            currencyDisplayName: "Molecules",
            currencyInternalName: "molecule",
            currencyLayer: "mo",
            unlocked() { return hasMilestone("cf", 2) }, 
        },
        22: {
            title: "U7: Synergisnerator",
            description: "Generator² is stronger.",
            cost: new Decimal(300e6),
            currencyDisplayName: "Molecules",
            currencyInternalName: "molecule",
            currencyLayer: "mo",
            unlocked() { return hasUpgrade("mo", 21) }, 
        },
        23: {
            title: "U8: True Whee",
            description: "Energy Upgrade 'wheeeeeeeeeeeee' now has 6 more 'e's, each 'e' multiplies Energy by 1.4 instead of +x1, +x1 Energy (instead of +x0.25) and +x0.25 Matter.",
            cost: new Decimal(6e10),
            currencyDisplayName: "Molecules",
            currencyInternalName: "molecule",
            currencyLayer: "mo",
            unlocked() { return hasUpgrade("mo", 22) }, 
        },
        24: {
            title: "U9: You know the drill.",
            description: "Gen 5's boost also boosts Power gain (Requires Generator² Upgrade)",
            cost: new Decimal(5e12),
            currencyDisplayName: "Molecules",
            currencyInternalName: "molecule",
            currencyLayer: "mo",
            unlocked() { return hasUpgrade("mo", 23) }, 
        },
        25: {
            title: "U10: Chrono Amplifier",
            description: "Increase Booster Base to 7. Unlock Tickspeed (In Generators Subtab, requires 1 Generator 8)",
            cost: new Decimal(1.25e15),
            currencyDisplayName: "Molecules",
            currencyInternalName: "molecule",
            currencyLayer: "mo",
            unlocked() { return hasUpgrade("mo", 24) }, 
        },
    },
    buyables: {
        11: {
            title: "Buy Booster 1",
            unlocked() { return (hasMilestone('cf', 2)) },
            cost(x) {
                return new Decimal(2500).mul(Decimal.pow(4, x)).floor()
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Molecule Bonds." + "<br>You have bought " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Booster 1, multiplying Generator 1 generation by x" + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.mo.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.mo.points = player.mo.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                eff = new Decimal(player.mo.boosterBase).pow(Decimal.max(x, 0))
                return eff
            },
            tooltip() {
                return "Cost Formula: 2,500 x 4^Amt. x" + notationChooser(player.mo.boosterBase, 0) + " Gen 1 gen per buy."
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
        12: {
            title: "Buy Booster 2",
            unlocked() { return getBuyableAmount("mo", 11).gte(2) },
            cost(x) {
                return new Decimal(25000).mul(Decimal.pow(9, x)).floor()
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Molecule Bonds." + "<br>You have bought " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Booster 2, multiplying Generator 2 generation by x" + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.mo.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.mo.points = player.mo.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                eff = new Decimal(player.mo.boosterBase).pow(Decimal.max(x, 0))
                return eff
            },
            tooltip() {
                return "Cost Formula: 25,000 x 9^Amt. x" + notationChooser(player.mo.boosterBase, 0) + " Gen 2 gen per buy."
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
        21: {
            title: "Buy Booster 3",
            unlocked() { return getBuyableAmount("mo", 12).gte(3) },
            cost(x) {
                return new Decimal(2.25e6).mul(Decimal.pow(25, x)).floor()
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Molecule Bonds." + "<br>You have bought " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Booster 3, multiplying Generator 3 generation by x" + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.mo.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.mo.points = player.mo.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                eff = new Decimal(player.mo.boosterBase).pow(Decimal.max(x, 0))
                return eff
            },
            tooltip() {
                return "Cost Formula: 2,250,000 x 25^Amt. x" + notationChooser(player.mo.boosterBase, 0) + " Gen 3 gen per buy."
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
        22: {
            title: "Buy Booster 4 [increasing base until 4 bought]",
            unlocked() { return getBuyableAmount("mo", 21).gte(3) },
            cost(x) {
                return new Decimal(1e10).mul(Decimal.pow(64, x)).floor()
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Molecule Bonds." + "<br>You have bought " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Booster 4, multiplying Generator 4 generation by x" + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.mo.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.mo.points = player.mo.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                eff = new Decimal(player.mo.boosterBase).pow(Decimal.max(x, 0)).pow(Decimal.max(x/4,1))
                return eff
            },
            tooltip() {
                return "Cost Formula: 1e10 x 64^Amt. x" + notationChooser(player.mo.boosterBase, 0) + " Gen 4 gen per buy."
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
        31: {
            title: "Buy Booster 5",
            unlocked() { return getBuyableAmount("mo", 22).gte(4) },
            cost(x) {
                return new Decimal(1e18).mul(Decimal.pow(500, x)).floor()
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Molecule Bonds." + "<br>You have bought " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Booster 5, multiplying Generator 5 generation by x" + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.mo.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.mo.points = player.mo.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                eff = new Decimal(player.mo.boosterBase).pow(Decimal.max(x, 0))
                return eff
            },
            tooltip() {
                return "Cost Formula: 1e18 x 500^Amt. x" + notationChooser(player.mo.boosterBase, 0) + " Gen 5 gen per buy."
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
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
        if (hasUpgrade("en", 85)) mult = mult.times(1.08)
        if (hasAchievement("a", 61)) mult = mult.times(1.03)
        if (hasUpgrade("ma", 41)) mult = mult.times(6)
        if (hasMilestone("w", 3)) mult = mult.times(2)
        if (hasAchievement("a", 62)) mult = mult.times(1.08)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    effect(){
        let effectBoost = 0.725
        if (hasUpgrade("en", 82)) effectBoost = 0.775

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
        if (hasMilestone("mo", 6)) player.mo.boosterBase = new Decimal(6)
        if (hasUpgrade("mo", 25)) player.mo.boosterBase = new Decimal(7)
    }
})