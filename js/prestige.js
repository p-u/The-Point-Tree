addLayer("prestige", {
    name: "Prestige Points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasUpgrade('basic', 54) || player.prestige.unlocked) visible = true
       return visible
     },
     passiveGeneration() {
        if (hasMilestone('mega', 5)) return 50
        if (hasMilestone('mega', 4)) return 1
        return 0
    },
    upgrades: {
        11: {
            title: "You Prestiged! This is the first upgrade.",
            description: "x20 PF, x5 BP, x2 RP",
            cost: new Decimal(1),
        },
        12: {
            title: "Exponent",
            description: "+^0.01 BP, x10 PF, x1.75 RP",
            cost: new Decimal(1),
            unlocked() { return hasUpgrade("prestige", 11) },
        },
        13: {
            title: "Is it a lot?",
            description: "x10 RP, x100 PF",
            cost: new Decimal(4),
            unlocked() { return hasUpgrade("prestige", 12) },
        },
        14: {
            title: "Is it a lot? (2)",
            description: "x10 RP, x1K PF",
            cost: new Decimal(16),
            unlocked() { return hasUpgrade("prestige", 13) },
        },
        21: {
            title: "Can Rebirth Extend",
            description: "x25 RP, BP and PF. Unlock 2 new RP Upgrades.",
            cost: new Decimal(90),
            unlocked() { return hasUpgrade("prestige", 14) },
        },
        22: {
            title: "Compounding IV",
            description: "Rebirth Points boosts itself.",
            cost: new Decimal(8000),
            unlocked() { return hasUpgrade("prestige", 21) },
            main() {
                pu6exp = 0.05
                if (hasUpgrade("mega", 41)) pu6exp = 0.08
                if (hasMilestone("prestige", 8)) pu6exp = 0.16
                if (hasUpgrade("era", 254)) pu6exp = 0.22
                softcapDescriptionp22 = ""
                softcapStart = new Decimal("1e1111111")
                if (hasMilestone("rebirth", 8)) softcapStart = new Decimal("e2.5e6")
                sdsc = ""
                scpow = 0.35
                if (hasUpgrade('m', 94)) scpow = 0.375
                upgEffectp22 = upgradeEffect(this.layer, this.id)
                if (upgEffectp22.gte(new Decimal(softcapStart)) ) {
                    softcapDescriptionp22 = " (Softcapped)"
                    sdsc = ". Softcaps ^" + scpow + " at " + notationChooser(softcapStart)
                }
            },
            effect() {
                let eff = player["rebirth"].points.add(1).pow(pu6exp)
                eff = softcap(eff, softcapStart, scpow)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgEffectp22)+"x" + softcapDescriptionp22
            },
            tooltip() {
                return "Formula: RP^"  + pu6exp + sdsc
            },
        },
        23: {
            title: "10^^2",
            description: "x10^10 PF",
            cost: new Decimal(20000),
            unlocked() { return hasUpgrade("prestige", 22) },
        },
        24: {
            title: "Exponent+",
            description: "+^0.02 BP, ^1.02 PF",
            cost: new Decimal(600000),
            unlocked() { return hasUpgrade("prestige", 23) },
        },
        31: {
            title: "Insanely OP, but with a catch",
            description: "x1e20 PF, x1e8 BP, x1e3 RP, BUT /10 PP",
            cost: new Decimal(50e6),
            unlocked() { return hasUpgrade("prestige", 24) },
        },
        32: {
            title: "The last Upgrade before the reset",
            description: "Basic Upgrade 10 is buffed, and +^0.01 RP, +^0.03 BP",
            cost: new Decimal(1e9),
            unlocked() { return hasUpgrade("prestige", 31) },
        },
        33: {
            title: "Era 2",
            description: "x1e300 PF, x1e200 BP, x1e100 RP, x1e50 PP",
            cost: new Decimal("1.46e446"),
            unlocked() { return hasMilestone("mega", 10) && hasUpgrade("prestige", 32) },
        },
        34: {
            title: "The devil has awakened...",
            description: "x6.66e666 PF, x6.6e66 PP, x6e6 MP",
            cost: new Decimal("6.66e666"),
            unlocked() { return hasMilestone("mega", 10) && hasUpgrade("prestige", 33) },
        },
        41: {
            title: "ERA III",
            description: "For reaching e19,315 PP, you get x1e1,000 PP",
            cost: new Decimal("1e19315"),
            unlocked() { return hasMilestone("sac", 13) && hasUpgrade("prestige", 34) },
        },
        42: {
            title: "Booster",
            description: "x1,000 Energy, Prestige Softcap is weaker",
            cost: new Decimal("2e21202"),
            unlocked() { return hasMilestone("sac", 13) && hasUpgrade("prestige", 41) },
        },
        43: {
            title: "You know the drill.",
            description: "+^0.03 PP, +^0.01 Energy, Prestige Softcap is weaker",
            cost: new Decimal("1e137405"),
            unlocked() { return hasMilestone("sac", 22) && hasUpgrade("prestige", 42) },
        },
        44: {
            title: "That's not a big boost.",
            description: "Prestige Softcap is weaker, ^1.0025 PF",
            cost: new Decimal("1e143912"),
            unlocked() { return hasMilestone("sac", 22) && hasUpgrade("prestige", 43) },
        },
        51: {
            title: "MOAR PP",
            description: "+^0.02 PP, xe5K PP",
            cost: new Decimal("e536430"),
            unlocked() { return hasMilestone("sac", 30) && hasUpgrade("prestige", 44) },
        },
        52: {
            title: "MOAR PF",
            description: "xe400K PF",
            cost: new Decimal("e557923"),
            unlocked() { return hasMilestone("sac", 30) && hasUpgrade("prestige", 51) },
        },
        53: {
            title: "Softcapper",
            description: "PP Softcap is less",
            cost: new Decimal("e576100"),
            unlocked() { return hasMilestone("sac", 30) && hasUpgrade("prestige", 52) },
        },
        54: {
            title: "PP Wow",
            description: "xe25K PP, /e500 MP",
            cost: new Decimal("e581346"),
            unlocked() { return hasMilestone("sac", 30) && hasUpgrade("prestige", 53) },
        },
        61: {
            title: "Prestige REP UPGS! [1]",
            description: "Formula: e(20M + (20M * RepUpgNo)) PF",
            cost: new Decimal("e55367367"),
            unlocked() { return hasMilestone("sac", 51) && hasUpgrade("prestige", 55) },
        },
        62: {
            title: "Prestige REP UPGS! [2]",
            description: "Formula: e(20M + (20M * RepUpgNo)) PF",
            cost: new Decimal("e55880550"),
            unlocked() { return hasMilestone("sac", 51) && hasUpgrade("prestige", 61) },
        },
        63: {
            title: "Prestige REP UPGS! [3]",
            description: "Formula: e(20M + (20M * RepUpgNo)) PF",
            cost: new Decimal("e56906906"),
            unlocked() { return hasMilestone("sac", 51) && hasUpgrade("prestige", 62) },
        },
        64: {
            title: "Prestige REP UPGS! [4]",
            description: "Formula: e(20M + (20M * RepUpgNo)) PF",
            cost: new Decimal("e58448530"),
            unlocked() { return hasMilestone("sac", 51) && hasUpgrade("prestige", 63) },
        },
        71: {
            title: "Point Fragments = Life",
            description: "Another xe250B PF",
            cost: new Decimal("e364285678e3"),
            unlocked() { return hasUpgrade("era", 91) && hasUpgrade("prestige", 65) },
        },
        72: {
            title: "Slowly nullifying the Supercap",
            description: "Pres Supercap is weaker",
            cost: new Decimal("e416317039e3"),
            unlocked() { return hasUpgrade("era", 91) && hasUpgrade("prestige", 71) },
        },
        73: {
            title: "Let's go PP!",
            description: "+^0.05 PP",
            cost: new Decimal("e427789944e3"),
            unlocked() { return hasUpgrade("era", 91) && hasUpgrade("prestige", 72) },
        },
        74: {
            title: "More sacrifices",
            description: "Reduce sac scaling by a bit",
            cost: new Decimal("e461007277277"),
            unlocked() { return hasUpgrade("era", 91) && hasUpgrade("prestige", 73) },
        },

        15: {
            title: "PP!",
            description: "xe100K PP",
            cost: new Decimal("e1928250"),
            unlocked() { return hasMilestone("sac", 34) && hasUpgrade("prestige", 14) },
        },
        25: {
            title: "PP Cap-Power",
            description: "PP Effect Softcap is weaker, PP +^0.02",
            cost: new Decimal("e2092300"),
            unlocked() { return hasMilestone("sac", 34) && hasUpgrade("prestige", 15) },
        },
        35: {
            title: "PP PF Power-Up",
            description: "PF ^1.015, PP +^0.05",
            cost: new Decimal("e2155150"),
            unlocked() { return hasMilestone("sac", 34) && hasUpgrade("prestige", 25) },
        },
        45: {
            title: "Advanced Layer Boost",
            description: "SP x3, Water x5, PP xe100K",
            cost: new Decimal("e2366200"),
            unlocked() { return hasMilestone("sac", 34) && hasUpgrade("prestige", 35) },
        },
        55: {
            title: "Progressively more UNSTABLE",
            description: "SP x10, Water x35, PF xe2.8M",
            cost: new Decimal("e2547000"),
            unlocked() { return hasMilestone("sac", 34) && hasUpgrade("prestige", 45) },
        },
        65: {
            title: "Prestige REP UPGS! [5]",
            description: "Formula: e(20M + (20M * RepUpgNo)) PF",
            cost: new Decimal("e60503303"),
            unlocked() { return hasMilestone("sac", 51) && hasUpgrade("prestige", 64) },
        },
        75: {
            title: "EC+*",
            description: "xe500B PF AND x17 Era Crystals",
            cost: new Decimal("e462212603e3"),
            unlocked() { return hasUpgrade("era", 91) && hasUpgrade("prestige", 74) },
        },
        
        // row 8+
        81: {
            title: "A catch",
            description: "Sacrifice scaling is way way less, BUT -^0.05 MP",
            cost: new Decimal("e5.269096262242e16"),
            unlocked() { return hasAchievement("a", 233) && hasUpgrade("prestige", 75) },
        },
        82: {
            title: "Another catch??",
            description: "+^0.08 MP, but -^0.05 PP",
            cost: new Decimal("e5.654617974192e16"),
            unlocked() { return hasAchievement("a", 233) && hasUpgrade("prestige", 81) },
        },
        83: {
            title: "Catch obsession",
            description: "+^0.08 PP, but -^0.05 RP",
            cost: new Decimal("e5.77151973174e16"),
            unlocked() { return hasAchievement("a", 233) && hasUpgrade("prestige", 82) },
        },
        84: {
            title: "Yes",
            description: "+^0.11 RP, but -^0.011 BP",
            cost: new Decimal("e6.70517924374e16"),
            unlocked() { return hasAchievement("a", 233) && hasUpgrade("prestige", 83) },
        },
        85: {
            title: "A ^0.xxx PF?",
            description: "+^0.06 BP, but ^0.99 PF. Extend Era Upgrades, x850 EC",
            cost: new Decimal("e6.738852390157e16"),
            unlocked() { return hasAchievement("a", 233) && hasUpgrade("prestige", 83) },
        },
    },
    milestones: {
        1: {
            requirementDescription: "2 PP",
            effectDescription: "Generate 1,000,000% of Basic Points a second",
            done() { return player["prestige"].points.gte(2) }
        },
        2: {
            requirementDescription: "8 PP",
            effectDescription: "Keep Row 1-4 Basic Point Upgs on reset",
            done() { return player["prestige"].points.gte(8) }
        },
        3: {
            requirementDescription: "35 PP",
            effectDescription: "Keep Row 5 Basic Point Upgs on Reset",
            done() { return player["prestige"].points.gte(35) }
        },
        4: {
            requirementDescription: "900 PP",
            effectDescription: "Generate 100% of Rebirth Points a second. Also x1,000 RP.",
            done() { return player["prestige"].points.gte(900) }
        },
        5: {
            requirementDescription: "100K PP",
            effectDescription: "Keep Rebirth Milestones, Row 1 Rebirth Upgrades, Rebirth Upgrade 9, x100 PF",
            done() { return player["prestige"].points.gte(100000) }
        },
        6: {
            requirementDescription: "15,000,000 PP",
            effectDescription: "Generate 10,000% of Rebirth Points a second.",
            unlocked() { return hasMilestone("prestige", 4)},
            done() { return player["prestige"].points.gte(15e6) }
        },
        7: {
            requirementDescription: "250M PP",
            effectDescription: "Keep Row 2 Rebirth Upgrades and RU32",
            unlocked() { return hasMilestone("prestige", 6)},
            done() { return player["prestige"].points.gte(250e6) }
        },
        8: {
            requirementDescription: "e10,175,850 PP",
            effectDescription: "Prestige Supercap is weaker, PU24 is way stronger",
            done() { return player["prestige"].points.gte("e10175850") },
            unlocked() {return player["sac"].points.gte(64)},
        },
        9: {
            requirementDescription: "e5563 PP [Mastery Challenge Specific] [Req Sac 10]",
            effectDescription: "Well well well... ^1.2 PF!!",
            done() {
                if (inChallenge("m", 11)) {
                    if (hasMilestone("sac", 10)) {
                        if (player.prestige.points.gte("e5563")) {
                            return true
                        }
                    }
                }
            },
            unlocked() {return inChallenge("m", 11) && hasMilestone("sac", 10)},
        },
        10: {
            requirementDescription: "MC2S (Pres I) - e66,136,216 PP [Req Sac 17]",
            effectDescription: "+^0.0628 PP, Sacrifice Scaling is weaker",
            done() {
                if (inChallenge("m", 12)) {
                    if (hasMilestone("sac", 17)) {
                        if (player.prestige.points.gte("e66136196")) {
                            return true
                        }
                    }
                }
            },
            unlocked() {return inChallenge("m", 12)},
        },
        11: {
            requirementDescription: "Prestige Domination (Req e50T, or e5e13 PP)",
            effectDescription: "xe40T PF",
            done() { return player["prestige"].points.gte("e5e13") },
            unlocked() {return hasUpgrade("era", 161)},
        },
    },
    doReset(prestige) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[prestige].row <= this.row) return;
      
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 11, Challenge 32, Buyable 12
        let keptUpgrades = []
        if ((hasMilestone('mega', 2)) && hasUpgrade(this.layer, 21)) keptUpgrades.push(21)
        if (hasMilestone('mega', 7) && hasUpgrade(this.layer, 31)) keptUpgrades.push(31);
        if (hasMilestone('mega', 7) && hasUpgrade(this.layer, 32)) keptUpgrades.push(32);
        if ((hasMilestone('sac', 15)) && hasUpgrade(this.layer, 41)) keptUpgrades.push(41)
        if ((hasMilestone('sac', 15)) && hasUpgrade(this.layer, 42)) keptUpgrades.push(42)
        if ((hasMilestone('sac', 26)) && hasUpgrade(this.layer, 43)) keptUpgrades.push(43)
        if ((hasMilestone('sac', 26)) && hasUpgrade(this.layer, 44)) keptUpgrades.push(44)

        for(i=1;i<5;i++){ //rows
            for(v=1;v<2;v++){ //columns
              if ((hasMilestone('mega', 4)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
            for(v=2;v<3;v++){ //columns
                if ((hasMilestone('mega', 5)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
              }
            for(v=3;v<4;v++){ //columns
                if ((hasMilestone('sac', 2)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
              }
              for(v=5;v<6;v++){ //columns
                if ((hasMilestone('sac', 32)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
              }
            for(v=1;v<6;v++){ //columns
                if ((hasMilestone('sac', 36)) && hasUpgrade(this.layer, 5+v*10)) keptUpgrades.push(5+v*10)
            }
          }
          for(i=1;i<6;i++){ //rows
            for(v=6;v<7;v++){ //columns
                if ((hasMilestone('sac', 55)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
              }
            }
      
        // Stage 3, track which main features you want to keep - all upgrades, total points, specific toggles, etc.
        let keep = [];
        if ((hasMilestone('mega', 2))) keep.push("milestones");
        if (hasMilestone("era", 3)) keep.push("upgrades");
        if (hasMilestone("era", 3)) keep.push("milestones");
      
        // Stage 4, do the actual data reset
        layerDataReset(this.layer, keep);
      
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades)
      },
    color: "#338333",
    requires: new Decimal(1e150), // Can be a function that takes requirement increases into account
    resource: "Prestige Points", // Name of currency
    baseResource: "Basic Points", // Name of resource prestige is based on
    baseAmount() {return player.basic.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.01, // Prestige currency exponent
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        if (layers.mega.effect().gte(1)) mult = mult.times(layers.mega.effect())
        if (hasUpgrade('basic', 82)) mult = mult.times(upgradeEffect('basic', 82))
        if (hasUpgrade('mega', 14)) mult = mult.times(upgradeEffect('mega', 14))
        if (hasUpgrade('mega', 25)) mult = mult.times(upgradeEffect('mega', 25))
        if (hasUpgrade('rebirth', 32)) mult = mult.times(1.11)
        if (hasUpgrade('prestige', 31)) mult = mult.times(0.1)
        if (hasUpgrade('prestige', 33)) mult = mult.times(1e50)
        if (hasUpgrade('prestige', 34)) mult = mult.times(6.6e66)
        if (hasMilestone('sac', 2)) mult = mult.times(10000)
        if (hasAchievement('a', 52)) mult = mult.times(1e18)
        if (hasUpgrade('e', 21)) mult = mult.times(1e100)
        if (hasUpgrade('prestige', 41)) mult = mult.times("1e1000")
        if (inChallenge("sac", 12)) {
            if (hasUpgrade('e', 123)) mult = mult.times("1e1500")
        }
        if (hasUpgrade('e', 81)) mult = mult.times("1e5500")
        if (hasMilestone('sac', 24)) mult = mult.times("1e10000")
        if (hasUpgrade('mega', 73)) mult = mult.times("1e5160")
        if (hasUpgrade('mega', 74)) mult = mult.times("1e2580")
        if (hasUpgrade('mega', 75)) mult = mult.times("e1540.26e3")
        if (hasMilestone('e', 11)) mult = mult.times("1e10000")
        if (hasUpgrade('e', 91)) mult = mult.times("1e400")
        if (hasUpgrade('prestige', 51)) mult = mult.times("e5000")
        if (hasUpgrade('prestige', 54)) mult = mult.times("e25000")
        if (hasUpgrade('w', 12)) mult = mult.times("e2000")
        if (hasUpgrade('w', 33)) mult = mult.times("e70000")
        if (hasUpgrade('prestige', 15)) mult = mult.times("e100000")
        if (hasUpgrade('prestige', 45)) mult = mult.times("e100000")
        if (hasUpgrade('s', 54)) mult = mult.times("e40000")
        if (hasUpgrade('rebirth', 64)) mult = mult.times("e111.11e3")
        if (hasUpgrade('m', 54)) mult = mult.times("e2.5e6")
        if (hasUpgrade('e', 104)) mult = mult.times("e69.69e6")
        if (hasMilestone('sac', 69)) mult = mult.times("e360e6")
        if (hasUpgrade('s', 111)) mult = mult.times("e3e9")
        if (hasUpgrade('era', 172)) mult = mult.times("e1e12")
        if (hasAchievement('a', 213)) mult = mult.times("e3e12")
        if (hasUpgrade('e', 152)) mult = mult.times("e100e12")
        if (hasUpgrade('mega', 103)) mult = mult.times("e5e14")
        if (hasUpgrade('era', 95)) mult = mult.times("e6e15")
        if (hasUpgrade('m', 122)) mult = mult.times("e2e16")
        if (hasUpgrade('rebirth', 93)) mult = mult.times("e2.7e17")

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade('mega', 22)) exp = exp.add(0.01)
        if (hasMilestone('e', 1)) exp = exp.add(0.02)
        if (hasUpgrade('prestige', 43)) exp = exp.add(0.03)
        if (hasMilestone('sac', 27)) exp = exp.add(0.025)
        if (hasUpgrade('rebirth', 25)) exp = exp.add(0.12)
        if (hasUpgrade('prestige', 51)) exp = exp.add(0.02)
        if (hasMilestone('e', 12)) exp = exp.sub(0.1)
        if (inChallenge('sac', 14)) exp = exp.mul(0.5)
        if (hasUpgrade('s', 14)) exp = exp.add(0.01)
        if (hasUpgrade('mega', 83)) exp = exp.add(0.02)
        if (hasUpgrade('prestige', 25)) exp = exp.add(0.02)
        if (hasUpgrade('prestige', 35)) exp = exp.add(0.05)
        if (hasUpgrade('s', 84)) exp = exp.add(0.025)
        if (hasMilestone('sac', 37)) exp = exp.add(0.02)
        if (hasUpgrade('s', 93)) exp = exp.add(0.05)
        if (inChallenge('m', 11)) exp = exp.mul(0.2)
        if (hasUpgrade('mega', 55)) exp = exp.add(0.05)
        if (hasUpgrade('rebirth', 73)) exp = exp.add(0.005)
        if (hasMilestone('w', 2)) exp = exp.add(0.1111)
        if (hasUpgrade('w', 63)) exp = exp.add(0.1)
        if (hasUpgrade('basic', 103)) exp = exp.add(0.05)
        if (hasAchievement('a', 181)) exp = exp.add(0.035)
            if (inChallenge("m", 12)) {
                if (hasMilestone("e", 22)) exp = exp.add(0.025)
                if (hasMilestone("w", 3)) exp = exp.add(0.1)
                if (hasMilestone("prestige", 10)) exp = exp.add(0.0628)
            }
        if (hasUpgrade('mega', 94)) exp = exp.add(0.005)
        if (hasUpgrade('prestige', 73)) exp = exp.add(0.05)
        if (hasUpgrade('era', 184)) exp = exp.add(0.12)
        if (hasUpgrade('era', 204)) exp = exp.add(0.1)
        if (hasUpgrade('basic', 114)) exp = exp.add(0.09)
        if (hasUpgrade('prestige', 82)) exp = exp.sub(0.05)
        if (hasUpgrade('prestige', 83)) exp = exp.add(0.08)
        if (hasUpgrade('era', 323)) exp = exp.add(0.02)
        if (hasUpgrade('era', 302)) exp = exp.add(0.04)
        if ((hasUpgrade('m', 1131)) && inChallenge("m", 11)) exp = exp.add(0.05)
        if (player.sac.sacstr.gte(2)) exp = exp.add(player.sac.se2)
        return exp
    },
    effect(){
        let effectBoost = 2.5
        if (hasUpgrade("rebirth", 74)) effectBoost = 4
        let eff = player.prestige.points.add(1).pow(effectBoost)
        let cap = 0.3
        let spreff = 0.5
        let hcapeff = 0.5
        if (hasMilestone('sac', 8)) cap = 0.31
        if (hasUpgrade('prestige', 42)) cap = 0.4
        if (hasUpgrade('basic', 35)) cap = 0.37
        if (hasMilestone('sac', 17)) cap = 0.41
        if (hasUpgrade('basic', 65)) cap = 0.35
        if (hasUpgrade('e', 53)) cap = 0.375
        if (hasUpgrade('prestige', 43)) cap = 0.45
        if (hasUpgrade('prestige', 44)) cap = 0.551
        if (hasMilestone('sac', 29)) cap = 0.65
        if (hasUpgrade('prestige', 53)) cap = 0.78
        if (hasUpgrade('prestige', 25)) cap = 0.89
        if (hasUpgrade('s', 92)) sc = 0.95
        if ((inChallenge("m", 11)) && (hasUpgrade("m", 1115))) sc = 1
        softcappedEffect = softcap(eff, new Decimal("e6500"), new Decimal(cap))
        if (hasMilestone('prestige', 8)) spreff = 0.67
        if (hasUpgrade('prestige', 72)) spreff = 0.75
        if (hasUpgrade('s', 95)) spreff = 0.95
        if ((inChallenge("m", 11)) && (hasUpgrade("m", 1115))) spreff = 1
        softcappedEffect = softcap(softcappedEffect, new Decimal("e1000000"), new Decimal(spreff))
        softcappedEffect = softcap(softcappedEffect, new Decimal("ee12"), new Decimal(hcapeff))
        let inscapeff = 0.2
        softcappedEffect = softcap(softcappedEffect, new Decimal("e4e18"), new Decimal(inscapeff))
        return softcappedEffect
       },
        effectDescription() {
            let softcapDescription = ""
            let layerEffect = tmp[this.layer].effect
            if (layerEffect.gte(new Decimal("e6500")) ) {
                softcapDescription = " (Softcapped)"
            }
            if (layerEffect.gte(new Decimal("e1000000")) ) {
                softcapDescription = " (Supercapped)"
            }
            if (layerEffect.gte(new Decimal("e1e12")) ) {
                softcapDescription = " (Hypercapped)"
            }
            if (layerEffect.gte(new Decimal("e4e18")) ) {
                softcapDescription = " (Insanitycapped)"
            }
            let desc = "which is boosting basic points and point fragments by x" + notationChooser(tmp[this.layer].effect) + softcapDescription;
            return desc;
        },
    branches: ["rebirth"],  
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for Prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

})