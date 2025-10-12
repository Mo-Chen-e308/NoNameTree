let modInfo = {
	name: "树名",
	id: "fhsjahfjs",
	author: "666",
	pointsName: "点数",
	discordName: "",
	discordLink: "",
	initialStartPoints: new ExpantaNum (0), // Used for hard resets and new players
	
	offlineLimit: 10,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.2",
	name: "",
}

let changelog = `<h1>更新记录:</h1><br>
	<h3>v0.0</h3><br>
		- 添加内容.<br>`

let winText = `恭喜通关!您已经完成了这个游戏.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new ExpantaNum(0)
	let gain = new ExpantaNum(1)
		if(player.p.buyable1.gt(0)) gain = gain.mul(layers.p.clickables[1].gain())
		if(player.p.buyable2.gt(0)) gain = gain.mul(layers.p.clickables[2].gain())
		if(player.p.buyable3.gt(0)) gain = gain.mul(layers.p.clickables[3].gain())
		if(player.p.buyable4.gt(0)) gain = gain.mul(layers.p.clickables[4].gain())
		if(player.p.buyable5.gt(0)) gain = gain.mul(layers.p.clickables[5].gain())
		if(player.p.buyable6.gt(0)) gain = gain.mul(layers.p.clickables[6].gain())
		if(player.p.buyable7.gt(0)) gain = gain.mul(layers.p.clickables[7].gain())
		if(player.p.buyable8.gt(0)) gain = gain.mul(layers.p.clickables[8].gain())
		if(player.p.buyable9.gt(0)) gain = gain.mul(layers.p.clickables[9].gain())

		if(hasUpgrade("s",11))gain = gain.mul(upgradeEffect("s",11))

		gain = gain.mul(new ExpantaNum(1.5).pow(player.s.points))
		gain = gain.mul(new ExpantaNum(2).pow(player.so.points))

		if(hasUpgrade("so",11))gain = gain.mul(layers.so.upgrades[11].effect()).max(1)
		if(hasMilestone("so",1)) gain = gain.mul(player.points.pow(0.5)).max(1)

		if(inChallenge("so",11)) gain = gain.pow(0.8)
		if(hasChallenge("so",11)) gain = gain.pow(1.2)
		
		if(hasUpgrade("so",22)) gain = gain.pow(n(layers.so.upgrades[22].effect()).add(1))



		gain = softcap(gain,new ExpantaNum(1e22),0.5)
		gain = softcap(gain,new ExpantaNum(1e222),0.5)
		gain = softcap(gain,new ExpantaNum("1e2222"),0.5)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	//"6"

]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}