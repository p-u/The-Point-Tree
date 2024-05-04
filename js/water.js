addLayer("w", {
    name: "Water", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasMilestone('s', 5) || player.w.unlocked) visible = true
       return visible
    },
    passiveGeneration() {
        if (hasMilestone('s', 5)) return 5
        return 0
    },
    infoboxes: {
        info: {
            title: "NOTE",
            body() { return "Click Water button to be able to buy upgrades. [Won't reset sacs or Supreme Points]" },
        },
    },   
    color: "blue",
    requires: new Decimal("1e1000"), // Can be a function that takes requirement increases into account
    resource: "Water", // Name of currency
    baseResource: "Energy", // Name of resource prestige is based on
    baseAmount() {return player.e.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.01,  // Balance is needed. Balanced to SAC 3. Have to balance to sac 4 // Prestige currency exponent
    upgrades: {
        11: {
            title: "How is this any different from energy?",
            description: "x2 Water, and x1e250K PF",
            cost: new Decimal(200),
        },
        12: {
            title: "Another x2?",
            description: "x2 Water, and x1e2K PP",
            cost: new Decimal(400),
            unlocked() { return hasUpgrade("w", 11) },
        },
        13: {
            title: "Woah, I love compounding.",
            description: "Water gets boosted based on itself.",
            cost: new Decimal(1250),
            unlocked() { return hasUpgrade("w", 12) },
            effect() {
                let w3exp = 0.111
                if (hasUpgrade('w', 31)) w3exp = 0.13
                if (hasUpgrade('w', 43)) w3exp = 0.145
                if (hasMilestone('w', 1)) w3exp = 0.16
                if (hasUpgrade('w', 52)) w3exp = 0.175
                return player["w"].points.add(1).pow(w3exp)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Super Water",
            description: "x2.5 Water, and x10B Energy",
            cost: new Decimal(3333),
            unlocked() { return hasUpgrade("w", 13) },
        },
        21: {
            title: "That's actually useful",
            description: "x1.25 SP, x3.8 Water",
            cost: new Decimal(12500),
            unlocked() { return hasUpgrade("w", 14) },
        },
        22: {
            title: "Water Plus",
            description: "x3.19 Water, Water boosts energy more",
            cost: new Decimal(70000),
            unlocked() { return hasUpgrade("w", 21) },
        },
        23: {
            title: "Water Too OP?",
            description: "Water boosts energy LESS, xe25 Energy, x4 Water",
            cost: new Decimal(400000),
            unlocked() { return hasUpgrade("w", 22) },
        },
        24: {
            title: "Water Supreme",
            description: "x3 Water, x3 SP, unlock more Supreme Upgrades.",
            cost: new Decimal(5e6),
            unlocked() { return hasUpgrade("w", 23) },
        },
        31: {
            title: "Water Crazy",
            description: "Water boosts energy more, WU13 is stronger",
            cost: new Decimal(4e9),
            unlocked() { return hasUpgrade("w", 24) },
        },
        32: {
            title: "Water Power!",
            description: "x5 Water, ^1.01 Water, ^1.01 PF",
            cost: new Decimal(1.2e10),
            unlocked() { return hasUpgrade("w", 31) },
        },
        33: {
            title: "Water Prestige",
            description: "x3 Water, xe70K PP",
            cost: new Decimal(7e10),
            unlocked() { return hasUpgrade("w", 32) },
        },
        34: {
            title: "Water Blaster",
            description: "x50 Water, x8 SP, xe2e6 PF",
            cost: new Decimal(1e12),
            unlocked() { return hasUpgrade("w", 33) },
        },
        41: {
            title: "40,000 Bo'o'waters",
            description: "x40.000 Water, xe1M BP",
            cost: new Decimal(3.011e28),
            unlocked() { return hasUpgrade("w", 34) && hasUpgrade("s", 52) },
        },
        42: {
            title: "Water Gun",
            description: "x5 Water, xe200K RP, xe1.5M PF",
            cost: new Decimal(2.6e30),
            unlocked() { return hasUpgrade("w", 41) },
        },
        43: {
            title: "Water Water",
            description: "Water Upg 13 is better",
            cost: new Decimal(2.2e31),
            unlocked() { return hasUpgrade("w", 42) },
        },
        44: {
            title: "Water Mastery Boost",
            description: "The most insane boost. xe5M PF. Yes. E5M. You heard that right.",
            cost: new Decimal(1.1e32),
            unlocked() { return hasUpgrade("w", 43) },
        },
        51: {
            title: "Water, Woo!",
            description: "x10T Water, x10M SP",
            cost: new Decimal(6e257),
            unlocked() { return hasMilestone("sac", 45) && hasUpgrade("w", 44) },
        },
        52: {
            title: "More itself",
            description: "WU13 is stronger",
            cost: new Decimal(3e274),
            unlocked() { return hasMilestone("sac", 45) && hasUpgrade("w", 51) },
        },
        53: {
            title: "Strong Water",
            description: "x1 Qi Water, xe28M PF",
            cost: new Decimal(1e280),
            unlocked() { return hasMilestone("sac", 45) && hasUpgrade("w", 52) },
        },
        54: {
            title: "Break Infinity",
            description: "^1.011 PF",
            cost: new Decimal(5e307),
            unlocked() { return hasMilestone("sac", 45) && hasUpgrade("w", 53) },
        },
        61: {
            title: "All again, another.",
            description: "xe150M PF",
            cost: new Decimal("1.7e1152"),
            unlocked() { return hasMilestone("sac", 58) && hasUpgrade("w", 54) },
        },
        62: {
            title: "Quattuorquinquagintillioning",
            description: "xe167 Water",
            cost: new Decimal("1.5e1164"),
            unlocked() { return hasMilestone("sac", 58) && hasUpgrade("w", 61)  }, 
        },
        63: {
            title: "More sacrifices",
            description: "MP +^0.05, PP +^0.1",
            cost: new Decimal("2e1388"),
            unlocked() { return hasMilestone("sac", 58) && hasUpgrade("w", 62)  }, 
        },
        64: {
            title: "Buyaboost",
            description: "Supreme Buyable 1,3,5 is stronger",
            cost: new Decimal("3e1419"),
            unlocked() { return hasMilestone("sac", 58) && hasUpgrade("w", 63)  }, 
        },
    },
    milestones: {
        1: {
            requirementDescription: "The First Water Milestone (3.33e135 Water)",
            effectDescription: "^1.025 PF, WU13 is stronger",
            done() { return player["w"].points.gte("3.33e135") },
            unlocked() {return player["sac"].points.gte(64)},
        },
        2: {
            requirementDescription: "The Second Water Milestone (1.111e1111 Water)",
            effectDescription: "+^0.1111 PP",
            done() { return player["w"].points.gte("1.111e1111") },
            unlocked() {return player["sac"].points.gte(132)},
        },
    },
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        if (hasUpgrade('s', 63)) mult = mult.times(buyableEffect('s', 14))
        if (hasUpgrade('w', 11)) mult = mult.times(2)
        if (hasUpgrade('w', 12)) mult = mult.times(2)
        if (hasUpgrade('w', 13)) mult = mult.times(upgradeEffect('w', 13))
        if (hasUpgrade('w', 14)) mult = mult.times(2.5)
        if (hasUpgrade('w', 21)) mult = mult.times(3.8)
        if (hasUpgrade('w', 22)) mult = mult.times(3.19)
        if (hasUpgrade('w', 23)) mult = mult.times(4)
        if (hasUpgrade('w', 24)) mult = mult.times(3)
        if (hasUpgrade('s', 41)) mult = mult.times(2)
        if (hasMilestone('s', 6)) mult = mult.times(15)
        if (hasUpgrade('w', 32)) mult = mult.times(5)
        if (hasUpgrade('w', 33)) mult = mult.times(3)
        if (hasUpgrade('w', 34)) mult = mult.times(50)
        if (hasUpgrade('mega', 84)) mult = mult.times(200)
        if (hasUpgrade('s', 52)) mult = mult.times(upgradeEffect('s', 52))
        if (hasUpgrade('w', 41)) mult = mult.times(40)
        if (hasUpgrade('w', 42)) mult = mult.times(5)
        if (hasMilestone('sac', 34)) mult = mult.times(5)
        if (hasUpgrade('prestige', 45)) mult = mult.times(5)
        if (hasUpgrade('prestige', 55)) mult = mult.times(35)
        if (hasUpgrade('s', 53)) mult = mult.times(buyableEffect('s', 13))
        if (hasUpgrade('s', 54)) mult = mult.times(10)
        if (hasMilestone('e', 13)) mult = mult.times(10)
        if (hasAchievement('a', 126)) mult = mult.times(45.1)
        if (hasAchievement('a', 136)) mult = mult.times(1000)
        if (hasMilestone('e', 14)) mult = mult.times(1e6)
        if (hasUpgrade('w', 51)) mult = mult.times(1e13)
        if (hasUpgrade('w', 53)) mult = mult.times(1e18)
        if (hasUpgrade('rebirth', 75)) mult = mult.times(3.77)
        if (hasUpgrade('w', 62)) mult = mult.times(1e167)

        
        if (hasAchievement('sa', 32)) mult = mult.times(1.05)
        if (hasAchievement('sa', 33)) mult = mult.times(1.1)
        if (hasAchievement('sa', 34)) mult = mult.times(1.25)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade('w', 32)) exp = exp.add(0.01)
        if (hasUpgrade('s', 61)) exp = exp.add(0.01)
        if (hasAchievement('a', 171)) exp = exp.add(0.02)
        if (inChallenge('m', 11)) exp = exp.mul(0.4)
        return exp
    },
    branches: ["s", "e"],
    effect(){
        let weffpow = 3
        if (hasUpgrade('w', 22)) weffpow = 4
        if (hasUpgrade('w', 23)) weffpow = 2
        if (hasUpgrade('w', 31)) weffpow = 3
        if (hasUpgrade('e', 65)) weffpow = 5
            let eff = player.w.points.add(1).pow(weffpow)
           return eff
           },
            effectDescription() {
                let desc = "which is boosting Energy by x" + format(tmp[this.layer].effect);
                return desc;
            },
    row: 5, // Row the layer is in on the tree (0 is the first row)
})