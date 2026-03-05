// =========================================================
// Pre-compute upgrade costs and effects for UpgNum 1..2000
//   effect(N)  = prevBoost ^ 1.1, with boost[1] = 2
//   cost(N)    = N * (power gen before buying upg N)
//              = N (timewall seconds) * product of effects 1..(N-1)
// =========================================================
const UPG_COUNT = 2000;

// Pre-compute each upgrade's boost multiplier: upgEffects[n] = Decimal
// upgEffects[1] = 2
// upgEffects[n] = upgEffects[n-1] * (1.5 + 0.05*n + 0.0025*n^2)
const upgEffects = new Array(UPG_COUNT + 1);
{
    upgEffects[1] = new Decimal(2);
    for (let n = 2; n <= UPG_COUNT; n++) {
        let factor = 1.5 + 0.05 * n + 0.0025 * n * n;
        upgEffects[n] = upgEffects[n - 1].mul(factor);
    }
}

const timewallDuration = new Array(UPG_COUNT + 1);
{
    for (let n = 1; n <= UPG_COUNT; n++) {
        timewallDuration[n] = n / (1.1 ** Math.floor(n / 50));
    }
}

// Build a flat array of precomputed Decimal costs indexed by UpgNum (1-based)
// costs[N] = cost of upgradeN  (costs[0] unused)
const upgCosts = new Array(UPG_COUNT + 1);
{
    let runningPowerGen = new Decimal(1); // power gen before any upgrade
    for (let n = 1; n <= UPG_COUNT; n++) {
        // cost = n * (current power gen before buying this upg)
        upgCosts[n] = new Decimal(timewallDuration[n]).mul(runningPowerGen);
        // after buying upg n, power gen gets multiplied by upgEffects[n]
        runningPowerGen = runningPowerGen.mul(upgEffects[n]);
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
                return "Multiplies Power by " + notationChooser(upgEffects[n], 3) + "x.<br>Timewall Duration: " + formatTime(timewallDuration[n], 3);
            },
            cost: cost,
            currencyInternalName: "points",
            currencyDisplayName: "Power",
            effect() { return upgEffects[n]; },
            effectDisplay() { return "\u00d7" + notationChooser(upgEffects[n], 3); },
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
    autoUpgrade: true,

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
