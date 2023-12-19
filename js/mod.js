let modInfo = {
	name: "The Point Tree",
	id: "ThepointTreeRD82",
	author: "randim82",
	pointsName: "Point Fragments",
	modFiles: ["layers.js", "tree.js"],

	discordName: "SR46A",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 10,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "5.0",
	name: "Automation!",
}

let changelog = `<h1>Changelog:</h1><br>
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
		- Added Basic Points and Point Fragments.
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
	if (layers.rebirth.effect().gte(1)) gain = gain.times(layers.rebirth.effect())
	if (layers.prestige.effect().gte(1)) gain = gain.times(layers.prestige.effect())
	if (hasUpgrade('basic', 12)) gain = gain.times(upgradeEffect('basic', 12))
	if (hasUpgrade('basic', 24)) gain = gain.times(upgradeEffect('basic', 24))
	if (hasUpgrade('basic', 32)) gain = gain.times(upgradeEffect('basic', 32))
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
	if (hasUpgrade('rebirth', 11)) gain = gain.times(4)
	if (hasUpgrade('rebirth', 12)) gain = gain.times(10)
	if (hasUpgrade('rebirth', 13)) gain = gain.times(1.28)
	if (hasUpgrade('rebirth', 14)) gain = gain.times(50)
	if (hasUpgrade('rebirth', 21)) gain = gain.times(10)
	if (hasMilestone('rebirth', 3)) gain = gain.times(10)
	if (hasUpgrade('rebirth', 23)) gain = gain.times(10)
	if (hasUpgrade('rebirth', 24)) gain = gain.times(20)
	if (hasUpgrade('rebirth', 32)) gain = gain.times(1111111.11)
	if (hasUpgrade('prestige', 11)) gain = gain.times(20)
	if (hasUpgrade('prestige', 12)) gain = gain.times(10)
	if (hasUpgrade('prestige', 13)) gain = gain.times(100)
	if (hasUpgrade('prestige', 14)) gain = gain.times(100000)
	if (hasUpgrade('prestige', 21)) gain = gain.times(25)


	// power
	if (hasUpgrade('basic', 43)) gain = gain.pow(1.05)
	if (hasUpgrade('basic', 54)) gain = gain.pow(1.04)
	if (hasUpgrade('rebirth', 22)) gain = gain.pow(1.02)
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
	return player.points.gte(new Decimal("e1000"))
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