let lines = [];
let points = [];

let lineDefs;
let numPoints = 100;

function mapX(x) {
	return map(x, -1, 1, 0, width);
}

function mapY(y) {
	return map(y, -1, 1, height, 0);
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	lineDefs = [
		{
			f: function (x) { return 1 * x + 0.5; },
			// [Top Color, Bottom Color]
			colors: [color(255, 0, 0), color(0, 255, 0)]
		},
		{
			f: function (x) { return 2 * x - 1; },
			// [Top Color, Bottom Color]
			colors: [color(0, 0, 255), color(255, 255, 0)]
		}
	];

	for (let i = 0; i < lineDefs.length; i++) {
		lines[i] = new Line(lineDefs[i]);
	}
	for (let i = 0; i < numPoints; i++) {
		points[i] = new Point(lines);
	}
}

function draw() {
	background(51)
	for (let i = 0; i < lineDefs.length; i++) {
		lines[i].draw();
	}
	for (let i = 0; i < points.length; i++) {
		points[i].draw();
	}
}
