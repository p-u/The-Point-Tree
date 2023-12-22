let modInfo = {
	name: "The Point Tree",
	id: "ThepointTreeRD82",
	author: "randim82",
	pointsName: "Point Fragments",
	modFiles: ["layers.js", "tree.js"],

	discordName: "SR46A",
	discordLink: "",
	initialStartPoints: new Decimal("0"), // Used for hard resets and new players
	offlineLimit: 10,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "10.0",
	name: "Mega Update: Part 2",
}

let changelog = `<h1>Changelog:</h1><br>
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
	// pres
	if (hasUpgrade('prestige', 11)) gain = gain.times(20)
	if (hasUpgrade('prestige', 12)) gain = gain.times(10)
	if (hasUpgrade('prestige', 13)) gain = gain.times(100)
	if (hasUpgrade('prestige', 14)) gain = gain.times(1000)
	if (hasUpgrade('prestige', 21)) gain = gain.times(25)
	if (hasMilestone('prestige', 2)) gain = gain.times(100)
	if (hasUpgrade('prestige', 23)) gain = gain.times(1e10)
	if (hasUpgrade('prestige', 31)) gain = gain.times(1e20)
	// mega
	if (hasUpgrade('mega', 11)) gain = gain.times(10e6)
	if (hasUpgrade('mega', 12)) gain = gain.times(10e9)
	if (hasUpgrade('mega', 21)) gain = gain.times(1e50)
	if (hasUpgrade('mega', 24)) gain = gain.times(1e15)
	if (hasMilestone('mega', 7)) gain = gain.times(1e111)

	// achievement

	if (hasAchievement('a', 43)) gain = gain.times(1e30)
	if (hasAchievement('a', 45)) gain = gain.times(1e68)
	if (hasAchievement('a', 55)) gain = gain.times(2.72e272)

	// buyables
	gain = gain.times(buyableEffect('mega', 11))


	// power
	if (hasUpgrade('basic', 43)) gain = gain.pow(1.05)
	if (hasUpgrade('basic', 54)) gain = gain.pow(1.04)
	if (hasUpgrade('rebirth', 22)) gain = gain.pow(1.02)
	if (hasUpgrade('rebirth', 34)) gain = gain.pow(1.06)
	if (hasUpgrade('prestige', 24)) gain = gain.pow(1.02)
	if (hasUpgrade('mega', 13)) gain = gain.pow(1.02)
	if (hasUpgrade('mega', 23)) gain = gain.pow(1.03)
	if (hasUpgrade('mega', 32)) gain = gain.pow(1.025)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e37373"))
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