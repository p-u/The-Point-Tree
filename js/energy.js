addLayer("en", {
    name: "Energy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        power: new Decimal(0),
        powerexpoener: new Decimal(0.25),
        powerexpoatom: new Decimal(0.12),
        powgain: new Decimal(0),
        gen1amt: new Decimal(0),
        gen2amt: new Decimal(0),
        gen3amt: new Decimal(0),
        gen4amt: new Decimal(0),
        gen5amt: new Decimal(0),
        gen6amt: new Decimal(0),
        gen1gain: new Decimal(0),
        gen2gain: new Decimal(0),
        gen3gain: new Decimal(0),
        gen4gain: new Decimal(0),
        gen5gain: new Decimal(0),
        gen6gain: new Decimal(0),
        univmulti: new Decimal(1),
        gen1multi: new Decimal(1),
        gen2multi: new Decimal(1),
        gen3multi: new Decimal(1),
        gen4multi: new Decimal(1),
        gen5multi: new Decimal(1),
        gen6multi: new Decimal(1),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Energy", // Name of currency
    baseResource: "Atoms", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    passiveGeneration() {
        if (hasUpgrade("ma", 22)) return 1
        if (hasMilestone("ma", 4)) return 0.2
        if (hasMilestone("ma", 2)) return 0.1
        if (hasMilestone('ma', 1)) return 0.025
        return 0
    },
    doReset(en) {
        // Stage 1: Prevent resetting if the layer is too high
        if (layers[en].row <= this.row) return;
    
        // Stage 2: Track which specific subfeatures to keep (e.g., upgrades)
        let keptUpgrades = [];
        for(i=1;i<5;i++){ //rows
            for(v=1;v<5;v++){ //columns
              if ((hasMilestone('ma', 8)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
        }
        let keep = [];
        if (hasMilestone("w", 1)) {
            keep.push("gen4amt");
        }
    
        // Stage 4: Perform the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5: Add back the specific subfeatures saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },    
    tabFormat: {
        "Main tab": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                "blank",
                "upgrades",
                "blank",
                "blank",
                ["infobox", "main"],
            ],
        },
        "Generators": {
            content: [
                "main-display",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `You have 
                        <h2><span style="color: yellow; text-shadow: 0px 0px 10px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.en.power)}</span></h2> Power`
                            a = a + " (+" + notationChooser(player.en.powgain) + "/s)"
                        return a
                    }
                ],
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `This boosts energy by 
                        <h2><span style="color: #4BDC13; text-shadow: 0px 0px 10px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.en.power.add(1).pow(player.en.powerexpoener))}</span></h2>`
                        a = a + ` and atoms by 
                        <h2><span style="color: white; text-shadow: 0px 0px 10px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.en.power.add(1).pow(player.en.powerexpoatom))}</span></h2>`
                        return a
                    }
                ],
                "blank",
                ["display-text", function() {
                    return "You have "+ notationChooser(player.en.gen1amt) +" Generator 1. (+" + notationChooser(player.en.gen1gain) + "/s)" 
                }], 
                ["display-text", function() {
                    if (player.en.gen2amt.gte(1)) return "You have "+ notationChooser(player.en.gen2amt) +" Generator 2. (+" + notationChooser(player.en.gen2gain) + "/s)" 
                }], 
                ["display-text", function() {
                    if (player.en.gen3amt.gte(1)) return "You have "+ notationChooser(player.en.gen3amt) +" Generator 3. (+" + notationChooser(player.en.gen3gain) + "/s)" 
                }], 
                ["display-text", function() {
                    if (player.en.gen4amt.gte(1)) return "You have "+ notationChooser(player.en.gen4amt) +" Generator 4. (+" + notationChooser(player.en.gen4gain) + "/s)" 
                }], 
                ["display-text", function() {
                    if (player.en.gen5amt.gte(1)) return "You have "+ notationChooser(player.en.gen5amt) +" Generator 5. (+" + notationChooser(player.en.gen5gain) + "/s)" 
                }], 
                ["display-text", function() {
                    if (player.en.gen6amt.gte(1)) return "You have "+ notationChooser(player.en.gen6amt) +" Generator 6." 
                }], 
                "blank",
                "blank",
                "prestige-button",
                "blank",
                "blank",
                "buyables",
                "blank",
                "blank",
                ["infobox", "gens"],
            ],
            unlocked() {return hasUpgrade("en", 25)}
        },
    },
    automate() {
		if (hasUpgrade('ma', 21)) {
			if (layers.en.buyables[11].canAfford()) {
				layers.en.buyables[11].buy();
			};
            if (layers.en.buyables[12].canAfford()) {
				layers.en.buyables[12].buy();
			};
            if (layers.en.buyables[21].canAfford()) {
				layers.en.buyables[21].buy();
			};
		};
        if (hasUpgrade('ma', 24)) {
            if (layers.en.buyables[22].canAfford()) {
				layers.en.buyables[22].buy();
			};
		};
	},
    upgrades: {
        11: {
            title: "Atomize",
            description: "Start generating an atom per second",
            cost: new Decimal(1),
            unlocked() { return true }, 
        },
        12: {
            title: "Small Boost",
            description: "x1.5 Atom Gain",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("en", 11) }, 
        },
        13: {
            title: "Bigger Boost",
            description: "x1.75 Atom Gain",
            cost: new Decimal(4),
            unlocked() { return hasUpgrade("en", 12) }, 
        },
        14: {
            title: "Energi",
            description: "x1.4 Energy gain",
            cost: new Decimal(6),
            unlocked() { return hasUpgrade("en", 13) }, 
        },
        15: {
            title: "Energetic Amplifier",
            description: "Boost energy based on atoms",
            cost: new Decimal(8),
            effect() {
                energyatom = 0.09
                if (hasUpgrade("en", 34)) energyatom = 0.16
                softcapDescriptionen21 = ""
                sdsc = ""
                upgEffecten21 = upgradeEffect(this.layer, this.id)
                let eff = player.points.add(1).pow(energyatom)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionen21
            },
            tooltip() {
                return "Formula: (Atoms+1)^"  + energyatom + sdsc
            },
            unlocked() { return hasUpgrade("en", 14) }, 
        },
        21: {
            title: "Biggest Boost",
            description: "x2 Atom Gain",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("en", 15) }, 
        },
        22: {
            title: "Atomic Amplifier",
            description: "Boost atoms based on energy",
            cost: new Decimal(24),
            effect() {
                energyatom = 0.133
                softcapDescriptionen21 = ""
                sdsc = ""
                upgEffecten21 = upgradeEffect(this.layer, this.id)
                let eff = player.en.points.add(1).pow(energyatom)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionen21
            },
            tooltip() {
                return "Formula: (Energy+1)^"  + energyatom + sdsc
            },
            unlocked() { return hasUpgrade("en", 21) }, 
        },
        23: {
            title: "Double Boost",
            description: "x1.5 Atom and Energy Gain",
            cost: new Decimal(40),
            unlocked() { return hasUpgrade("en", 22) }, 
        },
        24: {
            title: "Crazy Boost",
            description: "x2.5 Energy Gain",
            cost: new Decimal(100),
            unlocked() { return hasUpgrade("en", 23) }, 
        },
        25: {
            title: "Generating",
            description: "Unlock a new tab: Generators!",
            cost: new Decimal(300),
            unlocked() { return hasUpgrade("en", 24) }, 
        },
        31: {
            title: "Power-ful",
            description: "Double Power and Energy gain",
            cost: new Decimal(300),
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            currencyLayer: "en",
            unlocked() { return hasUpgrade("en", 25) }, 
        },
        32: {
            title: "Electric",
            description: "Boosts energy based on energy",
            cost: new Decimal(17500),
            effect() {
                energyenergy = 0.1
                softcapDescriptionen32 = ""
                sdsc = ""
                upgEffecten32 = upgradeEffect(this.layer, this.id)
                let eff = player.en.points.add(1).pow(energyenergy)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionen32
            },
            tooltip() {
                return "Formula: (Energy+1)^"  + energyenergy + sdsc
            },
            unlocked() { return hasUpgrade("en", 31) }, 
        },
        33: {
            title: "Generator²",
            description: "Every Generator boosts its gain by 1.05x, compounding",
            cost: new Decimal(55000),
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            currencyLayer: "en",
            unlocked() { return hasUpgrade("en", 32) }, 
        },
        34: {
            title: "Booster v2.0",
            description: "Energetic Amplifier is much stronger",
            cost: new Decimal(675000),
            unlocked() { return hasUpgrade("en", 33) }, 
        },
        35: {
            title: "Super-power",
            description: "Power boosts energy and atoms more (^0.25 -> ^0.3, ^0.12 -> ^0.2), x1.7 Power",
            cost: new Decimal(8e6),
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            currencyLayer: "en",
            unlocked() { return hasUpgrade("en", 34) }, 
        },
        41: {
            title: "Atomic Duplication",
            description: "Boosts atoms based on itself",
            cost: new Decimal(1e7),
            effect() {
                atomatom = 0.11
                softcapDescriptionen41 = ""
                sdsc = ""
                upgEffecten41 = upgradeEffect(this.layer, this.id)
                let eff = player.points.add(1).pow(atomatom)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionen41
            },
            tooltip() {
                return "Formula: (Atoms+1)^"  + atomatom + sdsc
            },
            unlocked() { return hasUpgrade("en", 35) }, 
        },
        42: {
            title: "Tri-ncrease",
            description: "x1.4 Atoms, Energy, Power",
            cost: new Decimal(500e6),
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            currencyLayer: "en",
            unlocked() { return hasUpgrade("en", 41) }, 
        },
        43: {
            title: "Atom++",
            description: "+250% Atoms!!",
            cost: new Decimal(500e6),
            unlocked() { return hasUpgrade("en", 42) }, 
        },
        44: {
            title: "Tiered Boost",
            description: "x1.1 Gen 1, x1.2 Gen 2, x1.3 Gen 3, x1.4 Gen 4 generation",
            cost: new Decimal(1e10),
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            currencyLayer: "en",
            unlocked() { return hasUpgrade("en", 43) }, 
        },
        45: {
            title: "Super BOOST!",
            description: "Atoms Gain = Atoms Gain x 10",
            cost: new Decimal(7e9),
            unlocked() { return hasUpgrade("en", 44) }, 
        },
        51: {
            title: "Generator²⁺",
            description: "Generator² increased to 1.06x",
            cost: new Decimal(2e12),
            unlocked() { return (hasMilestone("ma", 2) && hasUpgrade("en", 45))  }, 
        },
        52: {
            title: "Hyper BOOST!",
            description: "Atoms Gain = Atoms Gain x 50",
            cost: new Decimal(8e13),
            unlocked() { return hasUpgrade("en", 51) }, 
        },
        53: {
            title: "Primed Boost",
            description: "x1.3 Gen 2,3,5 generation",
            cost: new Decimal(1e18),
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            currencyLayer: "en",
            unlocked() { return hasUpgrade("en", 52) }, 
        },
        54: {
            title: "It Matters",
            description: "x2 Atom and Matter gain",
            cost: new Decimal(2e20),
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            currencyLayer: "en",
            unlocked() { return hasUpgrade("en", 53) }, 
        },
        55: {
            title: "Genetic Alteration",
            description: "Due to a new set of genes, production of atoms increase by 20x!",
            cost: new Decimal(3.2e32),
            unlocked() { return (hasMilestone('ma', 6) && hasUpgrade("en", 54)) }, 
        },
        61: {
            title: "First things first",
            description: "x3 Gen 1 generation (x3 energy)",
            cost: new Decimal(1e36),
            unlocked() { return (hasMilestone('ma', 6) && hasUpgrade("en", 55)) }, 
        },
        62: {
            title: "Ma(s)ttering",
            description: "x3 Matter gain",
            cost: new Decimal(1.26e26),
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            currencyLayer: "en",
            unlocked() { return hasUpgrade("en", 61) }, 
        },
        63: {
            title: "More energy",
            description: "+^0.047 Energy",
            cost: new Decimal(4.7e47),
            unlocked() { return (hasUpgrade('ma', 24) && hasUpgrade("en", 62)) }, 
        },
    },
    buyables: {
        11: {
            title: "Buy Generator 1",
            unlocked() { return (hasUpgrade('en', 25)) },
            cost(x) {
                return new Decimal(200).mul(Decimal.pow(1.5, x)).floor()
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Energy." + "<br>You have bought " + getBuyableAmount(this.layer, this.id) + " Generator 1."
                if (hasUpgrade("en", 33)) dis = dis + " Generator 1 amount multiply Power generation by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.en.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                if (!(hasUpgrade("ma", 21))) player.en.points = player.en.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                gensqboost = new Decimal(1.05)
                if (hasUpgrade("en", 51)) gensqboost = new Decimal(1.06)
                if (hasUpgrade("en", 33)) {
                    eff = new Decimal(gensqboost).pow(x)
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                return "Cost Formula: 200 x 1.5^Amt. Generation formula: Generator 1 amt x 1.5"
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
        12: {
            title: "Buy Generator 2",
            unlocked() { return getBuyableAmount("en", 11).gte(3) },
            cost(x) {
                return new Decimal(4000).mul(Decimal.pow(2.5, x)).floor()
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Energy." + "<br>You have bought " + getBuyableAmount(this.layer, this.id) + " Generator 2."
                if (hasUpgrade("en", 33)) dis = dis + " Generator 2 amount multiply Generator 1 generation by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.en.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                if (!(hasUpgrade("ma", 21))) player.en.points = player.en.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                if (hasUpgrade("en", 33)) {
                    gensqboost = new Decimal(1.05)
                    if (hasUpgrade("en", 51)) gensqboost = new Decimal(1.06)
                    eff = new Decimal(gensqboost).pow(x)
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                return "Cost Formula: 4,000 x 2.5^Amt. Generation formula: Generator 2 amt"
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
        21: {
            title: "Buy Generator 3",
            unlocked() { return getBuyableAmount("en", 12).gte(3) },
            cost(x) {
                return new Decimal(400000).mul(Decimal.pow(4, x)).floor()
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Energy." + "<br>You have bought " + getBuyableAmount(this.layer, this.id) + " Generator 3."
                if (hasUpgrade("en", 33)) dis = dis + " Generator 3 amount multiply Generator 2 generation by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.en.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                if (!(hasUpgrade("ma", 21))) player.en.points = player.en.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                if (hasUpgrade("en", 33)) {
                    gensqboost = new Decimal(1.05)
                    if (hasUpgrade("en", 51)) gensqboost = new Decimal(1.06)
                    eff = new Decimal(gensqboost).pow(x)
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                return "Cost Formula: 400,000 x 4^Amt. Generation formula: Generator 3 amt/1.2"
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
        22: {
            title: "Buy Generator 4",
            unlocked() { return getBuyableAmount("en", 21).gte(3) },
            cost(x) {
                return new Decimal(80e6).mul(Decimal.pow(7, x)).floor()
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Energy." + "<br>You have bought " + getBuyableAmount(this.layer, this.id) + " Generator 4."
                if (hasUpgrade("en", 33)) dis = dis + " Generator 4 amount multiply Generator 3 generation by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.en.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                if (!(hasUpgrade("ma", 22))) player.en.points = player.en.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                if (hasUpgrade("en", 33)) {
                    gensqboost = new Decimal(1.05)
                    if (hasUpgrade("en", 51)) gensqboost = new Decimal(1.06)
                    eff = new Decimal(gensqboost).pow(x)
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                return "Cost Formula: 8e7 x 7^Amt. Generation formula: Generator 4 amt/1.5"
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
        31: {
            title: "Buy Generator 5",
            unlocked() { return getBuyableAmount("en", 22).gte(3) },
            cost(x) {
                return new Decimal(2.5e13).mul(Decimal.pow(10, x)).floor()
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Energy." + "<br>You have bought " + getBuyableAmount(this.layer, this.id) + " Generator 5."
                if (hasUpgrade("en", 33)) dis = dis + " Generator 5 amount multiply Generator 4 generation by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.en.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.en.points = player.en.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                if (hasUpgrade("en", 33)) {
                    gensqboost = new Decimal(1.05)
                    if (hasUpgrade("en", 51)) gensqboost = new Decimal(1.06)
                    eff = new Decimal(gensqboost).pow(x)
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                return "Cost Formula: 2.5e13 x 10^Amt. Generation formula: Generator 5 amt/1.5"
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
        32: {
            title: "Buy Generator 6",
            unlocked() { return (hasMilestone("ma", 6) && getBuyableAmount("en", 31).gte(10))  },
            cost(x) {
                return new Decimal(1e27).mul(Decimal.pow(1000, x)).floor()
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Energy." + "<br>You have bought " + getBuyableAmount(this.layer, this.id) + " Generator 6."
                if (hasUpgrade("en", 33)) dis = dis + " Generator 6 amount multiply Generator 5 generation by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.en.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.en.points = player.en.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                if (hasUpgrade("en", 33)) {
                    gensqboost = new Decimal(1.05)
                    if (hasUpgrade("en", 51)) gensqboost = new Decimal(1.06)
                    eff = new Decimal(gensqboost).pow(x)
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                return "Cost Formula: 1e27 x 1,000^Amt. Generation formula: Generator 6 amt*1.1"
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
    },
    infoboxes: {
        main: {
            title: "Welcome to World Expansion (TMT)",
            body() { return "Your base resource is atoms. Generate them by reseting for energy and buying the first upgrade. However, the world can only fill up a certain amount of atoms. Good news, you can tier up your world once you reach the maximum capacity. For now, focus on getting for atoms and energy until you reach the seventh upgrade." },
        },
        gens: {
            title: "Generators",
            body() { return "You can now buy your first generator, which boosts power. Generator n generates Generator n-1, excluding the first generator, which would generate Power instead. Power boosts Energy and Atoms, and each future generator's base generation is reduced." },
        },
    },
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        if (hasUpgrade("en", 25)) mult = mult.times(player.en.power.add(1).pow(player.en.powerexpoener))
        if (hasUpgrade("en", 14)) mult = mult.times(1.4)
        if (hasUpgrade("en", 23)) mult = mult.times(1.5)
        if (hasUpgrade("en", 24)) mult = mult.times(2.5)
        if (hasUpgrade("en", 31)) mult = mult.times(2)
        if (hasUpgrade("en", 42)) mult = mult.times(1.4)
        if (hasUpgrade("ma", 11)) mult = mult.times(2)
        if (hasAchievement("a", 13)) mult = mult.times(1.04)
        if (hasAchievement("a", 14)) mult = mult.times(1.07)
        if (hasAchievement("a", 22)) mult = mult.times(1.019)
        if (hasAchievement("a", 24)) mult = mult.times(1.05)
        if (hasAchievement("a", 25)) mult = mult.times(1.05)
        if (hasMilestone("a", 7)) mult = mult.times(100)
        if (hasUpgrade("en", 15)) mult = mult.times(upgradeEffect("en", 15))
        if (hasUpgrade("en", 32)) mult = mult.times(upgradeEffect("en", 32))
        if (hasMilestone("ma", 8)) mult = mult.times(2)
        if (player.cm.clickmastery.gte(50e6)) mult = mult.times(player.cm.clickmastery.div(188888).log(18))
        if (player.cm.clickmastery.gte(1000)) mult = mult.times(player.cm.clickmastery.div(5).log(11))
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade("ma", 13)) exp = exp.add(0.05)
        if (hasMilestone("ma", 5)) exp = exp.add(0.05)
        if (hasUpgrade("en", 63)) exp = exp.add(0.047)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: Reset for energy", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    update(diff) {
        if (hasUpgrade("en", 25)) {
            // mults
            player.en.gen1multi = buyableEffect("en", 11)
            player.en.gen2multi = buyableEffect("en", 12)
            player.en.gen3multi = buyableEffect("en", 21)
            player.en.gen4multi = buyableEffect("en", 22)
            player.en.gen5multi = buyableEffect("en", 31)
            player.en.gen6multi = buyableEffect("en", 32)
            
            if (hasUpgrade("en", 44)) player.en.gen1multi = player.en.gen1multi.times(1.1)
            if (hasUpgrade("en", 44)) player.en.gen2multi = player.en.gen2multi.times(1.2)
            if (hasUpgrade("en", 44)) player.en.gen3multi = player.en.gen3multi.times(1.3)
            if (hasUpgrade("en", 44)) player.en.gen4multi = player.en.gen4multi.times(1.4)
            if (hasUpgrade("en", 53)) player.en.gen2multi = player.en.gen2multi.times(1.3)
            if (hasUpgrade("en", 53)) player.en.gen3multi = player.en.gen3multi.times(1.3)
            if (hasUpgrade("en", 53)) player.en.gen5multi = player.en.gen5multi.times(1.3)
            
            if (hasUpgrade("ma", 12)) player.en.gen3multi = player.en.gen3multi.times(1.5)
            if (hasUpgrade("ma", 12)) player.en.gen4multi = player.en.gen4multi.times(1.5)
            if (hasUpgrade("ma", 13)) player.en.gen5multi = player.en.gen5multi.times(1.5)
            if (hasUpgrade("ma", 13)) player.en.gen1multi = player.en.gen1multi.times(1.5)
            
            if (hasAchievement("a", 26)) player.en.gen1multi = player.en.gen1multi.times(1.01)
            if (hasUpgrade("ma", 14)) player.en.gen2multi = player.en.gen2multi.times(2)
            
            if (hasUpgrade("en", 55)) player.en.gen1multi = player.en.gen1multi.times(3)

        
            // power exponents
            if (hasUpgrade("en", 35)) player.en.powerexpoatom = new Decimal(0.2)
            if (hasUpgrade("en", 35)) player.en.powerexpoener = new Decimal(0.3)
            if (hasUpgrade("ma", 15)) player.en.powerexpoatom = new Decimal(0.22)
            if (hasUpgrade("ma", 15)) player.en.powerexpoener = new Decimal(0.32)



            player.en.gen6amt = getBuyableAmount("en", 32)


            // generation adding
            if (getBuyableAmount("en", 32).gte(1)) {
                if (!(hasUpgrade("ma", 21))) {
                    player.en.gen5amt = player.en.gen5amt.sub(getBuyableAmount("en", 31))
                } else {
                    player.en.gen5amt = player.en.gen5amt.sub(getBuyableAmount("en", 31).max(10))
                }
                player.en.gen5gain = player.en.gen6amt.times(player.en.gen6multi).mul(1.1)
                player.en.gen5amt = player.en.gen5amt.add(player.en.gen5gain.times(diff))
                if (!(hasUpgrade("ma", 21))) {
                    player.en.gen5amt = player.en.gen5amt.add(getBuyableAmount("en", 31))
                } else {
                    player.en.gen5amt = player.en.gen5amt.add(getBuyableAmount("en", 31).max(10))
                }
            } else {
                if (!(hasUpgrade("ma", 21))) {
                    player.en.gen5amt = getBuyableAmount("en", 31)
                } else {
                    player.en.gen5amt = getBuyableAmount("en", 31).max(10)
                }
            }

            if (getBuyableAmount("en", 31).gte(1) || hasMilestone("w", 1)) {
                player.en.gen4amt = player.en.gen4amt.sub(getBuyableAmount("en", 22))
                player.en.gen4gain = player.en.gen5amt.times(player.en.gen5multi).div(1.5)
                player.en.gen4amt = player.en.gen4amt.add(player.en.gen4gain.times(diff))
                player.en.gen4amt = player.en.gen4amt.add(getBuyableAmount("en", 22))
            } else {
                player.en.gen4amt = getBuyableAmount("en", 22)
            }
            if (hasMilestone("w", 1) && player.en.gen4amt.lte(0)) player.en.gen4amt = new Decimal(1)

            if (getBuyableAmount("en", 22).gte(1) || hasMilestone("w", 1)) {
                player.en.gen3amt = player.en.gen3amt.sub(getBuyableAmount("en", 21))
                player.en.gen3gain = player.en.gen4amt.times(player.en.gen4multi).div(1.5)
                player.en.gen3amt = player.en.gen3amt.add(player.en.gen3gain.times(diff))
                player.en.gen3amt = player.en.gen3amt.add(getBuyableAmount("en", 21))
            } else {
                player.en.gen3amt = getBuyableAmount("en", 21)
            }

            if (getBuyableAmount("en", 21).gte(1) || hasMilestone("w", 1)) {
                player.en.gen2amt = player.en.gen2amt.sub(getBuyableAmount("en", 12))
                player.en.gen2gain = player.en.gen3amt.times(player.en.gen3multi.div(1.2))
                player.en.gen2amt = player.en.gen2amt.add(player.en.gen2gain.times(diff))
                player.en.gen2amt = player.en.gen2amt.add(getBuyableAmount("en", 12))
            } else {
                player.en.gen2amt = getBuyableAmount("en", 12)
            }

            if (getBuyableAmount("en", 12).gte(1) || hasMilestone("w", 1)) {
                player.en.gen1amt = player.en.gen1amt.sub(getBuyableAmount("en", 11))
                player.en.gen1gain = player.en.gen2amt.times(player.en.gen2multi)
                player.en.gen1amt = player.en.gen1amt.add(player.en.gen1gain.times(diff))
                player.en.gen1amt = player.en.gen1amt.add(getBuyableAmount("en", 11))
            } else {
                player.en.gen1amt = getBuyableAmount("en", 11)
            }

            let gain = player.en.gen1amt.times(1.5).times(player.en.gen1multi)
            if (hasUpgrade("en", 31)) gain = gain.times(2)
            if (hasUpgrade("en", 35)) gain = gain.times(1.7)
            if (hasUpgrade("en", 42)) gain = gain.times(1.4)
            if (hasUpgrade("ma", 11)) gain = gain.times(3)
            if (hasUpgrade("ma", 22)) gain = gain.times(7)
            if (hasUpgrade("ma", 24)) gain = gain.times(2.9)
            if (hasMilestone("ma", 2)) gain = gain.times(2.5)
            if (hasMilestone("ma", 3)) gain = gain.times(3)
            if (hasMilestone("ma", 8)) gain = gain.times(2)
            if (hasAchievement("a", 15)) gain = gain.times(1.02)
            if (hasAchievement("a", 21)) gain = gain.times(1.03)
            if (player.cm.clickmastery.gte(200000)) gain = gain.times(player.cm.clickmastery.div(333).log(16))
            if (player.cm.clickmastery.gte(50e6)) gain = gain.times(player.cm.clickmastery.div(188888).log(18))
            player.en.powgain = gain
            gain = gain.times(diff)
            player.en.power = player.en.power.add(gain)
        }
    },
    layerShown(){return true}
})