addLayer("cf", {
    name: "Content Features",
    symbol: "C",
    position: 30,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasMilestone('ma', 10)) visible = true
       return visible
    },
    color: "#FFFFFF",
    requires: new Decimal("1eee100"),
    resource: "nothing",
    baseResource: "Click Mastery",
    baseAmount() { return player.cm.cpc; },
    type: "static",
    exponent: 7500000,
    gainMult() {
        let mult = new Decimal(1);
        return mult;
    },
    gainExp() {
        return new Decimal(1);
    },
    row: "side",
    milestones: {
        1: {
            requirementDescription: "e150 Atoms",
            effectDescription: "Unlock the next layer...",
            done() { return player.points.gte("e150") }
        },
    },
    tabFormat: {
        "Content Features": {
            content: [
                "milestones",
                "blank",
                "upgrades",
            ],
        },
    },
});
