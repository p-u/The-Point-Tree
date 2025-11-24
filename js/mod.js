let modInfo = {
	name: "World Growth",
	id: "RD82:WGBT",
	author: "randim82",
	pointsName: "Atoms",
	modFiles: ["energy.js", "achievements.js", "tree.js", "world.js", "matter.js", "clickmastery.js", "content_features.js", "molecules.js", "particles.js", "corelvl.js"],

	discordName: "SR46A",
	discordLink: "",
	initialStartPoints: new Decimal(10), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
	// remember to change to 0 in dev
}

// Set your version in num and name
let VERSION = {
	num: "1.2",
	name: "The ??? + World Tier 5",
}

let changelog = `<h1>Changelog:</h1><br>
<h2>v1.2</h2><br>
	- Main Content: Added a new layer with 21 upgrades and 5 milestones <br>
	- Click Mastery: Added 14 new milestones and 2 CSM Milestones <br>
	- Content Features: Added a subtab and a new milestone <br>
	- Matter Layer: Added 6 Shrinking Upgrades, 1 Shrinkenator, 3 Objects, new uni^x size, 1 Milestone. Added descriptions for fictional objects <br>
	- Particle Layer: Added 2 Upgrades, 1 Particle, 1 Milestone <br>
	- Molecule Layer: Added 4 Upgrades, 1 Booster, 1 Milestone <br>
	- Added import/export save to file <br>
	- Some changes here and there (BIG nerf to shrinking speed, nerfed the prices of s-1 to s-6 to compensate) <br>
	- Achievements: Added 6 main-game achievements and 2 CSM Achievements <br>
	- Endgame: ~e26,260 Atoms + B-9 Upgrade <br>
<h2>v1.1</h2><br>
	- Added a new feature in the Matter Layer with its own set of upgrades! <br>
	- Added 3 ???s <br>
	- Added 3 milestones and 14 upgrades <br>
	- Added 1 savebank and 4 Achievements <br>
	- Content Features: Added 1 new milestone <br>
	- Added 1 new World Tier and increased cost for WT5 <br>
	- Fixed the Total Particles metric not adding Delta Particle <br>
	- Fixed Gen 5 not costing anything when not having bought the 'not cost anything' upgrade <br>
	- Added a softcap for 'Electric' upgrade <br>
	- Added Particle passive gen and auto-assigning Particles <br>
	- Endgame: e7,500 Atoms + s-6 Upgrade <br>
<h3>v1.01 - CSM Overhaul</h3><br>
	- CSM Upgrades has been changed to Milestones <br>
	- CSM Milestones' req has been decreased <br>
	- CSM has been buffed severely <br>
<h1>v1.0</h1><br>
	- Added a new layer! Introduces a new feature. <br>
	- Added 3 boosters and a new Generator Tier with 1 generator <br>
	- Added 7 milestones and 25 upgrades <br>
	- Added 1 savebank and 8 Achievements <br>
	- Added a new feature: Trade-off. <br>
	- Content Features: Added 2 new milestones <br>
	- Click Mastery: Added 4 new static milestones <br>
	- Fixed: For 4 CM Milestones, you now need World Tier 4 <br>
	- Added an unlocked function for Content Feature Milestones. <br>
	- Added the Click Mastery feature in World Tier 4, with 4 upgrades <br>
	- Added notationChooser on the reset button <br>
	- Fixed the 'Reset Timings' subtab in the World layer <br>
	- Reduced the cost of upgrades released in av2.1, av2.2 and some in av2.0 <br>
	- Added a hidden softcap for the Power layer at e720. <br>
	- Other tweaks and features not significant enough to mention <br>
	- Endgame: All 45 Energy upgrades/e3,420 Atoms <br>
<h3>av2.21</h3><br>
	- Many balance changes <br>
<h2>av2.2</h2><br>
	- Added a new World Tier Milestone (Main features coming in next update) <br>
	- Added 1 booster and a new Content Feature Milestone <br>
	- Added 3 Achievements and 3 Click Mastery Milestones <br>
	- Added 3 milestones, 6 upgrades and 1 Click Mastery Milestone <br>
	- Added a new effect to EU82, and added softcaps to all generators. <br>
	- Added a new feature: Extra buyables. <br>
	- Added a new buyable in the Generator tab <br>
	- Added the 'Reset Timings' tab in the World layer <br>
	- Second Content Feature milestone multiplies CM by less, and Gen 4 has an effect now. Reworked Gen 4 formula to make base scale <br>
	- Other tweaks and features not significant enough to mention <br>
	- Endgame: All 20 Matter upgrades/e850 Atoms <br>
<h3>av2.1 Subversions</h3><br>
	- Nerfed last 2 click mastery milestones (-30% gain at 10B) <br>
	- Fixed a bug (not keeping Gen 4 on MaMS4) <br>
	- Added QoL features (keeping ups) for Molecule MS4-6 <br>
<h2>av2.1</h2><br>
	- Added a new feature in the Molecule layer, unlocked by getting 1.97e308 Atoms! <br>
	- Added 4 of that new feature <br>
	- Added 8 Achievements and 1 Infobox <br>
	- Added 7 milestones, 9 upgrades and 1 Click Mastery Milestone <br>
	- Some bug fixes and balance changes <br>
	- Endgame: 1e12 Molecules/e550 Atoms <br>
	- Is World Tier 4 possible? <br>
<h3>av2.0 Subversions</h4><br>
	- Nerfed molecule effect exponent slightly <br>
	- Nerfed Molecule MS1 Matter Gen%, increased to 1% at MoU4 <br>
	- Updated first infobox <br>
	- Your atoms now cannot be over the next world tier requirement <br>
	- Added a softcap to Matter Effect and a nerf to atoms after e308 <br>
	- Changed 'total resetted molecules' to 'molecule bonds' <br>
	- Bug fixes <br>
	- Nerfed Click Mastery gain and effect (at 10B Clicks, /2 Atom-Power, -20% Matter and Molecules) <br>
	- Many bug fixes including: Gen 7 acts as Gen 6, Inconsistent numbering, not applying Molecule boosts, not Buy Maxxing Gen 3 <br>
	- Added Buy Max Gen 4 in Molecule U3 <br>
<h2>av2.0</h2><br>
	- Added a side layer and a new layer! <br>
	- World Tier 1, Matter Upgrade 4 and Matter Milestone 4's effects are switched <br>
	- Matter Milestone 4 got a price nerf <br>
	- Heavily buffed Matter Upgrade 13 <br>
	- Added 5 Click Mastery Milestones <br>
	- Added 1 savebank, 1 generator and 1 infobox <br>
	- fixed a bug <br>
	- Added Unlocking of milestones <br>
	- Added 3 milestones and 13 upgrades <br>
	- Endgame: Molecule U5 <br>
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
<h1>av1.0</h1><br>
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
	
	// en, ma
	if (hasUpgrade("en", 25)) gain = gain.times(player.en.power.add(1).pow(player.en.powerexpoatom))
	if (hasUpgrade("en", 22)) gain = gain.times(upgradeEffect("en", 22))
	if (hasUpgrade("en", 41)) gain = gain.times(upgradeEffect("en", 41))
	if (hasUpgrade("en", 84)) gain = gain.times(upgradeEffect("en", 84))
	if (hasUpgrade("ma", 43)) gain = gain.times(upgradeEffect("ma", 43))
	if (hasUpgrade("ma", 54)) gain = gain.times(upgradeEffect("ma", 54))
	if (hasUpgrade("en", 12)) gain = gain.times(1.5)
	if (hasUpgrade("en", 13)) gain = gain.times(1.75)
	if (hasUpgrade("en", 21)) gain = gain.times(2)
	if (hasUpgrade("en", 23)) gain = gain.times(1.5)
	if (hasUpgrade("en", 42)) gain = gain.times(1.4)
	if (hasUpgrade("en", 43)) gain = gain.times(3.5)
	if (hasUpgrade("en", 45)) gain = gain.times(10)
	if (hasUpgrade("en", 52)) gain = gain.times(50)
	if (hasUpgrade("ma", 12)) gain = gain.times(4)
	if (hasUpgrade("ma", 212)) gain = gain.times(2.4e24)
	if (hasUpgrade("ma", 214)) gain = gain.times(1e50)
	if (hasUpgrade("ma", 14)) gain = gain.times(8)
	if (hasMilestone("w", 1)) gain = gain.times(5)
	if (hasMilestone("cf", 6)) gain = gain.times(4250)
	gain = gain.times(new Decimal(1000).pow(Decimal.max(player.ma.shrinkpts.add(0.000001).log(player.ma.spatomlg).add(1), 0)))
	if (hasUpgrade("en", 54)) gain = gain.times(2)
	
	if (hasUpgrade("en", 55)) gain = gain.times(20)
	if (hasUpgrade("ma", 23)) gain = gain.times(4)
	if (hasUpgrade("en", 65)) gain = gain.times(1.2)
	if (hasUpgrade("en", 71)) gain = gain.times(7)
	if (hasUpgrade("en", 74)) gain = gain.times(100)
	if (hasUpgrade("en", 95)) gain = gain.times(1e25)
	if (hasUpgrade("mo", 31)) gain = gain.times(12)
	if (hasUpgrade("mo", 32)) gain = gain.times(100e3)
	if (hasUpgrade("mo", 11)) gain = gain.times(2)
	if (hasUpgrade("mo", 12)) gain = gain.times(3)
	if (hasUpgrade("en", 75)) gain = gain.times(8)
	if (hasUpgrade("cl", 22) && player.cl.energy.gte(100e6)) gain = gain.times("e500")
	if (hasUpgrade("mo", 15)) gain = gain.times(5)
	if (hasUpgrade("ma", 224)) gain = gain.times(1e29)
	if (hasMilestone("ma", 16)) gain = gain.times(1e50)
	if (hasMilestone("mo", 11)) gain = gain.times(new Decimal(player.timePlayed).pow(0.8))
	if (hasMilestone("w", 2)) gain = gain.times(new Decimal(3).pow(player.w.points))
	if (hasMilestone("ma", 11)) gain = gain.times(3)
	if (hasUpgrade("mo", 23)) {
		if (hasUpgrade("en", 81)) gain = gain.times(new Decimal(1.4).pow(player.en.wheeamt))
	} else{
		if (hasUpgrade("en", 81)) gain = gain.times(player.en.wheeamt)
	}
	if (hasMilestone("mo", 7)) gain = gain.times(77)
	if (hasMilestone("mo", 12)) gain = gain.times(1254)
	if (hasUpgrade("en", 85)) gain = gain.times(88)
	if (hasUpgrade("pa", 11)) gain = gain.times(5)
	if (hasUpgrade("mo", 51)) gain = gain.times(1e100)
	if (hasUpgrade("cl", 21)) gain = gain.times(1e60)
    if (hasUpgrade("pa", 35)) gain = gain.times(1e100)
	if (hasMilestone("mo", 13)) gain = gain.times(new Decimal(2).pow(player.a.achievements.length))

	// playtime milestones (TBC)
	if (hasMilestone("a", 4)) gain = gain.times(2)
	if (hasAchievement("a", 12)) gain = gain.times(1.05)
	if (hasAchievement("a", 16)) gain = gain.times(1.05)
	if (hasAchievement("a", 23)) gain = gain.times(1.08)
	if (hasAchievement("a", 31)) gain = gain.times(1.02)
	if (hasAchievement("a", 32)) gain = gain.times(1.025)
	if (hasAchievement("a", 35)) gain = gain.times(1.05)
	if (hasAchievement("a", 44)) gain = gain.times(1.1)
	if (hasAchievement("a", 46)) gain = gain.times(1.1)
	if (hasAchievement("a", 91)) gain = gain.times(2)
	if (hasMilestone("cf", 4) && player.mo.points.gte(1e24)) gain = gain.times(Decimal.min(new Decimal(4).pow(Decimal.max(player.mo.points.div(1e24).log(2), 1)), new Decimal(1e7)))
		
	
	// click mastery
	if (player.cm.clickmastery.gte(100)) gain = gain.times(player.cm.clickmastery.times(25).log(25))
	if (player.cm.clickmastery.gte(10000)) gain = gain.times(player.cm.clickmastery.log(47))
	if (player.cm.clickmastery.gte(50e6)) gain = gain.times(player.cm.clickmastery.div(288888).log(28))
	if (player.cm.clickmastery.gte(3e9)) gain = gain.times(player.cm.clickmastery.mul(225).log(22500))
	if (player.cm.clickmastery.gte(250e6)) gain = gain.times(player.cm.clmult.pow(player.cm.cmlvl))
	if (player.cm.clickmastery.gte(3e10)) gain = gain.times(3)
	if (player.cm.clickmastery.gte(8e15)) gain = gain.times(25)

	// particles and gens boost
	gain = gain.times(layers.pa.getAlphaEff())
	gain = gain.div(player.pa.clickablenerf.gamma)
	gain = gain.times(buyableEffect("en", 61))


	// CL
	if (hasMilestone("cl", 1)) gain = gain.times(new Decimal(10).pow(player.cl.energy.add(1).slog()))



	// exponent
	if (hasUpgrade("ma", 13)) gain = gain.pow(1.05)
	if (hasUpgrade("ma", 24)) gain = gain.pow(1.029)
	if (hasMilestone("ma", 9)) gain = gain.pow(1.01)
	if (hasUpgrade("en", 73)) gain = gain.pow(1.03)
	if (hasMilestone("mo", 3)) gain = gain.pow(1.0175)
	if (hasMilestone("w", 3)) gain = gain.pow(1.01)
	if (hasMilestone("pa", 1)) gain = gain.pow(1.01)
	if (hasUpgrade("pa", 32)) gain = gain.pow(1.004)
	if (hasUpgrade("ma", 221)) gain = gain.pow(1.0036)
	if (hasUpgrade("ma", 225)) gain = gain.pow(1.01)
	if (hasMilestone("cl", 1)) gain = gain.pow(1.004)
	if (hasMilestone("cl", 2)) gain = gain.pow(1.003)
	if (hasMilestone("cl", 3)) gain = gain.pow(1.003)
	// nerf
	if (player.points.gte(new Decimal(2).pow(1024))) gain = gain.pow(new Decimal(0.99).sub(Decimal.log(player.points.slog().minus(new Decimal(2).pow(1024).slog()).add(1),2).div(4)))
	if (player.points.gte(tmp.w.nextAt) && (!(player.w.points.gte(100)))) {
		player.points = tmp.w.nextAt
		gain = new Decimal(0) // if you reach the next world tier, you get no gain
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
		if (player.points.gte(new Decimal(2).pow(1024))) {
			let overloadPower = (new Decimal(0.99).sub(Decimal.log(player.points.slog().minus(new Decimal(2).pow(1024).slog()).add(1),2).div(4)))
			display = "<span style='color: red;'>Due to Overload after 2^1024 Atoms, Atoms are raised to the power of " + format(overloadPower, 5) + ". </span>"
		}
		return display
	}
]


// Determines when the game "ends"
function isEndgame() {
	return (player.cl.points.gte(5) && hasUpgrade("cl", 26))
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