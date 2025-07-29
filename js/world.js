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
    exponent() {
        let expo = new Decimal(7.13)
        if (hasUpgrade("en", 82)) expo = expo.sub(0.01)
        return expo
    },
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
            effectDescription: "Gen 5 and 6 does not cost anything, unlock Gen 7. <br> 3^World Tierx Atoms, 2^World Tierx Energy, 1.1^World Tierx Matter.",
            done() { return player.w.points.gte(3) },
        },
        3: {
            requirementDescription: "World Tier 4",
            effectDescription: "Double Molecule Bonds gain, ^1.01 Atom gain. <br> Unlock new Click Mastery Milestones and (v1.0) Unlock a new CM Feature with a new tab and upgrades. +40% CM gain. <br> Also, unlock a new layer (v1.0).",
            done() { return player.w.points.gte(4) },
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
