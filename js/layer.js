function buildBuyables() {
    let buyables = {};
    const BUYABLE_NAMES = {
        11: "Simple Boost",
        12: "Small Boost",
        13: "Little Boost",
        14: "Meaningful Boost",
        15: "Great Boost",
        16: "Solid Boost",
        17: "Decent Boost",
        18: "Strong Boost",
        19: "Mighty Boost",
        20: "Grand Boost",
        21: "Super Boost",
        22: "Ultra Boost",
        23: "Hyper Boost",
        24: "Mega Boost",
        25: "Omega Boost",
        26: "Epsilon Boost",
        27: "Eta Boost",
        28: "Absolute Boost",
        29: "Infinite Boost",
        30: "Eternal Boost"
    };

    for (let id = 11; id <= 30; id++) {
        let n = id - 10; // Buyable number: 1 to 20
        buyables[id] = {
            title: BUYABLE_NAMES[id],
            cost(x) {
                let basePower = Math.pow(2, n - 1) - 1;
                let B = Decimal.pow(1.5, basePower);
                let S = Decimal.pow(1.5, Math.pow(2, n));
                return B.mul(Decimal.pow(S, x));
            },
            effect(x) {
                // Each buyable level boosts Scraps by 1.5x
                return Decimal.pow(1.5, x);
            },
            display() {
                let amt = getBuyableAmount(this.layer, this.id);
                let cost = this.cost(amt);
                let eff = this.effect(amt);
                return "Amount: " + formatWhole(amt) + "\n" +
                       "Cost: " + format(cost) + " Scraps\n" +
                       "Effect: Multiplies Scraps by " + format(eff) + "x";
            },
            unlocked() {
                if (n === 1) return true;
                return getBuyableAmount(this.layer, this.id - 1).gte(1);
            },
            canAfford() {
                return player.points.gte(this.cost());
            },
            buy() {
                let cost = this.cost();
                player.points = player.points.sub(cost);
                addBuyables(this.layer, this.id, 1);
            },
            buyMax() {
                let amt = getBuyableAmount(this.layer, this.id);
                let basePower = Math.pow(2, n - 1) - 1;
                let B = Decimal.pow(1.5, basePower);
                let S = Decimal.pow(1.5, Math.pow(2, n));
                let P = player.points;
                if (P.lt(B.mul(Decimal.pow(S, amt)))) return; // Cannot afford even one
                
                // Solve B * S^amt * (S^k - 1) / (S - 1) <= P
                // S^k <= P * (S - 1) / (B * S^amt) + 1
                let num = P.mul(S.sub(1)).div(B.mul(Decimal.pow(S, amt))).add(1);
                let k = num.log(S).floor();
                if (k.lte(0)) return;
                
                let cost = B.mul(Decimal.pow(S, amt)).mul(Decimal.pow(S, k).sub(1)).div(S.sub(1));
                player.points = player.points.sub(cost);
                addBuyables(this.layer, this.id, k);
            },
            style: {
                "width": "180px",
                "height": "165px",
                "border-radius": "8px",
                "margin": "6px",
            }
        };
    }
    return buyables;
}

addLayer("p", {
    name: "Buyables",
    symbol: "⚡",
    color: "#FFAA00",
    row: 0,

    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        };
    },

    layerShown() { return true; },

    tabFormat: [
        ["display-text", function() {
            return "You have <h2 style='color:#FFAA00;display:inline;'>" + notationChooser(player.points) + "</h2> Scraps"
                 + "<br>Scraps/sec: " + notationChooser(tmp.pointGen);
        }],
        "blank",
        "buyables",
    ],

    buyables: buildBuyables(),
    tooltip() {
        let count = 0;
        if (player[this.layer] && player[this.layer].buyables) {
            for (let id = 11; id <= 30; id++) {
                let n = id - 10;
                if (n === 1 || getBuyableAmount(this.layer, id - 1).gte(1)) {
                    count++;
                }
            }
        }
        return "Buyables Unlocked: " + count + "/20";
    }
});
