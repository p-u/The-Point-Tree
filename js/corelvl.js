addLayer("cl", {
    name: "Core Level",
    symbol: "CL",
    position: 1,
    startData() { 
        return {                  
            unlocked: false,
            points: new Decimal(0),
            energy: new Decimal(0),
            engen: new Decimal(0),
            showbought: true,
        };
    },
    layerShown(){
        let visible = false
        if (hasMilestone('cf', 7) || player.cl.unlocked) visible = true
       return visible
    },
    color: "#B967FF",
    requires: new Decimal("e28650"),
    resource: "Core Level",
    baseResource: "Foundation Value",
    baseAmount() { return player.en.foundationval; },
    type: "static",
    exponent() {
        let expo = new Decimal(2.6)
        if (player.cl.points.eq(2)) expo = new Decimal(1.75)
        if (player.cl.points.eq(3)) expo = new Decimal(1.66)
        if (player.cl.points.eq(4)) expo = new Decimal(2.34)
        if (player.cl.points.eq(5)) expo = new Decimal(2.5)
        return expo
    },
    base() {
        let bas = new Decimal("1e1000")
        if (player.cl.points.lt(2)) bas = new Decimal("e1850")
        return bas
    },
    gainMult() {
        let mult = new Decimal(1);
        return mult;
    },
    gainExp() {
        return new Decimal(1);
    },
    branches: ["ma", "mo", "en", "pa"], // Layers that this layer depends on
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Increase your Core Level!", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    milestones: {
        1: {
            requirementDescription: "Core Level 1",
            effectDescription: "Well, after 12ish hours, you finally reach the mid-game of World Growth: Core Level! Core Level (Core Lvl/CL) generates Core Energy (CE). Generate one CE a second. You also might start to notice your core getting bigger... x10^slog(CE+1) all previous stats (Atoms, Energy, Power, Matter, Molecule Bonds, Particles, Shrink Points, Shrink Speed). Also x1.25 Clicks and ^1.004 Atoms. Automate some stuff.",
            done() { return player.cl.points.gte(1) }
        },
        2: {
            requirementDescription: "Core Level 2",
            effectDescription: "xCL Shrink Speed, xCL and an additional x2.5 multiplier to CE, xCL^2 Particles. ^1.003 Atoms. Automate Booster 6.",
            done() { return player.cl.points.gte(2) }
        },
        3: {
            requirementDescription: "Core Level 3",
            effectDescription: "Automate even more things, x5 Molecule n Particle Passive Gen. Increase booster base to 11. Add a new Particle Milestone. Nerf Gamma Particle's nerf.",
            done() { return player.cl.points.gte(3) }
        },
        4: {
            requirementDescription: "Core Level 4",
            effectDescription: "Foundation Value increases CE gain (Formula: 2.3 tetrated to the slog of FV)x. Also, keep Molecule Milestones on reset, Molecule/Matter row 1 n 2 ups. Unlock Core Energy Upgrades, and a new Particle Milestone.",
            done() { return player.cl.points.gte(4) }
        },
        5: {
            requirementDescription: "Core Level 5",
            effectDescription: "Keep all Energy ups, first 2 rows of Particle ups on reset. x12.5 CE, ^1.2 Shrink Speed",
            done() { return player.cl.points.gte(5) }
        },
    },
    tabFormat: {
        "Main Reset Area": {
            content: [
                ["raw-html", function() {
                    // Calculate size based on your formula
                    const size = Decimal.min(Decimal.max(new Decimal(1.1).sub(new Decimal(0.015).mul(player.cl.points)), new Decimal(1.05)).pow(player.cl.points).mul(new Decimal(player.cl.energy).add(1).slog().pow(2)).mul(5), new Decimal(1678)).toNumber();
                    
                    return `
                        <div style="
                            position: absolute;
                            top: 85%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: ${size}px;
                            height: ${size}px;
                            border-radius: 50%;
                            background: radial-gradient(circle, #FFFFFF 5%, #FFD700 59%, #FFA500 100%);
                            box-shadow: 
                                0 0 ${size/2}px #FFD700,
                                0 0 ${size/1.5}px #FFA500,
                                0 0 ${size/1.2}px rgba(255, 215, 0, 0.4),
                                0 0 ${size}px rgba(255, 165, 0, 0.2);
                            z-index: -1;
                            pointer-events: none;
                            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                        "></div>
                    `;
                }],
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `Your Core Level is 
                        <h2><span style="color: #B967FF; text-shadow: 0px 0px 10px #c0847eff; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.cl.points)}</span></h2>`
                        return a
                    }
                ],
                "blank",
                "blank",
                "prestige-button",
                "blank",
                "blank",
                ["bar", "next"],
                "blank",
                ["infobox", "cl"],
                "blank",
                ["display-text", "Your Core: ↓"]
            ],
        },
        "Milestones Viewer": {
            content: [
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `Your Core Level is 
                        <h2><span style="color: #B967FF; text-shadow: 0px 0px 10px #c0847eff; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.cl.points)}</span></h2>`
                        return a
                    }
                ],
                "blank",
                "blank",
                "milestones",
            ],
        },
        "Core Energy and its upgrades": {
            content: [
                ["raw-html", function() {
                    // Calculate size based on your formula
                    const size = Decimal.min(Decimal.max(new Decimal(1.1).sub(new Decimal(0.015).mul(player.cl.points)), new Decimal(1.05)).pow(player.cl.points).mul(new Decimal(player.cl.energy).add(1).slog().pow(2)).mul(5), new Decimal(1678)).toNumber();
                    
                    return `
                        <div style="
                            position: absolute;
                            top: 70%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: ${size}px;
                            height: ${size}px;
                            border-radius: 50%;
                            background: radial-gradient(circle, #FFFFFF 5%, #FFD700 59%, #FFA500 100%);
                            box-shadow: 
                                0 0 ${size/2}px #FFD700,
                                0 0 ${size/1.5}px #FFA500,
                                0 0 ${size/1.2}px rgba(255, 215, 0, 0.4),
                                0 0 ${size}px rgba(255, 165, 0, 0.2);
                            z-index: -1;
                            pointer-events: none;
                            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                        "></div>
                    `;
                }],
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `Your Core Level is 
                        <h2><span style="color: #B967FF; text-shadow: 0px 0px 10px #c0847eff; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.cl.points)}</span></h2>`
                        return a
                    }
                ],
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `You have 
                        <h2><span style="color: #00FFAA; text-shadow: 0px 0px 10px #8fc0cfff; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.cl.energy)}</span></h2> Core Energy`
                        a = a + " (+" + notationChooser(player.cl.engen) + " CE/s)"
                        return a
                    }
                ],
                "blank",
                "blank",
                "clickables",
                "blank",
                "blank",
                "blank",
                "upgrades",
                "blank",
                "blank",
                "buyables",
                "blank",
                "blank",
                ["infobox", "ceups"]
            ],
        },
    },
    upgrades: {
        11: {
            title: "Q-1: Automate Shrinkenator 3",
            cost: new Decimal(10000),
            unlocked() { return ((hasMilestone("cl", 4) && !(hasUpgrade("cl", 11))) || (hasUpgrade("cl", 11) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            description: "Good Automation to prevent more clicking",
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        12: {
            title: "Q-2: Max-buy Boosters 1-3",
            cost: new Decimal(32500),
            unlocked() { return ((hasUpgrade("cl", 11) && !(hasUpgrade("cl", 12))) || (hasUpgrade("cl", 12) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            description: "Good Automation to prepare for later and prevent waiting that much",
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        13: {
            title: "Q-3: Passively assign Epsilon Particles",
            cost: new Decimal(111e3),
            unlocked() { return ((hasUpgrade("cl", 12) && !(hasUpgrade("cl", 13))) || (hasUpgrade("cl", 13) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            description: "Good Automation for Early-game and after buying an upgrade",
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        14: {
            title: "Q-4: Boosters 6-8 cost nothing",
            cost: new Decimal(300e3),
            unlocked() { return ((hasUpgrade("cl", 13) && !(hasUpgrade("cl", 14))) || (hasUpgrade("cl", 14) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            description: "well, now all boosters dont cost anything",
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        15: {
            title: "Q-5: x10 Particle Passive Gen",
            cost: new Decimal(1.5e6),
            unlocked() { return ((hasUpgrade("cl", 14) && !(hasUpgrade("cl", 15))) || (hasUpgrade("cl", 15) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            description: "Pro Tip: Buy this upgrade once you reach ~3M CE with B-3 upgrade, as it also boosts progression",
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        16: {
            title: "Q-6: Autobuy Booster 8 and buy-max Booster 4.",
            cost: new Decimal(5e6),
            unlocked() { return ((hasUpgrade("cl", 15) && !(hasUpgrade("cl", 16))) || (hasUpgrade("cl", 16) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            description: "well, now all boosters are autobought",
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        17: {
            title: "B-1: Decent Boostage",
            cost: new Decimal(40000),
            description: "x2 CE and SP",
            unlocked() { return ((hasMilestone("cl", 4) && !(hasUpgrade("cl", 17))) || (hasUpgrade("cl", 17) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        18: {
            title: "B-2: Further CEx",
            cost: new Decimal(111111),
            description: "CE gets boosted based on itself",
            unlocked() { return ((hasUpgrade("cl", 17) && !(hasUpgrade("cl", 18))) || (hasUpgrade("cl", 18) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            effect() {
                cebi = 0.15
                softcapDescriptionce18 = ""
                sdsc = ""
                let eff = player.cl.energy.add(1).pow(cebi)
                return eff
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionce18
            },
            tooltip() {
                return "Formula: (CE+1)^"  + cebi + sdsc
            },
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        19: {
            title: "B-3: Mult-upg 1",
            cost: new Decimal(600000),
            description: "When bought, gain +7% CE for every CE Upgrade bought. If you have 1M CE on hand, boost MoB and SP based on CE, extend Molecule and Shrinkenator ups.",
            unlocked() { return ((hasUpgrade("cl", 18) && !(hasUpgrade("cl", 19))) || (hasUpgrade("cl", 19) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            effect() {
                ceupcomp = new Decimal(1.07)
                if (hasUpgrade("cl", 31) && player.cl.energy.gte(50e6)) ceupcomp = new Decimal(1.11)
                let eff = ceupcomp.pow(player.cl.upgrades.length)
                return eff
            },
            effectDisplay() {
                desc = notationChooser(upgradeEffect(this.layer, this.id))+"x"
                if (hasUpgrade("cl", 19) && player.cl.energy.gte(1e6)) desc = desc + ", x"+ notationChooser(player.cl.energy.pow(0.5)) + " MoB, x" + notationChooser(player.cl.energy.pow(0.04)) + " SP."
                return desc
            },
            tooltip() {
                return "Formula: "  + ceupcomp + "^CEUps, Molecule: CE^0.5, SP: CE^0.04"
            },
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        21: {
            title: "B-4: More Boostage",
            cost: new Decimal(8e6),
            description: "x6 CE and xe60 Atoms",
            unlocked() { return ((hasUpgrade("cl", 19) && !(hasUpgrade("cl", 21))) || (hasUpgrade("cl", 21) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        22: {
            title: "B-5: Overarching Dominance",
            cost: new Decimal(8e7),
            description: "Unlock the Omega-Booster. When you have 100M CE, xe500 Atoms, x1.1 CE. Unlock a new Molecule Milestone",
            unlocked() { return ((hasUpgrade("cl", 21) && !(hasUpgrade("cl", 22))) || (hasUpgrade("cl", 22) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        23: {
            title: "B-6: Simple mult",
            cost: new Decimal(2.25e8),
            description: "x2.25 CE, xe22.5 Matter",
            unlocked() { return ((hasUpgrade("cl", 22) && !(hasUpgrade("cl", 23))) || (hasUpgrade("cl", 23) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        24: {
            title: "B-7: Sponsorship",
            cost: new Decimal(1.4e9),
            description: "The Shrinking team gets a sponsorship! It now shrinks faster and gains more SP per shrink. Also gain more atom boost from SP.",
            unlocked() { return ((hasUpgrade("cl", 23) && !(hasUpgrade("cl", 24))) || (hasUpgrade("cl", 24) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        25: {
            title: "B-8: Cash Prize",
            cost: new Decimal(12e9),
            description: "The Shrinking Team won Gold! x5 Shrink Points, x1.25 CE [would recommend you get CL5 before these upgrades]",
            unlocked() { return ((hasUpgrade("cl", 24) && !(hasUpgrade("cl", 25))) || (hasUpgrade("cl", 25) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        26: {
            title: "B-9: First CE-tradeoff",
            cost: new Decimal(80e9),
            description: "Power boosts Atoms more but Energy less",
            unlocked() { return ((hasUpgrade("cl", 25) && !(hasUpgrade("cl", 26))) || (hasUpgrade("cl", 26) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        31: {
            title: "Q-7: Buy-max Booster 5",
            cost: new Decimal(1.4e7),
            unlocked() { return ((hasUpgrade("cl", 16) && !(hasUpgrade("cl", 31))) || (hasUpgrade("cl", 31) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            description: "This may not feel like a game-changing upgrade, but it is. Save for this after buying B-5. [Hidden Effect at 50M CE on hand after bought]",
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        32: {
            title: "Q-8: Buy-max Booster 6",
            cost: new Decimal(6e7),
            unlocked() { return ((hasUpgrade("cl", 31) && !(hasUpgrade("cl", 32))) || (hasUpgrade("cl", 32) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            description: "Same thing, for B-5. Also can be delayed till after B-6.",
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        33: {
            title: "Q-9: Automate Shrinkenator IV",
            cost: new Decimal(1.8e8),
            unlocked() { return ((hasUpgrade("cl", 32) && !(hasUpgrade("cl", 33))) || (hasUpgrade("cl", 33) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            description: "well, now all shrinkenators are autobought [Hidden effect at 400M CE on hand after bought]",
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        34: {
            title: "Q-10: Remove Atom division from Gen 9",
            cost: new Decimal(8e8),
            unlocked() { return ((hasUpgrade("cl", 33) && !(hasUpgrade("cl", 34))) || (hasUpgrade("cl", 34) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            description: "finally letting atoms increase when gen9 is bought [If bought, have 1.5B CE on hand and have 3.14e314 Epsilon Particles, activate the secret effect]",
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        35: {
            title: "Q-11: Assigning++ 1",
            cost: new Decimal(1e10),
            unlocked() { return ((hasMilestone("mo", 15) && !(hasUpgrade("cl", 35))) || (hasUpgrade("cl", 35) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            description: "Unlock an 'Assign Equally' button in the Particles layer.",
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        36: {
            title: "Q-12: Assigning++ 2",
            cost: new Decimal(1e11),
            unlocked() { return ((hasUpgrade("cl", 35) && !(hasUpgrade("cl", 36))) || (hasUpgrade("cl", 36) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            description: "The rate at which the Epsilon Particles get assigned is pentupled.",
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
    },
    update(diff) {
        if (hasMilestone("cl", 1)) {
            player.cl.engen = new Decimal(1)
            if (hasMilestone("cl", 2)) player.cl.engen = player.cl.engen.mul(2.5)
            if (hasMilestone("cl", 5)) player.cl.engen = player.cl.engen.mul(12.5)
            if (hasUpgrade("cl", 17)) player.cl.engen = player.cl.engen.mul(2)
            if (hasMilestone("mo", 15)) player.cl.engen = player.cl.engen.mul(1.47)
            if (hasUpgrade("cl", 22) && player.cl.energy.gte(1e8)) player.cl.engen = player.cl.engen.mul(1.1)
            if (hasUpgrade("cl", 33) && player.cl.energy.gte(4e8)) player.cl.engen = player.cl.engen.mul(1.1)
            if (hasUpgrade("cl", 23)) player.cl.engen = player.cl.engen.mul(2.25)
            if (hasUpgrade("cl", 25)) player.cl.engen = player.cl.engen.mul(1.25)
            if (player.cm.clickmastery.gte(5e13) && hasMilestone("w", 4)) player.cl.engen = player.cl.engen.mul(1.05)
            if (player.cm.clickmastery.gte(1.4e15) && hasMilestone("w", 4)) player.cl.engen = player.cl.engen.mul(1.06)
            if (hasUpgrade("cl", 21)) player.cl.engen = player.cl.engen.mul(6)
            if (hasUpgrade("mo", 52)) player.cl.engen = player.cl.engen.mul(player.en.power.add(1).log10().pow(player.en.powerexpoce))
            if (hasUpgrade("cl", 18)) player.cl.engen = player.cl.engen.mul(upgradeEffect("cl", 18))
            if (hasUpgrade("cl", 19)) player.cl.engen = player.cl.engen.mul(upgradeEffect("cl", 19))
            if (hasMilestone("cl", 2)) player.cl.engen = player.cl.engen.mul(player.cl.points)
            if (hasMilestone("cl", 4)) player.cl.engen = player.cl.engen.mul(new Decimal(2.3).tetrate(Decimal.max(player.points, 10).slog()))
            player.cl.energy = player.cl.energy.add(player.cl.engen.mul(diff))
        }
    },
    clickables: {
        11: {
            title() {
                if (player.cl.showbought) {
                    return "Hide bought Core Level Ups."
                } else {
                    return "Show bought Core Level Ups."
                }
            },
            canClick() { return true },
            onClick() {
                player.cl.showbought = !player.cl.showbought
            },
            style() {return {
                'width': '500px',
            }},
        },
    },
    bars: {
        next: {
            direction: RIGHT,
            width: 800,
            height: 60,
            fillStyle: { 'background-color': "#9c67ffff" },
            borderStyle() { return { "border-color": "white" } },
            progress() {
                let prog = player.en.foundationval.add(1).log10().div(getNextAt("cl").log10())
                if (player.en.foundationval.add(1).log10().gte(getNextAt("cl").log10())) prog = 1
                return prog
            },
            display() {
                return "Progress towards Core Level " + notationChooser(player.cl.points.add(1)) + ": " + notationChooser(player.en.foundationval) + "/" + notationChooser(getNextAt("cl")) + " Foundation Value. (" + notationChooser(Decimal.min(player.en.foundationval.add(1).log10().div(getNextAt("cl").log10()).mul(100), new Decimal(100))) + "% to next tier!)"
            },
        },
    },
    infoboxes: {
        cl: {
            title: "Core Level",
            body() { return "Congrats, you finally unlocked me! I am Core Level, the 5th reset layer of the game, resetting everything prior, including Shrink Points. Core Level (Core Lvl/CL) generates Core Energy (CE) every second. Core Energy might seem useless in the earlier Core Levels (CL1-3), but they offer a massive boost, amounting to over x10-50 ALL CURRENCIES. The size of the core in the centre of the layer is dependent on your Core Level and Core Energy." },
        },
        ceups: {
            title: "Core Energy Upgrades",
            body() { return "In the beginning, there is nothing here. Core Level 4 unlocks the upgrades. There are 2 types of upgrades, B- (boosts to the main game) and Q- (QoL improvements). It is mainly recommended to prioritise the B- upgrades, but some Q- upgrades may have hidden boosts that can affect the maingame." },
        },
    },
});
