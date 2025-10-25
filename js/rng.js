addLayer("rng", {
    startData() { return {
        unlocked: true,
        luck: new Decimal(1),
        rngpts: new Decimal(0),
        rng: new Decimal(1),
        rngidx: 0,
        rarityName: "Common",
        cd: new Decimal(5),
        maxidx: 0,
        preName: "",
        rngptmult: new Decimal(1),
        rollnextcd: new Decimal(5),
        rarityscale: 3,
        rngscale: 2,
    }},
    color: "pink",
    row: "side",
    layerShown() {return player.era.points.gte(3)}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("RNG Minigame")
    },
    automate() {
        if (hasMilestone("rng", 8)) {
            if (layers.rng.buyables[11].canAfford()) {
                layers.rng.buyables[11].buy();
            };
        }
        if (hasMilestone("rng", 12)) {
            if (layers.rng.buyables[12].canAfford()) {
                layers.rng.buyables[12].buy();
            };
        }
        if (hasMilestone("rng", 15)) {
            if (layers.rng.buyables[13].canAfford()) {
                layers.rng.buyables[13].buy();
            };
        }
        if (hasMilestone("rng", 18)) {
            if (layers.rng.buyables[14].canAfford()) {
                layers.rng.buyables[14].buy();
            };
        }
	},
    tabFormat: {
        "RNG": {
            content: [
                ["display-text",
                    function(){
                        let a = ""
                        a = a + "You have " + notationChooser(player.rng.rngpts) + " RNG Points. You have to wait " + formatTime(player.rng.cd) + " to roll again. "
                        a = a + "Your max RarityID is " + formatWhole(player.rng.maxidx)
                        return a
                    }
                ],
                "blank",
                "blank",
                ["clickables", [1]],
                "blank",
                "blank",
                "buyables",
                "blank",
                ["infobox", "main"],
            ],
            unlocked() {return true}
        },
        "MILESTONES": {
            content: [
                "milestones",
            ],
            unlocked() {return true}
        },
    },
    clickables: {
        11: {
            title: "ROLL",
            canClick() {return player.rng.cd.lte(0)},
            onClick() {
                const rarityList = ["Worst", "Trash", "Horrendous", "Bad", "Un-unique", "Common", "Dull", "Fundemental", "Typical", "Basic", "Average", "Natural", "Uncommon", "Distinct", "Unusual", "Ordinary", "Rare", "Great", "Very Rare", "Advanced", "Epic", "Remarkable", "Amazing", "Exceptional", "Near-perfect", "Pristine", "Perfection", "Legendary", "Jackpot", "Mythical", "Fabled", "Radiant", "Royal", "Godly", "Heroic", "Superhero", "Deity", "Exotic", "Glorious", "Super", "Mega", "Ultra", "Supreme", "Divine", "Ultima", "Extreme", "Celestial", "Ascended", "Transcended", "Ruler", "King", "Emperor", "Champion", "Master", "Lord", "Monarch", "Overseer", "Heavenly", "Demonic", "Monstrous", "Draconic", "Phoenix", "Ghost", "Hidden", "Invisible", "Gas", "Plasma", "Ancient", "Futuristic", "Coal", "Iron", "Silver", "Nickel", "Copper", "Aluminium", "Tin", "Gold", "Cobalt", "Diamond", "Platinum", "Emerald", "Ruby", "Sapphire", "Quartz", "Titanium", "Opal", "Pyrite", "Iridium", "Cinnabar", "Antimony", "Uranium", "Plutonium", "Americium", "Galaxium", "Stardust", "Cosmic", "Astral", "Solar", "Lunar", "Eclipse", "Nebula", "Star", "Galactic", "Supernova", "Pulsar", "Quasar", "Galaxy Cluster", "Galaxy Supercluster", "Universe", "Multiverse", "Omniverse", "Sacred", "Blessed", "Ethereal", "Miracle", "Abyssal", "Quantum", "Eternal", "Forsaken", "Superior", "Life-changing", "Infinite", "Absolute", "Cataclysmic", "Oblivion", "Apocalyptic", "Hell", "Traumatic", "Unstable", "Wraith", "Catastrophic", "Immortal", "Mirage", "Unreal", "Unmatched", "Godforsaken", "Omniscient","Theoretical","Immeasurable","Alpha", "Beta", "Omega", "Ascendent", "Genesis", "Monolith", "Apex", "Pinnacle", "Reality", "Timeless", "Beyond"]
                const preNames = ["", "True", "Powerful", "Absolute", "Absurd", "Prime", "Hyper", "Final", "Gilded", "Proto", "Meta", "Meteoric", "Liminal", "Indescribable", "Unfathomable", "Undefined", "Chromatic", "Arch", "Unbound", "Zenith", "Origin", "Void", "Omnipotent", "Godlike", "Exalted"] // 25 pre-Names
                player.rng.rng = new Decimal(1).div(Math.random())
                if (!(hasMilestone("rng", 19))) {
                    player.rng.rng = player.rng.rng.mul(player.rng.luck)
                } else {
                    player.rng.rng = player.rng.rng.mul(player.rng.luck.pow(1 + (Math.random() / 5)))
                }
                let log3 = Decimal.log(player.rng.rng, player.rng.rarityscale)
                player.rng.rngidx = log3.floor().toNumber()
                player.rng.preName = preNames[Math.floor(player.rng.rngidx / 150) % 25]
                player.rng.rarityName = player.rng.preName + " " + rarityList[player.rng.rngidx % (rarityList.length)];
                player.rng.cd = player.rng.rollnextcd
                if (player.rng.rngidx > player.rng.maxidx) player.rng.maxidx = player.rng.rngidx
                if (hasMilestone("rng", 18)) {
                    player.rng.rngpts = player.rng.rngpts.add(player.rng.rngptmult.mul(new Decimal(player.rng.rngscale).pow(new Decimal(player.rng.rngidx))).mul(player.rng.luck.pow(0.1)))
                } else {
                    player.rng.rngpts = player.rng.rngpts.add(player.rng.rngptmult.mul(new Decimal(player.rng.rngscale).pow(new Decimal(player.rng.rngidx))))
                }
            },
            display() {
                if (player.rng.rngidx < 3750){
                    return "You got a " + player.rng.rarityName + " rarity (ID: " + formatWhole(new Decimal(player.rng.rngidx)) + ", RNG: 1/" + notationChooser(new Decimal(player.rng.rng)) + ", Nett RNG (irregardless of luck): " + notationChooser(new Decimal(player.rng.rng).div(player.rng.luck)) + ")"
                } else if (player.rng.rngidx < 1e6){
                    return "You got a " + player.rng.rarityName + " " + formatWhole(new Decimal(Math.floor(player.rng.rngidx / 3750))) + " rarity (ID: " + formatWhole(new Decimal(player.rng.rngidx)) + ", RNG: 1/" + notationChooser(new Decimal(player.rng.rng)) + ")"
                } else {
                    return "You got a " + player.rng.rarityName + " " + notationChooser(new Decimal(Math.floor(player.rng.rngidx / 3750))) + " rarity (ID: " + notationChooser(new Decimal(player.rng.rngidx)) + ", RNG: 1/" + notationChooser(new Decimal(player.rng.rng)) + ")"
                }
            },
            style() {return {
                'width': '600px',
            }},
            
        },
    },
    buyables: {
        11: {
            title: "Luck Buyable 1: Beginning",
            cost(x) {
                if (hasMilestone("rng", 11)) {
                    if (x > 1000) {
                        if (x > 2000) {
                            return new Decimal(10).mul(Decimal.pow(-70+((0.001*x-0.9)*x), x.pow(x/2000))).floor()
                        } else {
                            return new Decimal(10).mul(Decimal.pow(-70+((0.001*x-0.9)*x), x)).floor()
                        }
                    } else {
                        return new Decimal(10).mul(Decimal.pow(2+(x/30), x)).floor()
                    }
                } else {
                    return new Decimal(10).mul(Decimal.pow(2+(x/20), x)).floor()
                }
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " RNG Points" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Luck gain by x" + notationChooser(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                if (getBuyableAmount(this.layer, this.id) >= 3000) return false
                return player[this.layer].rngpts.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player[this.layer].rngpts = player[this.layer].rngpts.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base = new Decimal(2)
                if (hasMilestone("rng", 2)) base = base.add(0.1)
                if (hasMilestone("rng", 5)) base = base.add(0.1)
                if (hasMilestone("rng", 10)) base = base.add(0.1)
                if (hasMilestone("rng", 12)) base = base.mul(player.rng.rngpts.add(1).slog().div(10).add(0.9))
                if (hasMilestone("rng", 24)) base = base.mul(100)
                if (hasMilestone("rng", 21)){
                    eff = base.pow(x).pow(buyableEffect("rng", 15))
                } else {
                    eff = base.pow(Math.min(x, 2000))
                }
                return eff
            },
            tooltip() {
                return "Effect formula: " + base +"^Amt."
            }
        },
        12: {
            title: "Luck Buyable 2: Advancing",
            cost(x) {
                if (hasMilestone("rng", 11)) {
                    if (x > 1000) {
                        if (x > 2049) {
                            return new Decimal(200).mul(Decimal.pow(4*(x*(50+(2*x-4100))*(x/2050)*(x/2050)), x.pow((x/500)-3))).floor()
                        } else {
                            return new Decimal(200).mul(Decimal.pow(4+(x/(41-(x*0.02))), x)).floor()
                        }
                    } else {
                        return new Decimal(200).mul(Decimal.pow(4+(x/20), x)).floor()
                    }
                } else {
                    return new Decimal(20000).mul(Decimal.pow(5+(x/20), x)).floor()
                }
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " RNG Points" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Luck gain by x" + notationChooser(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                if (getBuyableAmount(this.layer, this.id) >= 2500) return false
                return player[this.layer].rngpts.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player[this.layer].rngpts = player[this.layer].rngpts.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base = new Decimal(3)
                if (hasMilestone("rng", 5)) base = base.add(0.1)
                if (hasMilestone("rng", 10)) base = base.add(0.3)
                if (hasMilestone("rng", 12)) base = base.mul(player.rng.rngpts.add(1).slog().div(10).add(0.9))
                if (hasMilestone("rng", 21)){
                    eff = base.pow(x).pow(buyableEffect("rng", 15))
                } else {
                    eff = base.pow(Math.min(x, 2000))
                }
                return eff
            },
            tooltip() {
                return "Effect formula: " + base +"^Amt."
            },
            unlocked() {return hasMilestone("rng",3)}
        },
        13: {
            title: "Luck Buyable 3: Mastering",
            cost(x) {
                if (hasMilestone("rng", 11)) {
                    if (x > 1000) {
                        if (x > 2000) {
                            return new Decimal(5e19).mul(Decimal.pow((100+(250*x)+(10*x*x)+(x*x*x)+(0.05*x*x*x*x)), x.pow((x/1000)-1))).floor()
                        } else {
                            return new Decimal(5e19).mul(Decimal.pow((50+(50*x)+(2*x*x)+(0.025*x*x*x)), x)).floor()
                        }
                    } else {
                        return new Decimal(5e19).mul(Decimal.pow((20+(10*x)+(0.8*x*x)), x)).floor()
                    }
                } else {
                    return new Decimal(5e19).mul(Decimal.pow((20+(20*x)+(2*x*x)), x)).floor()
                }
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " RNG Points" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Luck gain by x" + notationChooser(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                if (getBuyableAmount(this.layer, this.id) >= 3000) return false
                return player[this.layer].rngpts.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player[this.layer].rngpts = player[this.layer].rngpts.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base = new Decimal(50)
                if (hasMilestone("rng", 12)) base = base.mul(player.rng.rngpts.add(1).slog().div(10).add(0.9))
                if (hasMilestone("rng", 21)){
                    eff = base.pow(x).pow(buyableEffect("rng", 15))
                } else {
                    eff = base.pow(Math.min(x, 2000))
                }
                return eff
            },
            tooltip() {
                return "Effect formula: " + base +"^Amt."
            },
            unlocked() {return hasMilestone("rng",7)}
        },
        14: {
            title: "Luck Buyable 4: Crushing",
            cost(x) {
                if (x > 1000) {
                    if (x > 2000) {
                        return new Decimal("1e480").mul(Decimal.pow(10+1*x+(0.05*(x/1000))*x*x, x*(x/1000)*(x/1000)*(x/1000)*(x/2000)*(x/2000)*(x/2000)*(x/2000))).floor()
                    } else {
                        return new Decimal("1e480").mul(Decimal.pow(10+1*x+(0.05*(x/1000))*x*x, x*(x/1000)*(x/1000)*(x/1000))).floor()
                    }
                } else {
                    return new Decimal("1e480").mul(Decimal.pow(10+1*x+0.05*x*x, x)).floor()
                }
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " RNG Points" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Boost Luck gain by x" + notationChooser(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                if (getBuyableAmount(this.layer, this.id) >= 2000) return false
                return player[this.layer].rngpts.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player[this.layer].rngpts = player[this.layer].rngpts.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base = new Decimal(10)
                base = base.mul(player.rng.rngpts.add(1).slog().div(10).add(0.9))
                if (hasMilestone("rng", 21)){
                    eff = base.pow(x).pow(buyableEffect("rng", 15))
                } else {
                    eff = base.pow(Math.min(x, 2000))
                }
                return eff
            },
            tooltip() {
                return "Effect formula: " + base +"^Amt."
            },
            unlocked() {return hasMilestone("rng",14)}
        },
        15: {
            title: "Luck Buyable 5: Supporting",
            cost(x) {
                let expo = new Decimal(50)
                if (hasMilestone("rng", 23)) expo = new Decimal(123)
                if (hasMilestone("rng", 25)) expo = new Decimal(267)
                return new Decimal("e25450").mul(Decimal.pow(4000000+(30000*x)+(200*x*x)+(10*x*x*x)+(x*x*x*x), x.pow(x.div(expo).add(1)))).floor()
            },
            display() {
                return "Cost: " + notationChooser(tmp[this.layer].buyables[this.id].cost) + " RNG Points" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: ^" + notationChooser(buyableEffect(this.layer, this.id)) + " effect to all previous luck buyables"
            },
            canAfford() {
                if (getBuyableAmount(this.layer, this.id) >= 2000) return false
                return player[this.layer].rngpts.gte(this.cost())
            },
            buy() {
                let cost = new Decimal(1)
                player[this.layer].rngpts = player[this.layer].rngpts.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                base = new Decimal(0.01)
                if (hasMilestone("rng", 25)) base = new Decimal(0.012)
                eff = new Decimal(1).add(x.mul(base))
                return eff
            },
            tooltip() {
                return "Effect formula: +^"+base+" to all previous buyables"
            },
            unlocked() {return hasMilestone("rng",22)}
        },
    },
    milestones: {
        1: {
            requirementDescription: "The First RNG Milestone (Requires Best RarityID: 5)",
            effectDescription: "x(Best RarityID)/10 Luck and RNG Points",
            done() { return player.rng.maxidx >= 5 },
        },
        2: {
            requirementDescription: "The Second RNG Milestone (Requires Best RarityID: 8)",
            effectDescription: "Rolling cooldown is decreased from 5 to 2 seconds. Luck Buyable 1's effect is slightly stronger.",
            done() { return player.rng.maxidx >= 8 },
            unlocked() {return hasMilestone("rng",1)}
        },
        3: {
            requirementDescription: "The Third RNG Milestone (Requires Best RarityID: 10)",
            effectDescription: "Unlock a new Luck Buyable. Rarity scaling is decreased (from x3 per rarity to x2.9 per rarity)",
            done() { return player.rng.maxidx >= 10 },
            unlocked() {return hasMilestone("rng",2)}
        },
        4: {
            requirementDescription: "The Fourth RNG Milestone (Requires Best RarityID: 19)",
            effectDescription: "Rolling cooldown is halfed, and RNG Points is doubled.",
            done() { return player.rng.maxidx >= 19 },
            unlocked() {return hasMilestone("rng",3)}
        },
        5: {
            requirementDescription: "The Fifth RNG Milestone (Requires Best RarityID: 32)",
            effectDescription: "Luck Buyable 1 and 2's effect is slightly stronger",
            done() { return player.rng.maxidx >= 32 },
            unlocked() {return hasMilestone("rng",4)}
        },
        6: {
            requirementDescription: "The Sixth RNG Milestone (Requires Best RarityID: 40)",
            effectDescription: "RNG Points boosts itself.",
            done() { return player.rng.maxidx >= 40 },
            unlocked() {return hasMilestone("rng",5)}
        },
        7: {
            requirementDescription: "The Seventh RNG Milestone (Requires Best RarityID: 51)",
            effectDescription: "Unlock a new Luck Buyable. [INFLATION!!!]",
            done() { return player.rng.maxidx >= 51 },
            unlocked() {return hasMilestone("rng",6)}
        },
        8: {
            requirementDescription: "The Eighth RNG Milestone (Requires Best RarityID: 177, what?)",
            effectDescription: "Rarity scaling is decreased (from x2.9 per rarity to x2.8 per rarity). Autobuy Luck Buyable 1 and x0.75 roll cooldown.",
            done() { return player.rng.maxidx >= 177 },
            unlocked() {return hasMilestone("rng",7)}
        },
        9: {
            requirementDescription: "The Ninth RNG Milestone (Requires Best RarityID: 225)",
            effectDescription: "^1.1 Luck.",
            done() { return player.rng.maxidx >= 225 },
            unlocked() {return hasMilestone("rng", 8)}
        },
        10: {
            requirementDescription: "The Tenth RNG Milestone (Requires Best RarityID: 376)",
            effectDescription: "Luck Buyable 1 and 2's effect is boosted.",
            done() { return player.rng.maxidx >= 376 },
            unlocked() {return hasMilestone("rng", 9)}
        },
        11: {
            requirementDescription: "The 11th RNG Milestone (Requires Best RarityID: 475)",
            effectDescription: "The cost formula of ALL LUCK BUYABLES are nerfed.",
            done() { return player.rng.maxidx >= 475 },
            unlocked() {return hasMilestone("rng", 10)}
        },
        12: {
            requirementDescription: "The 12th RNG Milestone (Requires Best RarityID: 666)",
            effectDescription: "The base effect of ALL LUCK BUYABLES is muliplied by the slog() of RNG Points. Autobuy Luck Buyable 2, and 0.25s roll cooldown.",
            done() { return player.rng.maxidx >= 666 },
            unlocked() {return hasMilestone("rng", 11)}
        },
        13: {
            requirementDescription: "The 13th RNG Milestone (Requires Best RarityID: 1054)",
            effectDescription: "RNG Points/rarity scaling is increased. Rarity scaling is also decreased",
            done() { return player.rng.maxidx >= 1054 },
            unlocked() {return hasMilestone("rng", 12)}
        },
        14: {
            requirementDescription: "The 14th RNG Milestone (Requires Best RarityID: 1484)",
            effectDescription: "Unlock a new Luck Buyable. [INFLATION!!!]. ps all buyables' effect is softcapped at 1,000 buys and hardcapped at 2,000 buys.",
            done() { return player.rng.maxidx >= 1484 },
            unlocked() {return hasMilestone("rng",13)}
        },
        15: {
            requirementDescription: "The 15th RNG Milestone (Requires Best RarityID: 3369)",
            effectDescription: "^1.05 Luck and x10B RNG Points. Autobuy Luck Buyable 3.",
            done() { return player.rng.maxidx >= 3369 },
            unlocked() {return hasMilestone("rng",14)}
        },
        16: {
            requirementDescription: "The 16th RNG Milestone (Requires Best RarityID: 5070)",
            effectDescription: "Luck is boosted by RNG Points.",
            done() { return player.rng.maxidx >= 5070 },
            unlocked() {return hasMilestone("rng",15)}
        },
        17: {
            requirementDescription: "The 17th RNG Milestone (Requires Best RarityID: 6974)",
            effectDescription: "Rarity scaling is decreased dramatically (from x2.75 per rarity to x2.5 per rarity)",
            done() { return player.rng.maxidx >= 6974 },
            unlocked() {return hasMilestone("rng",16)}
        },
        18: {
            requirementDescription: "The 18th RNG Milestone (Requires Best RarityID: 10,610)",
            effectDescription: "RNG Points is boosted by luck. Autobuy Luck Buyable 4.",
            done() { return player.rng.maxidx >= 10610 },
            unlocked() {return hasMilestone("rng",17)}
        },
        19: {
            requirementDescription: "The 19th RNG Milestone (Requires Best RarityID: 14,975)",
            effectDescription: "Luck is boosted by RNG. Also ^1.1 Luck.",
            done() { return player.rng.maxidx >= 14975 },
            unlocked() {return hasMilestone("rng",18)}
        },
        20: {
            requirementDescription: "The 20th RNG Milestone (Requires Best RarityID: 22,961)",
            effectDescription: "The 13th RNG Milestone but to an insane level. Roll cooldown is 0.01s.",
            done() { return player.rng.maxidx >= 22961 },
            unlocked() {return hasMilestone("rng",19)}
        },
        21: {
            requirementDescription: "The 21st RNG Milestone (Requires Best RarityID: 45,676)",
            effectDescription: "The cap of Luck Buyables 1-3 is no longer 2,000! ^1.2 Luck.",
            done() { return (player.rng.maxidx >= 45676 && hasAchievement("a", 241)) },
            unlocked() {return (hasMilestone("rng",20) && hasAchievement("a", 241))}
        },
        22: {
            requirementDescription: "The 22nd RNG Milestone (Requires Best RarityID: 60,211)",
            effectDescription: "Unlock Luck Buyable 5",
            done() { return (player.rng.maxidx >= 60211 && hasAchievement("a", 251)) },
            unlocked() {return (hasMilestone("rng",21) && hasAchievement("a", 251))}
        },
        23: {
            requirementDescription: "The 23rd RNG Milestone (Requires Best RarityID: 93,000)",
            effectDescription: "Luck Buyable 5 scales slower",
            done() { return (player.rng.maxidx >= 93000 && hasAchievement("a", 261)) },
            unlocked() {return (hasMilestone("rng",22) && hasAchievement("a", 261))}
        },
        24: {
            requirementDescription: "The 24th RNG Milestone (Requires Best RarityID: 128,650)",
            effectDescription: "Luck Buyable 1 is WAY STRONGER!",
            done() { return (player.rng.maxidx >= 128650 && hasAchievement("a", 271)) },
            unlocked() {return (hasMilestone("rng",23) && hasAchievement("a", 271))}
        },
        25: {
            requirementDescription: "The FINAL RNG Milestone (Requires Best RarityID: 238,360)",
            effectDescription: "Luck Buyable 5 scales slower and is stronger. (ENDGAMES: 411,333 [NORMAL], 411,422 [ABSOLUTE TRUE]",
            done() { return (player.rng.maxidx >= 238360 && hasAchievement("a", 281)) },
            unlocked() {return (hasMilestone("rng",24) && hasAchievement("a", 281))}
        },
    },
    infoboxes: {
        main: {
            title: "Welcome to The RNG Minigame!",
            body() { return "This is the second side layer, unlocked from getting Era 3. It is not needed to progress. The RNG-Minigame Layer in The Point Tree has a main clickable to roll for different rarities [3x (can decrease) the rng needed to get to next rarity], which gives 2^RarityID RNG Points, which can be spent on different milestones and buyables to increase luck (multiplying RNG), decreasing roll cooldown, increasing RNG Point Mult, adding new Luck Buyables, and more. There are 150 unique rarity names, and 25 pre-names. Afterwards it would loop back and add '1' to the end," },
        },
    },
    update(diff) {
        player.rng.cd = player.rng.cd.sub(diff)
        player.rng.luck = buyableEffect("rng", 11)
        player.rng.rngptmult = new Decimal(1)
        player.rng.rollnextcd = new Decimal(5)
        player.rng.rarityscale = 3
        if (hasMilestone("rng", 7)) {
            player.rng.luck = player.rng.luck.mul(buyableEffect("rng", 13))
        }
        if (hasMilestone("rng", 14)) {
            player.rng.luck = player.rng.luck.mul(buyableEffect("rng", 14))
        }
        if (hasMilestone("rng", 3)) {
            player.rng.rarityscale = 2.9
            player.rng.luck = player.rng.luck.mul(buyableEffect("rng", 12))
        }
        if (hasMilestone("rng", 2)) player.rng.rollnextcd = new Decimal(2)
        if (hasMilestone("rng", 6)) {
            player.rng.rngptmult = player.rng.rngptmult.mul(player.rng.rngpts.log(10))
        }
        if (hasMilestone("rng", 4)) {
            player.rng.rollnextcd = new Decimal(1)
            player.rng.rngptmult = player.rng.rngptmult.mul(2)
        }
        if (hasMilestone("rng", 1)) {
            player.rng.luck = player.rng.luck.mul(new Decimal(1).add(player.rng.maxidx / 10))
            player.rng.rngptmult = player.rng.rngptmult.mul(new Decimal(1).add(player.rng.maxidx / 10))
        }
        if (player.rng.cd.lte(0)) {
            player.rng.cd = new Decimal(0)
        }

        if (hasMilestone("rng", 8)) {
            player.rng.rarityscale = 2.8
            player.rng.rollnextcd = new Decimal(0.75)
        }
        if (hasMilestone("rng", 12)) {
            player.rng.rollnextcd = new Decimal(0.25)
        }
        if (hasMilestone("rng", 13)) {
            player.rng.rngscale = 2.1
            player.rng.rarityscale = 2.75
        }
        if (hasMilestone("rng", 17)) {
            player.rng.rarityscale = 2.5
        }
        if (hasMilestone("rng", 16)) {
            player.rng.luck = player.rng.luck.mul(player.rng.rngpts.pow(0.1))
        }
        if (hasMilestone("rng", 9)) {
            player.rng.luck = player.rng.luck.pow(1.1)
        }
        if (hasMilestone("rng", 19)) {
            player.rng.luck = player.rng.luck.pow(1.1)
        }
        if (hasMilestone("rng", 15)) {
            player.rng.luck = player.rng.luck.pow(1.05)
            player.rng.rngptmult = player.rng.rngptmult.mul(1e10)
        }
        if (hasMilestone("rng", 20)) {
            player.rng.rngscale = 2.5
            player.rng.rarityscale = 2
            player.rng.rollnextcd = new Decimal(0.01)
        }
        if (hasMilestone("rng", 21)) {
            player.rng.luck = player.rng.luck.pow(1.2)
        }
        if (hasChallenge("m", 13)) {
            player.rng.rngptmult = player.rng.rngptmult.mul(2)
        }
    }
})