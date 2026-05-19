let modInfo = {
	name: "1 Layer, 1,000 Upgrades",
	id: "1L1KUpgv3RD",
	author: "randim82",
	pointsName: "Power",
	modFiles: ["tree.js", "layer.js"],

	discordName: "Discord",
	discordLink: "https://discord.com/invite/RRK9Dwzf6P",
	initialStartPoints: new Decimal(0), // Used for hard resets and new players
	offlineLimit: 0,
}

// Set your version in num and name
let VERSION = {
	num: "1",
	name: "1KUpg",
}

let changelog = `<h1>Changelog:</h1><br> N/A`
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
// Base gain is 1 Power/sec, multiplied by each purchased upgrade's effect.
// upgEffects[n] = prevBoost^exp where exp starts at 1.1 and *1.02 each upgrade.
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)

	if (player.p && player.p.unlocked) {
		for (let n = 1; n <= UPG_COUNT; n++) {
			let id = upgId(n);
			if (hasUpgrade("p", id)) {
				gain = gain.mul(upgEffects[n]);
			}
		}
	}

	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {
		display = ""
		return display
	},
]

// Determines when the game "ends"
function isEndgame() {
	return false
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