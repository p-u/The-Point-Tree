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
            effectDescription: "Reminder 3 to drink water, rest your eyes, eat and sleep, take a walk. Fun fact 3: Assuming you read at an average pace of 0.5 pages/minute, you would have read about 5,040 pages by now if you did not sleep... That's probably more than you've ever read. ",
            done() { return player.timePlayed > (60 * 60 * 24 * 7) },
            unlocked() { return hasMilestone("a", 6) }
        },
        8: {
            requirementDescription: "1 month of playtime",
            effectDescription: "You could watch the ENTIRE Avengers Cinematic Universe 11.625 times...",
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
            effectDescription: "You either are a cheater OR a absolute true godly no-life... Fun fact 4: If you have just left your computer on for 200 days, it will use 1200 kWh for a desktop and 360 kWh for a laptop (averages). Assuming you are in Los Angeles, you can drive a Tesla Model 3 to Beaumont, Texas for a laptop and to Montreal, Canada there, back and there again for a desktop...",
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
                'background-color': tmp.ma.color,
            }},
        },
        12: {
            title: "Molecules",
            display: "1st Reset",
            canClick: true,
            onClick() {
                if(!confirm("Your current progress will not be saved!")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTc1MjY1MTMyNTkwMiwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJSRDgyOldHIiwidmVyc2lvbiI6ImF2Mi4wIiwidGltZVBsYXllZCI6MjAzMDEuMDE4OTczMTE1Mjc1LCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOnRydWUsInBvaW50cyI6IjEwIiwic3VidGFicyI6eyJjaGFuZ2Vsb2ctdGFiIjp7fSwiZW4iOnsibWFpblRhYnMiOiJNYWluIHRhYiJ9LCJhIjp7Im1haW5UYWJzIjoiQWNoaWV2ZW1lbnRzIn0sInciOnsibWFpblRhYnMiOiJXb3JsZCBUaWVycyJ9LCJtYSI6eyJtYWluVGFicyI6Ik1haW4gdGFiIn0sImNtIjp7Im1haW5UYWJzIjoiQ2xpY2sgTWFzdGVyeSJ9LCJjZiI6eyJtYWluVGFicyI6IkNvbnRlbnQgRmVhdHVyZXMifSwibW8iOnsibWFpblRhYnMiOiJNYWluIHRhYiJ9fSwibGFzdFNhZmVUYWIiOiJtbyIsImluZm9ib3hlcyI6eyJlbiI6eyJtYWluIjp0cnVlLCJnZW5zIjpmYWxzZX0sIm1hIjp7Im1hdCI6ZmFsc2V9LCJjbSI6eyJjbSI6ZmFsc2V9LCJtbyI6eyJtYXQiOmZhbHNlLCJtb2wiOmZhbHNlfX0sImluZm8tdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjAzMDAuOTQzOTczMTE1Mjc0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm9wdGlvbnMtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjAzMDAuOTQzOTczMTE1Mjc0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImNoYW5nZWxvZy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoyMDMwMC45NDM5NzMxMTUyNzQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiZW4iOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEuNDc4NDAxOTk5OTk5OTk2NyIsImVuZXJwZXJzIjoiMCIsImdlbjFhbXQiOiIwIiwiZ2VuMmFtdCI6IjAiLCJnZW4zYW10IjoiMCIsImdlbjRhbXQiOiIwIiwiZ2VuNWFtdCI6IjAiLCJnZW42YW10IjoiMCIsInRvdGFsIjoiMS40Nzg0MDE5OTk5OTk5OTY3IiwiYmVzdCI6IjEuNDc4NDAxOTk5OTk5OTk2NyIsInJlc2V0VGltZSI6Mi41NTA2Mzk5OTk5OTk5OTc0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjAiLCIxMiI6IjAiLCIyMSI6IjAiLCIyMiI6IjAiLCIzMSI6IjAiLCIzMiI6IjAiLCI0MSI6IjAifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJwb3dlciI6IjAiLCJwb3dnYWluIjoiMCIsInVuaXZtdWx0aSI6IjEiLCJnZW4xbXVsdGkiOiIxIiwiZ2VuMm11bHRpIjoiMSIsImdlbjNtdWx0aSI6IjEiLCJnZW40bXVsdGkiOiIxIiwiZ2VuNW11bHRpIjoiMSIsImdlbjZtdWx0aSI6IjEiLCJnZW4xZ2FpbiI6IjAiLCJnZW4yZ2FpbiI6IjAiLCJnZW4zZ2FpbiI6IjAiLCJnZW40Z2FpbiI6IjAiLCJnZW41Z2FpbiI6IjAiLCJnZW42Z2FpbiI6IjAiLCJwb3dlcmV4cG9lbmVyIjoiMC4yNSIsInBvd2VyZXhwb2F0b20iOiIwLjEyIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsLCJnZW43YW10IjoiMCIsImdlbjhhbXQiOiIwIiwiZ2VuN2dhaW4iOiIwIiwiZ2VuOGdhaW4iOiIwIiwiZ2VuN211bHRpIjoiMSIsImdlbjhtdWx0aSI6IjEifSwidyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMyIsInRvdGFsIjoiMiIsImJlc3QiOiIzIiwicmVzZXRUaW1lIjo1NTM3LjQ4NzIzNjAwMjYwMSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6WyIxIiwiMiJdLCJsYXN0TWlsZXN0b25lIjoiMiIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJhIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjAzMDAuOTQzOTczMTE1Mjc0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6WyIxIiwiMiIsIjMiXSwibGFzdE1pbGVzdG9uZSI6IjMiLCJhY2hpZXZlbWVudHMiOlsiMTIiLCIxMyIsIjExIiwiMTQiLCIxNSIsIjE2IiwiMjEiLCIyMyIsIjI0IiwiMjIiLCIyNSIsIjI2IiwiMzEiLCIzMiIsIjMzIiwiMzQiLCIzNSIsIjM2IiwiNDEiLCIxMDEiLCIxMDIiLCIxMDMiLCIxMDQiLCIxMDUiLCI0MiJdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwibWEiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJNUmVzZXRUaW1lIjoyMDI2Ni41MjcwODMxMTcwNDYsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoyLjU1MDYzOTk5OTk5OTk5NzQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjoiMiIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJjZiI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoyNjI1LjExNzg3OTk5OTcyOTcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOlsiMSJdLCJsYXN0TWlsZXN0b25lIjoiMSIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsIm5vdGhpbmciOiIwIn0sImNtIjp7InVubG9ja2VkIjp0cnVlLCJjbGlja21hc3RlcnkiOiIyODA0ODIiLCJjcGMiOiI0MS4yNjMzNjkyNTc0MzM5OSIsImNtbHZsIjoiOCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo4MTMyLjc4NjAzMDAwNDUyMywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJjbG11bHQiOiIxLjEiLCJjbHNjYWxlIjoiMi45MDAwMDAwMDAwMDAwMDA0In0sIm1vIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxIiwibW9sZWN1bGUiOiIwLjIwODMxNTk5OTk5OTk5OTk3IiwiTVJlc2V0VGltZSI6IjE5NTM1LjI2MzY2MzExODcyNyIsInRvdGFsIjoiMSIsImJlc3QiOiIxIiwicmVzZXRUaW1lIjo3NjUuNzU1MzA5OTk5OTg1NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6WyIxIl0sImxhc3RNaWxlc3RvbmUiOiIxIiwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImJsYW5rIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjAzMDAuOTQzOTczMTE1Mjc0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInRyZWUtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjAzMDAuOTQzOTczMTE1Mjc0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImRldlNwZWVkIjoxfQ==")
            },
            style() {return{
                'background-color': tmp.mo.color,
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
        34: {
            name: "Clicker",
            done() { return hasMilestone("ma", 7) },
            tooltip: "Unlock Click Mastery",
            unlocked() { return hasAchievement("a", 31) },
        },
        35: {
            name: "Atomic Insanity",
            done() { return player.points.gte(1e50) },
            tooltip: "Get 10^50 Atoms (+5% Atom gain)",
            unlocked() { return hasAchievement("a", 31) },
        },
        36: {
            name: "Tiered, again",
            done() { return player.w.points.gte(3) },
            tooltip: "Get World Tier 3. Reward: +3% Gen 3 generation",
            unlocked() { return hasAchievement("a", 31) },
            style() {
                return {
                "border-color": "blue",
                "border-width": "3px"
                }
            }
        },
        41: {
            name: "Crazily Energetic",
            done() { return player.en.points.gte(1e80) },
            tooltip: "Get 10^80 Energy (+8% Energy gain)",
            unlocked() { return hasAchievement("a", 36) },
        },
        42: {
            name: "Isn't it supposed to be hard to get?",
            done() { return getBuyableAmount("en", 41).gte(10) },
            tooltip: "Get 10 Generator 7s",
            unlocked() { return hasAchievement("a", 36) },
        },
        43: {
            name: "Tier-2 Reset",
            done() { return player.mo.points.gte(1) },
            tooltip: "Do a Molecule Reset (x1.20 Power gain)",
            unlocked() { return hasAchievement("a", 36) },
            style() {
                return {
                "border-color": "red",
                "border-width": "3px"
                }
            }
        },
        44: {
            name: "100 moles",
            done() { return player.mo.molecule.gte(100) },
            tooltip: "Get 100 Molecules (+10% Atoms gain)",
            unlocked() { return hasAchievement("a", 43) },
        },
        45: {
            name: "200 Molecule Bonds",
            done() { return player.mo.points.gte(200) },
            tooltip: "Get 200 Molecule Bonds (+10% Atoms gain)",
            unlocked() { return hasAchievement("a", 43) },
        },
        46: {
            name: "Get a Booster",
            done() { return getBuyableAmount("mo", 11).gte(1) },
            tooltip: "Get 1 Booster 1 (+10% Power gain)",
            unlocked() { return hasAchievement("a", 43) },
            style() {
                return {
                "border-color": "blue",
                "border-width": "3px"
                }
            }
        },
        51: {
            name: "Get 1 T2-Booster",
            done() { return getBuyableAmount("mo", 12).gte(1) },
            tooltip: "Get 1 Booster 2 (+2% Power gain)",
            unlocked() { return hasAchievement("a", 46) },
        },
        52: {
            name: "Get 2 T2-Boosters",
            done() { return getBuyableAmount("mo", 12).gte(2) },
            tooltip: "Get 2 Booster 2 (+4% Power gain)",
            unlocked() { return hasAchievement("a", 46) },
        },
        53: {
            name: "Get 1 T3-Booster",
            done() { return getBuyableAmount("mo", 21).gte(1) },
            tooltip: "Get 1 Booster 3 (+3% Power gain)",
            unlocked() { return hasAchievement("a", 46) },
        },
        54: {
            name: "Get 2 T3-Boosters",
            done() { return getBuyableAmount("mo", 21).gte(2) },
            tooltip: "Get 2 Booster 3 (+6% Power gain)",
            unlocked() { return hasAchievement("a", 46) },
        },
        55: {
            name: "Get 1 T4-Booster",
            done() { return getBuyableAmount("mo", 22).gte(1) },
            tooltip: "Get 1 Booster 4 (+4% Power gain)",
            unlocked() { return hasAchievement("a", 46) },
        },
        56: {
            name: "Get 2 T4-Boosters",
            done() { return getBuyableAmount("mo", 22).gte(2) },
            tooltip: "Get 2 Booster 4 (+8% Power gain)",
            unlocked() { return hasAchievement("a", 46) },
            style() {
                return {
                "border-color": "blue",
                "border-width": "3px"
                }
            }
        },
        61: {
            name: "Of course it doesn't stop at 15",
            done() { return hasMilestone("cf", 3) },
            tooltip: "Get the third Content Feature Milestone (+3% Molecules gain)",
            unlocked() { return hasAchievement("a", 56) },
        },
        62: {
            name: "Additional",
            done() { return hasMilestone("mo", 8) },
            tooltip: "Get the eighth Molecule Milestone (+8% Molecules gain)",
            unlocked() { return hasAchievement("a", 56) },
        },
        63: {
            name: "Tiered up 3",
            done() { return hasMilestone("w", 3) },
            tooltip: "WORLD TIER 4! (+14% Gen 4 generation)",
            unlocked() { return hasAchievement("a", 56) },
        },
        101: {
            name: "Click Mastery Milestone 1 (Optional) - Even a baby can click that much",
            done() { return player.cm.clickmastery.gte(250) },
            tooltip: "Get 250 clicks (+2.5% clicks)",
            unlocked() { return (hasMilestone("ma", 7) || hasAchievement("a", 101)) },
        },
        102: {
            name: "Click Mastery Milestone 2 (Optional) - Amateur Clicker",
            done() { return player.cm.clickmastery.gte(50000) },
            tooltip: "Get 50,000 clicks (+5% clicks)",
            unlocked() { return hasAchievement("a", 101) },
        },
        103: {
            name: "Click Mastery Milestone 3 (Optional) - Great Clicker",
            done() { return player.cm.clickmastery.gte(1e6) },
            tooltip: "Get 1,000,000 clicks (Click Level scaling is reduced)",
            unlocked() { return hasAchievement("a", 102) },
        },
        104: {
            name: "Click Mastery Milestone 4 (Optional) - Hypertapper",
            done() { return player.cm.clickmastery.gte(15e6) },
            tooltip: "Get 15,000,000 clicks (Click Level scaling is reduced, again)",
            unlocked() { return hasAchievement("a", 103) },
        },
        105: {
            name: "Click Mastery Milestone 5 (Optional) - Maniac Tapper",
            done() { return player.cm.clickmastery.gte(500e6) },
            tooltip: "Get 500,000,000 clicks (+5% clicks)",
            unlocked() { return hasAchievement("a", 104) },
        },
        106: {
            name: "Click Mastery Milestone 6 (Optional) - Professional Clicker",
            done() { return player.cm.clickmastery.gte(10e9) },
            tooltip: "Get 10,000,000,000 clicks (Click level mult to clicks and atoms is increased)",
            unlocked() { return hasAchievement("a", 105) },
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