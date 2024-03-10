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
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("prestige", 11) },
        },
        13: {
            title: "Is it a lot?",
            description: "x10 RP, x100 PF",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("prestige", 12) },
        },
        14: {
            title: "Is it a lot? (2)",
            description: "x10 RP, x1K PF",
            cost: new Decimal(25),
            unlocked() { return hasUpgrade("prestige", 13) },
        },
        21: {
            title: "Can Rebirth Extend",
            description: "x25 RP, BP and PF. Unlock 2 new RP Upgrades.",
            cost: new Decimal(50),
            unlocked() { return hasUpgrade("prestige", 14) },
        },
        22: {
            title: "Compounding IV",
            description: "Rebirth Points boosts itself.",
            cost: new Decimal(500),
            unlocked() { return hasUpgrade("prestige", 21) },
            effect() {
                let pu6exp = 0.05
                if (hasUpgrade("mega", 41)) pu6exp = 0.08
                let eff = player["rebirth"].points.add(1).pow(pu6exp)
                eff = softcap(eff, new Decimal("1e1111111"), 0.35)
                return eff
            },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("e1111111")) ) {
                    softcapDescription = " (Softcapped)"
                }
                return "This upgrade boosts Rebirth Points by " + format(upgEffect)+"x" + softcapDescription
            },
        },
        23: {
            title: "10^^2",
            description: "x10^10 PF",
            cost: new Decimal(2500),
            unlocked() { return hasUpgrade("prestige", 22) },
        },
        24: {
            title: "Exponent+",
            description: "+^0.02 BP, ^1.02 PF",
            cost: new Decimal(20000),
            unlocked() { return hasUpgrade("prestige", 23) },
        },
        31: {
            title: "Insanely OP, but with a catch",
            description: "x1e20 PF, x1e8 BP, x1e3 RP, BUT /10 PP",
            cost: new Decimal(10000000),
            unlocked() { return hasUpgrade("prestige", 24) },
        },
        32: {
            title: "The last Upgrade before the reset",
            description: "Basic Upgrade 10 is buffed, and +^0.01 RP, +^0.03 BP",
            cost: new Decimal(200e6),
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
    },
    milestones: {
        1: {
            requirementDescription: "3 PP",
            effectDescription: "Generate 1,000,000% of Basic Points a second",
            done() { return player["prestige"].points.gte(3) }
        },
        2: {
            requirementDescription: "10 PP",
            effectDescription: "x100 PF.",
            done() { return player["prestige"].points.gte(10) }
        },
        3: {
            requirementDescription: "400 PP",
            effectDescription: "Generate 100% of Rebirth Points a second. Also x1,000 RP.",
            done() { return player["prestige"].points.gte(400) }
        },
        4: {
            requirementDescription: "1,500 PP",
            effectDescription: "Keep Row 5 Basic Point Upgs on Reset",
            done() { return player["prestige"].points.gte(1500) }
        },
        5: {
            requirementDescription: "20K PP",
            effectDescription: "Keep Rebirth Milestone and Rebirth Upgrade 9.",
            done() { return player["prestige"].points.gte(20000) }
        },
        6: {
            requirementDescription: "500,000 PP",
            effectDescription: "Generate 10,000% of Rebirth Points a second.",
            done() { return player["prestige"].points.gte(500000) }
        },
        7: {
            requirementDescription: "1e10 PP",
            effectDescription: "Keep all Rebirth Upgrades (Row 1 and 2) and RU32",
            done() { return player["prestige"].points.gte(1e10) }
        },
    },
    doReset(prestige) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[prestige].row <= this.row) return;
      
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 11, Challenge 32, Buyable 12
        let keptUpgrades = []
        if ((hasMilestone('mega', 2)) && hasUpgrade(this.layer, 21)) keptUpgrades.push(21)
        if (hasMilestone('mega', 5) && hasUpgrade(this.layer, 32)) keptUpgrades.push(32);

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
              if ((hasMilestone('sac', 15)) && hasUpgrade(this.layer, 41)) keptUpgrades.push(41)
              if ((hasMilestone('sac', 15)) && hasUpgrade(this.layer, 42)) keptUpgrades.push(42)
              if ((hasMilestone('sac', 26)) && hasUpgrade(this.layer, 43)) keptUpgrades.push(43)
              if ((hasMilestone('sac', 26)) && hasUpgrade(this.layer, 44)) keptUpgrades.push(44)
          }
      
        // Stage 3, track which main features you want to keep - all upgrades, total points, specific toggles, etc.
        let keep = [];
        if ((hasMilestone('mega', 2))) keep.push("milestones");
      
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
        if (hasUpgrade('mega', 73)) mult = mult.times("1e2580")
        if (hasMilestone('e', 11)) mult = mult.times("1e10000")
        if (hasUpgrade('e', 91)) mult = mult.times("1e400")
        if (hasUpgrade('prestige', 51)) mult = mult.times("e5000")
        if (hasUpgrade('prestige', 54)) mult = mult.times("e25000")
        if (hasUpgrade('w', 12)) mult = mult.times("e2000")
        if (hasUpgrade('w', 33)) mult = mult.times("e70000")
        if (hasUpgrade('prestige', 15)) mult = mult.times("e100000")
        if (hasUpgrade('prestige', 45)) mult = mult.times("e100000")
        if (hasUpgrade('s', 54)) mult = mult.times("e40000")
        // secret achievement
        if (hasAchievement('sa', 15)) mult = mult.times(1.1)
        if (hasAchievement('sa', 16)) mult = mult.times(1.1)
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
        return exp
    },
    effect(){
        let eff = player.prestige.points.add(1).pow(2.5)
        let cap = 0.3
        let spreff = 0.5
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
        softcappedEffect = softcap(eff, new Decimal("e6500"), new Decimal(cap))
        softcappedEffect = softcap(softcappedEffect, new Decimal("e1000000"), new Decimal(spreff))
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
            let desc = "which is boosting basic points and point fragments by x" + format(tmp[this.layer].effect) + softcapDescription;
            return desc;
        },
    branches: ["rebirth"],  
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for Prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

})