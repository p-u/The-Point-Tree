// ************ Themes ************
var themes = ["default", "aqua", "verdant", "sky", "lava", "light", "void"]

var colors = {
	default: {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#dfdfdf",
		points: "#ffffff",
		locked: "#bf8f8f",
		background: "#0f0f0f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
	},
	aqua: {
		1: "#bfdfff",
		2: "#8fa7bf",
		3: "#5f6f7f",
		color: "#bfdfff",
		points: "#dfefff",
		locked: "#c4a7b3",
		background: "#001f3f",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
	},
	verdant: {
		1: "#98f5c4",
		2: "#ffffff",
		3: "#0a0d2b",
		color: "#4de1b3",
		points: "#c7f1ff",
		locked: "#a07878",
		background: "#104d39",
		background_tooltip: "rgba(0, 0, 0, 0.85)",
	},
	sky: {
		1: "#505050",
		2: "#929292",
		3: "#7a8b9d",
		color: "#505050",
		points: "#101010",
		locked: "#d8b8cd",
		background: "#64b5f6",
		background_tooltip: "rgba(255, 255, 255, 0.3)",
	},
	lava: {
		1: "#accaff",
		2: "#7891b1",
		3: "#d74432",
		color: "#9fc9ff",
		points: "#c4d9ff",
		locked: "#d6aec0",
		background: "#fa3928",
		background_tooltip: "rgba(0, 10, 25, 0.8)",
	},
	light: {
		1: "#595959",
		2: "#8d8d8d",
		3: "#555555",
		color: "#595959",
		points: "#1c1c1c",
		locked: "#4d4d4d",
		background: "#d9e3f3",
		background_tooltip: "rgba(255, 255, 255, 0.35)",
	},	
	void: {
		1: "#1C1C1C", 
		2: "#333333",
		3: "#4D4D4D", 
		color: "#E0E0E0", 
		points: "#9E9E9E",
		locked: "#666666", 
		background: "#0A0A0A", 
		background_tooltip: "rgba(255, 255, 255, 0.1)", 
	}
}
function changeTheme() {

	colors_theme = colors[options.theme || "default"];
	document.body.style.setProperty('--background', colors_theme["background"]);
	document.body.style.setProperty('--background_tooltip', colors_theme["background_tooltip"]);
	document.body.style.setProperty('--color', colors_theme["color"]);
	document.body.style.setProperty('--points', colors_theme["points"]);
	document.body.style.setProperty("--locked", colors_theme["locked"]);
}
function getThemeName() {
	return options.theme ? options.theme : "default";
}

function switchTheme() {
	let index = themes.indexOf(options.theme)
	if (options.theme === null || index >= themes.length-1 || index < 0) {
		options.theme = themes[0];
	}
	else {
		index ++;
		options.theme = themes[index];
	}
	changeTheme();
	resizeCanvas();
}
