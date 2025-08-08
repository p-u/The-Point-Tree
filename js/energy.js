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
        powerexpomatter: new Decimal(0),
        powgain: new Decimal(0),
        gen1amt: new Decimal(0),
        gen2amt: new Decimal(0),
        gen3amt: new Decimal(0),
        gen4amt: new Decimal(0),
        gen5amt: new Decimal(0),
        gen6amt: new Decimal(0),
        gen7amt: new Decimal(0),
        gen8amt: new Decimal(0),
        gen1gain: new Decimal(0),
        gen2gain: new Decimal(0),
        gen3gain: new Decimal(0),
        gen4gain: new Decimal(0),
        gen5gain: new Decimal(0),
        gen6gain: new Decimal(0),
        gen7gain: new Decimal(0),
        gen8gain: new Decimal(0),
        univmulti: new Decimal(1),
        gen1multi: new Decimal(1),
        gen2multi: new Decimal(1),
        gen3multi: new Decimal(1),
        gen4multi: new Decimal(1),
        gen5multi: new Decimal(1),
        gen6multi: new Decimal(1),
        gen7multi: new Decimal(1),
        gen8multi: new Decimal(1),
        bleh: 0,
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Energy", // Name of currency
    baseResource: "Atoms", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    passiveGeneration() {
        if (hasMilestone("mo", 3)) return 1
        if (hasUpgrade("ma", 22)) return 1
        if (hasUpgrade("ma", 14)) return 0.2
        if (hasMilestone("ma", 2)) return 0.1
        if (hasMilestone("mo", 1)) return 0.1
        if (hasMilestone('ma', 1)) return 0.025
        return 0
    },
    doReset(en) {
        // Stage 1: Prevent resetting if the layer is too high
        if (layers[en].row <= this.row) return;
    
        // Stage 2: Track which specific subfeatures to keep (e.g., upgrades)
        let keptUpgrades = [];
        for(i=1;i<6;i++){ //rows
            let cutoff = 5
            if (hasMilestone("mo", 7)) cutoff = 8
            if (hasUpgrade("pa", 12)) cutoff = 9
            for(v=1;v<5;v++){ //columns
              if ((hasMilestone('ma', 8)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
            for(v=1;v<cutoff;v++){ //columns
              if ((hasMilestone('mo', 5)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
        }
        let keep = [];
        if (hasMilestone("ma", 4)) {
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
                "milestones",
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
                        if (hasUpgrade("en", 83)) { a = a + ` and matter by
                        <h2><span style="color: #0F52BA; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.en.power.add(1).pow(player.en.powerexpomatter))}</span></h2>` }
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
                    if (player.en.gen6amt.gte(1)) return "You have "+ notationChooser(player.en.gen6amt) +" Generator 6. (+" + notationChooser(player.en.gen6gain) + "/s)" 
                }], 
                ["display-text", function() {
                    if (player.en.gen7amt.gte(1)) return "You have "+ notationChooser(player.en.gen7amt) +" Generator 7. (+" + notationChooser(player.en.gen7gain) + "/s)"
                }], 
                ["display-text", function() {
                    if (player.en.gen8amt.gte(1)) return "You have "+ notationChooser(player.en.gen8amt) +" Generator 8." 
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
        if (hasMilestone('ma', 9)) {
            if (layers.en.buyables[31].canAfford()) {
				layers.en.buyables[31].buy();
			};
		};
        if (hasMilestone('ma', 11)) {
            if (layers.en.buyables[32].canAfford()) {
				layers.en.buyables[32].buy();
			};
            if (hasMilestone('mo', 7)) {
                if (layers.en.buyables[41].canAfford()) {
				    layers.en.buyables[41].buy();
			    };
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
            main() {
                energyatom = 0.09
                if (hasUpgrade("en", 34)) energyatom = 0.16
                softcapDescriptionen21 = ""
                sdsc = ""
                scpow = 0.55
                upgEffecten21 = upgradeEffect(this.layer, this.id)
                if (upgEffecten21.gte(new Decimal(1e90)) ) {
                    softcapDescriptionen21 = " (Softcapped)"
                    sdsc = ". Softcaps ^" + scpow + " at 1e90x"
                }
            },
            effect() {
                let eff = player.points.add(1).pow(energyatom)
                eff = softcap(eff, new Decimal("1e90"), scpow)
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
                if (hasUpgrade("en", 64)) energyatom = 0.156
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
        64: {
            title: "Second things second",
            description: "'Atomic Amplifier' is stronger",
            cost: new Decimal(1100),
            currencyDisplayName: "Generator 5s",
            currencyInternalName: "gen5amt",
            currencyLayer: "en",
            unlocked() { return (hasUpgrade('ma', 25) && hasUpgrade("en", 63)) }, 
        },
        65: {
            title: "Boosting everything",
            description: "x1.2 Energy, Atoms, Click Mastery. x1.1 Power, Gen 1-6 generation, Matter",
            cost: new Decimal(6.1e61),
            unlocked() { return (hasUpgrade('ma', 24) && hasUpgrade("en", 64)) }, 
        },
        71: {
            title: "Cost decreaser",
            description: "Gen 7's base cost is reduced to e50 instead of e70. Multiply atoms by 7.",
            cost: new Decimal(25700),
            currencyDisplayName: "Generator 5s",
            currencyInternalName: "gen5amt",
            currencyLayer: "en",
            unlocked() { return (hasMilestone('ma', 10) && hasUpgrade("en", 65)) }, 
        },
        72: {
            title: "Mega-power",
            description: "Power boosts energy and atoms more (^0.32 -> ^0.345, ^0.22 -> ^0.242)",
            cost: new Decimal(5.1e51),
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            currencyLayer: "en",
            unlocked() { return hasUpgrade("en", 71) }, 
        },
        73: {
            title: "Simple boost?",
            description: "^1.03 Atoms",
            cost: new Decimal(1e111),
            unlocked() { return hasUpgrade("en", 72) }, 
        },
        74: {
            title: "the boost. its big, dont you worry",
            description: "x100 Atoms and Energy",
            cost: new Decimal(1e125),
            unlocked() { return hasUpgrade("en", 73) }, 
        },
        75: {
            title: "Antimatter Dimensions ahh",
            description: "Unlock the 8th Generator (requires this upgrade and 20 7th Gen). x8 Atoms, x4 Power, x2 Matter, x1 Energy",
            cost: new Decimal(1e180),
            unlocked() { return hasUpgrade("en", 74) }, 
        },
        81: {
            title: "wheeeeeeeeeeeee",
            description: "For every 'e' in this upgrade name, +x1 Atoms and +x0.25 Energy",
            cost: new Decimal(2).pow(1024),
            unlocked() { return (hasMilestone("cf", 2) && hasUpgrade("en", 75)) }, 
        },  
        82: {
            title: "Matter is the foundation of everything",
            description: "x3 Matter, Molecule effect is stronger, Sodium Upgrade is stronger, World Tier exponent is weaker",
            cost: new Decimal("3e329"),
            unlocked() { return hasUpgrade("en", 81) }, 
        },
        83: {
            title: "Insana-power",
            description: "Power boosts Matter at a hyper-reduced rate (^0.008)",
            cost: new Decimal(2e213),
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            currencyLayer: "en",
            unlocked() { return hasUpgrade("en", 82) }, 
        },
        84: {
            title: "Atomic Fusion",
            description: "Molecules now boost Atoms gain by Molecule Effect^0.5.",
            cost: new Decimal("4e431"),
            unlocked() { return hasUpgrade("en", 81) }, 
            effect() {
                powerful = 0.5
                if (hasMilestone("mo", 10)) powerful = 0.8
                if (hasUpgrade("mo", 34)) powerful = 0.9
                sdsc = ""
                softcapDescriptionen84 = ""
                return layers.mo.effect().pow(powerful)
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionen84
            },
            tooltip() {
                return "Formula: Molecule Effect^"  + powerful + sdsc
            },
            unlocked() { return hasUpgrade("en", 83) }, 
        },
        85: {
            title: "8 is the magic number",
            description: "x8 Gen 1-8 generation, x88 Atoms, x8 Energy, x1.8 Matter, x1.08 Molecule Bonds gain",
            cost: new Decimal("8e488"),
            unlocked() { return (hasMilestone("cf", 2) && hasUpgrade("en", 84)) }, 
        },
    },
    buyables: {
        11: {
            title: "Buy Generator 1",
            unlocked() { return (hasUpgrade('en', 25)) },
            cost(x) {
                if (x < 6000) {
                    return new Decimal(200).mul(Decimal.pow(1.5, x)).floor()
                } else {
                    return new Decimal("e1070").mul(Decimal.pow(1.7, x-6000)).floor()
                }
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Energy. <br>"
                if (hasUpgrade("pa", 13)) {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " + " + formatWhole(this.extra()) + " Generator 1."
                } else {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Generator 1."
                }
                if (hasUpgrade("en", 33)) dis = dis + " Generator 1 amount multiply Power generation by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.en.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                if (!(hasUpgrade("ma", 21))) player.en.points = player.en.points.sub(this.cost().mul(cost))
                if (hasUpgrade("ma", 25)) {
                    if (getBuyableAmount(this.layer, this.id).gte(6000)) {
                        setBuyableAmount(this.layer, this.id, player.en.points.div("e1070").log(1.7).floor().add(6001))
                    } else { 
                        setBuyableAmount(this.layer, this.id, player.en.points.div(200).log(1.5).floor().add(1))
                    }
                } else {
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                }
            },
            extra(){
                let extra = new Decimal(0)
                if (hasUpgrade("pa", 13)) extra = extra.plus(getBuyableAmount(this.layer, 51).mul(2))
                return extra
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                gensqboost = new Decimal(1.05)
                if (hasUpgrade("en", 51)) gensqboost = new Decimal(1.06)
                if (hasUpgrade("mo", 22)) gensqboost = new Decimal(1.061)
                if (hasUpgrade("en", 33)) {
                    eff = new Decimal(gensqboost).pow(Decimal.max(x.sub(1), 0))
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                return "Cost Formula: 200 x 1.5^Amt [Before 6000, after 6000 its e1070 x 1.7^(Amt-6000)]. Generation formula: Generator 1 amt x 1.5"
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
                if (x < 2250) {
                    return new Decimal(4000).mul(Decimal.pow(2.5, x)).floor()
                } else {
                    return new Decimal("e900").mul(Decimal.pow(3, x-2250)).floor()
                }
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Energy." + "<br>You have bought " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Generator 2."
                if (hasUpgrade("en", 33)) dis = dis + " Generator 2 amount multiply Generator 1 generation "
                if ((hasMilestone("mo", 2)) && (hasUpgrade("en", 33))) dis = dis + "and power gain "
                dis = dis + "by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.en.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                if (!(hasUpgrade("ma", 21))) player.en.points = player.en.points.sub(this.cost().mul(cost))
                if (hasUpgrade("ma", 25)) {
                    if (getBuyableAmount(this.layer, this.id).gte(2250)) {
                        setBuyableAmount(this.layer, this.id, player.en.points.div("e900").log(3).floor().add(2251))
                    } else {
                        setBuyableAmount(this.layer, this.id, player.en.points.div(4000).log(2.5).floor().add(1))
                    }
                } else {
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                }
            },
            effect(x) {
                if (hasUpgrade("en", 33)) {
                    gensqboost = new Decimal(1.05)
                    if (hasUpgrade("en", 51)) gensqboost = new Decimal(1.06)
                    if (hasUpgrade("ma", 34)) gensqboost = new Decimal(1.061)
                    if (hasUpgrade("mo", 22)) gensqboost = new Decimal(1.0625)
                    eff = new Decimal(gensqboost).pow(Decimal.max(x.sub(1), 0))
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                return "[Before 2000] Cost Formula: 4,000 x 2.5^Amt. [After 2250] Cost Formula: e900 x 3^(Amt-2250)Generation formula: Generator 2 amt"
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
                if (x < 1500) {
                    return new Decimal(400000).mul(Decimal.pow(4, x)).floor()
                } else {
                    return new Decimal("e920").mul(Decimal.pow(5, x-1500)).floor()
                }
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Energy. <br>"
                if (hasUpgrade("mo", 33)) {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " + " + formatWhole(this.extra()) + " Generator 3."
                } else {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Generator 3."
                }
                if (hasUpgrade("en", 33)) dis = dis + " Generator 3 amount multiply Generator 2 generation "
                if ((hasMilestone("mo", 4)) && (hasUpgrade("en", 33))) dis = dis + "and power gain "
                dis = dis + "by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.en.points.gte(this.cost())
            },
            extra(){
                let extra = new Decimal(0)
                if (hasUpgrade("mo", 33)) extra = extra.plus(getBuyableAmount(this.layer, 31).div(3).floor())
                return extra
            },
            buy() {
                let cost = new Decimal(1)
                if (!(hasUpgrade("ma", 21))) player.en.points = player.en.points.sub(this.cost().mul(cost))
                if (hasUpgrade("ma", 31)) {
                    if (getBuyableAmount(this.layer, this.id).gte(1500)) {
                        setBuyableAmount(this.layer, this.id, player.en.points.div("e920").log(5).floor().add(1501))
                    } else {
                        setBuyableAmount(this.layer, this.id, player.en.points.div(400000).log(4).floor().add(1))
                    }
                } else {
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                }
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                if (hasUpgrade("en", 33)) {
                    gensqboost = new Decimal(1.05)
                    if (hasUpgrade("en", 51)) gensqboost = new Decimal(1.06)
                    if (hasUpgrade("ma", 34)) gensqboost = new Decimal(1.0625)
                    if (hasUpgrade("mo", 22)) gensqboost = new Decimal(1.065)
                    eff = new Decimal(gensqboost).pow(Decimal.max(x.sub(1), 0))
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                return "Cost Formula: 400,000 x 4^Amt [Before 1500, after 1500 its e920 x 5^(Amt-1500)]. Generation formula: Generator 3 amt/1.2"
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
                if (x < 1100) {
                    return new Decimal(80e6).mul(Decimal.pow(7, x)).floor()
                } else {
                    return new Decimal("e960").mul(Decimal.pow(12, x-1100)).floor()
                }
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Energy. <br>"
                if (hasUpgrade("ma", 45)) {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " + " + formatWhole(this.extra()) + " Generator 4."
                } else {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Generator 4."
                }
                if (hasUpgrade("en", 33)) dis = dis + " Generator 4 amount multiply Generator 3 generation "
                if ((hasMilestone("mo", 5)) && (hasUpgrade("en", 33))) dis = dis + "and power gain "
                dis = dis + "by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            extra(){
                let extra = new Decimal(0)
                if (hasUpgrade("ma", 45)) extra = extra.plus(getBuyableAmount(this.layer, 32).div(2).floor())
                return extra
            },
            canAfford() {
                return player.en.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                if (!(hasUpgrade("ma", 22))) player.en.points = player.en.points.sub(this.cost().mul(cost))
                if (hasUpgrade("mo", 14)) {
                    if (getBuyableAmount(this.layer, this.id).gte(1100)) {
                        setBuyableAmount(this.layer, this.id, player.en.points.div("e960").log(12).floor().add(1101))
                    } else {
                        setBuyableAmount(this.layer, this.id, player.en.points.div(80e6).log(7).floor().add(1))
                    }
                } else {
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                }
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                if (hasUpgrade("en", 33)) {
                    gensqboost = new Decimal(1.05)
                    if (hasUpgrade("en", 51)) gensqboost = new Decimal(1.06)
                    if (hasUpgrade("ma", 34)) gensqboost = new Decimal(1.0642)
                    if (hasUpgrade("mo", 22)) gensqboost = new Decimal(1.0675)
                    eff = new Decimal(gensqboost).pow(Decimal.max(x.sub(1), 0))
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                return "Cost Formula: 8e7 x 7^Amt [Before 1100, after 1100 its e960 x 12^(Amt-1100)]. Generation formula: Generator 4 amt/1.5"
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
                if (x < 1000) {
                    return new Decimal(2.5e13).mul(Decimal.pow(10, x)).floor()
                } else {
                    return new Decimal("e1000").mul(Decimal.pow(125, x-1000)).floor()
                }
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Energy. <br>"
                if (hasMilestone("mo", 8)) {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " + " + formatWhole(this.extra()) + " Generator 5."
                } else {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Generator 5."
                }
                if (hasUpgrade("en", 33)) dis = dis + " Generator 5 amount multiply Generator 4 generation "
                if ((hasUpgrade("mo", 24)) && (hasUpgrade("en", 33))) dis = dis + "and power gain "
                dis = dis + "by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.en.points.gte(this.cost())
            },
            extra(){
                let extra = new Decimal(0)
                if (hasMilestone("mo", 8)) extra = extra.plus(getBuyableAmount(this.layer, 41))
                return extra
            },
            buy() {
                let cost = new Decimal(1)
                if (hasMilestone("mo", 5)) {
                    if (getBuyableAmount(this.layer, this.id).gte(1000)) {
                        setBuyableAmount(this.layer, this.id, player.en.points.div("e1000").log(125).floor().add(1001))
                    } else {
                        setBuyableAmount(this.layer, this.id, player.en.points.div(2.5e13).log(10).floor().add(1))
                    }
                } else {
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                }
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                if (hasUpgrade("en", 33)) {
                    gensqboost = new Decimal(1.05)
                    if (hasUpgrade("en", 51)) gensqboost = new Decimal(1.06)
                    if (hasUpgrade("ma", 34)) gensqboost = new Decimal(1.0665)
                    if (hasUpgrade("mo", 22)) gensqboost = new Decimal(1.072)
                    if (hasUpgrade("pa", 14)) gensqboost = new Decimal(1.076)
                    eff = new Decimal(gensqboost).pow(Decimal.max(x.sub(1), 0))
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                return "Cost Formula: 2.5e13 x 10^Amt [Before 1e3, after 1e3 its e1000 x 125^(Amt-1e3)]. Generation formula: Generator 5 amt/1.5"
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
                if (x < 750) {
                    return new Decimal(1e27).mul(Decimal.pow(1000, x)).floor()
                } else {
                    return new Decimal("e2300").mul(Decimal.pow(10000, x-750)).floor()
                }
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Energy." + "<br>You have bought " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Generator 6."
                if (hasUpgrade("en", 33)) { 
                    dis = dis + " Generator 6 amount multiply Generator 5 generation "
                    if (hasMilestone("mo", 9)) dis = dis + "and power gain "
                    dis = dis + "by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
                }
                return dis
            },
            canAfford() {
                return player.en.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                if (!(hasMilestone("w", 2))) player.en.points = player.en.points.sub(this.cost().mul(cost))
                if (hasUpgrade("pa", 11)) {
                    if (getBuyableAmount(this.layer, this.id).gte(750)) {
                        setBuyableAmount(this.layer, this.id, player.en.points.div("e2300").log(10000).floor().add(751))
                    } else {
                        setBuyableAmount(this.layer, this.id, player.en.points.div(1e27).log(1000).floor().add(1))
                    }
                } else {
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                }
            },
            effect(x) {
                if (hasUpgrade("en", 33)) {
                    gensqboost = new Decimal(1.05)
                    if (hasUpgrade("en", 51)) gensqboost = new Decimal(1.06)
                    if (hasUpgrade("ma", 34)) gensqboost = new Decimal(1.07)
                    if (hasUpgrade("mo", 22)) gensqboost = new Decimal(1.078)
                    if (hasUpgrade("pa", 14)) gensqboost = new Decimal(1.085)
                    eff = new Decimal(gensqboost).pow(Decimal.max(x.sub(1), 0))
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                return "Cost Formula: 1e27 x 1,000^Amt [Before 750, after 750 its e2300 x 1e4^(Amt-750)]. Generation formula: Generator 6 amt*1.1"
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
        41: {
            title: "Buy Generator 7",
            unlocked() { return (getBuyableAmount("en", 32).gte(12) && hasMilestone("w", 2)) },
            cost(x) {
                let g7cost = 1e70
                if (hasUpgrade("en", 71)) g7cost = 1e50
                if (x < 600) {
                    return new Decimal(g7cost).mul(Decimal.pow(1e7, x)).floor()
                } else {
                    return new Decimal("e4444").mul(Decimal.pow(1e9, x-600)).floor()
                }
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Energy." + "<br>You have bought " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Generator 7."
                if (hasUpgrade("en", 33)) { 
                    dis = dis + " Generator 7 amount multiply Generator 6 generation "
                    if (hasMilestone("mo", 9)) dis = dis + "and power gain "
                    dis = dis + "by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
                }
                return dis
            },
            canAfford() {
                return player.en.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                if (!(hasMilestone("mo", 5))) player.en.points = player.en.points.sub(this.cost().mul(cost))
                if (hasUpgrade("pa", 11)) {
                    if (getBuyableAmount(this.layer, this.id).gte(600)) {
                        setBuyableAmount(this.layer, this.id, player.en.points.div("e4444").log(1e9).floor().add(601))
                    } else {
                        setBuyableAmount(this.layer, this.id, player.en.points.div(1e50).log(1e7).floor().add(1))
                    }
                } else {
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                }
            },
            effect(x) {
                if (hasUpgrade("en", 33)) {
                    gensqboost = new Decimal(1.05)
                    if (hasUpgrade("en", 51)) gensqboost = new Decimal(1.06)
                    if (hasUpgrade("ma", 34)) gensqboost = new Decimal(1.075)
                    if (hasUpgrade("mo", 22)) gensqboost = new Decimal(1.085)
                    if (hasUpgrade("pa", 14)) gensqboost = new Decimal(1.1)
                    eff = new Decimal(gensqboost).pow(Decimal.max(x.sub(1), 0))
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                if (!(hasUpgrade("en", 71))) {
                    return "Cost Formula: 1e70 x 1e7^Amt. Generation formula: Generator 7 amt/2"
                } else {
                    return "Cost Formula: 1e50 x 1e7^Amt [Before 600, after 600 its e4444 x 1e9^(Amt-600)]. Generation formula: Generator 7 amt/2"
                }
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
        42: {
            title: "Buy Generator 8",
            unlocked() { return ((hasUpgrade("en", 75)) && getBuyableAmount("en", 41).gte(20)) },
            cost(x) {
                let g8cost = 1e200
                if (x < 420) {
                    return new Decimal(g8cost).mul(Decimal.pow(1e12, x)).floor()
                } else {
                    return new Decimal("e5250").mul(Decimal.pow(1e23, x-420)).floor()
                }
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Energy." + "<br>You have bought " + getBuyableAmount(this.layer, this.id) + " Generator 8."
                if (hasUpgrade("en", 33)) { 
                    dis = dis + " Generator 8 amount multiply Generator 7 generation "
                    if (hasMilestone("mo", 9)) dis = dis + "and power gain "
                    dis = dis + "by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
                }
                return dis
            },
            canAfford() {
                return player.en.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                if (!hasUpgrade("pa", 11)) player.en.points = player.en.points.sub(this.cost().mul(cost))
                if (hasUpgrade("pa", 11)) {
                    if (getBuyableAmount(this.layer, this.id).gte(420)) {
                        setBuyableAmount(this.layer, this.id, player.en.points.div("e5250").log(1e23).floor().add(421))
                    } else {
                        setBuyableAmount(this.layer, this.id, player.en.points.div(1e200).log(1e12).floor().add(1))
                    }
                } else {
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                }
            },
            effect(x) {
                if (hasUpgrade("en", 33)) {
                    gensqboost = new Decimal(1.05)
                    if (hasUpgrade("en", 51)) gensqboost = new Decimal(1.06)
                    if (hasUpgrade("ma", 34)) gensqboost = new Decimal(1.0825)
                    if (hasUpgrade("mo", 22)) gensqboost = new Decimal(1.1)
                    if (hasUpgrade("pa", 14)) gensqboost = new Decimal(1.125)
                    eff = new Decimal(gensqboost).pow(Decimal.max(x.sub(1), 0))
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                return "Cost Formula: 1e200 x 1e12^Amt [Before 420, after 420 its e5250 x e23^(Amt-420)]. Generation formula: Generator 8 amt/1.33"
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
        51: {
            title: "Buy Tickspeed",
            unlocked() { return ((hasUpgrade("mo", 25)) && getBuyableAmount("en", 42).gte(1)) },
            cost(x) {
                let tspd = "1e500"
                return new Decimal(tspd).mul(Decimal.pow(1e10, x)).floor()
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Energy." + "<br>You have bought " + getBuyableAmount(this.layer, this.id) + " Tickspeed."
                dis = dis + " Tickspeed multiplies Gen 1-8 generation by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.en.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                if (!hasUpgrade("pa", 11))player.en.points = player.en.points.sub(this.cost().mul(cost))
                if (hasUpgrade("pa", 11)) {
                    setBuyableAmount(this.layer, this.id, player.en.points.div("1e500").log(1e10).floor().add(1))
                } else {
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                }
            },
            effect(x) {
                tspdboost = new Decimal(1.1)
                if (hasUpgrade("pa", 13)) tspdboost = new Decimal(1.11)
                eff = new Decimal(tspdboost).pow(Decimal.max(x.sub(1), 0))
                return eff
            },
            tooltip() {
                return "Cost Formula: 1e500 x 1e10^Amt. Does not generate anything."
            },
            
            style() {
                if (canBuyBuyable(this.layer, this.id)) {
                    return {
                        'width': '500px',
                        'height': '60px',
                        'background-color': '#FFD700',
                    }
                } else {
                    return {
                        'width': '500px',
                        'height': '60px',
                    }
                }
            }
        },
    },
    infoboxes: {
        main: {
            title: "Welcome to World Growth!",
            body() { return "Your base resource is atoms. Generate them by reseting for energy and buying the first upgrade. Upgrades give a sense of progression and boost stuff. However, the world can only fill up a certain amount of atoms. Good news, you can tier up your world once you reach the maximum capacity and gain boosts. For now, focus on getting for atoms and energy until you reach the seventh upgrade." },
        },
        gens: {
            title: "Generators",
            body() { return "You can now buy your first generator, which boosts power. Generator n generates Generator n-1, excluding the first generator, which would generate Power instead. Power boosts Energy and Atoms, and each future generator's base generation is reduced." },
        },
    },
    gainMult() { // Energy
        let mult = new Decimal(1)
        if (hasUpgrade("en", 25)) mult = mult.times(player.en.power.add(1).pow(player.en.powerexpoener))
        if (hasUpgrade("en", 14)) mult = mult.times(1.4)
        if (hasUpgrade("en", 23)) mult = mult.times(1.5)
        if (hasUpgrade("en", 24)) mult = mult.times(2.5)
        if (hasUpgrade("en", 31)) mult = mult.times(2)
        if (hasUpgrade("en", 42)) mult = mult.times(1.4)
        if (hasUpgrade("en", 65)) mult = mult.times(1.2)
        if (hasUpgrade("en", 74)) mult = mult.times(100)
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
        if (hasMilestone("ma", 10)) mult = mult.times(2)
        if (hasUpgrade("mo", 11)) mult = mult.times(2)
        if (hasUpgrade("mo", 12)) mult = mult.times(3)
        if (hasUpgrade("mo", 14)) mult = mult.times(7)
        if (hasUpgrade("mo", 15)) mult = mult.times(4)
        if (hasMilestone("ma", 11)) mult = mult.times(3)
        if (hasUpgrade("en", 81)) mult = mult.times(13).div(4)
        if (player.cm.clickmastery.gte(2e10)) mult = mult.times(player.cm.clickmastery.times(500).log(5000000))
        if (hasUpgrade("en", 85)) mult = mult.times(8)
        if (hasUpgrade("mo", 23)) {
		    if (hasUpgrade("en", 81)) mult = mult.times(19)
	    } else {
		    if (hasUpgrade("en", 81)) mult = mult.times(13).div(4)
	    }
        if (player.cm.clickmastery.gte(50e6)) mult = mult.times(player.cm.clickmastery.div(288888).log(28))
        if (player.cm.clickmastery.gte(1000)) mult = mult.times(player.cm.clickmastery.mul(5).log(25))
        
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
            player.en.gen7multi = buyableEffect("en", 41)
            player.en.gen8multi = buyableEffect("en", 42)
            

            player.en.gen1multi = player.en.gen1multi.times(buyableEffect("mo", 11))
            player.en.gen2multi = player.en.gen2multi.times(buyableEffect("mo", 12))
            player.en.gen3multi = player.en.gen3multi.times(buyableEffect("mo", 21))
            player.en.gen4multi = player.en.gen4multi.times(buyableEffect("mo", 22))
            player.en.gen5multi = player.en.gen5multi.times(buyableEffect("mo", 31))
            player.en.gen6multi = player.en.gen6multi.times(buyableEffect("mo", 32))
            
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
            if (hasMilestone("ma", 4)) player.en.gen2multi = player.en.gen2multi.times(2)
            if (hasAchievement("a", 36)) player.en.gen3multi = player.en.gen3multi.times(1.03)
            
            if (hasUpgrade("en", 55)) player.en.gen1multi = player.en.gen1multi.times(3)
            if (hasUpgrade("en", 65)) player.en.gen1multi = player.en.gen1multi.times(1.1)
            if (hasUpgrade("en", 65)) player.en.gen2multi = player.en.gen2multi.times(1.1)
            if (hasUpgrade("en", 65)) player.en.gen3multi = player.en.gen3multi.times(1.1)
            if (hasUpgrade("en", 65)) player.en.gen4multi = player.en.gen4multi.times(1.1)
            if (hasUpgrade("en", 65)) player.en.gen5multi = player.en.gen5multi.times(1.1)
            if (hasUpgrade("en", 65)) player.en.gen6multi = player.en.gen6multi.times(1.1)
            
            if (hasUpgrade("ma", 32)) player.en.gen6multi = player.en.gen6multi.times(1.25)
            if (hasUpgrade("ma", 32)) player.en.gen7multi = player.en.gen7multi.times(1.25)
            if (hasUpgrade("ma", 32)) player.en.gen1multi = player.en.gen1multi.times(1.25)
            if (hasUpgrade("ma", 32)) player.en.gen2multi = player.en.gen2multi.times(1.25)

            if (hasUpgrade("en", 85)) player.en.gen1multi = player.en.gen1multi.times(8)
            if (hasUpgrade("en", 85)) player.en.gen2multi = player.en.gen2multi.times(8)
            if (hasUpgrade("en", 85)) player.en.gen3multi = player.en.gen3multi.times(8)
            if (hasUpgrade("en", 85)) player.en.gen4multi = player.en.gen4multi.times(8)
            if (hasUpgrade("en", 85)) player.en.gen5multi = player.en.gen5multi.times(8)
            if (hasUpgrade("en", 85)) player.en.gen6multi = player.en.gen6multi.times(8)
            if (hasUpgrade("en", 85)) player.en.gen7multi = player.en.gen7multi.times(8)
            if (hasUpgrade("en", 85)) player.en.gen8multi = player.en.gen8multi.times(8)

            if (hasAchievement("a", 63)) player.en.gen4multi = player.en.gen4multi.times(1.14)


            if (hasUpgrade("mo", 25)) player.en.gen1multi = player.en.gen1multi.times(buyableEffect("en", 51))
            if (hasUpgrade("mo", 25)) player.en.gen2multi = player.en.gen2multi.times(buyableEffect("en", 51))
            if (hasUpgrade("mo", 25)) player.en.gen3multi = player.en.gen3multi.times(buyableEffect("en", 51))
            if (hasUpgrade("mo", 25)) player.en.gen4multi = player.en.gen4multi.times(buyableEffect("en", 51))
            if (hasUpgrade("mo", 25)) player.en.gen5multi = player.en.gen5multi.times(buyableEffect("en", 51))
            if (hasUpgrade("mo", 25)) player.en.gen6multi = player.en.gen6multi.times(buyableEffect("en", 51))
            if (hasUpgrade("mo", 25)) player.en.gen7multi = player.en.gen7multi.times(buyableEffect("en", 51))
            if (hasUpgrade("mo", 25)) player.en.gen8multi = player.en.gen8multi.times(buyableEffect("en", 51))

        
            // power exponents
            if (hasUpgrade("en", 35)) player.en.powerexpoatom = new Decimal(0.2)
            if (hasUpgrade("en", 35)) player.en.powerexpoener = new Decimal(0.3)
            if (hasUpgrade("ma", 15)) player.en.powerexpoatom = new Decimal(0.22)
            if (hasUpgrade("ma", 15)) player.en.powerexpoener = new Decimal(0.32)
            if (hasUpgrade("en", 72)) player.en.powerexpoatom = new Decimal(0.242)
            if (hasUpgrade("en", 72)) player.en.powerexpoener = new Decimal(0.345)
            if (hasUpgrade("en", 83)) player.en.powerexpomatter = new Decimal(0.008)


            player.en.gen8amt = getBuyableAmount("en", 42)
            
            if (getBuyableAmount("en", 42).gte(1)) {
                player.en.gen7amt = player.en.gen7amt.sub(getBuyableAmount("en", 41))
                player.en.gen7gain = player.en.gen8amt.times(player.en.gen8multi).div(1.33)
                player.en.gen7amt = player.en.gen7amt.add(player.en.gen7gain.times(diff))
                player.en.gen7amt = player.en.gen7amt.add(getBuyableAmount("en", 41))
            } else {
                player.en.gen7amt = getBuyableAmount("en", 41)
            }


            if (getBuyableAmount("en", 41).gte(1)) {
                player.en.gen6amt = player.en.gen6amt.sub(getBuyableAmount("en", 32))
                player.en.gen6gain = player.en.gen7amt.times(player.en.gen7multi).div(2)
                player.en.gen6amt = player.en.gen6amt.add(player.en.gen6gain.times(diff))
                player.en.gen6amt = player.en.gen6amt.add(getBuyableAmount("en", 32))
            } else {
                player.en.gen6amt = getBuyableAmount("en", 32)
            }


            // generation adding
            if (getBuyableAmount("en", 32).gte(1)) {
                player.en.gen5amt = player.en.gen5amt.sub(getBuyableAmount("en", 31))
                player.en.gen5gain = player.en.gen6amt.times(player.en.gen6multi).mul(1.1)
                player.en.gen5amt = player.en.gen5amt.add(player.en.gen5gain.times(diff))
                player.en.gen5amt = player.en.gen5amt.add(getBuyableAmount("en", 31))
            } else {
                player.en.gen5amt = getBuyableAmount("en", 31)
            }

            if (getBuyableAmount("en", 31).gte(1) || hasMilestone("ma", 4)) {
                player.en.gen4amt = player.en.gen4amt.sub(getBuyableAmount("en", 22))
                player.en.gen4gain = player.en.gen5amt.times(player.en.gen5multi).div(1.5)
                player.en.gen4amt = player.en.gen4amt.add(player.en.gen4gain.times(diff))
                player.en.gen4amt = player.en.gen4amt.add(getBuyableAmount("en", 22))
            } else {
                player.en.gen4amt = getBuyableAmount("en", 22)
            }

            if (getBuyableAmount("en", 22).gte(1) || hasMilestone("ma", 4)) {
                player.en.gen3amt = player.en.gen3amt.sub(getBuyableAmount("en", 21))
                player.en.gen3gain = player.en.gen4amt.times(player.en.gen4multi).div(1.5)
                player.en.gen3amt = player.en.gen3amt.add(player.en.gen3gain.times(diff))
                player.en.gen3amt = player.en.gen3amt.add(getBuyableAmount("en", 21))
            } else {
                player.en.gen3amt = getBuyableAmount("en", 21)
            }

            if (getBuyableAmount("en", 21).gte(1) || hasMilestone("ma", 4)) {
                player.en.gen2amt = player.en.gen2amt.sub(getBuyableAmount("en", 12))
                player.en.gen2gain = player.en.gen3amt.times(player.en.gen3multi.div(1.2))
                player.en.gen2amt = player.en.gen2amt.add(player.en.gen2gain.times(diff))
                player.en.gen2amt = player.en.gen2amt.add(getBuyableAmount("en", 12))
            } else {
                player.en.gen2amt = getBuyableAmount("en", 12)
            }

            if (getBuyableAmount("en", 12).gte(1) || hasMilestone("ma", 4)) {
                player.en.gen1amt = player.en.gen1amt.sub(getBuyableAmount("en", 11))
                player.en.gen1gain = player.en.gen2amt.times(player.en.gen2multi)
                player.en.gen1amt = player.en.gen1amt.add(player.en.gen1gain.times(diff))
                player.en.gen1amt = player.en.gen1amt.add(getBuyableAmount("en", 11))
            } else {
                player.en.gen1amt = getBuyableAmount("en", 11)
            }

            if (hasMilestone("ma", 4) && getBuyableAmount("en", 22).lt(1)) {
                player.en.gen4amt = new Decimal(1)
            }

            let gain = player.en.gen1amt.times(1.5).times(player.en.gen1multi)
            if ((hasMilestone("mo", 2)) && (hasUpgrade("en", 33))) gain = gain.times(buyableEffect("en", 12))
            if ((hasMilestone("mo", 4)) && (hasUpgrade("en", 33))) gain = gain.times(buyableEffect("en", 21))
            if ((hasMilestone("mo", 5)) && (hasUpgrade("en", 33))) gain = gain.times(buyableEffect("en", 22))
            if ((hasUpgrade("mo", 24)) && (hasUpgrade("en", 33))) gain = gain.times(buyableEffect("en", 31))
            if (hasUpgrade("en", 33)) {
                if (hasMilestone("mo", 9)) {
                    gain = gain.times(buyableEffect("en", 32))
                    gain = gain.times(buyableEffect("en", 41))
                    gain = gain.times(buyableEffect("en", 42))
                }
            }
            if (hasUpgrade("en", 31)) gain = gain.times(2)
            if (hasUpgrade("en", 35)) gain = gain.times(1.7)
            if (hasUpgrade("en", 42)) gain = gain.times(1.4)
            if (hasUpgrade("ma", 11)) gain = gain.times(3)
            if (hasUpgrade("ma", 22)) gain = gain.times(7)
            if (hasUpgrade("ma", 24)) gain = gain.times(2.9)
            if (hasUpgrade("ma", 32)) gain = gain.times(123)
            if (hasMilestone("ma", 2)) gain = gain.times(2.5)
            if (hasMilestone("ma", 3)) gain = gain.times(3)
            if (hasMilestone("ma", 8)) gain = gain.times(2)
            if (hasAchievement("a", 15)) gain = gain.times(1.02)
            if (hasAchievement("a", 21)) gain = gain.times(1.03)
            if (hasAchievement("a", 51)) gain = gain.times(1.02)
            if (hasAchievement("a", 52)) gain = gain.times(1.04)
            if (hasAchievement("a", 53)) gain = gain.times(1.03)
            if (hasAchievement("a", 54)) gain = gain.times(1.06)
            if (hasAchievement("a", 55)) gain = gain.times(1.04)
            if (hasAchievement("a", 56)) gain = gain.times(1.08)
            if (hasUpgrade("en", 65)) gain = gain.times(1.1)
            if (hasUpgrade("en", 75)) gain = gain.times(4)
            if (hasAchievement("a", 41)) gain = gain.times(1.08)
            if (hasUpgrade("mo", 13)) gain = gain.times(4)
            if (hasAchievement("a", 43)) gain = gain.times(1.2)
            if (hasAchievement("a", 65)) gain = gain.times(1.25)
            if (hasUpgrade("mo", 15)) gain = gain.times(3)
            if (hasAchievement("a", 46)) gain = gain.times(1.1)
            if (hasUpgrade("mo", 21)) gain = gain.times(1000)
            if (hasMilestone("w", 2)) gain = gain.times(new Decimal(2).pow(player.w.points))
            if (player.cm.clickmastery.gte(200000)) gain = gain.times(player.cm.clickmastery.div(33).log(333))
            if (player.cm.clickmastery.gte(50e6)) gain = gain.times(player.cm.clickmastery.div(288888).log(28))
            if (player.cm.clickmastery.gte(4e9)) gain = gain.times(player.cm.clickmastery.mul(888).log(88888))
            if (hasMilestone("ma", 11)) gain = gain.times(2)
            if (hasMilestone("mo", 7)) gain = gain.times(77)
            

            if (hasMilestone("ma", 9)) gain = gain.pow(1.01)
            if (hasUpgrade("mo", 13)) gain = gain.pow(1.04)
            
            gain = softcap(gain, new Decimal("e720"), new Decimal(0.6))
            player.en.powgain = gain
            gain = gain.times(diff)
            player.en.power = player.en.power.add(gain)
            if (player.en.points.gte(10) && player.en.bleh == 0) {
                player.en.bleh = player.timePlayed
            }
        }
    },
    layerShown(){return true}
})