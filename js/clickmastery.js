addLayer("cm", {
    startData() { return {
        unlocked: true,
        clickmastery: new Decimal(0),
        cpc: new Decimal(1),
        cmlvl: new Decimal(1),
        clmult: new Decimal(1.09),
        clscale: new Decimal(3),
    }},
    color: "grey",
    row: "side",
    layerShown() {return hasMilestone("ma", 7)}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Click Mastery")
    },
    tabFormat: {
        "Click Mastery": {
            content: [
                ["display-text", function() {
                    return "You have "+ notationChooser(player.cm.clickmastery) +" Clicks. Click the button to earn clicks!" 
                }],
                "blank",
                ["display-text", function() {
                    return "Your Click Level is "+ notationChooser(player.cm.cmlvl) +". This boosts clicks by " + notationChooser(player.cm.clmult.pow(player.cm.cmlvl)) + "x. (Next Level: " + notationChooser(player.cm.clscale.pow(player.cm.cmlvl.add(1)).times(50).sub(50)) + " clicks)"
                }],
                "blank",
                ["display-text", function() {
                    return "You gain "+ notationChooser(player.cm.cpc) +" clicks per click."
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(0)){
                        return "[100 Clicks] Clicks boosts atom gain. Currently:" + notationChooser(player.cm.clickmastery.mul(25).log(25)) + "x. [log25(CM*25)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(100)){
                        return "[1,000 Clicks] Clicks boosts energy gain. Currently:" + notationChooser(player.cm.clickmastery.mul(5).log(25)) + "x. [log25(CM*5)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(1000)){
                        return "[3,000 Clicks] Clicks boosts itself. Currently:" + notationChooser(player.cm.clickmastery.div(40).log(8)) + "x. [log8(CM/40)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(3000)){
                        return "[10,000 Clicks] Clicks boosts atom gain again. Currently:" + notationChooser(player.cm.clickmastery.log(47)) + "x. [log47(CM)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(10000)){
                        return "[Click Level 6] Click Level boosts clicks. Currently:" + notationChooser(player.cm.cmlvl.div(2)) + "x. [Lvl/2]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.cmlvl.gte(6)){
                        return "[200,000 Clicks] Clicks boosts Power. Currently:" + notationChooser(player.cm.clickmastery.div(333).log(16)) + "x. [log333(CM/33)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(200000)){
                        return "[500,000 Clicks] Clicks boosts itself again. Currently:" + notationChooser(Decimal.min(player.cm.clickmastery.div(4000).log(10), 5)) + "x. [log10(CM/4000)], MAX 5x]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(500000)){
                        return "[2.5e6 Clicks] Clicks boosts itself again. Currently:" + notationChooser(player.cm.clickmastery.div(7).log(777)) + "x. [log777(CM/7)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(2.5e6)){
                        return "[10e6 Clicks] Clicks boosts Matter gain. Currently:" + notationChooser(player.cm.clickmastery.div(333).log(3333)) + "x. [log333(CM/3333)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(1e7)){
                        return "[25e6 Clicks] Clicks boosts itself yet again. Currently:" + notationChooser(player.cm.clickmastery.div(53535).log(53)) + "x. [log53(CM/53535)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(25e6)){
                        return "[50e6 Clicks] Clicks boosts Atoms, Energy and Power. Currently:" + notationChooser(player.cm.clickmastery.div(288888).log(28)) + "x. [log28(CM/288888)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(50e6)){
                        return "[125e6 Clicks] Clicks boosts itself yet again. Currently:" + notationChooser(player.cm.clickmastery.slog().div(1.25)) + "x. [slog(CM)/1.25]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(125e6)){
                        return "[3e8 Clicks] Click level mult to clicks is increased from 1.09 to 1.12. It also boosts Atoms at that rate."
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(2.5e8)){
                        return "[7.5e8 Clicks] Clicks boosts itself yet again. Currently:" + notationChooser(player.cm.clickmastery.div(1212).log(1212)) + "x. [log1212(CM/1212)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(7.5e8)){
                        return "[2e9 Clicks] Clicks boosts Matter gain again. Currently:" + notationChooser(player.cm.clickmastery.mul(70).log(700000)) + "x. [log700K(CM*70)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(2e9)){
                        return "[3e9 Clicks] Clicks boosts Atom gain again. Currently:" + notationChooser(player.cm.clickmastery.mul(225).log(22500)) + "x. [log22.5K(CM*225)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(3e9)){
                        return "[4e9 Clicks] Clicks boosts Power gain again. Currently:" + notationChooser(player.cm.clickmastery.mul(888).log(88888)) + "x. [log88888(CM*888)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(4e9)){
                        return "[6e9 Clicks] Clicks boosts Molecules gain. Currently:" + notationChooser(player.cm.clickmastery.div(4000).log(4000)) + "x. [log4K(CM/4K)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(6e9)){
                        return "[1e10 Clicks] x1.75 Clicks Gain (First Static Milestone)"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(1e10)){
                        return "[2e10 Clicks] Clicks boosts Energy and Matter gain. Currently:" + notationChooser(player.cm.clickmastery.times(500).log(5000000)) + "x. [log5M(CM*500)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(2e10)){
                        return "[3e10 Clicks] Triple Atom Gain"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(3e10)){
                        return "[5e10 Clicks] Clicks boosts itself. Currently:" + notationChooser(player.cm.clickmastery.slog().div(1.7)) + "x. [slog(CM)/1.7]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                "blank",
                "clickables",
                "blank",
                ["infobox", "cm"],
            ],
        },
    },
    clickcalculation() {
        player[this.layer].cpc = new Decimal(1)
        player[this.layer].cmlvl = (((player[this.layer].clickmastery.div(50)).add(1)).log(player.cm.clscale)).floor()
        player[this.layer].cpc = player[this.layer].cpc.times(player.cm.clmult.pow(player.cm.cmlvl))
        if (player.cm.clickmastery.gte(2000)) player[this.layer].cpc = player[this.layer].cpc.times(player.cm.clickmastery.div(40).log(8))
        if (player.cm.cmlvl.gte(6)) player[this.layer].cpc = player[this.layer].cpc.times(player.cm.cmlvl.div(2))
        if (player.cm.clickmastery.gte(500000)) player[this.layer].cpc = player[this.layer].cpc.times(Decimal.min(player.cm.clickmastery.div(4000).log(10), 5))
        if (player.cm.clickmastery.gte(2.5e6)) player[this.layer].cpc = player[this.layer].cpc.times(player.cm.clickmastery.div(7).log(777))
        if (player.cm.clickmastery.gte(25e6)) player[this.layer].cpc = player[this.layer].cpc.times(player.cm.clickmastery.div(53535).log(53))
        if (player.cm.clickmastery.gte(125e6)) player[this.layer].cpc = player[this.layer].cpc.times(player.cm.clickmastery.slog().div(1.25))
        if (player.cm.clickmastery.gte(750e6)) player[this.layer].cpc = player[this.layer].cpc.times(player.cm.clickmastery.div(1212).log(1212))
        if (player.cm.clickmastery.gte(1e10)) player[this.layer].cpc = player[this.layer].cpc.times(1.75)
        if (player.cm.clickmastery.gte(5e10)) player[this.layer].cpc = player[this.layer].cpc.times(player.cm.clickmastery.slog().div(1.7))


        if (player.cm.clickmastery.gte(300e6)) player.cm.clmult = new Decimal(1.12)

        // main game boosts
        if (hasUpgrade("en", 65)) player[this.layer].cpc = player[this.layer].cpc.times(1.2)
        if (hasUpgrade("mo", 11)) player[this.layer].cpc = player[this.layer].cpc.times(1.5)
        if (hasMilestone("cf", 2)) player[this.layer].cpc = player[this.layer].cpc.times(1.6)
        if (hasMilestone("w", 4)) player[this.layer].cpc = player[this.layer].cpc.times(1.4)

        player.cm.clscale = new Decimal(3)
        if (hasAchievement("a", 101)) player[this.layer].cpc = player[this.layer].cpc.times(1.025)
        if (hasAchievement("a", 102)) player[this.layer].cpc = player[this.layer].cpc.times(1.05)
        if (hasAchievement("a", 103)) player.cm.clscale = player.cm.clscale.sub(0.05)
        if (hasAchievement("a", 104)) player.cm.clscale = player.cm.clscale.sub(0.05)
        if (hasAchievement("a", 105)) player[this.layer].cpc = player[this.layer].cpc.times(1.05)
        if (hasAchievement("a", 106)) player.cm.clmult = player.cm.clmult.add(0.015)
    },
    clickables: {
        11: {
            title(){
                title = "Click!"
                return title
            },
            style() {return {
                'width': '250px',
                'height': '115px',
            }},
            canClick() {return true},
            onClick() {return player[this.layer].clickmastery = player[this.layer].clickmastery.add(player[this.layer].cpc)},
            onHold() {return player[this.layer].clickmastery =  player[this.layer].clickmastery.add(player[this.layer].cpc)}
        },
    },
    infoboxes: {
        cm: {
            title: "Click Mastery",
            body() { return "Optional, but boosts progression. Clicks in 'Click Mastery' unlocks milestones which boost something based on clicks. Click (or hold, or hold the enter button) on the button, and it will give you clicks equivalent to your cpc (clicks per click). cpc can be increased by Click Level and later milestones. Some main-game upgrades can also boost cpc." },
        },
    },
})