addLayer("w", {
    name: "World Tiers",
    symbol: "🌍",
    position: 1,
    startData() { 
        return {                  
            unlocked: true,
            points: new Decimal(1),
        };
    },
    color: "#4caf50",
    requires: new Decimal(5e19),
    resource: "World Tier",
    baseResource: "atoms",
    baseAmount() { return player.points; },
    type: "static",
    exponent: 7.13,
    gainMult() {
        let mult = new Decimal(1);
        return mult;
    },
    gainExp() {
        return new Decimal(1);
    },
    row: "side",
    layerShown() {
        return true;
    },
    milestones: {
        1: {
            requirementDescription: "World Tier 2",
            effectDescription: "x5 Atoms, x1.5 Matter",
            done() { return player.w.points.gte(2) }
        },
        2: {
            requirementDescription: "World Tier 3",
            effectDescription: "Gen 5 and 6 does not cost anything, unlock Gen 7, 3^World Tierx Atoms, 2^World Tierx Energy, 1.1^World Tierx Matter.",
            done() { return player.w.points.gte(3) },
        },
    },
    tabFormat: {
        "World Tiers": {
            content: [
                "blank",
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                "milestones",
            ],
        },
    },
});
