let lines = [];
let points = [];

let lineDefs;
let numPoints = 2000;

let neuralNetwork;
let learningRate = 0.3;

let pMaxPoints;
let pRightGuesses;
let pGuessPercent;
let pFrameCount;

let finished = false;

function mapX(x) {
	return map(x, -1, 1, 0, width);
}

function mapY(y) {
	return map(y, -1, 1, height, 0);
}

function setup() {
	createCanvas(windowWidth, windowHeight - 40);

	pMaxPoints = createP("Number of Points: " + numPoints);
	pMaxPoints.style("width", (windowWidth / 4 - 5) + "px");

	pRightGuesses = createP("Right guesses: 0");
	pRightGuesses.style("width", (windowWidth / 4 - 5) + "px");

	pGuessPercent = createP("Percent: 0%");
	pGuessPercent.style("width", (windowWidth / 4 - 5) + "px");

	pFrameCount = createP("Frame Number: " + frameCount);
	pFrameCount.style("width", (windowWidth / 4 - 5) + "px");

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
		},
		{
			f: function (x) { return 0.5 * x - 0.5 },
			// [Top Color, Bottom Color]
			colors: [color(255, 0, 255), color(0, 255, 255)]
		}
	];

	let numHiddenNeurons = 2 + lineDefs.length;
	neuralNetwork = new synaptic.Architect.Perceptron(2, numHiddenNeurons, lineDefs.length);

	for (let i = 0; i < lineDefs.length; i++) {
		lines[i] = new Line(lineDefs[i]);
	}
	for (let i = 0; i < numPoints; i++) {
		points[i] = new Point(lines);
	}

	//frameRate(1);
}

function draw() {
	let rightGuesses = 0;

	background(51);

	for (let i = 0; i < lineDefs.length; i++) {
		lines[i].draw();
	}

	for (let i = 0; i < points.length; i++) {
		points[i].draw();

		let guess = neuralNetwork.activate([points[i].x, points[i].y]);
		if (points[i].drawGuess(guess)) {
			rightGuesses++;
		}

		neuralNetwork.propagate(learningRate, points[i].lineValues);
	}

	let perc = 100 * rightGuesses / numPoints;

	if (!finished) {
		pRightGuesses.html("Right guesses: " + rightGuesses);
		pFrameCount.html("Frame Number: " + frameCount);

		pGuessPercent.html("Percent: " + perc + "%");
	}

	if (perc == 100) {
		finished = true;
	}
}
