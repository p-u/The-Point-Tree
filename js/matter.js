addLayer("ma", {
    name: "Matter", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        shrinkpts: new Decimal(0),
        shrinkgain: new Decimal(1),
        shrinkmul: new Decimal(1),
        univsize: new Decimal(1000),
        shrinkobjs: new Decimal(0),
        shr1amt: new Decimal(0),
        shr2amt: new Decimal(0),
        shr3amt: new Decimal(0),
        shr4amt: new Decimal(0),
        shrinkdiv: new Decimal(1),
        shrinkbase: new Decimal(1),
        objnum: new Decimal(1),
        spatomlg: new Decimal(5),
    }},
    layerShown(){
        let visible = false
        if (hasUpgrade('en', 45) || player.ma.unlocked) visible = true
       return visible
     },
    passiveGeneration() {
        if (hasMilestone("mo", 3)) return 0.025
        if (hasUpgrade("mo", 14)) return 0.01
        if (hasMilestone("mo", 1)) return 0.005
        return 0
    },
    automate() {
		if (hasUpgrade('ma', 224) || hasMilestone("cl", 3)) {
			if (layers.ma.buyables[11].canAfford()) {
				layers.ma.buyables[11].buy();
			};
            if (layers.ma.buyables[12].canAfford()) {
				layers.ma.buyables[12].buy();
			};
		};
	},
    doReset(ma) {
        // Stage 1: Prevent resetting if the layer is too high
        if (layers[ma].row <= this.row) return;
    
        // Stage 2: Track which specific subfeatures to keep (e.g., upgrades)
        let keptUpgrades = [];
        for(i=1;i<6;i++){ //rows
            let cutoff = 4
            if (hasUpgrade("pa", 12)) cutoff = 5
            let scutoff = 22
            for(v=1;v<3;v++){ //columns
              if ((hasMilestone('mo', 4)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
            for(v=3;v<cutoff;v++){ //columns
              if ((hasMilestone('mo', 6)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
            for(v=21;v<scutoff;v++){ //columns
              if ((hasUpgrade('pa', 32)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
            if ((hasUpgrade('pa', 32)) && hasUpgrade(this.layer, 51)) keptUpgrades.push(51)

        }
        let keep = [];
        if ((hasUpgrade('pa', 32))) keep.push("buyables");
        keep.push("shrinkobjs");

    
        // Stage 4: Perform the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5: Add back the specific subfeatures saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },    
    tabFormat: {
        "Main tab": {
            content: [
                "main-display",
                ["display-text", function() {
                    return "You have "+ notationChooser(player.ma.total) +" total Matter" 
                }],
                "blank",
                "prestige-button",
                "blank",
                "milestones",
                "blank",
                "blank",
                ["upgrades", [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]],
                "blank",
                "blank",
                ["infobox", "mat"],
            ],
        },
        "Shrinkenator": {
            content: [
                "main-display",
                "blank",
                ["display-text", function() {
                    return "You are currently shrinking a "+ player.ma.objname + " (Object "+ notationChooser(player.ma.objnum) +"). You gain +"+ notationChooser(player.ma.shrinkgain.mul(player.ma.shrinkmul)) +" Shrink Points per shrink."
                }],
                "blank",
                ["display-text", function() {
                    let a = ""
                    if (player.ma.univsize.lte(1e-7)) {
                        a = a + "Current Object Size: "+ notationChooser(player.ma.univsize.mul(1.616e33)) +" planck lengths."
                    } else if (player.ma.univsize.lte(1)) {
                        a = a + "Current Object Size: "+ notationChooser(player.ma.univsize.mul(1e7)) +"nm. "
                    } else if (player.ma.univsize.lte(100)) {
                        a = a + "Current Object Size: "+ notationChooser(player.ma.univsize) +"cm. "
                    } else if (player.ma.univsize.lte(946073047258080000)) {
                        a = a + "Current Object Size: "+ notationChooser(player.ma.univsize.div(100)) +"m. "
                    } else if (player.ma.univsize.lte(9.460730472581e29)) {
                        a = a + "Current Object Size: "+ notationChooser(player.ma.univsize.div(946073047258080000)) +"ly. "
                    } else if (player.ma.univsize.lte(8.9505421e59)) {
                        a = a + "Current Object Size: "+ notationChooser(player.ma.univsize.div(9.460730472581e29)) +"uni. "
                    } else if (player.ma.univsize.lte(new Decimal(9.460730472581e29).pow(1000))) {
                        let xx = Decimal.floor(player.ma.univsize.log(9.460730472581e29))
                        a = a + "Current Object Size: "+ notationChooser(player.ma.univsize.div(new Decimal(9.460730472581e29).pow(xx))) +"uni^" + xx + ". "
                    } else if (player.ma.univsize.lte(new Decimal(9.460730472581e29).pow(2000))) {
                        a = a + "Current Object Size: "+ notationChooser(player.ma.univsize.div(new Decimal(9.460730472581e29).pow(1000))) +"mlt. "
                    } else {
                        let xx = Decimal.floor(player.ma.univsize.log(new Decimal(9.460730472581e29).pow(1000)))
                        a = a + "Current Object Size: "+ notationChooser(player.ma.univsize.div(new Decimal(9.460730472581e29).pow(xx))) +"mlt^" + xx + ". "
                    }
                    a = a + "(/"+ notationChooser(player.ma.shrinkdiv) +" size per second)."
                    a = a + "  Shrink Base: /"+ notationChooser(player.ma.shrinkbase) +""
                    return a
                }],
                "blank",
                ["display-text", function() {
                    return "Your goal is to shrink the object to 1 centimetre. You can shrink it by buying Shrinkenators. You shrink faster the smaller the object is. You have shrinked " + notationChooser(player.ma.shrinkobjs) + " objects in total."
                }],
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `You have 
                        <h2><span style="color: cyan; text-shadow: 0px 0px 10px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.ma.shrinkpts)}</span></h2> Shrink Points, which multiplies Atoms gain by x`
                        a = a + notationChooser(new Decimal(1000).pow(Decimal.max(player.ma.shrinkpts.add(0.000001).log(player.ma.spatomlg).add(1), 0))) + "."
                        return a
                    }
                ],
                "blank",
                "buyables",
                "blank",
                "blank",
                ["upgrades", [21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]],
                "blank",
                "blank",
                ["infobox", "shrink"],
            ],
            unlocked() {return hasUpgrade("ma", 51)}
        },
    },
    color: "#0F52BA",
    requires: new Decimal(500000000), // Can be a function that takes requirement increases into account
    resource: "Matter", // Name of currency
    baseResource: "Atoms", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    upgrades: {
        11: {
            title: "01: Hydrogen",
            description: "x3 Power, x2 Energy",
            cost: new Decimal(1),
        },
        12: {
            title: "02: Helium",
            description: "x1.5 Gen 3 and 4 generation, x4 Atoms",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("ma", 11) }, 
        },
        13: {
            title: "03: Lithium",
            description: "^1.05 Atoms, +^0.05 Energy, x1.5 Gen 1,5 generation",
            cost: new Decimal(8),
            unlocked() { return hasUpgrade("ma", 12) }, 
        },
        14: {
            title: "04: Beryllium",
            description: "x4 Atoms, x2 Energy Passive Generation",
            cost: new Decimal(60),
            unlocked() { return hasUpgrade("ma", 13) }, 
        },
        15: {
            title: "05: Boron",
            description: "+^0.02 Power-Atom and Power-Energy boost",
            cost: new Decimal(2500),
            unlocked() { return hasUpgrade("ma", 14) }, 
        },
        21: {
            title: "06: Carbon",
            description: "Gen 1-3 cost nothing and are automated, and have at least 10 Gen 5s on Matter reset",
            cost: new Decimal(34567),
            unlocked() { return hasUpgrade("ma", 15) }, 
        },
        22: {
            title: "07: Nitrogen",
            description: "Gen 4 costs nothing, Gain 100% of your energy on reset, x7 Power",
            cost: new Decimal(2e6),
            unlocked() { return hasUpgrade("ma", 21) }, 
        },
        23: {
            title: "08: Oxygen",
            description: "x8 atoms",
            cost: new Decimal(20e6),
            unlocked() { return hasUpgrade("ma", 22) }, 
        },
        24: {
            title: "09: Fluorine",
            description: "Auto Gen 4, ^1.029 Atoms, x2.9 Power, unlock 1 energy upgrade",
            cost: new Decimal(100e6),
            unlocked() { return hasUpgrade("ma", 23) }, 
        },
        25: {
            title: "10: Neon",
            description: "Buy Max Gen 1 and 2, Matter effect is stronger, unlock 2 new Energy upgrades",
            cost: new Decimal(10e9),
            unlocked() { return hasUpgrade("ma", 24) }, 
        },
        31: {
            title: "11: Sodium",
            description: "Increases Matter gain based on Energy",
            cost: new Decimal(5e12),
            effect() {
                if (hasUpgrade("en", 82)) {
                    if (hasUpgrade("pa", 14)) {
                        return player.en.points.add(1).log(3)
                    } else{
                        return player.en.points.add(1).log(2).div(10)
                    }
                } else {
                    return player.en.points.add(1).log10().div(10)
                }
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x"
            },
            tooltip() {
                if (hasUpgrade("en", 82)) {
                    return "Formula: log2(Energy)/10"
                }
                else {
                    return "Formula: log10(Energy)/10"
                }
            },
            unlocked() { return hasUpgrade("ma", 25) }, 
        },
        32: {
            title: "12: Magnesium",
            description: "Generator 1, 2, 6 and 7 generations is increased by x1.25, x123 Power",
            cost: new Decimal(7e16),
            unlocked() { return (hasUpgrade("ma", 31) && hasMilestone("w", 2)) }, 
        },
        33: {
            title: "13: Aluminium",
            description: "Boosts matter based on itself",
            cost: new Decimal(2.5e17),
            effect() {
                mattermatter = 0.09
                softcapDescriptionma33 = ""
                sdsc = ""
                upgEffectma33 = upgradeEffect(this.layer, this.id)
                let eff = player.ma.points.add(1).pow(mattermatter)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionma33
            },
            tooltip() {
                return "Formula: (Matter+1)^"  + mattermatter + sdsc
            },
            unlocked() { return hasUpgrade("ma", 32) }, 
        },
        34: {
            title: "14: Silicon",
            description: "Generator² is increasingly stronger for each passing generator",
            cost: new Decimal(1.24e24),
            unlocked() { return (hasUpgrade("ma", 33) && hasMilestone("w", 2)) }, 
        },
        35: {
            title: "15: Phosphorous",
            description: "x5 Matter",
            cost: new Decimal(3e31),
            unlocked() { return (hasUpgrade("ma", 34) && hasMilestone("w", 2)) }, 
        },
        41: {
            title: "16: Sulfur",
            description: "x6 Molecules gain (wow!)",
            cost: new Decimal(6e155),
            unlocked() { return (hasUpgrade("ma", 35) && hasMilestone("cf", 3)) }, 
        },
        42: {
            title: "17: Chlorine",
            description: "For every Matter upgrade, x1.25 Matter gain",
            cost: new Decimal(6e163),
            effect() {
                matterups = player.ma.upgrades.length
                if (hasUpgrade("pa", 21)) matterups = matterups + player.pa.upgrades.length
                if (hasMilestone("ma", 15)) matterups = matterups + player.mo.upgrades.length
                scale = new Decimal(1.25)
                if (hasMilestone("ma", 13)) scale = new Decimal(1.4)
                let eff = scale.pow(matterups)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x"
            },
            tooltip() {
                return "Formula: " + scale + "^Matter Upgrades"
            },
            unlocked() { return hasUpgrade("ma", 41) }, 
        },
        43: {
            title: "18: Argon",
            description: "For every Matter upgrade, double Atom gain",
            cost: new Decimal(3.1e170),
            effect() {
                matterups = player.ma.upgrades.length
                if (hasUpgrade("pa", 21)) matterups = matterups + player.pa.upgrades.length
                if (hasMilestone("ma", 15)) matterups = matterups + player.mo.upgrades.length
                scaleatom = new Decimal(2)
                if (hasMilestone("ma", 13)) scaleatom = new Decimal(3)
                let eff = scaleatom.pow(matterups)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x"
            },
            tooltip() {
                return "Formula: " + scaleatom + "^Matter Upgrades"
            },
            unlocked() { return hasUpgrade("ma", 42) }, 
        },
        44: {
            title: "19: Potassium",
            description: "Delay the Matter layer softcap by e16",
            cost: new Decimal(3e189),
            unlocked() { return hasUpgrade("ma", 43) }, 
        },
        45: {
            title: "20: Calcium",
            description: "Every 2 Generator 6s, give 1 additional Generator 4.",
            cost: new Decimal(3e213), 
            unlocked() { return hasUpgrade("ma", 44) }, 
        },
        51: {
            title: "21: Scandium",
            description: "Unlock the 'Shrinkenator'. x10 Matter.",
            cost: new Decimal("1e1192"), 
            unlocked() { return (hasMilestone("cf", 6) && hasUpgrade("ma", 45)) }, 
        },
        52: {
            title: "22: Titanium",
            description: "Matter boosts Shrink Speed (min x1). Gain extra Gen 6-8 based on Gen 8. s-4 requires 5e57 spent Particles.",
            cost: new Decimal("1e1524"), 
            effect() {
                let eff = Decimal.max(player.ma.points.slog().sub(1), new Decimal(1))
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x"
            },
            tooltip() {
                return "Formula: [slog(Matter)-1]x"
            },
            unlocked() { return (hasMilestone("cf", 6) && hasUpgrade("ma", 51)) }, 
        },
        53: {
            title: "23: Vanadium",
            description: "+^0.005 Matter.",
            cost: new Decimal("7e1747"), 
            unlocked() { return (hasMilestone("cf", 6) && hasUpgrade("ma", 52)) }, 
        },
        54: {
            title: "24: Chromium",
            description: "Total Matter Milestones boost Atom gain. Boost energy gain by the same boost at e5300 Energy.",
            cost: new Decimal("8e1880"), 
            effect() {
                matterms = player.ma.milestones.length
                scale = new Decimal(10)
                let eff = scale.pow(matterms)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x"
            },
            tooltip() {
                return "Formula: " + scaleatom + "^Matter Milestones"
            },
            unlocked() { return (hasMilestone("cf", 6) && hasUpgrade("ma", 53)) }, 
        },
        55: {
            title: "25: Manganese",
            description: "Matter boosts Particles by ^0.001 (base). Passively assign particles Alpha-Delta (negligible amount but does NOT take away current particles)",
            cost: new Decimal("2.5e2025"),
            effect() {
                matterpart = 0.001
                softcapDescriptionma55 = ""
                sdsc = ""
                upgEffectma55 = upgradeEffect(this.layer, this.id)
                let eff = player.ma.points.add(1).pow(matterpart)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionma55
            },
            unlocked() { return hasUpgrade("ma", 54) }, 
        },
        211: {
            title: "s-1: Insanity",
            description: "Shrink x1.1 faster. x2.5 Particles passive generation, x100 Matter, x10^10 Power",
            cost: new Decimal(4), 
            currencyDisplayName: "Shrink Points",
            currencyInternalName: "shrinkpts",
            currencyLayer: "ma",
            unlocked() { return hasUpgrade("ma", 51) }, 
        },
        212: {
            title: "s-2: Simple but strong",
            description: "Shrink x1.2 faster. Unlock a new object and Shrinkenator. x2.4e24 Atoms.",
            cost: new Decimal(10), 
            currencyDisplayName: "Shrink Points",
            currencyInternalName: "shrinkpts",
            currencyLayer: "ma",
            unlocked() { return hasUpgrade("ma", 211) }, 
        },
        213: {
            title: "s-3: Getting way bigger",
            description: "Shrinks 30% faster. Unlock a new object. x3e3 Matter and x33e13 Energy.",
            cost: new Decimal(60), 
            currencyDisplayName: "Shrink Points",
            currencyInternalName: "shrinkpts",
            currencyLayer: "ma",
            unlocked() { return hasUpgrade("ma", 212) }, 
        },
        214: {
            title: "s-4: Where's the 's' in this? [Next: req e240 MoB]",
            description: "xe50 Atoms [MoB -> Molecule Bonds, A -> Atoms, E -> Energy, M -> Matter, P -> Particles, SP -> Shrink Points]",
            cost: new Decimal(150), 
            currencyDisplayName: "Shrink Points",
            currencyInternalName: "shrinkpts",
            currencyLayer: "ma",
            unlocked() { return (hasUpgrade("ma", 213) && player.pa.totalParticles.gte(5e57)) }, 
        },
        215: {
            title: "s-5: Thats big. [Next: req 8e82 Held P]",
            description: "Shrinks 50% faster. Unlocks a new object. ^1.02 Power.",
            cost: new Decimal(335), 
            currencyDisplayName: "Shrink Points",
            currencyInternalName: "shrinkpts",
            currencyLayer: "ma",
            unlocked() { return (hasUpgrade("ma", 214) && player.mo.points.gte(1e240)) }, 
        },
        221: {
            title: "s-6: CAUTION, this upgrade is NOT kept on Particle resets! [Next: req e90 Alpha P]",
            description: "Shrinkenator 3 boost is DOUBLED, unlock a new object and ^1.0036 Atoms.",
            cost() {
                if (hasAchievement("a", 85)) return new Decimal(400)
                return new Decimal(600)
            },
            currencyDisplayName: "Shrink Points",
            currencyInternalName: "shrinkpts",
            currencyLayer: "ma",
            unlocked() { return (hasUpgrade("ma", 214) && player.pa.points.gte(8e82)) }, 
        },
        222: {
            title: "s-7: An insane rework...",
            description: "BUFFS: The decrease of speed for every OOM of size is decreased from 10% to 5%. x2.5 Shrink Points. <br> NERFS: Now, you need 1 planck length to shrink the object completely instead of 1cm. /2.5 Shrink Speed.",
            cost() {
                return new Decimal(7500)
            },
            currencyDisplayName: "Shrink Points",
            currencyInternalName: "shrinkpts",
            currencyLayer: "ma",
            unlocked() { return (hasUpgrade("ma", 221) && player.pa.clickableamt.alpha.gte(1e90)) }, 
        },
        223: {
            title: "s-8: more of the bigger (Next: Req e8.4K Atoms)",
            description: "Unlock Shrinkenator 4, and Object 6. Shrink Points give way more boosts to Atom gain, and WT3 Matter boost is stronger. Also, a uni^n = 9.460730472581e29x the size of a uni^(n-1)...",
            cost() {
                return new Decimal(33333)
            },
            currencyDisplayName: "Shrink Points",
            currencyInternalName: "shrinkpts",
            currencyLayer: "ma",
            unlocked() { return (hasUpgrade("ma", 222) && player.pa.points.gte(8e82)) }, 
        },
        224: {
            title: "s-9: crazy upticc (Next: Req 600 Booster 1s)",
            description: "Boosts to ALL CURRENCIES. +49.9% SP, x9 P, x99 MoB, xe9 M, xe19 Power, xe29 A, xe49 E. Automate: Shrinkenator I, II, Booster 5",
            cost() {
                return new Decimal(222222)
            },
            currencyDisplayName: "Shrink Points",
            currencyInternalName: "shrinkpts",
            currencyLayer: "ma",
            unlocked() { return (hasUpgrade("ma", 223) && player.points.gte("e8400")) }, 
        },
        225: {
            title: "s-10: a sparkle in your eyes",
            description: "ok what are these terrible upg names... unlock a new object, ^1.01 Atoms and +^0.01 Energy. Also auto assign Epsilon Particles at a reduced rate. (intended 80b clicks by this point)",
            cost() {
                return new Decimal(2.5e6)
            },
            currencyDisplayName: "Shrink Points",
            currencyInternalName: "shrinkpts",
            currencyLayer: "ma",
            unlocked() { return (hasUpgrade("ma", 224) && getBuyableAmount("mo", 11).gte(600)) }, 
        },
    },
    milestones: {
        1: {
            requirementDescription: "2 total Matter",
            effectDescription: "Generate 2.5% of energy on reset a sec",
            done() { return player.ma.total.gte(2) }
        },
        2: {
            requirementDescription: "5 total Matter",
            effectDescription: "x4 Energy Passive Generation, x2.5 Power, unlock more energy upgrades",
            unlocked() { return hasMilestone("ma", 1)},
            done() { return player.ma.total.gte(5) }
        },
        3: {
            requirementDescription: "30 total Matter",
            effectDescription: "x3.0 Power",
            unlocked() { return hasMilestone("ma", 2)},
            done() { return player.ma.total.gte(30) }
        },
        4: { 
            requirementDescription: "250 total Matter",
            effectDescription: "x2 Gen 2 production, Keep Gen 4 on reset",
            unlocked() { return hasMilestone("ma", 3)},
            done() { return player.ma.total.gte(250) }
        },
        5: {
            requirementDescription: "17,500 total Matter",
            effectDescription: "+^0.05 Energy Gain",
            unlocked() { return hasMilestone("ma", 4)},
            done() { return player.ma.total.gte(17500) }
        },
        6: {
            requirementDescription: "125,000 total Matter",
            effectDescription: "Unlock Gen 6 and more upgrades",
            unlocked() { return hasMilestone("ma", 5)},
            done() { return player.ma.total.gte(125000) }
        },
        7: {
            requirementDescription: "1e7 total Matter",
            effectDescription: "Unlock Click Mastery (Optional, but recommended to get at least 1-5K clicks) and unlock 6 achievements related to Click Mastery.",
            unlocked() { return hasMilestone("ma", 6)},
            done() { return player.ma.total.gte(10e6) }
        },
        8: {
            requirementDescription: "4e9 total Matter",
            unlocked() { return hasMilestone("ma", 7)},
            effectDescription: "Keep first 4 rows of energy upgrades on reset, x2 energy and power",
            done() { return player.ma.total.gte(4e9) }
        },
        9: {
            requirementDescription: "2.5e15 total Matter",
            unlocked() { return hasMilestone("ma", 8)},
            effectDescription: "Autobuy Gen 5, Buy Max Gen 3, ^1.01 Power and Atoms",
            done() { return player.ma.total.gte(2.5e15) }
        },
        10: {
            requirementDescription: "2.0e20 total Matter",
            effectDescription: "x2 Energy, Extend Energy Upgrades, unlock a side layer named 'Content Features'",
            unlocked() { return hasMilestone("ma", 9)},
            done() { return player.ma.total.gte(2e20) }
        },
        11: {
            requirementDescription: "7.8e56 total Matter",
            effectDescription: "Autobuy Gen 6, x3 Energy and Atoms, x2 Matter and Power",
            unlocked() { return hasMilestone("ma", 10)},
            done() { return player.ma.total.gte(7.8e56) }
        },
        12: {
            requirementDescription: "1.6e116 total Matter",
            effectDescription: "Matter softcap is reduced.",
            unlocked() { return hasMilestone("ma", 11)},
            done() { return player.ma.total.gte(1.6e116) }
        },
        13: {
            requirementDescription: "1e228 total Matter",
            effectDescription: "'Chlorine', 'Argon' and 'Potassium' upgrades are stronger.",
            unlocked() { return hasUpgrade("ma", 45)},
            done() { return player.ma.total.gte(1e228) }
        },
        14: {
            requirementDescription: "8e358 total Matter",
            effectDescription: "Power:Matter effect is stronger, and reduce the Matter softcap effect",
            unlocked() { return hasMilestone("ma", 13)},
            done() { return player.ma.total.gte("8e358") }
        },
        15: {
            requirementDescription: "7e977 total Matter",
            effectDescription: "'Chlorine' and 'Argon' upgrade boosts are affected by Molecule upgrades",
            unlocked() { return hasMilestone("ma", 13)},
            done() { return player.ma.total.gte("7e977") }
        },
        16: {
            requirementDescription: "e2160 total Matter + 300 SP",
            effectDescription: "Matter also affects Shrink Speed. xe50 Atoms, unlock the Epsilon particle, BUT 1/300th the Particle Passive Gen...",
            unlocked() { return hasUpgrade("ma", 211)},
            done() { return (player.ma.total.gte("e2160") && player.ma.shrinkpts.gte("300"))  }
        },
    },
    buyables: {
        11: {
            title: "Shrinkenator I",
            cost() {
                let base = new Decimal("1e1200")
                let scale = new Decimal(100)
                let expo = new Decimal(1.6)
                let amt = getBuyableAmount("ma", 11).plus(this.extra())
                return Decimal.pow(base, 1).times(Decimal.pow(scale, amt)).times(Decimal.pow(expo, amt.mul(amt))).ceil()
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Matter. <br>"
                if (this.extra().gte(1)) {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " + " + notationChooser(this.extra()) + " Shrinkenator I."
                } else {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Shrinkenator I."
                }
                if (hasUpgrade("pa", 34)) {
                    dis = dis + " Shrinkenator I amount increases shrinking base by " + notationChooser(new Decimal(1.04).pow(getBuyableAmount("ma", 11))) + ", and multiplies shrinking by " + notationChooser(buyableEffect(this.layer, this.id).div(2).add(1)) + "x."
                } else {
                    dis = dis + " Shrinkenator I amount increases shrinking base by " + notationChooser(buyableEffect(this.layer, this.id)) + ", and multiplies shrinking by " + notationChooser(buyableEffect(this.layer, this.id).div(2).add(1)) + "x."
                }
                return dis
            },
            canAfford() {
                return player.ma.points.gte(this.cost())
            },
            buy() {
                let cost = this.cost()
                if (!this.canAfford()) return
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ma.points = player.ma.points.minus(cost)
            },
            extra(){
                let extra = new Decimal(0)
                return extra
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                let base = new Decimal(0.02)
                eff = new Decimal(base.mul(x))
                return eff
            },
            tooltip() {
                return "Cost Formula: 1e1200 * 100^(x) * 1.6^(x^2), where x is the amount you own. Each Shrinkenator 1 (S1) increases base (+0.02x per) and S1 Shrink Multi (+0.01x per)."
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
        12: {
            title: "Shrinkenator II",
            cost() {
                let base = new Decimal("3e1333")
                let scale = new Decimal(3333)
                let expo = new Decimal(1.9)
                let amt = getBuyableAmount(this.layer, this.id).plus(this.extra())
                return Decimal.pow(base, 1).times(Decimal.pow(scale, amt)).times(Decimal.pow(expo, amt.mul(amt))).ceil()
            },
            unlocked() { return hasUpgrade("ma", 212)},
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Matter. <br>"
                if (this.extra().gte(1)) {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " + " + notationChooser(this.extra()) + " Shrinkenator II."
                } else {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Shrinkenator II."
                }
                dis = dis + " Shrinkenator II amount multiplies shrinking by " + notationChooser(buyableEffect(this.layer, this.id)) + "x."
                return dis
            },
            canAfford() {
                return player.ma.points.gte(this.cost())
            },
            buy() {
                let cost = this.cost()
                if (!this.canAfford()) return
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ma.points = player.ma.points.minus(cost)
            },
            extra(){
                let extra = new Decimal(0)
                return extra
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                let base = new Decimal(0.025)
                eff = new Decimal(base.mul(x)).add(1)
                return eff
            },
            tooltip() {
                return "Cost Formula: 3e1333 * 3333^(x) * 1.9^(x^2), where x is the amount you own. Each Shrinkenator 2 (S2) increases S2 Shrink Multi (+0.025x per)."
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
        21: {
            title: "Shrinkenator III",
            cost() {
                let base = new Decimal("1e1700")
                let scale = new Decimal(800000)
                let expo = new Decimal(2.4)
                let amt = getBuyableAmount(this.layer, this.id).plus(this.extra())
                return Decimal.pow(base, 1).times(Decimal.pow(scale, amt)).times(Decimal.pow(expo, amt.mul(amt))).ceil()
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Matter. <br>"
                if (this.extra().gte(1)) {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " + " + notationChooser(this.extra()) + " Shrinkenator III."
                } else {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Shrinkenator III."
                }
                dis = dis + " Shrinkenator III amount multiplies shrinking by " + notationChooser(buyableEffect(this.layer, this.id)) + "x."
                return dis
            },
            canAfford() {
                return player.ma.points.gte(this.cost())
            },
            unlocked() { return hasMilestone("w", 4)},
            buy() {
                let cost = this.cost()
                if (!this.canAfford()) return
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ma.points = player.ma.points.minus(cost)
            },
            extra(){
                let extra = new Decimal(0)
                return extra
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                let base = new Decimal(0.025)
                if (hasUpgrade("ma", 221)) base = new Decimal(0.05)
                eff = new Decimal(base.mul(x)).add(1)
                return eff
            },
            tooltip() {
                return "Cost Formula: 1e1700 * 8e5^(x) * 2.4^(x^2), where x is the amount you own. Each Shrinkenator 3 (S3) increases S3 Shrink Multi (+0.025x per)."
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
        22: {
            title: "Shrinkenator IV",
            cost() {
                let base = new Decimal("e2300")
                let scale = new Decimal(444444)
                let expo = new Decimal(4)
                let amt = getBuyableAmount(this.layer, this.id).plus(this.extra())
                return Decimal.pow(base, 1).times(Decimal.pow(scale, amt)).times(Decimal.pow(expo, amt.mul(amt))).ceil()
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Matter. <br>"
                if (this.extra().gte(1)) {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " + " + notationChooser(this.extra()) + " Shrinkenator IV."
                } else {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Shrinkenator IV."
                }
                dis = dis + " Shrinkenator IV amount multiplies shrinking by " + notationChooser(buyableEffect(this.layer, this.id)) + "x,"
                dis = dis + " and particle passive gain by " + notationChooser(buyableEffect(this.layer, this.id).pow(Decimal.max(new Decimal(6).sub(getBuyableAmount("ma", 22).div(10)), new Decimal(3.5)))) + "."
                return dis
            },
            canAfford() {
                return player.ma.points.gte(this.cost())
            },
            unlocked() { return hasUpgrade("ma", 223)},
            buy() {
                let cost = this.cost()
                if (!this.canAfford()) return
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ma.points = player.ma.points.minus(cost)
            },
            extra(){
                let extra = new Decimal(0)
                return extra
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                let base = new Decimal(0.064)
                eff = new Decimal(base.mul(x)).add(1)
                return eff
            },
            tooltip() {
                return "Cost Formula: e2300 * 444444^(x) * 2.74^(x^2), where x is the amount you own. Each Shrinkenator 4 (S4) increases S4 Shrink Multi (+0.064x per)."
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
    },
    infoboxes: {
        mat: {
            title: "Matter",
            body() { return "You did your first reset! All of your hard-earned progress, generators, energy and atoms, are just wiped. However, it unlocks new upgrades, and a new layer with more features. Enter Milestones, where total Matter is used, and it gives boosts without spending any of your Matter!" },
        },
        shrink: {
            title: "The Shrinkenator",
            body() { return "The Shrinkenator is a machine that shrinks objects. You can buy Shrinkenators with Matter, and they increase your shrinking speed. Your goal is to shrink the object to 1 centimetre, and when you do, you get Shrink Points. Upgrades give you increasing-sized objects which yield more Shrink Points. Shrink Points multiply Atom gain, BUT ARE RESET ON MOLECULES/PARTICLES AND ABOVE." },
        }
    },
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        if (layers.mo.effect().gte(1)) mult = mult.times(layers.mo.effect())
        if (hasMilestone("w", 1)) mult = mult.times(1.5)
        if (hasUpgrade("en", 54)) mult = mult.times(2)
        if (hasUpgrade("en", 62)) mult = mult.times(3)
        if (hasUpgrade("en", 75)) mult = mult.times(2)
        if (hasUpgrade("mo", 12)) mult = mult.times(3)
        if (hasUpgrade("mo", 15)) mult = mult.times(2)
        if (hasUpgrade("ma", 35)) mult = mult.times(5)
        if (hasAchievement("a", 33)) mult = mult.times(1.05)
        if (hasUpgrade("en", 65)) mult = mult.times(1.1)
        if (hasUpgrade("ma", 31)) mult = mult.times(upgradeEffect("ma", 31))
        if (hasUpgrade("ma", 42)) mult = mult.times(upgradeEffect("ma", 42))
        if (hasUpgrade("ma", 33)) mult = mult.times(upgradeEffect("ma", 33))
        let w3b = new Decimal(1.1)
        if (hasUpgrade("ma", 223)) w3b = player.w.points
        if (hasMilestone("w", 2)) mult = mult.times(w3b.pow(player.w.points))
        if (hasMilestone("ma", 11)) mult = mult.times(2)
        if (hasUpgrade("en", 82)) mult = mult.times(3)
        if (hasUpgrade("pa", 11)) mult = mult.times(2)
        if (hasMilestone("mo", 7)) mult = mult.times(77)
        if (hasMilestone("cf", 6)) mult = mult.times(42.5)
        if (hasUpgrade("ma", 51)) mult = mult.times(10)
        if (hasUpgrade("ma", 211)) mult = mult.times(100)
        if (hasUpgrade("ma", 213)) mult = mult.times(3e3)
	    if (hasMilestone("cl", 1)) mult = mult.times(new Decimal(10).pow(player.cl.energy.add(1).slog()))
        if (hasUpgrade("ma", 224)) mult = mult.times(1e9)
        if (hasMilestone("cf", 4) && player.mo.points.gte(1e24)) mult = mult.times(Decimal.min(new Decimal(1.7).pow(Decimal.max(player.mo.points.div(1e24).log(2), 1)), new Decimal(50)))
        mult = mult.times(layers.pa.getBetaEff())
        if (hasUpgrade("en", 91)) {
		    mult = mult.times(new Decimal(1.05).pow(player.en.wheeamt))
        } else {
            if ((hasUpgrade("en", 81)) && (hasUpgrade("mo", 23))) mult = mult.times(player.en.wheeamt).div(4)
        }
        if (hasUpgrade("en", 83)) mult = mult.times(player.en.power.add(1).pow(player.en.powerexpomatter))
        if (player.cm.clickmastery.gte(1e7)) mult = mult.times(player.cm.clickmastery.div(333).log(3333))
        if (player.cm.clickmastery.gte(2e9)) mult = mult.times(player.cm.clickmastery.mul(70).log(700000))
        if (player.cm.clickmastery.gte(2e10)) mult = mult.times(player.cm.clickmastery.times(500).log(5000000))
        if (player.cm.clickmastery.gte(8e10)) mult = mult.times(1.5)
        if (hasUpgrade("en", 85)) mult = mult.times(1.8)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade("mo", 42)) exp = exp.add(0.02)
        if (hasUpgrade("ma", 52)) exp = exp.add(0.005)
        return exp
    },
    effect(){
        let effectBoost = 1.7
        if (hasUpgrade("ma", 25)) effectBoost = 1.85
        if (hasUpgrade("pa", 24)) effectBoost = 1.5
        if (hasUpgrade("pa", 31)) effectBoost = 1.52
        let eff = player.ma.points.add(1).pow(effectBoost)
        let sc = 0.7
        if (hasMilestone("ma", 11)) sc = 0.73
        if (hasMilestone("ma", 14)) sc = 0.75
        softcapstart = new Decimal(1e150)
        if (hasUpgrade("ma", 44)) {
            softcapstart = new Decimal(1e166)
        }
        if (hasMilestone("ma", 13)) softcapstart = new Decimal(1e175)
        if (hasUpgrade("pa", 24)) softcapstart = new Decimal("1eeeeeeeeeeeeee100")
        softcappedEffect = softcap(eff, new Decimal(softcapstart), new Decimal(sc))
        return softcappedEffect
    },
    effectDescription() {
        let softcapDescription = ""
        let layerEffect = tmp[this.layer].effect
        softcapstart = new Decimal(1e150)
        if (hasUpgrade("ma", 44)) {
            softcapstart = new Decimal(1e166)
        }
        if (hasMilestone("ma", 13)) softcapstart = new Decimal(1e175)
        if (hasUpgrade("pa", 24)) softcapstart = new Decimal("1e5000")

        if (layerEffect.gte(softcapstart) ) {
            softcapDescription = " (Softcapped at "+ notationChooser(softcapstart) +"x)"
        }
        let des = "which is boosting atoms by x" + notationChooser(layerEffect) + softcapDescription
        return des;
    },
    branches: ["en"], 
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset to gain Matter", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    update(diff) {
        if (hasUpgrade("ma", 51)) {
            if (hasMilestone("ma", 16)) { 
                player.ma.shrinkmul = layers.pa.getEpsilonEff()
            } else {
                player.ma.shrinkmul = decimalOne
            }
            if (hasUpgrade("ma", 222)) player.ma.shrinkmul = player.ma.shrinkmul.mul(2.5)
            if (hasUpgrade("ma", 224)) player.ma.shrinkmul = player.ma.shrinkmul.mul(1.499)
	        if (hasMilestone("cl", 1)) player.ma.shrinkmul = player.ma.shrinkmul.times(new Decimal(10).pow(player.cl.energy.add(1).slog()))
            if (player.cm.clickmastery.gte(5e11) && hasMilestone("w", 4)) player.ma.shrinkmul = player.ma.shrinkmul.times(1.175)
            let shrinkeff = new Decimal(1)
            // adding
            if (hasUpgrade("pa", 34)) {
                shrinkeff = shrinkeff.add(new Decimal(1.04).pow(getBuyableAmount("ma", 11)))
            } else {
                shrinkeff = shrinkeff.add(buyableEffect("ma", 11))
            }
            // multiplying
            shrinkeff = shrinkeff.times(buyableEffect("ma", 11).div(2).add(1))
            shrinkeff = shrinkeff.times(buyableEffect("ma", 12))
            shrinkeff = shrinkeff.times(buyableEffect("ma", 21))
            shrinkeff = shrinkeff.times(buyableEffect("ma", 22))
            player.ma.spatomlg = new Decimal(5)
            if (hasMilestone("w", 4)) player.ma.spatomlg = new Decimal(4.5)
            if (hasUpgrade("ma", 223)) player.ma.spatomlg = new Decimal(2)
            if (hasUpgrade("ma", 211)) shrinkeff = shrinkeff.times(1.1)
            if (hasUpgrade("ma", 212)) shrinkeff = shrinkeff.times(1.2)
            if (hasUpgrade("ma", 213)) shrinkeff = shrinkeff.times(1.3)
            if (hasUpgrade("ma", 215)) shrinkeff = shrinkeff.times(1.5)
            if (hasMilestone("w", 4)) shrinkeff = shrinkeff.times(1.5)
            if (hasUpgrade("ma", 52)) shrinkeff = shrinkeff.times(upgradeEffect("ma", 52))
            if (hasUpgrade("ma", 222)) shrinkeff = shrinkeff.div(2.5)
            if (hasMilestone("cl", 1)) shrinkeff = shrinkeff.times(new Decimal(10).pow(player.cl.energy.add(1).slog()))
            if (hasMilestone("cl", 2)) shrinkeff = shrinkeff.times(player.cl.points)
            if (hasMilestone("cl", 4)) shrinkeff = shrinkeff.pow(1.2)
            player.ma.shrinkbase = shrinkeff
            let oomsizedec = new Decimal(1.1)
            if (hasUpgrade('ma', 222)) oomsizedec = new Decimal(1.05)
            let newshrinkeff = shrinkeff.sub(1).div(oomsizedec.pow(player.ma.univsize.log(10))).add(1)
            player.ma.shrinkdiv = newshrinkeff
            newshrinkeff = newshrinkeff.sub(1).mul(diff).add(1)
            player.ma.univsize = player.ma.univsize.div(newshrinkeff)
            let min = new Decimal(1)
            if (hasUpgrade("ma", 222)) min = new Decimal(1.616e-33)
            if (player.ma.univsize.lt(min)){
                player.ma.objname = "Adult"
                player.ma.objnum = new Decimal(1)
                player.ma.shrinkgain = new Decimal(1)
                if (hasUpgrade("ma", 212)) player.ma.objname = "Skyscraper"
                if (hasUpgrade("ma", 212)) player.ma.objnum = new Decimal(2)
                if (hasUpgrade("ma", 212)) player.ma.shrinkgain = new Decimal(2)
                if (hasUpgrade("ma", 213)) player.ma.objname = "The Heliopause"
                if (hasUpgrade("ma", 213)) player.ma.objnum = new Decimal(3)
                if (hasUpgrade("ma", 213)) player.ma.shrinkgain = new Decimal(10)
                if (hasUpgrade("ma", 215)) player.ma.objname = "Our Universe (estimated size)"
                if (hasUpgrade("ma", 215)) player.ma.objnum = new Decimal(4)
                if (hasUpgrade("ma", 215)) player.ma.shrinkgain = new Decimal(50)
                if (hasUpgrade("ma", 221)) player.ma.objname = "[Hypothetical] Universe Cluster"
                if (hasUpgrade("ma", 221)) player.ma.objnum = new Decimal(5)
                if (hasUpgrade("ma", 221)) player.ma.shrinkgain = new Decimal(200)
                if (hasUpgrade("ma", 223)) player.ma.objname = "[Hypothetical] Supraverse"
                if (hasUpgrade("ma", 223)) player.ma.objnum = new Decimal(6)
                if (hasUpgrade("ma", 223)) player.ma.shrinkgain = new Decimal(1500)
                if (hasUpgrade("ma", 223)) player.ma.objname = "Deep Space"
                if (hasUpgrade("ma", 223)) player.ma.objnum = new Decimal(7)
                if (hasUpgrade("ma", 223)) player.ma.shrinkgain = new Decimal(12000)
                if (player.ma.objnum.eq(1)) {
                    player.ma.univsize = new Decimal(1000)
                } else if (player.ma.objnum.eq(2)) {
                    player.ma.univsize = new Decimal(500000)
                } else if (player.ma.objnum.eq(3)) {
                    player.ma.univsize = new Decimal(1.795e15)
                } else if (player.ma.objnum.eq(4)) {
                    player.ma.univsize = new Decimal(9.460730472581e29) // 1 universe est. (1T ly)
                } else if (player.ma.objnum.eq(5)) {
                    player.ma.univsize = new Decimal(1e40)
                } else if (player.ma.objnum.eq(6)) {
                    player.ma.univsize = new Decimal(1e75)
                } else if (player.ma.objnum.eq(7)) {
                    player.ma.univsize = new Decimal(1e150)
                }
                player.ma.shrinkpts = player.ma.shrinkpts.add(player.ma.shrinkgain.mul(player.ma.shrinkmul))
                player.ma.shrinkobjs = player.ma.shrinkobjs.add(1)
            }
        }
    }
})