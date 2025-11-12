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
        };
    },
    layerShown(){
        let visible = false
        if (hasMilestone('cf', 7) || player.cl.unlocked) visible = true
       return visible
    },
    color: "#B967FF",
    requires: new Decimal("e28700"),
    resource: "Core Level",
    baseResource: "Foundation Value",
    baseAmount() { return player.en.foundationval; },
    type: "static",
    exponent() {
        let expo = new Decimal(10.3)
        if (player.cl.points.gte(3)) expo = new Decimal(7.91)
        if (player.cl.points.gte(4)) expo = new Decimal(7)
        return expo
    },
    base: 10,
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
            effectDescription: "xCL Shrink Speed, xCL and an additional x2.5 multiplier to CE, xCL^2 Particles. ^1.003 Atoms",
            done() { return player.cl.points.gte(2) }
        },
        3: {
            requirementDescription: "Core Level 3",
            effectDescription: "Automate even more things, x5 Molecule n Particle Passive Gen. Increase booster base to 11. Add a new Particle Milestone. Nerf Gamma Particle's nerf.",
            done() { return player.cl.points.gte(3) }
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
                        a = a + " (+" + player.cl.engen + " CE/s)"
                        return a
                    }
                ],
                "blank",
                "blank",
                "upgrades",
            ],
        },
    },
    update(diff) {
        if (hasMilestone("cl", 1)) {
            player.cl.engen = new Decimal(1)
            if (hasMilestone("cl", 2)) player.cl.engen = player.cl.engen.mul(2.5)
            if (hasMilestone("cl", 2)) player.cl.engen = player.cl.engen.mul(player.cl.points)
            player.cl.energy = player.cl.energy.add(player.cl.engen.mul(diff))
        }
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
                return "Progress towards Core Level " + player.cl.points.add(1) + ": " + notationChooser(player.en.foundationval) + "/" + notationChooser(getNextAt("cl")) + " Foundation Value. (" + Decimal.min(player.en.foundationval.add(1).log10().div(getNextAt("cl").log10()).mul(100), new Decimal(100)) + "% to next tier!)"
            }
        },
    },
});
