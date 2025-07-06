let modInfo = {
	name: "World Growth",
	id: "RD82:WG",
	author: "randim82",
	pointsName: "Atoms",
	modFiles: ["energy.js", "achievements.js", "tree.js", "world.js", "matter.js", "clickmastery.js"],

	discordName: "SR46A",
	discordLink: "",
	initialStartPoints: new Decimal(10), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
	// remember to change to 0 in dev
}

// Set your version in num and name
let VERSION = {
	num: "av1.4",
	name: "World Tier 3",
}

let changelog = `<h1>Changelog:</h1><br>
<h3>av1.4</h3><br>
	- You can get World Tier 3, and there is a milestone for it <br>
	- Added 2 new click mastery milestones and 1 new matter milestone <br>
	- New feature: Buy max buyables, Increasing layer effect! <br>
	- 8 new achievements (6 are Click Mastery) <br>
	- 5 more upgrades <br>
	- 1 new generator! <br>
	- Added Standard notation <br>
	- Endgame: Magnesium Upgrade + 2 Gen 7s <br>
<h3>av1.3</h3><br>
	- Added the Click Mastery layer, comprising clicks and Click Level, with 11 milestones!<br>
	- 1 new infobox <br>
	- Increased World Tier scaling <br>
	- Added total matter display on top <br>
	- New feature: Keeping upgrades <br>
	- 2 more achievements and main-game milestones<br>
	- 3 more upgrades<br>
	- You need 10 Gen 5s as well as the milestone to be able to buy a Gen 6 now <br>
	- Endgame: Matter Milestone 8 + Ach 35 <br>
<h3>av1.2</h3><br>
	- 5 more upgrades<br>
	- 1 new generator <br>
	- 1 more achievement and milestone <br>
	- Renamed all matter upgrades' title to periodic table elements <br>
	- New feature: Buyable automation <br>
	- Fixed EU51 showing without EU45 <br>
	- Endgame: Nitrogen upgrade <br>
<h3>av1.1</h3><br>
	- 3 more upgrades<br>
	- 3 more milestones <br>
	- 2 more achievements <br>
	- Endgame: 25,000 total Matter <br>
<h2>av1.0</h2><br>
	- A total of 26 upgrades!<br>
	- 4 total main currencies <br>
	- 3 milestones <br>
	- 12 achievements <br>
	- 2 layers <br>
	- 5 ??? <br>
	- 1 savebank <br>
	- 11 playtime milestones <br>
	- Endgame: All upgrades and achievements (45-90mins) <br>`

let winText = `Congratulations! You have reached the end and beaten this game! You can join my discord server for future sneak peeks and pings for updates, if you enjoyed. You can also leave a review in the discord, or report bugs! That's all for now. ~RD82`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	let gainpt = false
	if (hasUpgrade("en", 11)) gainpt = true
	return gainpt
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (layers.ma.effect().gte(1)) gain = gain.times(layers.ma.effect())
	
	if (hasUpgrade("en", 25)) gain = gain.times(player.en.power.add(1).pow(player.en.powerexpoatom))
	if (hasUpgrade("en", 22)) gain = gain.times(upgradeEffect("en", 22))
	if (hasUpgrade("en", 41)) gain = gain.times(upgradeEffect("en", 41))
	
	if (hasUpgrade("en", 12)) gain = gain.times(1.5)
	if (hasUpgrade("en", 13)) gain = gain.times(1.75)
	if (hasUpgrade("en", 21)) gain = gain.times(2)
	if (hasUpgrade("en", 23)) gain = gain.times(1.5)
	if (hasUpgrade("en", 42)) gain = gain.times(1.4)
	if (hasUpgrade("en", 43)) gain = gain.times(3.5)
	if (hasUpgrade("en", 45)) gain = gain.times(10)
	if (hasUpgrade("en", 52)) gain = gain.times(50)
	if (hasUpgrade("ma", 12)) gain = gain.times(4)
	if (hasUpgrade("ma", 14)) gain = gain.times(8)
	if (hasMilestone("ma", 4)) gain = gain.times(2.5)
	if (hasUpgrade("en", 54)) gain = gain.times(2)
	if (hasUpgrade("en", 55)) gain = gain.times(20)
	if (hasUpgrade("ma", 23)) gain = gain.times(8)
	if (hasUpgrade("en", 65)) gain = gain.times(1.2)
	if (hasMilestone("w", 2)) gain = gain.times(new Decimal(3).pow(player.w.points))

	// playtime milestones
	if (hasMilestone("a", 4)) gain = gain.times(2)
	if (hasMilestone("a", 7)) gain = gain.times(1e6)
	if (hasMilestone("a", 8)) gain = gain.times(1e25)
	if (hasMilestone("a", 10)) gain = gain.times(1e100)
	if (hasAchievement("a", 12)) gain = gain.times(1.05)
	if (hasAchievement("a", 16)) gain = gain.times(1.05)
	if (hasAchievement("a", 23)) gain = gain.times(1.08)
	if (hasAchievement("a", 31)) gain = gain.times(1.02)
	if (hasAchievement("a", 32)) gain = gain.times(1.025)
	if (hasAchievement("a", 35)) gain = gain.times(1.05)
	
	// click mastery
	if (player.cm.clickmastery.gte(100)) gain = gain.times(player.cm.clickmastery.log(9))
	if (player.cm.clickmastery.gte(10000)) gain = gain.times(player.cm.clickmastery.div(77).log(14))
	if (player.cm.clickmastery.gte(50e6)) gain = gain.times(player.cm.clickmastery.div(188888).log(18))
	if (player.cm.clickmastery.gte(250e6)) gain = gain.times(player.cm.clmult.pow(player.cm.cmlvl))


	// exponent
	if (hasUpgrade("ma", 13)) gain = gain.pow(1.05)
	if (hasUpgrade("ma", 24)) gain = gain.pow(1.029)
	if (hasMilestone("ma", 9)) gain = gain.pow(1.01)
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
	return (hasUpgrade("ma", 32) && player.en.gen7amt.gte(2))
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