// =========================================================
// Pre-compute upgrade costs and effects for UpgNum 1..1000
//   effect(N)  = N + 1   (multiply Power gen by this)
//   cost(N)    = N * N!
//              = N (timewall duration) * product of effects of upgrades 1..(N-1)
// =========================================================
const UPG_COUNT = 1736;

// Build a flat array of precomputed Decimal costs indexed by UpgNum (1-based)
// costs[N] = cost of upgradeN  (costs[0] unused)
const upgCosts = new Array(UPG_COUNT + 1);
{
    let runningFact = new Decimal(1); // starts as 1 (empty product, power gen before any upg)
    for (let n = 1; n <= UPG_COUNT; n++) {
        // cost = n * (current power gen before buying this upg)
        // currentPowerGen before buying upg n = runningFact
        upgCosts[n] = (new Decimal(1.01).pow(n - 1)).mul(runningFact);
        // after buying upg n, power gen gets multiplied by (n+1)
        runningFact = runningFact.mul(n + 1);
    }
}

// Returns the TMT upgrade ID for UpgNum n
function upgId(n) {
    return (Math.floor((n - 1) / 5) * 10 + ((n - 1) % 5 + 1)) + 10;
}

function buildUpgrades() {
    let upgs = {};
    for (let n = 1; n <= UPG_COUNT; n++) {
        let id = upgId(n);
        let cost = upgCosts[n];
        // The last upgrade of the previous row unlocks this row
        let row = Math.floor((n - 1) / 5);
        let prevRowLastId = row > 0 ? upgId(row * 5) : null;
        upgs[id] = {
            title: "Upgrade " + n,
            description: function() {
                return "Multiplies Power by " + (n + 1) + "x.<br>Timewall: " + formatTime(new Decimal(1.01).pow(n-1));
            },
            cost: cost,
            currencyInternalName: "points",
            currencyDisplayName: "Power",
            effect() { return n + 1; },
            effectDisplay() { return "\u00d7" + (n + 1); },
            unlocked() {
                if (row === 0) return true;
                return hasUpgrade("p", prevRowLastId);
            },
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
            return "You have <h2 style='color:#FFAA00;display:inline;'>" + notationChooser
            
            
            (player.points) + "</h2> Power"
                 + "<br>Power/sec: " + notationChooser(tmp.pointGen);
        }],
        "blank",
        "upgrades",
    ],

    upgrades: buildUpgrades(),
});
