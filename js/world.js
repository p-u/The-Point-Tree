addLayer("w", {
    name: "World Tiers",
    symbol: "🌍",
    position: 1,
    startData() { 
        return {                  
            unlocked: true,
            points: new Decimal(1),
            MaResetTime: 0,
            MoResetTime: 0,
            PaResetTime: 0,
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
            effectDescription: "Double Molecule Bonds gain, ^1.01 Atom gain. <br> Unlock new Click Mastery Milestones and (v1.0) Unlock a new CM Feature with a new tab and upgrades. +20% CM gain. <br> Also, unlock a new layer (v1.0).",
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
        "Reset Timings": {
            content: [
                "blank",
                "blank",
                ["display-text", function() {
                    if (player.points.gte(1e6)){
                        if (hasAchievement("a", 23)) {
                            return "Your first Matter Reset is " + formatTime(player.w.MaResetTime) + " after you started the game."
                        } else {
                            return "Your first Matter Reset is in: TBC, you have not resetted for Matter yet"
                        }
                    } else {
                        return "Reach 1M Atoms to unlock this thing"
                    } 
                }],
                "blank",
                ["display-text", function() {
                   if (hasAchievement("a", 33)){
                        if (hasAchievement("a", 43)) {
                            return "Your first Molecule Reset is " + formatTime(player.w.MoResetTime) + " after you started the game."
                        } else {
                            return "Your first Molecule Reset is in: TBC, you have not resetted for Molecules yet"
                        }
                    } else {
                        if (hasAchievement("a", 23)) {
                            return "Reach 200K Matter to unlock this thing"
                        } else {
                            return ""
                        }
                    }
                }],
                "blank",
                ["display-text", function() {
                   if (player.mo.points.gte(1e20)){
                        if (hasAchievement("a", 65)) {
                            return "Your first Particle Reset is " + formatTime(player.w.PaResetTime) + " after you started the game."
                        } else {
                            return "Your first Particle Reset is in: TBC, you have not resetted for Particles yet"
                        }
                    } else {
                        if (hasAchievement("a", 43)) {
                            return "Reach 1e20 Molecules to unlock this thing"
                        } else {
                            return ""
                        }
                    }
                }],
            ],
        },
    },
    update(diff) {
        if ((hasAchievement("a", 23)) && (player.w.MaResetTime == 0)) {
            player.w.MaResetTime = player.timePlayed
        }
        if ((hasAchievement("a", 43)) && (player.w.MoResetTime == 0)) {
            player.w.MoResetTime = player.timePlayed
        }
        if ((hasAchievement("a", 65)) && (player.w.PaResetTime == 0)) {
            player.w.PaResetTime = player.timePlayed
        }
        player.pa.totalParticles = player.pa.clickableamt.alpha.add(player.pa.clickableamt.beta).add(player.pa.clickableamt.gamma)
    },
});
