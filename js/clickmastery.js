addLayer("cm", {
    startData() { return {
        unlocked: true,
        clickmastery: new Decimal(0),
        cpc: new Decimal(1),
        cmlvl: new Decimal(1),
        clmult: new Decimal(1.1),
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
                        return "[100 Clicks] Clicks boosts atom gain. Currently:" + notationChooser(player.cm.clickmastery.log(9)) + "x. [log9(CM)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(100)){
                        return "[1,000 Clicks] Clicks boosts energy gain. Currently:" + notationChooser(player.cm.clickmastery.div(5).log(11)) + "x. [log11(CM/5)]"
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
                        return "[10,000 Clicks] Clicks boosts atom gain again. Currently:" + notationChooser(player.cm.clickmastery.div(77).log(14)) + "x. [log14(CM/77)]"
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
                        return "[200,000 Clicks] Clicks boosts Power. Currently:" + notationChooser(player.cm.clickmastery.div(333).log(16)) + "x. [log16(CM/333)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(200000)){
                        return "[500,000 Clicks] Clicks boosts itself again. Currently:" + notationChooser(player.cm.clickmastery.div(4000).log(10)) + "x. [log10(CM/4000)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(500000)){
                        return "[2.5M Clicks] Clicks boosts itself again. Currently:" + notationChooser(player.cm.clickmastery.div(7).log(777)) + "x. [log777(CM/7)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(2.5e6)){
                        return "[8M Clicks] Clicks boosts Matter gain. Currently:" + notationChooser(player.cm.clickmastery.div(3333).log(333)) + "x. [log333(CM/3333)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(8e6)){
                        return "[20M Clicks] Clicks boosts itself yet again. Currently:" + notationChooser(player.cm.clickmastery.div(53535).log(53)) + "x. [log53(CM/53535)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(20e6)){
                        return "[50M Clicks] Clicks boosts Atoms, Energy and Power. Currently:" + notationChooser(player.cm.clickmastery.div(188888).log(18)) + "x. [log18(CM/188888)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(50e6)){
                        return "[100M Clicks] Clicks boosts itself yet again. Currently:" + notationChooser(player.cm.clickmastery.slog()) + "x. [slog(CM)]"
                    } else {
                        return ""
                    } 
                }],
                "blank",
                ["display-text", function() {
                    if (player.cm.clickmastery.gte(100e6)){
                        return "[250M Clicks] Click level mult to clicks is increased from 1.1 to 1.15. It also boosts Atoms at that rate."
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
        player[this.layer].cpc = player[this.layer].cpc.times(new Decimal(1.1).pow(player.cm.cmlvl))
        if (player.cm.clickmastery.gte(2000)) player[this.layer].cpc = player[this.layer].cpc.times(player.cm.clickmastery.div(40).log(8))
        if (player.cm.cmlvl.gte(6)) player[this.layer].cpc = player[this.layer].cpc.times(player.cm.cmlvl.div(2))
        if (player.cm.clickmastery.gte(500000)) player[this.layer].cpc = player[this.layer].cpc.times(player.cm.clickmastery.div(4000).log(10))
        if (player.cm.clickmastery.gte(2.5e6)) player[this.layer].cpc = player[this.layer].cpc.times(player.cm.clickmastery.div(7).log(777))
        if (player.cm.clickmastery.gte(20e6)) player[this.layer].cpc = player[this.layer].cpc.times(player.cm.clickmastery.div(53535).log(53))
        if (player.cm.clickmastery.gte(100e6)) player[this.layer].cpc = player[this.layer].cpc.times(player.cm.clickmastery.slog())


        if (player.cm.clickmastery.gte(250e6)) player.cm.clmult = new Decimal(1.15)

        // main game boosts
        if (hasUpgrade("en", 65)) player[this.layer].cpc = player[this.layer].cpc.times(1.2)
        if (hasMilestone("ma", 9)) player[this.layer].cpc = player[this.layer].cpc.times(1.25)

        player.cm.clscale = new Decimal(3)
        if (hasAchievement("a", 101)) player[this.layer].cpc = player[this.layer].cpc.times(1.025)
        if (hasAchievement("a", 102)) player[this.layer].cpc = player[this.layer].cpc.times(1.05)
        if (hasAchievement("a", 103)) player.cm.clscale = player.cm.clscale.sub(0.05)
        if (hasAchievement("a", 104)) player.cm.clscale = player.cm.clscale.sub(0.05)
        if (hasAchievement("a", 105)) player[this.layer].cpc = player[this.layer].cpc.times(1.05)
        if (hasAchievement("a", 106)) player.cm.clmult = new player.cm.clmult.add(0.015)
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