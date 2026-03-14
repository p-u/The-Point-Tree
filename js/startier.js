addLayer("st", {
    name: "Star Tier", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ST", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        research: new Decimal(0),
        resps: new Decimal(0),
        automater: false,
        automatef: false,
    }},
    exponent() {
        let exp = new Decimal(2.6)
        if (hasMilestone("st", 7)) exp = new Decimal(2.955)
        if (hasMilestone("st", 9)) exp = new Decimal(2.98)
        if (hasMilestone("st", 11)) exp = new Decimal(3.0121)
        if (hasMilestone("st", 14)) exp = new Decimal(3.0774)
        if (hasMilestone("st", 15)) exp = new Decimal(3.26)
        if (hasMilestone("st", 16)) exp = new Decimal(0.11).add(player.st.points.div(5))
        if (hasUpgrade("n", 11)) exp = exp.sub(0.01)
        if (hasUpgrade("s", 42)) exp = exp.sub(player.n.points.slog().div(10))
        if (hasMilestone("st", 22)) exp = exp.sub(0.00433)
        if (hasMilestone("st", 24)) exp = exp.sub(0.1275)
        if (hasMilestone("st", 25)) exp = exp.add(0.0012)
        return exp
    }, // Prestige currency exponent
    
    color: "#a9a9a9",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "Star Tier", // Name of currency
    baseResource: "Stars", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    tabFormat: {
        "Main tab": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                "blank",
                "milestones",
                "blank",
                "blank",
                ["infobox", "st"],
            ],
        },
        "Research": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                    "blank",
                    "blank",
                    ["display-text",
                        function(){
                            let a = ""
                            a = a + `You have 
                            <h2><span style="color: #90D5FF; text-shadow: 0px 0px 10px #1744beff; font-family: Lucida Console, Courier New, monospace">
                                ${notationChooser(player.st.research)}</span></h2> Research`
                            return a
                        }
                    ],
                    "blank",
                    ["display-text", function() {
                        return "Research per sec: "+ notationChooser(player.st.resps) +"."
                    }], 
                    "blank",
                    "blank",
                ["microtabs","main"],
            ],
            unlocked() {return hasMilestone("st",25)}
        },
    },
    automate() {
		if (hasMilestone('st', 26) && (player.st.automater)) {
			if (layers.st.buyables[11].canAfford()) {
				layers.st.buyables[11].buy();
			};
        }
		if (hasMilestone('st', 27) && (player.st.automatef)) {
            if (layers.st.buyables[12].canAfford()) {
				layers.st.buyables[12].buy();
			};
        }
    },
    microtabs: {
        main: {
            Upgrades: {
                content: [
                    "blank",
                    "upgrades",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    ["infobox", "res"],
                ],
            },
            "Research Special Mults": {
                content: [
                    ["display-text", function() { return "In the top-left settings menu, several options can change how the game looks, feels, or displays information. With this upgrade, some of these settings now grant a Research multiplier. More disruptive settings — such as Blind notation, intense themes, or strong screenshake — provide larger boosts, but make the game harder to play."}],
                    "blank",
                    ["display-text", function() { return "<h2> Setting 1: Notations </h2>"}],
                    "blank",
                    ["display-text", function() { return "<h3> Intended Setting: Infinity Notation -> Scientific2 when you buy GalaxyUp9 </h3>"}],
                    "blank",
                    ["display-text", function() {
                        if ((hasUpgrade("st", 54) && player.st.research.gte(2.5e246) && getBuyableAmount("st", 11).gte(281)) || hasUpgrade("st", 55)) {
                            return "<h3> Blind Notation: -x20 base Research Multi (UNAFFECTED BY Galaxy Up. 9's ^2 boost)</h3><br><br><h3> Birds Array Notation: x25 base Research Multi </h3>"
                        } else {
                            return "<h3> Blind Notation: x10 base Research Multi </h3>"
                        }
                    }],
                    "blank",
                    ["display-text", function() { return "<h3> Infinity Notation: x9 base Research Multi </h3>"}],
                    "blank",
                    ["display-text", function() { return "<h3> Standard Notation: x7 base Research Multi </h3>"}],
                    "blank",
                    ["display-text", function() {
                        if (!hasUpgrade("g", 24)) {
                            return "<h3> Scientific2 Notation: x5 base Research Multi </h3>"
                        } else {
                            return "<h3> Scientific2 Notation: x9.5 base Research Multi </h3>"
                        }
                    }],
                    "blank",
                    ["display-text", function() { return "<h3> Scientific Notation: x3 base Research Multi </h3>"}],
                    "blank",
                    ["display-text", function() {
                        txt =  "<h3> Mixed Scientific Notation: x1 Research Multi </h3><br><br><br>"
                        if (hasUpgrade("st", 33)) {
                            txt = txt + "<h2> Setting 2: Themes </h2><br><br>"
                            txt = txt + "<h3> Intended Setting: Light Theme </h3><br><br>"
                            txt = txt + "<h3> Interesting1 Theme: x32 Research Multi </h3><br><br>"
                            txt = txt + "<h3> Light Theme: x30 Research Multi </h3><br><br>"
                            txt = txt + "<h3> Void Theme: x26 Research Multi </h3><br><br>"
                            if (hasUpgrade("st", 54)) {
                                txt = txt + "<h3> Sky Theme: x150 Research Multi, +^0.005 Stars </h3><br><br>"
                            } else {
                                txt = txt + "<h3> Sky Theme: x22 Research Multi </h3><br><br>"
                            }
                            txt = txt + "<h3> New Theme: x18 Research Multi </h3><br><br>"
                            txt = txt + "<h3> Lava Theme: x15 Research Multi </h3><br><br>"
                            txt = txt + "<h3> Verdant Theme: x11 Research Multi </h3><br><br>"
                            txt = txt + "<h3> Aqua Theme: x7 Research Multi </h3><br><br>"
                            txt = txt + "<h3> Default Theme: x3 Research Multi </h3><br><br>"
                        }
                        if (hasUpgrade("n", 15)) {
                            txt = txt + "<h2> Setting 3: Action Mode - Hints to the Secret action modes is in Nebula Up. 5 </h2><br><br>"
                            txt = txt + "<h3> Intended Setting: Earthquake Action Mode </h3><br><br>"
                            txt = txt + "<h3> Action Mode off: x1 Research Multi </h3><br><br>"
                            txt = txt + "<h3> Action Mode on: x10 Research Multi </h3><br><br>"
                            txt = txt + "<h3> Action Mode ultra: x15 Research Multi </h3><br><br>"
                            txt = txt + "<h3> Action Mode earthquake [SECRET]: x22.5 Research Multi </h3><br><br>"
                            txt = txt + "<h3> Action Mode stop. [DOUBLY-SECRET]: x33.75 Research Multi </h3><br><br>"
                        }
                        return txt
                    }],
                ],
                unlocked() {return hasUpgrade("st",22)}
            },
            Buyables: {
                content: [
                    'clickables',
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "buyables",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    ["display-text", function() {
                        let text = "<h2> Research Buyable Milestones </h2> <br><br>"
                        if (getBuyableAmount("st", 12).lt(1)) {
                            text = ""
                        } else if (getBuyableAmount("st", 12).lt(5)) {
                            text = text + "This boost unlocks when you have 5 Factory Buyables!"
                        } else if (getBuyableAmount("st", 12).gte(5)) {
                            text = text + "<h3> 5 Factory Buyables: Research increases the exponent of Sparks. Multiply research by 5. (Currently: ^</h3>" + player.st.research.slog().sub(1.5).div(100).max(0).add(1) + "<h3> . [31/40]</h3><br><br>"
                            if (getBuyableAmount("st", 11).lt(41)) {
                                text = text + "This boost unlocks when you have 41 Researcher Buyables!"
                            } else {
                                text = text + "<h3> 41 Researcher Buyables: +0.15 Base to the Researcher buyable.</h3><br><br>"
                                if (getBuyableAmount("st", 11).lt(53)) {
                                    text = text + "This boost unlocks when you have 53 Researcher Buyables!"
                                } else {
                                    text = text + "<h3> 53 Researcher Buyables: -0.25 Cost Scaling to the Researcher buyable.</h3><br><br>"
                                    if (getBuyableAmount("st", 11).lt(78)) {
                                        text = text + "This boost unlocks when you have 78 Researcher Buyables!"
                                    } else {
                                        text = text + "<h3> 78 Researcher Buyables: Every Researcher Buyable adds 5 Nebula and Galaxy Buyables. Unlock a new buyable.</h3><br><br>"
                                        if (getBuyableAmount("st", 11).lt(188)) {
                                            text = text + "This boost unlocks when you have 188 Researcher Buyables!"
                                        } else {
                                            text = text + "<h3> 188 Researcher Buyables: ^1.01 Sparks. Also, Research Up. 22's hardcap is 1,000x higher but boost is 40% worse.</h3><br><br>"
                                            if (getBuyableAmount("st", 11).lt(215)) {
                                                text = text + "This boost unlocks when you have 215 Researcher Buyables!"
                                            } else {
                                                text = text + "<h3> 215 Researcher Buyables: Industry Buyables directly boosts Research.</h3><br><br>"
                                                    if (getBuyableAmount("st", 12).lt(33)) {
                                                    text = text + "This boost unlocks when you have 33 Factory Buyables!"
                                                } else {
                                                    text = text + "<h3> 33 Factory Buyables: Gain a 0.02 exponent on Research!</h3><br><br>"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        return text
                    }],
                ],
                unlocked() {return hasMilestone("st",25)}
            },
        },
    },
    milestones: {
        1: {
            requirementDescription: "Star Tier 1",
            effectDescription: "x2 Sparks, unlock 1 new upgrade.",
            done() { return player["st"].points.gte(1) }
        },
        2: {
            requirementDescription: "Star Tier 2",
            effectDescription() {
                let des = "Unlock yet another new upgrade. +25% Stars per star tier."
                des = des + " (Currently: x" + notationChooser(player.st.points.div(4).add(1)) + ")"
                return des
            },
            done() { return player["st"].points.gte(2) },
            unlocked() { return player["st"].points.gte(1)}
        },
        3: {
            requirementDescription: "Star Tier 3 [08/40]",
            effectDescription(){
                let des = "xStar Tier Sparks. Stars boost Sparks gain after 300 Stars. Unlock two new upgrades."
                des = des + " (Currently: x" + notationChooser(player.st.points) + ", x"
                if (player.s.points.gte(300)) {
                    des = des + notationChooser(player.s.points.pow(0.125)) + ")"
                } else {
                    des = des + "1)"
                }
                return des
            },
            done() { return player["st"].points.gte(3) },
            unlocked() { return player["st"].points.gte(2)}
        },
        4: {
            requirementDescription: "Star Tier 4",
            effectDescription: "Unlock new upgrades. Star Tier 2's 'Star Tier' is changed to 'Star Tier^2', and generate 20% of passive Stars a second, but remove the ability to gain stars manually. Also, extend Star Upgrade 24 to double Sparks gain at 10M, 50M, 200M, 1B, 10B, 100B and 1T stars.",
            done() { return player["st"].points.gte(4) },
            unlocked() { return player["st"].points.gte(3)}
        },
        5: {
            requirementDescription: "Star Tier 5 [13/40]",
            effectDescription: "Star generation is now 100% a second, and pentuple Sparks gain. Unlock a Star Buyable. Triple Sparks at 25T, 1Qd, 1Qt, 1Sx, 1Sp, 1Oc, 1No and 1De Stars. Unlock a new reset layer with some upgrades.",
            done() { return player["st"].points.gte(5) },
            unlocked() { return player["st"].points.gte(4)}
        },
        6: {
            requirementDescription: "Star Tier 6",
            effectDescription(){
                let des = "Unlock 1 more Star upgrade. xStar Tier/2 Galaxies, xlog2Star Tier Sparks and Stars."
                des = des + " (Currently: x" + notationChooser(player.st.points.div(2)) + ", x" + notationChooser(Decimal.max(Decimal.log2(player.st.points), new Decimal(1))) + ")"
                return des
            },
            done() { return player["st"].points.gte(6) },
            unlocked() { return player["st"].points.gte(5)}
        },
        7: {
            requirementDescription: "Star Tier 7",
            effectDescription: "Unlock 1 more Galaxy and 1 more Star Upgrade. Gain 1% of Galaxies a second, but prevent you from reseting for Galaxies. Also, Quadruple Star gain, and keep the first 2 rows of Star upgrades on any reset.",
            done() { return player["st"].points.gte(7) },
            unlocked() { return player["st"].points.gte(6)}
        },
        8: {
            requirementDescription: "Star Tier 8 [18/40]",
            effectDescription: "x8 Galaxies, Stars and Sparks. Unlock 1 new upgrade, and automate the Spark Increaser.",
            done() { return player["st"].points.gte(8) },
            unlocked() { return player["st"].points.gte(7)}
        },
        9: {
            requirementDescription: "Star Tier 9",
            effectDescription: "x99 Sparks. Every 30 OOMs starting from e123 and ending at e303 Sparks, x9 Sparks gain. Unlock the Galaxy Increaser. At e175 Sparks, Star Upgrade 23 is stronger.",
            done() { return player["st"].points.gte(9) },
            unlocked() { return player["st"].points.gte(8)}
        },
        10: {
            requirementDescription: "Star Tier 10 [20/40]",
            effectDescription: "x1,000 Sparks, x10 Stars.",
            done() { return player["st"].points.gte(10) },
            unlocked() { return player["st"].points.gte(9)}
        },
        11: {
            requirementDescription: "Star Tier 11",
            effectDescription: "At e250, e300 Sparks, x3 Galaxies. Unlock a new upgrade.",
            done() { return player["st"].points.gte(11) },
            unlocked() { return player["st"].points.gte(10)}
        },
        12: {
            requirementDescription: "Star Tier 12 [22/40]",
            effectDescription: "Star Tier 11's Galaxy boost also extends to e200, e400 and e500 Sparks, and the boost is increased to 5x. Galaxy Up. 15 is stronger at e425 Stars. Unlock a new upgrade. Automate the Star Increaser",
            done() { return player["st"].points.gte(12) },
            unlocked() { return player["st"].points.gte(11)}
        },
        13: {
            requirementDescription: "Star Tier 13",
            effectDescription: "x13,333 Stars.",
            done() { return player["st"].points.gte(13) },
            unlocked() { return player["st"].points.gte(12)}
        },
        14: {
            requirementDescription: "Star Tier 14",
            effectDescription: "x14 Galaxies.",
            done() { return player["st"].points.gte(14) },
            unlocked() { return player["st"].points.gte(13)}
        },
        15: {
            requirementDescription: "Star Tier 15",
            effectDescription: "Unlock a new reset layer! Star Up. 25 is stronger.",
            done() { return player["st"].points.gte(15) },
            unlocked() { return player["st"].points.gte(14)}
        },
        16: {
            requirementDescription: "Star Tier 16",
            effectDescription() {
                let des = "x166 Galaxies. Nebulae boost Galaxies."
                let e = new Decimal(0.1)
                if (hasUpgrade("s", 35)) {
                    e = new Decimal(0.225)
                    if (player.g.points.gte("e670")) e = new Decimal(0.25)
                }
                if (player.n.points.gte("e14150") && hasUpgrade("n", 15)) e = new Decimal(0.33)
                des = des + " (Currently: x" + notationChooser(player.n.points.pow(e)) + ")"
                return des
            },
            done() { return player["st"].points.gte(16) },
            unlocked() { return player["st"].points.gte(15)}
        },
        17: {
            requirementDescription: "Star Tier 17",
            effectDescription: "Double the base of Nebula Upgrade 2, x17 Galaxies and Nebulae. Unlock a new Star Upgrade.",
            done() { return player["st"].points.gte(17) },
            unlocked() { return player["st"].points.gte(16)}
        },
        18: {
            requirementDescription: "Star Tier 18",
            effectDescription: "+^0.01 Galaxies. Unlock a Nebula Upgrade. Automate the Galaxy Increaser.",
            done() { return player["st"].points.gte(18) },
            unlocked() { return player["st"].points.gte(17)}
        },
        19: {
            requirementDescription: "Star Tier 19",
            effectDescription() {
                let des = "For every Star Tier, x1.5 Galaxies. At e27,850 Sparks, increase the base of this upgrade by 0.5. Unlock a star upgrade."
                let b = 1.5
                if (player.points.gte("e27850")) b = b + 0.5
                des = des + " (Currently: x" + notationChooser(new Decimal(b).pow(player.st.points)) + ")"
                return des
            },
            done() { return player["st"].points.gte(19) },
            unlocked() { return player["st"].points.gte(18)}
        },
        20: {
            requirementDescription: "Star Tier 20",
            effectDescription: "Double the base of Nebula Upgrade 2 again. At 2^1024 Nebulae, +^0.01 to Stars, Galaxies and Nebulae.",
            done() { return player["st"].points.gte(20) },
            unlocked() { return player["st"].points.gte(19)}
        },
        21: {
            requirementDescription: "Star Tier 21",
            effectDescription: "^1.01 to Stars.",
            done() { return player["st"].points.gte(21) },
            unlocked() { return player["st"].points.gte(20)}
        },
        22: {
            requirementDescription: "Star Tier 22",
            effectDescription: "First Star Tier to have no IMMEDIATE boosts...but at e74,250 Sparks, ^1.01 Sparks.",
            done() { return player["st"].points.gte(22) },
            unlocked() { return player["st"].points.gte(21)}
        },
        23: {
            requirementDescription: "Star Tier 23 [29/40]",
            effectDescription: "xe1,000 Stars. Unlock a new Nebula upgrade.",
            done() { return player["st"].points.gte(23) },
            unlocked() { return player["st"].points.gte(22)}
        },
        24: {
            requirementDescription: "Star Tier 24",
            effectDescription: "well, its 24...achieve the great boost of x(2.4/2.4)^240000000 everything....",
            done() { return player["st"].points.gte(24) },
            unlocked() { return player["st"].points.gte(23)}
        },
        25: {
            requirementDescription: "Star Tier 25",
            effectDescription() {
                let st25e = new Decimal(0.98)
                if (hasUpgrade("st", 44)) st25e = new Decimal(0.984)
                let des = "The Start of the Reality-Breaking...As you progress through star tiers (and realities), some stars get lost along the way. For every ST past 24, ^0.98 Stars. Unlock a new subtab in the 'Star Tier' layer, Research. Unlock the Nebula Buyable Automation, at a cost."
                des = des + " (Currently: ^" + notationChooser(st25e.pow(player.st.points.sub(24))) + ")"
                return des
            },
            done() { return player["st"].points.gte(25) },
            unlocked() { return player["st"].points.gte(24)}
        },
        26: {
            requirementDescription: "Star Tier 26",
            effectDescription: "x26 Research. Happy? Unlock 2 new Nebulae and Star Upgrade, as well as Automation for Researcher buyables at a cost (Toggleable in the Buyables subtab).",
            done() { return player["st"].points.gte(26) },
            unlocked() { return player["st"].points.gte(25)}
        },
        27: {
            requirementDescription: "Star Tier 27",
            effectDescription: "x40 Research. Also, xe2,700 Galaxies and Sparks. The Research nerf from turning on the Researcher buyable has been decreased to /2 from /3. Unlock Automation for Factory buyables at a cost",
            done() { return player["st"].points.gte(27) },
            unlocked() { return player["st"].points.gte(26)}
        },
    },
    buyables: {
        11: {
            title: "Buy the 'Researcher' buyable.",
            unlocked() { return (hasUpgrade('st', 25)) },
            cost(x) {
                base = 6
                if (getBuyableAmount("st", 11).gte(53)) base = 5.75
                sc = 0.02
                if (hasUpgrade("st", 42)) sc = 0.015
                let n = 1
                if (getBuyableAmount("st", 11).gte(187)) n = 2.5
                return new Decimal(2.5e12).mul(Decimal.pow(base+sc*x, x)).div(buyableEffect("st", 13)).div(n).floor()
            },
            display() {
                let dis = "Researchers are the core to gaining Research. They are easy to hire, though they do not give much of a boost. <br><br> Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Research. <br>"
                if (this.extra().gte(1)) {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " + " + notationChooser(this.extra()) + " Researcher Buyables."
                } else {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Researcher Buyables."
                }
                dis = dis + " Researcher Buyables multiply Research by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.st.research.gte(this.cost())
            },
            buy() {
                player.st.research = player.st.research.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            extra(){
                let extra = new Decimal(0)
                if (hasUpgrade("st", 42) && player.st.research.gte(1.1e59)) extra = extra.plus(getBuyableAmount(this.layer, 12))
                return extra
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                let bas = new Decimal(2)
                if (getBuyableAmount("st", 11).gte(41)) {
                    bas = bas.add(0.15)
                }
                return bas.pow(x)
            },
            tooltip() {
                return "Cost Formula: 2.5T x ("+base+"+"+sc+"Amt)^Amt"
            },
            style() {
                if (canBuyBuyable(this.layer, this.id)) {
                    return {
                        'width': '300px',
                        'height': '130px',
                        'background-color': '#90D5FF',
                    }
                } else {
                    return {
                        'width': '300px',
                        'height': '130px',
                    }
                }
            }
        },
        12: {
            title: "Buy the 'Factory' buyable.",
            unlocked() { return (getBuyableAmount("st", 11).gte(10)) },
            cost(x) {
                let sc = new Decimal(10)
                if (getBuyableAmount("st", 12).lt(50)) {
                    sc = sc.mul(new Decimal(5).pow(getBuyableAmount("st", 12))).min(1e9)
                } else {
                    sc = new Decimal(1e9).mul(new Decimal(1.05).pow(getBuyableAmount("st", 12).sub(50)))
                }
                return new Decimal(1e19).mul(Decimal.pow(sc, x)).div(buyableEffect("st", 13)).floor()
            },
            display() {
                let dis = "With Factories, you gain a huge boost of research. <br><br> Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Research. <br>"
                if (this.extra().gte(1)) {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " + " + notationChooser(this.extra()) + " Factory Buyables."
                } else {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Factory Buyables."
                }
                dis = dis + " Factory Buyables multiply Research by " + notationChooser(buyableEffect(this.layer, this.id)) + "."
                return dis
            },
            canAfford() {
                return player.st.research.gte(this.cost())
            },
            buy() {
                player.st.research = player.st.research.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            extra(){
                let extra = new Decimal(0)
                return extra
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                bas = new Decimal(10)
                if (hasUpgrade("st", 43) && player.st.research.gte(1e68) && getBuyableAmount("st", 11).gte(68)) bas = bas.add(8)
                if (hasUpgrade("n", 21)) bas = bas.add(new Decimal(player.n.upgrades.length).mul(new Decimal(2).add(player.n.points.max("e29436").log10().sub(29436).min(814).div(1000))))
                return bas.pow(x)
            },
            tooltip() {
                return "Cost Formula: 1e19 x SC^Amt, SC starts at 10, x5 per buyable buy till 1B. After 50 buyable buys, every buyable buy multiplies SC by a further 1.05. x" + bas + " Research/buy"
            },
            style() {
                if (canBuyBuyable(this.layer, this.id)) {
                    return {
                        'width': '300px',
                        'height': '130px',
                        'background-color': '#90D5FF',
                    }
                } else {
                    return {
                        'width': '300px',
                        'height': '130px',
                    }
                }
            }
        },
        13: {
            title: "Buy the 'Industry' buyable.",
            unlocked() { return (getBuyableAmount("st", 11).gte(78)) },
            cost(x) {
                basesc = new Decimal(1e7)
                if (hasUpgrade("st", 55) && player.st.research.gte(2e288)) basesc = new Decimal(1e3)
                sc = basesc.mul(new Decimal(10).pow(getBuyableAmount("st", 13).div(5).floor()))
                return new Decimal(1e100).mul(Decimal.pow(sc, x)).floor()
            },
            display() {
                let dis = "With Industries, it makes buying Factories and hiring Researchers easier. <br><br> Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Research. <br>"
                if (this.extra().gte(1)) {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " + " + notationChooser(this.extra()) + " Industry Buyables."
                } else {
                    dis = dis + "You have " + notationChooser(getBuyableAmount(this.layer, this.id)) + " Industry Buyables."
                }
                dis = dis + " Industry Buyables reduce the price of the 'Researcher' and 'Factory' buyables by " + notationChooser(buyableEffect(this.layer, this.id)) + "x."
                return dis
            },
            canAfford() {
                return player.st.research.gte(this.cost())
            },
            buy() {
                player.st.research = player.st.research.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            extra(){
                let extra = new Decimal(0)
                return extra
            },
            effect() {
                let x = getBuyableAmount(this.layer, this.id).add(this.extra())
                let bas = new Decimal(1000)
                return bas.pow(x)
            },
            tooltip() {
                return "Cost Formula: 1e100 x " + basesc + "^Amt (x10 cost scale/3 buyables). Industries reduce the price of the previous two buyables by 1,000x per!"
            },
            style() {
                if (canBuyBuyable(this.layer, this.id)) {
                    return {
                        'width': '300px',
                        'height': '130px',
                        'background-color': '#90D5FF',
                    }
                } else {
                    return {
                        'width': '300px',
                        'height': '130px',
                    }
                }
            }
        },
    },
    upgrades: {
        11: {
            title: "Research Up. 1: Good Boost",
            description: "Get a simple x2.5 Research boost.",
            cost: new Decimal(50e6),
            unlocked() { return true }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
        },
        12: {
            title: "Research Up. 2: Recursive Research",
            description: "Boost Research gain based on Research upgrades.",
            cost: new Decimal(400e6),
            effect() {
                bas = new Decimal(1.5)
                if (hasUpgrade("st", 31)) bas = new Decimal(1.8)
                if (hasUpgrade("st", 45) && player.points.gte("e1150000")) bas = new Decimal(2.5)
                return new Decimal(bas).pow(player.st.upgrades.length)
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x"
            },
            tooltip() {
                return "Formula: " + bas + "^Research Ups"
            },
            unlocked() { return hasUpgrade("st",11) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
        },
        13: {
            title: "Research Up. 3: Nebular Researchification",
            description: "Boost Galaxy gain based on Research.",
            cost: new Decimal(2.75e9),
            effect() {
                return player.st.research.max(10).pow(20)
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x"
            },
            tooltip() {
                return "Formula: Research^0.5"
            },
            unlocked() { return hasUpgrade("st",12) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
        },
        14: {
            title: "Research Up. 4: Infinite Research",
            description: "Boost Research gain based on itself.",
            cost: new Decimal(1.1e10),
            effect() {
                exp = 0.1
                if (hasUpgrade("st", 23)) exp = 0.125
                if (hasUpgrade("st", 45) && player.st.research.gte(5.4e88)) exp = 0.15
                return player.st.research.max(10).pow(exp)
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x"
            },
            tooltip() {
                return "Formula: Research^" + exp
            },
            unlocked() { return hasUpgrade("st",13) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
        },
        15: {
            title: "Research Up. 5: Breakthrough Multi",
            description: "Boost Research based on achievements. Unlock research-related achievements.",
            cost: new Decimal(8.75e11),
            effect() {
                return new Decimal(player.a.achievements.length).div(2)
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x"
            },
            tooltip() {
                return "Formula: Achievemements/2"
            },
            unlocked() { return hasUpgrade("st",14) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
        },
        21: {
            title: "Research Up. 6: How does this affect it?",
            description: "The exponent of the research formula (slog(nebulae)) is increased by 0.1. xe2,000 Stars, Unlock an option to automate the Nebula Increaser at a cost.",
            cost: new Decimal(16e12),
            unlocked() { return hasUpgrade("st",15) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
        },
        22: {
            title: "Research Up. 7: Notation Optimiser",
            description: "Unlock a new subtab in the Research tab 'Research Special Mults', with a section on Notation on Research Mults. Different notations will yield different research multipliers.",
            cost: new Decimal(64e12),
            unlocked() { return hasUpgrade("st",21) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
        },
        23: {
            title: "Research Up. 8: Better Compound",
            description: "Research Up. 4 and 'Galaxy Descendants' is stronger.",
            cost: new Decimal(1.5e15),
            unlocked() { return hasUpgrade("st",22) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
        },
        24: {
            title: "Research Up. 9: ΔBase",
            description: "Change the base of the Research formula from 'slog(stars)' to 'slog(stars^sparks)'",
            cost: new Decimal(7.5e15),
            unlocked() { return hasUpgrade("st",23) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
        },
        25: {
            title: "Research Up. 10: To new heights",
            description: "Unlock the 'Researcher' buyable. [SECOND BUYABLE UNLOCKS AT 10 RESEARCHER BUYABLE BUYS]",
            cost: new Decimal(3e16),
            unlocked() { return hasUpgrade("st",24) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
        },
        31: {
            title: "Research Up. 11: A fusion upgrade.",
            description: "Increase Research Up. 2's base to 1.8, and xe1,000 Sparks per Research upgrade.",
            cost: new Decimal(2.22e22),
            effect() {
                return new Decimal("1e1000").pow(player.st.upgrades.length)
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() { return hasUpgrade("st",25) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
        },
        32: {
            title: "Research Up. 12: oh. well, ill take it.",
            description: "x100 Research.",
            cost: new Decimal(1e27),
            unlocked() { return hasUpgrade("st",31) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
        },
        33: {
            title: "Research Up. 13: Setting Optimiser2",
            description: "Like Research Up. 7, but themes now! View theme multipliers in the 'Research Special Mults' subtab!",
            cost: new Decimal(4e37),
            unlocked() { return hasUpgrade("st",32) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
        },
        34: {
            title: "Research Up. 14: AFK = Good",
            description: "Boost Research gain based on Time Played. Also, xe250 Sparks per Factory buyable after 4.",
            cost: new Decimal(1.1e41),
            effect() {
                n = 1
                if (player.st.research.gte(2.89e189) && hasUpgrade("st", 53)) n = 3
                return new Decimal(player.timePlayed).log2().pow(n)
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x"
            },
            tooltip() {
                return "Formula: log2(Time Played)^" + n
            },
            unlocked() { return hasUpgrade("st",33) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
        },
        35: {
            title: "Research Up. 15: The push to the next one",
            description: "xe2,500 nebulae...what.",
            cost: new Decimal(4.7e47),
            unlocked() { return hasUpgrade("st",34) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
        },
        41: {
            title: "Research Up. 16: The final currency to include",
            description: "The research formula also includes Galaxies",
            cost: new Decimal(3.5e53),
            unlocked() { return hasUpgrade("st",35) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
            style() {return {
                'width': '120px',
            }},
        },
        42: {
            title: "Research Up. 17: Buyable Inc. [32/40]",
            description: "On bought: Decrease the Researcher buyable's scaling by 25%. At 1.1e59 Research, Factory Buyables add onto Researcher buyables.",
            cost: new Decimal(1.57e57),
            unlocked() { return hasUpgrade("st",41) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
        },
        43: {
            title: "Research Up. 18: Doing 18+ things",
            description: "Drink Wine. Somehow, that gives you a boost. x8 Research and xe800 Nebulae. At 1e68 Research with 68 Researcher Buyables, marry your love of your life. Now Factory Buyables boost Research by +x8 more, but ^0.8 Galaxies. At 4.2e75 Research, divorce your wife after your long years of suffering. Remove the nerf to Galaxies, and unlock a Galaxy upgrade.",
            cost: new Decimal(6e66),
            unlocked() { return hasUpgrade("st",42) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
            style() {return {
                'width': '180px',
            }},
        },
        44: {
            title: "Research Up. 19: Potentially the biggest upgrade.",
            description: "Star Tier 25+'s nerf is reduced by 20%.",
            cost: new Decimal(2.78e78),
            unlocked() { return hasUpgrade("st",43) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
            style() {return {
                'width': '115px',
            }},
        },
        45: {
            title: "Research Up. 20: Boosts to previous upgrades",
            description: "The automation of the Nebula Increaser now only decreases research by 2.5%, x20 Research. At 5.4e88 Research, Research Up. 4 is stronger, and at 7.3e93 research, Nebulae boosts itself more. At e1.15M Sparks, Research Up. 2 is stronger.",
            cost: new Decimal(6.388e83),
            unlocked() { return hasUpgrade("st",44) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
            style() {return {
                'width': '150px',
            }},
        },
        51: {
            title: "Research Up. 21: Good Boost! Good Boost! (5) [33/40]",
            description: "At all these research milestones, x10 Research. When bought, 1.5e108 Research, 2.5e115, 1.5e120 and (2.7e127 with 143 Researcher Buyables).",
            cost: new Decimal(2.5e104),
            unlocked() { return hasUpgrade("st",45) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
        },
        52: {
            title: "Research Up. 22: Short-lived boost",
            description: "Research boosts itself starting from 1e132 (very strong), but caps at x100K.",
            cost: new Decimal(1e135),
            effect() {
                if (getBuyableAmount("st", 11).lt(188)) {
                    return player.st.research.div(1e132).max(1).pow(0.3).min(100000)
                } else {
                    return player.st.research.div(1e132).max(1).pow(0.18).min(1e8)
                }
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x"
            },
            tooltip() {
                if (getBuyableAmount("st", 11).lt(188)) {
                    return "Formula: min(max(Research/1e132, 1)^0.3, 100000)"
                } else {
                    return "Formula: min(max(Research/1e132, 1)^0.18, 100M)"
                }
            },
            unlocked() { return hasUpgrade("st",51) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
            style() {return {
                'width': '120px',
            }},
        },
        53: {
            title: "Research Up. 23: Research starting to get insane",
            description: "On buy: +0.3 exponent to the main research formula. At 2.89e189 Research, square, no, cube the effect of the 14th Research up.",
            cost: new Decimal(1.3e183),
            unlocked() { return hasUpgrade("st",52) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
            style() {return {
                'width': '120px',
            }},
        },
        54: {
            title: "Research Up. 24: birb",
            description: "On buy: you are now a bird (wait, what?) Gain wings. The sky theme now gives x150 Research and +^0.005 Stars. At (2.5e246 Research + 281 Researcher Buyables), Birds Array notation now gives x25 Research, whilst Blind Notation gives -x1 Research. At {10, 248.448} Research, gain thrusters on your wings. x50 Research and xe15,000 Sparks.",
            cost: new Decimal(1e237),
            unlocked() { return hasUpgrade("st",53) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
            style() {return {
                'width': '170px',
            }},
        },
        55: {
            title: "Research Up. 25: It's looming.",
            description: "On buy, the second boost of the previous upgrade (the one which requires 2.5e246 Research w/281 Researcher Buyables) activates instantly. At 2e288 Research, the base cost scaling of the Industry buyable is x1,000 instead of x10M. At 1.5e327 Research, unlock an achievement which unlocks a new layer.",
            cost: new Decimal(1.8e256),
            unlocked() { return hasUpgrade("st",53) }, 
            currencyDisplayName: "Research",
            currencyInternalName: "research",
            currencyLayer: "st",
            style() {return {
                'width': '170px',
            }},
        },
    },
    gainMult() { // Energy
        let gain = new Decimal(1)
        return gain
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    displayRow: 1,
    hotkeys: [
        {key: "t", description: "t: Reset for a Star Tier", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],    
    infoboxes: {
        st: {
            title: "The 2nd Reset Layer: Star Tiers!",
            body() { return "Star Tiers is a fundemental reset layer for you to progress to extraordinary heights. This is where you unlock the 3rd, 4th and 5th reset layers. Most Star Tiers give good boosts which allow you to get future upgrades easier. However, it resets Stars... thus you have to grind back your progress." },
        },
        res: {
            title: "The Research subtab",
            body() { return "Research is a currency generated over time, with the formula (slog(Stars)*ST)^slog(Nebulae). This sub-layer, like the Star Tier layer, will be the most important layer going forward. It will carry you through 30-35/40, with some research upgrades after 35/40." },
        },
    },
    clickables: {
        11: {
            title() {
                if (hasUpgrade("st", 45)) {
                    if (player.s.nebbyauto) {
                        return "Turn off automation for Nebula Buyables, and +2.5% research gain"
                    } else {
                        return "Turn on automation for Nebula Buyables, but -2.5% research gain"
                    }
                } else {
                    if (player.s.nebbyauto) {
                        return "Turn off automation for Nebula Buyables, and double the gain of research"
                    } else {
                        return "Turn on automation for Nebula Buyables, but half the gain of research"
                    }
                }
            },
            canClick() { return true },
            onClick() {
                player.s.nebbyauto = !player.s.nebbyauto
            },
        },
        12: {
            title() {
                if (hasMilestone("st", 27)) {
                    if (player.st.automater) {
                        return "Turn off automation for Researcher Buyables and gain research twice faster!"
                    } else {
                        return "Turn on automation for Researcher Buyables, but Research gain is divided by 2."
                    }
                } else {
                    if (player.st.automater) {
                        return "Turn off automation for Researcher Buyables and gain research thrice faster!"
                    } else {
                        return "Turn on automation for Researcher Buyables, but Research gain is divided by 3."
                    }
                }
            },
            canClick() { return true },
            onClick() {
                player.st.automater = !player.st.automater
            },
            unlocked() {return hasMilestone("st", 26)}
        },
        13: {
            title() {
                if (player.st.automatef) {
                    return "Turn off automation for Factory Buyables and gain research much faster!"
                } else {
                    return "Turn on automation for Factory Buyables, but Research gain is reduced to 40% of the original."
                }
            },
            canClick() { return true },
            onClick() {
                player.st.automatef = !player.st.automatef
            },
            unlocked() {return hasMilestone("st", 27)}
        },
    },
    branches: ["s"],
    layerShown(){
        let visible = false
        if (hasUpgrade('s', 15) || player.st.unlocked || player["st"].points.gte(1)) visible = true
       return visible
    },
    update(diff) {
        if (hasMilestone("st", 25)) {
            let exp = player.n.points.add(1).slog()
            if (hasUpgrade("st", 21)) exp = exp.add(0.1)
            if (hasUpgrade("st", 53)) exp = exp.add(0.3)
            let bas = player.s.points.add(1)
            if (hasUpgrade("st", 24)) bas = bas.pow(player.points.add(1))
            let ext = new Decimal(1)
            if (hasUpgrade("st", 41)) ext = player.g.points.add(1).slog()
            let gain = (bas.slog().mul(player.st.points).mul(ext)).pow(exp)
            let notationMult = new Decimal(1)
            if (options.notation === 'standard') notationMult = new Decimal(7)
            if (options.notation === 'infinity') notationMult = new Decimal(9)
            if (options.notation === 'scientific') notationMult = new Decimal(3)
            if (options.notation === 'scientific2') notationMult = new Decimal(5)
            if (options.notation === 'blind') notationMult = new Decimal(10)
            if ((hasUpgrade("st", 54) && player.st.research.gte(2.5e246) && getBuyableAmount("st", 11).gte(281)) || hasUpgrade("st", 55)) {
                if (options.notation === 'blind') notationMult = new Decimal(20)
                if (options.notation == 'birds array') notationMult = new Decimal(25)
            }
            if (hasUpgrade("g", 24)) {
                if (options.notation === 'scientific2') notationMult = new Decimal(9.5)
                gain = gain.mul(notationMult)
            }
            let themeMult = new Decimal(32)
            if (options.theme === 'default') themeMult = new Decimal(3)
            if (options.theme === 'aqua') themeMult = new Decimal(7)
            if (options.theme === 'verdant') themeMult = new Decimal(11)
            if (hasUpgrade("st", 54)) {
                if (options.theme === 'sky') themeMult = new Decimal(150)
            } else {
                if (options.theme === 'sky') themeMult = new Decimal(22)
            }
            if (options.theme === 'lava') themeMult = new Decimal(15)
            if (options.theme === 'void') themeMult = new Decimal(26)
            if (options.theme === 'new') themeMult = new Decimal(18)
            if (options.theme === 'light') themeMult = new Decimal(30)
            if (player.s.nebbyauto && !hasUpgrade("st",45)) gain = gain.mul(0.5)
            if (player.s.nebbyauto && hasUpgrade("st",45)) gain = gain.mul(0.975)
            if (player.st.automater) {
                if (hasMilestone("st", 27)) {
                    gain = gain.div(2)
                } else {
                    gain = gain.div(3)
                }
            }
            if (player.st.automatef) {
                gain = gain.mul(0.4)
            }
            let actionMult = new Decimal(1)
            if (options.actionmode == "on") actionMult = new Decimal(10)
            if (options.actionmode == "ultra") actionMult = new Decimal(15)
            if (options.actionmode == "earthquake") actionMult = new Decimal(22.5)
            if (options.actionmode == "stop.") actionMult = new Decimal(33.75)
            if (hasUpgrade("st", 11)) gain = gain.mul(2.5)
            if (hasUpgrade("st", 42)) gain = gain.mul(2.5)
            if (hasUpgrade("st", 43)) gain = gain.mul(8)
            if (hasAchievement("a", 51)) gain = gain.mul(15)
            if (player.st.research.gte(new Decimal(10).pow(248.448)) && hasUpgrade("st", 54)) gain = gain.mul(50)
            if (hasUpgrade("st", 51)) {
                gain = gain.mul(10)
                if (player.st.research.gte(1.5e108)) gain = gain.mul(10)
                if (player.st.research.gte(2.5e115)) gain = gain.mul(10)
                if (player.st.research.gte(1.5e120)) gain = gain.mul(10)
                if (player.st.research.gte(2.7e127) && getBuyableAmount("st", 11).gte(143)) gain = gain.mul(10)
            }
            if (hasUpgrade("st", 32)) gain = gain.mul(100)
            if (hasUpgrade("st", 45)) gain = gain.mul(20)
            if (hasUpgrade("s", 44)) gain = gain.mul(27.08)
            if (getBuyableAmount("st", 11).gte(215)) gain = gain.mul(getBuyableAmount("st", 13))
            if (hasMilestone("st", 26)) gain = gain.mul(26)
            if (hasMilestone("st", 27)) gain = gain.mul(40)
            if (getBuyableAmount("st", 12).gte(5)) gain = gain.mul(5)
            gain = gain.times(player.s.cmult.pow(0.5))
            if (hasUpgrade("st", 12)) gain = gain.mul(upgradeEffect("st", 12))
            if (hasUpgrade("st", 14)) gain = gain.mul(upgradeEffect("st", 14))
            if (hasUpgrade("st", 15)) gain = gain.mul(upgradeEffect("st", 15))
            if (hasUpgrade("st", 25)) gain = gain.mul(buyableEffect("st", 11))
            if (hasUpgrade("st", 25)) gain = gain.mul(buyableEffect("st", 12))
            if (hasUpgrade("st", 34)) gain = gain.mul(upgradeEffect("st", 34))
            if (hasUpgrade("st", 52)) gain = gain.mul(upgradeEffect("st", 52))
            if ((hasUpgrade("st", 54) && player.st.research.gte(2.5e246) && getBuyableAmount("st", 11).gte(281)) || hasUpgrade("st", 55)) {
                if (options.notation !== 'blind') {
                    gain = gain.mul(notationMult)
                    if (player.st.research.lt(0)) player.st.research = new Decimal(1000)
                }
            } else {
                if (hasUpgrade("st", 22)) gain = gain.mul(notationMult)
            }
            
            if (hasUpgrade("st", 33)) gain = gain.mul(themeMult)
            if (hasUpgrade("n", 15)) {
                gain = gain.mul(actionMult)
                if (player.n.points.gte("e14150")) gain = gain.mul(14.15)
            }

            // exponent
            if (getBuyableAmount("st", 12).gte(33) && gain.gte(1)) gain = gain.pow(1.02)
            if (((hasUpgrade("st", 54) && player.st.research.gte(2.5e246) && getBuyableAmount("st", 11).gte(281)) || hasUpgrade("st", 55)) && options.notation === 'blind') gain = gain.mul(-1)
            player.st.resps = gain
            player.st.research = player.st.research.add(gain.mul(diff))
        }
    },
    tooltip() {
        let tt = "Star Tier " + notationChooser(player.st.points)
        if (hasMilestone("st", 25)) tt = tt + ", " + notationChooser(player.st.research) + " Research"
        return tt
    },
    glowColor() {
        let layer = 'st'
        for (id in tmp[layer].upgrades){
            if (isPlainObject(layers[layer].upgrades[id])){
                if (canAffordUpgrade(layer, id) && !hasUpgrade(layer, id) && tmp[layer].upgrades[id].unlocked){
                    return "red"
                }
            }
        }
        for(i=11;i<14;i++){ 
            if (canBuyBuyable(layer, i)) {
                return "blue"
            }
        }
    }
})