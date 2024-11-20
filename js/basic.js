addLayer("basic", {
    name: "Basic Points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for basic points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})