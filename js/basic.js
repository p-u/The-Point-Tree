addLayer("basic", {
    name: "Basic Points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    doReset(basic) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[basic].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
        for(i=1;i<5;i++){ //rows
            for(v=1;v<4;v++){ //columns
              if ((hasMilestone('rebirth', 3)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
            for(v=4;v<5;v++){ //columns
                if ((hasMilestone('rebirth', 5)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
              }
            for(v=5;v<6;v++){ //columns
                if ((hasMilestone('prestige', 3)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
            for(v=6;v<7;v++){ //columns
                if ((hasMilestone('mega', 6)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
            for(v=7;v<8;v++){ //columns
                if ((hasMilestone('sac', 11)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
            for(v=8;v<9;v++){ //columns
                if ((hasMilestone('sac', 27)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
            for(v=9;v<10;v++){ //columns
                if ((hasMilestone('sac', 39)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
          }
            for(v=1;v<8;v++){ //columns
              if ((hasMilestone('sac', 19)) && hasUpgrade(this.layer, 5+v*10)) keptUpgrades.push(5+v*10)
            }
            for(v=8;v<9;v++){ //columns
                if ((hasMilestone('sac', 31)) && hasUpgrade(this.layer, 85)) keptUpgrades.push(85)
            }
            for(v=9;v<10;v++){ //columns
                if ((hasMilestone('sac', 39)) && hasUpgrade(this.layer, 95)) keptUpgrades.push(95)
            }
    
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
        if (hasMilestone("sac", 41)) keep.push("milestones");
        if (hasMilestone("rebirth", 9)) keep.push("milestones");
    
        // Stage 4, do the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },  
    upgrades: {
        11: {
            title: "The first upgrade!",
            description: "Doubles your point fragment gain.",
            cost: new Decimal(1),

        },
        12: {
            title: "Boosting I",
            description: "Basic points boost point fragments.",
            cost: new Decimal(2),
            effect() {
                let expu2 = 0.35
                if (hasUpgrade("basic", 62)) expu2 = 0.3575
                let eff = player[this.layer].points.add(1).pow(expu2)
                eff = softcap(eff, new Decimal("1e50000000"), 0.5)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() { return hasUpgrade("basic", 11) },

        },
        13: {
            title: "Boosting II",
            description: "Point Fragments boost basic points.",
            cost: new Decimal(5),
            effect() {
                let expu3 = 0.16
                let eff = player.points.add(1).pow(expu3)
                eff = softcap(eff, new Decimal("1e5000000"), 0.5)
                eff = softcap(eff, new Decimal("1e25000000"), 0.3)
                return eff
            },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("e5000000")) ) {
                    softcapDescription = " (Softcapped)"
                }
                if (upgEffect.gte(new Decimal("e25000000")) ) {
                    softcapDescription = " (Supercapped)"
                }
                return "This upgrade boosts Basic Points by " + format(upgEffect)+"x" + softcapDescription
            },
            unlocked() { return hasUpgrade("basic", 12) },
        },
        14: {
            title: "Double Boost",
            description: "Boost basic points and point fragments by 1.35x.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("basic", 13) },
        },
        21: {
            title: "Compounding",
            description: "Basic Points boosts itself.",
            cost: new Decimal(25),
            effect() {
                let expu5 = 0.175
                if (inChallenge("sac", 12)) expu5 = 0.111
                let eff = player.basic.points.add(1).pow(expu5)
                eff = softcap(eff, new Decimal("1e5000000"), 0.5)
                return eff
            },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("e5000000")) ) {
                    softcapDescription = " (Softcapped)"
                }
                return "This upgrade boosts Basic Points by " + format(upgEffect)+"x" + softcapDescription
            },
            unlocked() { return hasUpgrade("basic", 14) },
        },
        22: {
            title: "Doubling",
            description: "Point Fragments are doubled again!",
            cost: new Decimal(70),
            unlocked() { return hasUpgrade("basic", 21) },
        },
        23: {
            title: "A boost",
            description: "Basic Points are multiplied by 1.39",
            cost: new Decimal(200),
            unlocked() { return hasUpgrade("basic", 22) },
        },
        24: {
            title: "Compounding II",
            description: "Point Fragments boosts itself",
            cost: new Decimal(400),
            effect() {
                let expu8 = 0.1625
                if (inChallenge("sac", 12)) expu8 = 0
                let eff = player.points.add(1).pow(expu8)
                eff = softcap(eff, new Decimal("1e40000000"), 0.5)
                eff = softcap(eff, new Decimal("1e200000000"), 0.4)
                return eff
            },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("e40000000")) ) {
                    softcapDescription = " (Softcapped)"
                }
                if (upgEffect.gte(new Decimal("e200000000")) ) {
                    softcapDescription = " (Supercapped)"
                }
                return "This upgrade boosts Point Fragments by " + format(upgEffect)+"x" + softcapDescription
            },
            unlocked() { return hasUpgrade("basic", 23) },
        },
        31: {
            title: "Tripling!!",
            description: "Point fragments are TRIPLED!!",
            cost: new Decimal(1000),
            unlocked() { return hasUpgrade("basic", 24) },
        },
        32: {
            title: "Compounding III",
            description: "Point fragments boost itself, again, but less",
            cost: new Decimal(4000),
            effect() {
                let expu10 = 0.055
                if (hasUpgrade('rebirth', 31)) expu10 = 0.075
                if (hasUpgrade('prestige', 32)) expu10 = 0.09
                if (inChallenge("sac", 12)) expu10 = 0
                let eff = player.points.add(500000).pow(expu10)
                eff = softcap(eff, new Decimal("1e100000000"), 0.5)
                eff = softcap(eff, new Decimal("1e2500000000"), 0.4)
                return eff
            },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("e100000000")) ) {
                    softcapDescription = " (Softcapped)"
                }
                return "This upgrade boosts Point Fragments by " + format(upgEffect)+"x" + softcapDescription
            },
            unlocked() { return hasUpgrade("basic", 31) },
        },
        33: {
            title: "Another boost",
            description: "Point fragments are multiplied by 2.5",
            cost: new Decimal(15000),
            unlocked() { return hasUpgrade("basic", 32) },
        },
        34: {
            title: "Not bad a boost",
            description: "The final upgrade before the next reset layer: X5 POINT FRAGMENTS!!",
            cost: new Decimal(50000),
            unlocked() { return hasUpgrade("basic", 33) },
        },
        41: {
            title: "Tri-boost",
            description: "Rebirth Points x1.19, Basic Points x1.91, Point Fragments x9.11",
            cost: new Decimal(100e6),
            unlocked() { return hasMilestone("rebirth", 1) && hasUpgrade("basic", 34)},
        },
        42: {
            title: "Moar-Boost",
            description: "Rebirth Points x1.277, Point Fragments x7.77",
            cost: new Decimal(1e10),
            unlocked() { return hasUpgrade("basic", 41) },
        },
        43: {
            title: "EXPONENTS!",
            description: "Basic Points +^0.02, Point Fragments ^1.05",
            cost: new Decimal(4e12),
            unlocked() { return hasUpgrade("basic", 42) },
        },
        44: {
            title: "Tri-boost II",
            description: "Rebirth Points x2, Basic Points x4, Point Fragments x10",
            cost: new Decimal(7e17),
            unlocked() { return hasUpgrade("basic", 43) },
        },
        51: {
            title: "Big Boost",
            description: "Point Fragments x100",
            cost: new Decimal(2.5e67),
            unlocked() { return hasMilestone("rebirth", 6) && hasUpgrade("basic", 44)},
        },
        52: {
            title: "Tri-boost III",
            description: "PF X100, RP X2.5, BP X10",
            cost: new Decimal(2.5e72),
            unlocked() { return hasUpgrade("basic", 51) },
        },
        53: {
            title: "Exponent II",
            description: "PF X10K, BP +^0.02, RP +^0.005",
            cost: new Decimal(5e83),
            unlocked() { return hasUpgrade("basic", 52) },
        },
        54: {
            title: "MEGA INSANE UPGRADE",
            description: "PF X1K, PF^1.04, BP X100, BP+^0.02, RP X5, RP+^0.005",
            cost: new Decimal(1e102),
            unlocked() { return hasUpgrade("basic", 53) },
        },
        61: {
            title: "Already a lot",
            description: "Multiply point fragments by...1e25...",
            cost: new Decimal("e3960"),
            unlocked() { return hasMilestone("mega", 3) && hasUpgrade("basic", 54) },
        },
        62: {
            title: "Upgrade Boosting",
            description: "Basic Upgrade 2 is boosted.",
            cost: new Decimal("e4545"),
            unlocked() { return hasMilestone("mega", 3) && hasUpgrade("basic", 61) },
        },
        63: {
            title: "Mega Insane",
            description: "Mega Upgrade 4 is boosted.",
            cost: new Decimal("e5680"),
            unlocked() { return hasMilestone("mega", 3) && hasUpgrade("basic", 62) },
        },
        64: {
            title: "Quite a lot",
            description: "Point fragments x1e50",
            cost: new Decimal("e6250"),
            unlocked() { return hasMilestone("mega", 3) && hasUpgrade("basic", 63) },
        },
        71: {
            title: "How OP can the seventh row get?",
            description: "x7e777 Point Fragments, x7.77e7 Mega Points",
            cost: new Decimal("e209209"),
            unlocked() { return hasMilestone("sac", 7) && hasUpgrade("basic", 64) },
        },
        72: {
            title: "Well, INSANELY OP.",
            description: "^1.01 Point Fragments",
            cost: new Decimal("e221550"),
            unlocked() { return hasMilestone("sac", 7) && hasUpgrade("basic", 71) },
        },
        73: {
            title: "That's a bit too OP.",
            description: "Mega Upgrade 14 is stronger. xe500 Points.",
            cost: new Decimal("e260000"),
            unlocked() { return hasMilestone("sac", 7) && hasUpgrade("basic", 72) },
        },
        74: {
            title: "Now there is 28 basic upgrades.",
            description: "Mega Upgrade 14 is stronger, again!",
            cost: new Decimal("e274525"),
            unlocked() { return hasMilestone("sac", 7) && hasUpgrade("basic", 73) },
        },
        81: {
            title: "Basic Boost 1.",
            description: "Basic Points boosts Rebirth Points, by a little",
            cost: new Decimal("e13610000"),
            effect() {
                let bb1exp = 0.006
                if (hasUpgrade('basic', 85)) bb1exp = 0.009
                return player.points.add(1).pow(bb1exp)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() { return hasMilestone("sac", 25) && hasUpgrade("basic", 74) },
        },
        82: {
            title: "Basic Boost 2.",
            description: "Basic Points boosts Prestige Points, by very little",
            cost: new Decimal("e13842250"),
            effect() {
                let bb2exp = 0.0004
                if (hasUpgrade('basic', 85)) bb2exp = 0.0006
                if (hasUpgrade('m', 33)) bb3exp = 0.000725
                return player.points.add(1).pow(bb2exp)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() { return hasMilestone("sac", 25) && hasUpgrade("basic", 81) },
        },
        83: {
            title: "Basic Boost 3.",
            description: "Basic Points boosts Mega Points, by very very little",
            cost: new Decimal("e14019250"),
            effect() {
                let bb3exp = 0.0000175
                if (hasUpgrade('basic', 85)) bb3exp = 0.0000225
                if (hasUpgrade('m', 33)) bb3exp = 0.000036
                return player.points.add(1).pow(bb3exp)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() { return hasMilestone("sac", 25) && hasUpgrade("basic", 82) },
        },
        84: {
            title: "Basic Boost 4.",
            description: "Basic Points boosts Energy, by insanely little",
            cost: new Decimal("e14151000"),
            effect() {
                let bb3exp = 0.0000007
                if (hasUpgrade('basic', 85)) bb3exp = 0.00000088
                let eff = player.points.add(1).pow(bb3exp)
                eff = softcap(eff, new Decimal("e175"), 0.3)
                return eff
            },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("e175")) ) {
                    softcapDescription = " (Softcapped)"
                }
                return "This upgrade boosts Energy by " + format(upgEffect)+"x" + softcapDescription
            },
            unlocked() { return hasMilestone("sac", 25) && hasUpgrade("basic", 83) },
        },
        91: {
            title: "How OP can the 9TH ROW GET??",
            description: "xe9.99M PF, xe999.99K RP, xe99.99 Energy, x99.99 SP",
            cost: new Decimal("e279004000"),
            unlocked() { return hasMilestone("sac", 38) && hasUpgrade("basic", 85) },
        },
        92: {
            title: "BExp Again",
            description: "+^0.025 BP",
            cost: new Decimal("e291288888"),
            unlocked() { return hasMilestone("sac", 38) && hasUpgrade("basic", 91) },
        },
        93: {
            title: "PFExp Again",
            description: "^1.02 PF",
            cost: new Decimal("e303272500"),
            unlocked() { return hasMilestone("sac", 38) && hasUpgrade("basic", 92) },
        },
        94: {
            title: "Multiplicative BP",
            description: "xe10M BP",
            cost: new Decimal("e316648000"),
            unlocked() { return hasMilestone("sac", 38) && hasUpgrade("basic", 93) },
        },


        // dimensional shift

        15: {
            title: "Row 5 of the basic upgrades / BU:Supreme",
            description: "Woah, a new column! x1e10,000 PF",
            cost: new Decimal("e2578500"),
            unlocked() { return hasMilestone("sac", 15) && hasUpgrade("basic", 74) },
        },
        25: {
            title: "Again",
            description: "x1e10,000 Basic Points",
            cost: new Decimal("e2700750"),
            unlocked() { return hasMilestone("sac", 15) && hasUpgrade("basic", 15) },
        },
        35: {
            title: "Softcap change",
            description: "Rebirth Softcap is much weaker, but Prestige softcap is slightly stronger",
            cost: new Decimal("e3094500"),
            unlocked() { return hasMilestone("sac", 15) && hasUpgrade("basic", 25) },
        },
        45: {
            title: "Sussy Upgrade",
            description: "Sussy Upgrade",
            cost: new Decimal("e3628500"),
            unlocked() { return hasMilestone("sac", 15) && hasUpgrade("basic", 35) },
        },
        55: {
            title: "Many many things",
            description: "Rebirth Softcap is much weaker, x1e30K PF, Energy effect stronger, but -^0.03 Basic Exponent",
            cost: new Decimal("e4261500"),
            unlocked() { return hasMilestone("sac", 15) && hasUpgrade("basic", 45) },
        },
        65: {
            title: "Softcap Change II",
            description: "Rebirth Supercap is much weaker, but Prestige softcap is much stronger",
            cost: new Decimal("e4727500"),
            unlocked() { return hasMilestone("sac", 15) && hasUpgrade("basic", 55) },
        },
        75: {
            title: "An exponent! Finally!",
            description: "^1.005 PF.",
            cost: new Decimal("e6810000"),
            unlocked() { return hasMilestone("sac", 15) && hasUpgrade("basic", 65) },
        },
        85: {
            title: "Basic Boost PLUS",
            description: "Basic Boost 1-4 is Stronger.",
            cost: new Decimal("e22290000"),
            unlocked() { return hasMilestone("sac", 25) && hasUpgrade("basic", 84) },
        },
        95: {
            title: "Biggest PF BOOST!!",
            description: "xe18.2M PF",
            cost: new Decimal("e322159400"),
            unlocked() { return hasMilestone("sac", 38) && hasUpgrade("basic", 94) },
        },
    },
    milestones: {
        1: {
            requirementDescription: "It's never too late to have milestones. (BM1: e421,662,500 BP)",
            effectDescription: "^1.025 PF, +^0.025 BP",
            done() { return player["basic"].points.gte("e421662500") },
            unlocked() {return player["sac"].points.gte(64)},
        },
        2: {
            requirementDescription: "Wait... A new currency? (BM2: e1,886,230,000 PF)",
            effectDescription: "^1.02 PF, xe20M PF",
            done() { return player.points.gte("e1886230000") },
            unlocked() {return player["sac"].points.gte(64)},
        },
        3: {
            requirementDescription: "Godly-Tier PF Mult (BM3: e2,282,415,000 PF)",
            effectDescription: "xe30M PF",
            done() { return player.points.gte("e2282415000") },
            unlocked() {return hasMilestone("basic", 2)},
        },
        4: {
            requirementDescription: "How do I even get this? [Mastery-Challenge-Specific] (Need e9081178 PF)",
            effectDescription: "^1.05 PF",
            done() {
                if (inChallenge("m", 11)) {
                    if (player.points.gte("e9081178")) {
                        return true
                    }
                }
            },
            unlocked() {return inChallenge("m", 11)},
        },
        5: {
            requirementDescription: "More PF power [Mastery-Challenge-Specific] (Need e11.78M PF)",
            effectDescription: "^1.15 PF, x1K Energy",
            done() {
                if (inChallenge("m", 11)) {
                    if (hasMilestone("sac", 10)) {
                        if (player.points.gte("e11780000")) {
                            return true
                        }
                    }
                }
            },
            unlocked() {return inChallenge("m", 11) && hasMilestone("basic", 5)},
        },
    },
    color: "#add8e6",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Basic Points", // Name of currency
    baseResource: "Point Fragments", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    passiveGeneration() {
        if (hasMilestone('mega', 1)) return 10000000
        if (hasMilestone('prestige', 1)) return 10000
        if (hasMilestone('rebirth', 4)) return 100
        if (hasMilestone('rebirth', 2)) return 1
        return 0
    },
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        if (layers.prestige.effect().gte(1)) mult = mult.times(layers.prestige.effect())
        if (layers.mega.effect().gte(1)) mult = mult.times(layers.mega.effect())
        if (hasUpgrade('basic', 13)) mult = mult.times(upgradeEffect('basic', 13))
        if (hasUpgrade('basic', 21)) mult = mult.times(upgradeEffect('basic', 21))
        if (hasUpgrade('basic', 14)) mult = mult.times(1.35)
        if (hasUpgrade('basic', 23)) mult = mult.times(1.39)
        if (hasUpgrade('basic', 41)) mult = mult.times(1.91)
        if (hasUpgrade('basic', 44)) mult = mult.times(4)
        if (hasUpgrade('basic', 52)) mult = mult.times(10)
        if (hasUpgrade('basic', 54)) mult = mult.times(100)
        if (hasUpgrade('rebirth', 12)) mult = mult.times(5)
        if (hasUpgrade('rebirth', 13)) mult = mult.times(1.28)
        if (hasUpgrade('rebirth', 21)) mult = mult.times(2)
        if (hasUpgrade('rebirth', 24)) mult = mult.times(2.22)
        if (hasUpgrade('rebirth', 32)) mult = mult.times(1111.11)
        if (hasUpgrade('prestige', 11)) mult = mult.times(5)
        if (hasUpgrade('prestige', 21)) mult = mult.times(25)
        if (hasUpgrade('prestige', 21)) mult = mult.times(1e8)
        if (hasUpgrade('prestige', 33)) mult = mult.times(1e200)
        if (hasUpgrade('mega', 11)) mult = mult.times(1000)
        if (hasUpgrade('mega', 24)) mult = mult.times(1e15)
        if (hasMilestone('sac', 2)) mult = mult.times(1e30)
        if (hasMilestone('sac', 8)) mult = mult.times("1e400")
        if (hasUpgrade('e', 12)) mult = mult.times(1e250)
        if (hasUpgrade('basic', 25)) mult = mult.times("1e10000")
        if (hasAchievement("a", 93)) mult = mult.times("1e27000")
        if (inChallenge("sac", 11)) {
            if (hasUpgrade('e', 111)) mult = mult.times("1e5000")
            if (hasUpgrade('e', 113)) mult = mult.times("1e4000")
        }
        if (hasUpgrade('rebirth', 45)) mult = mult.times("e30103")
        if (hasUpgrade('w', 41)) mult = mult.times("e1e6")
        if (hasUpgrade('s', 54)) mult = mult.times("e500000")
        if (hasUpgrade('s', 91)) mult = mult.times("e1e7")
        if (hasUpgrade('basic', 94)) mult = mult.times("e1e7")
        if (hasAchievement('sa', 13)) mult = mult.times(1.05)
        if (hasAchievement('sa', 14)) mult = mult.times(1.1)
        if (hasAchievement('sa', 15)) mult = mult.times(1.1)
        if (hasAchievement('sa', 16)) mult = mult.times(1.1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade('basic', 43)) exp = exp.add(0.02)
        if (hasUpgrade('basic', 53)) exp = exp.add(0.02)
        if (hasUpgrade('basic', 54)) exp = exp.add(0.02)
        if (hasUpgrade('rebirth', 22)) exp = exp.add(0.01)
        if (hasUpgrade('prestige', 12)) exp = exp.add(0.01)
        if (hasUpgrade('prestige', 24)) exp = exp.add(0.02)
        if (hasUpgrade('prestige', 32)) exp = exp.add(0.025)
        if (hasUpgrade('mega', 22)) exp = exp.add(0.03)
        if (hasUpgrade('rebirth', 34)) exp = exp.sub(0.08)
        if (hasUpgrade('basic', 55)) exp = exp.sub(0.03)
        if (hasMilestone('sac', 18)) exp = exp.sub(0.05)
        if (hasMilestone('sac', 21)) exp = exp.sub(0.1)
        if (hasUpgrade('rebirth', 25)) exp = exp.sub(0.03)
        if (hasMilestone('e', 12)) exp = exp.sub(0.1)
        if (hasAchievement("a", 134)) exp = exp.add(0.01)
        if (hasMilestone('sac', 38)) exp = exp.add(0.02)
        if (inChallenge('sac', 14)) exp = exp.mul(0.5)
        if (hasUpgrade('basic', 92)) exp = exp.add(0.025)
        if (hasMilestone('basic', 1)) exp = exp.add(0.025)
        if (inChallenge('m', 11)) exp = exp.mul(0.2)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for basic points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})