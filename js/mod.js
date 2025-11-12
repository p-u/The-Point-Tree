let modInfo = {
	name: "Stellar Evolution TMT",
	id: "RD82:SE",
	author: "randim82",
	pointsName: "Sparks",
	modFiles: ['achievements.js', 'stars.js', 'tree.js', 'startier.js', 'galaxy.js', 'nebulae.js'],

	discordName: "Stellar Evo Discord",
	discordLink: "https://discord.gg/RRK9Dwzf6P",
	initialStartPoints: new Decimal(1000), // Used for hard resets and new players
	offlineLimit: 0.5,// In hours
	// remember to change to 0 in dev
}

// Set your version in num and name
let VERSION = {
	num: "0.75",
	name: "30/40 Progression Upgrades",
}

let changelog = `<h1>Changelog:</h1><br>`

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
	if (hasUpgrade("s", 11)) gainpt = true
	return gainpt
}

var displayThings = [
	function() {
		display = ""
		return display
	}
]

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(200)
	if (hasUpgrade("s", 12)) gain = gain.mul(2)
	if (hasUpgrade("s", 13)) gain = gain.mul(1.5)
	if (hasMilestone("st", 1)) gain = gain.mul(2)
    if (hasUpgrade("s", 24)) gain = gain.times(2)
    if (hasUpgrade("s", 21)) gain = gain.times(1.06)
    if (hasUpgrade("s", 22)) {
		if (player.s.points.lt(1000)) {
			gain = gain.times(3)
		} else {
			gain = gain.times(5)
		}
		
	}
	if (hasUpgrade("s", 23)) {
		if (player.s.points.gte(50e3)) gain = gain.times(2)
		if (player.s.points.gte(100e3)) gain = gain.times(2)
		if (player.s.points.gte(200e3)) gain = gain.times(2)
		if (player.s.points.gte(500e3)) gain = gain.times(2)
		if (player.s.points.gte(4e6)) gain = gain.times(2)
		if (hasMilestone("st", 4)) {
			if (player.s.points.gte(10e6)) gain = gain.times(2)
			if (player.s.points.gte(50e6)) gain = gain.times(2)
			if (player.s.points.gte(200e6)) gain = gain.times(2)
			if (player.s.points.gte(1e9)) gain = gain.times(2)
			if (player.s.points.gte(10e9)) gain = gain.times(2)
			if (player.s.points.gte(10e10)) gain = gain.times(2)
			if (player.s.points.gte(10e11)) gain = gain.times(2)
		}
	}
	if (hasUpgrade("s", 31) && player.s.points.gte(1e12)) gain = gain.times(5)
	if (hasMilestone("st", 5)) {
		gain = gain.times(5)
		if (player.s.points.gte(25e12)) gain = gain.times(3)
		if (player.s.points.gte(1e15)) gain = gain.times(3)
		if (player.s.points.gte(1e18)) gain = gain.times(3)
		if (player.s.points.gte(1e21)) gain = gain.times(3)
		if (player.s.points.gte(1e24)) gain = gain.times(3)
		if (player.s.points.gte(1e27)) gain = gain.times(3)
		if (player.s.points.gte(1e30)) gain = gain.times(3)
		if (player.s.points.gte(1e33)) gain = gain.times(3)
		gain = gain.times(buyableEffect("s", 11))
	}
	if (hasMilestone("st", 3)) {
		gain = gain.mul(Decimal.max(player.st.points, new Decimal(1)))
		if (player.s.points.gte(300)) gain = gain.mul(player.s.points.pow(0.125))
	}
    if (hasMilestone("st", 6)) gain = gain.times(Decimal.max(Decimal.log2(player.st.points), new Decimal(1)))
	if (hasUpgrade("s", 15)) gain = gain.mul(upgradeEffect("s", 15))
	if (hasUpgrade("g", 11)) gain = gain.mul(upgradeEffect("g", 11))
	if (hasUpgrade("g", 13)) {
		gain = gain.mul(upgradeEffect("g", 13))
		if (player.points.gte(1e57)) gain = gain.mul(5)
		if (player.points.gte(1e69)) gain = gain.mul(1000)
	}
	if (hasMilestone("st", 8)) gain = gain.times(8)
	if (hasUpgrade("n", 11)) gain = gain.times(100)
	let b = 5
	if (player.points.gte("e2222")) b = b + 2
	if (player.points.gte("e2500")) b = b + 1.5
	if (hasMilestone("st", 17)) b = b * 2
	if (hasMilestone("st", 20)) b = b * 2
	if (hasUpgrade("n", 14)) b = player.st.points.pow(player.st.points).toNumber()
	if (hasUpgrade("s", 35) && player.n.points.gte(200e21)) gain = gain.times(player.n.points)
	if (hasUpgrade("n", 12)) gain = gain.times(new Decimal(b).pow(player.st.points))
	if (hasMilestone("st", 9)) {
		gain = gain.times(99)
		if (player.points.gte(1e123)) gain = gain.mul(9)
		if (player.points.gte(1e153)) gain = gain.mul(9)
		if (player.points.gte(1e183)) gain = gain.mul(9)
		if (player.points.gte(1e213)) gain = gain.mul(9)
		if (player.points.gte(1e243)) gain = gain.mul(9)
		if (player.points.gte(1e273)) gain = gain.mul(9)
		if (player.points.gte(1e303)) gain = gain.mul(9)
	}
	if (hasUpgrade("g", 23)) gain = gain.times("1e1000")
	if (hasMilestone("st", 10)) gain = gain.times(1000)
    if (hasUpgrade("s", 32) && player.points.gte(15e18)) gain = gain.times(2)

	if (hasUpgrade("n", 11)) gain = gain.pow(1.01)
	if (player.points.gte("e74250")) gain = gain.pow(1.01)
	return gain
}


// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}


// Determines when the game "ends"
function isEndgame() {
	return player.st.points.gte(25)
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