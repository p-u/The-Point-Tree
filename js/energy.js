addLayer("e", {
    name: "Energy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasMilestone('sac', 10) || player.e.unlocked || player["sac"].points.gte(10)) visible = true
       return visible
    },
    passiveGeneration() {
        if (hasUpgrade('e', 33)) return 100
        if (hasMilestone('sac', 10)) return 20
        return 0
    },
    doReset(e) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[e].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
        for(i=1;i<5;i++){ //rows
            for(v=1;v<3;v++){ //columns
              if ((hasMilestone('sac', 13)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
            for(v=3;v<4;v++){ //columns
                if ((hasMilestone('sac', 17)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
              }
            for(v=4;v<5;v++){ //columns
                if ((hasMilestone('sac', 22)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
            for(v=5;v<6;v++){ //columns
                if ((hasMilestone('sac', 29)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
            for(v=6;v<7;v++){ //columns
                if ((hasMilestone('sac', 31)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
            for(v=7;v<9;v++){ //columns
                if ((hasMilestone('s', 2)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
            for(v=9;v<10;v++){ //columns
                if ((hasMilestone('s', 3)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
            for(v=10;v<11;v++){ //columns
                if ((hasMilestone('sac', 69)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
          }
          for(v=1;v<9;v++){ //columns
            if ((hasMilestone('e', 19)) && hasUpgrade(this.layer, 5+v*10)) keptUpgrades.push(5+v*10)
          }
          for(v=9;v<10;v++){ //columns
                if ((hasMilestone('s', 3)) && hasUpgrade(this.layer, 95)) keptUpgrades.push(95)
            }
            for(v=10;v<11;v++){ //columns
                if ((hasMilestone('sac', 69)) && hasUpgrade(this.layer, 105)) keptUpgrades.push(105)
            }
    
    
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
        if (hasMilestone('sac', 20)) keep.push("milestones");
        if (hasMilestone("era", 3)) keep.push("upgrades");
        if (hasMilestone("era", 3)) keep.push("milestones");
    
        // Stage 4, do the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },  
    tabFormat: {
        "Upgrades": {
            content: [
                ["infobox", "info"],
                "main-display",
                "blank",
                "blank",
                "prestige-button",
                "blank",
                "blank",
                "blank",
                "blank",
                "upgrades"
            ],
        },
        "Milestones": {
            content: [
                "main-display",
                "blank",
                "blank",
                "blank",
                "milestones"
            ],
        },
    },
    infoboxes: {
        info: {
            title: "NOTE",
            body() { return "Click energy button to be able to buy upgrades. [Won't reset sacs]" },
        },
    },   
    color: "yellow",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Energy", // Name of currency
    baseResource: "Sacrifice", // Name of resource prestige is based on
    baseAmount() {return player.sac.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 10,  // Balance is needed. Balanced to SAC 3. Have to balance to sac 4 // Prestige currency exponent
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        if (layers.w.effect().gte(1)) mult = mult.times(layers.w.effect())
        if (hasUpgrade('basic', 84)) mult = mult.times(upgradeEffect('basic', 84))
        if (hasUpgrade('e', 11)) mult = mult.times(2)
        if (hasUpgrade('e', 13)) mult = mult.times(3)
        if (hasUpgrade('e', 14)) mult = mult.times(upgradeEffect('e', 14))
        if (hasUpgrade('e', 21)) mult = mult.times(4)
        if (hasUpgrade('e', 22)) mult = mult.times(1.5)
        if (hasUpgrade('e', 23)) mult = mult.times(4)
        if (hasUpgrade('e', 24)) mult = mult.times(upgradeEffect('e', 24))
        if (hasMilestone('sac', 11)) mult = mult.times(5)
        if (hasUpgrade('mega', 51)) mult = mult.times(8)
        if (hasUpgrade('basic', 45)) mult = mult.times(1.185)
        if (hasMilestone('e', 1)) mult = mult.times(3.5)
        if (hasMilestone('sac', 12)) mult = mult.times(10)
        if (hasUpgrade('mega', 53)) mult = mult.times(25)
        if (hasMilestone('e', 4)) mult = mult.times(9)
        if (hasMilestone('sac', 13)) mult = mult.times(25)
        if (hasUpgrade('prestige', 42)) mult = mult.times(1000)
        if (hasUpgrade('e', 34)) mult = mult.times(250)
        if (hasMilestone('sac', 14)) mult = mult.times(1000)
        if (hasAchievement('a', 75)) mult = mult.times(100)
        if (hasMilestone('sac', 15)) mult = mult.times(10000)
        if (hasUpgrade('e', 42)) mult = mult.times(10000)
        if (hasMilestone('sac', 17)) mult = mult.times(1e6)
        if (hasMilestone('sac', 19)) mult = mult.times(100)
        if (hasMilestone('sac', 20)) mult = mult.times(2000)
        if (hasChallenge('sac', 11)) mult = mult.times(1e10)
        if (hasUpgrade('e', 51)) mult = mult.times(100000)
        if (hasMilestone('sac', 21)) mult = mult.times(1e10)
        if (hasMilestone('e', 8)) mult = mult.times(1e12)
        if (hasMilestone('e', 10)) mult = mult.times(1.35e18)
        if (hasUpgrade('e', 54)) mult = mult.times(1000000)
        if (inChallenge("sac", 11) || (hasUpgrade("e",141))) {
            if (hasUpgrade('e', 112)) mult = mult.times(5000)
        }
        if (inChallenge("sac", 12)) {
            if (hasUpgrade('e', 121)) mult = mult.times(25000)
            if (hasUpgrade('e', 122)) mult = mult.times(175000)
            if (hasUpgrade('e', 124)) mult = mult.times(4800000)
        }
        if (inChallenge("sac", 13)) {
            if (hasUpgrade('e', 131)) mult = mult.times(7777)
            if (hasUpgrade('e', 132)) mult = mult.times(250e6)
            if (hasUpgrade('e', 135)) mult = mult.times(800e3)
        }
        if (hasUpgrade('e', 71)) mult = mult.times(upgradeEffect('e', 71))
        if (hasUpgrade('e', 72)) mult = mult.times(10e12)
        if (hasUpgrade('e', 74)) mult = mult.times(1e6)
        if (hasUpgrade('e', 81)) mult = mult.times(1e3)
        if (hasMilestone('sac', 26)) mult = mult.times(1e8)
        if (hasMilestone('sac', 27)) mult = mult.times(2727)
        if (hasMilestone('sac', 28)) mult = mult.times(2828282828)
        if (inChallenge("sac", 14)) {
            if (hasUpgrade('e', 141)) mult = mult.times(11111)
            if (hasUpgrade('e', 143)) mult = mult.times(10e15)
            if (hasUpgrade('e', 144)) mult = mult.times(100e6)
        }
    	if (hasChallenge('sac', 14)) mult = mult.times(1e20)
        if (hasMilestone('e', 11)) mult = mult.times(1e10)
        if (hasMilestone('sac', 29)) mult = mult.times(292929)
        if (hasUpgrade('e', 91)) mult = mult.times(1e3)
        if (hasMilestone('sac', 31)) mult = mult.times(2)
        if (hasUpgrade('e', 151)) mult = mult.times("e30e9")
        if (hasUpgrade('era', 282)) mult = mult.times("e70e9")
        if (hasUpgrade('s', 121)) mult = mult.times("e1.1e12")
        if (hasUpgrade('m', 125)) mult = mult.times("e3e13")
        mult = mult.times(buyableEffect('mega', 13))

        // supreme
        if (hasMilestone('s', 1)) mult = mult.times(5)
        if (hasUpgrade('s', 21)) mult = mult.times(upgradeEffect('s', 21))
        if (hasUpgrade('s', 31)) mult = mult.times(1e15)
        if (hasUpgrade('s', 32)) mult = mult.times(1e25)
        if (hasUpgrade('s', 33)) mult = mult.times(1e30)
        if (hasUpgrade('s', 34)) mult = mult.times(1e30)
        if (hasUpgrade('w', 14)) mult = mult.times(1e10)
        if (hasUpgrade('w', 23)) mult = mult.times(1e25)
        if (hasUpgrade('s', 54)) mult = mult.times(1e20)
        if (hasUpgrade('basic', 91)) mult = mult.times("1e99.99")
        if (inChallenge("m", 11)) {
            if (hasMilestone('e', 15)) mult = mult.times(700)
            if (hasMilestone('basic', 5)) mult = mult.times(1000)
            if (hasMilestone('e', 16)) mult = mult.times(40)
        }
        if (hasUpgrade('e', 101)) mult = mult.times("e42000")
        if (hasUpgrade('mega', 104)) mult = mult.times("e1e11")
        if (hasUpgrade('era', 145)) mult = mult.times("e5e11")
        if (hasUpgrade('era', 25)) mult = mult.times("e1e12")
        if (hasAchievement('a', 242)) mult = mult.times("e8.72e12")

        // secret achievement
        if (hasAchievement('sa', 24)) mult = mult.times(1.1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade('prestige', 43)) exp = exp.add(0.01)
        if (inChallenge('sac', 14)) exp = exp.mul(0.5)
        if (inChallenge("sac", 14)) {
            if (hasUpgrade('e', 144)) exp = exp.mul(1.1)
        }
        if (hasMilestone('e', 13)) exp = exp.add(0.01)
        if (hasMilestone('e', 14)) exp = exp.add(0.025)
        if (hasUpgrade('e', 35)) exp = exp.add(buyableEffect('mega', 14))
        if (hasMilestone('e', 21)) exp = exp.add(0.05)
        if (hasUpgrade('mega', 94)) exp = exp.add(0.005)
        if (hasUpgrade('era', 364)) exp = exp.add(0.025)
        let expinmc1 = new Decimal(0.4)
        if (hasUpgrade("m", 1132)) expinmc1 = new Decimal(0.75)
        if (inChallenge('m', 11)) exp = exp.mul(expinmc1)
        return exp
    },
    upgrades: {
            11: {
                title: "What is this, exactly?",
                description: "x2 Energy, and x1e250 PF",
                cost: new Decimal(500),
            },
            12: {
                title: "Still, another upgrade.",
                description: "x1e250 BP",
                cost: new Decimal(1000),
                unlocked() { return hasUpgrade("e", 11) },
            },
            13: {
                title: "Trip Energy",
                description: "x3 Energy, and x1e25 MP",
                cost: new Decimal(1050),
                unlocked() { return hasUpgrade("e", 12) },
            },
            14: {
                title: "Compounding 7",
                description: "Energy gets boosted based on itself.",
                cost: new Decimal(3300),
                unlocked() { return hasUpgrade("e", 13) },
                effect() {
                    let e4exp = 0.125
                    if (hasUpgrade('e', 33)) e4exp = 0.16
                    if (hasMilestone('e', 9)) e4exp = 0.195
                    if (hasUpgrade('e', 15)) e4exp = 0.25
                    if (hasUpgrade("era", 131)) e4exp = 0.29
                    let eff = player["e"].points.add(1).pow(e4exp)
                    let softcapExp = 0.5
                    if (hasUpgrade('m', 92)) softcapExp = 0.52
                    eff = softcap(eff, new Decimal("1e700"), softcapExp)
                    return eff
                },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("e700")) ) {
                    softcapDescription = " (Softcapped)"
                }
                return "This upgrade boosts Energy by " + notationChooser(upgEffect)+"x" + softcapDescription
            },
            },
            21: {
                title: "Quadra Energy",
                description: "x4 Energy, and x1e100 PP",
                cost: new Decimal(11111),
                unlocked() { return hasUpgrade("e", 14) },
            },
            22: {
                title: "Megar",
                description: "Mega Buyable 2 formula is weaker. Also x1.5 Energy.",
                cost: new Decimal(250e3),
                unlocked() { return hasUpgrade("e", 21) },
            },
            23: {
                title: "Quadra Energy 2",
                description: "x4 Energy, x1e700 PF",
                cost: new Decimal(400e3),
                unlocked() { return hasUpgrade("e", 22) },
            },
            24: {
                title: "Boost Boost",
                description: "A gigawatt of energy. That can power 750K Homes. That's a lot. Anyways, Mega Points now boost energy, by a little. x1e40 MP (If in Mastery Challenge, Increase boost to xe500 MP.).",
                cost: new Decimal(1e9),
                effect() {
                    let e8exp = 0.00075
                    if (hasMilestone('e', 5)) e8exp = 0.001
                    if (hasMilestone('e', 6)) e8exp = 0.00125
                    if (hasMilestone('sac', 16)) e8exp = 0.00165
                    if (inChallenge("sac", 13)) {
                        if (hasUpgrade('e', 134)) e8exp = 0.005
                    }
                    if (hasUpgrade('e', 82)) e8exp = 0.001825
                    if (hasUpgrade('basic', 113)) e8exp = 0.01
                    let eff = player["mega"].points.add(1).pow(e8exp)
                    eff = softcap(eff, new Decimal("1e5000"), 0.3)
                    eff = softcap(eff, new Decimal("e100e6"), 0.3)
                    eff = softcap(eff, new Decimal("e1e15"), 0.2)
                    return eff
                },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("e5000")) ) {
                    softcapDescription = " (Softcapped)"
                }
                if (upgEffect.gte(new Decimal("e100e6")) ) {
                    softcapDescription = " (Supercapped)"
                }
                if (upgEffect.gte(new Decimal("e1e15")) ) {
                    softcapDescription = " (Hypercapped)"
                }
                return "This upgrade boosts Energy by " + notationChooser(upgEffect)+"x" + softcapDescription
            },
                unlocked() { return hasUpgrade("e", 23) },
            },
            31: {
                title: "Mega CostDown",
                description: "Mega Buyable 1 cost is less.",
                cost: new Decimal(1e15),
                unlocked() { return hasUpgrade("e", 24) },
            },
            32: {
                title: "PFx",
                description: "xe7500 More PF",
                cost: new Decimal(1.25e15),
                unlocked() { return hasUpgrade("e", 31) },
            },
            33: {
                title: "No need to click to be better",
                description: "Energy Passive Generation is now 100x, and Energy Upgrade 4 is stronger.",
                cost: new Decimal(2.25e17),
                unlocked() { return hasUpgrade("e", 32) },
            },
            34: {
                title: "Energy Big Boost",
                description: "x250 Energy, and mega buyable 1 is stronger",
                cost: new Decimal(8e23),
                unlocked() { return hasUpgrade("e", 33) },
            },
            41: {
                title: "PFx 2",
                description: "x1e10K PF",
                cost: new Decimal(4e35),
                unlocked() { return hasUpgrade("e", 34) },
            },
            42: {
                title: "Both Big",
                description: "Mega Buyable 2 formula is weaker and x10,000 energy",
                cost: new Decimal(3.5e41),
                unlocked() { return hasUpgrade("e", 41) },
            },
            43: {
                title: "PFx 3",
                description: "xe25K PF",
                cost: new Decimal(6e51),
                unlocked() { return hasUpgrade("e", 42) },
            },
            44: {
                title: "Crazy Boost",
                description: "Mega Buyables 1 and 2 are much stronger",
                cost: new Decimal(9e81),
                unlocked() { return hasUpgrade("e", 43) },
            },
            51: {
                title: "EneX",
                description: "x100K Energy",
                cost: new Decimal(1.7e112),
                unlocked() { return hasUpgrade("e", 44) },
            },
            52: {
                title: "A nerf?",
                description: "/e50 MP, BUT xe20K PF",
                cost: new Decimal(3.8e118),
                unlocked() { return hasUpgrade("e", 51) },
            },
            53: {
                title: "Capping",
                description: "Prestige Softcap is weaker",
                cost: new Decimal(1.2e144),
                unlocked() { return hasUpgrade("e", 52) },
            },
            54: {
                title: "Hire workers to generate energy",
                description: "x1M Energy",
                cost: new Decimal(7.5e156),
                unlocked() { return hasUpgrade("e", 53) },
            },
            61: {
                title: "Fragments Duplicate Wildly",
                description: "xe126.5K PF",
                cost: new Decimal(3e171),
                unlocked() { return hasUpgrade("e", 54) },
            },
            62: {
                title: "Fragments Insane Boost",
                description: "xe100K PF",
                cost: new Decimal(5.1e173),
                unlocked() { return hasUpgrade("e", 61) },
            },
            63: {
                title: "Fragments Insane Boost II",
                description: "xe100K PF",
                cost: new Decimal(1.6e174),
                unlocked() { return hasUpgrade("e", 62) },
            },
            64: {
                title: "Prestiger",
                description: "Mega Upgrade 4 is stronger, Mega Points -^0.025",
                cost: new Decimal(1.4e198),
                unlocked() { return hasUpgrade("e", 63) },
            },
            71: {
                title: "e200 Energy - Compounding 8",
                description: "Energy gets boosted based on itself, but starts at 1e175.",
                cost: new Decimal(2e200),
                unlocked() { return hasUpgrade("e", 64) },
                effect() {
                    let e200EUExp = 0.125
                    if (hasUpgrade("era", 253)) e200EUExp = 0.133
                    return player["e"].points.add(1).div(1e175).pow(e200EUExp)
                },
                effectDisplay() { return notationChooser(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            72: {
                title: "Use the energy to generate insane tech for our workers",
                description: "x10T Energy",
                cost: new Decimal(8.5e204),
                unlocked() { return hasUpgrade("e", 71) },
            },
            73: {
                title: "Mega Power!",
                description: "xe300 MP",
                cost: new Decimal(2.3e224),
                unlocked() { return hasUpgrade("e", 72) },
            },
            74: {
                title: "Energy and Mega Boosters",
                description: "xe150 MP, x1M Energy",
                cost: new Decimal(1.25e235),
                unlocked() { return hasUpgrade("e", 73) },
            },
            81: {
                title: "Prestige Bots",
                description: "xe5,500 PP, x1,000 Energy",
                cost: new Decimal(2.53e253),
                unlocked() { return hasUpgrade("e", 74) },
            },
            82: {
                title: "Mega boosts energy, even more.",
                description: "Energy Upgrade 8 is stronger",
                cost: new Decimal(4e274),
                unlocked() { return hasUpgrade("e", 81) },
            },
            83: {
                title: "Mega Power! 2!!",
                description: "xe700 MP",
                cost: new Decimal("3.5e353"),
                unlocked() { return hasUpgrade("e", 82) },
            },
            84: {
                title: "2x6PF",
                description: "xe222222 PF",
                cost: new Decimal("5e411"),
                unlocked() { return hasUpgrade("e", 83) },
            },
            91: {
                title: "Miniscule Difference",
                description: "xe400 PP and x1,000 Energy",
                cost: new Decimal("6e521"),
                unlocked() { return hasUpgrade("e", 84) },
            },
            92: {
                title: "Reaching e130 Million PF",
                description: "xe350K PF",
                cost: new Decimal("1e660"),
                unlocked() { return hasUpgrade("e", 91) },
            },
            93: {
                title: "It's done.",
                description: "xe500K PF",
                cost: new Decimal("1e683"),
                unlocked() { return hasUpgrade("e", 92) },
            },
            94: {
                title: "What more is there?",
                description: "xe657,281 PF (Seemingly Random Amount)",
                cost: new Decimal("1.5e694"),
                unlocked() { return hasUpgrade("e", 93) },
            },
            95: {
                title: "Fifth Column?",
                description: "MU9 is stronger. Faster! Go! Don't get spotted by the devs!",
                cost: new Decimal("1e714"),
                unlocked() { return hasUpgrade("e", 94) },
            },
            101: {
                title: "Wait, there is a row 10?",
                description: "xe42,069 Energy, lol",
                cost: new Decimal("e655115"),
                unlocked() { return hasUpgrade("e", 95) && hasMilestone('e', 21) },
            },
            102: {
                title: "Not funny",
                description: "xe694.2M PF",
                cost: new Decimal("e815800"),
                unlocked() { return hasUpgrade("e", 101) && hasMilestone('e', 21) },
            },
            103: {
                title: "Still not funny",
                description: "^1.006969 PF",
                cost: new Decimal("e845774"),
                unlocked() { return hasUpgrade("e", 102) && hasMilestone('e', 21) },
            },
            104: {
                title: "not  funni",
                description: "xe69.69M PP",
                cost: new Decimal("e883688"),
                unlocked() { return hasUpgrade("e", 103) && hasMilestone('e', 21) },
            },
            105: {
                title: "HAHAHA SO FUNNY LOLOL",
                description: "xe1337.69420M PF",
                cost: new Decimal("e921842"),
                unlocked() { return hasUpgrade("e", 104) && hasMilestone('e', 21) },
            },

            // extension beyond csu nums
            151: {
                title: "R",
                description: "xe30B Energy",
                cost: new Decimal("e335776190372"),
                unlocked() { return hasUpgrade("e", 105) && hasUpgrade('era', 275) },
            },
            152: {
                title: "O",
                description: "xe0.1e15 PP",
                cost: new Decimal("e374899393494"),
                unlocked() { return hasUpgrade("e", 151) && hasUpgrade('era', 275) },
            },
            153: {
                title: "W",
                description: "Less Sac Scaling",
                cost: new Decimal("e408627212190"),
                unlocked() { return hasUpgrade("e", 152) && hasUpgrade('era', 275) },
            },
            154: {
                title: "1",
                description: "Less Sac Scaling",
                cost: new Decimal("e409506609384"),
                unlocked() { return hasUpgrade("e", 153) && hasUpgrade('era', 275) },
            },
            155: {
                title: "5!",
                description: "x250 EC, xe3.1Qd PF",
                cost: new Decimal("e438491221792"),
                unlocked() { return hasUpgrade("e", 154) && hasUpgrade('era', 275) },
            },

            // challenge specific upgs
            111: {
                title: "Challenge 1-Specific Upgrades (Only can be get in Challenge 1, only boosts Challenge 1)",
                description: "xe5K BP",
                cost: new Decimal(1.75e57),
                unlocked() { return inChallenge("sac", 11) || hasUpgrade("e", 141) },
            },
            112: {
                title: "Energy Bar Increase",
                description: "x5000 Energy",
                cost: new Decimal(2.3e57),
                unlocked() { return hasUpgrade("e", 111) },
            },
            113: {
                title: "Basically",
                description: "xe4K BP",
                cost: new Decimal(6e61),
                unlocked() { return hasUpgrade("e", 112) },
            },
            121: {
                title: "Challenge 2-Specific Upgrades (Only can be get in Challenge 2, only boosts Challenge 2)",
                description: "x25,000 Energy",
                cost: new Decimal(3.3e84),
                unlocked() { return inChallenge("sac", 12)  },
            },
            122: {
                title: "Power Surge",
                description: "x175,000 Energy",
                cost: new Decimal(6e89),
                unlocked() { return inChallenge("sac", 12) && hasUpgrade("e", 121) },
            },
            123: {
                title: "Prestiging Mastery",
                description: "xe1.5K PP",
                cost: new Decimal(7e95),
                unlocked() { return inChallenge("sac", 12) && hasUpgrade("e", 122) },
            },
            124: {
                title: "Energy Hunting",
                description: "After this successful hunt, you multiplied your energy gain by 4.8M!",
                cost: new Decimal(3.8e96),
                unlocked() { return inChallenge("sac", 12) && hasUpgrade("e", 123) },
            },
            131: {
                title: "Challenge 3-Specific Upgrades (Only can be get in Challenge 3, only boosts Challenge 3)",
                description: "x7777 Energy, x7.77e77 MP",
                cost: new Decimal(4e106),
                unlocked() { return inChallenge("sac", 13) },
            },
            132: {
                title: "Drilling for extra energy",
                description: "You multiplied your energy production by 250M!!",
                cost: new Decimal(5e111),
                unlocked() { return inChallenge("sac", 13) && hasUpgrade("e", 131) },
            },
            133: {
                title: "PF Power UP!",
                description: "^1.05 PF",
                cost: new Decimal(3e128),
                unlocked() { return inChallenge("sac", 13) && hasUpgrade("e", 132) },
            },
            134: {
                title: "Mega boosts energy GREATLY!",
                description: "Energy Upgrade 8 is MUCH stronger",
                cost: new Decimal(4e128),
                unlocked() { return inChallenge("sac", 13) && hasUpgrade("e", 133) },
            },
            135: {
                title: "Energy Reserves",
                description: "Take some energy from the energy reserves. This leads to a x800K Energy.",
                cost: new Decimal(3e146),
                unlocked() { return inChallenge("sac", 13) && hasUpgrade("e", 134) },
            },
            141: {
                title: "Energy Small Boost",
                description: "x11,111 Energy, AND Unlock Sac Challenge 1 upgrades.",
                cost: new Decimal(2.5e53),
                unlocked() { return inChallenge("sac", 14) },
            },
            142: {
                title: "Mega MEGA BOOST",
                description: "xe1,600 MP",
                cost: new Decimal(6.5e55),
                unlocked() { return inChallenge("sac", 14) && hasUpgrade("e", 141) },
            },
            143: {
                title: "Rocket Fuel",
                description: "x10 Qd Energy, xe125K PF",
                cost: new Decimal(3.6e56),
                unlocked() { return inChallenge("sac", 14) && hasUpgrade("e", 142) },
            },
            144: {
                title: "Here we go.",
                description: "^1.1 PF, ^1.1 Energy",
                cost: new Decimal(2.25e67),
                unlocked() { return inChallenge("sac", 14) && hasUpgrade("e", 143) },
            },
            145: {
                title: "Point Plus",
                description: "xe300K PF, x100K Energy",
                cost: new Decimal(3e74),
                unlocked() { return inChallenge("sac", 14) && hasUpgrade("e", 143) },
            },



            // dimshift
            15: {
                title: "More Compound Energy",
                description: "EU14 is stronger",
                cost: new Decimal("e70515"),
                unlocked() { return hasMilestone("sac", 59) && hasUpgrade("e", 14) },
            },
            25: {
                title: "Energy-PF ties",
                description: "Energy Effect is stronger.",
                cost: new Decimal("e73468"),
                unlocked() { return hasMilestone("sac", 59) && hasUpgrade("e", 15) },
            },
            35: {
                title: "More Energy!",
                description: "xe250M PF, Unlock 1 new mega buyable",
                cost: new Decimal("e75165"),
                unlocked() { return hasMilestone("sac", 59) && hasUpgrade("e", 25) },
            },
            45: {
                title: "Mega Buyable 4",
                description: "Weaker cost scaling. ",
                cost: new Decimal("e85877"),
                unlocked() { return hasMilestone("sac", 59) && hasUpgrade("e", 35) },
            },
            55: {
                title: "Normal things",
                description: "xe250m pf. ",
                cost: new Decimal("e87994"),
                unlocked() { return hasMilestone("sac", 59) && hasUpgrade("e", 45) },
            },
            65: {
                title: "Even More Energy",
                description: "Water boosts energy more.",
                cost: new Decimal("e104202"),
                unlocked() { return hasMilestone("sac", 59) && hasUpgrade("e", 55) },
            },
            75: {
                title: "A well-rounded boost.",
                description: "PF ^1.02",
                cost: new Decimal("e112691"),
                unlocked() { return hasMilestone("sac", 59) && hasUpgrade("e", 65) },
            },
            85: {
                title: "Crazy amount of PF",
                description: "xe700M PF",
                cost: new Decimal("e118317"),
                unlocked() { return hasMilestone("sac", 59) && hasUpgrade("e", 75) },
            },
    },
    milestones: {
        1: {
            requirementDescription: "50,000 Energy. (50 kW)",
            effectDescription: "x3.5 Energy. x1e1,000 PF, +^0.02 PP and MP",
            done() { return player["e"].points.gte(50000) }
        },
        2: {
            requirementDescription: "250 MW Energy, or 250M energy.",
            effectDescription: "Energy Effect is also stronger.",
            done() { return player["e"].points.gte(250e6) }
        },
        3: {
            requirementDescription: "20B Watts, or 20 GW of energy.",
            effectDescription: "Energy effect is stronger.",
            done() { return player["e"].points.gte(20e9) }
        },
        4: {
            requirementDescription: "110 TW of Energy - 1.10e14",
            effectDescription: "1e7,500 PF, x9 Energy",
            done() { return player["e"].points.gte(1.1e14) }
        },
        5: {
            requirementDescription: "1E19 Energy [10 Qt Energy]",
            effectDescription: "x1e10,000 PF, Energy Upgrade 8 is stronger",
            done() { return player["e"].points.gte(1e19) }
        },
        6: {
            requirementDescription: "1E34 Energy [10 Decillion Energy]",
            effectDescription: "Energy boost is stronger, Energy Upgrade 8 is stronger",
            done() { return player["e"].points.gte(1e34) }
        },
        7: {
            requirementDescription: "3e61 Energy",
            effectDescription: "Energy boost is ^2 stronger",
            done() { return player["e"].points.gte(3e61) }
        },
        8: {
            requirementDescription: "5e128 Energy: BIG TRADE-OFF",
            effectDescription: "Energy boost is ^0.4, BUT xe100K PF and x1T Energy",
            done() { return player["e"].points.gte(5e128) }
        },
        9: {
            requirementDescription: "1.7e164 Energy",
            effectDescription: "'Compounding 6' is stronger.",
            done() { return player["e"].points.gte(1.7e164) }
        },
        10: {
            requirementDescription: "4e323 Energy",
            effectDescription: "Energy Milestone 4 effect is ^20!",
            done() { return player["e"].points.gte("4e323") }
        },
        11: {
            requirementDescription: "1.2e456 Energy",
            effectDescription: "Energy xe10, PP xe10K",
            done() { return player["e"].points.gte("1.2e456") }
        },
        12: {
            requirementDescription: "8e575 Energy: MASSIVE CHANGE",
            effectDescription: "-^0.1 BP, -^0.2 RP, -^0.1 PP, -^0.15 MP, ^1.22 PF",
            done() { return player["e"].points.gte("8e575") }
        },
        13: {
            requirementDescription: "The Power Milestone (5e2,463 Energy)",
            effectDescription: "x2.5 SP, xe2e6 PF, x10 Water, +^0.01 Energy",
            done() { return player["e"].points.gte("5e2463") }
        },
        14: {
            requirementDescription: "The True Energy Milestone (1e5,380 Energy)",
            effectDescription: "x1M Water, +^0.025 Energy",
            done() { return player["e"].points.gte("1e5380") },
            unlocked() {return player["sac"].points.gte(64) || hasMilestone("e", 22)},
        },
        15: {
            requirementDescription: "MCS-Milestone (Energy I) - 200K Energy",
            effectDescription: "x700 Energy, +^0.15 RP",
            unlocked() {return inChallenge("m", 11)},
            done() {
                if (inChallenge("m", 11)) {
                    if (player["e"].points.gte(200000)) {
                        return true
                    }
                }
            },
        },
        16: {
            requirementDescription: "MCS-Milestone (Energy II) - 50M Energy",
            effectDescription: "x40 Energy",
            done() {
                if (inChallenge("m", 11)) {
                    if (player["e"].points.gte(50e6)) {
                        return true
                    }
                }
            },
            unlocked() {return inChallenge("m", 11) && hasMilestone("e", 15)},
        },
        17: {
            requirementDescription: "MCS-Milestone (Energy III) - 500M Energy",
            effectDescription: "^1.2 PF",
            done() {
                if (inChallenge("m", 11)) {
                    if (player["e"].points.gte(500e6)) {
                        return true
                    }
                }
            },
            unlocked() {return inChallenge("m", 11) && hasMilestone("e", 16)},
        },
        18: {
            requirementDescription: "MCS-Milestone (Energy IV) - 5B Energy",
            effectDescription: "^1.3 PF",
            done() {
                if (inChallenge("m", 11)) {
                    if (player["e"].points.gte(5e9)) {
                        return true
                    }
                }
            },
            unlocked() {return inChallenge("m", 11) && hasMilestone("e", 17)},
        },
        19: {
            requirementDescription: "The Absolute True Energy Milestone (1e150K Energy)",
            effectDescription: "Keep Row 5 Energy Ups on Reset, xe500M PF",
            done() { return player["e"].points.gte("e150000") },
            unlocked() {return player["sac"].points.gte(170)},
        },
        20: {
            requirementDescription: "The Absolute Very True Energy Milestone (e484,425 Energy)",
            effectDescription: "xe500M PF, +^0.05 MP",
            done() { return player["e"].points.gte("e484425") },
            unlocked() {return player["sac"].points.gte(225)},
        },
        21: {
            requirementDescription: "Galactic Energy (e556,395 energy)",
            effectDescription: "Unlock Row 10 of Energy Upgrades, +^0.05 Energy, xe400M PF",
            done() { return player["e"].points.gte("e556395") },
            unlocked() {return player["sac"].points.gte(240)},
        },
        22: {
            requirementDescription: "MC2S (Energy I) - e15,582 Energy",
            effectDescription: "^1.025 PF, +^0.025 PP, Show True Energy Milestone.",
            done() {
                if (inChallenge("m", 12)) {
                    if (player["e"].points.gte("e15582")) {
                        return true
                    }
                }
            },
            unlocked() {return inChallenge("m", 12)},
        },
        23: {
            requirementDescription: "MC2S (Energy 2) - 5e18,979 Energy",
            effectDescription: "^1.1 PF",
            done() {
                if (inChallenge("m", 12)) {
                    if (player["e"].points.gte("5e18979")) {
                        return true
                    }
                }
            },
            unlocked() {return (inChallenge("m", 12) && hasMilestone("e", 22))},
        },
        24: {
            requirementDescription: "Multiversal Control (10^10^10 Energy)",
            effectDescription: "Energy Effect is better",
            done() { return player["e"].points.gte("e10e9") },
            unlocked() {return hasUpgrade("era", 161)},
        },
    },
    branches: ["sac", "mega"],
    effect(){
    let enpow = 50
    if (hasMilestone('e', 2)) enpow = 90
    if (hasMilestone('e', 3)) enpow = 200
    if (hasMilestone('sac', 12)) enpow = 250
    if (hasMilestone('e', 6)) enpow = 350
    if (hasMilestone('e', 7)) enpow = 700
    if (hasUpgrade('basic', 55)) enpow = 1200
    if (hasMilestone('e', 8)) enpow = 400
    if (hasUpgrade('m', 34)) enpow = 2250
    if (hasUpgrade('e', 25)) enpow = 5000
    if (hasUpgrade('era', 122)) enpow = 10000
    if (hasMilestone('e', 24)) enpow = 13500
    if (hasUpgrade('basic', 113)) enpow = 8888
    if (hasUpgrade('e', 154)) enpow = 11111
    let eff = player.e.points.add(1).pow(enpow)
    let cap = 0.4
    softcappedEffect = softcap(eff, new Decimal("e7.5e17"), new Decimal(cap))
    return softcappedEffect
       },
        effectDescription() {
            let softcapDescription = ""
            let layerEffect = tmp[this.layer].effect
            if (layerEffect.gte(new Decimal("e7.5e17")) ) {
                softcapDescription = " (Softcapped)"
            }
            let desc = "which is boosting Point Fragments by x" + notationChooser(tmp[this.layer].effect) + softcapDescription;
            return desc;
        },
    row: 4, // Row the layer is in on the tree (0 is the first row)
})