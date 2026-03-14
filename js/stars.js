addLayer("s", {
    name: "Stars", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        clicks: new Decimal(0),
        cmult: new Decimal(1),
        cpc: new Decimal(1),
        nebbyauto: false,
    }},
    exponent() {
        let exp = 0.55
        if (hasUpgrade("g", 13)) exp = 0.5
        return exp
    }, // Prestige currency exponent
    color: "#d3af37",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "Stars", // Name of currency
    baseResource: "Sparks", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    tabFormat: {
        "Main tab (click to have the reset button)": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                ["display-text", function() {
                    return "Stars per sec: "+ notationChooser(getResetGain("s").div(Math.max(player.a.timeSinceLastReset, 0))) +"."
                }], 
                "blank",
                "milestones",
                "blank",
                "upgrades",
                "blank",
                "blank",
                ["infobox", "main"],
            ],
            unlocked() {return (!(hasMilestone("st", 4)))}
        },
        "Main tab (click to have no reset button)": {
            content: [
                "main-display",
                "blank",
                "milestones",
                "blank",
                "upgrades",
                "blank",
                "blank",
                ["infobox", "main"],
            ],
            unlocked() {return (hasMilestone("st", 4) && (!hasMilestone("st", 25)))}
        },
        "Main tab (click to have nett Stars display)": {
            content: [
                "main-display",
                "blank",
                ["display-text", function() {
                    return "nett Stars (before Star Tier 25+'s Reality Breaking): "+ notationChooser(player.s.points.pow(player.st.points.div(20).add(1.25).pow(player.st.points.max(24).sub(24)))) +"."
                }], 
                "blank",
                "milestones",
                "blank",
                "upgrades",
                "blank",
                "blank",
                ["infobox", "main"],
            ],
            unlocked() {return (hasMilestone("st", 25))}
        },
        "Increasers": {
            content: [
                "main-display",
                "blank",
                "blank",
                "buyables",
                "blank",
                ["infobox", "increaser"],
            ],
            unlocked() {return (hasMilestone("st", 4))}
        },
        "Clicks": {
            content: [
                ["display-text", function() {
                    return "<h2> You have "+ notationChooser(player.s.clicks) +" Presses. </h2>"
                }], 
                "blank",
                ["display-text", function() {
                    return "<h3> These Presses give boosts to all stats. x"+ notationChooser(player.s.cmult) +" Pre-Research Stats, and x"+ notationChooser(player.s.cmult.pow(0.5)) +" Research+ Stats </h3>. Presses can only be gotten via holding the button, not clicking it."
                }], 
                "blank",
                ["display-text", function() {
                    return "You gain x2 Presses at Progression Upgrades 30, 34, 37 and 39, x1.5 Presses at 150K Clicks, x2 at 2M, 200M, 2B and 10B and x3 at 30M. The mechanic is also not required for progression but will help."
                }], 
                "blank",
                "blank",
                ["clickable", 11],
            ],
            unlocked() {return (hasUpgrade("n", 12))}
        },
    },
    clickCalc() {
        let cpc = new Decimal(1)
        if (player.s.clicks.gte(1.5e5)) cpc = cpc.mul(1.5)
        if (player.s.clicks.gte(2e6)) cpc = cpc.mul(2)
        if (player.s.clicks.gte(3e7)) cpc = cpc.mul(3)
        if (player.s.clicks.gte(2e8)) cpc = cpc.mul(2)
        if (player.s.clicks.gte(2e9)) cpc = cpc.mul(2)
        if (player.s.clicks.gte(1e10)) cpc = cpc.mul(2)
        if (hasAchievement("a", 53)) cpc = cpc.mul(2)
        if (hasMilestone("st", 25)) cpc = cpc.mul(2)
        player.s.cpc = cpc
    },
    multCalc() {
        if (player.s.clicks.lt(5)) {
            player.s.cmult = new Decimal(1)
            return
        }
        let x = player.s.clicks.log10().sub(2)
        let ccalc = new Decimal(1).add(x.pow(2).mul(0.01)).add(x.pow(3).mul(0.0008)).add(0.01)
        if (ccalc.lt(1)) {
            player.s.cmult = new Decimal(1)
        } else {
            player.s.cmult = ccalc
        }
    },
    automate() {
		if (hasMilestone('st', 8)) {
			if (layers.s.buyables[11].canAfford()) {
				layers.s.buyables[11].buy();
			};
        }
        if (hasMilestone('st', 12)) {
            if (layers.s.buyables[12].canAfford()) {
				layers.s.buyables[12].buy();
			};
        }
        if (hasMilestone('st', 18)) {
            if (layers.s.buyables[13].canAfford()) {
				layers.s.buyables[13].buy();
			};
        }
        if (player.s.nebbyauto) {
            if (layers.s.buyables[14].canAfford()) {
				layers.s.buyables[14].buy();
			};
        }
    },
    clickables: {
        11: {
            title(){
                title = "Hold to gain presses!"
                return title
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
            canClick() {return true},
            onHold() {return player[this.layer].clicks =  player[this.layer].clicks.add(player[this.layer].cpc)}
        },
    },
    passiveGeneration() {
        if (hasMilestone("st", 5)) return 1
        if (hasMilestone("st", 4)) return 0.2
        if (hasUpgrade("n", 11)) return 0.01
        return 0
    },
    upgrades: {
        11: {
            title: "A spark of hope [01/40]",
            description: "Start generating 200 sparks per second",
            cost: new Decimal(1),
            unlocked() { return true }, 
        },
        12: {
            title: "Simple spark-tiplier [02/40]",
            description: "Double spark generation",
            cost: new Decimal(1),
            unlocked() { return hasUpgrade("s",11) }, 
        },
        13: {
            title: "Double boost [03/40]",
            description: "x1.5 Spark, and Star gain",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("s",12) }, 
        },
        14: {
            title: "Stellar Rush [04/40]",
            description: "Triple Star gain",
            cost: new Decimal(12),
            unlocked() { return hasUpgrade("s",13) }, 
        },
        15: {
            title: "Delayed boostage [05/40]",
            description: "Unlock a new layer! Increase sparks based on itself, starting from 1,000 sparks.",
            cost: new Decimal(40),
            effect() {
                sparksq = 0.14
                if (hasUpgrade("s", 24) && player.points.gt(25e6)) sparksq = 0.16
                if (hasUpgrade("n", 13)) sparksq = 0.175
                softcapDescriptionSp15 = ""
                sdsc = ""
                upgEffectSp15 = upgradeEffect(this.layer, this.id)
                let eff = player.points.add(1).pow(sparksq)
                if (player.points.lt(1000)) eff = new Decimal(1)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionSp15
            },
            tooltip() {
                return "Formula: (Sparks+1)^"  + sparksq + sdsc
            },
            unlocked() { return hasUpgrade("s",14) }, 
        },
        21: {
            title: "Another boost?? Already? [06/40]",
            description: "+60% Star gain, +06% Spark gain",
            cost: new Decimal(5),
            unlocked() { return (hasMilestone("st",1) && hasUpgrade("s",11)) }, 
        },
        22: {
            title: "Well, it's not that much before the last upgrade [07/40]",
            description: "+200% Sparks. This increases to +400% when the amount of stars exceeds 1,000.",
            cost: new Decimal(90),
            unlocked() { return (hasMilestone("st", 2) && hasUpgrade("s",21)) }, 
        },
        23: {
            title: "thats alot of reset grinding [09/40]",
            description: "Sparks boost Stars gain. At 50K,100K,200K,500K and 4M Stars, double Spark gain.",
            cost: new Decimal(22500),
            effect() {
                sparkstar = 0.094
                if (hasUpgrade("s", 31) && player.s.points.gte(250e9)) sparkstar = 0.11
                if (hasMilestone("st", 9) && player.points.gte(1e175)) sparkstar = 0.115
                softcapDescriptionSp23 = ""
                sdsc = ""
                upgEffectSp23 = upgradeEffect(this.layer, this.id)
                let eff = player.points.add(1).pow(sparkstar)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionSp23
            },
            tooltip() {
                return "Formula: (Sparks+1)^"  + sparkstar + sdsc
            },
            unlocked() { return (hasMilestone("st", 3) && hasUpgrade("s",22)) }, 
        },
        24: {
            title: "Why are upgrades getting so long? [10/40]",
            description: "x2.5 Stars, x2 Sparks. 'Delayed Boostage' is stronger after 25M Sparks (Sparks^0.14 -> Sparks^0.16).",
            cost: new Decimal(500000),
            unlocked() { return (hasMilestone("st",3) && hasUpgrade("s",23)) }, 
        },
        25: {
            title: "Well, every progression upgrade, which shows [xy/40],... [11/40]",
            description: "Stars boost its own gain.",
            cost: new Decimal(150e6),
            effect() {
                starstar = 0.11
                if (hasMilestone("st", 15)) starstar = 0.12
                softcapDescriptionSp25 = ""
                sdsc = ""
                let eff = player.points.add(1).pow(starstar)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionSp25
            },
            tooltip() {
                return "Formula: (Stars+1)^"  + sparkstar + sdsc
            },
            unlocked() { return (hasMilestone("st",4) && hasUpgrade("s",24)) }, 
        },
        31: {
            title: "increases the time to get the next... [12/40]",
            description: "x5 Stars. At 250B Stars, Sparks boost stars gain more (Sparks^0.094 -> Sparks^0.11). At 1T Stars, x5 Spark gain.",
            cost: new Decimal(30e9),
            unlocked() { return (hasMilestone("st",4) && hasUpgrade("s",25)) }, 
        },
        32: {
            title: "...the next progression upgrade by about... [16/40]",
            description: "x2 Galaxies and Stars. At 15Sx Sparks, x2 Sparks gain.",
            cost: new Decimal(150e15),
            unlocked() { return (hasMilestone("st",6) && hasUpgrade("s",31)) }, 
        },
        33: {
            title: "50%...",
            description: "Small bump of x5 Stars.",
            cost: new Decimal(5e84),
            unlocked() { return (hasMilestone("st",7) && hasUpgrade("s",32)) }, 
        },
        34: {
            title: " (whaaa?) [23/40]",
            description: "Galaxy Up. 13 is stronger.",
            cost: new Decimal("4e474"),
            unlocked() { return (hasMilestone("st",12) && hasUpgrade("s",33)) }, 
        },
        35: {
            title: " [sigh] i guess thats why this upgrade takes 1.46 days from [25/40]... [26/40]",
            description: "The effect of Star Tier 16 is stronger. Increase the effect further at e670 Galaxies (Nebulae^0.1 -> Nebulae^0.225 -> Nebulae^0.25), and at 200Sx Nebulae unlock a new effect (Nebulae boost Sparks (direct multiplier)).",
            cost: new Decimal("e3150"),
            unlocked() { return (hasMilestone("st",17) && hasUpgrade("s",34)) }, 
        },
        41: {
            title: "Back to the increasers! [28/40]",
            description: "Unlock the fourth increaser, the 'Nebula Increaser'. The price scaling of the Galaxy Increaser is lower (x10,000 -> x2,500 cost/buy).",
            cost: new Decimal("e27140"),
            unlocked() { return (hasMilestone("st",19) && hasUpgrade("s",35)) }, 
        },
        42: {
            title: "n-2.1632a",
            description: "Nebulae gains a new effect! Decrease star tier scaling based on nebulae.",
            cost: new Decimal("e45000"),
            unlocked() { return (hasMilestone("st",19) && hasUpgrade("s",41)) }, 
        },
        43: {
            title: "n-2.3481c",
            description: "Nebulae gains a new effect! Nebulae boosts itself...",
            cost: new Decimal("e476547"),
            effect() {
                nebulae2 = 0.02
                if (hasUpgrade("st", 45) && player.st.research.gte(7.3e93)) nebulae2 = 0.03
                softcapDescriptionSp43 = ""
                sdsc = ""
                let eff = player.n.points.add(1).pow(nebulae2)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionSp43
            },
            tooltip() {
                return "Formula: (Nebulae+1)^"  + softcapDescriptionSp43 + sdsc
            },
            unlocked() { return (hasMilestone("st",19) && hasUpgrade("s",42)) }, 
        },
        44: {
            title: "r-2.708d",
            description: "x27.08 Research and xe2708 Stars. At 2.09e2,090,209 Stars, Nebula Increasers boost Nebulae by 1.209x per buy.",
            cost: new Decimal("e1826500"),
            unlocked() { return (hasMilestone("st",26) && hasUpgrade("s",43)) }, 
        },
    },
    buyables: {
        11: {
            title: "Buy Spark Increaser",
            unlocked() { return (hasMilestone('st', 5)) },
            cost(x) {
                return new Decimal(100e12).mul(Decimal.pow(5, x)).floor()
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Stars. <br>"
                if (this.extra().gte(1)) {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " + " + notationChooser(this.extra()) + " Spark Increasers."
                } else {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Spark Increasers."
                }
                dis = dis + " Spark Increasers multiply Spark generation by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.s.points.gte(this.cost())
            },
            buy() {
                if (!hasUpgrade("n", 11) && player.s.points.sub(this.cost()).gte(1)) player.s.points = player.s.points.sub(this.cost())
                if (hasUpgrade("n", 11)) {
                    setBuyableAmount(this.layer, this.id, player.s.points.div(100e12).log(5).add(1).floor())
                } else {
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                }
            },
            extra(){
                let extra = new Decimal(0)
                if (getBuyableAmount(this.layer, 14).gte(0)) extra = extra.add(getBuyableAmount(this.layer, 14).mul(2))
                return extra
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                bas = new Decimal(2)
                if (hasUpgrade("g", 12)) bas = new Decimal(2.2)
                if (hasUpgrade("g", 21)) bas = new Decimal(2.25)
                return bas.pow(x)
            },
            tooltip() {
                return "Cost Formula: 100T x 5^Amt (x" + bas + " Stars/buy)"
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
        12: {
            title: "Buy Star Increaser",
            unlocked() { return (hasUpgrade('g', 12)) },
            cost(x) {
                return new Decimal(20e15).mul(Decimal.pow(7, x)).floor()
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Stars. <br>"
                if (this.extra().gte(1)) {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " + " + notationChooser(this.extra()) + " Star Increasers."
                } else {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Star Increasers."
                }
                dis = dis + " Star Increasers multiply Star generation by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.s.points.gte(this.cost())
            },
            buy() {
                if (!hasUpgrade("n", 11) && player.s.points.sub(this.cost()).gte(1)) player.s.points = player.s.points.sub(this.cost())
                if (hasUpgrade("n", 11)) {
                    setBuyableAmount(this.layer, this.id, player.s.points.div(20e15).log(7).add(1).floor())
                } else {
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                }
            },
            extra(){
                let extra = new Decimal(0)
                if (getBuyableAmount(this.layer, 14).gte(0)) extra = extra.add(getBuyableAmount(this.layer, 14).mul(2))
                return extra
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                bas = new Decimal(1.7)
                return bas.pow(x)
            },
            tooltip() {
                return "Cost Formula: 20Qa x 7^Amt (x" + bas + " Stars/buy)"
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
        13: {
            title: "Buy Galaxy Increaser",
            unlocked() { return (hasMilestone('st', 9)) },
            cost(x) {
                let cinc = new Decimal(1e5)
                if (hasUpgrade("s", 41)) cinc = new Decimal(2.5e4)
                return new Decimal(1e155).mul(Decimal.pow(cinc, x)).floor()
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Stars. <br>"
                if (this.extra().gte(1)) {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " + " + notationChooser(this.extra()) + " Galaxy Increasers."
                } else {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Galaxy Increasers."
                }
                dis = dis + " Galaxy Increasers multiply Galaxies by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.s.points.gte(this.cost())
            },
            buy() {
                let cinc = new Decimal(1e5)
                if (hasUpgrade("s", 41)) cinc = new Decimal(2.5e4)
                if (!hasUpgrade("n", 11) && player.s.points.sub(this.cost()).gte(1)) player.s.points = player.s.points.sub(this.cost())
                if (hasUpgrade("n", 11)) {
                    setBuyableAmount(this.layer, this.id, player.s.points.div(1e155).log(cinc).add(1).floor())
                } else {
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                }
            },
            extra(){
                let extra = new Decimal(0)
                if (getBuyableAmount("st", 11).gte(78)) extra = extra = extra.add(getBuyableAmount("st", 11).mul(5))
                return extra
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                bas = new Decimal(1.4)
                return bas.pow(x)
            },
            tooltip() {
                let cinc = new Decimal(1e5)
                if (hasUpgrade("s", 41)) cinc = new Decimal(2.5e4)
                return "Cost Formula: e155 x "+cinc+"^Amt (x" + bas + " Stars/buy)"
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
        14: {
            title: "Buy Nebula Increaser",
            unlocked() { return (hasUpgrade('s', 41)) },
            cost(x) {
                return new Decimal("e25000").mul(Decimal.pow(1e120, x)).floor()
            },
            display() {
                let dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Stars. <br>"
                if (this.extra().gte(1)) {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " + " + notationChooser(this.extra()) + " Nebula Increasers."
                } else {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Nebula Increasers."
                }
                dis = dis + " Nebula Increasers multiply Nebulae by " + notationChooser(buyableEffect(this.layer, this.id)) + " and add " + notationChooser(getBuyableAmount(this.layer, this.id).mul(2)) +" Spark and Star Increasers."
                return dis
            },
            canAfford() {
                return player.s.points.gte(this.cost())
            },
            buy() {
                if (player.s.points.sub(this.cost()).gte(1)) player.s.points = player.s.points.sub(this.cost())
                if (hasUpgrade("n", 14)) {
                    setBuyableAmount(this.layer, this.id, player.s.points.div("e25000").log(1e120).add(1).floor())
                } else {
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                }
            },
            extra(){
                let extra = new Decimal(0)
                if (getBuyableAmount("st", 11).gte(78)) extra = extra = extra.add(getBuyableAmount("st", 11).mul(5))
                return extra
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                bas = new Decimal(1.000025)
                if (hasUpgrade("s", 44) && player.s.points.gte("2.09e2090209")) bas = new Decimal(1.209)
                return bas.pow(x)
            },
            tooltip() {
                return "Cost Formula: e25K x e120^Amt (x" + bas + " Stars/buy)"
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
        },
    },
    doReset(s) {
        player.a.lrstars = player.s.points
        player.a.timestars = player.timePlayed
        // Stage 1: Prevent resetting if the layer is too high
        if (layers[s].row <= this.row) return;
    
        // Stage 2: Track which specific subfeatures to keep (e.g., upgrades)
        let keptUpgrades = [];
        for(i=1;i<6;i++){ //rows
            let cutoff = 3
            for(v=1;v<cutoff;v++){ //columns
              if ((hasMilestone('st', 7)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
        }
        let keep = ["clicks"];
    
        // Stage 4: Perform the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5: Add back the specific subfeatures saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },    
    infoboxes: {
        main: {
            title: "Welcome to Stellar Evolution!",
            body() { return "In this game, there are 40 progression upgrades/milestones, indicated by [xy/40] after the milestone, and 4 layers. Base currency: Sparks. Sparks are used to get Stars, which is the first reset layer. In the Stars layer, unlock 5 upgrades to unlock the next layer." },
        },
        increaser: {
            title: "The Increasers",
            body() { return "Increasers boost said currency, and can be bought more than once." },
        },
    },
    gainMult() { // Energy
        let gain = new Decimal(1)
        if (hasUpgrade("s", 13)) gain = gain.times(1.5)
        if (hasUpgrade("s", 21)) gain = gain.times(1.6)
        if (hasUpgrade("s", 14)) gain = gain.times(3)
        if (hasUpgrade("s", 24)) gain = gain.times(2.5)
        if (hasUpgrade("s", 31)) gain = gain.times(5)
        if (hasUpgrade("s", 32)) gain = gain.times(2)
	    if (hasMilestone("st", 8)) gain = gain.times(8)
        gain = gain.times(player.s.cmult)
	    if (hasMilestone("st", 10)) gain = gain.times(10)
	    if (hasUpgrade("st", 21)) gain = gain.times("1e2000")
	    if (hasUpgrade("s", 44)) gain = gain.times("e2708")
	    if (hasMilestone("st", 13)) gain = gain.times(13333)
        if (hasUpgrade("s", 33)) gain = gain.times(5)
        if (hasUpgrade("s", 23)) gain = gain.times(upgradeEffect("s", 23))
        if (hasMilestone("st", 4)) {
            gain = gain.times(player.st.points.pow(2).mul(0.25).add(1))
        } else if (hasMilestone("st", 2)) {
            gain = gain.times(player.st.points.mul(0.25).add(1))
        } else {
            gain = gain.times(1)
        }
        if (hasUpgrade("g", 12)) {
            if (player.s.points.gt(5e8)) gain = gain.mul(1.5)
            if (player.s.points.gt(25e9)) gain = gain.mul(1.5)
            if (player.s.points.gt(25e15)) gain = gain.mul(1.5)
        }
	    if (hasUpgrade("n", 11)) gain = gain.times(100)
        let n = 1
        if (player.n.points.gte(2.5e91)) n = 0.5
        if (hasUpgrade("n", 13)) gain = gain.div(Decimal.min(player.s.points.add("e1500").div("e1500").pow(0.01).pow(n), new Decimal(1e120)))
        if (player.points.gte(1e59) && hasUpgrade("g", 13)) gain = gain.mul(3)
        if (hasMilestone("st", 23)) gain = gain.mul("e1000")
        if (layers.g.effect().gte(1)) gain = gain.times(layers.g.effect())
		gain = gain.times(buyableEffect("s", 12))
        if (hasMilestone("st", 6)) gain = gain.times(Decimal.max(Decimal.log2(player.st.points), new Decimal(1)))
        return gain
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade("n", 13) && player.n.points.gte(5e97)) exp = exp.add(0.01)
        if (player.n.points.gte(new Decimal(2).pow(1024))) exp = exp.add(0.01)
        if (hasUpgrade("st", 54)) {
            if (options.theme === 'sky') exp = exp.add(0.005)
        }
        if (hasMilestone("st", 21)) exp = exp.mul(1.01)
        let st25n = 0.98
        if (hasUpgrade("st", 44)) st25n = 0.984
        if (hasMilestone("st", 25)) exp = exp.mul(new Decimal(st25n).pow(player.st.points.sub(24)))
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for Stars", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    update(diff) {
        player.a.timeSinceLastReset = player.timePlayed - player.a.timestars
        player.a.csps = getResetGain("s").div(Math.max(player.a.timeSinceLastReset, 0.01))
    },
    glowColor() {
        let layer = 's'
        for (id in tmp[layer].upgrades){
            if (isPlainObject(layers[layer].upgrades[id])){
                if (canAffordUpgrade(layer, id) && !hasUpgrade(layer, id) && tmp[layer].upgrades[id].unlocked){
                    return "red"
                }
            }
        }
        for(i=11;i<15;i++){ 
            if (canBuyBuyable(layer, i)) {
                return "blue"
            }
        }
    }
})