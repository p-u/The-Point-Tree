addLayer("c", {
    name: "Cells", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
        replicateTime: new Decimal(15),
        preRT: new Decimal(15),
        nextReplicateSecs: new Decimal(15),
        baseMultiplier: new Decimal(2),
        preBM: new Decimal(2),
        multiplier: new Decimal(2),
        scscale: new Decimal(1.4),
        softcapStart: new Decimal(1000),
        massiveCapStart: new Decimal(2).pow(1024)
    }},
    layerShown(){
        let visible = false
        if (player.sac.points.gte(689000)) visible = true
       return visible
    },
    update(diff) {
        // increasing values
        player.c.replicateTime = new Decimal(15),
        player.c.preRT = new Decimal(15),
        player.c.baseMultiplier = new Decimal(2),
        player.c.preBM = new Decimal(2),
        player.c.multiplier = new Decimal(2),
        player.c.softcapStart = new Decimal(1000),

        // reset time

        player.c.preRT = player.c.preRT.div(buyableEffect('c', 11))
        if(hasUpgrade("c", 13)) player.c.preRT = player.c.preRT.div(1.25)
        if(hasMilestone("sac", 112)) player.c.preRT = player.c.preRT.div(1.5)
        if(hasUpgrade("c", 22)) player.c.preRT = player.c.preRT.div(1.3)
        if(hasUpgrade("c", 24)) player.c.preRT = player.c.preRT.div(1.2)
        if(hasUpgrade("c", 32)) player.c.preRT = player.c.preRT.div(1.1)
        if(hasUpgrade("c", 34)) player.c.preRT = player.c.preRT.div(1.2)
        if (hasUpgrade("c", 71)) player.c.preRT = player.c.preRT.div(1.2)
        if (hasUpgrade("bacteria", 11))player.c.preRT = player.c.preRT.div(10)
        if (hasUpgrade("bacteria", 44))player.c.preRT = player.c.preRT.div(2)
        let scale = 2.5
        let xtrac14 = new Decimal(0)
        if (hasAchievement("a", 284)) xtrac14 = xtrac14.add(1)
        if (hasUpgrade("c", 72)) player.c.preRT = player.c.preRT.mul(new Decimal(scale).pow(getBuyableAmount("c", 14).add(xtrac14)))

        // base mult
        if (hasAchievement('sa', 35)) player.c.preBM = player.c.preBM.mul(1.01)
        if (hasAchievement('sa', 36)) player.c.preBM = player.c.preBM.mul(1.04)
        if(hasUpgrade("c", 11)) player.c.preBM = player.c.preBM.mul(1.5)
        player.c.preBM = player.c.preBM.mul(buyableEffect('c', 12))
        if(hasMilestone("sac", 112)) player.c.preBM = player.c.preBM.mul(3)
        if(hasUpgrade("c", 21)) player.c.preBM = player.c.preBM.mul(1.25)
        if(hasUpgrade("c", 24)) player.c.preBM = player.c.preBM.mul(1.15)
        if(hasUpgrade("c", 33)) player.c.preBM = player.c.preBM.mul(1.3)
        if(hasUpgrade("c", 34)) player.c.preBM = player.c.preBM.mul(1.1)
        if(hasUpgrade("c", 41)) player.c.preBM = player.c.preBM.mul(2)
        if (hasAchievement("a", 263)) player.c.preBM = player.c.preBM.mul(1.5)
        if(hasUpgrade("c", 43)) player.c.preBM = player.c.preBM.mul(1.5)
        if(hasUpgrade("c", 52)) player.c.preBM = player.c.preBM.mul(2)
        if (hasUpgrade("bacteria", 11))player.c.preBM = player.c.preBM.mul(10)
        if (hasUpgrade("bacteria", 44))player.c.preBM = player.c.preBM.mul(25)
        if (hasUpgrade("w", 93)) player.c.preBM = player.c.preBM.mul(4)
        if (hasUpgrade("c", 71)) player.c.preBM = player.c.preBM.mul(10)
        if (hasMilestone("sac", 130))  player.c.preBM = player.c.preBM.mul(8)
        if (hasUpgrade("c", 74) && player.c.points.gte(2.63e263)) player.c.preBM = player.c.preBM.mul(player.era.ec.slog().tetrate(2))
        if (hasUpgrade("c", 62)) player.c.preBM = player.c.preBM.mul(upgradeEffect("c", 62))
        if (hasMilestone("c", 8)) player.c.preBM = player.c.preBM.mul(Decimal.max(player.points.add(1).slog(), 1))
        if (hasUpgrade("bacteria", 21)) {
            if ((player.timePlayed-player.bacteria.lastresettime) > 75) {
                player.c.preBM = player.c.preBM.mul(Math.min(player.timePlayed-player.bacteria.lastresettime-74, 250))
                player.c.preBM = player.c.preBM.mul(Math.min(player.timePlayed-player.bacteria.lastresettime-74, 250))
            }
        }
        if (hasMilestone("c", 9)) player.c.preBM = player.c.preBM.mul(Decimal.pow(1.5, player.era.milestones.length))
        // power for Basemult
        if (hasUpgrade("c", 72)) {
            player.c.preBM = player.c.preBM.mul(buyableEffect("era", 22))
            player.c.preBM = player.c.preBM.pow(buyableEffect("c", 14))
        }
        if (inChallenge("m", 13)) player.c.preBM = player.c.preBM.pow(player.m.rngpower)
        

        // softcap decrease
        if(hasUpgrade("c", 12)) player.c.scscale = new Decimal(1.3)
        if(hasUpgrade("c", 21)) player.c.scscale = new Decimal(1.25)
        if(hasUpgrade("c", 24)) player.c.scscale = new Decimal(1.22)
        if (hasMilestone("c", 1)) player.c.scscale = new Decimal(1.19)
        if(hasUpgrade("c", 34)) player.c.scscale = new Decimal(1.17)
        if (hasMilestone("c", 2)) player.c.scscale = new Decimal(1.15)
        if (hasMilestone("c", 3)) player.c.scscale = new Decimal(1.14)
        if (hasUpgrade("c", 71) && player.c.points.gte(2.17e217)) player.c.scscale = new Decimal(1.135)
        if (hasUpgrade("c", 74) && player.c.points.gte(3e271)) player.c.scscale = new Decimal(1.127)
        if (hasUpgrade("bacteria", 11))player.c.scscale = new Decimal(1.125)
        if (hasUpgrade("bacteria", 21) || hasUpgrade("bacteria", 22)) player.c.scscale = player.c.scscale.sub(0.015)
        if (hasUpgrade("c", 15)) player.c.scscale = player.c.scscale.sub(0.01)
        
        // delayed softcap start
        if (hasUpgrade("c", 31)) player.c.softcapStart = new Decimal(5000)
        if (hasAchievement("a", 262)) player.c.softcapStart = new Decimal(11111)
        if (hasUpgrade("c", 34)) player.c.softcapStart = new Decimal(20000)
        if (hasUpgrade("c", 42)) player.c.softcapStart = new Decimal(100000)
        if (hasUpgrade("c", 43)) player.c.softcapStart = new Decimal(250000)
        if(hasMilestone("sac", 113)) player.c.softcapStart = new Decimal(2500000)
        if (hasMilestone("c", 4)) player.c.softcapStart = new Decimal(80e6)
        if (buyableEffect('c', 13).gte(1)) player.c.softcapStart = player.c.softcapStart.mul(buyableEffect('c', 13))
        if (hasMilestone("c", 5)) player.c.softcapStart = player.c.softcapStart.mul((player.sac.points.add(1)).pow(0.5))
        if (hasAchievement("sa", 42)) player.c.softcapStart = player.c.softcapStart.mul(1.1)
        if (hasUpgrade("era", 502)) player.c.softcapStart = player.c.softcapStart.mul(1.8)
        let expo = 0.05
        if (hasUpgrade("c", 74)) expo = 0.085
        if (hasMilestone("c", 6)) player.c.softcapStart = player.c.softcapStart.mul((player.c.points.add(1e5)).pow(expo))
        if (hasUpgrade("c", 63)) player.c.softcapStart = player.c.softcapStart.mul(upgradeEffect("c", 63))
        if (hasMilestone("era", 104)) player.c.softcapStart = player.c.softcapStart.mul(new Decimal(1.25).pow(player.era.milestones.length))
        if (hasUpgrade("era", 333)) player.c.softcapStart = player.c.softcapStart.mul(new Decimal(1.005).pow(new Date().getFullYear()))
        if (hasUpgrade("w", 65)) player.c.softcapStart = player.c.softcapStart.mul(upgradeEffect("w", 65))
        if (hasMilestone("sac", 123)) player.c.softcapStart = player.c.softcapStart.mul(3134234)
        if (hasUpgrade("c", 71) && player.c.points.gte(2.17e217)) player.c.softcapStart = player.c.softcapStart.mul(10)
        if (hasUpgrade("c", 35)) player.c.softcapStart = player.c.softcapStart.mul(1e10)
        if (hasMilestone("era", 4)) player.c.softcapStart = player.c.softcapStart.mul(new Decimal((Decimal.max(player.era.points, new Decimal(1)).pow(2))).tetrate(2))
        if (hasChallenge("m", 13)) player.c.softcapStart = player.c.softcapStart.pow(2)
        if (player.c.points.gte(player.c.massiveCapStart)) {
            let sce = 1e50
            if (hasUpgrade("bacteria", 22)) sce = 1
            player.c.softcapStart = player.c.softcapStart.div(sce)
        }
        

        // init
        player.c.replicateTime = player.c.preRT
        player.c.baseMultiplier = player.c.preBM

        if (player.c.points.lte(1)) {
            player.c.points = new Decimal(1)
        }


        // main code
        if (player.sac.points.gte(689000)) {
            player.c.nextReplicateSecs = player.c.nextReplicateSecs.sub(diff)
            if (player.c.nextReplicateSecs.gt(player.c.replicateTime)) player.c.nextReplicateSecs = player.c.replicateTime
            if (player.c.nextReplicateSecs.lt(0)) {
                player.c.nextReplicateSecs = player.c.replicateTime
                player.c.currentReplicateInterval = player.c.replicateTime
                if (player.c.points.gte(1000)) {
                    player.c.multiplier = (player.c.baseMultiplier.div(player.c.scscale.pow((player.c.points.div(player.c.softcapStart)).log2()).mul(10))).add(1)
                } else {
                    player.c.multiplier = player.c.baseMultiplier
                }
                if (player.c.points.gte(player.c.massiveCapStart)) {
                    player.c.multiplier = player.c.multiplier.pow(0.1)
                }
                player.c.points = player.c.points.mul(player.c.multiplier)
            }
        }
    },
    tabFormat: {
        "Main tab": {
            content: [
                "main-display",
                "blank",
                ["bar", "replicate"],
                "blank",
                ["display-text", "This layer requires some form of strategy."],
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `Base Multiplier: 
                            ${notationChooser(player.c.baseMultiplier)}</span></h2>`
                        return a
                    }
                ],
                ["display-text",
                    function(){
                        let a = ""
                        let multi = new Decimal(1)
                        if (player.c.points.gte(player.c.massiveCapStart)) {
                            multi = (player.c.baseMultiplier.div(player.c.scscale.pow((player.c.points.div(player.c.softcapStart)).log2()).mul(10))).add(1).pow(0.1)
                        } else {
                            multi = (player.c.baseMultiplier.div(player.c.scscale.pow((player.c.points.div(player.c.softcapStart)).log2()).mul(10))).add(1)
                        }
                        if (player.c.points.gte(1000)) { 
                                a = a + `Multiplier after softcap: 
                                ${notationChooser(multi)}</span></h2>`
                        }
                        return a
                    }
                ],
                ["display-text",
                    function(){
                        let a = ""
                        let scs = "1e50"
                        if (hasUpgrade("bacteria", 22)) scs = "1"
                        a = a + `Softcap starts at 
                            ${notationChooser(player.c.softcapStart)} cells</span></h2>`
                        if (player.c.points.gte(player.c.massiveCapStart.div(1e6))) {
                            a = a + `<br>Massivecap (Tenth-rooted Cell gain; Softcap starts ${scs}x earlier) starts at 
                            ${notationChooser(player.c.massiveCapStart)} cells</span></h2>`
                        }
                        return a
                    }
                ],
                "blank",
                "blank",
                "upgrades",
            ],
        },
        "Cell Milestones": {
            content: [
                "main-display",
                "blank",
                ["bar", "replicate"],
                "blank",
                "blank",
                "blank",
               ["milestones", [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]],
            ],
            unlocked() {return hasAchievement("a", 262)},
        },
        "Pre-nextLayer milestones": {
            content: [
                "main-display",
                "blank",
                ["bar", "replicate"],
                "blank",
                "blank",
                "blank",
                ["milestones", [1001,1002,1003,1004,1005,1006,1007,1008,1009,1010]],
            ],
            unlocked() {return hasUpgrade("c", 74)},
        },
        "Cell Buyables": {
            content: [
                "main-display",
                "blank",
                ["bar", "replicate"],
                "blank",
                "blank",
                "blank",
                "buyables",
            ],
        },
    },
    milestones: {
        1: {
            requirementDescription: "Cell Milestone 1 (1.25e12 Cells: Tier 1)",
            effectDescription: "Unlock Cell Buyable 3, and reduce cell softcap",
            done() { return player.c.points.gte(new Decimal(1.25e12)) },
        },
        2: {
            requirementDescription: "Cell Milestone 2 (6e16 Cells: Tier 1.1)",
            effectDescription: "Reduce cell softcap",
            unlocked() { return hasMilestone("c", 1)},
            done() { return player.c.points.gte(new Decimal(6e16)) },
        },
        3: {
            requirementDescription: "Cell Milestone 3 (5e25 Cells: Tier 1.25)",
            effectDescription: "Reduce cell softcap",
            unlocked() { return hasMilestone("c", 2)},
            done() { return player.c.points.gte(new Decimal(5e25)) },
        },
        4: {
            requirementDescription: "Cell Milestone 4 (3.2e32 Cells: Tier 1.33)",
            effectDescription: "Cell softcap starts 32x later",
            unlocked() { return hasMilestone("c", 3)},
            done() { return player.c.points.gte(new Decimal(3.2e32)) },
        },
        5: {
            requirementDescription: "Cell Milestone 5 (1e42 Cells: Tier 1.4)",
            effectDescription: "Cell softcap starts (Sac^0.5)x later",
            unlocked() { return hasMilestone("c", 4)},
            done() { return player.c.points.gte(new Decimal(1e42)) },
        },
        6: {
            requirementDescription: "Cell Milestone 6 (1.5e70 Cells: Tier 1.7)",
            effectDescription: "Cell softcap starts (Cells^0.05)x later",
            unlocked() { return hasMilestone("c", 5)},
            done() { return player.c.points.gte(new Decimal(1.5e70)) },
        },
        7: {
            requirementDescription: "Cell Milestone 7 (1e135 Cells: Tier 2!)",
            effectDescription: "'Metabolic Hyper-Surge' is stronger.",
            unlocked() { return hasMilestone("c", 6)},
            done() { return player.c.points.gte(new Decimal(1e135)) },
        },
        8: {
            requirementDescription: "Cell Milestone 8 (1.73e237 Cells: Tier 2.3)",
            effectDescription: "Multiply Era Crystals by 1e50 and Era Fragments by 1.8 after nerf. Points boost Cell Base Mult.",
            unlocked() { return hasMilestone("c", 7)},
            done() { return player.c.points.gte(new Decimal(1.73e237)) },
        },
        9: {
            requirementDescription: "Cell Milestone 9 (1e330 Cells: Tier 2.5)",
            effectDescription: "Boost Cell Base Mult by 1.5^(amount of Era Milestones gotten).",
            unlocked() { return hasMilestone("c", 8)},
            done() { return player.c.points.gte(new Decimal("1e330")) },
        },
        10: {
            requirementDescription: "Cell Milestone 10 (4.67e467 Cells: Tier 2.7)",
            effectDescription: "Cell Buyable 1 scaling is weaker.",
            unlocked() { return hasMilestone("c", 9)},
            done() { return player.c.points.gte(new Decimal("4.67e467")) },
        },
        1001: {
            requirementDescription: "First Cell Boost before the next layer (When you unlock this milestones section)",
            effectDescription: "Cell Milestone 6 is stronger.",
            unlocked() { return true},
            done() { return hasUpgrade("c", 74) },
        },
        1002: {
            requirementDescription: "Second Cell Boost before the next layer (2.63e263 Cells)",
            effectDescription: "Cell Base Multiplier is multiplied based off of Era Crystals",
            unlocked() { return hasMilestone("c", 1001)},
            done() { return player.c.points.gte(new Decimal(2.63e263)) },
        },
        1003: {
            requirementDescription: "Third Cell Boost before the next layer (3e271 Cells)",
            effectDescription: "Cell Softcap Scaling is weaker.",
            unlocked() { return hasMilestone("c", 1002)},
            done() { return player.c.points.gte(new Decimal(3e271)) },
        },
        1004: {
            requirementDescription: "Fourth Cell Boost before the next layer (31 Cell Buyable 2 bought)",
            effectDescription: "Cell Buyable 2 is much stronger, and reduce the price of Cell Buyable 3 by e10 Cells.",
            unlocked() { return hasMilestone("c", 1003)},
            done() { return getBuyableAmount("c", "12").gte(31) },
        },
        1005: {
            requirementDescription: "Final Cell Boost before the next layer (50 Cell Buyable 3 bought)",
            effectDescription: "Cell Buyable 3 is much stronger.",
            unlocked() { return hasMilestone("c", 1004)},
            done() { return getBuyableAmount("c", "13").gte(50) },
        },
    },
    upgrades: {
        11: {
            title: "Cytoplasm",
            description: "Increase base multiplier by 1.5.",
            cost: new Decimal(1600),
            unlocked() { return true },
        },
        12: {
            title: "Plasma Membrane",
            description: "Decrease softcap scaling",
            cost: new Decimal(3000),
            unlocked() { return (hasUpgrade("c", 11)) },
        },
        13: {
            title: "Ribosome",
            description: "SPEEEED: /1.25 replicate speed",
            cost: new Decimal(7000),
            unlocked() { return (hasUpgrade("c", 12)) },
        },
        14: {
            title: "Mitochondria",
            description: "Back to main: Extend Era Upgrades. x5,000 EC",
            cost: new Decimal(15000),
            unlocked() { return (hasUpgrade("c", 13)) },
        },
        21: {
            title: "Endoplasmic Reticulum",
            description: "Slightly decrease softcap scaling, and increase base multiplier",
            cost: new Decimal(5000000),
            unlocked() { return (hasMilestone("sac", 112)) },
        },
        22: {
            title: "Centrosome",
            description: "Sonic Cell: /1.3 replicate speed",
            cost: new Decimal(12500000),
            unlocked() { return (hasUpgrade("c", 21)) },
        },
        23: {
            title: "Golgi Apparatus",
            description: "Cell Buyable 2's effect is stronger and scaling is weaker",
            cost: new Decimal(30000000),
            unlocked() { return (hasUpgrade("c", 22)) },
        },
        24: {
            title: "Nucleus",
            description: "Less softcap scaling, less replicate speed, more base multiplier",
            cost: new Decimal(100000000),
            unlocked() { return (hasUpgrade("c", 23)) },
        },
        31: {
            title: "Vacuole",
            description: "Softcap starts x5 later",
            cost: new Decimal(700000000),
            unlocked() { return (hasUpgrade("c", 24)) },
        },
        32: {
            title: "Spindle Fiber",
            description: "/1.1 cell replication speed, Cell buyable 1's effect is stronger",
            cost: new Decimal(5e9),
            unlocked() { return (hasUpgrade("c", 31)) },
        },
        33: {
            title: "ATP Synthesis",
            description: "x1.3 Cell Base Multiplier",
            cost: new Decimal(1.5e11),
            unlocked() { return (hasUpgrade("c", 32)) },
        },
        34: {
            title: "Metabolic Cascade",
            description: "Less softcap scaling, less replicate speed, more base multiplier, delayed softcap start",
            cost: new Decimal(1e13),
            unlocked() { return (hasUpgrade("c", 33)) },
        },
        41: {
            title: "Metabolic SURGE",
            description: "x2 Cell Base Multiplier",
            cost: new Decimal(4.1e14),
            unlocked() { return (hasUpgrade("c", 34)) },
        },
        42: {
            title: "Improved Vacuole",
            description: "Softcap starts x5 later again",
            cost: new Decimal(2e18),
            unlocked() { return (hasUpgrade("c", 41)) },
        },
        43: {
            title: "Overclocked Nucleus",
            description: "x1.5 Cell Base Multiplier, Softcap starts x2.5 later",
            cost: new Decimal(4e21),
            unlocked() { return (hasUpgrade("c", 42)) },
        },
        44: {
            title: "Budgeted Expression",
            description: "Reduce the scaling of Cell Buyables 2,3 and Era Buyable 3",
            cost: new Decimal(3e23),
            unlocked() { return (hasUpgrade("c", 43)) },
        },
        51: {
            title: "Expression Amplifier",
            description: "Increase the effect of Cell Buyable 3",
            cost: new Decimal(1e27),
            unlocked() { return (hasUpgrade("c", 44)) },
        },
        52: {
            title: "Cellular Mastery",
            description: "x2 Cell Base Multiplier",
            cost: new Decimal(5e28),
            unlocked() { return (hasUpgrade("c", 51)) },
        },
        53: {
            title: "Expression Amplifier 2",
            description: "Increase the effect of Cell Buyable 2 and Mega Buyable 2",
            cost: new Decimal(3.03e30),
            unlocked() { return (hasUpgrade("c", 52)) },
        },
        54: {
            title: "Metabolic Hyper-Surge",
            description: "Cells boost Era Crystals, Reduced Sacrifice Scaling, very slightly reduce Era Buyable 6 scaling and increase its effect",
            cost: new Decimal(3.33e33),
            effect() {
                if (hasMilestone("c", 7)) return player.c.points.pow(0.05)
                if (hasUpgrade("w", 93)) {
                    return player.c.points.add(1).log(5)
                } else {
                    return player.c.points.add(1).log(9)
                }
            },
            effectDisplay() {
                let upgEffect = upgradeEffect(this.layer, this.id)
                return "This upgrade multiplies Era Crystals by x" + notationChooser(upgEffect)+"."
            },
            tooltip() {
                return "Formula: log_9(Cells)"
            },
            unlocked() { return (hasUpgrade("c", 53)) },
        },
        61: {
            title: "Cellular Point",
            description: "For every cell upgrade bought, ^e1.2e18 PF.",
            cost: new Decimal(5e57),
            effect() {
                base61 = new Decimal("e1.2e18")
                if (hasUpgrade("era", 313)) base61 = new Decimal("e1e19")
                return new Decimal(base61).pow(player.c.upgrades.length)
            },
            effectDisplay() {
                let upgEffect = upgradeEffect(this.layer, this.id)
                return "This upgrade multiplies Point Fragments by x" + notationChooser(upgEffect)+"."
            },
            tooltip() {
                return "Formula: "+ base61+"^CUps"
            },
            unlocked() { return (hasChallenge("m", 13) && hasUpgrade("c", 54)) },
        },
        62: {
            title: "Cellular Cell",
            description: "For every cell upgrade bought, x1.1 Cell Base multiplier.",
            cost: new Decimal(1e62),
            effect() {
                base62 = new Decimal(1.1)
                if (hasUpgrade("era", 313)) base62 = new Decimal(1.25)
                if (hasUpgrade("c", 25)) base62 = base62.pow(2)
                return new Decimal(base62).pow(player.c.upgrades.length)
            },
            effectDisplay() {
                let upgEffect = upgradeEffect(this.layer, this.id)
                return "This upgrade multiplies Cell Base Mult by x" + notationChooser(upgEffect)+"."
            },
            tooltip() {
                return "Formula: " + base62 + "^CUps"
            },
            unlocked() { return (hasChallenge("m", 13) && hasUpgrade("c", 61)) },
        },
        63: {
            title: "Cellular Procrastination",
            description: "For every cell upgrade bought, x1.5 Cell Softcap delay (x2.25 nett due to ^2 boost).",
            cost: new Decimal(1.5e79),
            effect() {
                csdb = new Decimal(1.5)
                if (hasUpgrade("era", 313)) csdb = new Decimal(2)
                return new Decimal(csdb).pow(player.c.upgrades.length)
            },
            effectDisplay() {
                let upgEffect = upgradeEffect(this.layer, this.id)
                return "This upgrade delays the start of the cell softcap by x" + notationChooser(upgEffect)+"."
            },
            tooltip() {
                return "Formula: " + csdb + "^CUps"
            },
            unlocked() { return (hasChallenge("m", 13) && hasUpgrade("c", 62)) },
        },
        64: {
            title: "Cellular Finality",
            description: "For every cell upgrade bought, +0.0002 EP.",
            cost: new Decimal(1e100),
            effect() {
                xtranett = 0
                if (hasUpgrade("era", 313)) xtranett = 1
                return new Decimal(0.0002).mul(player.c.upgrades.length + xtranett)
            },
            effectDisplay() {
                let upgEffect = upgradeEffect(this.layer, this.id)
                return "This upgrade increases EP by " + notationChooser(upgEffect)+"."
            },
            tooltip() {
                return "Formula: 0.0002*(CUps+" + xtranett + ")"
            },
            unlocked() { return (hasChallenge("m", 13) && hasUpgrade("c", 63)) },
        },
        71: {
            title: "Stage II",
            description: "Boosts all cell-related stuff: Reset Time (/1.2), Base Mult (x10). At 2.17e217 Cells, boosts Softcap Delay (x10), Softcap Scale start (-0.005)",
            cost: new Decimal(5e210),
            unlocked() { return (hasUpgrade("c", 64)) },
        },
        72: {
            title: "New repeated stuff!",
            description: "Unlock the tenth Era Buyable and the fourth Cell Buyable.",
            cost: new Decimal(1e221),
            unlocked() { return (hasUpgrade("c", 71)) },
        },
        73: {
            title: "Cellular Fragmentation",
            description: "Boosts Era Fragments by Cells (before nerf). At 100,000,000 EF, x2 EF gain (after nerf). This also applies to at 250,000,000 EF.",
            cost: new Decimal(5e233),
            effect() {
                return new Decimal(Math.max(player.c.points.add(1).slog(),1)).pow(1.7)
            },
            effectDisplay() {
                let upgEffect = upgradeEffect(this.layer, this.id)
                return "This upgrade boosts Era Fragments by " + notationChooser(upgEffect)+"x."
            },
            tooltip() {
                return "Formula: xslog(Cells)^1.7"
            },
            unlocked() { return (hasUpgrade("c", 72)) },
        },
        74: {
            title: "New layer?",
            description: "Unlock a temporary Pre-nextLayer milestones tab, which provides a slew of new boosts to unlock the next layer. Also reveals the next layer.",
            cost: new Decimal(4e242),
            unlocked() { return (hasUpgrade("c", 73)) },
        },
        // Extension
        15: {
            title: "Descale",
            description: "Cell softcap scaling is weaker.",
            cost: new Decimal("2e421"),
            unlocked() { return ((hasUpgrade("c", 14)&&hasUpgrade("bacteria",43))) },
        },
        25: {
            title: "One from every field",
            description: "'Cellular Cell' effect is squared, Sacrifice scaling is decreased, +^0.01 Basic Points",
            cost: new Decimal("1e480"),
            unlocked() { return ((hasUpgrade("c", 15))) },
        },
        35: {
            title: "some placeholder",
            description: "+(Placeholder Value) Everything Points, x1.(46% loaded) Era Fragments before nerf, Cell softcap starts [???] later. [THIS IS NOT AN ERROR, NAMING IS FINAL]",
            cost: new Decimal("5.55e555"),
            unlocked() { return ((hasUpgrade("c", 25))) },
        }
    },
    buyables: {
        11: {
            title: "Cell Buyable 1: Replicate! [Max replicate speed is 1/20 seconds]",
            cost(x) {
                exp2 = 1.14
                if (hasMilestone("c", 10)) exp2 = 1.113
                return new Decimal(50).mul(Decimal.pow(exp2, (x+1))).mul(Decimal.pow((x+1) , Decimal.pow(exp2 , x))).floor()
            },
            display() {
                dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Cells." 
                dis = dis + "<br>Bought: " + getBuyableAmount(this.layer, this.id) 
                if (this.extra().gte(1)) {
                    dis = dis + " + " + notationChooser(this.extra())
                }
                dis = dis + "<br>Effect: " + format(buyableEffect(this.layer, this.id)) + "x replication speed."
                return dis
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                if (!(hasMilestone("era", 4))) player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                base1 = new Decimal(1.125)
                if (hasUpgrade("c", 32)) base1 = new Decimal(1.175)
                base2 = x
                expo = new Decimal(1)
                let eff = (base1.pow(Decimal.pow(base2, expo)))
                return eff
            },
            extra(){
                let extra = new Decimal(0)
                return extra
            },
            tooltip() {
                return "Cost Formula: 50 x 1.14^Amt x Amt^(" + exp2 + "^Amt). Effect formula: " + base1 + "^(" + notationChooser(base2) + "^" + expo + ")."
            }
        },
        12: {
            title: "Cell Buyable 2: Multiply!",
            cost(x) {
                exp2 = 1.25
                if (hasUpgrade("c", 23)) exp2 = 1.2
                if (hasUpgrade("c", 44)) exp2 = 1.17
                return new Decimal(4000).mul(Decimal.pow(1.15, x)).mul(Decimal.pow((x+1) , Decimal.pow(exp2 , x))).floor()
            },
            display() {
                dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Cells." 
                dis = dis + "<br>Bought: " + getBuyableAmount(this.layer, this.id) 
                if (this.extra().gte(1)) {
                    dis = dis + " + " + notationChooser(this.extra())
                }
                dis = dis + "<br>Effect: " + notationChooser(buyableEffect(this.layer, this.id)) + "x Cell Base Multiplier."
                return dis
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                if (!(hasMilestone("era", 4))) player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            extra(){
                let extra = new Decimal(0)
                if (hasAchievement("a", 284)) extra = extra.plus(5)
                return extra
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                base1 = new Decimal(1.1)
                if (hasUpgrade("c", 23)) base1 = new Decimal(1.15)
                if (hasAchievement("a", 263)) base1 = new Decimal(1.16)
                if (hasUpgrade("c", 53)) base1 = new Decimal(1.2)
                if (hasMilestone("c", 1004)) base1 = base1.times(1.12)
                base2 = x
                expo = new Decimal(1)
                let eff = (base1.pow(Decimal.pow(base2, expo)))
                return eff
            },
            tooltip() {
                return "Cost Formula: 4,000 x 1.15^Amt x Amt^(" + exp2 + "^Amt). Effect formula: " + base1 + "^(" + notationChooser(base2) + "^" + expo + ")."
            }
        },
        13: {
            title: "Cell Buyable 3: Procrastinate (Delay softcap start)",
            cost(x) {
                exp2 = 1.11
                if (hasUpgrade("c", 23)) exp2 = 1.1
                let bc = 1e11
                if (hasMilestone("c", 1004)) bc = 10
                return new Decimal(bc).mul(Decimal.pow(1.12, (x))).mul(Decimal.pow((x+1) , Decimal.pow(exp2 , x))).floor()
            },
            unlocked() {
                return hasMilestone("c", 1)
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Cells." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: " + format(buyableEffect(this.layer, this.id)) + "x later softcap."
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base1 = new Decimal(1.1)
                if (hasAchievement("a", 263)) base1 = new Decimal(1.15)
                if (hasUpgrade("c", 51)) base1 = new Decimal(1.3)
                if (hasMilestone("c", 1005)) base1 = base1.mul(1.29)
                base2 = x
                expo = new Decimal(1.01)
                let eff = (base1.pow(Decimal.pow(base2, expo)))
                return eff
            },
            tooltip() {
                return "Cost Formula: 1e11 x 1.12^Amt x Amt^(" + exp2 + "^Amt). Effect formula: " + base1 + "^(" + notationChooser(base2) + "^" + expo + ")."
            }
        },
        14: {
            title: "Cell Buyable 4: Trade-off (Make replication slower but replicate more)",
            cost(x) {
                y = x.add(22)
                exp2 = 1.21
                if (getBuyableAmount("c", 14) == 2){
                    return new Decimal(1e303)
                } else {
                    return new Decimal(1e91).mul(Decimal.pow(1.12, y)).mul(Decimal.pow((1+y) , Decimal.pow(exp2 , y))).floor()
                }
            },
            unlocked() {
                return hasUpgrade("c", 72)
            },
            display() {
                let scale = 2.5
                dis = "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Cells." 
                dis = dis + "<br>Bought: " + getBuyableAmount(this.layer, this.id) 
                if (this.extra().gte(1)) {
                    dis = dis + " + " + notationChooser(this.extra())
                }
                dis = dis + "<br>Effect: ^" + notationChooser(buyableEffect(this.layer, this.id)) + " Cell Base Multiplier, but x" + notationChooser(new Decimal(scale).pow(getBuyableAmount("c", 14).add(this.extra()))) + " Replication Speed."
                return dis
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            extra(){
                let extra = new Decimal(0)
                if (hasAchievement("a", 284)) extra = extra.plus(1)
                return extra
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                return (1 + x*0.05)
            },
            tooltip() {
                return `Cost Formula: 2e92 x 1.12^(Amt+${y}) x (Amt+${y})^(${exp2}^(Amt+${y})). Effect formula: ^(1+0.05*Amt) Cell Base Mult, x2.5 Replication Speed/buy.`
            }
        },
    },
    color: "#63e5ff",
    requires: new Decimal(689000), // Can be a function that takes requirement increases into account
    resource: "Cells", // Name of currency
    baseResource: "Sacrifices", // Name of resource prestige is based on
    baseAmount() {return player.sac.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.00000000001, 
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    row: 6, // Row the layer is in on the tree (0 is the first row)
    branches: ["w", "s", "sac", "era"],
    bars: {
        replicate: {
            direction: RIGHT,
            width: 600,
            height: 60,
            fillStyle: { 'background-color': "green" },
            borderStyle() { return { "border-color": "white" } },
            progress() {
                let prog = player.c.nextReplicateSecs.div(player.c.replicateTime)
                if (player.c.nextReplicateSecs.gte(player.c.replicateTime)) prog = 1
                return prog
            },
            display() {
                return formatTime(player.c.nextReplicateSecs) + " to next replicate"
            }
        },
    },
    tooltip() {
        let tt = notationChooser(player.c.points) + " Cells (" + formatTime(player.c.nextReplicateSecs) + " to next replicate)"
        return tt
    },
    glowColor() {
        let layer = 'c'
        for (id in tmp[layer].upgrades){
            if (isPlainObject(layers[layer].upgrades[id])){
                if (canAffordUpgrade(layer, id) && !hasUpgrade(layer, id) && tmp[layer].upgrades[id].unlocked){
                    return "red"
                }
            }
        }
        for(i=11;i<15;i++){ 
            if (canBuyBuyable("c", i)) {
                return "blue"
            }
        }
    },
    doReset(c) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[c].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
        for(i=1;i<5;i++){ //rows
            for(v=1;v<4;v++){ //columns
              if ((hasMilestone('bacteria', 1)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
            }
            for(v=4;v<6;v++){ //columns
                if ((hasMilestone('bacteria', 2)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
              }
            for(v=6;v<8;v++){ //columns
                if ((hasMilestone('bacteria', 4)) && hasUpgrade(this.layer, i+v*10)) keptUpgrades.push(i+v*10)
              }
          }

        let keptBuyables = {};
        if (hasMilestone('bacteria', 3)) keptBuyables[11] = getBuyableAmount(this.layer, 11);
        if (hasMilestone('bacteria', 5)) keptBuyables[13] = getBuyableAmount(this.layer, 13);
    
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
    
        // Stage 4, do the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
        for (let id in keptBuyables) {
            setBuyableAmount(this.layer, id, keptBuyables[id]);
        }
    },  
})