addLayer("i", {
    startData() { return {
        unlocked: true,
    }},
    color: "blue",
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Info")
    },
    tabFormat: {
        "Main": {
            content: [
                ["infobox", "main"],
                "blank",
                "blank",
                ["infobox", "ns"],
                "blank",
                "blank",
                ["infobox", "ach"],
                "blank",
                "blank",
                ["infobox", "upgrade"],
                "blank",
                "blank",
                ["infobox", "milestone"],
                "blank",
                "blank",
                ["infobox", "buyable"],
                "blank",
                "blank",
                ["infobox", "challenge"],
                "blank",
                "blank",
                ["infobox", "ext"],
                "blank",
                "blank",
                ["infobox", "passive"],
                "blank",
                "blank",
                ["infobox", "keep"],
                "blank",
                "blank",
                ["infobox", "cap"],
                "blank",
                "blank",
                ["infobox", "NSU"],
                "blank",
                "blank",
                ["infobox", "repups"],
                "blank",
                "blank",
                ["infobox", "catch"],
            ],
        },
        "Pre-Sacrifice Layers [Early-game]": {
            content: [
                ["infobox", "basic"],
                "blank",
                "blank",
                ["infobox", "reb"],
                "blank",
                "blank",
                ["infobox", "pres"],
                "blank",
                "blank",
                ["infobox", "mega"],
            ],
        },
        "Sacrifice to Pre-Era [Mid-game]": {
            unlocked() { return player.sac.points.gte(1)},
            content: [
                ["infobox", "sac"],
                "blank",
                "blank",
                ["infobox", "energy"],
                "blank",
                "blank",
                ["infobox", "dimshift"],
                "blank",
                "blank",
                ["infobox", "supreme"],
                "blank",
                "blank",
                ["infobox", "water"],
                "blank",
                "blank",
                ["infobox", "mastery"],
            ],
        },
        "Era to Endgame [Late-game]": {
            unlocked() { return player.era.points.gte(1)},
            content: [
                ["infobox", "era"],
                "blank",
                "blank",
                ["infobox", "combo"],
                "blank",
                "blank",
                ["infobox", "cells"],
            ],
        },
        "Recommended Completion of challenges": {
            unlocked() { return player.sac.points.gte(15)},
            content: [
                ["infobox", "sacrecenter"],
                "blank",
                "blank",
                ["infobox", "mastrecenter"],
                "blank",
                "blank",
                ["infobox", "mastrecenterpera"],
            ],
        },
    },
    infoboxes: {
        main: {
            title: "Welcome to The Point Tree! [HELL EDITION]",
            body() { return "Explore many blah blah blah blah blah. [SIDE NOTE: YOU ARE PLAYING ON THE HELL EDITION, WHERE MOST UPGRADES, MILESTONES, BUYABLES ARE 10X MORE EXPENSIVE. THERE IS A STANDARD VERSION.]" },
        },
        ach: {
            title: "Achievements [Ach]",
            body() { return "Achievements give...(glitching)...means a new stage. Achievements can (oh no, theres static!) re-bode unc s. Thicehieunew ????" },
        },
        ns: {
            title: "*Snores*",
            body() { return "Oh no, a demon is sleeping on this infobox. Well, I think you probably know this game as you came in from the Point Tree discord..." },
        },
        basic: {
            title: "The Basic layer [B]",
            body() { return "The first layer of the game, already hard." },
        },
        upgrades: {
            title: "Upgrades",
            body() { return "Do you really not know what upgrades are?" },
        },
        NSU: {
            title: "Non-static Upgrades",
            body() { return "new 'mechanic'" },
            unlocked() { return (hasUpgrade('basic', 11))}
        },
        reb: {
            title: "The rebirth Layer (R, or Reb)",
            body() { return "Morve. Focus! Rebirth Fragments. ^150004e100,000 cap." },
            unlocked() { return (hasUpgrade('basic', 34))}
        },
        ext: {
            title: "Extensions",
            body() { return "extend!" },
            unlocked() { return (hasUpgrade('basic', 34))}
        },
        passive: {
            title: "n",
            body() { return "n u o t p c y, ()" },
            unlocked() { return (hasMilestone('rebirth', 2))}
        },
        milestone: {
            title: "Miss!",
            body() { return "You missed it!" },
            unlocked() { return (hasMilestone('rebirth', 1))}
        },
        keep: {
            title: "Stuff",
            body() { return "click less, stay here more!" },
            unlocked() { return (hasMilestone('rebirth', 3))}
        },
        cap: {
            title: "nerf",
            body() { return "you dont want an unbalanced game do you" },
            unlocked() { return player.rebirth.points.gte(new Decimal(1))}
        },
        pres: {
            title: "next layer yada yada",
            body() { return "In here, is it harder!" },
            unlocked() { return player.prestige.points.gte(new Decimal("1"))}
        },
        mega: {
            title: "nex-er",
            body() { return "Legend=OP." },
            unlocked() { return player.mega.points.gte(new Decimal("1"))}
        },
        buyable: {
            title: "Bus",
            body() { return "Bus! Beep beep" },
            unlocked() { return (hasUpgrade('mega', 33))}
        },
        sac: {
            title: "acne",
            body() { return "stop giving me acne" },
            unlocked() { return player.sac.points.gte(new Decimal("1"))}
        },
        dimshift: {
            title: "its 3D not 2D",
            body() { return "155." },
            unlocked() { return player.sac.points.gte(new Decimal("10"))}
        },
        energy: {
            title: "Electricity!",
            body() { return "who knows what is 'passively generated by its own'? Talk about 'small boost', amiright?" },
            unlocked() { return player.e.points.gte(new Decimal("1"))}
        },
        challenge: {
            title: "no challenge",
            body() { return "you finish it in a few minutes, whats the challenge here?" },
            unlocked() { return player.sac.points.gte(new Decimal("20"))}
        },
        supreme: {
            title: "timewall",
            body() { return "timewall!! we love you right thats why you keep playing amiright" },
            unlocked() { return player.s.points.gte(new Decimal("1"))}
        },
        water: {
            title: "elemental pixies",
            body() { return "a battle cats reference" },
            unlocked() { return player.w.points.gte(new Decimal("1"))}
        },
        mastery: {
            title: "does not master anything",
            body() { return "it just new stuff, no mastery" },
            unlocked() { return player.m.points.gte(new Decimal("1"))}
        },
        repups: {
            title: "E E E E E E E E E E E E E E E E E E E E E E E",
            body() { return "eeeeeeeeeeeeeeee - calm carrot" },
            unlocked() { return hasUpgrade("mega", 61)}
        },
        era: {
            title: "looooong layer",
            body() { return "ugh im bored" },
            unlocked() { return player.era.points.gte(new Decimal("1"))}
        },
        catch: {
            title: "Catch",
            body() { return "i will use the ultra ball" },
            unlocked() { return hasUpgrade("prestige", 31)}
        },
        combo: {
            title: "1 2 punch",
            body() { return "idk where i heard this from" },
            unlocked() { return hasUpgrade("era", 105)}
        },
        sacrecenter: {
            title: "Ses",
            body() { return "you played this game before" },
            unlocked() { return player.sac.points.gte(new Decimal("20"))}
        },
        mastrecenter: {
            title: "meow",
            body() { return "purrs" },
            unlocked() { return hasUpgrade('m', 11)}
        },
        mastrecenterpera: {
            title: "woof",
            body() { return "tweet" },
            unlocked() { return hasMilestone('era', 3)}
        },
        cells: {
            title: "magic",
            body() { return "1 become 2 become 4!" },
            unlocked() { return player.c.points.gte(new Decimal("1"))}
        },
    },
}, 
)