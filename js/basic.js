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
              if ((hasMilestone('rebirth', 2)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
            for(v=4;v<5;v++){ //columns
                if ((hasMilestone('rebirth', 4)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
              }
            for(v=1;v<5;v++){ //columns
                if ((hasMilestone('prestige', 2)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
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
            for(v=10;v<11;v++){ //columns
                if ((hasMilestone('sac', 65)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
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
            for(v=10;v<11;v++){ //columns
                if ((hasMilestone('sac', 65)) && hasUpgrade(this.layer, 105)) keptUpgrades.push(105)
            }
    
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
        if (hasMilestone("sac", 41)) keep.push("milestones");
        if (hasMilestone("rebirth", 9)) keep.push("milestones");
        if (hasMilestone("era", 3)) keep.push("upgrades");
        if (hasMilestone("era", 3)) keep.push("milestones");
    
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
            cost: new Decimal(3),
            main() {
                expu2 = 0.35
                if (hasUpgrade("basic", 62)) expu2 = 0.3575
                if (hasMilestone("rebirth", 13)) expu2 = 0.365
                if (hasUpgrade("era", 103)) expu2 = 0.365
                softcapDescription12 = ""
                sdsc = ""
                scpow = 0.5
                sppow = 0.4
                upgEffect12 = upgradeEffect(this.layer, this.id)
                if (upgEffect12.gte(new Decimal("e50000000")) ) {
                    softcapDescription12 = " (Softcapped)"
                    sdsc = ". Softcaps ^" + scpow + " at e50M"
                }
                if (upgEffect12.gte(new Decimal("e1.25e12")) ) {
                    softcapDescription12 = " (Supercapped)"
                    sdsc = sdsc + ", Supercaps ^" + sppow + " at e1.25e12"
                }
            },
            effect() {
                let eff = player[this.layer].points.add(1).pow(expu2)
                eff = softcap(eff, new Decimal("1e50000000"), scpow)
                eff = softcap(eff, new Decimal("e1.25e12"), sppow)
                return eff
            },
            tooltip() {
                return "Formula: Basic Points^"  + expu2 + sdsc
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescription12
            },
            unlocked() { return hasUpgrade("basic", 11) },

        },
        13: {
            title: "Boosting II",
            description: "Point Fragments boost basic points.",
            cost: new Decimal(10),
            main() {
                expu3 = 0.16
                if (hasMilestone("rebirth", 13)) expu3 = 0.161616
                softcapDescription13 = ""
                sdsc = ""
                scpow = 0.5
                sppow = 0.3
                upgEffect13 = upgradeEffect(this.layer, this.id)
                if (upgEffect13.gte(new Decimal("e5e6")) ) {
                    softcapDescription13 = " (Softcapped)"
                    sdsc = ". Softcaps ^" + scpow + " at e5M"
                }
                if (upgEffect13.gte(new Decimal("e25e6")) ) {
                    softcapDescription13 = " (Supercapped)"
                    sdsc = sdsc + ", Supercaps ^" + sppow + " at e25e6"
                }
            },
            effect() {
                let eff = player.points.add(1).pow(expu3)
                eff = softcap(eff, new Decimal("1e5000000"), scpow)
                eff = softcap(eff, new Decimal("1e25000000"), sppow)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescription13
            },
            tooltip() {
                return "Formula: PF^"  + expu3 + sdsc
            },
            unlocked() { return hasUpgrade("basic", 12) },
        },
        14: {
            title: "Double Boost",
            description: "Boost basic points and point fragments by 1.35x.",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade("basic", 13) },
        },
        21: {
            title: "Compounding",
            description: "Basic Points boosts itself.",
            cost: new Decimal(50),
            main() {
                expu5 = 0.175
                if (inChallenge("sac", 12)) expu5 = 0.111
                if (hasUpgrade("era", 263)) expu5 = 0.275
                if (hasUpgrade("era", 135)) expu5 = 0.313
                if (hasUpgrade("era", 312)) expu5 = 0.388
                upgEffect21 = upgradeEffect(this.layer, this.id)
                softcapDescription21 = ""
                sdsc = ""
                scpow = 0.5
                sppow = 0.4
                if (upgEffect21.gte(new Decimal("e5e6")) ) {
                    softcapDescription21 = " (Softcapped)"
                    sdsc = ". Softcaps ^" + scpow + " at e5M"
                }
                if (upgEffect21.gte(new Decimal("e1e12")) ) {
                    softcapDescription21 = " (Supercapped)"
                    sdsc = sdsc + ", Supercaps ^" + sppow + " at e1e12"
                }
            },
            effect() {
                let eff = player.basic.points.add(1).pow(expu5)
                eff = softcap(eff, new Decimal("1e5000000"), scpow)
                eff = softcap(eff, new Decimal("e1e12"), sppow)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescription21
            },
            tooltip() {
                return "Formula: Basic Points^"  + expu5 + sdsc
            },
            unlocked() { return hasUpgrade("basic", 14) },
        },
        22: {
            title: "Doubling",
            description: "Point Fragments are doubled again!",
            cost: new Decimal(250),
            unlocked() { return hasUpgrade("basic", 21) },
        },
        23: {
            title: "A boost",
            description: "Basic Points are multiplied by 1.39",
            cost: new Decimal(600),
            unlocked() { return hasUpgrade("basic", 22) },
        },
        24: {
            title: "Compounding II",
            description: "Point Fragments boosts itself",
            cost: new Decimal(1000),
            main() {
                expu8 = 0.1625
                if (inChallenge("sac", 12)) expu8 = 0
                upgEffect24 = upgradeEffect(this.layer, this.id)
                softcapDescription24 = ""
                sdsc = ""
                scpow = 0.5
                sppow = 0.4
                hycpow = 0.5
                if (upgEffect24.gte(new Decimal("e40e6")) ) {
                    softcapDescription24 = " (Softcapped)"
                    sdsc = ". Softcaps ^" + scpow + " at e40M"
                }
                if (upgEffect24.gte(new Decimal("e200e6")) ) {
                    softcapDescription24 = " (Supercapped)"
                    sdsc = sdsc + ", Supercaps ^" + sppow + " at e200M"
                }
                if (upgEffect24.gte(new Decimal("e15e12")) ) {
                    softcapDescription24 = " (Hypercapped)"
                    sdsc = sdsc + ", Hypercaps ^" + hycpow + " at e15e12"
                }
            },
            effect() {
                let eff = player.points.add(1).pow(expu8)
                eff = softcap(eff, new Decimal("1e40000000"), 0.5)
                eff = softcap(eff, new Decimal("1e200000000"), 0.4)
                eff = softcap(eff, new Decimal("e15e12"), 0.5)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescription24
            },
            tooltip() {
                return "Formula: PF^"  + expu8 + sdsc
            },
            unlocked() { return hasUpgrade("basic", 23) },
        },
        31: {
            title: "Tripling!!",
            description: "Point fragments are TRIPLED!!",
            cost: new Decimal(2500),
            unlocked() { return hasUpgrade("basic", 24) },
        },
        32: {
            title: "Compounding III",
            description: "Point fragments boost itself, again, but less",
            cost: new Decimal(10000),
            main() {
                expu10 = 0.055
                if (hasUpgrade('rebirth', 31)) expu10 = 0.075
                if (hasUpgrade('prestige', 32)) expu10 = 0.09
                if (inChallenge("sac", 12)) expu10 = 0
                upgEffect32 = upgradeEffect(this.layer, this.id)
                softcapDescription32 = ""
                sdsc = ""
                scpow = 0.5
                if (hasUpgrade('m', 95)) scpow = 0.522
                sppow = 0.4
                if (upgEffect32.gte(new Decimal("e100e6")) ) {
                    softcapDescription32 = " (Softcapped)"
                    sdsc = ". Softcaps ^" + scpow + " at e100M"
                }
                if (upgEffect32.gte(new Decimal("e2.5e9")) ) {
                    softcapDescription32 = " (Supercapped)"
                    sdsc = sdsc + ", Supercaps ^" + sppow + " at e2.5e9"
                }
            },
            effect() {
                let eff = player.points.add(300000).pow(expu10)
                eff = softcap(eff, new Decimal("1e100000000"), scpow)
                eff = softcap(eff, new Decimal("1e2500000000"), 0.4)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescription32
            },
            tooltip() {
                return "Formula: PF^"  + expu10 + sdsc
            },
            unlocked() { return hasUpgrade("basic", 31) },
        },
        33: {
            title: "Another boost",
            description: "Point fragments are multiplied by 2.5",
            cost: new Decimal(28000),
            unlocked() { return hasUpgrade("basic", 32) },
        },
        34: {
            title: "Not bad a boost",
            description: "The final upgrade before the next reset layer: X5 POINT FRAGMENTS!!",
            cost: new Decimal(100000),
            unlocked() { return hasUpgrade("basic", 33) },
        },
        41: {
            title: "Tri-boost",
            description: "Rebirth Points x1.19, Basic Points x1.91, Point Fragments x9.11",
            cost: new Decimal(150e6),
            unlocked() { return hasMilestone("rebirth", 1) && hasUpgrade("basic", 34)},
        },
        42: {
            title: "Moar-Boost",
            description: "Rebirth Points x1.277, Point Fragments x7.77",
            cost: new Decimal(2e11),
            unlocked() { return hasUpgrade("basic", 41) },
        },
        43: {
            title: "EXPONENTS!",
            description: "Basic Points +^0.02, Point Fragments ^1.05",
            cost: new Decimal(4e13),
            unlocked() { return hasUpgrade("basic", 42) },
        },
        44: {
            title: "Tri-boost II",
            description: "Rebirth Points x2, Basic Points x4, Point Fragments x10",
            cost: new Decimal(1e21),
            unlocked() { return hasUpgrade("basic", 43) },
        },
        51: {
            title: "Big Boost",
            description: "Point Fragments x100",
            cost: new Decimal(5e70),
            unlocked() { return hasMilestone("rebirth", 6) && hasUpgrade("basic", 44)},
        },
        52: {
            title: "Tri-boost III",
            description: "PF X100, RP X2.5, BP X10",
            cost: new Decimal(1e75),
            unlocked() { return hasUpgrade("basic", 51) },
        },
        53: {
            title: "Exponent II",
            description: "PF X10K, BP +^0.02, RP +^0.005",
            cost: new Decimal(1e85),
            unlocked() { return hasUpgrade("basic", 52) },
        },
        54: {
            title: "MEGA INSANE UPGRADE",
            description: "PF X1K, PF^1.04, BP X100, BP+^0.02, RP X5, RP+^0.005",
            cost: new Decimal(1e105),
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
            main() {
                bb1exp = 0.006
                if (hasUpgrade('basic', 85)) bb1exp = 0.009
                if (hasUpgrade('era', 402)) bb1exp = 0.01
                upgEffect81 = upgradeEffect(this.layer, this.id)
                softcapDescription81 = ""
                sdsc = ""
                scpow = 0.5
                if (upgEffect81.gte(new Decimal("e2.5e12")) ) {
                    softcapDescription81 = " (Softcapped)"
                    sdsc = ". Softcaps ^" + scpow + " at e2.5e12"
                }
            },
            effect() {
                let eff = player.points.add(1).pow(bb1exp)
                eff = softcap(eff, new Decimal("e2.5e12"), scpow)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescription81
            },
            tooltip() {
                return "Formula: Basic Points ^"  + bb1exp + sdsc
            },
            unlocked() { return hasMilestone("sac", 25) && hasUpgrade("basic", 74) },
        },
        82: {
            title: "Basic Boost 2.",
            description: "Basic Points boosts Prestige Points, by very little",
            cost: new Decimal("e13842250"),
            main() {
                bb2exp = 0.0004
                if (hasUpgrade('basic', 85)) bb2exp = 0.0006
                if (hasUpgrade('era', 262)) bb2exp = 0.0007
                upgEffect82 = upgradeEffect(this.layer, this.id)
                softcapDescription82 = ""
                sdsc = ""
                scpow = 0.4
                if (upgEffect82.gte(new Decimal("e5e11")) ) {
                    softcapDescription82 = " (Softcapped)"
                    sdsc = ". Softcaps ^" + scpow + " at e5e11"
                }
            },
            effect() {
                let eff =  player.points.add(1).pow(bb2exp)
                eff = softcap(eff, new Decimal("e5e11"), scpow)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescription82
            },
            tooltip() {
                return "Formula: Basic Points ^"  + bb2exp + sdsc
            },
            unlocked() { return hasMilestone("sac", 25) && hasUpgrade("basic", 81) },
        },
        83: {
            title: "Basic Boost 3.",
            description: "Basic Points boosts Mega Points, by very very little",
            cost: new Decimal("e14019250"),
            main() {
                bb3exp = 0.0000175
                if (hasUpgrade('basic', 85)) bb3exp = 0.0000225
                if (hasUpgrade('m', 33)) bb3exp = 0.000036
                upgEffect83 = upgradeEffect(this.layer, this.id)
                softcapDescription83 = ""
                sdsc = ""
            },
            effect() {
                return player.points.add(1).pow(bb3exp)
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescription83
            },
            tooltip() {
                return "Formula: Basic Points ^"  + bb3exp + sdsc
            },
            unlocked() { return hasMilestone("sac", 25) && hasUpgrade("basic", 82) },
        },
        84: {
            title: "Basic Boost 4.",
            description: "Basic Points boosts Energy, by insanely little",
            cost: new Decimal("e14151000"),
            main() {
                bb4exp = 0.0000007
                if (hasUpgrade('basic', 85)) bb4exp = 0.00000088
                upgEffect84 = upgradeEffect(this.layer, this.id)
                softcapDescription84 = ""
                sdsc = ""
                scpow = 0.3
                if (upgEffect84.gte(new Decimal("e175")) ) {
                    softcapDescription84 = " (Softcapped)"
                    sdsc = ". Softcaps ^" + scpow + " at e175"
                }
            },
            effect() {
                let eff = player.points.add(1).pow(bb4exp)
                eff = softcap(eff, new Decimal("e175"), scpow)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescription84
            },
            tooltip() {
                return "Formula: Basic Points ^"  + bb4exp + sdsc
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
        101: {
            title: "5 Types of Upgrades. Type 1: Effect Boost/Reduce Softcap",
            description: "Mega Effect Boost increased from ^1 to ^3",
            cost: new Decimal("e37845e6"),
            unlocked() { return hasMilestone("sac", 61) && hasUpgrade("basic", 95) },
        },
        102: {
            title: "5 Types of Upgrades. Type 2: Currency boost Currency",
            description: "Basic Points boost Supreme Points",
            cost: new Decimal("e39155400e3"),
            main() {
                bb5exp = 0.0000000045
                upgEffect102 = upgradeEffect(this.layer, this.id)
                softcapDescription102 = ""
                sdsc = ""
            },
            effect() {
                let eff = player.points.add(1).pow(bb5exp)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescription102
            },
            tooltip() {
                return "Formula: Basic Points ^"  + bb5exp + sdsc
            },
            unlocked() { return hasMilestone("sac", 61) && hasUpgrade("basic", 101) },
        },
        103: {
            title: "5 Types of Upgrades. Type 3: Exponent on some currency",
            description: "+^0.05 PP, ^1.03 PF",
            cost: new Decimal("e46411100e3"),
            unlocked() { return hasMilestone("sac", 61) && hasUpgrade("basic", 102) },
        },
        104: {
            title: "5 Types of Upgrades. Type 4: Stronger Buyable Effect / Buyable Scaling is weaker",
            description: "All Supreme Buyable's effects are stronger.",
            cost: new Decimal("e53484400e3"),
            unlocked() { return hasMilestone("sac", 61) && hasUpgrade("basic", 103) },
        },
        105: {
            title: "5 Types of Upgrades. Type 5: Multiplying some currency",
            description: "xe1,000,000,000 PF!!",
            cost: new Decimal("e74309e6"),
            unlocked() { return hasMilestone("sac", 61) && hasUpgrade("basic", 104) },
        },
        111: {
            title: "Influx of Water",
            description: "Basic Points boosts Water",
            cost: new Decimal("e2.1969443645e16"),
            main() {
                bb6exp = 0.00000000045
                upgEffect111 = upgradeEffect(this.layer, this.id)
                softcapDescription111 = ""
                sdsc = ""
            },
            effect() {
                let eff = player.points.add(1).pow(bb6exp)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescription111
            },
            tooltip() {
                return "Formula: Basic Points ^"  + bb6exp + sdsc
            },
            unlocked() { return hasUpgrade("era", 231) && hasUpgrade("basic", 105) },
        },
        112: {
            title: "Quest to remove the hardcap",
            description: "SB5 HC +^0.0055",
            cost: new Decimal("e2.220597791e16"),
            unlocked() { return hasUpgrade("era", 231) && hasUpgrade("basic", 111) },
        },
        113: {
            title: "Mega-Energy ties, WITH A CATCH",
            description: "Energy effect is weaker, but EU24 is MUCH STRONGER",
            cost: new Decimal("e2.3431523695e16"),
            unlocked() { return hasUpgrade("era", 231) && hasUpgrade("basic", 112) },
        },
        114: {
            title: "Quantum Prestige Surge",
            description: "+^0.09 PP",
            cost: new Decimal("e2.71634918275e16"),
            unlocked() { return hasUpgrade("era", 231) && hasUpgrade("basic", 113) },
        },
        115: {
            title: "Hyperflux Enhancement!",
            description: "xe250T PF, x115 EC",
            cost: new Decimal("e3.351154668e16"),
            unlocked() { return hasUpgrade("era", 231) && hasUpgrade("basic", 114) },
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
            unlocked() {return player["sac"].points.gte(64) || hasMilestone("basic", 7)},
        },
        2: {
            requirementDescription: "Wait... A new currency? (BM2: e1,886,230,000 PF)",
            effectDescription: "^1.02 PF, xe20M PF",
            done() { return player.points.gte("e1886230000") },
            unlocked() {return player["sac"].points.gte(64) || hasMilestone("basic", 7)},
        },
        3: {
            requirementDescription: "Godly-Tier PF Mult (BM3: e2,282,415,000 PF)",
            effectDescription: "xe30M PF",
            done() { return player.points.gte("e2282415000") },
            unlocked() {return hasMilestone("basic", 2) || hasMilestone("basic", 7)},
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
        6: {
            requirementDescription: "That's a lot (Req e50B PF)",
            effectDescription: "xe250M PF",
            done() { return player.points.gte("e50e9") },
            unlocked() {return player["sac"].points.gte(132) || hasMilestone("basic", 7)},
        },
        7: {
            requirementDescription: "MC2S (Basic I) - e7,963,340,000 Basic Points",
            effectDescription: "xe250M PF, Sacrifice Scaling weaker, Basic Milestone 1-4 is visible.",
            done() {
                if (inChallenge("m", 12)) {
                    if (player["basic"].points.gte("e7963340000")) {
                        return true
                    }
                }
            },
            unlocked() {return inChallenge("m", 12)},
        },
        8: {
            requirementDescription: "That's too much (Req e250B BP)",
            effectDescription: "xe2B PF",
            done() { return player["basic"].points.gte("e250e9") },
            unlocked() {return player["sac"].points.gte(335)},
        },
        9: {
            requirementDescription: "Woah, a lot (Req e1e15 BP)",
            effectDescription: "xe25T PF",
            done() { return player["basic"].points.gte("e1e15") },
            unlocked() {return hasUpgrade("era", 161)},
        },
        10: {
            requirementDescription: "Woah, a lot 2 (Req e5e18 BP)",
            effectDescription: "xe1.6e16 PF",
            done() { return player["basic"].points.gte("e5e18") },
            unlocked() {return hasUpgrade("era", 35)},
        },
        11: {
            requirementDescription: "Woah, a lot 3 (Req e1.5e21 BP)",
            effectDescription: "xe4e18 PF",
            done() { return player["basic"].points.gte("e1.5e21") },
            unlocked() {return hasUpgrade("era", 462)},
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
        if (hasMilestone('rebirth', 5)) return 100
        if (hasMilestone('rebirth', 3)) return 1
        return 0
    },
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        if (layers.prestige.effect().gte(1)) mult = mult.times(layers.prestige.effect())
        if (layers.mega.effect().gte(1)) mult = mult.times(layers.mega.effect())
        if (hasUpgrade('basic', 13)) mult = mult.times(upgradeEffect('basic', 13))
        if (hasUpgrade('basic', 21)) mult = mult.times(upgradeEffect('basic', 21))
        if (hasAchievement('sa', 196)) mult = mult.times(100)
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
        if (hasUpgrade('m', 52)) mult = mult.times("e2e7")
        if (hasUpgrade('mega', 15)) mult = mult.times("e25e6")
        if (hasUpgrade('s', 111)) mult = mult.times("e100e9")
        if (hasUpgrade('era', 124)) mult = mult.times("e5e12")
        if (hasUpgrade('era', 171)) mult = mult.times("e50e12")
        if (hasUpgrade('era', 283)) mult = mult.times("e1.25e16")
        if (hasUpgrade('mega', 102)) mult = mult.times("e5e16")
        if (hasUpgrade('era', 303)) mult = mult.times("e7.1e17")
        if (hasMilestone('sac', 106)) mult = mult.times("e3.33e18")
        if (hasUpgrade('era', 373)) mult = mult.times("e8e18")
        if (hasUpgrade("rebirth", 92)) mult = mult.times("e1.9e19")
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
        if ((hasMilestone('sac', 21)) && inChallenge("m", 12)) exp = exp.add(0.1)
        if (hasUpgrade('rebirth', 25)) exp = exp.sub(0.03)
        if (hasMilestone('e', 12)) exp = exp.sub(0.1)
        if (hasAchievement("a", 134)) exp = exp.add(0.01)
        if (hasMilestone('sac', 38)) exp = exp.add(0.02)
        if (inChallenge('sac', 14)) exp = exp.mul(0.5)
        if (hasUpgrade('basic', 92)) exp = exp.add(0.025)
        if (hasMilestone('basic', 1)) exp = exp.add(0.025)
        if (hasUpgrade('rebirth', 73)) exp = exp.add(0.005)
        if (hasUpgrade('mega', 94)) exp = exp.add(0.005)
        if (hasUpgrade('era', 182)) exp = exp.add(0.055)
        if (hasUpgrade('era', 231)) exp = exp.add(0.025)
        if (hasUpgrade('prestige', 84)) exp = exp.sub(0.011)
        if (hasUpgrade('prestige', 85)) exp = exp.add(0.06)
        if ((hasUpgrade('m', 1131)) && inChallenge("m", 11)) exp = exp.add(0.05)
        if (hasUpgrade('m', 131)) exp = exp.add(0.0125)
        if (hasUpgrade('m', 132)) exp = exp.add(0.015)
        if (hasUpgrade("era", 434)) exp = exp.add(0.014)
        if (inChallenge('m', 11)) exp = exp.mul(0.2)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for basic points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})