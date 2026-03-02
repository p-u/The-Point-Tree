// =========================================================
// Pre-compute upgrade costs and effects for UpgNum 1..1000
//   effect(N)  = N + 1   (multiply Power gen by this)
//   cost(N)    = N * (2 * 3 * ... * N)   = N * N!
//              = N * product of effects of upgrades 1..(N-1)
//              because after buying upgrades 1..(N-1),
//              Power/sec = 2*3*...*N = N!
//              and the upgrade takes N seconds, so cost = N * N!
// =========================================================
const UPG_COUNT = 1000;

// Build a flat array of precomputed Decimal costs indexed by UpgNum (1-based)
// costs[N] = cost of upgradeN  (costs[0] unused)
const upgCosts = new Array(UPG_COUNT + 1);
{
    let runningFact = new Decimal(1); // starts as 1 (empty product, power gen before any upg)
    for (let n = 1; n <= UPG_COUNT; n++) {
        // cost = n * (current power gen before buying this upg)
        // currentPowerGen before buying upg n = runningFact
        upgCosts[n] = new Decimal(n).mul(runningFact);
        // after buying upg n, power gen gets multiplied by (n+1)
        runningFact = runningFact.mul(n + 1);
    }
}

// Build the upgrades object for TMT
// ID formula: (N // 5) * 10 + (N % 5)
function buildUpgrades() {
    let upgs = {};
    for (let n = 1; n <= UPG_COUNT; n++) {
        let id = (Math.floor((n - 1) / 5) * 10 + ((n - 1) % 5 + 1))+10;
        let effect = n + 1; // multiplier this upgrade provides
        let cost = upgCosts[n];
        upgs[id] = {
            title: "Upgrade " + n,
            description: function() {
                return "Multiplies Power by " + (n + 1) + "x.";
            },
            cost: cost,
            currencyInternalName: "points",  // use global player.points (Power), not player.p.points
            currencyDisplayName: "Power",
            effect() { return n + 1; },
            effectDisplay() { return "×" + (n + 1); },
        };
    }
    return upgs;
}

addLayer("p", {
    name: "Upgrades",
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
            return "You have <h2 style='color:#FFAA00;display:inline;'>" + format(player.points) + "</h2> Power"
                 + "<br>Power/sec: " + format(tmp.pointGen);
        }],
        "blank",
        "upgrades",
    ],

    upgrades: buildUpgrades(),
});
