addLayer("s", {
    name: "Stars", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
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
        "Main tab": {
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
        "Main tab.": {
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
            unlocked() {return (hasMilestone("st", 4))}
        },
        "Increasers": {
            content: [
                "main-display",
                "blank",
                ["display-text", function() {
                    return "Stars per sec: "+ notationChooser(getResetGain("s").div(5)) +"."
                }], 
                "blank",
                "buyables",
                "blank",
                ["infobox", "increaser"],
            ],
            unlocked() {return (hasMilestone("st", 4))}
        },
    },
    automate() {
		if (hasMilestone('st', 8)) {
			if (layers.s.buyables[11].canAfford()) {
				layers.s.buyables[11].buy();
			};
        }
        if (hasMilestone('st', 9)) {
            if (layers.s.buyables[12].canAfford()) {
				layers.s.buyables[12].buy();
			};
        }
    },
    passiveGeneration() {
        if (hasMilestone("st", 5)) return 1
        if (hasMilestone("st", 4)) return 0.2
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
            description: "x2.5 Stars, x2 Sparks. 'Delayed Boostage' is stronger after 25M Sparks.",
            cost: new Decimal(500000),
            unlocked() { return (hasMilestone("st",3) && hasUpgrade("s",23)) }, 
        },
        25: {
            title: "Well, every progression upgrade, which shows [xy/40],... [11/40]",
            description: "Stars boost its own gain.",
            cost: new Decimal(150e6),
            effect() {
                starstar = 0.11
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
            description: "x5 Stars. At 250B Stars, Sparks boost stars gain more. At 1T Stars, x5 Spark gain.",
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
                let cost = new Decimal(1)
                player.s.points = player.s.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            extra(){
                let extra = new Decimal(0)
                return extra
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                let bas = new Decimal(2)
                if (hasUpgrade("g", 12)) bas = new Decimal(2.2)
                return bas.pow(x)
            },
            tooltip() {
                return "Cost Formula: 100T x 5^Amt"
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
                let cost = new Decimal(1)
                player.s.points = player.s.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            extra(){
                let extra = new Decimal(0)
                return extra
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                let bas = new Decimal(1.7)
                return bas.pow(x)
            },
            tooltip() {
                return "Cost Formula: 20Qa x 7^Amt"
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
                return new Decimal(1e155).mul(Decimal.pow(1e5, x)).floor()
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
                let cost = new Decimal(1)
                player.s.points = player.s.points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            extra(){
                let extra = new Decimal(0)
                return extra
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                let bas = new Decimal(1.4)
                return bas.pow(x)
            },
            tooltip() {
                return "Cost Formula: e155 x e5^Amt"
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
        let keep = [];
    
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
	    if (hasMilestone("st", 10)) gain = gain.times(10)
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
        if (player.points.gte(1e59) && hasUpgrade("g", 13)) gain = gain.mul(3)
        if (layers.g.effect().gte(1)) gain = gain.times(layers.g.effect())
		gain = gain.times(buyableEffect("s", 12))
        if (hasMilestone("st", 6)) gain = gain.times(Decimal.max(Decimal.log2(player.st.points), new Decimal(1)))
        return gain
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for Stars", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    update(diff) {
        player.a.timeSinceLastReset = player.timePlayed - player.a.timestars
        player.a.csps = getResetGain("s").div(Math.max(player.a.timeSinceLastReset, 0))
    }
})