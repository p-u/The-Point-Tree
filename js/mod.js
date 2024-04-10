let modInfo = {
	name: "The Point Tree",
	id: "ThepointTreeRD82",
	author: "randim82",
	pointsName: "Point Fragments",
	modFiles: ["basic.js", "rebirth.js", "prestige.js", "mega.js", "sacrifice.js", "energy.js", "achievements.js", "infobox.js", "basic.js", "supreme.js", "water.js", "secretAchievement.js", "mastery.js", "tree.js"],

	discordName: "SR46A",
	discordLink: "",
	initialStartPoints: new Decimal(0), // Used for hard resets and new players
	offlineLimit: 240,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "2.2: Mastery",
	name: "Its over e5B!",
}

let changelog = `<h1>Changelog:</h1><br>
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

Changes (v2.0.0) </h3><br>
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

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

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
	if (hasMilestone('basic', 2)) gain = gain.times("e3e7")

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
	// pres
	if (hasUpgrade('prestige', 11)) gain = gain.times(20)
	if (hasUpgrade('prestige', 12)) gain = gain.times(10)
	if (hasUpgrade('prestige', 13)) gain = gain.times(100)
	if (hasUpgrade('prestige', 14)) gain = gain.times(1000)
	if (hasUpgrade('prestige', 21)) gain = gain.times(25)
	if (hasMilestone('prestige', 2)) gain = gain.times(100)
	if (hasUpgrade('prestige', 23)) gain = gain.times(1e10)
	if (hasUpgrade('prestige', 31)) gain = gain.times(1e20)
	if (hasUpgrade('prestige', 33)) gain = gain.times(1e300)
	if (hasUpgrade('prestige', 34)) gain = gain.times("6.66e666")
	if (hasUpgrade('prestige', 51)) gain = gain.times("e600000")
	if (hasUpgrade('prestige', 55)) gain = gain.times("e2.8e6")
	// mega
	if (hasUpgrade('mega', 11)) gain = gain.times(1e10)
	if (hasUpgrade('mega', 12)) gain = gain.times(1e7)
	if (hasUpgrade('mega', 21)) gain = gain.times(1e50)
	if (hasUpgrade('mega', 24)) gain = gain.times(1e15)
	if (hasMilestone('mega', 8)) gain = gain.times(1e111)
	if (hasUpgrade('mega', 54)) gain = gain.times("1e40000")
	if (hasUpgrade('mega', 61)) gain = gain.times("1e4000")
	if (hasUpgrade('mega', 62)) gain = gain.times("1e4000")
	if (hasUpgrade('mega', 63)) gain = gain.times("1e4000")
	if (hasUpgrade('mega', 64)) gain = gain.times("1e4000")
	if (hasUpgrade('mega', 71)) gain = gain.times("1e180000")
	if (hasUpgrade('mega', 72)) gain = gain.times("1e144000")
	if (hasUpgrade('mega', 74)) gain = gain.times("1e172000")
	if (hasMilestone('mega', 18)) gain = gain.times("e11.0539e6")

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
	}
	if (hasMilestone('sac', 29)) gain = gain.times("e292929")
	if (hasMilestone('sac', 30)) gain = gain.times("e300000")
	if (hasUpgrade('e', 92)) gain = gain.times("e350000")
	if (hasUpgrade('e', 93)) gain = gain.times("e500000")
	if (hasUpgrade('e', 94)) gain = gain.times("e657281")
	if (hasMilestone('e', 13)) gain = gain.times("e2e6")
	if (hasMilestone('sac', 40)) gain = gain.times("e1e7")
	if (hasMilestone('sac', 43)) gain = gain.times("e17.5e6")
	if (hasMilestone('sac', 44)) gain = gain.times("e22.5e6")

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
	if (hasAchievement('a', 154)) gain = gain.times("e52e6")

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

	// secret achievements
	if (hasAchievement('sa', 12)) gain = gain.times(1.05)
	if (hasAchievement('sa', 13)) gain = gain.times(1.05)
	if (hasAchievement('sa', 14)) gain = gain.times(1.1)
	if (hasAchievement('sa', 15)) gain = gain.times(1.1)
	if (hasAchievement('sa', 16)) gain = gain.times(1.1)


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
	if (inChallenge('m', 11)) gain = gain.pow(0.1)
	if (inChallenge("m", 11)) {
		if (hasMilestone("basic", 4)) gain = gain.pow(1.05)
		if (hasMilestone("sac", 10)) gain = gain.pow(1.05)
		if (hasMilestone("rebirth", 10)) gain = gain.pow(1.25)
		if (hasMilestone("basic", 5)) gain = gain.pow(1.15)
		if (hasMilestone("e", 17)) gain = gain.pow(1.2)
		if (hasMilestone("prestige", 9)) gain = gain.pow(1.2)
		if (hasMilestone("e", 18)) gain = gain.pow(1.3)
	}
	if (hasChallenge("m", 11)) gain = gain.pow(1.12)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {
		if ((player.points.lte(1e17)) && (player.points.gte(1e15))) {
			return "If every point was a planck length, then you can make " + format(player.points.div(new Decimal(3800000000))) + " fermions."
		}
	},
	function() {
		if ((player.points.lte(2.75e25)) && (player.points.gte(1e17))) {
			return "If every point was a planck length, then you can make " + format(player.points.div(new Decimal(1e17))) + " quarks."		}
	},
	function() {
		if ((player.points.lte(7e29)) && (player.points.gte(2.75e25))) {
			return "If every point was a planck length, then you can make " + format(player.points.div(new Decimal(2.75e25))) + " water molecules."
		}
	},
	function() {
		if ((player.points.lte(1.7e35)) && (player.points.gte(7e29))) {
			return "If every point was a planck length, then you can make " + format(player.points.div(new Decimal(7e29))) + " red blood cells."
		}
	},
	function() {
		if ((player.points.lte(8.28e37)) && (player.points.gte(1.7e35))) {
			return "If every point was a planck length, then you can make " + format(player.points.div(new Decimal(1.7e35))) + " adult humans."
		}
	},
	function() {
		if ((player.points.lte(1.2742e42)) && (player.points.gte(8.28e37))) {
			return "If every point was a planck length, then you can make " + format(player.points.div(new Decimal(8.28e37))) + " Burj Khalifas."
		}
	},
	function() {
		if ((player.points.lte(1.392e44)) && (player.points.gte(1.2742e42))) {
			return "If every point was a planck length, then you can make " + format(player.points.div(new Decimal(1.2742e42))) + " Earths."
		}
	},
	function() {
		if ((player.points.lte(9.460528405e50)) && (player.points.gte(1.392e44))) {
			return "If every point was a planck length, then you can make " + format(player.points.div(new Decimal(1.392e44))) + " Suns."
		}
	},
	function() {
		if ((player.points.lte(9.460528405e62)) && (player.points.gte(9.460528405e50))) {
			return "If every point was a planck length, the length of all the points stacked together would take light " + format(player.points.div(new Decimal(9.460528405e50))) + " years to travel."
		}
	},
	function() {
		if ((player.points.lte(9.460528405e68)) && (player.points.gte(9.460528405e62))) {
			return "If every point was a planck length, then you can make " + format(player.points.div(new Decimal(9.460528405e62))) + " universes (Assuming 1 universe is 1T ly)."
		}
	},
	function() {
		if (player.points.gte(9.460528405e68)) {
			return "If you write 1 number per second, writing down your point amount will need " + formatTime(player.points.add(1).log10()) + "."
		}
	},
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e5611000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}