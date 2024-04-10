addLayer("s", {
    name: "Supreme", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasMilestone('sac', 32) || player.s.unlocked || player["s"].points.gte(1)) visible = true
       return visible
    },
    passiveGeneration() {
        if (hasUpgrade('s', 42)) return (buyableEffect('s', 12))
        return 0
    },
    tabFormat: {
        "Main tab": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                "blank",
                "milestones",
                "blank",
                "blank",
                "blank",
                "upgrades"
            ],
        },
        "Supreme Buyables": {
            unlocked() { return (hasAchievement('a', 112))},
            content: [
                "main-display",
                "blank",
                "blank",
                "buyables"
            ],
        },
    },
    color: "#63e5ff",
    requires: new Decimal("e78250"), // Can be a function that takes requirement increases into account
    resource: "Supreme Points", // Name of currency
    baseResource: "Mega Points", // Name of resource prestige is based on
    baseAmount() {return player.mega.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0001, 
    milestones: {
        1: {
            requirementDescription: "The First Supreme",
            effectDescription: "x5 Energy, Keep Dim Shift Reb Upgs on reset",
            done() { return player["s"].points.gte(1) }
        },
        2: {
            requirementDescription: "Wow, QoL [15 Supreme Pts]",
            effectDescription: "Keep Energy Upgs row 7 and 8 on reset",
            done() { return player["s"].points.gte(15) }
        },
        3: {
            requirementDescription: "More QoL [50 Supreme Pts]",
            effectDescription: "Keep Energy Upgs row 9 on reset",
            unlocked() {return player["s"].points.gte(15)},
            done() { return player["s"].points.gte(50) }
        },
        4: {
            requirementDescription: "Supreme Extension 1 - More Energy [12K Supreme Pts]",
            effectDescription: "Unlock 4 new upgs",
            unlocked() {return (hasUpgrade('s', 24))},
            done() { return player["s"].points.gte(12000) }
        },
        5: {
            requirementDescription: "New Reset Layer [35K Supreme Pts]",
            effectDescription: "Unlock Reset Layer: Water",
            unlocked() {return (hasUpgrade('s', 34))},
            done() { return player["s"].points.gte(35000) }
        },
        6: {
            requirementDescription: "A ton of supreme points - 25M",
            effectDescription: "xee6 PF, x15 Water",
            unlocked() {return (hasUpgrade('w', 24))},
            done() { return player["s"].points.gte(25e6) }
        },
    },
    upgrades: {
        11: {
            title: "Supremely Good",
            description: "xe300K PF",
            cost: new Decimal(2),
        },
        12: {
            title: "Supreme Power",
            description: "^1.01 PF",
            cost: new Decimal(7),
            unlocked() { return hasUpgrade("s", 11) },
        },
        13: {
            title: "Supreme Mega Good",
            description: "xe600K PF, xe1K MP",
            cost: new Decimal(25),
            unlocked() { return hasUpgrade("s", 12) },
        },
        14: {
            title: "Supreme Power II",
            description: "^1.01 PF, +^0.01 PP",
            cost: new Decimal(125),
            unlocked() { return hasUpgrade("s", 13) },
        },
        21: {
            title: "Sac Energy",
            description: "Every sac x2 energy",
            cost: new Decimal(100),
            effect() {
                let supu5 = new Decimal(2)
                let exp = new Decimal(1)
                if (hasUpgrade('s', 52)) exp = new Decimal(25)
                if (hasUpgrade('m', 32)) exp = new Decimal(50)
                let sacpt = player["sac"].points
                let eff = supu5.pow(sacpt).pow(exp)
                return eff
            },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                return "This upgrade boosts Energy by " + format(upgEffect)+"x" + softcapDescription
            },
            unlocked() { return hasUpgrade("s", 14) },
        },
        22: {
            title: "The Supremely OP UPG",
            description: "xe1.5M PF",
            cost: new Decimal(480),
            unlocked() { return hasUpgrade("s", 21) },
        },
        23: {
            title: "Choice 1",
            description: "Supreme Buyable 1 base x1.3 to x1.4",
            cost: new Decimal(3500),
            unlocked() { return hasUpgrade("s", 22) },
        },
        24: {
            title: "Choice 1",
            description: "^1.004 PF",
            cost: new Decimal(3500),
            unlocked() { return hasUpgrade("s", 23) },
        },
        31: {
            title: "Supremegy",
            description: "xe15 Energy",
            cost: new Decimal(7000),
            unlocked() { return hasUpgrade("s", 24) && hasMilestone("s", 4) },
        },
        32: {
            title: "Supremelegy",
            description: "xe25 Energy",
            cost: new Decimal(9000),
            unlocked() { return hasUpgrade("s", 31) && hasMilestone("s", 4) },
        },
        33: {
            title: "Supremeletegy",
            description: "xe30 Energy",
            cost: new Decimal(10000),
            unlocked() { return hasUpgrade("s", 32) && hasMilestone("s", 4) },
        },
        34: {
            title: "Supremeletewegy",
            description: "xe30 Energy",
            cost: new Decimal(12000),
            unlocked() { return hasUpgrade("s", 33) && hasMilestone("s", 4) },
        },
        41: {
            title: "Supreme-e-water",
            description: "xe1M PF, x2 Water",
            cost: new Decimal(225000),
            unlocked() { return hasUpgrade("w", 24) && hasUpgrade("s", 34) },
        },
        42: {
            title: "Unlock the 2nd supreme buyable",
            description: "Yay!",
            cost: new Decimal(9.25e5),
            unlocked() { return hasUpgrade("w", 24) && hasUpgrade("s", 41) },
        },
        43: {
            title: "Supremely Boost",
            description: "xe1M PF, x1.8 SP",
            cost: new Decimal(3e6),
            unlocked() { return hasUpgrade("w", 24) && hasUpgrade("s", 42) },
        },
        44: {
            title: "Supremer than ever",
            description: "xe2.1M PF, Supreme Buyable 2 has better effect formula",
            cost: new Decimal(7e11),
            unlocked() { return hasUpgrade("w", 24) && hasUpgrade("s", 43) },
        },
        51: {
            title: "Compounding 9",
            description: "Supreme boosts itself",
            cost: new Decimal(1.7e19),
            unlocked() { return hasUpgrade("mega", 84) && hasUpgrade("s", 44) },
            effect() {
                let c9exp = 0.0325
                if (hasUpgrade('m', 32)) c9exp = new Decimal(0.075)
                return player["s"].points.add(1).pow(c9exp)
            },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                return "This upgrade boosts Supreme Points by " + format(upgEffect)+"x" + softcapDescription
            },
        },
        52: {
            title: "Sac is OP",
            description: "Every sac above 30 x2 water, and Supreme Upg 21 is MUCH STRONGER. Extend Water Upgs",
            cost: new Decimal(2e20),
            effect() {
                let supu5 = new Decimal(2)
                if (hasUpgrade('m', 32)) supu5 = new Decimal(4)
                let sacpt = player["sac"].points
                let eff = supu5.pow(sacpt - 30)
                return eff
            },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                return "This upgrade boosts Water by " + format(upgEffect)+"x" + softcapDescription
            },
            unlocked() { return hasUpgrade("s", 51) },
        },
        53: {
            title: "FINALLY!",
            description: "Unlock Supreme Buyable 3. Supreme Buyable 1 has better formula",
            cost: new Decimal(3e33),
            unlocked() { return hasUpgrade("s", 52) },
        },
        54: {
            title: "8-Boost...",
            description: "PF xe2M, BP xe500K, RP xe120K, PP xe40K, MP xe6K, Energy xe20, Water xe1, SP xe0.5",
            cost: new Decimal(7e33),
            unlocked() { return hasUpgrade("s", 53) },
        },
        61: {
            title: "Game-Changer",
            description: "^1.01 PF, xe10,000,000 PF [WOW!!]",
            cost: new Decimal(2e41),
            unlocked() { return hasUpgrade("s", 54) },
        },
        62: {
            title: "Buyable Stronk",
            description: "SB1 and SB3 is stronger",
            cost: new Decimal(1.25e46),
            unlocked() { return hasUpgrade("s", 61) },
        },
        63: {
            title: "Supremacy Buyable",
            description: "^1.03 PF, Supreme Strong, but scales insanely",
            cost: new Decimal(1.1e50),
            unlocked() { return hasUpgrade("s", 62) },
        },
        64: {
            title: "SP Gets Boosted based on PF.",
            description: "Yeah.",
            effect() {
                let sppfbe = 0.0000000025
                let eff = player.points.add(1).pow(sppfbe)
                eff = softcap(eff, new Decimal("1e100"), 0.5)
                return eff
            },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("e100")) ) {
                    softcapDescription = " (Softcapped)"
                }
                return "This upgrade boosts Supreme Points by " + format(upgEffect)+"x" + softcapDescription
            },
            cost: new Decimal(2.5e59),
            unlocked() { return hasUpgrade("s", 63) },
        },
        71: {
            title: "Massive Choice Upgrades (1: xe5M PF)",
            description: "Choose one row. 7 or 8. The other row scales in price immensely.",
            cost:() => {
                let price = new Decimal("1.2e61")
                if (hasUpgrade("s", 84)) price = new Decimal ("3.3e72")
                return price
            },
            unlocked() { 
                if (hasUpgrade("s", 64)) {
                    if (hasUpgrade("s", 81)) {
                        if (hasUpgrade("s", 84)) {
                            return true;
                        } else {
                            if (hasUpgrade("s", 74)) {
                                return true
                            } else {
                                return false
                            }
                        }
                    } else {
                        return true;
                    }
                } else {
                    return false; // or any other appropriate behavior
                }
            },            
        },
        72: {
            title: "Massive Choice Upgrades (2: xe6M PF)",
            description: "Choose one row. 7 or 8. The other row scales in price immensely.",
            cost:() => {
                let price = new Decimal("4e62")
                if (hasUpgrade("s", 84)) price = new Decimal ("1.125e74")
                return price
            },
            unlocked() { return hasUpgrade("s", 71) },
        },
        73: {
            title: "Massive Choice Upgrades (3: xe8M PF)",
            description: "Choose one row. 7 or 8. The other row scales in price immensely.",
            cost:() => {
                let price = new Decimal("5e66")
                if (hasUpgrade("s", 84)) price = new Decimal ("6.6e75")
                return price
            },
            unlocked() { return hasUpgrade("s", 72) },
        },
        74: {
            title: "Massive Choice Upgrades (4: xe10M PF)",
            description: "Choose one row. 7 or 8. The other row scales in price immensely.",
            cost:() => {
                let price = new Decimal("1e69")
                if (hasUpgrade("s", 84)) price = new Decimal ("1.9e78")
                return price
            },
            unlocked() { return hasUpgrade("s", 73) },
        },
        81: {
            title: "Massive Choice Upgrades (1: x50 SP)",
            description: "Choose one row. 7 or 8. The other row scales in price immensely.",
            cost:() => {
                let price = new Decimal("1.2e61")
                if (hasUpgrade("s", 74)) price = new Decimal ("1e72")
                return price
            },
            unlocked() { 
                if (hasUpgrade("s", 64)) {
                    if (hasUpgrade("s", 71)) {
                        if (hasUpgrade("s", 74)) {
                            return true
                        } else {
                            if (hasUpgrade("s", 84)) {
                                return true
                            } else {
                                return false
                            }
                        }
                    } else {
                        return true
                    }
                } else {
                    return false
                }
            },    
        },                    
        82: {
            title: "Massive Choice Upgrades (2: +^0.025 MP)",
            description: "Choose one row. 7 or 8. The other row scales in price immensely.",
            cost:() => {
                let price = new Decimal("7e62")
                if (hasUpgrade("s", 74)) price = new Decimal ("7.35e73")
                return price
            },
            unlocked() { return hasUpgrade("s", 81) },
        },
        83: {
            title: "Massive Choice Upgrades (3: Supremacy Buyable is Stronger)",
            description: "Choose one row. 7 or 8. The other row scales in price immensely.",
            cost:() => {
                let price = new Decimal("8e66")
                if (hasUpgrade("s", 74)) price = new Decimal ("4e75")
                return price
            },
            unlocked() { return hasUpgrade("s", 82) },
        },
        84: {
            title: "Massive Choice Upgrades (4: +^0.025 PP)",
            description: "Choose one row. 7 or 8. The other row scales in price immensely.",
            cost:() => {
                let price = new Decimal("1.7e71")
                if (hasUpgrade("s", 74)) price = new Decimal ("1.45e80")
                return price
            },
            unlocked() { return hasUpgrade("s", 83) },
        },
        91: {
            title: "Basic Love",
            description: "xe10M BP. x1.0M PF",
            cost: new Decimal(3.33e81),
            unlocked() { return hasUpgrade("s", 84) },
        },
        92: {
            title: "Less Nerfs",
            description: "Rebirth and Prestige Softcap is weaker",
            cost: new Decimal(1e105),
            unlocked() { return hasUpgrade("s", 91) },
        },
        93: {
            title: "PP is a must.",
            description: "+^0.05 PP",
            cost: new Decimal(2.3e136),
            unlocked() { return hasUpgrade("s", 92) },
        },
        94: {
            title: "The Last Upgrade, before the next Reset Layer",
            description: "^1.04 PF",
            cost: new Decimal(3.6e179),
            unlocked() { return hasUpgrade("s", 92) },
        },
    },
    buyables: {
        11: {
        title: "Supreme Buyable 1: Compounder",
        unlocked() { return (hasAchievement('a', 113)) },
        cost(x) {
            let exp2 = 1.1
            return new Decimal(200).mul(Decimal.pow(1.2, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
        },
        display() {
            return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " supreme points." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Supreme Points gain by x" + format(buyableEffect(this.layer, this.id))
        },
        canAfford() {
            return player[this.layer].points.gte(this.cost())
        },
        buy() {
            let cost = new Decimal (1)
            player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
            let base1 = new Decimal(1.3)
            if (hasUpgrade('s', 23)) base1 = new Decimal(1.4)
            if (hasUpgrade('s', 53)) base1 = new Decimal(1.45)
            if (hasUpgrade('s', 62)) base1 = new Decimal(1.8)
            if (hasUpgrade('m', 35)) base1 = new Decimal(2.5)
            let base2 = x
            let expo = new Decimal(1.001)
            let eff = base1.pow(Decimal.pow(base2, expo))
            return eff
        },
    },
    12: {
        title: "Supreme Buyable 2: Passive Supreme Gen",
        unlocked() { return (hasUpgrade('s', 42)) },
        cost(x) {
            let exp2 = 1.1
            return new Decimal(100000).mul(Decimal.pow(1.175, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
        },
        display() {
            return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " supreme points." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Gain " + format(buyableEffect(this.layer, this.id)) + "x of manual reset"
        },
        canAfford() {
            return player[this.layer].points.gte(this.cost())
        },
        buy() {
            let cost = new Decimal (1)
            player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
            let base1 = new Decimal(1.1)
            if (hasUpgrade('s', 44)) base1 = new Decimal(1.15)
            if (hasUpgrade('m', 35)) base1 = new Decimal(1.5)
            let base2 = x
            let expo = new Decimal(1.001)
            let eff = (base1.pow(Decimal.pow(base2, expo))-1)
            return eff
        },
    },
    13: {
        title: "Supreme Buyable 3: Water Mult",
        unlocked() { return (hasUpgrade('s', 53)) },
        cost(x) {
            let exp2 = 1.1
            return new Decimal(1e30).mul(Decimal.pow(1.195, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
        },
        display() {
            return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " supreme points." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Multiply water by " + format(buyableEffect(this.layer, this.id)) + "."
        },
        canAfford() {
            return player[this.layer].points.gte(this.cost())
        },
        buy() {
            let cost = new Decimal (1)
            player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
            let base1 = new Decimal(1.38)
            if (hasUpgrade('s', 62)) base1 = new Decimal(1.8)
            if (hasUpgrade('m', 35)) base1 = new Decimal(2.25)
            let base2 = x
            let expo = new Decimal(1.005)
            let eff = (base1.pow(Decimal.pow(base2, expo))-1)
            return eff
        },
    },
    14: {
        title: "Supreme Buyable 4: Supremacy",
        unlocked() { return (hasUpgrade('s', 63)) },
        cost(x) {
            let exp2 = 3
            return new Decimal(1e50).mul(Decimal.pow(1.5, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
        },
        display() {
            return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " supreme points." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Multiply SP AND WATER by " + format(buyableEffect(this.layer, this.id)) + "."
        },
        canAfford() {
            return player[this.layer].points.gte(this.cost())
        },
        buy() {
            let cost = new Decimal (1)
            player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
            let base1 = new Decimal(100)
            if (hasUpgrade('s', 83)) base1 = new Decimal(1000)
            if (hasUpgrade('m', 35)) base1 = new Decimal(10000)
            let base2 = x
            let expo = new Decimal(1.005)
            let eff = (base1.pow(Decimal.pow(base2, expo))-1)
            return eff
        },
    },
},
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        mult = mult.times(buyableEffect('s', 11))
        if (hasUpgrade('s', 63)) mult = mult.times(buyableEffect('s', 14))
        if (hasUpgrade('w', 21)) mult = mult.times(1.25)
        if (hasUpgrade('w', 24)) mult = mult.times(3)
        if (hasUpgrade('s', 43)) mult = mult.times(1.8)
        if (hasUpgrade('w', 34)) mult = mult.times(8)
        if (hasUpgrade('mega', 84)) mult = mult.times(200)
        if (hasUpgrade('s', 51)) mult = mult.times(upgradeEffect('s', 51))
        if (hasMilestone('sac', 34)) mult = mult.times(5)
        if (hasUpgrade('prestige', 45)) mult = mult.times(3)
        if (hasUpgrade('prestige', 55)) mult = mult.times(10)
        if (hasUpgrade('s', 54)) mult = mult.times(3.162277)
        if (hasMilestone('e', 13)) mult = mult.times(2.5)
        if (hasAchievement('a', 126)) mult = mult.times(4.51)
        if (hasUpgrade('sac', 11)) mult = mult.times(10)
        if (hasUpgrade('s', 64)) mult = mult.times(upgradeEffect('s', 64))
        if (hasUpgrade('s', 81)) mult = mult.times(50)
        if (hasUpgrade('rebirth', 64)) mult = mult.times(111.11)
        if (hasUpgrade('basic', 91)) mult = mult.times(99.99)
        if (hasUpgrade('w', 51)) mult = mult.times(1e7)

        // secret achievement
        if (hasAchievement('sa', 25)) mult = mult.times(1.05)
        if (hasAchievement('sa', 26)) mult = mult.times(1.05)
        if (hasAchievement('sa', 32)) mult = mult.times(1.02)
        if (hasAchievement('sa', 33)) mult = mult.times(1.06)
        if (hasAchievement('sa', 34)) mult = mult.times(1.15)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade('s', 61)) exp = exp.add(0.01)
        if (inChallenge('m', 11)) exp = exp.mul(0.4)
        return exp
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Supreme (because s,p,r is taken)!", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["mega", "sac", "e"],
})