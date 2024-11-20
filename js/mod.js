let modInfo = {
	name: "The Point Tree",
	id: "ThepointTreeRD82",
	author: "randim82",
	pointsName: "Point Fragments",
	modFiles: ["basic.js", "rebirth.js", "prestige.js", "mega.js", "sacrifice.js", "energy.js", "achievements.js", "infobox.js", "supreme.js", "water.js", "secretAchievement.js", "mastery.js", "tree.js", "era.js", "cells.js"],

	discordName: "SR46A",
	discordLink: "",
	initialStartPoints: new Decimal(0), // Used for hard resets and new players
	offlineLimit: 0.5,  // In hours
	// remember to change to 0 in dev
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "NEW GAME",
}

let changelog = `<h1>Changelog:</h1><br>
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
	return player.points.gte(100)
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