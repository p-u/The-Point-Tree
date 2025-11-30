addLayer("pa", {
    name: "Particles", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        buyMode: "1pct",
        clickableamt: {
            alpha: new Decimal(0),
            beta: new Decimal(0),
            gamma: new Decimal(0),
            delta: new Decimal(0), 
            epsilon: new Decimal(0),
        },
        clickablenerf: {
            beta: new Decimal(1),
            gamma: new Decimal(1),
            delta: new Decimal(1),
        },
        totalParticles: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasMilestone('w', 3) || player.pa.unlocked) visible = true
       return visible
    },
    color: "#2E6F40",
    requires: new Decimal("1e1000"),
    resource: "Particles", // Name of currency
    baseResource: "Atoms", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.011, // Prestige currency exponent
    infoboxes: {
        par: {
            title: "Particles",
            body() { return "Particles DO NOT RESET the Molecule layer! Particles can be used for Particle Clickables. The particle subtab in the Particle layer offers different particles that boost different stats (At the start you only have 2, but you will get more over time) Recommended to get an Alpha Particle on first reset. Particles increase in gain until 10 seconds after ANY reset that resets the first layer. Particle Upgrades will have the naming convention [Number] [Amount of total Particles spent on other Particles to get to unlock]. DO NOT FORGET ABOUT OTHER PARTICLES OR MOLECULES" },
        },
    },
    doReset(pa) {
        // Stage 1: Prevent resetting if the layer is too high
        if (layers[pa].row <= this.row) return;
    
        // Stage 2: Track which specific subfeatures to keep (e.g., upgrades)
        let keptUpgrades = [];
        for(i=1;i<6;i++){ //rows
            for(v=1;v<3;v++){ //columns
              if (hasMilestone("cl", 5) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
        }
        let keep = [];
    
        // Stage 4: Perform the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5: Add back the specific subfeatures saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
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
            title: "Assign Mode: 1% (min 1)",
            canClick() { return true },
            onClick() {
                player.pa.buyMode = "1pct"
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
            title: "Assign Mode: 50% (min 1)",
            canClick() { return true },
            onClick() {
                player.pa.buyMode = "50pct"
            },
        },
        14: {
            title: "Assign equally (Will spend all of your particles)",
            canClick() { return true },
            onClick() {
                let amt = Decimal.max(player.pa.points.div(5).floor(), 1)
                player.pa.clickableamt.alpha = player.pa.clickableamt.alpha.add(amt)
                player.pa.clickableamt.beta = player.pa.clickableamt.beta.add(amt)
                player.pa.clickableamt.gamma = player.pa.clickableamt.gamma.add(amt)
                player.pa.clickableamt.delta = player.pa.clickableamt.delta.add(amt)
                player.pa.clickableamt.epsilon = player.pa.clickableamt.epsilon.add(amt)
                player.pa.points = new Decimal(0)
            },
            unlocked() {return hasUpgrade("cl", 35)}
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

                if (player.pa.buyMode === "1pct") {
                    let amt = Decimal.max(player.pa.points.div(100).floor(), 1)
                    player.pa.clickableamt.alpha = player.pa.clickableamt.alpha.add(amt)
                    player.pa.points = player.pa.points.sub(amt)
                } else if (player.pa.buyMode === "10pct") {
                    let amt = Decimal.max(player.pa.points.div(10).floor(), 1)
                    player.pa.clickableamt.alpha = player.pa.clickableamt.alpha.add(amt)
                    player.pa.points = player.pa.points.sub(amt)
                } else if (player.pa.buyMode === "50pct") {
                    let amt = player.pa.points.div(2).floor()
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
                let dis = "Beta Particles: " + notationChooser(player.pa.clickableamt.beta) +
                    ".<br>Boosts Matter gain by x" + notationChooser(eff)
                if (hasUpgrade("pa", 23)) {
                    dis = dis + ", but nerfs Power gain by x" + notationChooser(player.pa.clickablenerf.beta) + "."
                } else {
                    dis = dis + "."
                }
                return dis
            },
            onClick() {
                if (!player.pa.points.gte(1)) return
                if (player.pa.buyMode === "1pct") {
                    let amt = Decimal.max(player.pa.points.div(100).floor(), 1)
                    player.pa.clickableamt.beta = player.pa.clickableamt.beta.add(amt)
                    player.pa.points = player.pa.points.sub(amt)
                } else if (player.pa.buyMode === "10pct") {
                    let amt = Decimal.max(player.pa.points.div(10).floor(), 1)
                    player.pa.clickableamt.beta = player.pa.clickableamt.beta.add(amt)
                    player.pa.points = player.pa.points.sub(amt)
                } else if (player.pa.buyMode === "50pct") {
                    let amt = player.pa.points.div(2).floor()
                    player.pa.clickableamt.beta = player.pa.clickableamt.beta.add(amt)
                    player.pa.points = player.pa.points.sub(amt)
                }
            },
        },
        23: {
            title: "Gamma Particle",
            unlocked() { return hasUpgrade("mo", 35) },
            canClick() { return player.pa.points.gte(1) },
            display() {
                let eff = layers.pa.getGammaEff()
                return "Gamma Particles: " + notationChooser(player.pa.clickableamt.gamma) +
                    ".<br>Boosts Molecules gain by x" + notationChooser(eff) + ", but nerfs Atom gain by x" + notationChooser(player.pa.clickablenerf.gamma) + "."
            },
            onClick() {
                if (!player.pa.points.gte(1)) return
                if (player.pa.buyMode === "1pct") {
                    let amt = Decimal.max(player.pa.points.div(100).floor(), 1)
                    player.pa.clickableamt.gamma = player.pa.clickableamt.gamma.add(amt)
                    player.pa.points = player.pa.points.sub(amt)
                } else if (player.pa.buyMode === "10pct") {
                    let amt = Decimal.max(player.pa.points.div(10).floor(), 1)
                    player.pa.clickableamt.gamma = player.pa.clickableamt.gamma.add(amt)
                    player.pa.points = player.pa.points.sub(amt)
                } else if (player.pa.buyMode === "50pct") {
                    let amt = player.pa.points.div(2).floor()
                    player.pa.clickableamt.gamma = player.pa.clickableamt.gamma.add(amt)
                    player.pa.points = player.pa.points.sub(amt)
                }
            }      
        },
        31: {
            title: "Delta Particle",
            unlocked() { return hasUpgrade("pa", 25) },
            canClick() { return player.pa.points.gte(1) },
            display() {
                let eff = layers.pa.getDeltaEff()
                return "Delta Particles: " + notationChooser(player.pa.clickableamt.delta) +
                    ".<br>Boosts Particles gain by x" + notationChooser(eff) + ", but nerfs Power gain by x" + notationChooser(player.pa.clickablenerf.delta) + "."
            },
            onClick() {
                if (!player.pa.points.gte(1)) return
                if (player.pa.buyMode === "1pct") {
                    let amt = Decimal.max(player.pa.points.div(100).floor(), 1)
                    player.pa.clickableamt.delta = player.pa.clickableamt.delta.add(amt)
                    player.pa.points = player.pa.points.sub(amt)
                } else if (player.pa.buyMode === "10pct") {
                    let amt = Decimal.max(player.pa.points.div(10).floor(), 1)
                    player.pa.clickableamt.delta = player.pa.clickableamt.delta.add(amt)
                    player.pa.points = player.pa.points.sub(amt)
                } else if (player.pa.buyMode === "50pct") {
                    let amt = player.pa.points.div(2).floor()
                    player.pa.clickableamt.delta = player.pa.clickableamt.delta.add(amt)
                    player.pa.points = player.pa.points.sub(amt)
                }
            }      
        },
        32: {
            title: "Epsilon Particle",
            unlocked() { return hasMilestone("ma", 16) },
            canClick() { return player.pa.points.gte(1) },
            display() {
                let eff = layers.pa.getEpsilonEff()
                return "Epsilon Particles: " + notationChooser(player.pa.clickableamt.epsilon) +
                    ".<br>Boosts Shrink Points gain by x" + notationChooser(eff) + "."
            },
            onClick() {
                if (!player.pa.points.gte(1)) return
                if (player.pa.buyMode === "1pct") {
                    let amt = Decimal.max(player.pa.points.div(100).floor(), 1)
                    player.pa.clickableamt.epsilon = player.pa.clickableamt.epsilon.add(amt)
                    player.pa.points = player.pa.points.sub(amt)
                } else if (player.pa.buyMode === "10pct") {
                    let amt = Decimal.max(player.pa.points.div(10).floor(), 1)
                    player.pa.clickableamt.epsilon = player.pa.clickableamt.epsilon.add(amt)
                    player.pa.points = player.pa.points.sub(amt)
                } else if (player.pa.buyMode === "50pct") {
                    let amt = player.pa.points.div(2).floor()
                    player.pa.clickableamt.epsilon = player.pa.clickableamt.epsilon.add(amt)
                    player.pa.points = player.pa.points.sub(amt)
                }
            }      
        },
    },
    passiveGeneration() {
        if (new Decimal(player.timePlayed - player.en.bleh).lt(1)) return 0
        let base = 0.0001
        if (hasMilestone("w", 4)) base = base * 7
        if (hasMilestone("ma", 16)) base = base / 300
        if (hasUpgrade("ma", 223)) base = base * buyableEffect("ma", 22).pow(Decimal.max(new Decimal(6).sub(getBuyableAmount("ma", 22).div(10)), new Decimal(3.5))).toNumber()
        if (hasMilestone("cl", 3)) base = base * 5
        if (hasUpgrade("cl", 15)) base = base * 10
        if (hasMilestone("w", 4)) return base
        if (hasUpgrade("pa", 32)) return base
        if (hasMilestone("mo", 14)) return 0.01
        if (hasUpgrade("ma", 211)) return 0.00625
        if (hasMilestone("pa", 2)) return 0.0025
        return 0
    },
    milestones: {
        1: {
            requirementDescription: "15M spent Particles",
            effectDescription: "^1.01 Atoms",
            done() { return player.pa.totalParticles.gte(15e6) }
        },
        2: {
            requirementDescription: "1e33 (1 De) spent Particles and 2e33 Particles on hand",
            effectDescription: "On Particle reset, keep Row 9 Energy Upgrades. Quintuple passive Molecules gain and start to generate Particles a second. Extend Particle upgrades, and boost 'Six' effect.",
            done() { return (player.pa.totalParticles.gte(1e33) && player.pa.points.gte(2e33)) },
            unlocked() { return hasUpgrade("pa", 25)}
        },
        3: {
            requirementDescription: "e216 Particles on hand",
            effectDescription: "Shrink Speed ^1.1, x216 Particles but reduce the gain of Matter",
            done() { return player.pa.points.gte(1e216) },
            unlocked() { return hasMilestone("cl", 4)}
        },
    },
    upgrades: {
        11: {
            title: "One [3]",
            description: "x5 Atoms, x2 Matter. Gen 6-8 and Tickspeed buys MAX now and costs nothing.",
            cost: new Decimal(3),
        },
        12: {
            title: "Two [6]",
            description: "Keep Energy Row 8 and Matter Row 4 Upgrades on reset. x5 Energy, x2 Power.",
            cost: new Decimal(5),
            unlocked() { return (hasUpgrade("pa", 11) && player.pa.totalParticles.gte(3)) }, 
        },
        13: {
            title: "Three [9]",
            description: "Booster Base is increased to 8, Tickspeed base is increased to 1.11, and gain 2 Gen 1s for every Tickspeed bought.",
            cost: new Decimal(7),
            unlocked() { return (hasUpgrade("pa", 12) && player.pa.totalParticles.gte(6)) }, 
        },
        14: {
            title: "Four [25]",
            description: "Boost the 'Sodium' Upgrade and the effects of Gen 5-8",
            cost: new Decimal(12),
            unlocked() { return (hasUpgrade("pa", 13) && player.pa.totalParticles.gte(9)) }, 
        },
        15: {
            title: "Five [7000]",
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
        21: {
            title: "Six [50000]", // next upg cost 100K
            description: "Particle Upgrades add to 'Chlorine' and 'Argon'. For every Matter/Particle upgrade, x1.1 Molecule Bonds gain.",
            cost: new Decimal(3750),
            effect() {
                matterups = player.ma.upgrades.length
                if (hasUpgrade("pa", 21)) matterups = matterups + player.pa.upgrades.length
                if (hasMilestone("pa", 2)) matterups = matterups + player.en.upgrades.length
                scale = new Decimal(1.1)
                let eff = scale.pow(matterups)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x"
            },
            tooltip() {
                return "Formula: " + scale + "^Matter Upgrades"
            },
            unlocked() { return (hasUpgrade("pa", 15) && player.pa.totalParticles.gte(7000)) }, 
        },
        22: {
            title: "Seven [60M]",
            description: "Boost Power based on itself. Power also boosts Particles and Molecules.",
            cost: new Decimal(112500),
            effect() {
                powsq = 0.03
                if (hasUpgrade("pa", 31)) powsq = 0.04
                softcapDescriptionpa22 = ""
                sdsc = ""
                upgEffectpa22 = upgradeEffect(this.layer, this.id)
                let eff = player.en.power.add(1).pow(powsq)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionpa22
            },
            tooltip() {
                return "Formula: (Power+1)^"  + powsq + sdsc
            },
            unlocked() { return (hasUpgrade("pa", 21) && player.pa.totalParticles.gte(50000)) }, 
        },
        23: {
            title: "Eight [5e11]",
            description: "All particles are stronger... but: Beta Particles divide Power gain",
            cost: new Decimal(160e6),
            unlocked() { return (hasUpgrade("pa", 22) && player.pa.totalParticles.gte(60e6)) }, 
        },
        24: {
            title: "Nine [5e20]",
            description: "The matter softcap is delayed immensely to e10,000. However, the effect of the Matter layer is weaker.",
            cost: new Decimal(1.8e13),
            unlocked() { return (hasUpgrade("pa", 23) && player.pa.totalParticles.gte(5e11)) }, 
        },
        25: {
            title: "Ten [1e34]",
            description: "Unlock the Delta Particle and the Second Particle Milestone.",
            cost: new Decimal(1.5e21),
            unlocked() { return (hasUpgrade("pa", 24) && player.pa.totalParticles.gte(5e20)) }, 
        },
        31: {
            title: "Eleven [1e47 Delta Particles]",
            description: "'Seven' and Matter layer boost is stronger",
            cost: new Decimal(1.6e35),
            unlocked() { return (hasUpgrade("pa", 25) && player.pa.totalParticles.gte(1e34)) }, 
        },
        32: {
            title: "Twelve [1e75 Alpha AND Beta Particles]",
            description: "Keep upgrades s-1 to s-5, Shrinkenators and Scandium on Particle/Molecule reset. x250 Particles but /100 nett Particle Passive Generation. ^1.004 Atoms.",
            cost: new Decimal(1.7e49),
            unlocked() { return (hasUpgrade("pa", 31) && player.pa.clickableamt.delta.gte(1e47)) }, 
        },
        33: {
            title: "Thirteen [7e107 Epsilon Particles]",
            description: "Irrational Numbers are best, right? Increase Alpha Particle base by 3pi/10, Booster base by e/5 and Delta Particle base by Phi (golden ratio)/100",
            cost: new Decimal(1.7e75),
            unlocked() { return (hasUpgrade("pa", 32) && player.pa.clickableamt.beta.gte(1e75) && player.pa.clickableamt.alpha.gte(1e75)) }, 
        },
        34: {
            title: "Fourteen [4M SP]",
            description: "Completing the cycle -- Gen 1^0.01 boosts Gen 8 gain, with the min effect being e10x. S1's shrink base increase effect is overhauled.",
            cost: new Decimal(1.8e108),
            unlocked() { return (hasUpgrade("pa", 33) && player.pa.clickableamt.epsilon.gte(7e107))}, 
        },
        35: {
            title: "Fifteen",
            description: "xe100 Power and Atoms.",
            cost: new Decimal(2.5e130),
            unlocked() { return (hasUpgrade("pa", 34) && player.ma.shrinkpts.gte(4e6))}, 
        },
    },
    getAlphaEff() {
        if (player.pa.clickableamt.alpha.gte(1)) {
            let base = 5
            if (hasUpgrade("mo", 35)) base = 7
            if (hasUpgrade("pa", 23)) base = 9
            if (hasUpgrade("pa", 33)) base = base + (Math.PI * 3 / 10)
            let eff = Decimal.max(Decimal.pow(base, player.pa.clickableamt.alpha.add(1).log(2)).mul(4), 1)
            if (hasUpgrade("mo", 53)) eff = eff.pow(Decimal.max(player.cl.energy.slog().div(2).add(0.15), 1))
            return eff
        }
        return new Decimal(1)
    },
    getBetaEff() {
        if (player.pa.clickableamt.beta.gte(1)) {
            let base = 1.5
            if (hasUpgrade("mo", 35)) base = 1.7
            if (hasUpgrade("pa", 23)) base = 2
            return Decimal.max(Decimal.pow(base, player.pa.clickableamt.beta.add(1).log(2)).mul(2), 1)
        }
        return new Decimal(1)
    },
    getGammaEff() {
        if (player.pa.clickableamt.gamma.gte(1)) {
            let base = 1.2
            if (hasUpgrade("pa", 23)) base = 1.275
            return Decimal.max(Decimal.pow(base, player.pa.clickableamt.gamma.add(1).log(2)).mul(1.3), 1)
        }
        return new Decimal(1)
    },
    getDeltaEff() {
        if (player.pa.clickableamt.delta.gte(1)) {
            let base = 1.1
            if (hasUpgrade("pa", 33)) base = base + 0.0161803398874989484820
            return Decimal.max(Decimal.pow(base, player.pa.clickableamt.delta.add(1).log(5)).mul(2.5), 1)
        }
        return new Decimal(1)
    },
    getEpsilonEff() {
        if (player.pa.clickableamt.delta.gte(1)) {
            let base = 1.1
            return Decimal.pow(base, Decimal.max(player.pa.clickableamt.epsilon.div("e60"), new Decimal(1)).log(100))
        }
        return new Decimal(1)
    },

    gainMult() { // Prestige multiplier
        let mult = new Decimal(Math.min((player.timePlayed - player.en.bleh)/10, 1))
        if (hasAchievement("a", 66)) mult = mult.times(1.01)
        if (hasAchievement("a", 71)) mult = mult.times(1.02)
        if (hasAchievement("a", 72)) mult = mult.times(1.03)
        if (hasAchievement("a", 94)) mult = mult.times(1.04)
        if (hasUpgrade("pa", 32)) mult = mult.times(250)
        if (hasMilestone("w", 4)) mult = mult.times(5)
        if (hasUpgrade("ma", 224)) mult = mult.times(9)
        if (hasMilestone("cl", 2)) mult = mult.times(player.cl.points)
        if (hasMilestone("pa", 3)) mult = mult.times(216)
        if (player.cm.clickmastery.gte(1.5e13) && hasMilestone("w", 4)) player.cm.clickmastery.div(1e10).log(1000)
	    if (hasMilestone("cl", 1)) mult = mult.times(new Decimal(10).pow(player.cl.energy.add(1).slog()))
        if (hasUpgrade("ma", 55)) mult = mult.times(upgradeEffect("ma", 55))
        if (hasUpgrade("pa", 25)) mult = mult.times(layers.pa.getDeltaEff())
        if (hasUpgrade("pa", 22)) mult = mult.times(player.en.power.add(1).pow(player.en.powerexpoparticle))
        if (player.cm.clickmastery.gte(1e12) && hasMilestone("w", 4)) mult = mult.times(1.4)
        if (player.cm.clickmastery.gte(1.6e15) && hasMilestone("w", 4)) mult = mult.times(1.4)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    branches: ["ma", "mo"], // Layers that this layer depends on
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset to gain Particles", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    update(diff) {
        if (hasUpgrade("pa", 23)) player.pa.clickablenerf.beta = layers.pa.getBetaEff().pow(0.5)
        let expgamma = new Decimal(1.5)
        if (hasMilestone("cl", 3)) expgamma = new Decimal(1.4)
        if (hasUpgrade("mo", 35)) player.pa.clickablenerf.gamma = layers.pa.getGammaEff().pow(expgamma)
        if (hasUpgrade("pa", 25)) player.pa.clickablenerf.delta = layers.pa.getDeltaEff().pow(4)
        

        // passive assigning of Particles
        if (hasUpgrade("ma", 55) || hasMilestone("cl", 1)) {
            player.pa.clickableamt.alpha = player.pa.clickableamt.alpha.add(player.pa.points.div(100e3).times(diff))
            player.pa.clickableamt.beta = player.pa.clickableamt.beta.add(player.pa.points.div(100e3).times(diff))
        }
        if (hasUpgrade("ma", 225) || hasMilestone("cl", 1)) {
            player.pa.clickableamt.delta = player.pa.clickableamt.delta.add(player.pa.points.div(200e3).times(diff))
            player.pa.clickableamt.gamma = player.pa.clickableamt.gamma.add(player.pa.points.div(200e3).times(diff))
        }
        if (hasUpgrade("cl", 13)) {
            let epsidiv = new Decimal(1e6)
            if (hasUpgrade("cl", 36)) epsidiv = new Decimal(200e3)
            player.pa.clickableamt.epsilon = player.pa.clickableamt.epsilon.add(player.pa.points.div(epsidiv).times(diff))
        }
    },
})