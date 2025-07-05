addLayer("c", {
    name: "Cells", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
        replicateTime: new Decimal(15),
        preRT: new Decimal(15),
        nextReplicateSecs: new Decimal(15),
        baseMultiplier: new Decimal(2),
        preBM: new Decimal(2),
        multiplier: new Decimal(2),
        scscale: new Decimal(1.4),
        softcapStart: new Decimal(1000),
    }},
    layerShown(){
        let visible = false
        if (player.sac.points.gte(695000)) visible = true
       return visible
    },
    update(diff) {
        // increasing values
        player.c.replicateTime = new Decimal(15),
        player.c.preRT = new Decimal(15),
        player.c.baseMultiplier = new Decimal(2),
        player.c.preBM = new Decimal(2),
        player.c.multiplier = new Decimal(2),
        player.c.softcapStart = new Decimal(1000),

        // reset time
        player.c.preRT = player.c.preRT.div(buyableEffect('c', 11))
        if(hasUpgrade("c", 13)) player.c.preRT = player.c.preRT.div(1.25)
        if(hasMilestone("sac", 112)) player.c.preRT = player.c.preRT.div(1.5)
        if(hasUpgrade("c", 22)) player.c.preRT = player.c.preRT.div(1.3)
        if(hasUpgrade("c", 24)) player.c.preRT = player.c.preRT.div(1.2)
        if(hasUpgrade("c", 32)) player.c.preRT = player.c.preRT.div(1.1)
        if(hasUpgrade("c", 34)) player.c.preRT = player.c.preRT.div(1.2)

        // base mult
        if (hasAchievement('sa', 35)) player.c.preBM = player.c.preBM.mul(1.01)
        if (hasAchievement('sa', 36)) player.c.preBM = player.c.preBM.mul(1.04)
        if(hasUpgrade("c", 11)) player.c.preBM = player.c.preBM.mul(1.5)
        player.c.preBM = player.c.preBM.mul(buyableEffect('c', 12))
        if(hasMilestone("sac", 112)) player.c.preBM = player.c.preBM.mul(3)
        if(hasUpgrade("c", 21)) player.c.preBM = player.c.preBM.mul(1.25)
        if(hasUpgrade("c", 24)) player.c.preBM = player.c.preBM.mul(1.15)
        if(hasUpgrade("c", 33)) player.c.preBM = player.c.preBM.mul(1.3)
        if(hasUpgrade("c", 34)) player.c.preBM = player.c.preBM.mul(1.1)
        if(hasUpgrade("c", 41)) player.c.preBM = player.c.preBM.mul(2)
        if (hasAchievement("a", 263)) player.c.preBM = player.c.preBM.mul(1.5)
        if(hasUpgrade("c", 43)) player.c.preBM = player.c.preBM.mul(1.5)
        if(hasUpgrade("c", 52)) player.c.preBM = player.c.preBM.mul(2)
        if (hasUpgrade("w", 93)) player.c.preBM = player.c.preBM.mul(4)

        // softcap decrease
        if(hasUpgrade("c", 12)) player.c.scscale = new Decimal(1.3)
        if(hasUpgrade("c", 21)) player.c.scscale = new Decimal(1.25)
        if(hasUpgrade("c", 24)) player.c.scscale = new Decimal(1.22)
        if (hasMilestone("c", 1)) player.c.scscale = new Decimal(1.19)
        if(hasUpgrade("c", 34)) player.c.scscale = new Decimal(1.17)
        if (hasMilestone("c", 2)) player.c.scscale = new Decimal(1.15)
        if (hasMilestone("c", 3)) player.c.scscale = new Decimal(1.14)
        
        // delayed softcap start
        if (hasUpgrade("c", 31)) player.c.softcapStart = new Decimal(5000)
        if (hasAchievement("a", 262)) player.c.softcapStart = new Decimal(11111)
        if (hasUpgrade("c", 34)) player.c.softcapStart = new Decimal(20000)
        if (hasUpgrade("c", 42)) player.c.softcapStart = new Decimal(100000)
        if (hasUpgrade("c", 43)) player.c.softcapStart = new Decimal(250000)
        if(hasMilestone("sac", 113)) player.c.softcapStart = new Decimal(2500000)
        if (hasMilestone("c", 4)) player.c.softcapStart = new Decimal(80e6)
        if (buyableEffect('c', 13).gte(1)) player.c.softcapStart = player.c.softcapStart.mul(buyableEffect('c', 13))
        if (hasMilestone("c", 5)) player.c.softcapStart = player.c.softcapStart.mul(player.sac.points.pow(0.5))

        // init
        player.c.replicateTime = player.c.preRT
        player.c.baseMultiplier = player.c.preBM

        if (player.c.points.lte(1)) {
            player.c.points = new Decimal(1)
        }


        // main code
        if (player.sac.points.gte(695000)) {
            player.c.nextReplicateSecs = player.c.nextReplicateSecs.sub(diff)
            if (player.c.nextReplicateSecs.gt(player.c.replicateTime)) player.c.nextReplicateSecs = player.c.replicateTime
            if (player.c.nextReplicateSecs.lt(0)) {
                player.c.nextReplicateSecs = player.c.replicateTime
                player.c.currentReplicateInterval = player.c.replicateTime
                if (player.c.points.gte(1000)) {
                    player.c.multiplier = (player.c.baseMultiplier.div(player.c.scscale.pow((player.c.points.div(player.c.softcapStart)).log2()).mul(10))).add(1)
                } else {
                    player.c.multiplier = player.c.baseMultiplier
                }
                player.c.points = player.c.points.mul(player.c.multiplier)
            }
        }
    },
    tabFormat: {
        "Main tab": {
            content: [
                "main-display",
                "blank",
                ["bar", "replicate"],
                "blank",
                ["display-text", "This layer requires some form of strategy."],
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `Base Multiplier: 
                            ${notationChooser(player.c.baseMultiplier)}</span></h2>`
                        return a
                    }
                ],
                ["display-text",
                    function(){
                        let a = ""
                        if (player.c.points.gte(1000)) { 
                                a = a + `Multiplier after softcap: 
                                ${notationChooser((player.c.baseMultiplier.div(player.c.scscale.pow((player.c.points.div(player.c.softcapStart)).log2()).mul(10))).add(1))}</span></h2>`
                        }
                        return a
                    }
                ],
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `Softcap starts at 
                            ${notationChooser(player.c.softcapStart)} cells</span></h2>`
                        return a
                    }
                ],
                "blank",
                "blank",
                "upgrades",
            ],
        },
        "Cell Milestones": {
            content: [
                "main-display",
                "blank",
                ["bar", "replicate"],
                "blank",
                "blank",
                "blank",
                "milestones",
            ],
            unlocked() {return hasAchievement("a", 262)},
        },
        "Cell Buyables": {
            content: [
                "main-display",
                "blank",
                ["bar", "replicate"],
                "blank",
                "blank",
                "blank",
                "buyables",
            ],
        },
    },
    milestones: {
        1: {
            requirementDescription: "Cell Milestone 1 (1.25e12 Cells: Tier 1)",
            effectDescription: "Unlock Cell Buyable 3, and reduce cell softcap",
            done() { return player.c.points.gte(new Decimal(1.25e12)) },
        },
        2: {
            requirementDescription: "Cell Milestone 2 (6e16 Cells: Tier 1.1)",
            effectDescription: "Reduce cell softcap",
            unlocked() { return hasMilestone("c", 1)},
            done() { return player.c.points.gte(new Decimal(6e16)) },
        },
        3: {
            requirementDescription: "Cell Milestone 3 (5e25 Cells: Tier 1.25)",
            effectDescription: "Reduce cell softcap",
            unlocked() { return hasMilestone("c", 2)},
            done() { return player.c.points.gte(new Decimal(5e25)) },
        },
        4: {
            requirementDescription: "Cell Milestone 4 (3.2e32 Cells: Tier 1.33)",
            effectDescription: "Cell softcap starts 32x later",
            unlocked() { return hasMilestone("c", 3)},
            done() { return player.c.points.gte(new Decimal(3.2e32)) },
        },
        5: {
            requirementDescription: "Cell Milestone 5 (1e42 Cells: Tier 1.4)",
            effectDescription: "Cell softcap starts (Sac^0.5)x later",
            unlocked() { return hasMilestone("c", 4)},
            done() { return player.c.points.gte(new Decimal(1e42)) },
        },
    },
    upgrades: {
        11: {
            title: "Cytoplasm",
            description: "Increase base multiplier by 1.5.",
            cost: new Decimal(1600),
            unlocked() { return true },
        },
        12: {
            title: "Plasma Membrane",
            description: "Decrease softcap scaling",
            cost: new Decimal(3000),
            unlocked() { return (hasUpgrade("c", 11)) },
        },
        13: {
            title: "Ribosome",
            description: "SPEEEED: /1.25 replicate speed",
            cost: new Decimal(7000),
            unlocked() { return (hasUpgrade("c", 12)) },
        },
        14: {
            title: "Mitochondria",
            description: "Back to main: Extend Era Upgrades. x5,000 EC",
            cost: new Decimal(15000),
            unlocked() { return (hasUpgrade("c", 13)) },
        },
        21: {
            title: "Endoplasmic Reticulum",
            description: "Slightly decrease softcap scaling, and increase base multiplier",
            cost: new Decimal(5000000),
            unlocked() { return (hasMilestone("sac", 112)) },
        },
        22: {
            title: "Centrosome",
            description: "Sonic Cell: /1.3 replicate speed",
            cost: new Decimal(12500000),
            unlocked() { return (hasUpgrade("c", 21)) },
        },
        23: {
            title: "Golgi Apparatus",
            description: "Cell Buyable 2's effect is stronger and scaling is weaker",
            cost: new Decimal(30000000),
            unlocked() { return (hasUpgrade("c", 22)) },
        },
        24: {
            title: "Nucleus",
            description: "Less softcap scaling, less replicate speed, more base multiplier",
            cost: new Decimal(100000000),
            unlocked() { return (hasUpgrade("c", 23)) },
        },
        31: {
            title: "Vacuole",
            description: "Softcap starts x5 later",
            cost: new Decimal(700000000),
            unlocked() { return (hasUpgrade("c", 24)) },
        },
        32: {
            title: "Spindle Fiber",
            description: "/1.1 cell replication speed, Cell buyable 1's effect is stronger",
            cost: new Decimal(5e9),
            unlocked() { return (hasUpgrade("c", 31)) },
        },
        33: {
            title: "ATP Synthesis",
            description: "x1.3 Cell Base Multiplier",
            cost: new Decimal(1.5e11),
            unlocked() { return (hasUpgrade("c", 32)) },
        },
        34: {
            title: "Metabolic Cascade",
            description: "Less softcap scaling, less replicate speed, more base multiplier, delayed softcap start",
            cost: new Decimal(1e13),
            unlocked() { return (hasUpgrade("c", 33)) },
        },
        41: {
            title: "Metabolic SURGE",
            description: "x2 Cell Base Multiplier",
            cost: new Decimal(4.1e14),
            unlocked() { return (hasUpgrade("c", 34)) },
        },
        42: {
            title: "Improved Vacuole",
            description: "Softcap starts x5 later again",
            cost: new Decimal(2e18),
            unlocked() { return (hasUpgrade("c", 41)) },
        },
        43: {
            title: "Overclocked Nucleus",
            description: "x1.5 Cell Base Multiplier, Softcap starts x2.5 later",
            cost: new Decimal(4e21),
            unlocked() { return (hasUpgrade("c", 42)) },
        },
        44: {
            title: "Budgeted Expression",
            description: "Reduce the scaling of Cell Buyables 2,3 and Era Buyable 3",
            cost: new Decimal(3e23),
            unlocked() { return (hasUpgrade("c", 43)) },
        },
        51: {
            title: "Expression Amplifier",
            description: "Increase the effect of Cell Buyable 3",
            cost: new Decimal(1e27),
            unlocked() { return (hasUpgrade("c", 44)) },
        },
        52: {
            title: "Cellular Mastery",
            description: "x2 Cell Base Multiplier",
            cost: new Decimal(5e28),
            unlocked() { return (hasUpgrade("c", 51)) },
        },
        53: {
            title: "Expression Amplifier 2",
            description: "Increase the effect of Cell Buyable 2 and Mega Buyable 2",
            cost: new Decimal(3.03e30),
            unlocked() { return (hasUpgrade("c", 52)) },
        },
        54: {
            title: "Metabolic Hyper-Surge",
            description: "Cells boost Era Crystals, Reduced Sacrifice Scaling, very slightly reduce Era Buyable 6 scaling and increase its effect",
            cost: new Decimal(3.33e33),
            effect() {
                if (hasUpgrade("w", 93)) {
                    return player.c.points.log(5)
                } else {
                    return player.c.points.log(9)
                }
            },
            effectDisplay() {
                let upgEffect = upgradeEffect(this.layer, this.id)
                return "This upgrade multiplies Era Crystals by x" + notationChooser(upgEffect)+"."
            },
            tooltip() {
                return "Formula: log_9(Cells)"
            },
            unlocked() { return (hasUpgrade("c", 53)) },
        },
    },
    buyables: {
        11: {
            title: "Cell Buyable 1: Replicate! [Max replicate speed is 1/30 seconds]",
            cost(x) {
                exp2 = 1.14
                return new Decimal(50).mul(Decimal.pow(1.14, (x+1))).mul(Decimal.pow((x+1) , Decimal.pow(exp2 , x))).floor()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Cells." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: " + format(buyableEffect(this.layer, this.id)) + "x replication speed."
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
                base1 = new Decimal(1.125)
                if (hasUpgrade("c", 32)) base1 = new Decimal(1.175)
                base2 = x
                expo = new Decimal(1)
                let eff = (base1.pow(Decimal.pow(base2, expo)))
                return eff
            },
            tooltip() {
                return "Cost Formula: 50 x 1.14^Amt x Amt^(" + exp2 + "^Amt). Effect formula: " + base1 + "^(" + notationChooser(base2) + "^" + expo + ")."
            }
        },
        12: {
            title: "Cell Buyable 2: Multiply!",
            cost(x) {
                exp2 = 1.25
                if (hasUpgrade("c", 23)) exp2 = 1.2
                if (hasUpgrade("c", 44)) exp2 = 1.17
                return new Decimal(4000).mul(Decimal.pow(1.15, x)).mul(Decimal.pow((x+1) , Decimal.pow(exp2 , x))).floor()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Cells." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: " + notationChooser(buyableEffect(this.layer, this.id)) + "x multiplier."
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
                base1 = new Decimal(1.1)
                if (hasUpgrade("c", 23)) base1 = new Decimal(1.15)
                if (hasAchievement("a", 263)) base1 = new Decimal(1.16)
                if (hasUpgrade("c", 53)) base1 = new Decimal(1.2)
                base2 = x
                expo = new Decimal(1)
                let eff = (base1.pow(Decimal.pow(base2, expo)))
                return eff
            },
            tooltip() {
                return "Cost Formula: 4,000 x 1.15^Amt x Amt^(" + exp2 + "^Amt). Effect formula: " + base1 + "^(" + notationChooser(base2) + "^" + expo + ")."
            }
        },
        13: {
            title: "Cell Buyable 3: Procrastinate (Delay softcap start)",
            cost(x) {
                exp2 = 1.11
                if (hasUpgrade("c", 23)) exp2 = 1.1
                return new Decimal(1e11).mul(Decimal.pow(1.12, (x))).mul(Decimal.pow((x+1) , Decimal.pow(exp2 , x))).floor()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Cells." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: " + format(buyableEffect(this.layer, this.id)) + "x later softcap."
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
                base1 = new Decimal(1.1)
                if (hasAchievement("a", 263)) base1 = new Decimal(1.15)
                if (hasUpgrade("c", 51)) base1 = new Decimal(1.3)
                base2 = x
                expo = new Decimal(1.01)
                let eff = (base1.pow(Decimal.pow(base2, expo)))
                return eff
            },
            tooltip() {
                return "Cost Formula: 1e11 x 1.12^Amt x Amt^(" + exp2 + "^Amt). Effect formula: " + base1 + "^(" + notationChooser(base2) + "^" + expo + ")."
            }
        },
    },
    color: "#63e5ff",
    requires: new Decimal(695000), // Can be a function that takes requirement increases into account
    resource: "Cells", // Name of currency
    baseResource: "Sacrifices", // Name of resource prestige is based on
    baseAmount() {return player.sac.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.00000000001, 
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    row: 6, // Row the layer is in on the tree (0 is the first row)
    branches: ["w", "s", "sac", "era"],
    bars: {
        replicate: {
            direction: RIGHT,
            width: 600,
            height: 60,
            fillStyle: { 'background-color': "green" },
            borderStyle() { return { "border-color": "white" } },
            progress() {
                let prog = player.c.nextReplicateSecs.div(player.c.replicateTime)
                if (player.c.nextReplicateSecs.gte(player.c.replicateTime)) prog = 1
                return prog
            },
            display() {
                return "Duration to next replicate:" + formatTime(player.c.nextReplicateSecs) + "/" + formatTime(player.c.replicateTime)
            }
        },
    }
})