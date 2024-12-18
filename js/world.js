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
    requires: new Decimal(1e20),
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
    progress() {
        let progress = Decimal.log10(player.points.add(1)).div(Decimal.log10(this.requires));
        return progress.gte(1) ? new Decimal(1) : progress;
    },
    tabFormat: {
        "World Tiers": {
            content: [
                ["display-text", () => `Progress to next World Tier: ${format(layers["w"].progress().mul(100))}%`],
                "blank",
                "main-display",
                "blank",
                "prestige-button",
            ],
        },
    },
});
