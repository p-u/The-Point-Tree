addLayer("m", {
    name: "Mastery", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MAS", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { 
        return {
            unlocked: true,
		    points: new Decimal(0),
            mpps: new Decimal(0),
            rngpower: new Decimal(0.01),
            totalUps: new Decimal(0),
            lastUps: new Decimal(0),
            ma153t: 0,
            hyper: false,
            ranks: {
                rid: 0,
                suffixid: 3,
            },
        }
    },
    layerShown(){
        let visible = false
        if (((hasMilestone('sac', 42)) || (inChallenge("m", 11))) || (inChallenge("m", 12))|| (inChallenge("m", 13))|| (hasChallenge("m", 11))) visible = true
       return visible
    },
    passiveGeneration() {
        if (hasMilestone('sac', 42) || inChallenge('m', 11)) return 1
        if (inChallenge('m', 11)) return 1
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
                        if (inChallenge("m", 11)) a = a + "<br><br>All non-Mastery Challenge 1 upgrades are locked (cannot be bought/seen) in Mastery Challenge 1 since MC1 just gives too much Mastery Points!"
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
                ["display-text", "To unlock the first challenge, you need MMP5, UB5, PFP5 and the achievement 'Energy Overload'."],
                "blank",
                "challenges",
            ],
            unlocked() {return (hasUpgrade("m", 15) && hasUpgrade("m", 25) && hasUpgrade("m", 35))}
        },
        "Mastery Ranks": {
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
                ["display-text",
                    function(){
                        let a = "<h2>Your rank is "
                        a = a + rankName()
                        a = a + " (#" + player.m.ranks.rid + ")</h2>"
                        return a
                    }
                ],
                "blank",
                ["buyable",11],
                "blank",
                ["display-text",
                    function(){
                        let a = "<h3>Boosts:</h3>"
                        return a
                    }
                ],
                "blank",
                "blank",
                ["display-text",
                    function(){
                        let bs = 1.6
                        if (hasUpgrade("m", 1004)) bs = 1.65
                        let a = `<h3>x${notationChooser(new Decimal(bs).pow(player.m.ranks.rid))} `
                        a = a + `<h2><span style="color: red; text-shadow: 0px 0px 10px #fa9c93; font-family: Lucida Console, Courier New, monospace">
                            Mastery Points</span></h2>`
                        return a
                    }
                ],
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        if (inChallenge("m", 11)) {
                            let mrankcap = 2
                            if (hasUpgrade("m", 1011)) mrankcap = 3
                            if (hasUpgrade("m", 1022)) mrankcap = 5
                            if (hasUpgrade("m", 1025)) mrankcap = 6
                            a = a + `<h3>^${getBuyableAmount("m", 11).mul(0.01).add(0.98).min(mrankcap)} `
                            a = a + `<h2>Point Fragments</span></h2> (ONLY APPLICABLE IN MASTERY CHALLENGE 1)`
                            if (player.m.ranks.rid < 3) {
                                a = "To Unlock, your rank has to be " + rankName(3) + " (#3) or higher!"
                            }
                        }
                        return a
                    }
                ],
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        if (inChallenge("m", 11)) {
                            let unlocks = [9, 14, 29, 64, 111, 130, 158, 169, 210, 242, 274, 300, 365]
                            let rid = player.m.ranks.rid
                            let b = 1 + unlocks.filter(x => rid >= x).length
                            let next = unlocks.find(x => rid < x)

                            a += `<h3>Unlock ${b} `
                            a += `<h2><span style="color: red; text-shadow: 0px 0px 10px #fa9c93; font-family: Lucida Console, Courier New, monospace">new Mastery Upgrades</span></h2> (ONLY APPLICABLE IN MASTERY CHALLENGE 1)`

                            if (rid < 5) {
                                a = "To Unlock, your rank has to be " + rankName(5) + " (#5) or higher!"
                            } else if (next !== undefined) {
                                a += `<br>Next unlock at ${rankName(next)} (#${next})!`
                            } else {
                                a += `<br>All upgrades unlocked! (MAXED)`
                            }
                        }
                        return a
                    }
                ],
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        if (inChallenge("m", 11)) {
                            let bsa = 1.5
                            a = `<h3>x${notationChooser(new Decimal(bsa).pow(player.m.ranks.rid - 120))} `
                            a = a + `<h2><span style="color: blue; text-shadow: 0px 0px 10px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                                Era Crystals</span></h2>`
                            if (player.m.ranks.rid < 125) {
                                a = "To Unlock, your rank has to be " + rankName(125) + " (#125) or higher!"
                            }
                        }
                        return a
                    }
                ],
            ],
            unlocked() {return (inChallenge("m", 11))}
        },
    },
    color: "red",
    requires(){
        if (inChallenge('m', 11) && hasMilestone("sac", 13)) return new Decimal(13)
        return new Decimal(71)
    }, // Can be a function that takes requirement increases into account
    resource: "Mastery Points", // Name of currency
    baseResource: "Sacrifice", // Name of resource prestige is based on
    baseAmount() {return player.sac.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0000000000000000001,  // Balance is needed. 
    upgrades: {
        11: {
            title: "MMP (More Mastery Points) 1",
            description: "Increase base mastery points to 3 a sec",
            cost: new Decimal(50),
            unlocked() {return (!(inChallenge("m", 11)))}
        },
        21: {
            title: "PFP (PF Power) 1",
            description: "^1.02 PF",
            cost: new Decimal(80),
            unlocked() {return (!(inChallenge("m", 11)))}
        },
        31: {
            title: "UB (Upgrade Boost) 1",
            description: "MU31 is stronger",
            cost: new Decimal(110),
            unlocked() {return (!(inChallenge("m", 11)))}
        },
        12: {
            title: "MMP 2",
            description: "Increase base mastery points to 6 a sec",
            cost: new Decimal(180),
            unlocked() { return (hasUpgrade("m", 11) && hasUpgrade("m", 21) && hasUpgrade("m", 31) && (!(inChallenge("m", 11)))) },
        },
        22: {
            title: "PFP 2",
            description: "^1.02 PF",
            cost: new Decimal(100),
            unlocked() { return (hasUpgrade("m", 11) && hasUpgrade("m", 21) && hasUpgrade("m", 31) && (!(inChallenge("m", 11)))) },
        },
        32: {
            title: "UB 2",
            description: "SU21, 51 and 52 is boosted.",
            cost: new Decimal(150),
            unlocked() { return (hasUpgrade("m", 11) && hasUpgrade("m", 21) && hasUpgrade("m", 31) && (!(inChallenge("m", 11)))) },
        },
        13: {
            title: "MMP 3",
            description: "Multiply Mastery Points by 2.5",
            cost: new Decimal(300),
            unlocked() { return (hasUpgrade("m", 12) && hasUpgrade("m", 22) && hasUpgrade("m", 32) && (!(inChallenge("m", 11)))) },
        },
        23: {
            title: "PFP 3",
            description: "^1.03 PF",
            cost: new Decimal(400),
            unlocked() { return (hasUpgrade("m", 12) && hasUpgrade("m", 22) && hasUpgrade("m", 32) && (!(inChallenge("m", 11)))) },
        },
        33: {
            title: "UB 3",
            description: "BB3 is boosted.",
            cost: new Decimal(500),
            unlocked() { return (hasUpgrade("m", 12) && hasUpgrade("m", 22) && hasUpgrade("m", 32) && (!(inChallenge("m", 11)))) },
        },
        14: {
            title: "MMP 4",
            description: "Multiply Mastery Points by 4",
            cost: new Decimal(800),
            unlocked() { return (hasUpgrade("m", 13) && hasUpgrade("m", 23) && hasUpgrade("m", 33) && (!(inChallenge("m", 11)))) },
        },
        24: {
            title: "PFP 4",
            description: "^1.025 PF",
            cost: new Decimal(1500),
            unlocked() { return (hasUpgrade("m", 13) && hasUpgrade("m", 23) && hasUpgrade("m", 33) && (!(inChallenge("m", 11)))) },
        },
        34: {
            title: "UB 4",
            description: "Energy effect is boosted tremendously",
            cost: new Decimal(2750),
            unlocked() { return (hasUpgrade("m", 13) && hasUpgrade("m", 23) && hasUpgrade("m", 33) && (!(inChallenge("m", 11)))) },
        },
        15: {
            title: "MMP 5",
            description: "Mastery Point Base is increased to 16/s.",
            cost: new Decimal(3000),
            unlocked() { return (hasUpgrade("m", 14) && hasUpgrade("m", 24) && hasUpgrade("m", 34) && (!(inChallenge("m", 11)))) },
        },
        25: {
            title: "PFP 5",
            description: "^1.05 PF",
            cost: new Decimal(7500),
            unlocked() { return (hasUpgrade("m", 14) && hasUpgrade("m", 24) && hasUpgrade("m", 34) && (!(inChallenge("m", 11)))) },
        },
        35: {
            title: "UB 5",
            description: "All Supreme Buyables are boosted.",
            cost: new Decimal(7000),
            unlocked() { return (hasUpgrade("m", 14) && hasUpgrade("m", 24) && hasUpgrade("m", 34) && (!(inChallenge("m", 11)))) },
        },
        41: {
            title: "MMP 6",
            description: "Pentuple Mastery Point Gain. You might want to get the 'Break Infinity' Water Upgrade first...",
            cost: new Decimal(700000),
            unlocked() { return (hasChallenge("m", 11) && (!(inChallenge("m", 11)))) },
        },
        51: {
            title: "MM (Many Mult) 1",
            description: "xe100e3 MP",
            cost: new Decimal(2000000),
            unlocked() { return (hasChallenge("m", 11)) && (!(inChallenge("m", 11))) },
        },
        61: {
            title: "UB 6",
            description: "SU64 is boosted.",
            cost: new Decimal(1750000),
            unlocked() { return (hasChallenge("m", 11) && (!(inChallenge("m", 11)))) },
        },
        42: {
            title: "MMP 7",
            description: "Mastery Points gets boosted based on itself (Compounding XI / 11)",
            cost: new Decimal(3500000),
            unlocked() { return (hasUpgrade("m", 41) && hasUpgrade("m", 51) && hasUpgrade("m", 61) && (!(inChallenge("m", 11)))) },
            main() {
                mmp6exp = 0.111
                if (hasUpgrade('m', 72)) mmp6exp = 0.139
                if (hasUpgrade('s', 122)) mmp6exp = 0.157
                if (hasUpgrade("era", 313)) mmp6exp = 0.176
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
            description: "xe20e6 BP",
            cost: new Decimal(15000000),
            unlocked() { return (hasUpgrade("m", 41) && hasUpgrade("m", 51) && hasUpgrade("m", 61) && (!(inChallenge("m", 11)))) },
        },
        62: {
            title: "UB 7",
            description: "MU31 is boosted.",
            cost: new Decimal(17500000),
            unlocked() { return (hasUpgrade("m", 41) && hasUpgrade("m", 51) && hasUpgrade("m", 61) && (!(inChallenge("m", 11)))) },
        },
        43: {
            title: "MMP 8",
            description: "x9 Mastery Points",
            cost: new Decimal(30000000),
            unlocked() { return (hasUpgrade("m", 42) && hasUpgrade("m", 52) && hasUpgrade("m", 62) && (!(inChallenge("m", 11)))) },
        },
        53: {
            title: "MM 3",
            description: "xe70e6 PF",
            cost: new Decimal(250000000),
            unlocked() { return (hasUpgrade("m", 42) && hasUpgrade("m", 52) && hasUpgrade("m", 62) && (!(inChallenge("m", 11)))) },
        },
        63: {
            title: "UB 8",
            description: "Supreme Buyables are stronger, again",
            cost: new Decimal(15000000),
            unlocked() { return (hasUpgrade("m", 42) && hasUpgrade("m", 52) && hasUpgrade("m", 62)) && (!(inChallenge("m", 11))) },
        },
        44: {
            title: "MMP 9",
            description: "Increase base to 95/s",
            cost: new Decimal(300000000),
            unlocked() { return (hasUpgrade("m", 43) && hasUpgrade("m", 53) && hasUpgrade("m", 63) && (!(inChallenge("m", 11)))) },
        },
        54: {
            title: "MM 4",
            description: "xe2.5e6 PP",
            cost: new Decimal(2e9),
            unlocked() { return (hasUpgrade("m", 43) && hasUpgrade("m", 53) && hasUpgrade("m", 63) && (!(inChallenge("m", 11)))) },
        },
        64: {
            title: "UB 9",
            description: "SU21 is stronger",
            cost: new Decimal(1.3e9),
            unlocked() { return (hasUpgrade("m", 43) && hasUpgrade("m", 53) && hasUpgrade("m", 63) && (!(inChallenge("m", 11)))) },
        },
        45: {
            title: "MMP 10",
            description: "x100 Mastery Points",
            cost: new Decimal(3.9e9),
            unlocked() { return (hasUpgrade("m", 44) && hasUpgrade("m", 54) && hasUpgrade("m", 64) && (!(inChallenge("m", 11)))) },
        },
        55: {
            title: "MM 5: Wow, that's crazy.",
            description: "xe130e6 PF",
            cost: new Decimal(700e9),
            unlocked() { return (hasUpgrade("m", 44) && hasUpgrade("m", 54) && hasUpgrade("m", 64) && (!(inChallenge("m", 11)))) },
        },
        65: {
            title: "UB 10: Finally! Some love!",
            description: "ALL MEGA BUYABLES ARE STRONGER!",
            cost: new Decimal(350e9),
            unlocked() { return (hasUpgrade("m", 44) && hasUpgrade("m", 54) && hasUpgrade("m", 64) && (!(inChallenge("m", 11)))) },
        },
        71: {
            title: "MMP XI",
            description: "Mastery Point gain x78.2",
            cost: new Decimal(1.4e16),
            unlocked() { return (hasChallenge("m", 12) && (!(inChallenge("m", 11)))) },
        },
        81: {
            title: "PU [Power UP] 1",
            description: "Water Gain +^0.1",
            cost: new Decimal(1e18),
            unlocked() { return (hasChallenge("m", 12) && (!(inChallenge("m", 11)))) },
        },
        91: {
            title: "SR [Softcap Reduction] 1",
            description: "Reduce Mega Layer effect softcap",
            cost: new Decimal(1.6e18),
            unlocked() { return (hasChallenge("m", 12) && (!(inChallenge("m", 11)))) },
        },
        72: {
            title: "MMP 12",
            description: "Mastery Upgrade 42 is stronger",
            cost: new Decimal(2.25e18),
            unlocked() { return (hasUpgrade("m", 71) && hasUpgrade("m", 81) && hasUpgrade("m", 91) && (!(inChallenge("m", 11)))) },
        },
        82: {
            title: "PU 2",
            description: "^1.01 PF",
            cost: new Decimal(1.5e18),
            unlocked() { return (hasUpgrade("m", 71) && hasUpgrade("m", 81) && hasUpgrade("m", 91) && (!(inChallenge("m", 11)))) },
        },
        92: {
            title: "SR 2",
            description: "Reduce Energy Upg 14 softcap",
            cost: new Decimal(1e18),
            unlocked() { return (hasUpgrade("m", 71) && hasUpgrade("m", 81) && hasUpgrade("m", 91) && (!(inChallenge("m", 11)))) },
        },
        73: {
            title: "MMP 13",
            description: "Increase base to 2,500/sec",
            cost: new Decimal(1e19),
            unlocked() { return (hasUpgrade("m", 72) && hasUpgrade("m", 82) && hasUpgrade("m", 92) && (!(inChallenge("m", 11)))) },
        },
        83: {
            title: "PU 3",
            description: "MP +^0.05",
            cost: new Decimal(3e20),
            unlocked() { return (hasUpgrade("m", 72) && hasUpgrade("m", 82) && hasUpgrade("m", 92) && (!(inChallenge("m", 11)))) },
        },
        93: {
            title: "SR 3",
            description: "Mega Upgrade 84 softcap is reduced",
            cost: new Decimal(2e20),
            unlocked() { return (hasUpgrade("m", 72) && hasUpgrade("m", 82) && hasUpgrade("m", 92) && (!(inChallenge("m", 11)))) },
        },
        74: {
            title: "MMP 14",
            description: "x420 Mastery Points",
            cost: new Decimal(2.5e21),
            unlocked() { return (hasUpgrade("m", 73) && hasUpgrade("m", 83) && hasUpgrade("m", 93) && (!(inChallenge("m", 11)))) },
        },
        84: {
            title: "PU 4",
            description: "SP +^0.05",
            cost: new Decimal(1.7e24),
            unlocked() { return (hasUpgrade("m", 73) && hasUpgrade("m", 83) && hasUpgrade("m", 93) && (!(inChallenge("m", 11)))) },
        },
        94: {
            title: "SR 4",
            description: "PU22 softcap is reduced",
            cost: new Decimal(2e24),
            unlocked() { return (hasUpgrade("m", 73) && hasUpgrade("m", 83) && hasUpgrade("m", 93) && (!(inChallenge("m", 11)))) },
        },
        75: {
            title: "MMP 15",
            description: "Increase Mastery Points base to 5M/sec!",
            cost: new Decimal(2.5e24),
            unlocked() { return (hasUpgrade("m", 74) && hasUpgrade("m", 84) && hasUpgrade("m", 94) && (!(inChallenge("m", 11)))) },
        },
        85: {
            title: "PU 5",
            description: "^1.015 PF",
            cost: new Decimal(1.35e28),
            unlocked() { return (hasUpgrade("m", 74) && hasUpgrade("m", 84) && hasUpgrade("m", 94) && (!(inChallenge("m", 11)))) },
        },
        95: {
            title: "SR 5",
            description: "BU32 softcap is reduced",
            cost: new Decimal(9.5e27),
            unlocked() { return (hasUpgrade("m", 74) && hasUpgrade("m", 84) && hasUpgrade("m", 94) && (!(inChallenge("m", 11)))) },
        },
        101: {
            title: "Sac is even more OP",
            description: "SU21 and SU52 is better",
            cost: new Decimal(6.9e39), 
            unlocked() { return (hasMilestone("sac", 93) && (!(inChallenge("m", 11)))) },
        },
        102: {
            title: "More Mega = More Sacs",
            description: "Mega Exponent +^0.08",
            cost: new Decimal(9e39), 
            unlocked() { return (hasMilestone("sac", 93) && hasUpgrade("m", 101) && (!(inChallenge("m", 11)))) },
        },
        103: {
            title: "More EC = More Mastery",
            description: "EC boosts Mastery by a very little bit",
            cost: new Decimal(1e40), 
            unlocked() { return (hasMilestone("sac", 93) && hasUpgrade("m", 102) && (!(inChallenge("m", 11)))) },
            main() {
                ectomasteryexp = 0.06
                softcapDescriptionmast103 = ""
                sdsc = ""
                upgEffectmast103 = upgradeEffect(this.layer, this.id)
            },
            effect() {
                if (hasUpgrade("w", 75)) return player.era.ec.pow(0.0175)
                let eff = player["era"].ec.add(1).pow(ectomasteryexp).log(1.8)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionmast103
            },
            tooltip() {
                if (hasUpgrade("w", 75)) {
                    return "Formula: EC^0.0175"
                } else {
                    return "Formula: log1.8((EC + 1)^"  + ectomasteryexp + ") " + sdsc
                }
            },
        },
        104: {
            title: "More Rebirth = More PF",
            description: "RP Exponent +^0.04",
            cost: new Decimal(1.4e41), 
            unlocked() { return (hasMilestone("sac", 93) && hasUpgrade("m", 103) && (!(inChallenge("m", 11)))) },
        },
        105: {
            title: "Multi-dimensional-fold upgrade",
            description: "xe1e15 PF, unlock more Era upgrades, x100 EC",
            cost: new Decimal(2.4e41), 
            unlocked() { return (hasMilestone("sac", 93) && hasUpgrade("m", 104) && (!(inChallenge("m", 11)))) },
        },
        111: {
            title: "BB [Buyable Boost] I",
            description: "Mega Buyable 2 is stronger. [Every set of upgrades has a combo of x10 Mastery Points]",
            cost: new Decimal(1.16e62).div(75).times(1.7), 
            unlocked() { return ((challengeCompletions("m", 11) == 2) && hasUpgrade("m", 105) && (!(inChallenge("m", 11)))) },
        },
        121: {
            title: "MM 6",
            description: "xee12 Supreme Points",
            cost: new Decimal(8.5e61).div(75).times(1.7), 
            unlocked() { return ((challengeCompletions("m", 11) == 2) && hasUpgrade("m", 105) && (!(inChallenge("m", 11)))) },
        },
        131: {
            title: "PU 6",
            description: "+^0.0125 Basic Points",
            cost: new Decimal(9.2e61).div(75).times(1.7), 
            unlocked() { return ((challengeCompletions("m", 11) == 2) && hasUpgrade("m", 105) && (!(inChallenge("m", 11)))) },
        },
        112: {
            title: "BB II",
            description: "SB5 HC +^0.01",
            cost: new Decimal(2.25e63).div(75).times(1.7), 
            unlocked() { return ((hasUpgrade("m", 111)) && (hasUpgrade("m", 121)) && (hasUpgrade("m", 131)) && (!(inChallenge("m", 11)))) },
        },
        122: {
            title: "MM VII",
            description: "xe2e16 Pres Pts",
            cost: new Decimal(2.25e63).div(75).times(1.7), 
            unlocked() { return ((hasUpgrade("m", 111)) && (hasUpgrade("m", 121)) && (hasUpgrade("m", 131)) && (!(inChallenge("m", 11)))) },
        },
        132: {
            title: "PU 7",
            description: "+^0.015 Basic Points",
            cost: new Decimal(3e63), 
            unlocked() { return ((hasUpgrade("m", 111)) && (hasUpgrade("m", 121)) && (hasUpgrade("m", 131)) && (!(inChallenge("m", 11)))) },
        },
        113: {
            title: "BB III",
            description: "Era Buyable 3 Mastery Points boost is stronger (^0.3 to ^0.4)",
            cost: new Decimal(4.567e64).div(75).times(1.7), 
            unlocked() { return  ((hasUpgrade("m", 112)) && (hasUpgrade("m", 122)) && (hasUpgrade("m", 132)) && (!(inChallenge("m", 11)))) },
        },
        123: {
            title: "MM VIII",
            description: "xe2.5e17 Point Fragments",
            cost: new Decimal(8e66).div(75).times(1.7), 
            unlocked() { return ((hasUpgrade("m", 112)) && (hasUpgrade("m", 122)) && (hasUpgrade("m", 132)) && (!(inChallenge("m", 11)))) },
        },
        133: {
            title: "PU 2^3",
            description: "^1.03 Era Crystals",
            cost: new Decimal(3.6e66), 
            unlocked() { return ((hasUpgrade("m", 112)) && (hasUpgrade("m", 122)) && (hasUpgrade("m", 132)) && (!(inChallenge("m", 11)))) },
        },
        114: {
            title: "BBIV",
            description: "Supreme Buyables 1,3,4 are stronger",
            cost: new Decimal(1.25e68).div(75).times(1.7), 
            unlocked() { return  ((hasUpgrade("m", 113)) && (hasUpgrade("m", 123)) && (hasUpgrade("m", 133)) && (!(inChallenge("m", 11)))) },
        },
        124: {
            title: "MMIX",
            description: "xe3e15 MP",
            cost: new Decimal(1.25e68).div(75).times(1.7), 
            unlocked() { return ((hasUpgrade("m", 113)) && (hasUpgrade("m", 123)) && (hasUpgrade("m", 133)) && (!(inChallenge("m", 11)))) },
        },
        134: {
            title: "PU 2^3 +1 / 3^2",
            description: "+^0.03 Rebirth Points",
            cost: new Decimal(1.25e68), 
            unlocked() { return ((hasUpgrade("m", 113)) && (hasUpgrade("m", 123)) && (hasUpgrade("m", 133)) && (!(inChallenge("m", 11)))) },
        },
        115: {
            title: "BB V",
            description: "Supreme Buyables 1,3,4 are stronger",
            cost: new Decimal(2e69).div(75).times(1.7), 
            unlocked() { return  ((hasUpgrade("m", 114)) && (hasUpgrade("m", 124)) && (hasUpgrade("m", 134)) && (!(inChallenge("m", 11)))) },
        },
        125: {
            title: "MM 2x5",
            description: "xe1e14 Energy",
            cost: new Decimal(2.25e69).div(75).times(1.7), 
            unlocked() { return  ((hasUpgrade("m", 114)) && (hasUpgrade("m", 124)) && (hasUpgrade("m", 134)) && (!(inChallenge("m", 11)))) },
        },
        135: {
            title: "PU X",
            description: "^1.015 PF",
            cost: new Decimal(2.5e69), 
            unlocked() { return  ((hasUpgrade("m", 114)) && (hasUpgrade("m", 124)) && (hasUpgrade("m", 134)) && (!(inChallenge("m", 11)))) },
        },
        141: {
            title: "Technology One: Increase Research Power [NOT SUPPOSED TO BE GOTTEN DIRECTLY AFTER MC3]",
            description: "For every Mastery Upgrade in this two rows (Row 14/15), x(Row/2)*Column MaP.",
            cost: new Decimal("6e113"), 
            unlocked() { return (hasUpgrade("era", 502) && (!(inChallenge("m", 11)))) },
        },
        142: {
            title: "Technology Two: Some good boosts to lift villagers' spirits...!",
            description: "This includes xe3e19 PP, x5000 EC",
            cost: new Decimal("6e114"), 
            unlocked() { return (hasUpgrade("m", 141) && (!(inChallenge("m", 11)))) },
        },
        143: {
            title: "Technology Three: Starting to become less bounded",
            description: "Reduce PP Insanitycap.",
            cost: new Decimal("2.8e119"), 
            unlocked() { return (hasUpgrade("m", 142) && (!(inChallenge("m", 11)))) },
        },
        144: {
            title: "Technology Four: Project Escape",
            description: "With your Computing and Engineering Knowledge, you build many robots that help to rescue people that is down there and still trapped by the Tsunami, and even build bigger/higher platforms! ^1.0075 PF.",
            cost: new Decimal("1.26e126"), 
            unlocked() { return (hasUpgrade("m", 143) && (!(inChallenge("m", 11)))) },
        },
        145: {
            title: "Technology Five: To survive, and thrive",
            description: "You boost the spirits of the injured, and survived. 'Compounding' and the 12th iteration of it is stronger.",
            cost: new Decimal("1e130"), 
            unlocked() { return (hasUpgrade("m", 144) && (!(inChallenge("m", 11)))) },
        },
        151: {
            title: "Oh great, another one",
            description: "Unlock Mega Buyable 5",
            cost: new Decimal("8e132"), 
            unlocked() { return (hasUpgrade("m", 145) && (!(inChallenge("m", 11)))) },
        },
        152: {
            title: "Hey, why am I still playing this game?",
            description: "Era Buyable 6, and Water layer effect is stronger",
            cost: new Decimal("1e137"), 
            unlocked() { return (hasUpgrade("m", 151) && (!(inChallenge("m", 11)))) },
        },
        153: {
            title: "The first real trade-off since when? Well, just think about it.",
            description: "-^0.03 BP but xALOT PF, also unlock Basic Upgrades Row 12. (The 'ALOT' boost increases since you bought this upgrade at a decreasing rate [log2], cap 150s for now)",
            cost: new Decimal(2e155), 
            unlocked() { return (hasUpgrade("m", 152) && (!(inChallenge("m", 11)))) },
        },
        154: {
            title: "ALOT -> AWHOLELOT",
            description: "The 'ALOT' boost is further powered by 1.1.",
            cost: new Decimal(1e163), 
            unlocked() { return (hasUpgrade("m", 153) && (!(inChallenge("m", 11)))) },
        },
        155: {
            title: "AWOLELOT -> EXTREMITY",
            description: "The 'ALOT' boost is further powered by 1.2...and also ^1.02 EC.",
            cost: new Decimal(3.3e172), 
            unlocked() { return (hasUpgrade("m", 154) && (!(inChallenge("m", 11)))) },
        },
        1001: {
            title: "Mastery Ranks are weak",
            description: "As god, I will make them stronger! Mastery Points are multiplied by Mastery Rank.",
            cost: new Decimal(11111), 
            unlocked() { return (inChallenge("m", 11) && player.m.ranks.rid >= 5) },
            effect() {
                let eff = new Decimal(player.m.ranks.rid)
                if (hasUpgrade("m", 1012)) eff = eff.pow(1 + (player.m.ranks.rid/100))
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x"
            },
            tooltip() {
                if (hasUpgrade("m", 1012)) return "Formula: xMasteryRankID^(1+MasteryRankID/100)"
                return "Formula: xMasteryRankID"
            },
        },
        1002: {
            title: "Mastery will find a way to overcome this nerf",
            description: "Mastery Challenge 1 nerf to Mastery Points is weaker (^0.7 to ^0.789)",
            cost: new Decimal(800000), 
            unlocked() { return (inChallenge("m", 11) && player.m.ranks.rid >= 9) },
        },
        1003: {
            title: "LeSSacaled",
            description: "Reduce Sacrifice scaling significantly.",
            cost: new Decimal(50e6), 
            unlocked() { return (inChallenge("m", 11) && player.m.ranks.rid >= 14) },
        },
        1004: {
            title: "FREE UPGRADE!!",
            description: `Every Mastery Rank boosts MaP by 1.65x instead of 1.6x! Also x75 Water. <p style="color: red;">IMMEDIATELY get the next Water Upgrade, then 2.5T+ Water afterwards, then get back Energy upgrades/Sacs to get the Energy Milestone.`,
            cost: new Decimal(0), 
            unlocked() { return (inChallenge("m", 11) && player.m.ranks.rid >= 29) },
        },
        1005: {
            title: "The push to the completion (Sac 20)!!",
            description: "+1% Mastery Points, and reduce Sacrifice Scaling.",
            cost: new Decimal(5e24), 
            unlocked() { return (inChallenge("m", 11) && player.m.ranks.rid >= 64) },
        },
        1011: {
            title: "The first MC1x2 Upgrade",
            description: "Era Crystals nerf in MC1 reduced ^0.1 -> ^0.11; Point Fragments exponent cap from Mastery Ranks increased ^2 -> ^3.",
            cost: new Decimal(1e88), 
            unlocked() { return (inChallenge("m", 11) && player.m.ranks.rid >= 111) },
        },
        1012: {
            title: "First is Best",
            description: "Boost the first Mastery Challenge 1 upgrade 'Mastery Ranks are Weak' by providing an exponent equal to 1 + MR/100.",
            cost: new Decimal(2e97), 
            unlocked() { return (inChallenge("m", 11) && player.m.ranks.rid >= 130) },
        },
        1013: {
            title: "A Mastery Point",
            description: "What can one singular Mastery Point do? Well, quite a lot. x10 Mastery Points AND Era Crystals.",
            cost: new Decimal(1), 
            unlocked() { return (inChallenge("m", 11) && player.m.ranks.rid >= 158) },
        },
        1014: {
            title: "One Goal: MORE.",
            description: "MC1-specific Era Buyable is 20% more effective, AND MC1 nerf to MaP reduced ^0.789 -> ^0.811",
            cost: new Decimal(5e115), 
            unlocked() { return (inChallenge("m", 11) && player.m.ranks.rid >= 169) },
        },
        1015: {
            title: "88 for the win.",
            description: "+88% Era Crystals, +0.88 Effective Sacrifice Strength",
            cost: new Decimal(1.41e141), 
            unlocked() { return (inChallenge("m", 11) && player.m.ranks.rid >= 210) },
        },
        1021: {
            title: "Simple yet potent.",
            description: "x50 Mastery Points. Also, you get another x15 Mastery Points when above 2T Era Crystals.",
            cost: new Decimal(1e157), 
            unlocked() { return (inChallenge("m", 11) && player.m.ranks.rid >= 242) },
        },
        1022: {
            title: "Extra Booster",
            description: "Starting from Rank 200, every 10 ranks after, you get an additional x2 MaP boost alongside the normal MaP boost from the rank itself. Also, Point Fragments cap from Mastery Ranks increased ^3 -> ^5.",
            cost: new Decimal(1e175), 
            unlocked() { return (inChallenge("m", 11) && player.m.ranks.rid >= 274) },
            effect() {
                let eff = new Decimal(2).pow(new Decimal(player.m.ranks.rid).max(200).div(10).floor().sub(20))
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x"
            },
            tooltip() {
                return "Formula: x2^(floor(MasteryRankID/10)-20)"
            },
        },
        1023: {
            title: "Rank 300: Req 300",
            description: "x300 Era Crystals. Furthermore, you get x300 Mastery Points when above 25T Era Crystals.",
            cost: new Decimal(300), 
            unlocked() { return (inChallenge("m", 11) && player.m.ranks.rid >= 300) },
        },
        1024: {
            title: "PI is the almighty constant",
            description: "^(1 + pi/200) Mastery Points.",
            cost: new Decimal(2.38e238), 
            unlocked() { return (inChallenge("m", 11) && player.m.ranks.rid >= 365) },
        },
        1025: {
            title: "PI is the almighty constant",
            description: "Point Fragments cap from Mastery Ranks increased ^5 -> ^6",
            cost: new Decimal("1e325"), 
            unlocked() { return (inChallenge("m", 11) && player.m.ranks.rid >= 480) },
        },
    },
    challenges: {
        11: {
            name: "Mastery Challenge 1.",
            challengeDescription() { 
                let cd = "Was the Sacrifice Challenges too easy? Why not implement all of them? But boosted? (Boosted MC1+3+4: BP, MP, Energy are <b>raised ^0.3</b>, PF is raised <b>^0.07</b>, EC is raised <b>^0.1</b>. RP, PP, SP, Water raised <b>^0.5</b>, MaP raised <b>^0.7</b>. For MC2, not only does Basic Upgrades 8 and 10 have no effect, but 2 and 3 also don't!) Good luck. Oh yeah, there are new Mastery upgrades and more Milestones waiting for ya...as well as a new MC1-specific feature...<br>"
                let ec = "You are currently not recommended to enter this challenge."
                if ((challengeCompletions("m", 11) == 1) && (hasAchievement("a", 243))) ec = "You are recommended to enter this challenge to progress."
                if ((challengeCompletions("m", 11) == 0) && (hasUpgrade("m", 15) && hasUpgrade("m", 25) && hasUpgrade("m", 35) && hasAchievement("a", 146))) ec = "You are recommended to enter this challenge to progress."
                if ((challengeCompletions("m", 11) == 2)) ec = "You have the maximum amount of completions of this challenge."
                cd = cd + ec + " You completed this challenge " + (challengeCompletions("m", 11)) + " times."
                return cd
            },
            goal(){
                if (challengeCompletions("m", 11) == 0) return new Decimal("e14118000"); // placeholder
                if (challengeCompletions("m", 11) == 1) return new Decimal("e4.08e18"); // placeholder
                if (challengeCompletions("m", 11) == 2) return new Decimal("eeeeeeeeeee4.08e18"); // placeholder
            },
            unlocked() { 
                return (hasUpgrade("m", 15) && hasUpgrade("m", 25) && hasUpgrade("m", 35) && hasAchievement("a", 146)) 
            },
            currencyDisplayName: "points",
            completionLimit: 2,
            rewardDescription() {
                let rd = "First Completion: Unlock new Mastery Upgrades, a BIG exponent to PF gain.<br>"
                if (challengeCompletions("m", 11) >= 1) rd = rd + " Second Completion: Unlock more Mastery Upgrades, ^1.0333 PF, x" + notationChooser(new Decimal("1e9")) + " Mastery Points."
                return rd
            },
            onEnter() {
                player.m.points = new Decimal(0)
            },
            style() {return {
                'width': '700px',
                'height': '350px'
            }},
        },
        12: {
            name: "Mastery Challenge 2.",
            challengeDescription() { 
                let cd = "Sacrifice Cost Scaling is now increased from 3.6 to 7.5 exponent. [Super Nerf: At e100e9 PF, PF gain ^0.1 and sacrifice exponent is permanently at 100.] "
                let ec = "You are recommended to enter this challenge to progress."
                if ((challengeCompletions("m", 12) == 1)) ec = "You have the maximum amount of completions of this challenge."
                cd = cd + ec + " You completed this challenge " + (challengeCompletions("m", 12)) + " times."
                return cd
            },
            canComplete: function() {return player.points.gte("e81643000000")},
            goalDescription() {
                let a = "Get "
                a = a + notationChooser(new Decimal("e8.1643e10"))
                a = a + " PF."
                return a
            },
            rewardDescription: "Unlock new Mastery Upgrades and x10,000 Mastery Points, Sac Scaling decreased to 3.5, but you cannot enter sacrifice challenges",
            unlocked() { return hasAchievement("a", 182) },
            onEnter() {
                player.m.points = new Decimal(0)
            },
            style() {return {
                'width': '700px',
                'height': '250px'
            }},
        },
        13: {
            name: "Mastery Challenge 3.",
            challengeDescription() { 
                let cd = "You have no control. (Its up to the RNGods). ALL CURRENCIES (EXCEPT SACRIFICE) ARE <b>NERFED TO A POWER<b>. The power increases slowly based on RNG, and ANY UPGRADES/MILESTONES/ERAS (EXCEPT CELL UPS/MS) GOTTEN DECREASES THE EXPONENT BY 1.2%. Also, EC is always at e100. (Expect longer upgrade times for this challenge, 38min Estimated Challenge Duration). "
                let ec = "You are recommended to enter this challenge to progress."
                if ((challengeCompletions("m", 13) == 1)) ec = "You have the maximum amount of completions of this challenge."
                cd = cd + ec + " You completed this challenge " + (challengeCompletions("m", 13)) + " times."
                return cd
            },
            canComplete: function() {return player.points.gte("e4.8e21")},
            goalDescription() {
                let a = "Get "
                a = a + notationChooser(new Decimal("e4.8e21"))
                a = a + " PF."
                return a
            },
            rewardDescription: "Unlock more ups woohoo! ^2 Cell Softcap start, x2 EF after nerf, ^1.01 PF, Triple RNG Points.",
            unlocked() { return ((hasMilestone("era", 103) || inChallenge("m", 13)) || (hasChallenge('m', 13))) },
            onEnter() {
                player.m.points = new Decimal(0)
            },
            style() {return {
                'width': '700px',
                'height': '350px'
            }},
        },
    },
    buyables: {
        11: {
            title: "<h1>Rank Up!<h1>",
            unlocked() { return (inChallenge('m', 11)) },
            cost(x) {
                exp = new Decimal(2)
                inc = new Decimal(0.004)
                if (x >= 30) inc.add(0.002)
                if (x>= 100) inc.add(0.06)
                if (x >= 13) {
                    exp = exp.add((x.sub(12)).mul(inc))
                }
                if (x < 500) {
                    if (x >= 100) {
                        return new Decimal(1e45).mul(exp.pow(x))
                    } else {
                        return new Decimal(1000).mul(exp.pow(x))
                    }
                } else {
                    return new Decimal("1e30888")
                }
            },
            display() {
                let leftover = tmp[this.layer].buyables[this.id].cost.sub(player.m.points)
                let c =  "<h2>Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Mastery Points." + "<br>Next Rank: " + rankName(player.m.ranks.rid+1) + ". </h2><br>"
                if (player.m.points.sub(tmp[this.layer].buyables[this.id].cost).lt(0))  c = c +  `<h3>Only ${notationChooser(leftover)} Mastery Points to go!</h3>`
                return c
            },
            canAfford() {
                return player.m.points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.m.points = player.m.points.sub(this.cost().mul(cost))
                player.m.ranks.rid += 1
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            tooltip() {
                return "Cost Formula: variable"
            },
            style() {return {
                'width': '600px',
                'height': '150px',
            }},
        },
    },
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        let base = new Decimal(1)
        // base
        if (hasUpgrade('m', 11)) base = new Decimal(3)
        if (hasUpgrade('m', 12)) base = new Decimal(6)
        if (hasUpgrade('m', 15)) base = new Decimal(16)
        if (hasUpgrade('m', 44)) base = new Decimal(95)
        if (hasUpgrade('m', 73)) base = new Decimal(2500)
        if (hasUpgrade('m', 75)) base = new Decimal(5e6)
        // mult
        if (hasUpgrade('m', 42)) mult = mult.times(upgradeEffect('m', 42))
        if (hasUpgrade('m', 13)) mult = mult.times(2.5)
        if (hasUpgrade('m', 14)) mult = mult.times(4)
        if (hasUpgrade('m', 41)) mult = mult.times(5)
        if (hasAchievement('sa', 186)) mult = mult.times(1.02)
        if (hasUpgrade('m', 43)) mult = mult.times(9)
        if (hasUpgrade('m', 45)) mult = mult.times(100)
        if (hasUpgrade('m', 141)) mult = mult.times(7)
        if (hasUpgrade('m', 142)) mult = mult.times(14)
        if (hasUpgrade('m', 143)) mult = mult.times(21)
        if (hasUpgrade('m', 144)) mult = mult.times(28)
        if (hasUpgrade('m', 145)) mult = mult.times(35)
        if (hasUpgrade('m', 151)) mult = mult.times(7.5)
        if (hasUpgrade('m', 152)) mult = mult.times(15)
        if (hasUpgrade('m', 153)) mult = mult.times(22.5)
        if (hasUpgrade('m', 154)) mult = mult.times(30)
        if (hasUpgrade('m', 155)) mult = mult.times(37.5)
        if (hasUpgrade('m', 11)) mult = mult.times(base)
        if (hasAchievement('sa', 31)) mult = mult.times(1.05)
        if (hasAchievement('sa', 34)) mult = mult.times(1.02)
        if (hasAchievement('sa', 35)) mult = mult.times(1.04)
        if (hasAchievement('sa', 36)) mult = mult.times(1.07)
        if (hasUpgrade("w", 54)) {
            if (hasChallenge("m", 11)) mult = mult.times(100)
        }
        if (hasMilestone("sa", 16)) mult = mult.times(1.25)
        if (hasChallenge("m", 12)) mult = mult.times(10000)
        if (hasUpgrade('m', 71)) mult = mult.times(78.2)
        if (hasAchievement('a', 183)) mult = mult.times(3.4)
        if (hasUpgrade('m', 74)) mult = mult.times(420)
        if (hasMilestone("basic", 12)) mult = mult.times(40)
        if (hasAchievement('a', 275)) mult = mult.times(911)
        if (hasMilestone('sac', 93)) mult = mult.times(1e10)
        if (hasMilestone("sac", 125) && hasUpgrade('m', 152)) mult = mult.times(player.sac.points.pow(2))
        if (hasUpgrade('m', 103)) mult = mult.times(upgradeEffect('m', 103))
        let mpow = new Decimal(0.3)
        if (hasUpgrade("m", 113)) mpow = new Decimal(0.4)
        if (hasAchievement('a', 232)) mult = mult.times(buyableEffect('era', 13).pow(mpow))
        if (challengeCompletions("m", 11) == 2) mult = mult.times(1e9)
        if ((hasUpgrade("m", 111)) && (hasUpgrade("m", 121)) && (hasUpgrade("m", 131))) mult = mult.times(10)
        if ((hasUpgrade("m", 112)) && (hasUpgrade("m", 122)) && (hasUpgrade("m", 132))) mult = mult.times(10)
        if ((hasUpgrade("m", 113)) && (hasUpgrade("m", 123)) && (hasUpgrade("m", 133))) mult = mult.times(10)
        if ((hasUpgrade("m", 114)) && (hasUpgrade("m", 124)) && (hasUpgrade("m", 134))) mult = mult.times(10)
        if ((hasUpgrade("m", 115)) && (hasUpgrade("m", 125)) && (hasUpgrade("m", 135))) mult = mult.times(10)
        if (hasAchievement('a', 245)) mult = mult.times(61)
        
        if (inChallenge("m", 11)) {
            let bs = 1.6
            if (hasUpgrade("m", 1004)) bs = 1.65
            mult = mult.mul(new Decimal(bs).pow(player.m.ranks.rid))
            mult = mult.mul(1.5)
            if (hasMilestone("rebirth", 9)) mult = mult.times(2.1)
            if (hasMilestone('prestige', 9)) mult = mult.times(1.1)
            if (hasMilestone('mega', 20)) mult = mult.times(3110)
            if (hasAchievement('a', 153)) mult = mult.times(50)
            if (hasMilestone('e', 15)) mult = mult.times(1.8)
            if (hasMilestone('e', 16)) mult = mult.times(player.e.points.add(1).log10())
            if (hasUpgrade('w', 33)) mult = mult.times(4.1)
            if (hasUpgrade('m', 1005)) mult = mult.times(1.01)
            if (hasUpgrade('m', 1013)) mult = mult.times(10)
            if (hasUpgrade('m', 1021)) {
                mult = mult.times(50)
                if (player.era.ec.gte(2e12)) mult = mult.times(15)
            }
            if (hasUpgrade('m', 1023)) {
                if (player.era.ec.gte(25e12)) mult = mult.times(300)
            }
            if (hasUpgrade("m", 1001)) mult = mult.times(upgradeEffect('m', 1001))
            if (hasUpgrade("m", 1022)) mult = mult.times(upgradeEffect('m', 1022))
            if (hasMilestone("mega", 19)) mult = mult.times(new Decimal(1.2).pow(player.m.points.add(1).log10().floor()))
            if (hasMilestone("sac", 15)) mult = mult.times(player.sac.points)
            mult = mult.pow(buyableEffect('era', 111))
        }
        player.m.mpps = mult
        if (inChallenge("m", 13)) mult = mult.pow(player.m.rngpower)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade('mega', 94)) exp = exp.add(0.005)
        if (hasUpgrade("era", 423)) exp = exp.add(player.era.everythingpower)
        let expinmc1 = new Decimal(0.7)
        if (hasUpgrade("m", 1002)) expinmc1 = new Decimal(0.789)
        if (hasUpgrade("m", 1014)) expinmc1 = new Decimal(0.811)
        if (inChallenge('m', 11)) exp = exp.mul(expinmc1)
        if (hasUpgrade("m", 1024) && inChallenge('m', 11)) exp = exp.mul(1.0157079633)
        player.m.mpps = player.m.mpps.pow(exp)
        return exp
    },
    branches: ["s", "sac", "w"],
    row: 9, // Row the layer is in on the tree (0 is the first row)

    update(diff) {
        diff = Math.min(diff, 0.5)
        if (hasUpgrade("m", 153) && player.m.ma153t == 0) {
            player.m.ma153t = player.timePlayed
        }
        if (inChallenge("m", 13)) {
            let gain = 7500
            if (hasUpgrade("e", 202)) gain = 7300
            if (hasUpgrade("e", 212)) {
                if (hasUpgrade("e", 215)) {
                    if (hasUpgrade("e", 223)) {
                        player.m.rngpower = player.m.rngpower.add(Math.max(Math.random(), Math.random()) / 4200 * diff * 30)
                    } else {
                        player.m.rngpower = player.m.rngpower.add(Math.max(Math.random(), Math.random()) / 5750 * diff * 30)
                    }
                } else {
                    player.m.rngpower = player.m.rngpower.add(Math.random() / 5750 * diff * 30)
                }
            } else {
                player.m.rngpower = player.m.rngpower.add(Math.random() / gain * diff * 30)
            }
            let nnerf = new Decimal(1250)
            if (hasUpgrade("e", 204)) nnerf = new Decimal(1600)
            if (hasUpgrade("e", 214)) nnerf = new Decimal(1800)
            if (hasUpgrade("e", 222)) nnerf = new Decimal(1900)
            player.m.rngpower = player.m.rngpower.sub(player.m.rngpower.div(nnerf).mul(30).mul(diff).mul(Math.random()))
            if (player.m.rngpower.gte(1)) {
                player.m.hyper = true
            }
            if (player.m.rngpower.gte(0.65)) {
                player.m.rngpower = new Decimal(0.62)
            }
            if ((player.m.rngpower.gte(0.5) && (!(hasUpgrade("e", 223))))) {
                player.m.rngpower = new Decimal(0.43)
            }
            if ((player.m.rngpower.gte(0.3) && (!(hasUpgrade("e", 212))))) {
                player.m.rngpower = new Decimal(0.22)
            }
            player.m.totalUps = new Decimal((player.basic.upgrades + player.basic.milestones + player.rebirth.milestones + player.rebirth.upgrades + player.prestige.milestones + player.prestige.upgrades + player.mega.upgrades + player.mega.milestones + player.e.milestones + player.e.upgrades + player.w.milestones + player.w.upgrades + player.sac.milestones + player.era.upgrades + player.era.milestones + player.era.points + player.s.milestones + player.s.upgrades).length)
            let differ = player.m.totalUps.sub(player.m.lastUps)
            differ = Decimal.max(differ, new Decimal(0))
            if (hasUpgrade("e", 211)) {
                player.m.rngpower = player.m.rngpower.mul(new Decimal(1).div(new Decimal(1.004).pow(differ)))
            } else {
                player.m.rngpower = player.m.rngpower.mul(new Decimal(1).div(new Decimal(1.012).pow(differ)))
            }
            player.m.lastUps = player.m.totalUps
        }
    },
    tooltip() {
        let n = 0
        if (hasChallenge("m", 11)) n = 1
        if (hasChallenge("m", 12)) n = 2
        if (hasChallenge("m", 13)) n = 3
        let tt = notationChooser(player.m.points) + " Mastery Points. [" + n + "/3 Challenges Completed]"
        return tt
    },
    doReset(m) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        player.m.points = new Decimal(0)
        if (layers[m].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
    
        // Stage 4, do the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    },  
})
