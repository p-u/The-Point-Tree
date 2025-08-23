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
        if ((hasMilestone('ma', 10)) || player.mo.points.gte(1)) visible = true
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
        2: {
            requirementDescription: "2^1024 Atoms - Start of Overload",
            effectDescription: "Unlock a new feature in the Molecules Layer. Extend Energy and Molecule Upgrades. Add a nerf. x1.6 Click Mastery gain (Recommended to get 10M Clicks).",
            done() { return player.points.gte(new Decimal(2).pow(1024)) },
            unlocked() {return hasMilestone("cf", 1)}
        },
        3: {
            requirementDescription: "e600 Atoms",
            effectDescription: "Extend Matter Upgrades",
            done() { return player.points.gte("e600") },
            unlocked() {return hasMilestone("cf", 2)}
        },
        4: {
            requirementDescription: "e930 Atoms",
            effectDescription: "Molecules are temporarily, super OP! Quadruple Atoms, x1.7 Matter and x1.1 Molecule Bonds gain per x2 Molecule Bonds starting from 1e25. <br>(Cap: 1e7x, 50x and 10x respectively -> 3.16e27, 5.74e26, 1.88e31 Molecule Bonds)",
            done() { return player.points.gte("e930") },
            unlocked() {return hasMilestone("cf", 3)}
        },
        5: {
            requirementDescription: "e1,600 Energy",
            effectDescription: "Extend Energy Upgrades. +^0.01 Energy. +16% Clicks gain.",
            done() { return player.en.points.gte("e1600") },
            unlocked() {return hasMilestone("cf", 4)}
        },
        6: {
            requirementDescription: "e4,125 Atoms",
            effectDescription: "Extend Matter Upgrades. x42.5 Matter and x4,250 Atoms gain",
            done() { return player.points.gte("e4125") },
            unlocked() {return hasMilestone("cf", 5)}
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
