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
		1: "#a8efd7",
		2: "#ffffff",
		3: "#191668",
		color: "#54e1b1",
		points: "#dfefff",
		locked: "#bf8f8f",
		background: "#12674a",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
	},
	sky: {
		1: "#404040",
		2: "#7c7c7c",
		3: "#5f6f7f",
		color: "#404040",
		points: "#000000",
		locked: "#c4a7b3",
		background: "#87ceeb",
		background_tooltip: "rgba(255, 255, 255, 0.25)",
	},
	lava: {
		1: "#bfdfff",
		2: "#8fa7bf",
		3: "#b5332e",
		color: "#bfdfff",
		points: "#dfefff",
		locked: "#c4a7b3",
		background: "#f7342b",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
	},
	light: {
		1: "#404040",//Branch color 1
		2: "#7c7c7c",//Branch color 2
		3: "#3f3e3e",//Branch color 3
		color: "#404040",
		points: "#000000",
		locked: "#333333",
		background: "#E2EAF4",
		background_tooltip: "rgba(255, 255, 255, 0.25)",
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
