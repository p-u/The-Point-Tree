let modInfo = {
	name: "The Point Tree",
	id: "ThepointTreeRD82",
	author: "randim82",
	pointsName: "Point Fragments",
	modFiles: ["basic.js", "rebirth.js", "prestige.js", "mega.js", "sacrifice.js", "energy.js", "achievements.js", "infobox.js", "supreme.js", "water.js", "secretAchievement.js", "mastery.js", "tree.js", "era.js"],

	discordName: "SR46A",
	discordLink: "",
	initialStartPoints: new Decimal(0), // Used for hard resets and new players
	offlineLimit: 2,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "3.3",
	name: "EC is useful!",
}

let changelog = `<h1>Changelog:</h1><br>
<h3>v3.3: EC is useful now! </h3><br>
Extended rarities to the Achievements <br>
Added Minigame Part 3: Below the Negatives, and added negative titles <br>
Added a new feature: Buyable base change <br>
Endgames now require Point Fragments, due to an upgrade which makes EC boost MP. <br>
Added 1 buyable <br>
Added 29 upgrades <br>
Added 4 milestones (two currently cannot be gotten) <br>
Added 3 achievements, 1 giving boosts <br>
Endgames: e9.1553e20, e9.15555555e20, e9.156e20, e9.156565656e20 PF respectively <br>

<h3>v3.2.MBF+ (QoL changes) </h3><br>
Added whether you are reccomended to enter the Mastery Challenge, and whether you hit the max completion of that challenge. <br>
Added amount of Mastery Challenge Completions you have <br>
Added 'better' hints for minigame <br>

<h3>v3.2.MBF </h3><br>
Major bug fix! Post-Era 3 to Pre-Ach 246 Era Crystals decreased dramatically by 1e10x. <br>
Highly recommend anyone who started from Pre-Era 3 and progressed on to revert to Era Savebank 3, due to major balancing issues. <br>

<h3>v3.2.RB </h3><br>
Fixed Era Upgrades 29 and 30 price (+1 OOM) <br>
Rebalanced Era 2+ upgrades to be faster to get, on average 5-10%. <br>
Rebalanced Mastery Row 10 upgrades to be 10% faster to get. <br>
Light theme colours got a change to have better UI <br>
Added Sky Theme <br>

<h3>v3.2.2 </h3><br>
Fixed endgame req <br>
Added heading to v2.0.0 changelog <br>

<h3>v3.2.1 </h3><br>
Fixed MC1x2 Req <br>

<h3>v3.2: Multi-Challenges? Mastery Extension </h3><br>
Fixed hardcap for Sac Strength effect 1 and 2 (No effect currently) <br>
Rebalanced Sac Strength effect 3 (future) <br>
Rebalanced Infobox Layer to show stages <br>
Recommended Completion of challenges moved to infobox layer instead of on the challenge <br>
Removed 'Please do not complain' notes in era layer <br>
Added amount of achievements that you have out of total number <br>
Added Mastery Point gain per second <br>
Added pre-1e15 point Point Representation <br>
Added one more Point Representation (for future update) <br>
Added more softcaps, and pushed back some <br>
Added a continuation of a challenge (2nd completion) <br>
You can get SA32 now if you have not gotten it! <br>
Endgames now require Era Crystals. <br>
Added 1 savebank for Pre-MC1x2 <br>
Added 1 buyable <br>
Added 42 upgrades [30 is Mastery!] <br>
Added 2 milestones (with one more gotten from previous update) <br>
Added 6 achievements, with 4 giving boosts/continuation <br>
Endgames: 5e163, 6.4e164, 1.6e166, 1.6e167 Era Crystals respectively <br>

<h3>v3.1.4 </h3><br>
Updated Break Eternity to latest version! <br>
Fixed Minigame achievements completing when not shown<br>

<h3>v3.1.3. I'm sorry, but change dp format is now removed, due to unable to change button. DP remains at 8 for standard. </h3><br>
You can still change your dp though, by going to the console and typing 'options.dp = 10', for example.<br>
Changed SA13 and SA14 to options, instead of player.<br>
Changed SA15 and SA16 achievements<br>
Fixed pi being on everything (minigame)<br>
Extended Infinity Notation<br>
Changed infobox placements.<br>
Added identifying layer things in infobox title.<br>
Added 5 infoboxes.<br>

<h3>v3.1.2 </h3><br>
Added an infinity notation. This took a long time.<br>
Fixed some number formatting issues.<br>

<h3>v3.1.1 </h3><br>
Changed MA52 and MA53 description, added 10 new minigame titles! <br>

<h3>v3.1: Sac Strength and Extended Upgrades </h3><br>
Added a hardcap for Mega Buyable 4 (+^1) <br>
Added Era 2: Extension part <br>
Added Minigame Part 2 <br>
Added Combos and Extended Upgrades <br>
Changed some achievement names <br>
Changed morse code to reflect correctly <br>
Energy Milestone 12 now shows boosts <br>
Increased Era Exponent <br>
Added Sacrifice Strength and 3 milestones [1 not done] <br>
New Feature: Total Upgrade count boosting something <br>
Added 1 savebank <br>
Added 39 upgrades <br>
Added 9 milestones <br>
Added 6 achievements, with 3 giving boosts/continuation <br>

<h3>v3.0.Y </h3><br>
Added hold mechanic to minigame clickables<br>
Added Verdant Theme <br>
Fixed SA15 and SA16 giving boosts <br>

<h3>v3.0.X </h3><br>
Rebalanced all content from Basic to Prestige layer. Added more QoLs + more accessible in Pres layer<br>
Fixed ^2 clickable unlock<br>

<h3>v3.0.3 </h3><br>
Fixed precision issues that caused unplayable game<br>

<h3>v3.0.2 </h3><br>
Bug fix: SB1 is now working<br>
Changed SB5 effect visual to update all the time<br>
Ach 12 and 16 of minigame is changed description.<br>

<h3>v3.0.1 </h3><br>
Changed A185 req, changed MU91-95 price<br>
Fixed clickable 10^10x unlock<br>
Era milestones now unlock at previous era amount<br>

<h2>v3.0.0 (The Biggest Update)</h2><br>
Endgame: e1.3294765716e18 PF <br>
High Endgame: e1.32947657162222e18 PF <br>
Abs True Endgame: e1.32947657164e18 PF <br>
Ins True Endgame: e1.329476571655e18 PF <br>
Added a new layer! [Era] <br>
Added 2 (technically 3) subcurrencies <br>
Added an upgrade tree in the Era Layer <br>
Added Buyables and Info in the Era Layer <br>
Added 3 working eras with respective milestones! <br>
SB5 HC can now be increased! <br>
New feature: Reduce sac scaling upgs <br>
Added SB6 <br>
Added 1 savebank, deleted 2 savebanks <br>
Added 25 achievements <br>
Added a new achievement tab <br>
Added more upgrade softcaps and a new cap level <br>
Added a new Dim Shift. <br>
Added many extensions. <br>
Added 155, wait what... i think it is 155... upgrades <br>
Added 33 milestones <br>
Added a minigame! <br>

Changed milestone popup duration from 3 to 2 seconds.<br>
Revamped Row 1 SAs<br>
Added a new setting<br>
Added 2 new point representation texts, deleted one <br>
Fixed some description and softcap text <br>
Changed values for formatE setting <br>
Changed win text <br>
Side note: Longest changelog (by characters)? and #1 TMT game on play count <br>


<h3>v2.5.2 (QoL Upd)</h3><br>
Added red-bordered achievements, which unlocks more achievements.<br>
Achievements (excluding the first 2 rows) now is not visible at the start.<br>

Basic and Rebirth Mastery-Challenge 2 specific upgrades' description is changed<br>
Sac 680 description is changed<br>
Sac formula for SM58 is changed (softcap)<br>
You cannot enter any of Sac Challenges in the Mastery Challenge 2.<br>

<h3>v2.5.1</h3><br>
You cannot enter any of Sac Challenges after completing Mastery Challenge 2.<br>


<h3>v2.5.0 - RAPID INFLATION COMES</h3><br>
Added a hardcap for Supreme Buyable 5 (^1.25) <br>
Added a softcap and a hardcap for Sacrifice Milestone 58 (SC: ^1.075, HC: ^1.1) <br>
Changed description of some Sac Milestones <br>
New Feature: Reduce softcap of upgrades <br>
New Feature: Layers reset nothing <br>
New Feature: Changing exponent of static layers <br>
Added 2 savebanks <br>
Added a Mastery Challenge! <br>
Added 10 upgrades <br>
Added 10 Mastery Challenge 2-specific milestones <br>
Added 9 non-Mastery Challenge milestones <br>
Added 6 achievements, with 5 giving boosts! <br>
Endgame: e29,425,200,000,000 PF <br>
High Endgame: e29,425,225,000,000 PF <br>
Absolute True Endgame: e29,425,235,000,000 PF <br>


<h3>v2.4.0 - Dim Shift 5 and ???</h3><br>
Base number formatting precision increased from 2 to 3 <br>
Infobox layer got a revamp! Most things are now updated, and shifted locations <br>
Renamed savebanks from 'Sac Stage 3' to 'Supreme Stage 5' <br>
Mastery Layer symbol is now 'MAS', and Supreme symbol is now 'SU' instead of 'SP' <br>
Added 1 savebank <br>
Dim Shift 5 <br>
Added a buyable <br>
Added 22 upgrades <br>
Added 10 sacrifice milestones <br>
Added 7 non-sacrifice milestones <br>
Added 6 achievements, WITH ALL giving boosts! <br>
Endgame: e559,326,500,000 PF <br>

v2.41 - Fixed some bugs
v2.42 - Added Light Theme and a setting to change to e notation
v2.43 - Added Lava Theme

<h3>Changes (v2.3: Dimensional Shift 4 and Supreme Buyable 5) </h3><br>
Bug Fix: Ach 144 desc, MU73 desc, DS3 bar desc, SU94 unlock. <br>

<h3>Hotfixes </h3><br>
v2.31<br>
Fixed A166 Desc, changed A165 Desc (to sound more correct) <br>
Supreme Buyable 2 will start at 1% efficiency instead of 0%, to counter people saying that 'Supreme Points not generating' <br>
Added v2.2x changelogs <br>
v2.32<br>
Decreased offline time down to 10 hours instead of 50. <br>
Fixed typo in RU64 <br>
Precision for values increased from 2 decimal places to 4 <br>
v2.321<br>
Precision Changes<br>

<h3>New Content</h3><br>
Added 9 achievements, with 3 having rewards! <br>
Added 24 milestones, 11 being challenge-specific <br>
Added 1 buyable! <br>
Added 17 upgrades <br>


v2.23<br>
Added an extra infobox to make people buy basic milestone before (in Rebirth Layer). <br>
v2.22<br>
A154 req is changed, boosted boost. <br>
Added more reqs for Mastery Challenge milestones (ex. BM4 and RM9) to be unlocked only at Sac 10. <br>
Added 3 water upgrades <br>
v2.21<br>
Added more reqs for unlocking all Mastery Challenge-Specific Milestones (Check if in Challenge). <br>
Water Milestone 1 req fixed <br>
<h3>Changes (v2.2: Mastery) </h3><br>
Bug Fix: Finsihed. <br>
Shows req of secret achievement after completing. <br>
Added 3 secret achievements <br>
Changed req and/or boost of some secret achievements. <br>
Added 2 savebanks, and switched saves of 2. <br>
Added Rebirth Hypercap! <br>
Changed formatTime, now shows centuries <br>
Expanded on Info Layer. <br>

New Content</h3><br>
Added 9 achievements, with 3 having rewards! <br>
Added 24 milestones, 11 being challenge-specific <br>
Added 1 buyable! <br>
Added 17 upgrades <br>
Added a new layer and a challenge to go along with it. <br>
New upgrade effect: change softcap start. <br>
v2.2b<br>
Made ee and e start at e12, instead of e9. <br>
Made SA31 do the right value. <br>
<h3>v2.2a (Mega Prices Rework)</h3><br>
Decreased MU12, 14, 22 Prices <br>
Decreased MM1, MM3, MM4, MM8, MM10 Prices <br>
Decreased RU34, BU61, 63, 64 Prices <br>
Increased MU23, MM2, MM8, MM11 Prices <br>
Nerfed MU11 effect and buffed MU12. <br>
Changed PU32 to be kept at MU7 instead of MU5. Also let PU31 be kept at MU7. <br>
Changed Ach51 desc, increased Ach52 req and decreased Ach55 req. <br>
<h3>v2.1 - Choice Row Upgrades</h3><br>

Changes (v2.1) </h3><br>
Swapped PU3 and 4 position, changed PU3 and 4 price <br>
Changed price of Sac Challenge 3 Upgs. <br>
Severely nerfed Secret Achievement Effect <br>
Added Savebank <br>
Added Size/Time Comparison <br>
Changed SystemComponents - Now shows link to discord server <br>
Hotfixes</h3><br>
v2.11: Fixed Supreme Savebank not working</h3><br>
v2.12: Fixed Ach136 desc, fixed basic R4 keeping at RM4 instead of RM3</h3><br>
v2.121: Fixed SA31 req</h3><br>
v2.13: fixed basic R5 keeping at PM4 instead of PM3</h3><br>

New Content</h3><br>
Added 6 achievements, with 3 having rewards! <br>
Added 5 milestones <br>
Added 1 buyable! <br>
Added 24 upgrades <br>
Added 2 new extensions <br>

<h3>v2.00 - Supreme and Water</h3><br>
Hotfixes</h3><br>
v2.01: Added keep energy milestone milestone in sac</h3><br>
v2.02</h3><br>
Changed Secret Achievement 26 description <br>
Added reward to Secret Achievement 31 <br>
Fixed being able to reset water when energy is above e1000 <br>
Added infobox for water. <br>
v2.03</h3><br>
Decreased MU13, MU21-34 price, MM5 and 8. <br>
Increased MU11 Effect, to x2.9 <br>
Decreased SU22-SU42 price <br>
Decreased SM5 Price <br>

</h3>Changes (v2.0.0) </h3><br>
Bye Bye Autobuy… Hello Keep Upgrades! No more autobuying of upgrades! Milestones will keep the upgrades! Added 6 achievements (keep upgs) <br>
Added 1 Sac Challenge 4 Upg <br>

New Content</h3><br>
Added 12 achievements, with 5 having rewards! <br>
Added 10 milestones <br>
Added 2 layers! <br>
Added 3 buyables! <br>
Added 46 upgrades (yes, 46) <br>
Added 13 Secret Achievements (Most of them gives boosts, but most are not that big) <br>
Added the 3rd Dimensional Shift <br>
Endgame: e511.3e6 PF <br>
<h3>v1.3.1 - Mega Price DECREASE</h3><br>
Some upgrades are decreased in price <br>
<h3>v1.3.0 - Achievement Row 10</h3><br>
Sacrifice and Mega Buyable Milestones are hidden until you get the previous mega buyable/sac milestone<br>
Upgrade Effect Softcap <br>
In layer effect/upg effect, shows (Softcapped) / (Supercapped) when reaching softcap or supercap <br>
Prestige Supercap, Mega Softcap <br>
Dim Shift 2 <br>
Other Extensions: (contd) Basic Upgrades, Prestige and Rebirth <br>
Added 24 upgrades <br>
Added 4 challenge-specific upgrades <br>
Added 4 milestones and 1 challenge <br>
Added 6 achievements, 2 giving boosts <br>
Endgame: e151,551,551 PF <br>
<h3>v1.2.0 - The TRUE Biggest Update</h3><br>
Added names to Mega Buyables <br>
The FULL Rebalance <br>
Rebalanced prices of all upgrades, from Sac 10 to Sac 22. <br>
Mega Buyable 3 will now get automated in sac 21 instead of 22. <br>
Sacrifice now RESETS energy and Energy upgrades (some sacs can keep certain rows of energy upgrades) <br>
Rebalanced Challenges - Now resets energy upgrades, and new Challenge-Specific Upgrades. <br>
Added 15 upgrades <br>
Added 12 challenge-specific upgrades <br>
Added 1 milestone and 1 challenge <br>
Added 2 achievements <br>
Endgame: e26022000 PF <br>
<h3>v1.1.0</h3><br>
Renamed all Upgrades <br>
Added Branches <br>
Decreased price of Energy Upg 4 to 16 <br>
Decreased price of Mega Upg 18 to 20 <br>
Added 3 new sacs <br>
Added 2 new challenges <br>
Added 4 new achievements <br>
Added 5 new upgrades <br>
Added a new milestone <br>
Added 3 new infoboxes <br>
Endgame: e15511500 PF <br>
<h3>v1.0.0: True Release (on Galaxy.click)</h3><br>
- Decreased Prices of all new (v14.0) energy upgrades <br>
<h3>v14.0: The TRUE BIGGEST UPDATE</h3><br>
- Rebalanced Rebirth Stage [Increased Prices] <br>
- New Layer: Info Layer! Puts info on different features. <br>
- New Feature: Dimensional Shift + Bars <br>
- New Feature: Rep Upgrades <br>
Content Updates <br>
- 8 New Sacs, from Sac 13 to 20 <br>
- 9 new achievements <br>
- 24 new upgrades <br>
- 4 new milestones <br>
- 1 new buyable <br>
- Current Endgame: e9,000,000 PF. <br>
<h3>v12.1</h3><br>
- BIG Fix: Energy boost is based on mega <br>
- Changed prices of Mega Upgs 17 and 18 <br>
- Buffed achievement eMillionaire <br>
- Buffed Mega Upg 18 boost <br>
- Changed Sac 12 desc <br>
- 1 mega upg, 1 energy milestone <br>
- Nerfed EU2,3,7 Price <br>
- Buffed EU5 effect <br>
- Buffed EU6, EU8, EM2, EM3 <br>
<h3>v12.0 (Energy Part 1)</h3><br>
- NEW energy layer with boosts to PF! <br>
- 2 new OP Sacrifices <br>
- Changed description of Sac 10. <br>
- 3 new achievements <br>
- 8 new energy upgrades <br>
- 2 new mega upgrades <br>
- 3 new energy milestone <br>
- New Feature: Supercap <br>
- Current Endgame: e1,062,750 PF. <br>
<h3>v11.1 (Sacrifice Part 2)</h3><br>
- 5 new sacrifices, 7 new boosts! Balanced to Sac 10. <br>
- This is where points rise insanely, costing e930 MP in Sac 10. <br>
- 3 new achievements <br>
- 3 new mega upgrades <br>
- 1 new layer of prestige upgrades <br>
- 1 new mega milestone <br>
- 1 new mega buyable <br>
- Rebalanced Basic Upgrade costs <br>
- Current Endgame: e592,500 PF. <br>
<h3>v11.0 (Sacrifice Part 1)</h3><br>
- Balanced to Sacrifice 5 <br>
- Sacrifices give insane boosts. <br>
- 3 new achievements <br>
- 1 new mega upgrade <br>
- Mega Automation <br>
- 1 new mega milestone <br>
- X10 Offline limit!! <br>
- Current Endgame: 1e103,103 PF or 2.5e155 Mega Points or 5 Sacrifices <br>
<h3>v10.1</h3><br>
- 1 new achievement <br>
- Prices of Mega Upgrade 7-12 is reduced <br>
- Mega Milestone 5 is nerfed severely <br>
- 2 new prestige upgrades <br>
<h3>v10.0 (Mega Part 2)</h3><br>
- 3 New mega milestones <br>
- 5 achievements, with 2 giving rewards <br>
- 2 new RP Upgs <br>
- 5 new mega upgrades <br>
- Buyables! <br>
- Tabs! <br>
- Current Endgame: 1e37,373 PF or 5e44 Mega Points <br>
<h3>v9.1</h3><br>
- Fixed Prestige and Mega Upgrades showing without the previous being bought <br>
- Fixed RU9 Showing without RU8 being bought. MU4 Price decreased by e25. <br>
<h3>v9.0: THE BIGGEST UPDATE</h3><br>
- Fixed 20 PP Milestone <br>
- 2 new milestones (Pres and mega): Keep Milestones <br>
- 4 achievements, with 2 giving rewards <br>
- 4 new BP Upgs <br>
- 5 new mega upgrades <br>
- 3 mega milestones <br>
- Rebirth Softcap <br>
- Change of desc <br>
- Current Endgame: Seemingly random achievement or 1e10,500 PF <br>
<h3>v8.1, v8.2</h3><br>
- Added 2 new milestones (V8.1)<br>
- Made basic SU1 AND SU5 show after prev upg, reset layer show only when unlock (V8.2) <br>
<h3>v8.0</h3><br>
- Changed autobuy basic points to be 1M RP instead of 10 PP <br>
- 1 new Mega Upgrade <br>
- 1 new mega milestone <br>
- Added Rebirth Autobuy at 1e10 RP <br>
- Fixed Basic Super Upgrades appearing at once <br>
- Reset layers are easier to see <br>
- Current Endgame: Mega Upg 1 or 1e1,600 PF <br>
<h3>v7.0</h3><br>
- Mega Points! (10T PP) <br>
- 1 New UPG <br>
- 1 new achievement <br>
- Info Boxes! <br>
- Changelog Fix <br>
- Current Endgame: Mega Upg 1 or 1e1,600 PF <br>
<h3>v6.0</h3><br>
- Rebirth Points Generation. Unlocks at 500K PP (Milestone).<br>
- 2 brand new achievements.<br>
- 5 new prestige upgrades <br>
- Mega Points coming soon, at 1T PP! <br>
- Current Endgame: 1T PP or 1e1,500 PF <br>
<h3>v5.0</h3><br>
- Automation! Unlocks at 10 PP (Milestone).<br>
- 3 brand new achievements.<br>
- The first extension which is not a milestone! <br>
- 2 new OP Rebirth Upgrades <br>
- Fixed RU8 appearing with RU7. <br>
- Fixed achievement 11 description <br>
- 3 new prestige upgrades <br>
- First upgrade that boosts another upgrade <br>
- Current Endgame: 500 PP or 1e400 PF <br>
<h3>v4.1</h3><br>
- 1 new Prestige UPG.<br>
- 1 new prestige milestone.<br>
- Current Endgame: 5-8 PP.<br>
<h3>v4.0</h3><br>
- 4 OP BP Upgrades.<br>
- PRESTIGE! 1 Upgrade<br>
- 1 Rebirth Milestone <br>
- 2 new achievements <br>
- Current Endgame: 1e150 PF, 1 PP <br>
<h3>v3.2</h3><br>
- 4 new Rebirth Upgrades.<br>
- First milestone that boosts stats!<br>
- 1 Rebirth Milestone! <br>
- 2 new achievements <br>
- Current Endgame: 1e70 PF, 1B RP <br>
<h3>v3.1</h3><br>
		- Changed BSU3 Desc (Bug).<br>
		- Added 1 new rebirth upgrades.<br>
		- One new milestone [Passive Generation!]: 2K RP.<br>
		- Current Endgame: 1e40 Point Fragments<br>
<h3>v3.0</h3><br>
- 2 new Rebirth Upgrades.<br>
- Max is now 4 upgrades a row.<br>
- Rebirth Milestone! <br>
- 2 new achievements <br>
- 4 OP Basic Point UPGs. <br>
- Rebirth BOOSTS Point Fragments! <br>
- Current Endgame: 1E30 Point Fragments, or 10K RP <br>
<h3>v2.0</h3><br>
- 6 NEW ACHIEVEMENTS.<br>
<h3>v1.0</h3><br>
- Decrease BU3 and BU5 Scaling.<br>
- Increase BU7 and BU8 Scaling.<br>
- Added 4 new point upgrades and 1 new rebirth upgrade!<br>
- ADDED REBIRTH RESET LAYER.<br>
- Current Endgame: RU1 (Or 200M Point Fragments, 2M Basic Points).<br>
<h3>v0.3</h3><br>
- Decrease BU2's scaling by a lot.<br>
- Added 3 more upgrades, again.<br>
- Changed ID.<br>
- Current Endgame: 1.5K Basic Points (or 200K Point Fragments).<br>
    <h3>v0.2</h3><br>
		- Decrease BU2's cost.<br>
		- Added 3 more upgrades.<br>
		- Made changelog work.<br>
		- Current Endgame: 20 points a sec.<br>
	<h3>v0.1</h3><br>
		- One upgrade.<br>
		- Added Basic Points and Point Fragments. <br>
		- Current Endgame: 6 points a sec.<br>`

