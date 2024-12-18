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
    exponent: 6.62,
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
            effectDescription: "Keep Generators on reset, x1.5 Matter",
            done() { return player.w.points.gte(2) }
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
