addLayer("era", {
    name: "Era", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ERA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        ec: new Decimal(0),
        ecg: new Decimal(0),
        infec: new Decimal(0),
        ef: new Decimal(0),
        eftotal: new Decimal(0),
        baseef: new Decimal(0),
        nerf: new Decimal(1),
        nerfexponent: new Decimal(3),
        multaftnerf: new Decimal(1),
    }},
    layerShown(){
        let visible = false
        if (hasMilestone('sac', 73) || player.era.unlocked || player["era"].points.gte(1)) visible = true
       return visible
    },
    doReset(era) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[era].row <= this.row) return;
    
        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones
        let keptUpgrades = [];
    
    
        // Stage 3, track which main features you want to keep - milestones
        let keep = [];
        if (hasAchievement("a", 243)) keep.push("milestones");
        if (hasAchievement("a", 243)) keep.push("upgrades");
        
    
        // Stage 4, do the actual data reset
        layerDataReset(this.layer, keep);
    
        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].upgrades.push(...keptUpgrades);
    }, 
    infinity() {
        if (player.era.ec.gte(1e100)) player.era.infec = player.era.ec.log(new Decimal(2).pow(1024)).floor()
    },
    tabFormat: {
        "Main tab": {
            content: [
                "main-display",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `You have 
                        <h2><span style="color: blue; text-shadow: 0px 0px 10px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.era.ec)}</span></h2> Era Crystals`
                        return a
                    }
                ],
                ["display-text",
                    function(){
                        let a = ""
                        a = a + "You are gaining " + notationChooser(player.era.ecg) + " Era Crystals a second."
                        return a
                    }
                ],
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        if (player.era.infec.gte(1)) a = a + "You have " + notationChooser(player.era.infec) + " Infinite Era Crystals. Each Infinite Era Crystal increases Era Crystal gain by 10. Every new Infinite Era Crystal requires 2^1024 more Era Crystals than the previous."
                        return a
                    }
                ],
                "blank",
                ["display-text", "What's next? How many seconds, years, eras, timelines and infinities of playing to come?"],
                "blank",
                "prestige-button",
                "blank",
                "blank",
                ["milestones", [1,2,3,4]]
            ],
        },
        "The Tree": {
            content: [
                "main-display",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `You have 
                        <h2><span style="color: blue; text-shadow: 0px 0px 10px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.era.ec)}</span></h2> Era Crystals`
                        return a
                    }
                ],
                ["display-text",
                    function(){
                        let a = ""
                        a = a + "You are gaining " + notationChooser(player.era.ecg) + " Era Crystals a second."
                        return a
                    }
                ],
                "blank",
                ["display-text", function() { return "You have "+player.era.upgrades.length+"/"+(Object.keys(tmp.era.upgrades).length-2)+" era upgrades." }], 
                "blank",
                "blank",
                ["upgrades", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]],
            ],
            unlocked() {return hasMilestone("era", 1)}
        },
        "The Advanced Tree": {
            content: [
                "main-display",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `You have 
                        <h2><span style="color: blue; text-shadow: 0px 0px 10px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.era.ec)}</span></h2> Era Crystals`
                        return a
                    }
                ],
                ["display-text",
                    function(){
                        let a = ""
                        a = a + "You are gaining " + notationChooser(player.era.ecg) + " Era Crystals a second."
                        return a
                    }
                ],
                "blank",
                ["display-text", function() { return "You have "+player.era.upgrades.length+"/"+(Object.keys(tmp.era.upgrades).length-2)+" era upgrades." }], 
                "blank",
                "blank",
                ["upgrades", [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]],
            ],
            unlocked() {return hasAchievement("a", 246)}
        },
        "Era Buyables": {
            unlocked() { return (hasUpgrade('era', 143))},
            content: [
                "main-display",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `You have 
                        <h2><span style="color: blue; text-shadow: 0px 0px 10px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.era.ec)}</span></h2> Era Crystals`
                        return a
                    }
                ],
                ["display-text",
                    function(){
                        let a = ""
                        a = a + "You are gaining " + notationChooser(player.era.ecg) + " Era Crystals a second."
                        return a
                    }
                ],
                "blank",
                "blank",
                "buyables"
            ],
        },
        "Era Fragments and its upgrades": {
            content: [
                "main-display",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + `You have 
                        <h2><span style="color: green; text-shadow: 0px 0px 10px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${notationChooser(player.era.ef)}</span></h2> Era Fragments`
                        return a
                    }
                ],
                "blank",
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + "You are gaining " + notationChooser((player.era.baseef.div(player.era.nerf).mul(player.era.multaftnerf))) + " Era Fragments a second. "
                        a = a + "(Base EF: " + notationChooser((player.era.baseef)) + "), affected by stuff that boosts base EF, EF after nerf, and the slog of PF and EC. "
                        return a
                    }
                ],
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + "You have a total of " + notationChooser(player.era.eftotal) + " Era Fragments. (Unlike the other layers, EF Milestones require TOTAL EF and not CURRENT EF. Thus, you may not want to instantly buy the upgrade/buy buyables when you have enough.)"
                        return a
                    }
                ],
                "blank",
                ["display-text",
                    function(){
                        let a = ""
                        a = a + "Nerf: /" + notationChooser((player.era.nerf)) + ". (For every doubling of EF past 10, the function multiplies by " + notationChooser((player.era.nerfexponent)) + "). [If Base EF gain is <100, min nerf is 1. Else, min nerf is BaseEF^0.4]. "
                        a = a + "The multiplier of x" + notationChooser((player.era.multaftnerf)) + " to EF gain bypasses the nerf."
                        return a
                    }
                ],
                "blank",
                "blank",
                ["milestones", [101,102,103,104,105,106,107,108,109,110]],
                "blank",
                "blank",
                ["upgrades", [101,102,103,104,105,106,107,108,109,110]],
            ],
            unlocked() {return hasUpgrade("era", 501)}
        },
        "Info after Era": {
            content: [
                ["display-text", "Firstly, let's talk about softcaps. There are many softcaps after e1T effect, ranging from e1T to e15T and some at ee15. You will see some caps."],
                ["display-text", "Why is there a hardcap for Supreme Buyable 5? It is just TOO OP. Hardcap varies, but starts at ^1.25."],
                ["display-text", "What is Era Crystals? It is an elusive currency for Era, and is generated. This is used to buy Tree Upgrades. These Tree Upgrades have branches connecting to them."],
                ["display-text", "Era Upgrade Naming System: A '+1' to the name will only be added IF the upgrade unlocks other upgrades. If one upgrade unlocks multiple upgrades, it will be 'A', 'B', 'C', 'D', 'E', depending on how many upgrades it unlocks."],
                ["display-text", "Please DO NOT ENTER any Mastery Challenges. Achievements give little to no reward, and when entering Mastery Challenges, it RESETS ERA."],
                ["display-text", "Common new shortforms: EC = Era Crystals, SBx = Supreme Buyable x, MBx = Mega Buyable x, EBx = Era Buyable x (sneak peek), HC = Hardcap"],
                ["display-text", "Insanitycaps - Occurs to Rebirth at e5e15 effect. It is way stronger than all other caps, at a ^0.2 power!"],
                ["display-text", "There will be a 2nd tree. However, this only happens in Era 3. Up to 30 rows per tree. "],
            ],
            unlocked() {return player.era.points.gte(1)},
        },
    },
    automate() {
		if (hasMilestone('sac', 89)) {
			if (layers.era.buyables[11].canAfford()) {
				layers.era.buyables[11].buy();
			};
		};
        if (hasMilestone('sac', 92)) {
			if (layers.era.buyables[12].canAfford()) {
				layers.era.buyables[12].buy();
			};
		};
        if (hasMilestone('sac', 105)) {
			if (layers.era.buyables[13].canAfford()) {
				layers.era.buyables[13].buy();
			};
		};
        if (hasMilestone('sac', 111)) {
			if (layers.era.buyables[14].canAfford()) {
				layers.era.buyables[14].buy();
			};
		};
        if (hasMilestone('era', 101)) {
			if (layers.era.buyables[15].canAfford()) {
				layers.era.buyables[15].buy();
			};
		};
	},
    milestones: {
        1: {
            requirementDescription: "Era One. The start of a new journey.",
            effectDescription: "Start generating Era Crystals, Unlock new tabs. Unlock Auto Sac. ^1.004 PF. Auto-complete SA31 if you have not already.",
            done() { return player["era"].points.gte(1) },
        },
        2: {
            requirementDescription: "Era Two: What's there to come?",
            effectDescription: "Keep Mega Milestones and Buyables on era reset, ^1.015 PF, Less sac scaling, x50 Era Crystals, Unlock more Era Crystal Upgrades and a new DS...",
            done() { return player["era"].points.gte(2) },
            unlocked() { return hasMilestone("era", 1) },
        },
        3: {
            requirementDescription: "Era Three: What more?",
            effectDescription: "Keep all upgrades, milestones and buyables on era reset (excluding sacrifice milestones), ^1.025 PF, x33,333 EC, Less Sac Scaling, More EC Ups",
            done() { return player["era"].points.gte(3) },
            unlocked() { return hasMilestone("era", 2) },
        },
        101: {
            requirementDescription: "EF Milestone 1 - Req 1,750 total EF",
            effectDescription: "Unlock 1 new Era Buyable. Automate Era Buyable 5. Also, unlock more EF upgrades.",
            done() { return player.era.eftotal.gte(1750) },
            unlocked() { return hasUpgrade("era", 501) },
        },
        102: {
            requirementDescription: "EF Milestone 2 - Req 7,500 total EF",
            effectDescription: "Extend Water upgrades. Also, x1.2 EF after nerf. Unlock a new Supreme Buyable??",
            done() { return player.era.eftotal.gte(7500) },
            unlocked() { return hasMilestone("era", 101) },
        },
    },
    upgrades: {
        11: {
            title: "ErUp 1: The first tree upgrade...?",
            description: "x2 Era Crystals",
            cost: new Decimal(600),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['21', '22', '23', '24', '25']
        },
        21: {
            title: "ErUp 3A: To the left",
            description: "xe5B PF",
            cost: new Decimal(4000),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['31', '32', '33', '34', '35', '41'],
            unlocked() {return hasUpgrade("era", 22)}
        },
        22: {
            title: "ErUp 2: Branch??",
            description: "x3 Era Crystals",
            cost: new Decimal(1250),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['21', '23', '31', '32', '33', '34', '35'],
            unlocked() {return hasUpgrade("era", 11)}
        },
        23: {
            title: "ErUp 3B: To the right",
            description: "+^0.05 Water",
            cost: new Decimal(3500),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['31', '32', '33', '34', '35', '44'],
            unlocked() {return hasUpgrade("era", 22)}
        },
        31: {
            title: "ErUp 4A: More Era Crystals, yay!",
            description: "x2 Era Crystals",
            cost: new Decimal(5000),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['41', '42', '43', '44', '51'],
            unlocked() {return (hasUpgrade("era", 21) && hasUpgrade("era", 22) && hasUpgrade("era", 23))}
        },
        32: {
            title: "ErUp 4B: Even More Era Crystals",
            description: "x1.5 Era Crystals",
            cost: new Decimal(769),
            currencyDisplayName: "Sacrifices",
            currencyInternalName: "points",
            currencyLayer: "sac",
            branches: ['41', '42', '43', '44', '52'],
            unlocked() {return (hasUpgrade("era", 21) && hasUpgrade("era", 22) && hasUpgrade("era", 23))}
        },
        41: {
            title: "ErUp 5A: Small PF Power",
            description: "^1.003 PF",
            cost: new Decimal(23000),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['51', '52', '61'],
            unlocked() {return (hasUpgrade("era", 31) && hasUpgrade("era", 32))}
        },
        42: {
            title: "ErUp 5B: Small EC Mult",
            description: "x1.3 Era Crystals",
            cost: new Decimal(17500),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['51', '52', '53', '54', '55'],
            unlocked() {return (hasUpgrade("era", 31) && hasUpgrade("era", 32))}
        },
        43: {
            title: "ErUp 5C: Stronk Buyable (M)",
            description: "Mega Buyables 1-3 are stronger",
            cost: new Decimal(25000),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['51', '52', '53', '54', '55'],
            unlocked() {return (hasUpgrade("era", 31) && hasUpgrade("era", 32))}
        },
        44: {
            title: "ErUp 5D: Stronk Buyable (S)",
            description: "Supreme Buyables 1-4 are stronger",
            cost: new Decimal(25000),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['51', '52', '53', '54', '55', '64'],
            unlocked() {return (hasUpgrade("era", 31) && hasUpgrade("era", 32))}
        },
        51: {
            title: "ErUp 6A: Powering It Up!",
            description: "^1.0075 PF",
            cost: new Decimal(30000),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['61', '62', '63', '64', '71'],
            unlocked() {return (hasUpgrade("era", 41) && hasUpgrade("era", 42) && hasUpgrade("era", 43) && hasUpgrade("era", 44))}
        },
        52: {
            title: "ErUp 6B: Supreme Extension! And something else",
            description: "xe20B PF",
            cost: new Decimal(33000),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['61', '62', '63', '64', '73'],
            unlocked() {return (hasUpgrade("era", 41) && hasUpgrade("era", 42) && hasUpgrade("era", 43) && hasUpgrade("era", 44))}
        },
        61: {
            title: "ErUp 7A: Era Rep Up 1",
            description: "x1.3 Era Crystals",
            cost: new Decimal(444444),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['71', '72', '73', '74'],
            unlocked() {return hasUpgrade("s", 114)}
        },
        62: {
            title: "ErUp 7B: Era Rep Up 2",
            description: "x1.3 Era Crystals",
            cost: new Decimal(444444),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['71', '72', '73', '74'],
            unlocked() {return hasUpgrade("s", 114)}
        },
        63: {
            title: "ErUp 7C: Era Rep Up 3",
            description: "x1.3 Era Crystals",
            cost: new Decimal(444444),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['71', '72', '73', '74'],
            unlocked() {return hasUpgrade("s", 114)}
        },
        64: {
            title: "ErUp 7D: Era Rep Up 4",
            description: "x1.3 Era Crystals",
            cost: new Decimal(444444),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['71', '72', '73', '74'],
            unlocked() {return hasUpgrade("s", 114)}
        },
        71: {
            title: "ErUp 8A",
            description: "Add +^0.008 to SB5 cap",
            cost: new Decimal(999999),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['81', '82', '83', '84', '85'],
            unlocked() {return (hasUpgrade("era", 61) && hasUpgrade("era", 62) && hasUpgrade("era", 63) && hasUpgrade("era", 64))}
        },
        72: {
            title: "ErUp 8B",
            description: "^1.01 PF",
            cost: new Decimal(1333333),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['81', '82', '83', '84', '85'],
            unlocked() {return (hasUpgrade("era", 61) && hasUpgrade("era", 62) && hasUpgrade("era", 63) && hasUpgrade("era", 64))}
        },
        73: {
            title: "ErUp 8C",
            description: "xe60B PF",
            cost: new Decimal(1111111),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['81', '82', '83', '84', '85'],
            unlocked() {return (hasUpgrade("era", 61) && hasUpgrade("era", 62) && hasUpgrade("era", 63) && hasUpgrade("era", 64))}
        },
        74: {
            title: "ErUp 8D",
            description: "x4 Era Crystals",
            cost: new Decimal(987),
            currencyDisplayName: "Sacrifices",
            currencyInternalName: "points",
            currencyLayer: "sac",
            branches: ['81', '82', '83', '84', '85'],
            unlocked() {return (hasUpgrade("era", 61) && hasUpgrade("era", 62) && hasUpgrade("era", 63) && hasUpgrade("era", 64))}
        },
        81: {
            title: "ErUp 10A",
            description: "Mega base effect is better",
            cost: new Decimal(37.5e6),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['91', '101', '111', '112'],
            unlocked() {return (hasUpgrade("era", 71) && hasUpgrade("era", 72) && hasUpgrade("era", 73) && hasUpgrade("era", 74))}
        },
        82: {
            title: "ErUp 10B",
            description: "xe200B PF",
            cost: new Decimal(40e6),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['91', '101', '111', '112'],
            unlocked() {return (hasUpgrade("era", 71) && hasUpgrade("era", 72) && hasUpgrade("era", 73) && hasUpgrade("era", 74))}
        },
        83: {
            title: "ErUp 9",
            description: "x5 Era Crystals",
            cost: new Decimal(7777777),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['91'],
            unlocked() {return (hasUpgrade("era", 71) && hasUpgrade("era", 72) && hasUpgrade("era", 73) && hasUpgrade("era", 74))}
        },
        84: {
            title: "ErUp 10C",
            description: "SB5 Cap +^0.005",
            cost: new Decimal(35e6),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['91', '103', '114', '115'],
            unlocked() {return (hasUpgrade("era", 71) && hasUpgrade("era", 72) && hasUpgrade("era", 73) && hasUpgrade("era", 74))}
        },
        85: {
            title: "ErUp 10D",
            description: "x1.25 Era Crystals",
            cost: new Decimal(35e6),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['91', '103', '114', '115'],
            unlocked() {return (hasUpgrade("era", 71) && hasUpgrade("era", 72) && hasUpgrade("era", 73) && hasUpgrade("era", 74))}
        },
        91: {
            title: "ErUp 11",
            description: "x4 Era Crystals, ^1.005 PF, Extend Prestige Upgs [Cost: 60M Era Crystals + 1079 Sac]",
            costs: {
                sac: 1079,
                ec: 60e6
              },
              canAfford() {
                return player.sac.points.gte(this.costs.sac)
                    && player.era.ec.gte(this.costs.ec)
              },
              pay() {
                player.sac.points = player.sac.points.minus(this.costs.sac);
                player.era.ec = player.era.ec.minus(this.costs.ec);
              },
            branches: ['101', '102', '103'],
            unlocked() {return (hasUpgrade("era", 81) && hasUpgrade("era", 82) && hasUpgrade("era", 83) && hasUpgrade("era", 84)  && hasUpgrade("era", 85))}
        },
        101: {
            title: "ErUp 12A",
            description: "x1.4 Era Crystals",
            cost: new Decimal(1.7e9),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['111', '112', '113', '114', '115'],
            unlocked() {return hasUpgrade("prestige", 75)}
        },
        102: {
            title: "ErUp 12B",
            description: "SB5 HC +^0.0066",
            cost: new Decimal(2.8e9),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['111', '112', '113', '114', '115'],
            unlocked() {return hasUpgrade("prestige", 75)}
        },
        103: {
            title: "ErUp 12C",
            description: "Basic Upgrade 2 is stronger",
            cost: new Decimal(2.6e9),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['111', '112', '113', '114', '115'],
            unlocked() {return hasUpgrade("prestige", 75)}
        },
        111: {
            title: "ErUp 13A",
            description: "x1.13 Era Crystals",
            cost: new Decimal(2.4e9),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['121', '122', '123', '124', '125'],
            unlocked() {return (hasUpgrade("era", 101) && hasUpgrade("era", 102) && hasUpgrade("era", 103))}
        },
        112: {
            title: "ErUp 13B",
            description: "x2.8 EC, +^0.0066 SB5 HC",
            cost: new Decimal(1372),
            currencyDisplayName: "Sacrifices",
            currencyInternalName: "points",
            currencyLayer: "sac",
            branches: ['121', '122', '123', '124', '125'],
            unlocked() {return (hasUpgrade("era", 101) && hasUpgrade("era", 102) && hasUpgrade("era", 103))}
        },
        113: {
            title: "ErUp 13C",
            description: "Sac scaling is slightly weaker",
            cost: new Decimal(3.2e9),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['121', '122', '123', '124', '125'],
            unlocked() {return (hasUpgrade("era", 101) && hasUpgrade("era", 102) && hasUpgrade("era", 103))}
        },
        114: {
            title: "ErUp 13D",
            description: "xe200B PF",
            cost: new Decimal(2.6e9),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['121', '122', '123', '124', '125'],
            unlocked() {return (hasUpgrade("era", 101) && hasUpgrade("era", 102) && hasUpgrade("era", 103))}
        },
        115: {
            title: "ErUp 13E",
            description: "^1.01 PF",
            cost: new Decimal(3.75e9),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['121', '122', '123', '124', '125'],
            unlocked() {return (hasUpgrade("era", 101) && hasUpgrade("era", 102) && hasUpgrade("era", 103))}
        },
        123: {
            title: "ErUp 14",
            description: "The BEST UPGRADE: xE1T PF!!",
            branches: [],
            cost: new Decimal(1.11e10),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['122', '124', '131', '132', '133'],
            unlocked() {return (hasUpgrade("era", 111) && hasUpgrade("era", 112) && hasUpgrade("era", 113) && hasUpgrade("era", 114)  && hasUpgrade("era", 115))}
        },
        122: {
            title: "ErUp 15A",
            description: "Energy effect is better",
            cost: new Decimal(1.75e12),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['121', '131', '132', '133'],
            unlocked() {return hasUpgrade("era", 123)}
        },
        124: {
            title: "ErUp 15B",
            description: "Major amount of BP",
            cost: new Decimal(1.75e12),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['125', '131', '132', '133'],
            unlocked() {return hasUpgrade("era", 123)}
        },
        121: {
            title: "ErUp 16A",
            description: "xe10B MP",
            cost: new Decimal(2e12),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['121', '131', '132', '133'],
            unlocked() {return hasUpgrade("era", 122)}
        },
        125: {
            title: "ErUp 16B",
            description: "xe1T PF",
            cost: new Decimal(2.2e12),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['125', '131', '132', '133'],
            unlocked() {return hasUpgrade("era", 124)}
        },
        131: {
            title: "ErUp 18A",
            description: "SU21 [now every 1/25k sac is 2x], EU14 is stronger",
            cost: new Decimal(1.2e13),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['141', '142', '143'],
            unlocked() {return hasUpgrade("era", 132)}
        },
        132: {
            title: "ErUp 17",
            description: "+^0.005 SB5 HC, x7 Era Crystals",
            cost: new Decimal(1857),
            currencyDisplayName: "Sacrifices",
            currencyInternalName: "points",
            currencyLayer: "sac",
            branches: ['141', '142', '143'],
            unlocked() {return (hasUpgrade("era", 111) && hasUpgrade("era", 112) && hasUpgrade("era", 113) && hasUpgrade("era", 114)  && hasUpgrade("era", 115))}
        },
        133: {
            title: "ErUp 18B",
            description: "Water effect is stronger",
            cost: new Decimal(1.2e13),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['142', '143', '141'],
            unlocked() {return hasUpgrade("era", 132)}
        },
        141: {
            title: "ErUp 19",
            description: "Extend Rebirth Upgrades, ^1.006 PF",
            branches: ['142', '151', '152', '153', '154', '155'],
            cost: new Decimal(1.6e13),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            unlocked() {return (hasUpgrade("era", 132) && hasUpgrade("era", 131) && hasUpgrade("era", 133))}
        },
        142: {
            title: "ErUp 20",
            description: "Sac scaling is weaker",
            cost: new Decimal(2.2e14),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['143', '151', '152', '153', '154', '155'],
            unlocked() {return hasUpgrade("era", 141)}
        },
        143: {
            title: "ErUp 21",
            description: "Unlock a new tab, and a new ??? [Cost: 2192 Sac and 3e14 (300T) Era Crystals",
            costs: {
                sac: new Decimal(2192),
                ec: new Decimal(3e14),
              },
              canAfford() {
                return player.sac.points.gte(this.costs.sac)
                    && player.era.ec.gte(this.costs.ec)
              },
              pay() {
                player.sac.points = player.sac.points.sub(this.costs.sac);
                player.era.ec = player.era.ec.sub(this.costs.ec);
              },
              branches: ['151', '152', '153', '154', '155'],
            unlocked() {return hasUpgrade("era", 142)}
        },
        153: {
            title: "ErUp 22: Compounding XII",
            description: "Era Crystals boosts its gain",
            cost: new Decimal(4e16),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['152', '154', '161','162','163','164'],
            unlocked() {return hasUpgrade("era", 143)},
            main() {
                eracompexp = 0.07
                if (hasUpgrade("era", 242)) eracompexp = 0.095
                if (hasUpgrade("era", 255)) eracompexp = 0.115
                if (hasUpgrade("era", 33)) eracompexp = 0.14
                softcapDescriptionerup153 = ""
                sdsc = ""
                upgEffecterup153 = upgradeEffect(this.layer, this.id)
            },
            effect() {
                return player["era"].ec.pow(eracompexp).add(1)
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionerup153
            },
            tooltip() {
                return "Formula: EC^"  + eracompexp + sdsc
            },
        },
        151: {
            title: "ErUp 24B",
            description: "+^0.05 MP",
            cost: new Decimal(1.6e19),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['161','162','163','164'],
            unlocked() {return hasUpgrade("era", 152)}
        },
        152: {
            title: "ErUp 23",
            description: "SB5 HC +^0.005",
            cost: new Decimal(8e18),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['161','162','163','164','151' ],
            unlocked() {return hasUpgrade("era", 153)}
        },
        154: {
            title: "ErUp 24A",
            description: "xe2.5T PF",
            cost: new Decimal(1.4e19),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['161','162','163','164', '155'],
            unlocked() {return hasUpgrade("era", 153)}
        },
        155: {
            title: "ErUp 24C",
            description: "^1.01 PF",
            cost: new Decimal(2.2e19),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['161','162','163','164'],
            unlocked() {return hasUpgrade("era", 154)}
        },
        162: {
            title: "ErUp 25A",
            description: "x1.11 Era Crystals",
            cost: new Decimal(1.5e19),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['161', '171', '172', '173', '174', '175'],
            unlocked() {return (hasUpgrade("era", 151) && (hasUpgrade("era", 155)))}
        },
        163: {
            title: "ErUp 25B",
            description: "xe10T PF",
            cost: new Decimal(2.5e19),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['164', '171', '172', '173', '174', '175'],
            unlocked() {return (hasUpgrade("era", 151) && (hasUpgrade("era", 155)))}
        },
        161: {
            title: "ErUp 26A",
            description: "Extend Water Upgrades AND add NEW MILESTONES",
            cost: new Decimal(9e21),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['171', '172', '173', '174', '175'],
            unlocked() {return (hasUpgrade("era", 162))}
        },
        164: {
            title: "ErUp 26B",
            description: "xe20T PF",
            cost: new Decimal(1.22e22),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['171', '172', '173', '174', '175'],
            unlocked() {return (hasUpgrade("era", 163))}
        },
        173: {
            title: "ErUp 27",
            description: "Unlock Era Buyable 2",
            cost: new Decimal(6e23),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['181', '182', '183', '184', '185'],
            unlocked() {return (hasUpgrade("era", 161) && (hasUpgrade("era", 164)))}
        },
        172: {
            title: "ErUp 28A",
            description: "xe1T PP",
            cost: new Decimal(8e34),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['181', '182', '183', '184', '185'],
            unlocked() {return (hasUpgrade("era", 173) && (hasUpgrade("era", 164)))}
        },
        174: {
            title: "ErUp 28B",
            description: "xe11.11T RP",
            cost: new Decimal(8e34),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['181', '182', '183', '184', '185'],
            unlocked() {return (hasUpgrade("era", 173) && (hasUpgrade("era", 164)))}
        },
        171: {
            title: "ErUp 29A",
            description: "xe50T BP, x1.4 Era Crystals",
            cost: new Decimal(1e35),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['181', '182', '183', '184', '185'],
            unlocked() {return (hasUpgrade("era", 172) && (hasUpgrade("era", 174)))}
        },
        175: {
            title: "ErUp 29B",
            description: "xe77.77B MP, x1.4 Era Crystals",
            cost: new Decimal(1.1e35),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['181', '182', '183', '184', '185'],
            unlocked() {return (hasUpgrade("era", 172) && (hasUpgrade("era", 174)))}
        },
        181: {
            title: "ErUp 30A",
            description: "^1.0111 PF",
            cost: new Decimal(1.5e35),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['191','192', '193', '194', '205'],
            unlocked() {return (hasUpgrade("era", 171) && (hasUpgrade("era", 175)))}
        },
        182: {
            title: "ErUp 30B",
            description: "+^0.055 BP",
            cost: new Decimal(1e35),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['191','192', '193', '194'],
            unlocked() {return (hasUpgrade("era", 171) && (hasUpgrade("era", 175)))}
        },
        183: {
            title: "ErUp 30C",
            description: "+^0.07 RP",
            cost: new Decimal(1.2e35),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['191','192', '193', '194'],
            unlocked() {return (hasUpgrade("era", 171) && (hasUpgrade("era", 175)))}
        },
        184: {
            title: "ErUp 30D",
            description: "+^0.12 PP",
            cost: new Decimal(1.25e35),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['191','192', '193', '194'],
            unlocked() {return (hasUpgrade("era", 171) && (hasUpgrade("era", 175)))}
        },
        185: {
            title: "ErUp 30E",
            description: "+^0.12 MP",
            cost: new Decimal(1.2e35),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['191','192', '193', '194', '205'],
            unlocked() {return (hasUpgrade("era", 171) && (hasUpgrade("era", 175)))}
        },
        191: {
            title: "ErUp 31",
            description: "x47.5 EC",
            cost: new Decimal(4754),
            currencyDisplayName: "Sacrifices",
            currencyInternalName: "points",
            currencyLayer: "sac",
            branches: ['201', '202', '203', '204', '205'],
            unlocked() {return (hasUpgrade("era", 181) && hasUpgrade("era", 182) && hasUpgrade("era", 183) && hasUpgrade("era", 184) && hasUpgrade("era", 185))}
        },
        192: {
            title: "ErUp 32A",
            description: "x1.3 EC, +^0.003 SB5 HC",
            cost: new Decimal(1.5e38),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['201', '202', '203', '204', '205'],
            unlocked() {return (hasUpgrade("era", 191))}
        },
        193: {
            title: "ErUp 32B",
            description: "x1.3 EC, +^0.003 SB5 HC",
            cost: new Decimal(1.5e38),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['201', '202', '203', '204', '205'],
            unlocked() {return (hasUpgrade("era", 191))}
        },
        194: {
            title: "ErUp 33",
            description: "xe33T PF",
            cost: new Decimal(2.2e39),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['201', '202', '203', '204', '205'],
            unlocked() {return (hasUpgrade("era", 192) && hasUpgrade("era", 193))}
        },
        201: {
            title: "ErUp 34A",
            description: "xe20T PF",
            cost: new Decimal(6e42),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['211', '212', '213', '214', '215'],
            unlocked() {return (hasUpgrade("era", 194))}
        },
        202: {
            title: "ErUp 34B",
            description: "x1.6 EC",
            cost: new Decimal(6e41),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['211', '212', '213', '214', '215'],
            unlocked() {return (hasUpgrade("era", 194))}
        },
        203: {
            title: "ErUp 34C",
            description: "All Mega Buyables are better",
            cost: new Decimal(5.55e42),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['211', '212', '213', '214', '215'],
            unlocked() {return (hasUpgrade("era", 194))}
        },
        204: {
            title: "ErUp 34D",
            description: "+^0.1 PP",
            cost: new Decimal(6e42),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['211', '212', '213', '214', '215'],
            unlocked() {return (hasUpgrade("era", 194))}
        },
        205: {
            title: "ErUp 34E",
            description: "+^0.1 MP",
            cost: new Decimal(6e42),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['211', '212', '213', '214', '215'],
            unlocked() {return (hasUpgrade("era", 194))}
        },
        211: {
            title: "ErUp 35: This row will have longer waits, BUT BETTER BOOSTS!",
            description: "x2 EC, ^1.007 PF",
            cost: new Decimal(8e42),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['221', '222', '223', '224', '241'],
            unlocked() {return (hasUpgrade("era", 201) && hasUpgrade("era", 202) && hasUpgrade("era", 203) && hasUpgrade("era", 204) && hasUpgrade("era", 205))}
        },
        212: {
            title: "ErUp 36",
            description: "Era Buyable 1 effect increased from 2x to 2.5x per buy",
            cost: new Decimal(1.7e43),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['221', '222', '223', '224'],
            unlocked() {return (hasUpgrade("era", 211))}
        },
        213: {
            title: "ErUp 37",
            description: "x2 EC, xe37T PF",
            cost: new Decimal(1e46),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['221', '222', '223', '224'],
            unlocked() {return (hasUpgrade("era", 212))}
        },
        214: {
            title: "ErUp 38A",
            description: "Decrease Sacrifice Scaling by quite a lot",
            cost: new Decimal(1.2e47),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['221', '222', '223', '224'],
            unlocked() {return (hasUpgrade("era", 213))}
        },
        215: {
            title: "ErUp 38B",
            description: "^1.01 PF",
            cost: new Decimal(1.2e47),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['221', '222', '223', '224', '245'],
            unlocked() {return (hasUpgrade("era", 213))}
        },
        221: {
            title: "ErUp 39A: Hardening III",
            description: "Remember Hardening I and II? Hardening III Gives: SB1 and SB6 is stronger",
            cost: new Decimal(1.5e47),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['231', '232', '233', '234'],
            unlocked() {return (hasUpgrade("era", 214) && hasUpgrade("era", 215))}
        },
        222: {
            title: "ErUp 39B",
            description: "+^0.07 MP",
            cost: new Decimal(1.6e47),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['231', '232', '233', '234'],
            unlocked() {return (hasUpgrade("era", 214) && hasUpgrade("era", 215))}
        },
        223: {
            title: "ErUp 39C",
            description: "SB5 HC +^0.01",
            cost: new Decimal(1.5e47),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['231', '232', '233', '234'],
            unlocked() {return (hasUpgrade("era", 214) && hasUpgrade("era", 215))}
        },
        224: {
            title: "ErUp 39D",
            description: "xe750B MP",
            cost: new Decimal(1.6e47),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['231', '232', '233', '234'],
            unlocked() {return (hasUpgrade("era", 214) && hasUpgrade("era", 215))}
        },
        231: {
            title: "ErUp 40",
            description: "Era Buyable 1 effect increased from 2.5x to 3x per buy; Extend Basic Upgrades, +^0.025 BP",
            cost: new Decimal(7e49),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['241', '242', '243', '244', '245'],
            unlocked() {return (hasUpgrade("era", 221) && hasUpgrade("era", 222) && hasUpgrade("era", 223) && hasUpgrade("era", 224))}
        },
        232: {
            title: "ErUp 41",
            description: "SB5 HC +^0.03",
            cost: new Decimal(14210),
            currencyDisplayName: "Sacrifices",
            currencyInternalName: "points",
            currencyLayer: "sac",
            branches: ['241', '242', '243', '244', '245'],
            unlocked() {return (hasUpgrade("era", 231))}
        },
        233: {
            title: "ErUp 42A",
            description: "Triggering a tsunami: xe50M Water",
            cost: new Decimal(4e55),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['241', '242', '243', '244', '245'],
            unlocked() {return (hasUpgrade("era", 232))}
        },
        234: {
            title: "ErUp 42B",
            description: "^1.005 PF",
            cost: new Decimal(5e55),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['241', '242', '243', '244', '245'],
            unlocked() {return (hasUpgrade("era", 232))}
        },
        241: {
            title: "ErUp 43: ECExp",
            description: "^1.02 Era Crystals",
            cost: new Decimal(4.5e55),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['251', '252', '253', '254', '255'],
            unlocked() {return (hasUpgrade("era", 233) && hasUpgrade("era", 234))}
        },
        242: {
            title: "ErUp 44: ECComp",
            description: "'Compounding XII' is stronger",
            cost: new Decimal(4.5e56),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['251', '252', '253', '254', '255'],
            unlocked() {return (hasUpgrade("era", 241))}
        },
        243: {
            title: "ErUp 45: EB2+ (1)",
            description: "Era Buyable 2 effect increased from 5x to 6x a buy",
            cost: new Decimal(1.4e58),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['251', '252', '253', '254', '255'],
            unlocked() {return (hasUpgrade("era", 242))}
        },
        244: {
            title: "ErUp 46: EB2+ (2)",
            description: "Era Buyable 2 effect increased from 6x to 7x a buy",
            cost: new Decimal(1.5e61),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['251', '252', '253', '254', '255'],
            unlocked() {return (hasUpgrade("era", 243))}
        },
        245: {
            title: "ErUp 47: Major Stat Boost + Extension?",
            description: "xe350T PF, Sac Scaling is weaker, Mastery Extension?? (1 row only)",
            cost: new Decimal(6e62),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['251', '252', '253', '254', '255'],
            unlocked() {return (hasUpgrade("era", 244))}
        },
        251: {
            title: "Stronger Boosts Series (1)",
            description: "SU51 is stronger",
            cost: new Decimal(3.8e66),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['261', '262', '263', '264', '265'],
            unlocked() {return (hasUpgrade("m", 105))}
        },
        252: {
            title: "Stronger Boosts Series (2)",
            description: "WU13 is stronger",
            cost: new Decimal(4.4e66),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['261', '262', '263', '264', '265'],
            unlocked() {return (hasUpgrade("era", 251))}
        },
        253: {
            title: "Stronger Boosts Series (3)",
            description: "EU71 is stronger",
            cost: new Decimal(6e67),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['261', '262', '263', '264', '265'],
            unlocked() {return (hasUpgrade("era", 252))}
        },
        254: {
            title: "Stronger Boosts Series (4)",
            description: "PU22 is stronger",
            cost: new Decimal(8e67),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['261', '262', '263', '264', '265'],
            unlocked() {return (hasUpgrade("era", 253))}
        },
        255: {
            title: "Stronger Boosts Series (5)",
            description: "'Compounding XII' is stronger",
            cost: new Decimal(9e67),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['261', '262', '263', '264', '265'],
            unlocked() {return (hasUpgrade("era", 254))}
        },
        261: {
            title: "Stronger Boosts Series (6)",
            description: "MU42 is stronger",
            cost: new Decimal(2.7e69),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['271', '272', '273', '274', '275'],
            unlocked() {return (hasUpgrade("era", 255))}
        },
        262: {
            title: "Stronger Boosts Series (7)",
            description: "BU82 is stronger",
            cost: new Decimal(3e69),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['271', '272', '273', '274', '275'],
            unlocked() {return (hasUpgrade("era", 261))}
        },
        263: {
            title: "Stronger Boosts Series (8)",
            description: "BU21 is stronger",
            cost: new Decimal(3.2e69),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['271', '272', '273', '274', '275'],
            unlocked() {return (hasUpgrade("era", 262))}
        },
        264: {
            title: "Stronger Boosts Series (9)",
            description: "Mega Supercap is weaker",
            cost: new Decimal(3.5e69),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['271', '272', '273', '274', '275'],
            unlocked() {return (hasUpgrade("era", 263))}
        },
        265: {
            title: "Stronger Boosts Series (FINAL)",
            description: "MU31 is better.",
            cost: new Decimal(3.8e69),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['271', '272', '273', '274', '275'],
            unlocked() {return (hasUpgrade("era", 264))}
        },
        271: {
            title: "ErUp 58: Even more EC!",
            description: "^1.02 EC",
            cost: new Decimal(3e72),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['281', '282', '283', '284', '285'],
            unlocked() {return (hasUpgrade("era", 265))}
        },
        272: {
            title: "ErUp 59A",
            description: "Sac scaling weaker",
            cost: new Decimal(1.4e74),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['281', '282', '283', '284', '285'],
            unlocked() {return (hasUpgrade("era", 271))}
        },
        273: {
            title: "ErUp 59B: More SP = More MP = More Sac = More PF",
            description: "+^0.125 SP",
            cost: new Decimal(1.2e74),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['281', '282', '283', '284', '285'],
            unlocked() {return (hasUpgrade("era", 271))}
        },
        274: {
            title: "ErUp 59C",
            description: "+^0.09 Water",
            cost: new Decimal(1.3e74),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['281', '282', '283', '284', '285'],
            unlocked() {return (hasUpgrade("era", 271))}
        },
        275: {
            title: "ErUp 59D",
            description: "^1.01 PF, Extend Energy Upgrades",
            cost: new Decimal(1.4e74),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['281', '282', '283', '284', '285'],
            unlocked() {return (hasUpgrade("era", 271))}
        },
        281: {
            title: "ErUp 60: Highest EVER EC Mult!",
            description: "x1,000 Era Crystals",
            cost: new Decimal(1.6e78),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['291', '292', '293', '294', '295'],
            unlocked() {return (hasUpgrade("era", 272) && hasUpgrade("era", 273) && hasUpgrade("era", 274) && hasUpgrade("era", 275))}
        },
        282: {
            title: "ErUp 61A",
            description: "xe70B Energy",
            cost: new Decimal(4.4e81),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['291', '292', '293', '294', '295'],
            unlocked() {return (hasUpgrade("era", 281))}
        },
        283: {
            title: "ErUp 61B",
            description: "xe1.25e16 BP",
            cost: new Decimal(5.2e81),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['291', '292', '293', '294', '295'],
            unlocked() {return (hasUpgrade("era", 281))}
        },
        284: {
            title: "ErUp 61C",
            description: "xe5e15 PF",
            cost: new Decimal(6e81),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['291', '292', '293', '294', '295'],
            unlocked() {return (hasUpgrade("era", 281))}
        },
        285: {
            title: "ErUp 62: The Last Era Upgrade before Era 3.",
            description: "^1.0125 PF!",
            cost: new Decimal(1.5e85),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['291', '292', '293', '294', '295'],
            unlocked() {return (hasUpgrade("era", 282) && hasUpgrade("era", 283) && hasUpgrade("era", 284))}
        },
        291: {
            title: "ErUp 63: Big EC boost",
            description: "x100 EC",
            cost: new Decimal(4.9e91),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: [],
            unlocked() {return (hasMilestone("era", 3))}
        },
        292: {
            title: "ErUp 64A: slight PF mult",
            description: "xe2e15 PF [Combo: x1.8 EC]",
            cost: new Decimal(2e94),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: [],
            unlocked() {return (hasUpgrade("era", 291))}
        },
        293: {
            title: "ErUp 64B: better PF mult",
            description: "xe3e15 PF [Combo: x1.8 EC]",
            cost: new Decimal(3e94),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: [],
            unlocked() {return (hasUpgrade("era", 291))}
        },
        294: {
            title: "ErUp 65A: even better PF mult",
            description: "xe4e15 PF",
            cost: new Decimal(4e94),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: [],
            unlocked() {return (hasUpgrade("era", 292) && hasUpgrade("era", 293))}
        },
        295: {
            title: "ErUp 65B: super PF mult",
            description: "xe5e15 PF",
            cost: new Decimal(5e94),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: [],
            unlocked() {return (hasUpgrade("era", 292) && hasUpgrade("era", 293))}
        },


        // Extension Upgrades [Era 3]
        53: {
            title: "ErUp 6e1: Nice mult",
            description: "x25 Era Crystals",
            cost: new Decimal(1.8e95),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['71', '72', '73', '74'],
            unlocked() {return hasMilestone("sac", 100)}
        },
        54: {
            title: "ErUp 6e2A: Mult",
            description: "x6e15 PF",
            cost: new Decimal(2.2e96),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['71', '72', '73', '74'],
            unlocked() {return hasUpgrade("era", 53)}
        },
        55: {
            title: "ErUp 6e2B: or Power?",
            description: "^1.0075 PF",
            cost: new Decimal(2.2e96),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['71', '72', '73', '74'],
            unlocked() { return hasUpgrade("era", 53)}
        },
        104: {
            title: "ErUp 12e1: Power",
            description: "^1.026 EC",
            cost: new Decimal(4e109),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['111', '112', '113', '114'],
            unlocked() {return (hasUpgrade("era", 54) && hasUpgrade("era", 55))}
        },
        105: {
            title: "ErUp 12e2: Way more PFx",
            description: "xe1.6e16 PF",
            cost: new Decimal(1.4e114),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['111', '112', '113', '114', '115'],
            unlocked() {return hasUpgrade("era", 104)}
        },
        134: {
            title: "ErUp 18e1A: SB5 (Combo: x1.3 EC)",
            description: "SB5 is stronger",
            cost: new Decimal(1.3e114),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['141', '142', '143', '144', '145'],
            unlocked() {return hasUpgrade("era", 105)}
        },
        135: {
            title: "ErUp 18e1B: Basic Upgrades (Combo: x1.3 EC)",
            description: "BU21 is stronger",
            cost: new Decimal(1.3e114),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['141', '142', '143', '144', '145'],
            unlocked() {return hasUpgrade("era", 105)}
        },
        144: {
            title: "ErUp 21e1A: Another HUGE PF boost (Combo: x1.4 EC)",
            description: "xe2e16 PF",
            cost: new Decimal(1.7e114),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['151', '152', '153', '154', '155'],
            unlocked() {return hasUpgrade("era", 105)}
        },
        145: {
            title: "ErUp 21e1B: Solar Flares (Combo: x1.4 EC)",
            description: "Solar Flares occur more frequently! xe5e11 Energy",
            cost: new Decimal(1.7e114),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['151', '152', '153', '154', '155'],
            unlocked() {return hasUpgrade("era", 105)}
        },
        33: {
            title: "ErUp 4e1",
            description: "Era Compoundation is stronger!",
            cost: new Decimal(3.4e114),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['41', '42', '43', '44'],
            unlocked() {return (hasUpgrade("era", 134) && hasUpgrade("era", 135) && (hasUpgrade("era", 144) && hasUpgrade("era", 145)))}
        },
        34: {
            title: "ErUp 4e2A",
            description: "Sacrifice formulae is weaker",
            cost: new Decimal(3.9e119),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['41', '42', '43', '44'],
            unlocked() {return (hasUpgrade("era", 33))}
        },
        35: {
            title: "ErUp 4e2B",
            description: "Unlock new milestones, ^1.01 PF!",
            cost: new Decimal(4.44e119),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['41', '42', '43', '44'],
            unlocked() {return (hasUpgrade("era", 33))}
        },
        24: {
            title: "ErUp 3e1",
            description: "xe2.4e16 PF :)",
            cost: new Decimal(2e125),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['31', '32', '33', '34', '35'],
            unlocked() {return (hasUpgrade("prestige", 85))}
        },
        25: {
            title: "ErUp 3e2: Lightning Strikes",
            description: "Lightning occurs 10x more frequently! [x1e1e12 Energy]",
            cost: new Decimal(2.2e127),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['31', '32', '33', '34', '35'],
            unlocked() {return (hasUpgrade("era", 24))}
        },
        12: {
            title: "ErUp 1e1: Oh, that's nice.",
            description: "Amount of Era Upgrades increases EC gain.",
            cost: new Decimal(4e127),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['21', '22', '23', '24', '25'],
            unlocked() {return (hasUpgrade("era", 25))},
            main() {
                euiec = new Decimal(1.05)
                if (hasUpgrade("era", 322)) euiec = new Decimal(1.1)
                if (hasUpgrade("era", 352)) euiec = new Decimal(1.2)
                if (hasUpgrade("era", 411)) euiec = new Decimal(1.1)
                if (hasUpgrade("era", 473)) euiec = new Decimal(1.25)
                softcapDescriptionerup12 = ""
                sdsc = ""
                upgEffecterup12 = upgradeEffect(this.layer, this.id)
            },
            effect() {
                let eraups = player.era.upgrades.length
                return Math.pow(euiec, eraups)
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionerup12
            },
            tooltip() {
                return "Formula: "  + euiec + "^Amt of ErUps" + sdsc
            },
        },
        92: {
            title: "ErUp 11e1A",
            description: "xe3e16 PF",
            cost: new Decimal(4.9e131),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['101', '102', '103', '104', '105'],
            unlocked() {return (hasUpgrade("era", 12))},
        },
        93: {
            title: "ErUp 11e1B",
            description: "xe40B Water",
            cost: new Decimal(4e131),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['101', '102', '103', '104', '105'],
            unlocked() {return (hasUpgrade("era", 12))},
        },
        94: {
            title: "ErUp 11e1C",
            description: "xe8e14 MP",
            cost: new Decimal(4.7e131),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['101', '102', '103', '104', '105'],
            unlocked() {return (hasUpgrade("era", 12))},
        },
        95: {
            title: "ErUp 11e1D",
            description: "xe6e15 PP",
            cost: new Decimal(4.7e131),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['101', '102', '103', '104', '105'],
            unlocked() {return (hasUpgrade("era", 12))},
        },
        45: {
            title: "ErUp 5e1",
            description: "EC is boosted by log(EC)",
            cost: new Decimal(5e132),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['51', '52', '53', '54', '55'],
            unlocked() {return (hasUpgrade("era", 92) && hasUpgrade("era", 93) && (hasUpgrade("era", 94) && hasUpgrade("era", 95)))},
            effect() {
                let logxec = 10
                if (player.era.ec.gte(2)) return player.era.ec.log(logxec)
                    else return new Decimal(1)
            },
            effectDisplay() { return notationChooser(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        65: {
            title: "ErUp 7e1",
            description: "Mega Buyables 1-3 are better",
            cost: new Decimal(2.6e135),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['71', '72', '73', '74', '75'],
            unlocked() {return (hasUpgrade("era", 45))},
        },
        75: {
            title: "ErUp 8e1",
            description: "Supreme Buyables 1,3,4 are better",
            cost: new Decimal(2.2e135),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['81', '82', '83', '84', '85'],
            unlocked() {return (hasUpgrade("era", 65))},
        },
        165: {
            title: "ErUp 26e1",
            description: "+^0.05 Water and SP",
            cost: new Decimal(3e135),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['171', '172', '173', '174', '175'],
            unlocked() {return (hasAchievement("a", 236))},
        },
        195: {
            title: "ErUp 33e1",
            description: "xe4e16 PF.",
            cost: new Decimal(3.3e135),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['171', '172', '173', '174', '175'],
            unlocked() {return (hasUpgrade("era", 165))},
        },
        225: {
            title: "ErUp 39e1",
            description: "x5e16 PF",
            cost: new Decimal(4.4e135),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['171', '172', '173', '174', '175'],
            unlocked() {return (hasAchievement("a", 236))},
        },
        235: {
            title: "ErUp 39e2",
            description: "xe5e16 PF",
            cost: new Decimal(4.4e135),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['171', '172', '173', '174', '175'],
            unlocked() {return (hasUpgrade("era", 165))},
        },
        301: {
            title: "The Last Row of Tree 1",
            description: "To start us off, let's increase Era Buyable 1 and 2 exponent by 0.02!",
            cost: new Decimal(5.5e135),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['291', '292', '293', '294', '295'],
            unlocked() {return (hasUpgrade("era", 165))},
        },
        302: {
            title: "Finally, no more scrolling 30 rows",
            description: "+^0.04 PP",
            cost: new Decimal(6.8e138),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['291', '292', '293', '294', '295'],
            unlocked() {return (hasUpgrade("era", 301))},
        },
        303: {
            title: "It's really a pain, but not this upgrade",
            description: "xe7.1e17 BP",
            cost: new Decimal(7.1e138),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['291', '292', '293', '294', '295'],
            unlocked() {return (hasUpgrade("era", 302))},
        },
        304: {
            title: "Some mega mults, not many",
            description: "xe2.1e15 MP",
            cost: new Decimal(8.8e138),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['291', '292', '293', '294', '295'],
            unlocked() {return (hasUpgrade("era", 303))},
        },
        305: {
            title: "More",
            description: "Point Fragments are powered by 1.01. Extend Supreme Upgrades.",
            cost: new Decimal(1e139),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['291', '292', '293', '294', '295'],
            unlocked() {return (hasUpgrade("era", 304))},
        },
        311: {
            title: "Advanced ErUp 1",
            description: "100x EC",
            cost: new Decimal(3.6e163),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['312', '321', '322', '323'],
            unlocked() {return (hasAchievement("a", 246))},
        },
        312: {
            title: "Advanced ErUp 2",
            description: "'Compounding' upgrade is stronger.",
            cost: new Decimal(6e166),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['321', '322', '323'],
            unlocked() {return (hasUpgrade("era", 311))},
        },
        322: {
            title: "Advanced ErUp 3",
            description: "Era Upgrades boost MORE on Era Crystal gain.",
            cost: new Decimal(1e167),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['321', '323', '331', '332'],
            unlocked() {return (hasUpgrade("era", 312))},
        },
        321: {
            title: "Advanced ErUp 4a",
            description: "Prestige Point +^0.02 and 2.5x EC. Advanced ErUp 4b is 3.5x more expensive.",
            cost() {
                let c = new Decimal(8e170)
                if (hasUpgrade("era", 323)) c = c.times(3.5)
                return c
            },
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['331', '332', '341', '342', '343', '361', '362'],
            unlocked() {return (hasUpgrade("era", 312))},
        },
        323: {
            title: "Advanced ErUp 4b",
            description: "Mega Point +^0.02 and 2.5x EC. Advanced ErUp 4a is 3.5x more expensive.",
            cost() {
                let c = new Decimal(8e170)
                if (hasUpgrade("era", 321)) c = c.times(3.5)
                return c
            },
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['331', '332', '341', '342', '343', '364', '365'],
            unlocked() {return (hasUpgrade("era", 312))},
        },
        331: {
            title: "Advanced ErUp 5a",
            description: "SP gets boosted based on PF much more",
            cost: new Decimal(1.5e174),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['312', '341', '342', '343'],
            unlocked() {return (hasUpgrade("era", 321))},
        },
        332: {
            title: "Advanced ErUp 5b",
            description: "SB5 HC +^0.01",
            cost: new Decimal(1.7e174),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['341', '342', '343'],
            unlocked() {return (hasUpgrade("era", 323))},
        },
        341: {
            title: "Advanced ErUp 6",
            description: "Unlock Era Buyable 4. This buyable's base is based on log7(Sacrifices)",
            cost: new Decimal(3e174),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['351', '352', '361', '362', '363', '364', '365'],
            unlocked() {return ((hasUpgrade("era", 332)) && (hasUpgrade("era", 331))) },
        },
        342: {
            title: "Advanced ErUp 7",
            description: "Era Buyable 1's base changed to log(log(EC))*2",
            cost: new Decimal(2.9e199),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['351', '352', '361', '362', '363', '364', '365'],
            unlocked() {return (hasUpgrade("era", 341))},
        },
        343: {
            title: "Advanced ErUp 8",
            description: "Era Buyable 2's base changed to 6 * log(EB1 amount)",
            cost: new Decimal(6.7e217),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['351', '352', '361', '362', '363', '364', '365'],
            unlocked() {return (hasUpgrade("era", 342))},
        },
        352: {
            title: "Advanced ErUp 9",
            description: "Every Era Upgrade boosts Era Crystal gain by 1.2x now! (Instead of 1.1x)",
            cost: new Decimal(1.4e223),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['351', '352', '361', '362', '363', '364', '365'],
            unlocked() {return (hasUpgrade("era", 342))},
        },
        351: {
            title: "Advanced ErUp 10a",
            description: "Sacrifice Scaling is slightly weaker",
            cost: new Decimal(4e234),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['351', '352'],
            unlocked() {return (hasUpgrade("era", 352))},
        },
        353: {
            title: "Advanced ErUp 10b",
            description: "Multiply Point Fragments by A LOT",
            cost: new Decimal(3.6e235),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['351', '352'],
            unlocked() {return (hasUpgrade("era", 352))},
        },
        361: {
            title: "Advanced ErUp 11a",
            description: "Compounding IX is stronger.",
            cost: new Decimal(5.5e235),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['371', '372', '373', '374'],
            unlocked() {return ((hasUpgrade("era", 351)) && (hasUpgrade("era", 353)))},
        },
        362: {
            title: "Advanced ErUp 11b",
            description: "Compounding X is stronger.",
            cost: new Decimal(6e235),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['371', '372', '373', '374'],
            unlocked() {return ((hasUpgrade("era", 351)) && (hasUpgrade("era", 353)))},
        },
        363: {
            title: "Advanced ErUp 11c",
            description: "Point Fragments are powered by 1.008",
            cost: new Decimal(7e235),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['371', '372', '373', '374'],
            unlocked() {return ((hasUpgrade("era", 351)) && (hasUpgrade("era", 353)))},
        },
        364: {
            title: "Advanced ErUp 11d: Anticipating Inflation",
            description: "Energy's power increase by 0.025",
            cost: new Decimal(8e235),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['371', '372', '373', '374'],
            unlocked() {return ((hasUpgrade("era", 351)) && (hasUpgrade("era", 353)))},
        },
        365: {
            title: "Advanced ErUp 12",
            description: "Thousand-mult EC",
            cost: new Decimal(1e236),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['371', '372', '373', '374'],
            unlocked() {return ((hasUpgrade("era", 361)) && (hasUpgrade("era", 362)) && (hasUpgrade("era", 363)) && (hasUpgrade("era", 364)))},
        },
        371: {
            title: "Advanced ErUp 13a",
            description: "Increase Rebirth Point's exponent by 0.02, and unlock a new Rebirth Milestone.",
            cost: new Decimal(1.8e241),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['381', '382', '401'],
            unlocked() {return ((hasUpgrade("era", 361)) && (hasUpgrade("era", 362)) && (hasUpgrade("era", 363)) && (hasUpgrade("era", 364)) && (hasUpgrade("era", 365)))},
        },
        372: {
            title: "Advanced ErUp 13b",
            description: "Increase Mega Point's exponent by 0.02, and unlock a new Mega Milestone.",
            cost: new Decimal(2e241),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['381', '382'],
            unlocked() {return ((hasUpgrade("era", 361)) && (hasUpgrade("era", 362)) && (hasUpgrade("era", 363)) && (hasUpgrade("era", 364)) && (hasUpgrade("era", 365)))},
        },
        373: {
            title: "Advanced ErUp 14a",
            description: "Multiply Basic Points by e8e18",
            cost: new Decimal(2.75e241),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['381', '382', '405'],
            unlocked() {return (hasUpgrade("era", 371))},
        },
        374: {
            title: "Advanced ErUp 14b",
            description: "Multiply Point Fragments by e7e17",
            cost: new Decimal(3.3e241),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['381', '382'],
            unlocked() {return (hasUpgrade("era", 372))},
        },
        375: {
            title: "Advanced ErUp 15",
            description: "Multiply Mega Points by e1e16",
            cost: new Decimal(3.8e241),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['391', '392', '393', '394', '401', '405'],
            unlocked() {return ((hasUpgrade("era", 373)) && (hasUpgrade("era", 374)))},
        },
        381: {
            title: "Advanced ErUp 16a",
            description: "Multiply Point Fragments by e1e18",
            cost: new Decimal(5e241),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['391', '392', '393', '394', '401', '405'],
            unlocked() {return (hasUpgrade("era", 375))},
        },
        382: {
            title: "Advanced ErUp 16b",
            description: "Increase SB5 Hardcap by 0.01",
            cost: new Decimal(5e241),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['381', '382'],
            unlocked() {return (hasUpgrade("era", 375))},
        },
        391: {
            title: "Advanced ErUp 17: Game-changer",
            description: "Era Crystals increase Mega Point Exponent",
            cost: new Decimal(4e243),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['381', '382'],
            effect() {
                return player.era.ec.slog().div(10).sub(0.2)
            },
            effectDisplay() {
                let upgEffect = upgradeEffect(this.layer, this.id)
                return "This upgrade increases Mega Point Exponent by " + notationChooser(upgEffect)+"."
            },
            tooltip() {
                return "Formula: ^[slog(EC)/10]-0.2"
            },
            unlocked() {return ((hasUpgrade("era", 381)) && (hasUpgrade("era", 382)))},
        },
        392: {
            title: "Advanced ErUp 18",
            description: "^1.018 EC",
            cost: new Decimal(2.2e245),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['401', '402', '403', '404', '405'],
            unlocked() {return (hasUpgrade("era", 391))},
        },
        393: {
            title: "Advanced ErUp 19a",
            description: "Boost Supreme Points by e4.2e12",
            cost: new Decimal(2e252),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['401', '402', '403', '404', '405'],
            unlocked() {return (hasUpgrade("era", 392))},
        },
        394: {
            title: "Advanced ErUp 19b",
            description: "Boost Water by e7e11",
            cost: new Decimal(1.4e252),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['401', '402', '403', '404', '405'],
            unlocked() {return (hasUpgrade("era", 393))},
        },
        403: {
            title: "Advanced ErUp 20",
            description: "Raise EC by 1.020",
            cost: new Decimal(2.45e253),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['401', '402', '403', '404', '405'],
            unlocked() {return ((hasUpgrade("era", 393)) && (hasUpgrade("era", 394)))},
        },
        401: {
            title: "Advanced ErUp 21a",
            description: "-0.0021 Sac Strength power...",
            cost: new Decimal(3.89e260),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['411', '421', '422'],
            unlocked() {return (hasUpgrade("era", 403))},
        },
        402: {
            title: "Advanced ErUp 21b",
            description: "Basic Boost 1 is stronger",
            cost: new Decimal(4.56e260),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['411', '421', '422'],
            unlocked() {return (hasUpgrade("era", 403))},
        },
        404: {
            title: "Advanced ErUp 22a",
            description: "Rebirth Insanitycap is much weaker",
            cost: new Decimal(6.2e260),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['411', '421', '422'],
            unlocked() {return ((hasUpgrade("era", 401)) && (hasUpgrade("era", 402)))},
        },
        405: {
            title: "Advanced ErUp 22b",
            description: "Increase Mega Point exponent by 0.022",
            cost: new Decimal(5.11e260),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['411', '421', '422'],
            unlocked() {return ((hasUpgrade("era", 401)) && (hasUpgrade("era", 402)))},
        },
        411: {
            title: "Trade-off Alpha",
            description: "xe10 EC, ^1.01 EC, BUT Upgrades boost EC gain by 1.1 (down from 1.2)",
            cost: new Decimal(8.88e260),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['421', '422', '431', '435'],
            unlocked() {return ((hasUpgrade("era", 404)) && (hasUpgrade("era", 405)))},
        },
        421: {
            title: "Advanced ErUp 24a",
            description: "^1.005 PF",
            cost: new Decimal(1.5e270),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['431', '432', '433', '434', '435'],
            unlocked() {return hasUpgrade("era", 411)},
        },
        422: {
            title: "Advanced ErUp 24b",
            description: "xe2.8e18 PF",
            cost: new Decimal(1.77e270),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['431', '432', '433', '434', '435'],
            unlocked() {return hasUpgrade("era", 411)},
        },
        431: {
            title: "Advanced ErUp 25a",
            description: "Reduce Era Scaling by 0.1",
            cost: new Decimal(9e278),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['412', '441', '442'],
            unlocked() {return ((hasUpgrade("era", 421)) && (hasUpgrade("era", 422)))},
        },
        432: {
            title: "Advanced ErUp 25b",
            description: "Water +^0.08",
            cost: new Decimal(1e279),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['412', '441', '442'],
            unlocked() {return ((hasUpgrade("era", 421)) && (hasUpgrade("era", 422)))},
        },
        433: {
            title: "Advanced ErUp 25c",
            description: "Energy +^0.03",
            cost: new Decimal(1.2e279),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['412', '441', '442'],
            unlocked() {return ((hasUpgrade("era", 421)) && (hasUpgrade("era", 422)))},
        },
        434: {
            title: "Advanced ErUp 25d",
            description: "Basic Points +^0.014",
            cost: new Decimal(1.37e279),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['412', '441', '442'],
            unlocked() {return ((hasUpgrade("era", 421)) && (hasUpgrade("era", 422)))},
        },
        435: {
            title: "Advanced ErUp 25e",
            description: "Mega Points +^0.014",
            cost: new Decimal(1.37e279),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['412', '441', '442'],
            unlocked() {return ((hasUpgrade("era", 421)) && (hasUpgrade("era", 422)))},
        },
        412: {
            title: "Trade-off Beta",
            description: "Sacrifice scaling -0.05, but ^0.995 PF",
            cost: new Decimal(2e279),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['441', '442', '421', '422', '431', '435'],
            unlocked() {return ((hasUpgrade("era", 431)) && (hasUpgrade("era", 432)) && (hasUpgrade("era", 433)) && (hasUpgrade("era", 434)) && (hasUpgrade("era", 435)))},
        },
        441: {
            title: "Advanced ErUp 26a",
            description: "Supreme Points xe3.1e13",
            cost: new Decimal(5.8e285),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['451', '452', '453', '454', '455'],
            unlocked() {return hasUpgrade("c", 14)},
        },
        442: {
            title: "Advanced ErUp 26b",
            description: "Supreme Points +^0.15",
            cost: new Decimal(6.9e285),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['451', '452', '453', '454', '455'],
            unlocked() {return hasUpgrade("c", 14)},
        },
        451: {
            title: "Advanced ErUp 27",
            description: "Era Crystals ^1.02",
            cost: new Decimal(8e285),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['461', '462', '463'],
            unlocked() {return (hasUpgrade("era", 441) && hasUpgrade("era", 442))},
        },
        452: {
            title: "Advanced ErUp 28a",
            description: "Mega Buyables 2 and 3 are stronger",
            cost: new Decimal(1e294),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['461', '462', '463'],
            unlocked() {return hasUpgrade("era", 451)},
        },
        453: {
            title: "Advanced ErUp 28b",
            description: "Mega Buyable 1 is stronger",
            cost: new Decimal(1.1e294),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['461', '462', '463'],
            unlocked() {return hasUpgrade("era", 451)},
        },
        454: {
            title: "Advanced ErUp 29a",
            description: "Supreme Buyables 1,3,4 are stronger",
            cost: new Decimal(1.2e294),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['461', '462', '463'],
            unlocked() {return hasUpgrade("era", 453)},
        },
        455: {
            title: "Advanced ErUp 29b",
            description: "Supreme Buyable 5 hardcap increases",
            cost: new Decimal(1.4e294),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['461', '462', '463'],
            unlocked() {return hasUpgrade("era", 454)},
        },
        461: {
            title: "Advanced ErUp 30",
            description: "x1e13 Era Crystals!! :O",
            cost: new Decimal(1.79e294),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['462'],
            unlocked() {return (hasUpgrade("era", 454) && hasUpgrade("era", 455))},
        },
        413: {
            title: "Trade-off Gamma",
            description: "^1.005 PF but /5 EC",
            cost: new Decimal("8.33e318"),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['471', '472'],
            unlocked() {return hasUpgrade("era", 461)},
        },
        462: {
            title: "Advanced ErUp 31: The 200th Era Upgrade",
            description: "x20 EC, +^0.02 PP, Unlock a few future milestones",
            cost: new Decimal("2e318"),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['471', '472', '473', '474'],
            unlocked() {return hasUpgrade("era", 413)},
        },
        463: {
            title: "Advanced ErUp 32: I love buyables",
            description: "Add 2 era buyables",
            cost: new Decimal("1e320"),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['471', '472', '473', '474'],
            unlocked() {return hasUpgrade("era", 462)},
        },
        471: {
            title: "Advanced ErUp 33: Mega Mega Mega (a mega mega amount of mega points)",
            description: "Mega Points xe3e17",
            cost: new Decimal("1e352"),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['481', '482', '483'],
            unlocked() {return hasUpgrade("era", 463)},
        },
        472: {
            title: "Advanced ErUp 34: Another Power",
            description: "^1.0034 PF and EC",
            cost: new Decimal("5e361"),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['481', '482', '483'],
            unlocked() {return hasUpgrade("era", 471)},
        },
        473: {
            title: "Advanced ErUp 35: No more trade-off Alpha, and increased!",
            description: "Every upgrade now boosts EC gain by 1.25 (instead of 1.1)",
            cost: new Decimal("6e371"),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['481', '482', '483'],
            unlocked() {return hasUpgrade("era", 472)},
        },
        474: {
            title: "Advanced ErUp 36d: Why is this here?",
            description: "Increase the effect of Mega Buyable 4",
            cost: new Decimal("3e392"),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['481', '482', '483'],
            unlocked() {return hasUpgrade("era", 472)},
        },
        481: {
            title: "Advanced ErUp 36a: Hypermaxing",
            description: "Increase the effect of Mega Buyable 1",
            cost: new Decimal("1.5e392"),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['491', '492', '493', '494', '495'],
            unlocked() {return hasUpgrade("era", 473)},
        },
        482: {
            title: "Advanced ErUp 36b: Hypermaxing",
            description: "Increase the effect of Mega Buyable 2",
            cost: new Decimal("1.3e392"),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['491', '492', '493', '494', '495'],
            unlocked() {return hasUpgrade("era", 473)},
        },
        483: {
            title: "Advanced ErUp 36c: Hypermaxing",
            description: "Increase the effect of Mega Buyable 3",
            cost: new Decimal("1.1e392"),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['491', '492', '493', '494', '495'],
            unlocked() {return hasUpgrade("era", 473)},
        },
        491: {
            title: "Advanced ErUp 37: Soft-hardcap",
            description: "Increase SB5 HC by 0.005.",
            cost: new Decimal("3.9e392"),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['501'],
            unlocked() {return ((hasUpgrade("era", 474)) && (hasUpgrade("era", 481)) && (hasUpgrade("era", 482)) && (hasUpgrade("era", 483)))},
        },
        492: {
            title: "Advanced ErUp 38a: EPower",
            description: "^1.01 EC and +^0.038 Energy",
            cost: new Decimal("9e392"),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['501'],
            unlocked() {return hasUpgrade("era", 491)},
        },
        493: {
            title: "Advanced ErUp 38b: IncRease",
            description: "xee20 RP and +^0.01 RP",
            cost: new Decimal("6.5e399"),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['501'],
            unlocked() {return hasUpgrade("era", 491)},
        },
        494: {
            title: "Advanced ErUp 38c: Prestigar",
            description: "xe7e18 PP and +^0.01 PP",
            cost: new Decimal("7.5e399"),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['501'],
            unlocked() {return hasUpgrade("era", 491)},
        },
        495: {
            title: "Advanced ErUp 38d: Watup",
            description: "SB3 is stronger",
            cost: new Decimal("5.5e399"),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['501'],
            unlocked() {return hasUpgrade("era", 491)},
        },
        501: {
            title: "Advanced ErUp 39: Era Phase 2!",
            description: "xe2.5e19 PF, ^1.007 PF, unlock a new currency in the Era Layer and its upgrades and milestones. It is based off of EC and PF.",
            cost: new Decimal("1e400"),
            currencyDisplayName: "Era Crystals",
            currencyInternalName: "ec",
            currencyLayer: "era",
            branches: ['501'],
            unlocked() {return ((hasUpgrade("era", 492)) && (hasUpgrade("era", 493)) && (hasUpgrade("era", 494)) && (hasUpgrade("era", 495)))},
        },
        1011: {
            title: "EFUp 1: Upgrade Compoundation",
            description: "For every upgrade after 214 era upgrades, x1.2 EF base gain",
            cost: new Decimal(33),
            currencyDisplayName: "Era Fragments",
            currencyInternalName: "ef",
            currencyLayer: "era",
            unlocked() {return (hasUpgrade("era", 501))},
            main() {
                euiec = new Decimal(1.2)
                softcapDescriptionerup12 = ""
                sdsc = ""
                upgEffecterup12 = upgradeEffect(this.layer, this.id)
            },
            effect() {
                let eraups = player.era.upgrades.length - 214
                return Math.pow(euiec, eraups)
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionerup12
            },
            tooltip() {
                return "Formula: "  + euiec + "^(Amt of ErUps-214)" + sdsc
            },
        },
        1012: {
            title: "EFUp 2: Crystals and Fragments",
            description: "x1.1 EF after nerf, also x1,000 EC.",
            cost: new Decimal(42),
            currencyDisplayName: "Era Fragments",
            currencyInternalName: "ef",
            currencyLayer: "era",
            unlocked() {return (hasUpgrade("era", 1011))},
        },
        1013: {
            title: "EFUp 3: Crystals and Fragments 2",
            description: "Era Fragments boosts Era Crystals gain.",
            cost: new Decimal(50),
            currencyDisplayName: "Era Fragments",
            currencyInternalName: "ef",
            currencyLayer: "era",
            unlocked() {return hasUpgrade("era", 1012)},
            main() {
                cf2exp = 1
                softcapDescriptionef3 = ""
                sdsc = ""
                upgEffectef3 = upgradeEffect(this.layer, this.id)
            },
            effect() {
                return player["era"].ef.pow(cf2exp).add(1)
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x EC" + softcapDescriptionef3
            },
            tooltip() {
                return "Formula: EC^"  + cf2exp + sdsc
            },
        },
        1014: {
            title: "EFUp 4: (Point/Era) Fragments",
            description: "Era Fragments boosts Point Fragments exponent",
            cost: new Decimal(60),
            currencyDisplayName: "Era Fragments",
            currencyInternalName: "ef",
            currencyLayer: "era",
            unlocked() {return hasUpgrade("era", 1013)},
            effect() {
                return ((Decimal.max(player.era.ef.slog()-1, 0))/50)+1
            },
            effectDisplay() {
                return "^" + notationChooser(upgradeEffect(this.layer, this.id))+" PF"
            },
            tooltip() {
                return "Formula: (slog(EF)-1)/50 +1"
            },
        },
        1021: {
            title: "EFUp 5: EF = EF++",
            description: "Era Fragments boosts its gain (before nerf)",
            cost: new Decimal(60),
            currencyDisplayName: "Era Fragments",
            currencyInternalName: "ef",
            currencyLayer: "era",
            unlocked() {return hasUpgrade("era", 1014)},
            effect() {
                return Decimal.max(player["era"].ef.log(5), 1)
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x EF" + softcapDescriptionef3
            },
            tooltip() {
                return "Formula: log5(EF)x EF"
            },
        },
        1022: {
            title: "EFUp 6: Early-game boost",
            description: "xe2.5e20 BP, xe6e19 RP, xe3e18 PP, xe2.5e17 MP",
            cost: new Decimal(90),
            currencyDisplayName: "Era Fragments",
            currencyInternalName: "ef",
            currencyLayer: "era",
            unlocked() {return (hasUpgrade("era", 1021))},
        },
        1023: {
            title: "EFUp 7: Crystals and Fragments 3",
            description: "x1.2 EF (after nerf). Also, x10B EC",
            cost: new Decimal(105),
            currencyDisplayName: "Era Fragments",
            currencyInternalName: "ef",
            currencyLayer: "era",
            unlocked() {return (hasUpgrade("era", 1022))},
        },
        1024: {
            title: "EFUp 8: Buy this!! Many times!!",
            description: "Unlock 2 new Era Buyables.",
            cost: new Decimal(130),
            currencyDisplayName: "Era Fragments",
            currencyInternalName: "ef",
            currencyLayer: "era",
            unlocked() {return (hasUpgrade("era", 1023))},
        },
        1031: {
            title: "EFUp 9: Upgrade Compoundation 2",
            description: "EFUp 1 also boosts EF gain after nerf by 1.05 per upgrade",
            cost: new Decimal(225),
            currencyDisplayName: "Era Fragments",
            currencyInternalName: "ef",
            currencyLayer: "era",
            unlocked() {return (hasMilestone("era", 101))},
            main() {
                euiec = new Decimal(1.05)
                softcapDescriptionerup12 = ""
                sdsc = ""
                upgEffecterup12 = upgradeEffect(this.layer, this.id)
            },
            effect() {
                let eraups = player.era.upgrades.length - 214
                return Math.pow(euiec, eraups)
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionerup12
            },
            tooltip() {
                return "Formula: "  + euiec + "^(Amt of ErUps-214)" + sdsc
            },
        },
        1032: {
            title: "EFUp 10: Upgrade Compoundation 3",
            description: "EFUp 1 also multiplies EC gain by 10 per upgrade",
            cost: new Decimal(260),
            currencyDisplayName: "Era Fragments",
            currencyInternalName: "ef",
            currencyLayer: "era",
            unlocked() {return (hasUpgrade("era", 1031))},
            main() {
                euiec = new Decimal(10)
                softcapDescriptionerup12 = ""
                sdsc = ""
                upgEffecterup12 = upgradeEffect(this.layer, this.id)
            },
            effect() {
                let eraups = player.era.upgrades.length - 214
                return Math.pow(euiec, eraups)
            },
            effectDisplay() {
                return notationChooser(upgradeEffect(this.layer, this.id))+"x" + softcapDescriptionerup12
            },
            tooltip() {
                return "Formula: "  + euiec + "^(Amt of ErUps-214)" + sdsc
            },
        },
        1033: {
            title: "EFUp 11: Strengthen",
            description: "Era Buyable 8 (EF Buyable 1)'s effect is stronger (1.1 -> 1.15)",
            cost: new Decimal(333),
            currencyDisplayName: "Era Fragments",
            currencyInternalName: "ef",
            currencyLayer: "era",
            unlocked() {return (hasUpgrade("era", 1032))},
        },
        1034: {
            title: "EFUp 12: Powering mid-game currencies",
            description: "Era Fragments boosts exponent of Supreme Points and Water",
            cost: new Decimal(600),
            currencyDisplayName: "Era Fragments",
            currencyInternalName: "ef",
            currencyLayer: "era",
            unlocked() {return hasUpgrade("era", 1033)},
            effect() {
                return ((Decimal.max(player.era.ef.slog()-1, 0))/10)
            },
            effectDisplay() {
                return "+^" + notationChooser(upgradeEffect(this.layer, this.id))+" SP and Water"
            },
            tooltip() {
                return "Formula: +^(slog(EF)-1)/10"
            },
        },
        1041: {
            title: "EFUp 13: EF Douboost",
            description: "x1.2 EF after nerf and x2 EF before nerf",
            cost: new Decimal(1500),
            currencyDisplayName: "Era Fragments",
            currencyInternalName: "ef",
            currencyLayer: "era",
            unlocked() {return (hasUpgrade("w", 94))},
        },
        1042: {
            title: "EFUp 14: Powers",
            description: "^1.02 EC, +^0.025 Energy",
            cost: new Decimal(2500),
            currencyDisplayName: "Era Fragments",
            currencyInternalName: "ef",
            currencyLayer: "era",
            unlocked() {return (hasUpgrade("era", 1041))},
        },
        1043: {
            title: "EFUp 15: Lessenerf",
            description: "Era Fragments nerf decreased from 3 to 2.9",
            cost: new Decimal(2750),
            currencyDisplayName: "Era Fragments",
            currencyInternalName: "ef",
            currencyLayer: "era",
            unlocked() {return (hasUpgrade("era", 1042))},
        },
        1044: {
            title: "EFUp 16: Crystals and Fragments IV",
            description: "x2 EF (before nerf). Also, x1e16 EC",
            cost: new Decimal(3750),
            currencyDisplayName: "Era Fragments",
            currencyInternalName: "ef",
            currencyLayer: "era",
            unlocked() {return (hasUpgrade("era", 1043))},
        },
        1051: {
            title: "EFUp 17: The worst Era Buyable for EC -> The second best",
            description: "Era Buyable 3's base is now based on Mastery Points, exactly, slog(MaP)^slog(MaP)^1.3",
            cost: new Decimal(5000),
            currencyDisplayName: "Era Fragments",
            currencyInternalName: "ef",
            currencyLayer: "era",
            unlocked() {return (hasUpgrade("era", 1044))},
        },
        1052: {
            title: "EFUp 18: Making Mastery Points useful",
            description: "MaP increases EC exponent",
            cost: new Decimal(6666),
            currencyDisplayName: "Era Fragments",
            currencyInternalName: "ef",
            currencyLayer: "era",
            unlocked() {return (hasUpgrade("era", 1051))},
            effect() {
                return Decimal.max(player.m.points.slog().sub(1.5).div(40), 0).add(1)
            },
            effectDisplay() {
                return "^" + notationChooser(upgradeEffect(this.layer, this.id))+" EC"
            },
            tooltip() {
                return "Formula: (slog(MaP)-1.5)/40 +1"
            },
        },
        1053: {
            title: "EFUp 19: Making Mastery Points even more useful",
            description: "MaP multiplies EF gain before nerf",
            cost: new Decimal(7277),
            currencyDisplayName: "Era Fragments",
            currencyInternalName: "ef",
            currencyLayer: "era",
            unlocked() {return (hasUpgrade("era", 1052))},
            effect() {
                return Decimal.max(player.m.points.log10().div(50), 1)
            },
            effectDisplay() {
                return "x" + notationChooser(upgradeEffect(this.layer, this.id))+" EF"
            },
            tooltip() {
                return "Formula: log(MaP)/50"
            },
        },
        1054: {
            title: "EFUp 20: Uptick",
            description: "^1.01 PF.",
            cost: new Decimal(10000),
            currencyDisplayName: "Era Fragments",
            currencyInternalName: "ef",
            currencyLayer: "era",
            unlocked() {return (hasUpgrade("era", 1053))},
        },
    },
    buyables: {
        11: {
            title: "Era Buyable 1: Booster",
            unlocked() { return (hasUpgrade('era', 143)) },
            cost(x) {
                exp2 = new Decimal(1.135)
                return new Decimal(1e14).mul(Decimal.pow(1.15, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Era Crystals." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Era Crystals gain by x" + notationChooser(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                return player.era.ec.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.era.ec = player.era.ec.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base1 = new Decimal(2)
                if (hasUpgrade("era", 212)) base1 = new Decimal(2.5)
                if (hasUpgrade("era", 231)) base1 = new Decimal(3)
                if (hasUpgrade("era", 342)) base1 = player.era.ec.max(10).log(10).max(10).log(10).times(2)
                base2 = x
                expo = new Decimal(1.003)
                if (hasUpgrade("era", 301)) expo = expo.add(0.02)
                eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
            tooltip() {
                return "Cost Formula: 1e14 x 1.15^Amt x Amt^(" + exp2 + "^Amt). Effect formula: " + notationChooser(base1) + "^(" + notationChooser(base2) + "^" + expo + ")."
            }
        },
        12: {
            title: "Era Buyable 2: Booster Plus",
            unlocked() { return (hasUpgrade('era', 173)) },
            cost(x) {
                exp2 = new Decimal(1.215)
                return new Decimal(5e23).mul(Decimal.pow(1.15, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Era Crystals." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Era Crystals gain by x" + notationChooser(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                return player.era.ec.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.era.ec = player.era.ec.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base1 = new Decimal(5)
                if (hasUpgrade("era", 243)) base1 = new Decimal(6)
                if (hasUpgrade("era", 244)) base1 = new Decimal(7)
                if (hasUpgrade("era", 343)) base1 = new Decimal(6).times(getBuyableAmount("era", 11).max(10).log(10))
                base2 = x
                expo = new Decimal(1.01)
                if (hasUpgrade("era", 301)) expo = expo.add(0.02)
                eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
            tooltip() {
                return "Cost Formula: 5e23 x 1.15^Amt x Amt^(" + exp2 + "^Amt). Effect formula: " + notationChooser(base1) + "^(" + notationChooser(base2) + "^" + expo + ")."
            }
        },
        13: {
            title: "Era Buyable 3: Semi-Booster; Multi.",
            unlocked() { return (hasAchievement('a', 232)) },
            cost(x) {
                exp2 = new Decimal(1.19)
                if (hasUpgrade("c", 23)) exp2 = new Decimal(1.17)
                return new Decimal(3.5e96).mul(Decimal.pow(1.1, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Era Crystals." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Era Crystals gain by x" + notationChooser(buyableEffect(this.layer, this.id)) + " and Mastery Points by x" + notationChooser(buyableEffect(this.layer, this.id).pow(mpow))
            },
            canAfford() {
                return player.era.ec.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.era.ec = player.era.ec.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base1 = new Decimal(4)
                if (hasUpgrade("era", 1051)) base1 = player.m.points.slog().pow(player.m.points.slog()).pow(1.3)
                base2 = x
                expo = new Decimal(1.047)
                eff = base1.pow(Decimal.pow(base2, expo))
                mpow = new Decimal(0.3)
                if (hasUpgrade("m", 113)) mpow = new Decimal(0.4)
                return eff
            },
            tooltip() {
                return "Cost Formula: 3.5e96 x 1.1^Amt x Amt^(" + exp2 + "^Amt). Effect formula: " + notationChooser(base1) + "^(" + notationChooser(base2) + "^" + expo + "). (Mastery Points ^" + mpow + " of EC mult)"
            }
        },
        14: {
            title: "Era Buyable 4: Even more EC",
            unlocked() { return (hasUpgrade('era', 341)) },
            cost(x) {
                exp2 = new Decimal(1.16)
                return new Decimal(1e174).mul(Decimal.pow(1.1, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Era Crystals." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Era Crystals gain by x" + notationChooser(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                return player.era.ec.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.era.ec = player.era.ec.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base1 = player.sac.points.max(10).log(7)
                base2 = x
                expo = new Decimal(1.026)
                eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
            tooltip() {
                return "Cost Formula: 1e174 x 1.1^Amt x Amt^(" + exp2 + "^Amt). Effect formula: " + notationChooser(base1) + "^(" + notationChooser(base2) + "^" + expo + ")."
            }
        },
        15: {
            title: "Era Buyable 5: Minibooster",
            unlocked() { return (hasUpgrade('era', 463)) },
            cost(x) {
                exp2 = new Decimal(1.09)
                return new Decimal("1e319").mul(Decimal.pow(1.09, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Era Crystals." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Era Crystals gain by x" + notationChooser(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                return player.era.ec.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.era.ec = player.era.ec.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base1 = new Decimal(3)
                base2 = x
                expo = new Decimal(1.02)
                eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
            tooltip() {
                return "Cost Formula: 1e319 x 1.09^Amt x Amt^(" + exp2 + "^Amt). Effect formula: " + notationChooser(base1) + "^(" + notationChooser(base2) + "^" + expo + ")."
            }
        },
        16: {
            title: "Era Buyable 6: Pointer",
            unlocked() { return (hasUpgrade('era', 463)) },
            cost(x) {
                exp2 = new Decimal(1.14)
                if (hasUpgrade("c", 54)) exp2 = new Decimal(1.139)
                return new Decimal("1e345").mul(Decimal.pow(1.09, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Era Crystals." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Point Fragments gain by x" + notationChooser(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                return player.era.ec.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.era.ec = player.era.ec.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base1 = new Decimal("1ee18")
                if (hasUpgrade("c", 54)) base1 = new Decimal("e1.58e18")
                base2 = x
                expo = new Decimal(1.026)
                eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
            tooltip() {
                return "Cost Formula: 1e319 x 1.09^Amt x Amt^(" + exp2 + "^Amt). Effect formula: " + notationChooser(base1) + "^(" + notationChooser(base2) + "^" + expo + ")."
            }
        },
        17: {
            title: "Era Buyable 7: OOM increaser",
            unlocked() { return (hasUpgrade('era', 1024)) },
            cost(x) {
                exp2 = new Decimal(1.09)
                return new Decimal("1e427").mul(Decimal.pow(1.07, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Era Crystals." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Era Crystals gain by x" + notationChooser(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                return player.era.ec.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.era.ec = player.era.ec.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base1 = new Decimal(10)
                base2 = x
                expo = new Decimal(1)
                eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
            tooltip() {
                return "Cost Formula: 1e420 x 1.07^Amt x Amt^(" + exp2+ "^Amt). Effect formula: " + notationChooser(base1) + "^(" + notationChooser(base2) + "^" + expo + ")."
            }
        },
        18: {
            title: "Era Buyable 8 (EF Buyable 1): EF Up (Before nerf)",
            unlocked() { return (hasUpgrade('era', 1024)) },
            cost(x) {
                if (x < 10) {
                    return new Decimal(40).mul(Decimal.pow(1.1, x))
                } else {
                    return new Decimal(40).mul(Decimal.pow(1.1, Decimal.pow(x, 0.75+x/40)))
                }
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Era Fragments." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Era Fragments gain before nerf by x" + notationChooser(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                return player.era.ef.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.era.ef = player.era.ef.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base1 = new Decimal(1.1)
                if (hasUpgrade("era", 1033)) base1 = new Decimal(1.15)
                base2 = x
                expo = new Decimal(1)
                eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
            tooltip() {
                return "Cost Formula: 40 x 1.1^Amt (below 10), 40 x 1.1^(Amt ^ 0.75+Amt/40) (after 9). Effect formula: " + notationChooser(base1) + "^(" + notationChooser(base2) + "^" + expo + ")."
            }
        },
        19: {
            title: "Era Buyable 9 (EF Buyable 2): Helping out a good friend (Increasing hardcap of SB5)",
            unlocked() { return (hasMilestone('era', 101)) },
            cost(x) {
                if (x < 5) {
                    return new Decimal(75).mul(Decimal.pow(1.15, x))
                } else {
                    return new Decimal(75).mul(Decimal.pow(1.19, Decimal.pow(x, 0.75+x/50)))
                }
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Era Fragments." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Increase SB5 HC by +" + notationChooser(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                return player.era.ef.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.era.ef = player.era.ef.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base1 = new Decimal(1.0014)
                base2 = x
                expo = new Decimal(1)
                let eff = base1.pow(Decimal.pow(base2, expo)).sub(1)
                hcap = new Decimal(1)
                if (eff.gte(hcap)) eff = hcap
                return eff
            },
            tooltip() {
                return "Cost Formula: 75 x 1.15^Amt (below 5), 75 x 1.19^(Amt ^ 0.75+Amt/50) (after 4). Effect formula: " + notationChooser(base1) + "^(" + notationChooser(base2) + "^" + expo + ")."
            }
        },
        111: {
            title: "Era Buyable [Mastery Challenge 1 only]: PF power (Scales MUCH more after a certain value)",
            unlocked() { return ((hasAchievement('a', 243)) && inChallenge("m", 11)) },
            cost(x) {
                let exp2 = new Decimal(1.2)
                let scalefactor = new Decimal(30)
                if (hasUpgrade("m", 1134)) scalefactor = new Decimal(37)
                if (getBuyableAmount(this.layer, this.id).lte(scalefactor)) {
                    return new Decimal(250e6).mul(Decimal.pow(1.1, x)).mul(x).floor()
                } else {
                    return new Decimal(250e6).mul(Decimal.pow(1.1, x)).mul(Decimal.pow(x, Decimal.pow(exp2, x))).floor()
                }
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " Era Crystals." + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost PF and Mastery Points power by ^" + buyableEffect(this.layer, this.id)
            },
            canAfford() {
                return player.era.ec.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player.era.ec = player.era.ec.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal(1.005)
                let base2 = x
                let expo = new Decimal(1.01)
                let eff = base1.pow(Decimal.pow(base2, expo))
                if (eff.gte(2)) eff = new Decimal(2)
                return eff
            },
        },
    },
    color: "brown",
    requires: new Decimal(761), // Can be a function that takes requirement increases into account
    resource: "Eras", // Name of currency
    baseResource: "Sacrifices", // Name of resource prestige is based on
    baseAmount() {return player.sac.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {
        let exponent = new Decimal(2.5)
        if (hasUpgrade("era", 431)) exponent = exponent.sub(0.1)
        return exponent
    }, 
    gainMult() { // Prestige multiplier
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    row: 6, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: ERA!", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["w", "sac", "s", "m"],
    update(diff) {
        if (hasMilestone("era", 1)) {
            let gain = new Decimal(15)
            if (hasUpgrade('era', 143)) gain = gain.times(buyableEffect('era', 11))
            if (hasUpgrade('era', 173)) gain = gain.times(buyableEffect('era', 12))
            if (hasAchievement('a', 232)) gain = gain.times(buyableEffect('era', 13))
            if (hasUpgrade('era', 341)) gain = gain.times(buyableEffect('era', 14))
            if (hasUpgrade('era', 463)) gain = gain.times(buyableEffect('era', 15))
            if (hasUpgrade('era', 1024)) gain = gain.times(buyableEffect('era', 17))
            
            // upgs
            if (hasUpgrade('era', 153)) gain = gain.times(upgradeEffect('era', 153))
            if (hasUpgrade('era', 12)) gain = gain.times(upgradeEffect('era', 12))
            if (hasUpgrade('era', 45)) gain = gain.times(upgradeEffect('era', 45))
            if (hasUpgrade('c', 54)) gain = gain.times(upgradeEffect('c', 54))
            if (hasUpgrade('era', 1013)) gain = gain.times(upgradeEffect('era', 1013))
            if (hasUpgrade('era', 1032)) gain = gain.times(upgradeEffect('era', 1032))
            if (hasAchievement('sa', 196)) gain = gain.times(1.05)
            if (hasMilestone('sa', 10)) gain = gain.times(1.05)
            if (hasUpgrade("era", 11)) gain = gain.times(2)
            if (hasUpgrade("era", 22)) gain = gain.times(3)
            if (hasUpgrade("era", 31)) gain = gain.times(2)
            if (hasUpgrade("era", 32)) gain = gain.times(1.5)
            if (hasUpgrade("era", 42)) gain = gain.times(1.3)
            if (hasUpgrade("era", 61)) gain = gain.times(1.3)
            if (hasUpgrade("era", 62)) gain = gain.times(1.3)
            if (hasUpgrade("era", 63)) gain = gain.times(1.3)
            if (hasUpgrade("era", 64)) gain = gain.times(1.3)
            if (hasUpgrade("s", 114)) gain = gain.times(15)
            if (hasUpgrade("era", 74)) gain = gain.times(4)
            if (hasUpgrade("era", 83)) gain = gain.times(5)
            if (hasUpgrade("era", 85)) gain = gain.times(1.25)
            if (hasUpgrade("era", 91)) gain = gain.times(4)
            if (hasUpgrade("era", 101)) gain = gain.times(1.4)
            if (hasUpgrade("era", 111)) gain = gain.times(1.13)
            if (hasUpgrade("era", 112)) gain = gain.times(2.8)
            if (hasUpgrade("era", 132)) gain = gain.times(7)
            if (hasUpgrade("era", 162)) gain = gain.times(1.11)
            if (hasUpgrade("era", 171)) gain = gain.times(1.4)
            if (hasUpgrade("era", 175)) gain = gain.times(1.4)
            if (hasUpgrade("era", 191)) gain = gain.times(47.5)
            if (hasUpgrade("era", 192)) gain = gain.times(1.3)
            if (hasUpgrade("era", 193)) gain = gain.times(1.3)
            if (hasUpgrade("era", 202)) gain = gain.times(1.6)
            if (hasUpgrade("era", 211)) gain = gain.times(2)
            if (hasUpgrade("era", 213)) gain = gain.times(2)
            if (hasUpgrade("era", 281)) gain = gain.times(1000)
            if (hasUpgrade("era", 291)) gain = gain.times(100)
            if ((hasUpgrade("era", 292)) && (hasUpgrade("era", 293))) gain = gain.times(1.8) // code example of combos
            if (hasUpgrade("era", 53)) gain = gain.times(25)
            if (hasUpgrade("prestige", 75)) gain = gain.times(17)
            if (hasMilestone("era", 2)) gain = gain.times(50)
            if (hasMilestone("era", 3)) gain = gain.times(33333)
            if (hasMilestone("sac", 80)) gain = gain.times(4)
            if (hasUpgrade("rebirth", 85)) gain = gain.times(18)
            if (hasMilestone("sac", 84)) gain = gain.times(25)
            if (hasMilestone("sac", 85)) gain = gain.times(30)
            if (hasUpgrade("s", 115)) gain = gain.times(115)
            if (hasMilestone("sac", 92)) gain = gain.times(100)
            if(hasMilestone("sac", 93)) gain = gain.times(15)
            if(hasMilestone("sac", 94)) gain = gain.times(180)
            if (hasUpgrade("basic", 115)) gain = gain.times(115)
            if (hasUpgrade("m", 105)) gain = gain.times(105)
            if (hasUpgrade("e", 155)) gain = gain.times(250)
            if(hasMilestone("sac", 97)) gain = gain.times(280)
            if(hasUpgrade("prestige", 85)) gain = gain.times(850)
            if(hasMilestone("sac", 103)) gain = gain.times(12)
            if (hasUpgrade("s", 121)) gain = gain.times(10)
            if (hasUpgrade("era", 311)) gain = gain.times(100)
            if (hasUpgrade("era", 321)) gain = gain.times(2.5)
            if (hasUpgrade("era", 323)) gain = gain.times(2.5)
            if (hasAchievement('sa', 32)) gain = gain.times(1.04)
            if (hasAchievement('sa', 33)) gain = gain.times(1.02)
            if (hasAchievement('sa', 34)) gain = gain.times(1.04)
            if (hasAchievement('sa', 35)) gain = gain.times(1.07)
            if (hasAchievement('sa', 36)) gain = gain.times(1.15)
            if (hasUpgrade("era", 365)) gain = gain.times(1000)
            if (hasMilestone("sac", 107)) gain = gain.times(4)
            if (hasMilestone("sac", 108)) gain = gain.times(10)
            if ((hasUpgrade("era", 134)) && (hasUpgrade("era", 135))) gain = gain.times(1.3)
            if ((hasUpgrade("era", 144)) && (hasUpgrade("era", 145))) gain = gain.times(1.4)
            if (hasAchievement('a', 246)) gain = gain.times(1e10)
            if (hasUpgrade("era", 411)) gain = gain.times(1e10)
            if (hasUpgrade("rebirth", 91)) gain = gain.times(10)
            if (hasUpgrade("rebirth", 92)) gain = gain.times(10)
            if (hasUpgrade("rebirth", 93)) gain = gain.times(10)
            if (hasUpgrade("rebirth", 94)) gain = gain.times(10)
            if (hasUpgrade("rebirth", 95)) gain = gain.times(10)
            if (hasUpgrade("c", 14)) gain = gain.times(5000)
            if (hasUpgrade("era", 461)) gain = gain.times(1e13)
            if (hasUpgrade("era", 413)) gain = gain.div(5)
            if (hasUpgrade("era", 462)) gain = gain.times(20)
            if(hasMilestone("sac", 112)) gain = gain.times(9)
            if(hasMilestone("sac", 113)) gain = gain.times(100)
            if(hasMilestone("sac", 114)) gain = gain.times(12.5)
            if (hasUpgrade("era", 1012)) gain = gain.times(1000)
            if (hasUpgrade('era', 1023)) gain = gain.times(1e10)
            if (hasUpgrade('era', 1044)) gain = gain.times(1e16)

            // infinity
            if (player.era.ec.gte(new Decimal(2).pow(1024))) gain = gain.times(new Decimal(10).pow(player.era.infec))


            // power
            if (hasUpgrade("era", 241)) gain = gain.pow(1.02)
            if (hasUpgrade("era", 271)) gain = gain.pow(1.02)
            if (hasUpgrade("era", 104)) gain = gain.pow(1.026)
            if (hasUpgrade("era", 392)) gain = gain.pow(1.018)
            if (hasUpgrade("m", 133)) gain = gain.pow(1.035)
            if (hasUpgrade("era", 403)) gain = gain.pow(1.02)
            if (hasUpgrade("era", 411)) gain = gain.pow(1.01)
            if (hasUpgrade("era", 451)) gain = gain.pow(1.02)
            if (hasUpgrade("era", 472)) gain = gain.pow(1.0034)
            if (hasUpgrade("era", 492)) gain = gain.pow(1.01)
            if (hasUpgrade("w", 94)) gain = gain.pow(1.04)
            if (hasUpgrade("era", 1042)) gain = gain.pow(1.02)
            if (hasUpgrade("era", 1052)) gain = gain.pow(upgradeEffect('era', 1052))
            let expinmc1 = new Decimal(0.1)
            if (hasUpgrade("m", 1111)) expinmc1 = new Decimal(0.12)
            if (hasUpgrade("m", 1121)) expinmc1 = new Decimal(0.14)
            if (hasUpgrade("m", 1122)) expinmc1 = new Decimal(0.16)
            if (hasUpgrade("m", 1133)) expinmc1 = new Decimal(0.18)
            if ((hasAchievement("a", 243)) && (inChallenge("m", 11))) gain = gain.pow(expinmc1)
            

            // statements above this line
            player.era.ecg = gain
            gain = gain.times(diff)
            player.era.ec = player.era.ec.add(gain)



            // era fragments
            // absolute base formula is slog(EC)^(slog(PF)-1), where slog(EC) and slog(PF)-1 returns at least 1.
            player.era.baseef = new Decimal(Math.max(player.era.ec.slog(),1)).pow(new Decimal(Math.max(player.points.slog()-1,1)))

            // stuff that boosts base EF
            if (hasUpgrade('era', 1011)) player.era.baseef = player.era.baseef.times(upgradeEffect('era', 1011))
            if (hasUpgrade('era', 1021)) player.era.baseef = player.era.baseef.times(upgradeEffect('era', 1021))
            if (hasUpgrade('era', 1024)) player.era.baseef = player.era.baseef.times(buyableEffect('era', 18))
            if (hasUpgrade("w", 93)) player.era.baseef = player.era.baseef.times(upgradeEffect("w", 93))
            if (hasUpgrade("w", 94)) player.era.baseef = player.era.baseef.times(Math.max(player.era.ec.slog(),1))
            if (hasUpgrade('era', 1053)) player.era.baseef = player.era.baseef.times(upgradeEffect('era', 1053))

            if (hasUpgrade('era', 1041)) player.era.baseef = player.era.baseef.times(2)
            if (hasUpgrade('era', 1044)) player.era.baseef = player.era.baseef.times(2)
            
            // nerf, stuff that boosts mult after nerf and reduces nerf exponent
            if (hasUpgrade("era", 1043)) player.era.nerfexponent = new Decimal(2.9)
            if (player.era.ef.lte(10)) {
                if (player.era.baseef.lte(2000)) {
                    player.era.nerf = 1
                } else {
                    player.era.nerf = player.era.baseef.pow(0.4)
                }
            } else {
                if (player.era.baseef.lte(100)) {
                    player.era.nerf = Decimal.max(player.era.nerfexponent.pow(player.era.ef.div(5).log(2)), 1)
                } else {
                    player.era.nerf = Decimal.max(player.era.nerfexponent.pow(player.era.ef.div(5).log(2)), 1)
                    if (player.era.nerf.lte(player.era.baseef.pow(0.4))) {
                        player.era.nerf = player.era.baseef.pow(0.4)
                    }
                }
            }
            player.era.multaftnerf = new Decimal(1)
            if (hasUpgrade('era', 1012)) player.era.multaftnerf = player.era.multaftnerf.times(1.1)
            if (hasUpgrade('era', 1023)) player.era.multaftnerf = player.era.multaftnerf.times(1.2)
            if (hasUpgrade('era', 1031)) player.era.multaftnerf = player.era.multaftnerf.times(upgradeEffect('era', 1031))
            if (hasUpgrade('era', 1041)) player.era.multaftnerf = player.era.multaftnerf.times(1.2)
            if (hasMilestone('sac', 118)) player.era.multaftnerf = player.era.multaftnerf.times(1.19)
            if (hasMilestone("sa", 36)) player.era.multaftnerf = player.era.multaftnerf.times(1.02)
            
            // final formula and adding
            gainef = player.era.baseef.div(player.era.nerf).times(player.era.multaftnerf)
            gainef = gainef.times(diff)
            player.era.ef = player.era.ef.add(gainef)
            player.era.eftotal = player.era.eftotal.add(gainef)
        }
    },
})