let winText = `Congratulations! You have reached the end and beaten this game! You can join my discord server for future sneak peeks and pings for updates, if you enjoyed. You can also leave a review in the discord, or report bugs! That's all for now. ~RD82`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)

	// layer effect

	if (layers.rebirth.effect().gte(1)) gain = gain.times(layers.rebirth.effect())
	if (layers.prestige.effect().gte(1)) gain = gain.times(layers.prestige.effect())
	if (layers.mega.effect().gte(1)) gain = gain.times(layers.mega.effect())
	if (layers.e.effect().gte(1)) gain = gain.times(layers.e.effect())


	// upgrade effect

	if (hasUpgrade('basic', 12)) gain = gain.times(upgradeEffect('basic', 12))
	if (hasUpgrade('basic', 24)) gain = gain.times(upgradeEffect('basic', 24))
	if (hasUpgrade('basic', 32)) gain = gain.times(upgradeEffect('basic', 32))
	if (hasUpgrade('mega', 31)) gain = gain.times(upgradeEffect('mega', 31))
	
	
	
	// basic
	if (hasUpgrade('basic', 11)) gain = gain.times(2)
	if (hasUpgrade('basic', 22)) gain = gain.times(2)
	if (hasUpgrade('basic', 31)) gain = gain.times(3)
	if (hasUpgrade('basic', 33)) gain = gain.times(2.5)
	if (hasUpgrade('basic', 34)) gain = gain.times(5)
	if (hasUpgrade('basic', 14)) gain = gain.times(1.35)
	if (hasUpgrade('basic', 41)) gain = gain.times(9.11)
	if (hasUpgrade('basic', 42)) gain = gain.times(7.77)
	if (hasUpgrade('basic', 44)) gain = gain.times(10)
	if (hasUpgrade('basic', 51)) gain = gain.times(100)
	if (hasUpgrade('basic', 52)) gain = gain.times(100)
	if (hasUpgrade('basic', 53)) gain = gain.times(10000)
	if (hasUpgrade('basic', 54)) gain = gain.times(1000)
	if (hasUpgrade('basic', 61)) gain = gain.times(1e25)
	if (hasUpgrade('basic', 64)) gain = gain.times(1e50)
	if (hasUpgrade('basic', 71)) gain = gain.times("7e777")
	if (hasUpgrade('basic', 72)) gain = gain.times("1e500")
	if (hasUpgrade('basic', 15)) gain = gain.times("1e10000")
	if (hasUpgrade('basic', 55)) gain = gain.times("1e30000")
	if (hasUpgrade('basic', 91)) gain = gain.times("e9.99e6")
	if (hasUpgrade('basic', 95)) gain = gain.times("e18.2e6")
	if (hasMilestone('basic', 2)) gain = gain.times("e2e7")
	if (hasMilestone('basic', 3)) gain = gain.times("e3e7")
	if (hasMilestone('basic', 6)) gain = gain.times("e250e6")
	if (hasUpgrade('basic', 105)) gain = gain.times("e1e9")
	if (hasMilestone('basic', 7)) gain = gain.times("e250e6")
	if (hasMilestone('basic', 8)) gain = gain.times("e2e9")
	if (hasMilestone('basic', 9)) gain = gain.times("e25e12")
	if (hasUpgrade('basic', 115)) gain = gain.times("e250e12")
	if (hasMilestone('basic', 10)) gain = gain.times("e1.6e16")

	
	
	// reb
	if (hasUpgrade('rebirth', 11)) gain = gain.times(4)
	if (hasUpgrade('rebirth', 12)) gain = gain.times(10)
	if (hasUpgrade('rebirth', 13)) gain = gain.times(1.28)
	if (hasUpgrade('rebirth', 14)) gain = gain.times(50)
	if (hasUpgrade('rebirth', 21)) gain = gain.times(100)
	if (hasMilestone('rebirth', 3)) gain = gain.times(10)
	if (hasUpgrade('rebirth', 23)) gain = gain.times(10)
	if (hasUpgrade('rebirth', 24)) gain = gain.times(20)
	if (hasUpgrade('rebirth', 32)) gain = gain.times(1111111.11)
	if (hasUpgrade('rebirth', 34)) gain = gain.times(1e200)
	if (hasUpgrade('rebirth', 41)) gain = gain.times("1e2000")
	if (hasUpgrade('rebirth', 45)) gain = gain.times("1e200000")
	if (hasUpgrade('rebirth', 63)) gain = gain.times("e8e6")
	if (hasUpgrade('rebirth', 65)) gain = gain.times("e12.5e6")
	if (hasUpgrade('rebirth', 75)) gain = gain.times("e500e6")
	if (hasUpgrade('rebirth', 81)) gain = gain.times("e600e9")
	if (hasUpgrade('rebirth', 82)) gain = gain.times("e960e9")
	if (hasUpgrade('rebirth', 83)) gain = gain.times("e1536e9")
	if (hasUpgrade('rebirth', 84)) gain = gain.times("e2457.6e9")
	if (hasUpgrade('rebirth', 85)) gain = gain.times("e3932.16e9")
	
	
	// pres
	if (hasUpgrade('prestige', 11)) gain = gain.times(20)
	if (hasUpgrade('prestige', 12)) gain = gain.times(10)
	if (hasUpgrade('prestige', 13)) gain = gain.times(100)
	if (hasUpgrade('prestige', 14)) gain = gain.times(1000)
	if (hasUpgrade('prestige', 21)) gain = gain.times(25)
	if (hasMilestone('prestige', 5)) gain = gain.times(100)
	if (hasUpgrade('prestige', 23)) gain = gain.times(1e10)
	if (hasUpgrade('prestige', 31)) gain = gain.times(1e20)
	if (hasUpgrade('prestige', 33)) gain = gain.times(1e300)
	if (hasUpgrade('prestige', 34)) gain = gain.times("6.66e666")
	if (hasUpgrade('prestige', 51)) gain = gain.times("e600000")
	if (hasUpgrade('prestige', 55)) gain = gain.times("e2.8e6")
	if (hasUpgrade('prestige', 61)) gain = gain.times("e20e6")
	if (hasUpgrade('prestige', 62)) gain = gain.times("e40e6")
	if (hasUpgrade('prestige', 63)) gain = gain.times("e60e6")
	if (hasUpgrade('prestige', 64)) gain = gain.times("e80e6")
	if (hasUpgrade('prestige', 65)) gain = gain.times("e100e6")
	if (hasUpgrade('prestige', 71)) gain = gain.times("e250e9")
	if (hasUpgrade('prestige', 75)) gain = gain.times("e500e9")
	if (hasMilestone('prestige', 11)) gain = gain.times("e40e12")
	
	
	
	// mega
	if (hasUpgrade('mega', 11)) gain = gain.times(1e10)
	if (hasUpgrade('mega', 12)) gain = gain.times(1e7)
	if (hasUpgrade('mega', 21)) gain = gain.times(1e50)
	if (hasUpgrade('mega', 24)) gain = gain.times(1e15)
	if (hasMilestone('mega', 8)) gain = gain.times(1e111)
	if (hasUpgrade('mega', 54)) gain = gain.times("1e40000")
	if (!(hasUpgrade("mega", 65))) {
		if (hasUpgrade('mega', 61)) gain = gain.times("1e4000")
		if (hasUpgrade('mega', 62)) gain = gain.times("1e4000")
		if (hasUpgrade('mega', 63)) gain = gain.times("1e4000")
		if (hasUpgrade('mega', 64)) gain = gain.times("1e4000")
	} else {
		if (hasUpgrade('mega', 61)) gain = gain.times("e20e6")
		if (hasUpgrade('mega', 62)) gain = gain.times("e20e6")
		if (hasUpgrade('mega', 63)) gain = gain.times("e20e6")
		if (hasUpgrade('mega', 64)) gain = gain.times("e20e6")
	}
	if (hasUpgrade('mega', 71)) gain = gain.times("1e180000")
	if (hasUpgrade('mega', 72)) gain = gain.times("1e144000")
	if (hasUpgrade('mega', 74)) gain = gain.times("1e172000")
	if (hasUpgrade('mega', 75)) gain = gain.times("e96714e3")
	if (hasMilestone('mega', 18)) gain = gain.times("e11.0539e6")
	if (hasUpgrade('mega', 15)) gain = gain.times("e50e6")
	if (hasUpgrade('mega', 85)) gain = gain.times("e200e6")
	if (hasUpgrade('mega', 92)) gain = gain.times("e4e9")
	if (hasUpgrade('mega', 95)) gain = gain.times("e15e9")
	if (hasMilestone('mega', 23)) gain = gain.times("e60e12")
	if (hasUpgrade('mega', 101)) gain = gain.times("e5e15")

	// sacrifice + energy
	if (hasMilestone('sac', 1)) gain = gain.times(1e100)
	if (hasMilestone('sac', 4)) gain = gain.times(1e250)
	if (hasMilestone('sac', 6)) gain = gain.times("1e1000")
	if (hasMilestone('sac', 7)) gain = gain.times("8e888")
	if (hasMilestone('sac', 8)) gain = gain.times("1e400")
	if (hasUpgrade('e', 11)) gain = gain.times(1e250)
	if (hasUpgrade('e', 23)) gain = gain.times("1e1500")
	if (hasUpgrade('e', 32)) gain = gain.times("1e7500")
	if (hasMilestone('e', 1)) gain = gain.times("1e1000")
	if (hasMilestone('e', 4)) gain = gain.times("1e7500")
	if (hasMilestone('e', 5)) gain = gain.times("1e10000")
	if (hasMilestone('sac', 14)) gain = gain.times("1e10000")
	if (hasUpgrade('e', 41)) gain = gain.times("1e10000")
	if (hasMilestone('sac', 15)) gain = gain.times("1e15000")
	if (hasMilestone('sac', 16)) gain = gain.times("1e20000")
	if (hasUpgrade('e', 43)) gain = gain.times("1e25000")
	if (hasUpgrade('e', 52)) gain = gain.times("1e10000")
	if (hasMilestone('e', 8)) gain = gain.times("1e100000")
	if (hasMilestone('sac', 22)) gain = gain.times("1e40000")
	if (hasUpgrade('e', 61)) gain = gain.times("1e126500")
	if (hasUpgrade('e', 62)) gain = gain.times("1e100000")
	if (hasUpgrade('e', 63)) gain = gain.times("1e100000")
	if (hasMilestone('e', 10)) gain = gain.times("1e142500")
	if (hasUpgrade('e', 84)) gain = gain.times("1e222222")
	if (inChallenge("sac", 14)) {
		if (hasUpgrade('e', 143)) gain = gain.times("1e125000")
		if (hasUpgrade('e', 145)) gain = gain.times("e300000")
	} // hi :)
	if (hasMilestone('sac', 29)) gain = gain.times("e292929")
	if (hasMilestone('sac', 30)) gain = gain.times("e300000")
	if (hasUpgrade('e', 92)) gain = gain.times("e350000")
	if (hasUpgrade('e', 93)) gain = gain.times("e500000")
	if (hasUpgrade('e', 94)) gain = gain.times("e657281")
	if (hasMilestone('e', 13)) gain = gain.times("e2e6")
	if (hasMilestone('sac', 40)) gain = gain.times("e1e7")
	if (hasMilestone('sac', 43)) gain = gain.times("e17.5e6")
	if (hasMilestone('sac', 44)) gain = gain.times("e22.5e6")
	if (hasMilestone('sac', 49)) gain = gain.times("e100e6")
	if (hasMilestone('sac', 59)) gain = gain.times("e500e6")
	if (hasUpgrade('e', 35)) gain = gain.times("e250e6")
	if (hasUpgrade('e', 55)) gain = gain.times("e250e6")
	if (hasUpgrade('e', 85)) gain = gain.times("e700e6")
	if (hasMilestone('e', 19)) gain = gain.times("e500e6")
	if (hasMilestone('sac', 63)) gain = gain.times("e500e6")
	if (hasMilestone('e', 20)) gain = gain.times("e500e6")
	if (hasMilestone('sac', 65)) gain = gain.times("e650e6")
	if (hasMilestone('e', 21)) gain = gain.times("e400e6")
	if (hasMilestone('sac', 66)) gain = gain.times("e1e9")
	if (hasUpgrade('e', 102)) gain = gain.times("e694.2e6")
	if (hasUpgrade('e', 105)) gain = gain.times("e1337.69420e6")
	if (hasMilestone('sac', 67)) gain = gain.times("e1e9")
	if (hasMilestone('sac', 68)) gain = gain.times("e2.023e9")
	if (hasMilestone('sac', 70)) gain = gain.times("e2.5e9")
	if (hasMilestone('sac', 74)) gain = gain.times("e40e9")
	if (hasMilestone('sac', 75)) gain = gain.times("e234e9")
	if (hasMilestone('sac', 81)) gain = gain.times("e1e12")
	if (hasMilestone('sac', 87)) gain = gain.times("e4e12")
	if (hasMilestone('sac', 88)) gain = gain.times("e2e13")
	if (hasMilestone('sac', 91)) gain = gain.times("e9e13")
	if (hasMilestone('sac', 92)) gain = gain.times("e1e14")
	if (hasMilestone('sac', 94)) gain = gain.times("e1.8e15")
	if (hasUpgrade('e', 155)) gain = gain.times("e3.1e15")
	if (hasMilestone('sac', 97)) gain = gain.times("e2.8e15")
	if (hasMilestone('sac', 100)) gain = gain.times("e1.66e16")
	if (hasMilestone('sac', 102)) gain = gain.times("e8e15")


	// achievement

	if (hasAchievement('a', 43)) gain = gain.times(1e30)
	if (hasAchievement('a', 45)) gain = gain.times(1e68)
	if (hasAchievement('a', 55)) gain = gain.times(2.72e272)
	if (hasAchievement('a', 66)) gain = gain.times("1e500")
	if (hasAchievement('a', 73)) gain = gain.times("1e10000")
	if (hasAchievement('a', 75)) gain = gain.times("1e10000")
	if (hasAchievement('a', 93)) gain = gain.times("1e54000")
	if (hasAchievement('a', 94)) gain = gain.times("1e100000")
	if (hasAchievement('a', 95)) gain = gain.times("1e95000")
	if (hasAchievement('a', 104)) gain = gain.times("1e250000")
	if (hasAchievement('a', 106)) gain = gain.times("1e150000")
	if (hasAchievement('a', 125)) gain = gain.times("e2.8e6")
	if (hasAchievement('a', 126)) gain = gain.times("e4.51e6")
	if (hasAchievement('a', 135)) gain = gain.times("e14.141e6")
	if (hasAchievement('a', 136)) gain = gain.times("e10e6")
	if (hasAchievement('a', 146)) gain = gain.times("e9.6e6")
	if (hasAchievement('a', 154)) gain = gain.times("e53.78e6")
	if (hasAchievement('a', 156)) gain = gain.times("e64.64e6")
	if (hasAchievement('a', 162)) gain = gain.times("e70e6")
	if (hasAchievement('a', 164)) gain = gain.times("e96.87e6")
	if (hasAchievement('a', 166)) gain = gain.times("e168.92e6")
	if (hasAchievement('a', 171)) gain = gain.times("e186.8e6")
	if (hasAchievement('a', 172)) gain = gain.times("e300e6")
	if (hasAchievement('a', 173)) gain = gain.times("e300e6")
	if (hasAchievement('a', 174)) gain = gain.times("e400e6")
	if (hasAchievement('a', 175)) gain = gain.times("e421.4e6")
	if (hasAchievement('a', 176)) gain = gain.times("e1e9")
	if (hasAchievement('a', 182)) gain = gain.times("e1e9")
	if (hasAchievement('a', 183)) gain = gain.times("e1.85e9")
	if (hasAchievement('a', 185)) gain = gain.times("e2.697e9")
	if (hasAchievement('a', 186)) gain = gain.times("e7e9")
	if (hasAchievement('a', 211)) gain = gain.times("e15e12")
	if (hasAchievement('a', 225)) gain = gain.times("e777e12")
	if (hasAchievement('a', 253)) gain = gain.times("e1e18")

	// buyables
	gain = gain.times(buyableEffect('mega', 11))

	// challenges
	if (hasChallenge('sac', 11)) gain = gain.times("1e25000")
	if (hasChallenge('sac', 12)) gain = gain.times("1e75000")
	if (hasChallenge('sac', 13)) gain = gain.times("1e400000")

	// supreme
	if (hasUpgrade('s', 11)) gain = gain.times("e300000")
	if (hasUpgrade('s', 13)) gain = gain.times("e600000")
	if (hasUpgrade('s', 22)) gain = gain.times("e1.5e6")
	if (hasUpgrade('w', 11)) gain = gain.times("e250000")
	if (hasUpgrade('s', 41)) gain = gain.times("e1e6")
	if (hasUpgrade('s', 43)) gain = gain.times("e1e6")
	if (hasMilestone('s', 6)) gain = gain.times("e1e6")
	if (hasUpgrade('w', 34)) gain = gain.times("e2e6")
	if (hasUpgrade('s', 44)) gain = gain.times("e2.1e6")
	if (hasUpgrade('w', 42)) gain = gain.times("e1.5e6")
	if (hasUpgrade('w', 44)) gain = gain.times("e5e6")
	if (hasUpgrade('s', 54)) gain = gain.times("e2e6")
	if (hasUpgrade('s', 61)) gain = gain.times("e1e7")
	if (hasUpgrade('s', 71)) gain = gain.times("e5e6")
	if (hasUpgrade('s', 72)) gain = gain.times("e6e6")
	if (hasUpgrade('s', 73)) gain = gain.times("e8e6")
	if (hasUpgrade('s', 74)) gain = gain.times("e1e7")
	if (hasUpgrade('s', 91)) gain = gain.times("e1e6")
	if (hasUpgrade('w', 53)) gain = gain.times("e28e6")
	if (hasUpgrade('s', 101)) gain = gain.times("e1e8")
	if (hasUpgrade('s', 104)) gain = gain.times("e1.25e8")
	if (hasUpgrade('w', 61)) gain = gain.times("e125e6")
	if (hasUpgrade('s', 111)) gain = gain.times("e50e9")
	if (hasUpgrade('s', 114)) gain = gain.times("e250e9")
	if (hasUpgrade('w', 74)) gain = gain.times("e20e12")
	if (hasUpgrade('s', 45)) gain = gain.times("e15e12")
	if (hasUpgrade('s', 115)) gain = gain.times("e50e12")
	if (hasMilestone('s', 9)) gain = gain.times("e50e12")
	if (hasUpgrade('w', 84)) gain = gain.times("e10e15")
	if (hasUpgrade("s", 123)) gain = gain.times("e1e17")

	// mastery

	if (hasUpgrade('m', 53)) gain = gain.times("e70e6")
	if (hasUpgrade('m', 55)) gain = gain.times("e130e6")
	if (hasUpgrade('m', 105)) gain = gain.times("e1e15")
	if (hasUpgrade('m', 1124)) gain = gain.times("e1.17e17")
	if (hasUpgrade('m', 123)) gain = gain.times("e2.5e17")


	// era
	if(hasUpgrade("era", 21)) gain = gain.times("e5e9")
	if(hasUpgrade("era", 52)) gain = gain.times("e2e10")
	if(hasUpgrade("era", 73)) gain = gain.times("e6e10")
	if(hasUpgrade("era", 82)) gain = gain.times("e2e11")
	if (hasUpgrade("era", 114)) gain = gain.times("e2e11")
	if (hasUpgrade("era", 123)) gain = gain.times("e1e12")
	if (hasUpgrade("era", 125)) gain = gain.times("e1e12")
	if (hasUpgrade("era", 154)) gain = gain.times("e2.5e12")
	if (hasUpgrade("era", 163)) gain = gain.times("e1e13")
	if (hasUpgrade("era", 164)) gain = gain.times("e2e13")
	if (hasUpgrade("era", 194)) gain = gain.times("e33e12")
	if (hasUpgrade("era", 201)) gain = gain.times("e2e13")
	if (hasUpgrade("era", 213)) gain = gain.times("e37e12")
	if (hasUpgrade("era", 245)) gain = gain.times("e350e12")
	if (hasUpgrade("era", 284)) gain = gain.times("e5e15")
	if (hasUpgrade("era", 292)) gain = gain.times("e2e15")
	if (hasUpgrade("era", 293)) gain = gain.times("e3e15")
	if (hasUpgrade("era", 294)) gain = gain.times("e4e15")
	if (hasUpgrade("era", 295)) gain = gain.times("e5e15")
	if (hasUpgrade("era", 54)) gain = gain.times("e6e15")
	if (hasUpgrade("era", 105)) gain = gain.times("e1.6e16")
	if (hasUpgrade("era", 144)) gain = gain.times("e2e16")
	if (hasUpgrade("era", 24)) gain = gain.times("e2.4e16")
	if (hasUpgrade("era", 92)) gain = gain.times("e3e16")
	if (hasUpgrade("era", 195)) gain = gain.times("e4e16")
	if (hasUpgrade("era", 225)) gain = gain.times("e5e16")
	if (hasUpgrade("era", 235)) gain = gain.times("e5e16")
	if (hasUpgrade("era", 353)) gain = gain.times("e5e17")
	if (hasUpgrade("era", 374)) gain = gain.times("e7e17")
	if (hasUpgrade("era", 381)) gain = gain.times("e1e18")


	// power (^)
	if (hasUpgrade('basic', 43)) gain = gain.pow(1.05)
	if (hasUpgrade('basic', 54)) gain = gain.pow(1.04)
	if (hasUpgrade('basic', 72)) gain = gain.pow(1.015)
	if (hasUpgrade('basic', 93)) gain = gain.pow(1.02)
	if (hasUpgrade('rebirth', 22)) gain = gain.pow(1.02)
	if (hasUpgrade('rebirth', 34)) gain = gain.pow(1.06)
	if (hasUpgrade('prestige', 24)) gain = gain.pow(1.02)
	if (hasUpgrade('mega', 13)) gain = gain.pow(1.02)
	if (hasUpgrade('mega', 23)) gain = gain.pow(1.03)
	if (hasUpgrade('mega', 32)) gain = gain.pow(1.025)
	if (hasMilestone('sac', 5)) gain = gain.pow(1.02)
	if (hasMilestone('sac', 10)) gain = gain.pow(1.006)
	if (hasMilestone('sac', 11)) gain = gain.pow(1.005)
	if (hasMilestone('sac', 12)) gain = gain.pow(1.0015)
	if (hasMilestone('sac', 13)) gain = gain.pow(1.005)
	if (hasMilestone('sac', 14)) gain = gain.pow(1.005)
	if (hasMilestone('sac', 15)) gain = gain.pow(1.005)
	if (hasMilestone('sac', 18)) gain = gain.pow(1.0375)
	if (hasMilestone('sac', 19)) gain = gain.pow(1.002)
	if (hasUpgrade('basic', 75)) gain = gain.pow(1.005)
	if (inChallenge('sac', 11)) gain = gain.pow(0.5)
	if (hasMilestone('sac', 21)) gain = gain.pow(1.063)
	if (hasUpgrade('prestige', 44)) gain = gain.pow(1.007)
	if (hasAchievement('a', 86)) gain = gain.pow(1.00025)
	if (hasMilestone('sac', 24)) gain = gain.pow(1.01)
	if (inChallenge('sac', 13)) gain = gain.pow(0.1)
	if (inChallenge("sac", 13)) {
		if (hasUpgrade('e', 133)) gain = gain.pow(1.1)
	}
	if (hasMilestone('sac', 25)) gain = gain.pow(1.01)
	if (hasMilestone('sac', 27)) gain = gain.pow(1.006)
	if (hasMilestone('sac', 28)) gain = gain.pow(1.008)
	if (inChallenge('sac', 14)) gain = gain.pow(0.5)
	if (inChallenge("sac", 14)) {
		if (hasUpgrade('e', 144)) gain = gain.pow(1.1)
	}
	if (hasChallenge('sac', 14)) gain = gain.pow(1.015)
	if (hasMilestone('sac', 30)) gain = gain.pow(1.01)
	if (hasMilestone('sac', 31)) gain = gain.pow(1.001)
	if (hasMilestone('e', 12)) gain = gain.pow(1.22)
	if (hasMilestone('sac', 32)) gain = gain.pow(1.01)
	if (hasUpgrade('s', 12)) gain = gain.pow(1.01)
	if (hasUpgrade('s', 14)) gain = gain.pow(1.01)
	if (hasUpgrade('s', 24)) gain = gain.pow(1.004)
	if (hasUpgrade('w', 32)) gain = gain.pow(1.01)
	if (hasMilestone('sac', 33)) gain = gain.pow(1.004)
	if (hasAchievement('a', 122)) gain = gain.pow(1.015)
	if (hasMilestone('sac', 34)) gain = gain.pow(1.012)
	if (hasUpgrade('prestige', 35)) gain = gain.pow(1.015)
	if (hasAchievement('a', 124)) gain = gain.pow(1.014074)
	if (hasUpgrade('s', 61)) gain = gain.pow(1.01)
	if (hasUpgrade('s', 63)) gain = gain.pow(1.03)
	if (hasAchievement('a', 134)) gain = gain.pow(1.01)
	if (hasUpgrade('rebirth', 65)) gain = gain.pow(1.01)
	if (hasMilestone('sac', 39)) gain = gain.pow(1.02)
	if (hasMilestone('w', 1)) gain = gain.pow(1.025)
	if (hasMilestone('basic', 1)) gain = gain.pow(1.025)
	if (hasMilestone('basic', 2)) gain = gain.pow(1.025)
	if (hasMilestone('mega', 18)) gain = gain.pow(1.011)
	if (hasUpgrade('s', 94)) gain = gain.pow(1.04)
	if (hasUpgrade('m', 21)) gain = gain.pow(1.02)
	if (hasUpgrade('m', 22)) gain = gain.pow(1.02)
	if (hasUpgrade('m', 23)) gain = gain.pow(1.03)
	if (hasUpgrade('m', 24)) gain = gain.pow(1.025)
	if (hasUpgrade('m', 25)) gain = gain.pow(1.05)
	if (hasAchievement('a', 145)) gain = gain.pow(1.029)
	let expinmc1 = new Decimal(0.1)
	if (hasUpgrade("m", 1123)) expinmc1 = new Decimal(0.111)
	if (hasUpgrade("m", 1133)) expinmc1 = new Decimal(0.12)
	if (inChallenge('m', 11)) gain = gain.pow(expinmc1)
	if (inChallenge("m", 11)) {
		if (hasMilestone("basic", 4)) gain = gain.pow(1.05)
		if (hasMilestone("sac", 10)) gain = gain.pow(1.05)
		if (hasMilestone("rebirth", 10)) gain = gain.pow(1.25)
		if (hasMilestone("basic", 5)) gain = gain.pow(1.15)
		if (hasMilestone("e", 17)) gain = gain.pow(1.2)
		if (hasMilestone("prestige", 9)) gain = gain.pow(1.2)
		if (hasMilestone("e", 18)) gain = gain.pow(1.3)
		if (hasUpgrade("m", 1112)) gain = gain.pow(1.05)
	}
	if (hasChallenge("m", 11)) gain = gain.pow(1.12)
	if (hasMilestone('sac', 45)) gain = gain.pow(1.0081)
	if (hasUpgrade('w', 54)) gain = gain.pow(1.011)
	if (hasMilestone('sac', 47)) gain = gain.pow(1.0092)
	if (hasUpgrade('mega', 35)) gain = gain.pow(1.025)
	if (hasMilestone('sac', 51)) gain = gain.pow(1.0109)
	if (hasMilestone('sac', 54)) gain = gain.pow(1.0118)
	if (hasUpgrade('s', 104)) gain = gain.pow(1.025)
	if (hasUpgrade('s', 102)) gain = gain.pow(tmp.s.sb5effect)
	if (hasMilestone('sac', 56)) gain = gain.pow(1.0126)
	if (hasUpgrade('rebirth', 73)) gain = gain.pow(1.01)
	if (hasMilestone('sac', 57)) gain = gain.pow(1.0132)
	if (hasUpgrade('rebirth', 75)) gain = gain.pow(1.025)
	if (hasMilestone('sac', 59)) gain = gain.pow(1.015)
	if (hasMilestone('sac', 60)) gain = gain.pow(1.016)
	if (hasUpgrade('e', 75)) gain = gain.pow(1.02)
	if (hasMilestone('sac', 61)) gain = gain.pow(1.017)
	if (hasMilestone('sac', 62)) gain = gain.pow(1.018)
	if (hasUpgrade('basic', 103)) gain = gain.pow(1.03)
	if (hasMilestone('sac', 63)) gain = gain.pow(1.02)
	if (hasMilestone('sac', 64)) gain = gain.pow(1.02)
	if (hasUpgrade('e', 103)) gain = gain.pow(1.006969)
		if (inChallenge("m", 12)) {
			if (hasMilestone("e", 22)) gain = gain.pow(1.025)
			if (hasMilestone("w", 3)) gain = gain.pow(1.05)
			if (hasMilestone('sac', 21)) gain = gain.pow(1.01)
			if (hasMilestone("e", 23)) gain = gain.pow(1.1)
			if (hasMilestone("w", 4)) gain = gain.pow(1.04)
			if (hasMilestone("mega", 22)) gain = gain.pow(1.1)
		}
	if (hasUpgrade('m', 82)) gain = gain.pow(1.01)
	if (hasUpgrade('m', 85)) gain = gain.pow(1.015)
	if (hasMilestone('sac', 71)) gain = gain.pow(1.008)
	if (hasUpgrade('mega', 93)) gain = gain.pow(1.005)
	if (hasMilestone('sac', 72)) gain = gain.pow(1.004)
	if (hasMilestone("era", 1)) gain = gain.pow(1.004)
	if (hasUpgrade("era", 41)) gain = gain.pow(1.003)
	if (hasUpgrade("era", 51)) gain = gain.pow(1.0075)
	if (hasUpgrade('s', 113)) gain = gain.pow(1.012)
	if (hasUpgrade("era", 72)) gain = gain.pow(1.01)
	if (hasUpgrade("era", 91)) gain = gain.pow(1.005)
	if (hasUpgrade("era", 115)) gain = gain.pow(1.01)
	if (hasMilestone('sac', 79)) gain = gain.pow(1.0065)
	if (hasMilestone("era", 2)) gain = gain.pow(1.015)
	if (hasUpgrade("era", 141)) gain = gain.pow(1.006)
	if (hasAchievement('a', 203)) gain = gain.pow(1.005)
	if (hasUpgrade("era", 155)) gain = gain.pow(1.01)
	if (hasUpgrade("w", 72)) gain = gain.pow(1.0072)
	if (hasUpgrade("era", 181)) gain = gain.pow(1.0111)
	if (hasMilestone('sac', 87)) gain = gain.pow(1.014)
	if (hasMilestone('sac', 90)) gain = gain.pow(1.006)
	if (hasUpgrade('s', 115)) gain = gain.pow(1.005)
	if (hasUpgrade("era", 215)) gain = gain.pow(1.01)
	if (hasMilestone('sac', 92)) gain = gain.pow(1.01)
	if (hasUpgrade("era", 234)) gain = gain.pow(1.005)
	if (hasUpgrade("era", 275)) gain = gain.pow(1.01)
	if (hasAchievement('a', 214)) gain = gain.pow(1.0077)
	if (hasUpgrade("era", 285)) gain = gain.pow(1.0125)
	if (hasMilestone("era", 3)) gain = gain.pow(1.025)
	if (hasUpgrade("w", 83)) gain = gain.pow(1.001)
	if (hasUpgrade("era", 55)) gain = gain.pow(1.0075)
	if (hasUpgrade("era", 35)) gain = gain.pow(1.01)
	if (hasUpgrade("era", 305)) gain = gain.pow(1.01)
	if (hasMilestone('sac', 102)) gain = gain.pow(1.008)
	if (hasUpgrade("prestige", 85)) gain = gain.pow(0.99)
	if (hasUpgrade("s", 125)) gain = gain.pow(1.01)
	if ((hasUpgrade('m', 1134)) && inChallenge("m", 11)) gain = gain.pow(1.038)
	if ((hasUpgrade('m', 1135)) && inChallenge("m", 11)) gain = gain.pow(1.11)
	if (inChallenge("m", 11)) gain = gain.pow(buyableEffect('era', 21))
	if (challengeCompletions("m", 11) == 2) gain = gain.pow(1.0333)
	if (hasUpgrade("m", 135)) gain = gain.pow(1.015)
	if (hasUpgrade("era", 363)) gain = gain.pow(1.008)
	if (player.sac.sacstr.gte(5)) gain = gain.pow(player.sac.se3)
	if (hasMilestone("sac", 58)) gain = gain.pow(tmp.sac.sacms58eff);
	if (hasMilestone("sac", 86)) gain = gain.pow(tmp.sac.sacms86eff);
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {
		if ((player.points.lte(80000))) {
			return "If every point was a US Dollar, then you can buy " + notationChooser(player.points.div(new Decimal(240.49))) + " iPhone XRs."
		}
	},
	function() {
		if ((player.points.lte(150e6)) && (player.points.gte(80000))) {
			return "If every point was a US Dollar, then you can buy " + notationChooser(player.points.div(new Decimal(800000))) + " homes."
		}
	},
	function() {
		if ((player.points.lte(180e9)) && (player.points.gte(150e6))) {
			return "If every point was a US Dollar, then you can buy " + notationChooser(player.points.div(new Decimal(1.5e9))) + " Burj Khalifas."
		}
	},
	function() {
		if ((player.points.lte(1e15)) && (player.points.gte(180e9))) {
			return "If every point was a US Dollar, then you can buy approximately " + notationChooser(player.points.div(new Decimal(1.5e9))) + " Moons."
		}
	},
	function() {
		if ((player.points.lte(1e17)) && (player.points.gte(1e15))) {
			return "If every point was a planck length, then you can make " + notationChooser(player.points.div(new Decimal(3800000000))) + " fermions."
		}
	},
	function() {
		if ((player.points.lte(2.75e25)) && (player.points.gte(1e17))) {
			return "If every point was a planck length, then you can make " + notationChooser(player.points.div(new Decimal(1e17))) + " quarks."		}
	},
	function() {
		if ((player.points.lte(7e29)) && (player.points.gte(2.75e25))) {
			return "If every point was a planck length, then you can make " + notationChooser(player.points.div(new Decimal(2.75e25))) + " water molecules."
		}
	},
	function() {
		if ((player.points.lte(1.7e35)) && (player.points.gte(7e29))) {
			return "If every point was a planck length, then you can make " + notationChooser(player.points.div(new Decimal(7e29))) + " red blood cells."
		}
	},
	function() {
		if ((player.points.lte(8.28e37)) && (player.points.gte(1.7e35))) {
			return "If every point was a planck length, then you can make " + notationChooser(player.points.div(new Decimal(1.7e35))) + " adult humans."
		}
	},
	function() {
		if ((player.points.lte(1.2742e42)) && (player.points.gte(8.28e37))) {
			return "If every point was a planck length, then you can make " + notationChooser(player.points.div(new Decimal(8.28e37))) + " Burj Khalifas."
		}
	},
	function() {
		if ((player.points.lte(1.392e44)) && (player.points.gte(1.2742e42))) {
			return "If every point was a planck length, then you can make " + notationChooser(player.points.div(new Decimal(1.2742e42))) + " Earths."
		}
	},
	function() {
		if ((player.points.lte(9.460528405e50)) && (player.points.gte(1.392e44))) {
			return "If every point was a planck length, then you can make " + notationChooser(player.points.div(new Decimal(1.392e44))) + " Suns."
		}
	},
	function() {
		if ((player.points.lte(9.460528405e62)) && (player.points.gte(9.460528405e50))) {
			return "If every point was a planck length, the length of all the points stacked together would take light " + notationChooser(player.points.div(new Decimal(9.460528405e50))) + " years to travel."
		}
	},
	function() {
		if ((player.points.lte(9.460528405e68)) && (player.points.gte(9.460528405e62))) {
			return "If every point was a planck length, then you can make " + notationChooser(player.points.div(new Decimal(9.460528405e62))) + " universes (Assuming 1 universe is 1T ly)."
		}
	},
	function() {
		if ((player.points.gte(9.460528405e68)) && (player.points.lte("e70e9"))) {
			return "If you write 1 number per second, writing down your point amount will need " + formatTime(player.points.add(1).log10()) + "."
		}
	},
	function() {
		if ((player.points.gte("e70e9")) && (player.points.lte("e1e12"))) {
			return "If you write 1 number per second, writing down your point amount will need " + notationChooser(player.points.add(1).log10().div(31536000)) + " years. You will need to start in " + format(Math.floor((player.points.add(1).log10().div(31536000)).sub(2024))) + " BCE to complete it by this year (2024)."
		}
	},
	function() {
		if ((player.points.gte("e1e12")) && (player.points.lte("e434250720000000000"))) {
			return "If you write 1 number per second, writing down your point amount will need " + notationChooser(player.points.add(1).log10().div(31536000)) + " years."
		}
	},
	function() {
		if ((player.points.gte("e434250720000000000")) && (player.points.lte("e1.36945307e25"))){
			return "If you write 1 number per second, writing down your point amount will need " + notationChooser(player.points.add(1).log10().div(434250720000000000)) + " times the current universe age. That's a lot of time!"
		}
	},
	function() {
		if ((player.points.gte("e1.36945307e25"))){
			return "If you write 1 number per year, writing down your point amount will need " + notationChooser(player.points.add(1).log10().div(1.36945307e25)) + " times the current universe age. That's a lot of time!"
		}
	},
]

// Determines when the game "ends"
function isEndgame() {
	return player.era.ec.gte(new Decimal("e9.1553e20"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) 
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}