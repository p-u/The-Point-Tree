addLayer("a", {
    startData() { return {
        unlocked: true,
    }},
    color: "yellow",
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    tabFormat: {
        "Achievements": {
            content: [
                ["display-text", function() { return "Achievements: "+player.a.achievements.length+"/"+(Object.keys(tmp.a.achievements).length-4) }],
                ["achievements", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]],
                "blank",
                ],
        },
        "Playtime Milestones": {
            content: [
                ["display-text", function() { return "There are a total of 11 playtime milestones only attained by the most dedicated of players... I wish you all the best if you are willing to try to complete all of them." }],
                "blank",
                "blank",
                "milestones"
            ],
        },
        "Savebank": {
            content: [
                ["clickables", [1, 2, 3, 4, 5, 6, 7, 8]],
            ],
        },
    },
    milestones: {
        1: {
            requirementDescription: "1 minute of playtime",
            effectDescription: "Thanks for playing my game! I hope you enjoy it",
            done() { return player.timePlayed > 60 }
        },
        2: {
            requirementDescription: "30 minutes of playtime",
            effectDescription: "So, how do you find the game so far? Oh, btw, don't lose track of real-life time",
            done() { return player.timePlayed > 1800 },
            unlocked() { return hasMilestone("a", 1) }
        },
        3: {
            requirementDescription: "3 hours of playtime",
            effectDescription: "Remember to drink water :) and rest your eyes",
            done() { return player.timePlayed > (60 * 60 * 3) },
            unlocked() { return hasMilestone("a", 2) }
        },
        4: {
            requirementDescription: "10 hours of playtime",
            effectDescription: "If you are still at the beginning stage, here's a x2 atom gain for you",
            done() { return player.timePlayed > (60 * 60 * 10) },
            unlocked() { return hasMilestone("a", 3) }
        },
        5: {
            requirementDescription: "1 day of playtime",
            effectDescription: "Remember to join my discord server! Reminder 2 to drink water :) and rest your eyes. (Fun fact, you could have watched Jurrasic Park 11.3 times...)",
            done() { return player.timePlayed > (60 * 60 * 24) },
            unlocked() { return hasMilestone("a", 4) }
        },
        6: {
            requirementDescription: "3 days of playtime",
            effectDescription: "Addicted. Assuming you take 5 seconds to drink 50ml of water, you would have drank 259.2 litres (68.47 gallons) of water if you continuously drank it",
            done() { return player.timePlayed > (60 * 60 * 24 * 3) },
            unlocked() { return hasMilestone("a", 5) }
        },
        7: {
            requirementDescription: "1 week of playtime",
            effectDescription: "Reminder 3 to drink water, rest your eyes, eat and sleep, take a walk. Fun fact 3: Assuming you read at an average pace of 0.5 pages/minute, you would have read about 5,040 pages by now if you did not sleep... That's probably more than you've ever read. Anyway, here's a x10,000 atom boost if you are still there... Plus an additional x100 Energy boost",
            done() { return player.timePlayed > (60 * 60 * 24 * 7) },
            unlocked() { return hasMilestone("a", 6) }
        },
        8: {
            requirementDescription: "1 month of playtime",
            effectDescription: "You could watch the ENTIRE Avengers Cinematic Universe 11.625 times... well... and also xe25 atoms",
            done() { return player.timePlayed > (60 * 60 * 24 * 30) },
            unlocked() { return hasMilestone("a", 7) }
        },
        9: {
            requirementDescription: "100 days of playtime",
            effectDescription: "Screenshot proof of this achievement and send it in my discord for an exclusive role!",
            done() { return player.timePlayed > (60 * 60 * 24 * 100) },
            unlocked() { return hasMilestone("a", 8) }
        },
        10: {
            requirementDescription: "200 days of playtime",
            effectDescription: "You either are a cheater OR a absolute true godly no-life... Fun fact 4: If you have just left your computer on for 200 days, it will use 1200 kWh for a desktop and 360 kWh for a laptop (averages). Assuming you are in Los Angeles, you can drive a Tesla Model 3 to Beaumont, Texas for a laptop and to Montreal, Canada there, back and there again for a desktop... Oh also xe100 atoms...",
            done() { return player.timePlayed > (60 * 60 * 24 * 200) },
            unlocked() { return hasMilestone("a", 9) }
        },
        11: {
            requirementDescription: "1 year of playtime",
            effectDescription: "I don't think anyone is daring enough to sit there and wait for a FULL YEAR for a single achievement... Well played. You 100%ed the game.",
            done() { return player.timePlayed > (60 * 60 * 24 * 365) },
            unlocked() { return hasMilestone("a", 10) }
        },
    },
    clickables: {
        11: {
            title: "Matter",
            display: "1st Reset",
            canClick: true,
            onClick() {
                if(!confirm("Your current progress will not be saved!")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTczNDMyMjY4Mzg4OCwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJSRDgyOldHIiwidmVyc2lvbiI6ImF2MC4wOCIsInRpbWVQbGF5ZWQiOjM5ODUuODUxODg5NTQ1OTg5Nywia2VlcEdvaW5nIjpmYWxzZSwiaGFzTmFOIjpmYWxzZSwicG9pbnRzIjoiMTAiLCJzdWJ0YWJzIjp7ImNoYW5nZWxvZy10YWIiOnt9LCJlbiI6eyJtYWluVGFicyI6Ik1haW4gdGFiIn0sImEiOnsibWFpblRhYnMiOiJBY2hpZXZlbWVudHMifSwidyI6eyJtYWluVGFicyI6IldvcmxkIFRpZXJzIn19LCJsYXN0U2FmZVRhYiI6Im1hIiwiaW5mb2JveGVzIjp7ImVuIjp7Im1haW4iOmZhbHNlLCJnZW5zIjpmYWxzZX19LCJpbmZvLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjM5ODUuODUxODg5NTQ1OTg5NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJvcHRpb25zLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjM5ODUuODUxODg5NTQ1OTg5NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJjaGFuZ2Vsb2ctdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6Mzk4NS44NTE4ODk1NDU5ODk3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImVuIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwiZW5lcnBlcnMiOiIwIiwiZ2VuMWFtdCI6IjAiLCJnZW4yYW10IjoiMCIsImdlbjNhbXQiOiIwIiwiZ2VuNGFtdCI6IjAiLCJnZW41YW10IjoiMCIsImdlbjZhbXQiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjI2Mi44MjEyNzE5OTk5OTg5NCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIwIiwiMTIiOiIwIiwiMjEiOiIwIiwiMjIiOiIwIn0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwicG93ZXIiOiIwIiwicG93Z2FpbiI6IjAiLCJ1bml2bXVsdGkiOiIxIiwiZ2VuMW11bHRpIjoiMSIsImdlbjJtdWx0aSI6IjEiLCJnZW4zbXVsdGkiOiIxIiwiZ2VuNG11bHRpIjoiMSIsImdlbjVtdWx0aSI6IjEiLCJnZW42bXVsdGkiOiIxIiwiZ2VuMWdhaW4iOiIwIiwiZ2VuMmdhaW4iOiIwIiwiZ2VuM2dhaW4iOiIwIiwiZ2VuNGdhaW4iOiIwIiwiZ2VuNWdhaW4iOiIwIiwiZ2VuNmdhaW4iOiIwIiwicG93ZXJleHBvZW5lciI6IjAuMjUiLCJwb3dlcmV4cG9hdG9tIjoiMC4xMiJ9LCJhIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6Mzk4NS44NTE4ODk1NDU5ODk3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIl0sImxhc3RNaWxlc3RvbmUiOiIyIiwiYWNoaWV2ZW1lbnRzIjpbIjEyIiwiMTMiLCIxMSIsIjE0IiwiMTUiLCIxNiIsIjIxIiwiMjMiXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImJsYW5rIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6Mzk4NS44NTE4ODk1NDU5ODk3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInRyZWUtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6Mzk4NS44NTE4ODk1NDU5ODk3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInciOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMSIsInJlc2V0VGltZSI6Mzk4NS44NTE4ODk1NDU5ODk3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm1hIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxIiwiTVJlc2V0VGltZSI6MzcyMy4wMzA2MTc1NDYwMzIsInRvdGFsIjoiMSIsImJlc3QiOiIxIiwicmVzZXRUaW1lIjoyNjIuODIxMjcxOTk5OTk4OTQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiZGV2U3BlZWQiOjF9")
            },
            style() {return{
                'background-color': tmp.en.color,
            }},
        },
    },
    achievements: {
        rows: 40,
        cols: 6,
        11: {
            name: "The Start",
            done() { return hasUpgrade("en", 11) },
            tooltip: "Start generating atoms",
        },
        12: {
            name: "Century of atoms",
            done() { return player.points.gte(100) },
            tooltip: "One hundred and growing! (+5% atom gain)",
        },
        13: {
            name: "Symbiotic relationship",
            done() { return hasUpgrade("en", 22) },
            tooltip: "Energy and Atoms boost the other (+4% Energy gain)",
        },
        14: {
            name: "Generation",
            done() { return hasUpgrade("en", 25) },
            tooltip: "Unlock Generators! (+7% Energy gain)",
            style() {
                return {
                "border-color": "blue",
                "border-width": "3px"
                }
            }
        },
        15: {
            name: "Powering Up I",
            done() { return player.en.power.gte(1000) },
            tooltip: "Get 1,000 Power (+2% Power gain)",
            unlocked() { return hasAchievement("a", 14) },
        },
        16: {
            name: "Atomic Avalanche",
            done() { return player.points.gte(100000) },
            tooltip: "Get 100,000 Atoms (+5% Atom gain)",
            unlocked() { return hasAchievement("a", 14) },
        },
        21: {
            name: "Powering Up II",
            done() { return player.en.power.gte(50e6) },
            tooltip: "Get 50M Power (+3% Power gain)",
            unlocked() { return hasAchievement("a", 14) },
        },
        22: {
            name: "Generation++",
            done() { return hasUpgrade("en", 44) },
            tooltip: "Get the 19th upgrade (+1.9% Energy gain)",
            unlocked() { return hasAchievement("a", 14) },
        },
        23: {
            name: "Reset",
            done() { return player.ma.points.gte(1) },
            tooltip: "Do a Matter Reset (+8% Atoms gain)",
            unlocked() { return hasAchievement("a", 14) },
            style() {
                return {
                "border-color": "red",
                "border-width": "3px"
                }
            }
        },
        24: {
            name: "Passive Income",
            done() { return hasMilestone("ma", 1) },
            tooltip: "Generate energy per second (+5% Energy gain)",
            unlocked() { return hasAchievement("a", 23) },
        },
        25: {
            name: "Row 5",
            done() { return hasUpgrade("en", 51) },
            tooltip: "Start on Row 5 Energy Upgrades (+5% Energy gain)",
            unlocked() { return hasAchievement("a", 23) },
        },
        26: {
            name: "Giga Machine",
            done() { return player.en.gen1amt.gte(1e9) },
            tooltip: "Get 1,000,000,000 of the first generator. Reward: +1% Gen 1 generation",
            unlocked() { return hasAchievement("a", 23) },
        },
        31: {
            name: "Tiered",
            done() { return player.w.points.gte(2) },
            tooltip: "Get World Tier 2. Reward: +2% Atom gain",
            unlocked() { return hasAchievement("a", 23) },
            style() {
                return {
                "border-color": "blue",
                "border-width": "3px"
                }
            }
        },
        32: {
            name: "Energy Burst",
            done() { return player.en.points.gte(1e25) },
            tooltip: "Get 10^25 Energy. Reward: +2.5% Atom gain",
            unlocked() { return hasAchievement("a", 31) },
        },
        33: {
            name: "Mini matterpocalypse",
            done() { return player.ma.points.gte(200000) },
            tooltip: "Get 200K Matter. Reward: +5% Matter gain",
            unlocked() { return hasAchievement("a", 31) },
        },
    tabFormat: [
        "blank", 
        ["display-text", function() { return "Achievements: "+player.a.achievements.length+"/"+(Object.keys(tmp.a.achievements).length-2) }], 
        "blank", "blank",
        "achievements",
    ],
    update(diff) {    // Added this section to call adjustNotificationTime every tick, to reduce notification timers
        adjustNotificationTime(diff);
    },
}, 
})