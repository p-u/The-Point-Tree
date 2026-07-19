// Maps buyable number n (1-20) to a TMT-safe id, skipping multiples of 10.
// Row 1: n=1..9  → ids 11..19
// Row 2: n=10..18 → ids 21..29
// Row 3: n=19..20 → ids 31..32
function buyableIdForN(n) {
    let row = Math.floor((n - 1) / 9); // 0, 1, or 2
    let col = ((n - 1) % 9) + 1;      // 1..9
    return (row + 1) * 10 + col;       // 11..19, 21..29, 31..32
}

function buildBuyables() {
    let buyables = {};
    const BUYABLE_NAMES = [
        null, // index 0 unused
        "Simple Boost",
        "Small Boost",
        "Little Boost",
        "Meaningful Boost",
        "Great Boost",
        "Solid Boost",
        "Decent Boost",
        "Strong Boost",
        "Mighty Boost",
        "Grand Boost",
        "Super Boost",
        "Ultra Boost",
        "Hyper Boost",
        "Mega Boost",
        "Omega Boost",
        "Epsilon Boost",
        "Eta Boost",
        "Absolute Boost",
        "Infinite Boost",
        "Eternal Boost"
    ];

    for (let n = 1; n <= 20; n++) {
        let id = buyableIdForN(n);
        let prevId = n > 1 ? buyableIdForN(n - 1) : null;

        buyables[id] = {
            title: BUYABLE_NAMES[n],
            cost(x) {
                let basePower = Math.pow(2, n - 1) - 1;
                let B = Decimal.pow(1.5, basePower);
                let S = Decimal.pow(1.5, Math.pow(2, n));
                return B.mul(Decimal.pow(S, x));
            },
            effect(x) {
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
                return getBuyableAmount(this.layer, prevId).gte(1);
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
                if (P.lt(B.mul(Decimal.pow(S, amt)))) return;

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
            for (let n = 1; n <= 20; n++) {
                let id = buyableIdForN(n);
                let prevId = n > 1 ? buyableIdForN(n - 1) : null;
                if (n === 1 || getBuyableAmount(this.layer, prevId).gte(1)) {
                    count++;
                }
            }
        }
        return "Buyables Unlocked: " + count + "/20";
    }
});
