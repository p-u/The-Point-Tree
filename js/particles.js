addLayer("pa", {
    name: "Particles", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        buyMode: "1",
        clickableamt: {
            alpha: new Decimal(0),
            beta: new Decimal(0),
            gamma: new Decimal(0),
        },
        clickableeff: {
            alpha: new Decimal(1),
            beta: new Decimal(1),
            gamma: new Decimal(1),
        },
        totalParticles: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasMilestone('w', 3) || player.pa.unlocked) visible = true
       return visible
    },
    color: "#2E6F40",
    requires: new Decimal("1e10000"),
    resource: "Particles", // Name of currency
    baseResource: "Atoms", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.011, // Prestige currency exponent
    infoboxes: {
        par: {
            title: "Particles",
            body() { return "Particles DO NOT RESET the Molecule layer! Particles boost Energy, or it can also be used for Particle Clickables. The particle subtab in the Particle layer offers different particles that boost different stats (At the start you only have 2, but you will get more over time) Recommended to get an Alpha Particle on first reset. Particles increase in gain until 10 seconds after ANY reset that resets the first layer. Particle Upgrades will have the naming convention [Number] [Amount of total Particles spent on other Particles to get to unlock]. DO NOT FORGET ABOUT OTHER PARTICLES OR MOLECULES" },
        },
    },
    tabFormat: {
        "Upgrades/Milestones": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text", function() {
                    let dis = "Total Particles spent on other Particles: " + notationChooser(player.pa.totalParticles) + "<br>"
                    if (player.pa.totalParticles.lt(3)) {
                        dis = dis + "To unlock upgrades, you need to have at least 3 Total Particles spent on other Particles."
                    }
                    return dis
                }], 
                "blank",
                ["display-text", function() {
                    return "Time after last reset: " + formatTime(player.timePlayed - player.en.bleh)
                }], 
                "blank",
                "milestones",
                "blank",
                "upgrades",
                "blank",
                "blank",
                ["infobox", "par"],
            ],
        },
        "Particles": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                "blank",
                "clickables",
            ],
            unlocked() {return hasMilestone("cf", 2)}
        },
    },
    clickables: {
        11: {
            title: "Assign Mode: 1",
            canClick() { return true },
            onClick() {
                player.pa.buyMode = "1"
            },
        },
        12: {
            title: "Assign Mode: 10% (min 1)",
            canClick() { return true },
            onClick() {
                player.pa.buyMode = "10pct"
            },
        },
        13: {
            title: "Assign Mode: 100%",
            canClick() { return true },
            onClick() {
                player.pa.buyMode = "100pct"
            },
        },
        21: {
            title: "Alpha Particle",
            canClick() { return player.pa.points.gte(1) },
            display() {
                let eff = layers.pa.getAlphaEff()
                return "Alpha Particles: " + notationChooser(player.pa.clickableamt.alpha) +
                    ".<br>Boosts Atom gain by x" + notationChooser(eff) + "."
            },
            onClick() {
                if (!player.pa.points.gte(1)) return

                if (player.pa.buyMode === "1") {
                    player.pa.clickableamt.alpha = player.pa.clickableamt.alpha.add(1)
                    player.pa.points = player.pa.points.sub(1)
                } else if (player.pa.buyMode === "10pct") {
                    let amt = Decimal.max(player.pa.points.div(10).floor(), 1)
                    player.pa.clickableamt.alpha = player.pa.clickableamt.alpha.add(amt)
                    player.pa.points = player.pa.points.sub(amt)
                } else if (player.pa.buyMode === "100pct") {
                    let amt = player.pa.points.floor()
                    player.pa.clickableamt.alpha = player.pa.clickableamt.alpha.add(amt)
                    player.pa.points = player.pa.points.sub(amt)
                }
            },
        },
        22: {
            title: "Beta Particle",
            canClick() { return player.pa.points.gte(1) },
            display() {
                let eff = layers.pa.getBetaEff()
                return "Beta Particles: " + notationChooser(player.pa.clickableamt.beta) +
                    ".<br>Boosts Matter gain by x" + notationChooser(eff) + "."
            },
            onClick() {
                if (!player.pa.points.gte(1)) return

                if (player.pa.buyMode === "1") {
                    player.pa.clickableamt.beta = player.pa.clickableamt.beta.add(1)
                    player.pa.points = player.pa.points.sub(1)
                } else if (player.pa.buyMode === "10pct") {
                    let amt = Decimal.max(player.pa.points.div(10).floor(), 1)
                    player.pa.clickableamt.beta = player.pa.clickableamt.beta.add(amt)
                    player.pa.points = player.pa.points.sub(amt)
                } else if (player.pa.buyMode === "100pct") {
                    let amt = player.pa.points.floor()
                    player.pa.clickableamt.beta = player.pa.clickableamt.beta.add(amt)
                    player.pa.points = player.pa.points.sub(amt)
                }
            },
        },
    },
    upgrades: {
        11: {
            title: "One [3]",
            description: "x5 Atoms, x2 Matter. Gen 6-8 and Tickspeed buys MAX now and costs nothing.",
            cost: new Decimal(3),
            unlocked() { return player.pa.totalParticles.gte(3) }, 
        },
        12: {
            title: "Two [7]",
            description: "Keep Energy Row 8 and Matter Row 4 Upgrades on reset. x5 Energy, x2 Power.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("pa", 11) }, 
        },
        13: {
            title: "Three [11]",
            description: "Booster Base is increased to 8, Tickspeed base is increased to 1.11, and gain 2 Gen 1s for every Tickspeed bought.",
            cost: new Decimal(8),
            unlocked() { return (hasUpgrade("pa", 12) && player.pa.totalParticles.gte(7)) }, 
        },
        14: {
            title: "Four [25]",
            description: "Boost the 'Sodium' Upgrade and the effects of Gen 5-8",
            cost: new Decimal(14),
            unlocked() { return (hasUpgrade("pa", 13) && player.pa.totalParticles.gte(11)) }, 
        },
        15: {
            title: "Five [TBC]",
            description: "Extend Molecule Upgrades! Molecules boosts itself",
            cost: new Decimal(25),
            effect() {
                molsq = 0.05
                softcapDescriptionpa15 = ""
                sdsc = ""
                upgEffectpa15 = upgradeEffect(this.layer, this.id)
                let eff = player.mo.points.add(1).pow(molsq)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionpa15
            },
            tooltip() {
                return "Formula: (Molecules+1)^"  + molsq + sdsc
            },
            unlocked() { return (hasUpgrade("pa", 14) && player.pa.totalParticles.gte(25)) }, 
        },
    },
    getAlphaEff() {
        if (player.pa.clickableamt.alpha.gte(1)) {
            return Decimal.max(Decimal.pow(5, player.pa.clickableamt.alpha.add(1).log(2)).mul(4), 1)
        }
        return new Decimal(1)
    },
    getBetaEff() {
        if (player.pa.clickableamt.beta.gte(1)) {
            return Decimal.max(Decimal.pow(1.5, player.pa.clickableamt.beta.add(1).log(2)).mul(2), 1)
        }
        return new Decimal(1)
    },

    gainMult() { // Prestige multiplier
        let mult = new Decimal(Math.min((player.timePlayed - player.en.bleh)/10, 1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    effect(){
        let effectBoost = 1.4
        let eff = player.pa.points.add(1).pow(effectBoost)
        return eff
    },
    effectDescription() {
        let softcapDescription = ""
        let layerEffect = tmp[this.layer].effect
        let des = "which is boosting Energy by x" + notationChooser(layerEffect) + softcapDescription
        return des;
    },
    branches: ["ma", "mo"], // Layers that this layer depends on
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset to gain Particles", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
})