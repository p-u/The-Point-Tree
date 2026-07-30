const automationReqs = [1e6, 100, 25, 15, 10, 6, 4, 3, 3]
const automationBuyablePrice = [1, 2, 4, 10, 50, 500, 5000]
addLayer("pr", {
    name: "Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        totalPresMulti: new Decimal(1)
    }},
    layerShown(){
        return true
    },
    tabFormat: {
        "Main tab": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                ["display-text",
                    function(){
                        let a = "Total Buyable Prestige Multiplier x"
                        a = a + player.pr.totalPresMulti
                        return a + "   [NOTE THAT EACH PRESTIGE BUYABLE IS ADDITIVE!!]"
                    }
                ],
                "blank",
                "blank",
                "blank",
                "buyables",
            ],
        },
    },
    color: "#ffaa00",
    requires: new Decimal("e200"), // Can be a function that takes requirement increases into account
    resource: "Prestiges", // Name of currency
    baseResource: "Power", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, 
    gainMult() { // Prestige multiplier
        let mult = player.pr.totalPresMulti
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    canReset() {
        return tmp.pr.baseAmount.gte(tmp.pr.requires)
    },
    getResetGain() {
        if (player.points.lte(0)) return new Decimal(0)
        return (player.points.max(1).log(10).div(200)).mul(player.pr.totalPresMulti).floor()
    },
    getNextAt(canMax) {
        let current = player.points.lte(0) ? new Decimal(0) : player.points.log(10).div(200).floor()
        return Decimal.pow(10, current.add(1).times(200))
    },
    buyables: {
        11: {
            title: "Multiply Aura Luck Significantly!",
            cost(x) {
                return new Decimal(1).mul(Decimal.pow(2, x)).floor()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Prestiges." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Multiply Aura luck by x" + notationChooser(buyableEffect(this.layer, this.id))
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
                base1 = new Decimal(4)
                base2 = x
                expo = new Decimal(1)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
            tooltip() {
                return "x4 Aura Luck which translates to about an x1.15 multiplier."
            }
        },
        12: {
            title: "Better Auto",
            cost(x) {
                if (x <= 7) {
                    return new Decimal(automationBuyablePrice[x])
                } else {
                    return new Decimal("e1e6")
                }
            },
            display() {
                let x = getBuyableAmount(this.layer, this.id)
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Prestiges." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: To automate an upgrade, you need " + automationReqs[x.toNumber()] + "x >> " + automationReqs[x.toNumber()+1] + "x upgrade cost to autobuy."
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
                base1 = new Decimal(4)
                base2 = x
                expo = new Decimal(1)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
            tooltip() {
                return "Cost+Effect: 1Mx (free) -> 100x (1) -> 25x (2) -> 15x (4) -> 10x (10) -> 6x (50) -> 4x (500) -> 3x (5,000)."
            }
        },
        13: {
            title: "Surge Multiplier",
            cost(x) {
                return new Decimal(3).mul(Decimal.pow(1.9, x)).round()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Prestiges." + "<br>When you have not bought Upgrade " + (getBuyableAmount(this.layer, this.id)*50) + ", x" + notationChooser(buyableEffect(this.layer, this.id)) + " Power Multiplier"
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
                let eff = new Decimal(1)
                if (x.gt(0)) {
                    eff = new Decimal(x).add(2)
                } else {
                    eff = new Decimal(1)
                }
                return eff
            },
            tooltip() {
                return "Every buy increase upgrade max by 50 and multi by 1 (starts at 3 for first buy)"
            }
        },
        14: {
            title: "MORE!!",
            cost(x) {
                return new Decimal(1).mul(Decimal.pow(1.8, x)).round()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Prestiges." + "<br>Maximum Upgrade that can be unlocked: " + buyableEffect("pr",14).add(100)
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
                return x.mul(100)
            },
            tooltip() {
                return "Every buy increase upgrade max by 50 and multi by 1 (starts at 3 for first buy)"
            }
        },
        15: {
            title: "Greater Prestige",
            cost(x) {
                return new Decimal(4).mul(Decimal.pow(3, x)).round()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Prestiges." + "<br>Effect: +" + buyableEffect("pr",15) + "% Prestiges"
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
                return x.mul(30)
            },
            tooltip() {
                return "+30% Prestiges/level."
            }
        },
        16: {
            title: "Enhanced Prestige",
            cost(x) {
                return new Decimal(25).mul(Decimal.pow(5, x)).round()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Prestiges." + "<br>Effect: +" + buyableEffect("pr",16) + "% Prestiges"
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
                return x.mul(60)
            },
            tooltip() {
                return "+60% Prestiges/level."
            },
            unlocked() {return getBuyableAmount("pr", 15).gte(1)}
        },
        17: {
            title: "Super Prestige",
            cost(x) {
                return new Decimal(250).mul(Decimal.pow(9, x)).round()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Prestiges." + "<br>Effect: +" + buyableEffect("pr",17) + "% Prestiges"
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
                return x.mul(110)
            },
            tooltip() {
                return "+110% Prestiges/level."
            },
            unlocked() {return getBuyableAmount("pr", 16).gte(1)}
        },
        18: {
            title: "Insane Prestige",
            cost(x) {
                return new Decimal(5000).mul(Decimal.pow(12,x)).round()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Prestiges." + "<br>Effect: +" + buyableEffect("pr",18) + "% Prestiges"
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
                return x.mul(160)
            },
            tooltip() {
                return "+160% Prestiges/level."
            },
            unlocked() {return getBuyableAmount("pr", 17).gte(1)}
        },
        19: {
            title: "Omega Prestige",
            cost(x) {
                return new Decimal(400000).mul(Decimal.pow(20, x)).round()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Prestiges." + "<br>Effect: +" + buyableEffect("pr",19) + "% Prestiges"
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
                return x.mul(280)
            },
            tooltip() {
                return "+280% Prestiges/level."
            },
            unlocked() {return getBuyableAmount("pr", 18).gte(1)}
        },
    },
    prestigeButtonText() {
        if (tmp.pr.canReset) {
            return "Prestige for " + formatWhole(tmp.pr.resetGain) + " " + tmp.pr.resource + "!"
        }
        return "Reach " + formatWhole(tmp.pr.requires) + " " + tmp.pr.baseResource + " to prestige<br>(Next at " + formatWhole(getNextAt("pr")) + ")"
    },
    row: 1,
})