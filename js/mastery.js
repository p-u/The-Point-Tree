addLayer("m", {
    name: "Mastery", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MAS", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { 
        return {
            unlocked: true,
		    points: new Decimal(0),
            mpps: new Decimal(0),
        }
    },
    layerShown(){
        let visible = false
        if (((hasMilestone('sac', 42)) || (inChallenge("m", 11))) || (inChallenge("m", 12))) visible = true
       return visible
    },
    passiveGeneration() {
        if (hasMilestone('sac', 42)) return 1
        return 0
    },
    infoboxes: {
        info: {
            title: "NOTE",
            body() { return "Mastery resets everything. To get a new column of Mastery Upgrades, you must buy all upgrades in the previous column. To get a new row, complete mastery challenges." },
        },
    },
    tabFormat: {
        "Upgrades": {
            content: [
                "main-display",
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + "You are gaining " + notationChooser(player.m.mpps) + " Mastery Points a second."
                        return a
                    }
                ],
                "blank",
                "blank",
                "upgrades",
            ],
        },
        "Challenges": {
            content: [
                "main-display",
                "blank",
                "blank",
                ["display-text", "Look inside Info layer to see recommended completion of Mastery Challenges (Pre-Era and Post-Era)!"],
                "blank",
                "challenges",
            ],
            unlocked() {return (hasUpgrade("m", 15) && hasUpgrade("m", 25) && hasUpgrade("m", 35))}
        },
    },
    color: "red",
    requires: new Decimal(71), // Can be a function that takes requirement increases into account
    resource: "Mastery Points", // Name of currency
    baseResource: "Sacrifice", // Name of resource prestige is based on
    baseAmount() {return player.sac.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0000000000000000001,  // Balance is needed. 
    upgrades: {
        11: {
            title: "MMP (More Mastery Points) 1",
            description: "Increase base mastery points to 3 a sec",
            cost: new Decimal(50)
        },
        21: {
            title: "PFP (PF Power) 1",
            description: "^1.02 PF",
            cost: new Decimal(80)
        },
        31: {
            title: "UB (Upgrade Boost) 1",
            description: "MU31 is stronger",
            cost: new Decimal(110)
        },
        12: {
            title: "MMP 2",
            description: "Increase base mastery points to 5 a sec",
            cost: new Decimal(180),
            unlocked() { return (hasUpgrade("m", 11) && hasUpgrade("m", 21) && hasUpgrade("m", 31)) },
        },
        22: {
            title: "PFP 2",
            description: "^1.02 PF",
            cost: new Decimal(100),
            unlocked() { return (hasUpgrade("m", 11) && hasUpgrade("m", 21) && hasUpgrade("m", 31)) },
        },
        32: {
            title: "UB 2",
            description: "SU21, 51 and 52 is boosted.",
            cost: new Decimal(150),
            unlocked() { return (hasUpgrade("m", 11) && hasUpgrade("m", 21) && hasUpgrade("m", 31)) },
        },
        13: {
            title: "MMP 3",
            description: "Multiply Mastery Points by 2.5",
            cost: new Decimal(300),
            unlocked() { return (hasUpgrade("m", 12) && hasUpgrade("m", 22) && hasUpgrade("m", 32)) },
        },
        23: {
            title: "PFP 3",
            description: "^1.03 PF",
            cost: new Decimal(400),
            unlocked() { return (hasUpgrade("m", 12) && hasUpgrade("m", 22) && hasUpgrade("m", 32)) },
        },
        33: {
            title: "UB 3",
            description: "BB3 is boosted.",
            cost: new Decimal(500),
            unlocked() { return (hasUpgrade("m", 12) && hasUpgrade("m", 22) && hasUpgrade("m", 32)) },
        },
        14: {
            title: "MMP 4",
            description: "Multiply Mastery Points by 4",
            cost: new Decimal(800),
            unlocked() { return (hasUpgrade("m", 13) && hasUpgrade("m", 23) && hasUpgrade("m", 33)) },
        },
        24: {
            title: "PFP 4",
            description: "^1.025 PF",
            cost: new Decimal(1500),
            unlocked() { return (hasUpgrade("m", 13) && hasUpgrade("m", 23) && hasUpgrade("m", 33)) },
        },
        34: {
            title: "UB 4",
            description: "Energy effect is boosted tremendously",
            cost: new Decimal(2750),
            unlocked() { return (hasUpgrade("m", 13) && hasUpgrade("m", 23) && hasUpgrade("m", 33)) },
        },
        15: {
            title: "MMP 5",
            description: "Mastery Point Base is increased to 12/s.",
            cost: new Decimal(3000),
            unlocked() { return (hasUpgrade("m", 14) && hasUpgrade("m", 24) && hasUpgrade("m", 34)) },
        },
        25: {
            title: "PFP 5",
            description: "^1.05 PF",
            cost: new Decimal(7500),
            unlocked() { return (hasUpgrade("m", 14) && hasUpgrade("m", 24) && hasUpgrade("m", 34)) },
        },
        35: {
            title: "UB 5",
            description: "All Supreme Buyables are boosted.",
            cost: new Decimal(7000),
            unlocked() { return (hasUpgrade("m", 14) && hasUpgrade("m", 24) && hasUpgrade("m", 34)) },
        },
        41: {
            title: "MMP 6",
            description: "Pentuple Mastery Point Gain",
            cost: new Decimal(700000),
            unlocked() { return (hasUpgrade("w", 54) && hasChallenge("m", 11)) },
        },
        51: {
            title: "MM (Many Mult) 1",
            description: "xe100K MP",
            cost: new Decimal(3000000),
            unlocked() { return (hasUpgrade("w", 54) && hasChallenge("m", 11)) },
        },
        61: {
            title: "UB 6",
            description: "SU64 is boosted.",
            cost: new Decimal(2750000),
            unlocked() { return (hasUpgrade("w", 54) && hasChallenge("m", 11)) },
        },
        42: {
            title: "MMP 7",
            description: "Mastery Points gets boosted based on itself (Compounding XI / 11)",
            cost: new Decimal(3500000),
            unlocked() { return (hasUpgrade("m", 41) && hasUpgrade("m", 51) && hasUpgrade("m", 61)) },
            main() {
                mmp6exp = 0.111
                if (hasUpgrade('m', 72)) mmp6exp = 0.139
                if (hasUpgrade('s', 122)) mmp6exp = 0.157
                softcapDescriptionmast42 = ""
                sdsc = ""
                upgEffectmast42 = upgradeEffect(this.layer, this.id)
            },
            effect() {
                let eff = player["m"].points.add(1).pow(mmp6exp)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionmast42
            },
            tooltip() {
                return "Formula: (Mastery Points + 1)^"  + mmp6exp + sdsc
            },
        },
        52: {
            title: "MM 2",
            description: "xe20M BP",
            cost: new Decimal(15000000),
            unlocked() { return (hasUpgrade("m", 41) && hasUpgrade("m", 51) && hasUpgrade("m", 61)) },
        },
        62: {
            title: "UB 7",
            description: "MU31 is boosted.",
            cost: new Decimal(17500000),
            unlocked() { return (hasUpgrade("m", 41) && hasUpgrade("m", 51) && hasUpgrade("m", 61)) },
        },
        43: {
            title: "MMP 8",
            description: "x9 Mastery Points",
            cost: new Decimal(30000000),
            unlocked() { return (hasUpgrade("m", 42) && hasUpgrade("m", 52) && hasUpgrade("m", 62)) },
        },
        53: {
            title: "MM 3",
            description: "xe70M PF",
            cost: new Decimal(250000000),
            unlocked() { return (hasUpgrade("m", 42) && hasUpgrade("m", 52) && hasUpgrade("m", 62)) },
        },
        63: {
            title: "UB 8",
            description: "Supreme Buyables are stronger, again",
            cost: new Decimal(15000000),
            unlocked() { return (hasUpgrade("m", 42) && hasUpgrade("m", 52) && hasUpgrade("m", 62)) },
        },
        44: {
            title: "MMP 9",
            description: "Increase base to 85/s",
            cost: new Decimal(300000000),
            unlocked() { return (hasUpgrade("m", 43) && hasUpgrade("m", 53) && hasUpgrade("m", 63)) },
        },
        54: {
            title: "MM 4",
            description: "xe2.5M PP",
            cost: new Decimal(2.5e9),
            unlocked() { return (hasUpgrade("m", 43) && hasUpgrade("m", 53) && hasUpgrade("m", 63)) },
        },
        64: {
            title: "UB 9",
            description: "SU21 is stronger",
            cost: new Decimal(2e9),
            unlocked() { return (hasUpgrade("m", 43) && hasUpgrade("m", 53) && hasUpgrade("m", 63)) },
        },
        45: {
            title: "MMP 10",
            description: "x100 Mastery Points",
            cost: new Decimal(3e9),
            unlocked() { return (hasUpgrade("m", 44) && hasUpgrade("m", 54) && hasUpgrade("m", 64)) },
        },
        55: {
            title: "MM 5: Wow, that's crazy.",
            description: "xe130M PF",
            cost: new Decimal(700e9),
            unlocked() { return (hasUpgrade("m", 44) && hasUpgrade("m", 54) && hasUpgrade("m", 64)) },
        },
        65: {
            title: "UB 10: Finally! Some love!",
            description: "ALL MEGA BUYABLES ARE STRONGER!",
            cost: new Decimal(350e9),
            unlocked() { return (hasUpgrade("m", 44) && hasUpgrade("m", 54) && hasUpgrade("m", 64)) },
        },
        71: {
            title: "MMP XI",
            description: "Mastery Point gain x78.2",
            cost: new Decimal(1.4e16),
            unlocked() { return (hasChallenge("m", 12)) },
        },
        81: {
            title: "PU [Power UP] 1",
            description: "Water Gain +^0.1",
            cost: new Decimal(1e18),
            unlocked() { return (hasChallenge("m", 12)) },
        },
        91: {
            title: "SR [Softcap Reduction] 1",
            description: "Reduce Mega Layer effect softcap",
            cost: new Decimal(1.6e18),
            unlocked() { return (hasChallenge("m", 12)) },
        },
        72: {
            title: "MMP 12",
            description: "Mastery Upgrade 42 is stronger",
            cost: new Decimal(2.25e18),
            unlocked() { return (hasUpgrade("m", 71) && hasUpgrade("m", 81) && hasUpgrade("m", 91)) },
        },
        82: {
            title: "PU 2",
            description: "^1.01 PF",
            cost: new Decimal(1.5e18),
            unlocked() { return (hasUpgrade("m", 71) && hasUpgrade("m", 81) && hasUpgrade("m", 91)) },
        },
        92: {
            title: "SR 2",
            description: "Reduce Energy Upg 14 softcap",
            cost: new Decimal(1e18),
            unlocked() { return (hasUpgrade("m", 71) && hasUpgrade("m", 81) && hasUpgrade("m", 91)) },
        },
        73: {
            title: "MMP 13",
            description: "Increase base to 2,500/sec",
            cost: new Decimal(6.5e18),
            unlocked() { return (hasUpgrade("m", 72) && hasUpgrade("m", 82) && hasUpgrade("m", 92)) },
        },
        83: {
            title: "PU 3",
            description: "MP +^0.05",
            cost: new Decimal(3.5e20),
            unlocked() { return (hasUpgrade("m", 72) && hasUpgrade("m", 82) && hasUpgrade("m", 92)) },
        },
        93: {
            title: "SR 3",
            description: "Mega Upgrade 84 softcap is reduced",
            cost: new Decimal(2.5e20),
            unlocked() { return (hasUpgrade("m", 72) && hasUpgrade("m", 82) && hasUpgrade("m", 92)) },
        },
        74: {
            title: "MMP 14",
            description: "x420 Mastery Points",
            cost: new Decimal(2.5e21),
            unlocked() { return (hasUpgrade("m", 73) && hasUpgrade("m", 83) && hasUpgrade("m", 93)) },
        },
        84: {
            title: "PU 4",
            description: "SP +^0.05",
            cost: new Decimal(1e24),
            unlocked() { return (hasUpgrade("m", 73) && hasUpgrade("m", 83) && hasUpgrade("m", 93)) },
        },
        94: {
            title: "SR 4",
            description: "PU22 softcap is reduced",
            cost: new Decimal(1.35e24),
            unlocked() { return (hasUpgrade("m", 73) && hasUpgrade("m", 83) && hasUpgrade("m", 93)) },
        },
        75: {
            title: "MMP 15",
            description: "Increase Mastery Points base to 5M/sec!",
            cost: new Decimal(1.75e24),
            unlocked() { return (hasUpgrade("m", 73) && hasUpgrade("m", 83) && hasUpgrade("m", 93)) },
        },
        85: {
            title: "PU 5",
            description: "^1.015 PF",
            cost: new Decimal(1.35e28),
            unlocked() { return (hasUpgrade("m", 73) && hasUpgrade("m", 83) && hasUpgrade("m", 93)) },
        },
        95: {
            title: "SR 5",
            description: "BU32 softcap is reduced",
            cost: new Decimal(9.5e27),
            unlocked() { return (hasUpgrade("m", 73) && hasUpgrade("m", 83) && hasUpgrade("m", 93)) },
        },
        101: {
            title: "Sac is even more OP",
            description: "SU21 and SU52 is better",
            cost: new Decimal(7.9e39), 
            unlocked() { return (hasMilestone("sac", 93)) },
        },
        102: {
            title: "More Mega = More Sacs",
            description: "Mega Exponent +^0.08",
            cost: new Decimal(9e39), 
            unlocked() { return (hasMilestone("sac", 93) && hasUpgrade("m", 101)) },
        },
        103: {
            title: "More EC = More Mastery",
            description: "EC boosts Mastery by a very little bit",
            cost: new Decimal(1e40), 
            unlocked() { return (hasMilestone("sac", 93) && hasUpgrade("m", 102)) },
            main() {
                ectomasteryexp = 0.06
                if ((inChallenge("m", 11)) && (hasUpgrade("m", 1114))) ectomasteryexp = 0.1
                softcapDescriptionmast103 = ""
                sdsc = ""
                upgEffectmast103 = upgradeEffect(this.layer, this.id)
            },
            effect() {
                let eff = player["era"].ec.add(1).pow(ectomasteryexp).log(1.8)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionmast103
            },
            tooltip() {
                return "Formula: log1.8((EC + 1)^"  + ectomasteryexp + ") " + sdsc
            },
        },
        104: {
            title: "More Rebirth = More PF",
            description: "RP Exponent +^0.04",
            cost: new Decimal(1.4e41), 
            unlocked() { return (hasMilestone("sac", 93) && hasUpgrade("m", 103)) },
        },
        105: {
            title: "Multi-dimensional-fold upgrade",
            description: "xe1 Qd PF, add more era upgrades, x100 EC",
            cost: new Decimal(1.8e41), 
            unlocked() { return (hasMilestone("sac", 93) && hasUpgrade("m", 104)) },
        },
        111: {
            title: "BB [Buyable Boost] I",
            description: "Mega Buyable 2 is stronger. [Every set of upgrades has a combo of x10 Mastery Points]",
            cost: new Decimal(5e58), 
            unlocked() { return ((challengeCompletions("m", 11) == 2) && hasUpgrade("m", 105)) },
        },
        121: {
            title: "MM 6",
            description: "xee12 Supreme Points",
            cost: new Decimal(3.8e58), 
            unlocked() { return ((challengeCompletions("m", 11) == 2) && hasUpgrade("m", 105)) },
        },
        131: {
            title: "PU 6",
            description: "+^0.0125 Basic Points",
            cost: new Decimal(4.5e58), 
            unlocked() { return ((challengeCompletions("m", 11) == 2) && hasUpgrade("m", 105)) },
        },
        112: {
            title: "BB II",
            description: "SB5 HC +^0.01",
            cost: new Decimal(6e59), 
            unlocked() { return ((hasUpgrade("m", 111)) && (hasUpgrade("m", 121)) && (hasUpgrade("m", 131))) },
        },
        122: {
            title: "MM VII",
            description: "xe2e16 Pres Pts",
            cost: new Decimal(6e59), 
            unlocked() { return ((hasUpgrade("m", 111)) && (hasUpgrade("m", 121)) && (hasUpgrade("m", 131))) },
        },
        132: {
            title: "PU 7",
            description: "+^0.015 Basic Points",
            cost: new Decimal(7e59), 
            unlocked() { return ((hasUpgrade("m", 111)) && (hasUpgrade("m", 121)) && (hasUpgrade("m", 131))) },
        },
        113: {
            title: "BB III",
            description: "Era Buyable 3 Mastery Points boost is stronger (^0.3 to ^0.4)",
            cost: new Decimal(1.11e63), 
            unlocked() { return  ((hasUpgrade("m", 112)) && (hasUpgrade("m", 122)) && (hasUpgrade("m", 132))) },
        },
        123: {
            title: "MM VIII",
            description: "xe2.5e17 Point Fragments",
            cost: new Decimal(8.4e64), 
            unlocked() { return ((hasUpgrade("m", 112)) && (hasUpgrade("m", 122)) && (hasUpgrade("m", 132))) },
        },
        133: {
            title: "PU 2^3",
            description: "^1.03 Era Crystals",
            cost: new Decimal(6.4e64), 
            unlocked() { return ((hasUpgrade("m", 112)) && (hasUpgrade("m", 122)) && (hasUpgrade("m", 132))) },
        },
        114: {
            title: "BBIV",
            description: "Supreme Buyables 1,3,4 are stronger",
            cost: new Decimal(3e66), 
            unlocked() { return  ((hasUpgrade("m", 113)) && (hasUpgrade("m", 123)) && (hasUpgrade("m", 133))) },
        },
        124: {
            title: "MMIX",
            description: "xe3e15 MP",
            cost: new Decimal(3e66), 
            unlocked() { return ((hasUpgrade("m", 113)) && (hasUpgrade("m", 123)) && (hasUpgrade("m", 133))) },
        },
        134: {
            title: "PU 2^3 +1 / 3^2",
            description: "+^0.03 Rebirth Points",
            cost: new Decimal(3e66), 
            unlocked() { return ((hasUpgrade("m", 113)) && (hasUpgrade("m", 123)) && (hasUpgrade("m", 133))) },
        },
        115: {
            title: "BB V",
            description: "Supreme Buyables 1,3,4 are stronger",
            cost: new Decimal(3.75e67), 
            unlocked() { return  ((hasUpgrade("m", 113)) && (hasUpgrade("m", 123)) && (hasUpgrade("m", 133))) },
        },
        125: {
            title: "MM 2x5",
            description: "xe1e14 Energy",
            cost: new Decimal(3.5e67), 
            unlocked() { return ((hasUpgrade("m", 113)) && (hasUpgrade("m", 123)) && (hasUpgrade("m", 133))) },
        },
        135: {
            title: "PU X",
            description: "^1.015 PF",
            cost: new Decimal(4e67), 
            unlocked() { return ((hasUpgrade("m", 113)) && (hasUpgrade("m", 123)) && (hasUpgrade("m", 133))) },
        },

        1111: {
            title: "The Second Completion",
            description: "In mastery challenges, reduce EC and Mastery Points nerf from ^0.1 to ^0.12",
            cost: new Decimal(250000), 
            unlocked() { return (inChallenge("m", 11) && hasAchievement("a", 243)) },
        },
        1112: {
            title: "Choose [1]",
            description: "^1.05 PF. x1.2 Mastery Points",
            cost: new Decimal(700000), 
            unlocked() { return (inChallenge("m", 11) && hasUpgrade("m", 1111)) },
        },
        1113: {
            title: "Choose [2]",
            description: "+^0.15 SP and Water. x1.3 Mastery Points",
            cost: new Decimal(750000), 
            unlocked() { return (inChallenge("m", 11) && hasUpgrade("m", 1111)) },
        },
        1114: {
            title: "Choose [3]",
            description: "EC boosts Mastery much more",
            cost: new Decimal(800000), 
            unlocked() { return (inChallenge("m", 11) && hasUpgrade("m", 1111)) },
        },
        1115: {
            title: "Choose [4]",
            description: "Reduce Prestige Softcap. x1.5 Mastery Points",
            cost: new Decimal(900000), 
            unlocked() { return (inChallenge("m", 11) && hasUpgrade("m", 1111)) },
        },
        1121: {
            title: "Less Nerfage",
            description: "In mastery challenges, reduce EC and Mastery Points nerf from ^0.12 to ^0.14",
            cost: new Decimal(1e6), 
            unlocked() { return (inChallenge("m", 11) && hasUpgrade("m", 1112) && hasUpgrade("m", 1113) && hasUpgrade("m", 1114) && hasUpgrade("m", 1115)) },
        },
        1122: {
            title: "Even Less Nerfage",
            description: "In mastery challenges, reduce EC and Mastery Points nerf from ^0.14 to ^0.16",
            cost: new Decimal(7e6), 
            unlocked() { return (inChallenge("m", 11) && hasUpgrade("m", 1121)) },
        },
        1123: {
            title: "Just MORE.",
            description: "In mastery challenges, reduce PF nerf from ^0.1 to ^0.111",
            cost: new Decimal(1.6e8), 
            unlocked() { return (inChallenge("m", 11) && hasUpgrade("m", 1122)) },
        },
        1124: {
            title: "BOOST of PF",
            description: "xe1.17e17 PF",
            cost: new Decimal(2.5e8), 
            unlocked() { return (inChallenge("m", 11) && hasUpgrade("m", 1123)) },
        },
        1125: {
            title: "Hyper Less Nerfage",
            description: "In MC1, reduce Mastery Points nerf from ^0.16 to ^0.2!",
            cost: new Decimal(2.75e8), 
            unlocked() { return (inChallenge("m", 11) && hasUpgrade("m", 1124)) },
        },
        1131: {
            title: "Powering Intelligence",
            description: "+^0.05 Basic-Mega Points",
            cost: new Decimal(1.2e10), 
            unlocked() { return (inChallenge("m", 11) && hasUpgrade("m", 1125)) },
        },
        1132: {
            title: "Less electric boundaries",
            description: "In MC1, reduce Energy nerf from ^0.4 to ^0.75!",
            cost: new Decimal(1.4e10), 
            unlocked() { return (inChallenge("m", 11) && hasUpgrade("m", 1131)) },
        },
        1133: {
            title: "Tri-Less Nerfage",
            description: "In MC1, reduce PF nerf from ^0.111 to ^0.12, Mastery Points from ^0.2 to ^0.23 and EC from ^0.16 to ^0.18!",
            cost: new Decimal(1.5e10), 
            unlocked() { return (inChallenge("m", 11) && hasUpgrade("m", 1132)) },
        },
        1134: {
            title: "2^38",
            description: "+0.038 SB5 cap, ^1.038 PF, Increase Era Buyable 4 softcap start to 38",
            cost: new Decimal(2).pow(38), 
            unlocked() { return (inChallenge("m", 11) && hasUpgrade("m", 1133)) },
        },
        1135: {
            title: "The Last MC1x2 Upgrade",
            description: "^1.11 PF",
            cost: new Decimal(7.5e11), 
            unlocked() { return (inChallenge("m", 11) && hasUpgrade("m", 1134)) },
        },
    },
    challenges: {
        11: {
            name: "Mastery Challenge 1. [OP Reward]",
            challengeDescription() { 
                let cd = "^0.1 PF, ^0.2 BP to MP, ^0.1 Mastery Points, ^0.4 Energy to SP. "
                let ec = "You are currently not recommended to enter this challenge."
                if ((challengeCompletions("m", 11) == 1) && (hasAchievement("a", 243))) ec = "You are recommended to enter this challenge to progress."
                if ((challengeCompletions("m", 11) == 0) && (hasUpgrade("m", 15) && hasUpgrade("m", 25) && hasUpgrade("m", 35))) ec = "You are recommended to enter this challenge to progress."
                if ((challengeCompletions("m", 11) == 2)) ec = "You have the maximum amount of completions of this challenge."
                cd = cd + ec + " You completed this challenge " + (challengeCompletions("m", 11)) + " times."
                return cd
            },
            goal(){
                if (challengeCompletions("m", 11) == 0) return new Decimal("e29880000");
                if (challengeCompletions("m", 11) == 1) return new Decimal("e1.9302786560611e19"); // placeholder
            },
            unlocked() { 
                return (hasUpgrade("m", 15) && hasUpgrade("m", 25) && hasUpgrade("m", 35)) 
            },
            currencyDisplayName: "points",
            completionLimit: 2,
            rewardDescription() {
                let rd = "First Completion: Unlock new Mastery Upgrades, a BIG exponent to PF gain."
                if (challengeCompletions("m", 11) == 1) rd = rd + " Second Completion: Unlock more Mastery Upgrades, ^1.0333 PF, x1e9 Mastery Points."
                return rd
            },
            onEnter() {
                player.m.points = new Decimal(0)
            }
        },
        12: {
            name: "Mastery Challenge 2.",
            challengeDescription() { 
                let cd = "Sacrifice Cost Scaling is now increased from 3.6 to 7.5 exponent. "
                let ec = "You are recommended to enter this challenge to progress."
                if ((challengeCompletions("m", 12) == 1)) ec = "You have the maximum amount of completions of this challenge."
                cd = cd + ec + " You completed this challenge " + (challengeCompletions("m", 12)) + " time."
                return cd
            },
            canComplete: function() {return player.points.gte("e81643000000")},
            goalDescription: "Get e81.643B PF.",
            rewardDescription: "Unlock new Mastery Upgrades and x10,000 Mastery Points, Sac Scaling decreased to 3.5, but you cannot enter sacrifice challenges",
            unlocked() { return hasAchievement("a", 182) },
            onEnter() {
                player.m.points = new Decimal(0)
            }
        },
    },
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        let base = new Decimal(1)
        // base
        if (hasUpgrade('m', 11)) base = new Decimal(3)
        if (hasUpgrade('m', 12)) base = new Decimal(5)
        if (hasUpgrade('m', 15)) base = new Decimal(12)
        if (hasUpgrade('m', 44)) base = new Decimal(85)
        if (hasUpgrade('m', 73)) base = new Decimal(2500)
        if (hasUpgrade('m', 75)) base = new Decimal(5e6)
        // mult
        if (hasUpgrade('m', 42)) mult = mult.times(upgradeEffect('m', 42))
        if (hasUpgrade('m', 13)) mult = mult.times(2.5)
        if (hasUpgrade('m', 14)) mult = mult.times(4)
        if (hasUpgrade('m', 41)) mult = mult.times(5)
        if (hasUpgrade('m', 43)) mult = mult.times(9)
        if (hasUpgrade('m', 45)) mult = mult.times(100)
        if (hasUpgrade('m', 11)) mult = mult.times(base)
        if (hasAchievement('sa', 31)) mult = mult.times(1.05)
        if (hasAchievement('sa', 34)) mult = mult.times(1.01)
        if (hasAchievement('sa', 35)) mult = mult.times(1.03)
        if (hasAchievement('sa', 36)) mult = mult.times(1.07)
        if (hasUpgrade("w", 54)) {
            if (hasChallenge("m", 11)) mult = mult.times(100)
        }
        if (hasChallenge("m", 12)) mult = mult.times(10000)
        if (hasUpgrade('m', 71)) mult = mult.times(78.2)
        if (hasAchievement('a', 183)) mult = mult.times(3.4)
        if (hasUpgrade('m', 74)) mult = mult.times(420)
        if (hasMilestone('sac', 93)) mult = mult.times(1e10)
        if (hasUpgrade('m', 103)) mult = mult.times(upgradeEffect('m', 103))
        let mpow = new Decimal(0.3)
        if (hasUpgrade("m", 113)) mpow = new Decimal(0.4)
        if (hasAchievement('a', 232)) mult = mult.times(buyableEffect('era', 13).pow(mpow))
        if (inChallenge("m", 11)) {
            if (hasUpgrade("m", 1112)) mult = mult.times(1.2)
            if (hasUpgrade("m", 1113)) mult = mult.times(1.3)
            if (hasUpgrade("m", 1115)) mult = mult.times(1.5)
        }
        if (challengeCompletions("m", 11) == 2) mult = mult.times(1e9)
        if ((hasUpgrade("m", 111)) && (hasUpgrade("m", 121)) && (hasUpgrade("m", 131))) mult = mult.times(10)
        if ((hasUpgrade("m", 112)) && (hasUpgrade("m", 122)) && (hasUpgrade("m", 132))) mult = mult.times(10)
        if ((hasUpgrade("m", 113)) && (hasUpgrade("m", 123)) && (hasUpgrade("m", 133))) mult = mult.times(10)
        if ((hasUpgrade("m", 114)) && (hasUpgrade("m", 124)) && (hasUpgrade("m", 134))) mult = mult.times(10)
        if ((hasUpgrade("m", 115)) && (hasUpgrade("m", 125)) && (hasUpgrade("m", 135))) mult = mult.times(10)
        if (hasAchievement('a', 245)) mult = mult.times(61)
        if (inChallenge("m", 11)) mult = mult.pow(buyableEffect('era', 21))
        player.m.mpps = mult
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade('mega', 94)) exp = exp.add(0.005)
        let expinmc1 = new Decimal(0.1)
        if (hasUpgrade("m", 1111)) expinmc1 = new Decimal(0.12)
        if (hasUpgrade("m", 1121)) expinmc1 = new Decimal(0.14)
        if (hasUpgrade("m", 1122)) expinmc1 = new Decimal(0.16)
        if (hasUpgrade("m", 1125)) expinmc1 = new Decimal(0.2)
        if (hasUpgrade("m", 1133)) expinmc1 = new Decimal(0.23)
        if (inChallenge('m', 11)) exp = exp.mul(expinmc1)
        player.m.mpps = player.m.mpps.pow(exp)
        return exp
    },
    branches: ["s", "sac", "w"],
    row: 7, // Row the layer is in on the tree (0 is the first row)
})