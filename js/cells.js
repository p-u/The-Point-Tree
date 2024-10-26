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

        // reset time
        player.c.preRT = player.c.preRT.div(buyableEffect('c', 11))
        if(hasUpgrade("c", 13)) player.c.preRT = player.c.preRT.div(1.25)

        // base mult
        if(hasUpgrade("c", 11)) player.c.preBM = player.c.preBM.mul(1.5)
        player.c.preBM = player.c.preBM.mul(buyableEffect('c', 12))

        // softcap decrease
        if(hasUpgrade("c", 12)) player.c.scscale = new Decimal(1.3)

        // init
        player.c.replicateTime = player.c.preRT
        player.c.baseMultiplier = player.c.preBM


        // main code
        if (player.sac.points.gte(700000)) {
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
                                ${((player.c.baseMultiplier.div(player.c.scscale.pow((player.c.points.div(player.c.softcapStart)).log2()).mul(10))).add(1))}</span></h2>`
                        }
                        return a
                    }
                ],
                "blank",
                "blank",
                "upgrades",
            ],
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
    upgrades: {
        11: {
            title: "Cell Upgrade 1",
            description: "Increase base multiplier by 1.5.",
            cost: new Decimal(1600),
            unlocked() { return true },
        },
        12: {
            title: "Cell Upgrade 2",
            description: "Decrease softcap scaling",
            cost: new Decimal(3000),
            unlocked() { return (hasUpgrade("c", 11)) },
        },
        13: {
            title: "Cell Upgrade 3",
            description: "SPEEEED: x1.25 replicate speed",
            cost: new Decimal(7000),
            unlocked() { return (hasUpgrade("c", 12)) },
        },
        14: {
            title: "Cell Upgrade 4",
            description: "Back to main: Extend Era Upgrades. x5,000 EC",
            cost: new Decimal(15000),
            unlocked() { return (hasUpgrade("c", 13)) },
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
                base2 = x
                expo = new Decimal(1)
                let eff = (base1.pow(Decimal.pow(base2, expo)))
                return eff
            },
            tooltip() {
                return "Cost Formula: 4,000 x 1.15^Amt x Amt^(" + exp2 + "^Amt). Effect formula: " + base1 + "^(" + notationChooser(base2) + "^" + expo + ")."
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