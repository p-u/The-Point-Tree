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
        if (player.cl.points.gte(4)) expo = new Decimal(2.3)
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
            effectDescription: "Foundation Value increases CE gain (Formula: 2.3 tetrated to the slog of FV)x. Also, keep Molecule Milestones on reset, Molecule/Matter row 1 n 2 ups",
            done() { return player.cl.points.gte(4) }
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
            ],
        },
    },
    upgrades: {
        11: {
            title: "Q-1: Automate Shrinkenator 3",
            cost: new Decimal(5000),
            unlocked() { return ((hasMilestone("cl", 4) && !(hasUpgrade("cl", 11))) || (hasUpgrade("cl", 11) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        12: {
            title: "Q-2: Max-buy Boosters 1-3",
            cost: new Decimal(34433),
            unlocked() { return ((hasUpgrade("cl", 11) && !(hasUpgrade("cl", 12))) || (hasUpgrade("cl", 12) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        13: {
            title: "Q-3: Passively assign Epsilon Particles",
            cost: new Decimal(100e3),
            unlocked() { return ((hasUpgrade("cl", 12) && !(hasUpgrade("cl", 13))) || (hasUpgrade("cl", 13) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        14: {
            title: "Q-4: Boosters 6-8 cost nothing",
            cost: new Decimal(280e3),
            unlocked() { return ((hasUpgrade("cl", 13) && !(hasUpgrade("cl", 14))) || (hasUpgrade("cl", 14) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        15: {
            title: "Q-5: x10 Particle Passive Gen",
            cost: new Decimal(1.6e6),
            unlocked() { return ((hasUpgrade("cl", 14) && !(hasUpgrade("cl", 15))) || (hasUpgrade("cl", 15) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        16: {
            title: "Q-6: Autobuy Booster 8 and buy-max Booster 4.",
            cost: new Decimal(4e6),
            unlocked() { return ((hasUpgrade("cl", 15) && !(hasUpgrade("cl", 16))) || (hasUpgrade("cl", 16) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
        17: {
            title: "B-1: Decent Boostage",
            cost: new Decimal(45000),
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
            cost: new Decimal(112500),
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
            cost: new Decimal(650000),
            description: "When bought, gain +7% CE for every CE Upgrade bought. If you have 1M CE on hand, boost MoB and SP based on CE, extend Molecule and Shrinkenator ups.",
            unlocked() { return ((hasUpgrade("cl", 18) && !(hasUpgrade("cl", 19))) || (hasUpgrade("cl", 19) && player.cl.showbought)) }, 
            style() {return {
                'width': '250px',
                'height': '100px',
            }},
            effect() {
                ceupcomp = new Decimal(1.07)
                let eff = ceupcomp.pow(player.cl.upgrades.length)
                return eff
            },
            effectDisplay() {
                desc = notationChooser(upgradeEffect(this.layer, this.id))+"x"
                if (hasUpgrade("cl", 19) && player.cl.energy.gte(1e6)) desc = desc + ", x"+ notationChooser(player.cl.energy.pow(0.5)) + " CE, x" + notationChooser(player.cl.energy.pow(0.04)) + " SP."
                return desc
            },
            tooltip() {
                return "Formula: "  + ceupcomp + "^CEUps, Molecule: CE^0.5, SP: CE^0.04"
            },
            currencyDisplayName: "Core Energy",
            currencyInternalName: "energy",
            currencyLayer: "cl",
        },
    },
    update(diff) {
        if (hasMilestone("cl", 1)) {
            player.cl.engen = new Decimal(1)
            if (hasMilestone("cl", 2)) player.cl.engen = player.cl.engen.mul(2.5)
            if (hasUpgrade("cl", 17)) player.cl.engen = player.cl.engen.mul(2)
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
});
