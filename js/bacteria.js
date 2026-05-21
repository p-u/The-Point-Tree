addLayer("bacteria", {
    name: "Bacteria", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        maxreset: new Decimal(0),
        sp: new Decimal(0), // Skill Points for Skill Tree
        nextreplicatecd: new Decimal(240), // Bacteria Replicate CD
        maxsp: new Decimal(0),
        spentsp: new Decimal(0),
        replicatetime: new Decimal(240),
        lastresettime: 0,
        fastestreset: 10000000,
        hint: true,
    }},
    layerShown(){
        let visible = false
        if (hasUpgrade("c", 74)) visible = true
        if (player.bacteria.unlocked) visible = true
        return visible
    },
    tabFormat: {
        "Main tab": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                ["bar", "breplicate"],
                "blank",
                ["display-text",
                    function(){
                        let a = "x"
                        if (player.bacteria.points.gte(player.bacteria.maxreset.mul(5))) {
                            a = a + "1 "
                        } else if (player.bacteria.points.gte(player.bacteria.maxreset.mul(5))) {
                            a = a + notationChooser(player.bacteria.maxreset.mul(5).div(player.bacteria.points)) + " "
                        } else {
                            a = a + "1.5 "
                        }
                        return a + "Bacteria gain on replicate<br>Time after bacteria reset: " + formatTime(player.timePlayed-player.bacteria.lastresettime)+"<br>Fastest bacteria reset: " + formatTime(player.bacteria.fastestreset)
                    }
                ],
                "blank",
                ["display-text",
                    function(){
                        if (!player.bacteria.hint) return ""
                        let a = "Reset quickly to gain more bacteria and more Skill Points!"
                        if (player.bacteria.maxsp.gte(3)) {
                            a = "Hint: You might need to wait abit to gain more bacteria, through Cell Milestone 9 and the Cell buyables, and respec your upgrades."
                        }
                        if (player.bacteria.maxsp.eq(5)) {
                            a = "Potential stuck point. Hint: You need to get the next achievement, through first getting 34 Era Buyable 9s, then investing in PF upgrades (Bacteria 6 and 7) to gain enough PF. This will give you a major boost to Cells and Bacteria. Do a Cell push to get the 6th SP."
                        }
                        if (player.bacteria.maxsp.eq(7)) {
                            a = "Get the Era Fragment Upgrade (Get EF-boosting ups) and purchase the first extended Cell Upgrade. Then, once you reach 10K Bacteria, buy Bacteria 6."
                        }
                        if (player.bacteria.maxsp.gte(8)) {
                            a = "Get about 1B EF from EF-boosting ups. For your 9th SP, push for PF using Bacteria 1,2,3,6,7 Ups. Afterwards, push for Cells/Bacteria/PF by using the loadout for 7->8SP but also add Bacteria 4 and 6. Get extended Cell Upgrades 1 and 2, and the Sacrifice Milestone, then wait abit and you can get the 10th SP [Cost: 275,000 Bacteria]. Respec and buy Bacteria 11 now."
                        }
                        if (player.bacteria.maxsp.eq(10)) {
                            a = "Get back your EF (1.5B). You should be able to get the first 2 new Cell Upgrades quite quickly with Bacteria 11. Get the third one, and the Sacrifice Milestone to get the 11th SP [v4.1 Endgame]"
                        }
                        if (player.bacteria.maxsp.gte(11)) {
                            a = "Congrats! You reached the endgame. Though, there are still SPs that you can get. Can you get the 12th, or the 13th SP?"
                        }
                        return a
                    }
                ],
                "blank",
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `You have 
                        <h2><span style="color: gray; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.bacteria.sp)}/${notationChooser(player.bacteria.maxsp)}</span></h2> Skill Points`
                        return a
                    }
                ],
                "blank",
                "blank",
                "buyables",
                "blank",
                "clickables",
                "blank",
                "blank",
                "blank",
                "upgrades",
            ],
        },
        "Skill Milestones": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                ["bar", "breplicate"],
                "blank",
                ["display-text",
                    function(){
                        let a = "x"
                        if (player.bacteria.points.gte(player.bacteria.maxreset.mul(5))) {
                            a = a + "1 "
                        } else if (player.bacteria.points.gte(player.bacteria.maxreset.mul(5))) {
                            a = a + notationChooser(player.bacteria.maxreset.mul(5).div(player.bacteria.points)) + " "
                        } else {
                            a = a + "1.5 "
                        }
                        return a + "Bacteria gain on replicate<br>Time after bacteria reset: " + formatTime(player.timePlayed-player.bacteria.lastresettime)+"<br>Fastest bacteria reset: " + formatTime(player.bacteria.fastestreset)
                    }
                ],
                "blank",
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `You have 
                        <h2><span style="color: gray; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.bacteria.sp)}/${notationChooser(player.bacteria.maxsp)}</span></h2> Skill Points`
                        return a
                    }
                ],
                "blank",
                "blank",
                "milestones",
            ],
        },
    },
    color: "#60B332",
    requires: new Decimal(2).pow(1024), // Can be a function that takes requirement increases into account
    resource: "Bacteria", // Name of currency
    baseResource: "Cells", // Name of resource prestige is based on
    baseAmount() {return player.c.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.02, // Prestige currency exponent
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        if (hasUpgrade("bacteria", 21)) {
            if ((player.timePlayed-player.bacteria.lastresettime) > 50) {
                mult = mult.mul(Math.min(player.timePlayed-player.bacteria.lastresettime-50, 150)/100 + 1)
            }
        }
        if (hasAchievement("a", 284)) mult = mult.mul(4)
        if (hasUpgrade("bacteria", 33)) {
            mult = mult.mul(upgradeEffect('bacteria', 33))
        }
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    milestones: {
        1: {
            requirementDescription: "5 Total SP",
            effectDescription: "Keep the first 3 rows of Cell Upgrades (excluding Extension ones)",
            done() { return player.bacteria.maxsp.gte(5) }
        },
        2: {
            requirementDescription: "7 Total SP",
            effectDescription: "Keep the next 2 rows of Cell Upgrades (excluding Extension ones)",
            unlocked() { return hasMilestone("bacteria", 1)},
            done() { return player.bacteria.maxsp.gte(7) }
        },
        3: {
            requirementDescription: "9 Total SP",
            effectDescription: "Keep Cell Buyable 1 level on Bacteria+ reset",
            unlocked() { return hasMilestone("bacteria", 2)},
            done() { return player.bacteria.maxsp.gte(9) }
        },
        4: {
            requirementDescription: "11 Total SP",
            effectDescription: "Keep the last 2 rows of Cell Upgrades (excluding Extension ones)",
            unlocked() { return hasMilestone("bacteria", 3)},
            done() { return player.bacteria.maxsp.gte(11) }
        },
        5: {
            requirementDescription: "12 Total SP",
            effectDescription: "Keep Cell Buyable 3 level on Bacteria+ reset. Respecing also does not reset anything.",
            unlocked() { return hasMilestone("bacteria", 4)},
            done() { return player.bacteria.maxsp.gte(12) }
        },
        6: {
            requirementDescription: "13 Total SP",
            effectDescription: "Passively generate Mega Points on Era/Bacteria reset.",
            unlocked() { return hasMilestone("bacteria", 5)},
            done() { return player.bacteria.maxsp.gte(13) }
        },
    },
    onPrestige(gain) {
        player.era.ec = new Decimal(0)
        player.era.ef = player.era.ef.div(2)
        if (gain.gt(player.bacteria.maxreset)) {
            player.bacteria.maxreset = gain
        }
        if ((player.timePlayed - player.bacteria.lastresettime) < player.bacteria.fastestreset) {
            player.bacteria.fastestreset = player.timePlayed - player.bacteria.lastresettime
        }
        player.bacteria.replicatetime = player.bacteria.nextreplicatecd
        player.bacteria.lastresettime = player.timePlayed
    },
    row: 7, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "B", description: "Shift+B: Reset for Bacteria", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            fullDisplay() {
                return `<h3>Bacteria 1 - Another Tree? Well, at least its an OP one.</h3><br>
                /10 Replication Speed, x10 Cell Base Multiplier, Softcap Scale is weakened. Also, +100% Era Fragments after nerf, and +^0.01 to SB5 Hardcap.<br><br>Cost: 1 SP`
            },
            canAfford() { return player.bacteria.sp.gte(1) },
            pay() { player.bacteria.spentsp = player.bacteria.spentsp.add(1); player.bacteria.sp = player.bacteria.sp.sub(1) },
        },
        21: {
            fullDisplay() {
                return `<h3>Bacteria 2 - Time-bound</h3><br>
                Record time since Bacteria reset. After 75s, x(Seconds after Bacteria Reset-75)^2 Cell Base Mult, x(1+[Seconds after Bacteria Reset-50]/100) Bacteria Mult, with a cap at 250s and 150s respectively. Also, Cell Softcap scaling is weaker [This effect will not stack if both Bacteria-2 and Bacteria-3 is bought].<br><br>Cost: 1 SP<br><b style="color: ${hasUpgrade('bacteria', 11) ? 'green' : 'red'}">Requirement: Bacteria 1</b>`
            },
            branches: ['11', '22'],
            canAfford() { return player.bacteria.sp.gte(1) && hasUpgrade("bacteria",11) },
            pay() { player.bacteria.spentsp = player.bacteria.spentsp.add(1); player.bacteria.sp = player.bacteria.sp.sub(1) },
        },
        22: {
            fullDisplay() {
                return `<h3>Bacteria 3 - Uncap</h3><br>
                Softcap earlier effect of the Cell Massivecap is negated. Also, Cell Softcap Scaling is weaker [This effect will not stack if both Bacteria-2 and Bacteria-3 is bought]. <br><br>Cost: 2 SP<br><b style="color: ${hasUpgrade('bacteria', 11) ? 'green' : 'red'}">Requirement: Bacteria 1</b>`
            },
            branches: ['11', '21'],
            canAfford() { return player.bacteria.sp.gte(2) && hasUpgrade("bacteria",11) },
            pay() { player.bacteria.spentsp = player.bacteria.spentsp.add(2); player.bacteria.sp = player.bacteria.sp.sub(2) },
        },
        31: {
            fullDisplay() {
                return `<h3>Bacteria 4 - Fragmenting</h3><br>
                x2 Era Fragments after nerf<br><br>Cost: 1 SP<br><b style="color: ${hasUpgrade('bacteria', 21) ? 'green' : 'red'}">Requirement: Bacteria 2</b>`
            },
            branches: ['21'],
            canAfford() { return player.bacteria.sp.gte(1) && hasUpgrade("bacteria",21) },
            pay() { player.bacteria.spentsp = player.bacteria.spentsp.add(1); player.bacteria.sp = player.bacteria.sp.sub(1) },
        },
        41: {
            fullDisplay() {
                return `<h3>Bacteria 5 - Severe Fragmenting</h3><br>
                x3 Era Fragments after nerf. Also, reduce the price of EF Buyable 9 (/5).<br><br>Cost: 2 SP<br><b style="color: ${hasUpgrade('bacteria', 31) ? 'green' : 'red'}">Requirement: Bacteria 4</b>`
            },
            branches: ['31'],
            canAfford() { return player.bacteria.sp.gte(2) && hasUpgrade("bacteria",31) },
            pay() { player.bacteria.spentsp = player.bacteria.spentsp.add(2); player.bacteria.sp = player.bacteria.sp.sub(2) },
        },
        32: {
            fullDisplay() {
                return `<h3>Bacteria 6 - Everything.</h3><br>
                Increase Everything Power by 0.002.<br><br>Cost: 1 SP<br><b style="color: ${hasUpgrade('bacteria', 21) ? 'green' : 'red'}">Requirement: Bacteria 2</b>`
            },
            branches: ['21'],
            canAfford() { return player.bacteria.sp.gte(1) && hasUpgrade("bacteria",21) },
            pay() { player.bacteria.spentsp = player.bacteria.spentsp.add(1); player.bacteria.sp = player.bacteria.sp.sub(1) },
        },
        42: {
            fullDisplay() {
                return `<h3>Bacteria 7 - Effectiveness!</h3><br>
                Get 1 effective Sacrifice Strength.<br><br>Cost: 2 SP<br><b style="color: ${hasUpgrade('bacteria', 32) ? 'green' : 'red'}">Requirement: Bacteria 6</b>`
            },
            branches: ['32'],
            canAfford() { return player.bacteria.sp.gte(2) && hasUpgrade("bacteria",32) },
            pay() { player.bacteria.spentsp = player.bacteria.spentsp.add(2); player.bacteria.sp = player.bacteria.sp.sub(2) },
        },
        33: {
            fullDisplay() {
                return `<h3>Bacteria 8 - Speedrun</h3><br>
                If you have 0 unspent SP, x1.2 Bacteria. If you have one or more unspent SP, gain a bacteria multiplier based on your fastest bacteria reset. Watch out, if your fastest bacteria reset is over 2mins, then you will receive a nerf. The x1.2 Bacteria mult stays. <br><br>Cost: 1 SP<br>Effect: ${notationChooser(tmp[this.layer].upgrades[this.id].effect)}x Bacteria<br><b style="color: ${(hasUpgrade('bacteria', 21) && hasUpgrade('bacteria', 22)) ? 'green' : 'red'}">Requirement: Bacteria 2 and Bacteria 3</b>`
            },
            branches: ['21', '22'],
            canAfford() { return player.bacteria.sp.gte(1) && (hasUpgrade("bacteria",21) && hasUpgrade("bacteria",22)) },
            pay() { player.bacteria.spentsp = player.bacteria.spentsp.add(1); player.bacteria.sp = player.bacteria.sp.sub(1) },
            effect() {
                if (player.bacteria.sp.gt(0)) return (Math.pow(1.2, Math.log2(120 / Math.max(player.bacteria.fastestreset, 0.5))))*1.2;
                else return 1.2;
            },
            effectDisplay() { return notationChooser(tmp[this.layer].upgrades[this.id].effect) + "x Bacteria" },
        },
        43: {
            fullDisplay() {
                return `<h3>Bacteria 9 - More Upgrades!</h3><br>
                Unlock the first 3 Column 5 Cell Upgrades, and unlock a Era Fragment Upgrade and a Sacrifice Milestone.<br><br>Cost: 2 SP<br><b style="color: ${hasUpgrade('bacteria', 33) ? 'green' : 'red'}">Requirement: Bacteria 8</b>`
            },
            branches: ['33'],
            canAfford() { return player.bacteria.sp.gte(2) && hasUpgrade("bacteria",33) },
            pay() { player.bacteria.spentsp = player.bacteria.spentsp.add(2); player.bacteria.sp = player.bacteria.sp.sub(2) },
        },
        51: {
            fullDisplay() {
                return `<h3>Bacteria 10 - Fragmenting and Crystalising</h3><br>
                x2 Era Fragments after nerf. Also, ^1.05 EC.<br><br>Cost: 2 SP<br><b style="color: ${hasUpgrade('bacteria', 41) ? 'green' : 'red'}">Requirement: Bacteria 5</b>`
            },
            branches: ['41'],
            canAfford() { return player.bacteria.sp.gte(2) && hasUpgrade("bacteria",41) },
            pay() { player.bacteria.spentsp = player.bacteria.spentsp.add(2); player.bacteria.sp = player.bacteria.sp.sub(2) },
        },
        44: {
            fullDisplay() {
                return `<h3>Bacteria 11 - Fusion Upgrade</h3><br>
                x1.5 EF after nerf, x25 Cell Base Mult, xe1e20 PF, /2 Replication time<br><br>Cost: 3 SP<br><b style="color: ${hasUpgrade('bacteria', 43) ? 'green' : 'red'}">Requirement: Bacteria 9</b>`
            },
            branches: ['43', '33'],
            canAfford() { return player.bacteria.sp.gte(3) && hasUpgrade("bacteria",43) },
            pay() { player.bacteria.spentsp = player.bacteria.spentsp.add(3); player.bacteria.sp = player.bacteria.sp.sub(3) },
        },
        52: {
            fullDisplay() {
                return `<h3>Bacteria 12 - When will we stop fragmenting</h3><br>
                x1.6 Era Fragments after nerf.<br><br>Cost: 3 SP<br><b style="color: ${hasUpgrade('bacteria', 51) ? 'green' : 'red'}">Requirement: Bacteria 10</b>`
            },
            branches: ['51'],
            canAfford() { return player.bacteria.sp.gte(3) && hasUpgrade("bacteria",51) },
            pay() { player.bacteria.spentsp = player.bacteria.spentsp.add(3); player.bacteria.sp = player.bacteria.sp.sub(3) },
        },
        12: {
            fullDisplay() {
                return `<h3>Bacteria 13 - A new mechanic!</h3><br>
                Unlock the Era Clicker. (v4.2)<br><br>Cost: 10 SP<br><b style="color: ${hasUpgrade('bacteria', 11) ? 'green' : 'red'}">Requirement: Bacteria 1</b>`
            },
            branches: ['11'],
            canAfford() { return player.bacteria.sp.gte(10) && hasUpgrade("bacteria",11) },
            pay() { player.bacteria.spentsp = player.bacteria.spentsp.add(10); player.bacteria.sp = player.bacteria.sp.sub(10) },
        },
    },
    clickables: {
        12: {
            title() { return "Respec" },
            display() { return "Forces a bacteria reset (WITHOUT THE EC/EF WIPE) and refunds all upgrades, as well as its SP cost." },
            canClick() { return player[this.layer].upgrades.length > 0 },
            onClick() {
                player[this.layer].upgrades = []
                player[this.layer].spentsp = new Decimal(0)
                player[this.layer].sp = player[this.layer].maxsp
                if (!(hasMilestone("bacteria", 5))) doReset(this.layer, true)
            },
            style() { return {
                'min-height': '80px',
                'width': '500px',
                'background-color': '#878787ff'
            }},
        },
        11: {
            title() { return "Toggle/untoggle Bacteria Skill Tree hint" },
            display() { return "Toggles the hint text in the Bacteria Skill Tree tab." },
            canClick() { return true },
            onClick() {
                player[this.layer].hint = !player[this.layer].hint
            },
            style() { return {
                'min-height': '80px',
                'width': '500px',
            }},
        },
    },
    buyables: {
        11: {
            title: "Gain Skill Points via Bacteria",
            cost(x) {
                let pricing = [1, 2, 4, 10, 200, 800, 2500, 10000, 275000, 5e6, 1e8, 2e9, 5e10, 1e12, 2e15, 1e50, 1e100]
                return new Decimal(pricing[(getBuyableAmount("bacteria",11).toNumber())])
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Bacteria." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "."
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {return {
                'height': '125px',
            }},
        },
        12: {
            title: "Gain Skill Points via Point Fragments",
            cost(x) {
                return new Decimal(10).pow(new Decimal(10).pow(x.add(24)))
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " PF." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "."
            },
            canAfford() {
                return player.points.gte(this.cost())
            },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {return {
                'height': '125px',
            }},
        },
    },
    bars: {
        breplicate: {
            direction: RIGHT,
            width: 600,
            height: 60,
            fillStyle: { 'background-color': "green" },
            borderStyle() { return { "border-color": "white" } },
            progress() {
                if (player.bacteria.nextreplicatecd.lte(0)) return 1
                let prog = new Decimal(1).sub(player.bacteria.replicatetime.div(player.bacteria.nextreplicatecd))
                return prog.max(0).min(1)
            },
            display() {
                return formatTime(player.bacteria.replicatetime) + " to next replicate"
            }
        },
    },
    branches: ["era", "c"],

    update(diff) {
        player.bacteria.maxsp = getBuyableAmount("bacteria", 11).add(getBuyableAmount("bacteria", 12))
        player.bacteria.sp = player.bacteria.maxsp.sub(player.bacteria.spentsp)
        player.bacteria.nextreplicatecd = new Decimal(240),
        player.bacteria.replicatetime = player.bacteria.replicatetime.sub(diff)
        if (player.bacteria.replicatetime.lt(0)) {
            player.bacteria.replicatetime = player.bacteria.nextreplicatecd
            let gain = player.bacteria.points.mul(0.5)
            if (player.bacteria.points.lt(player.bacteria.maxreset.mul(5))) {
                if (player.bacteria.points.add(gain).gte(player.bacteria.maxreset.mul(5))) {
                    player.bacteria.points = player.bacteria.maxreset.mul(5)
                } else {
                    player.bacteria.points = player.bacteria.points.add(gain)
                }
            }
        }
    }
})