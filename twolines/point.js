function Point(lines) {
	this.x = random(-1, 1);
	this.y = random(-1, 1);
	this.r = 10;
	this.lineValues = [];
	this.color = color(0);

	let colorMap = [];

	for (let i = 0; i < lines.length; i++) {
		this.lineValues[i] = lines[i].getPositionValue(this.x, this.y);
		colorMap.push(lines[i].colors[this.lineValues[i]]);
	}

	// Reduce colors
	this.color = colorMap.shift();
	while (colorMap.length) {
		this.color = lerpColor(this.color, colorMap.shift(), 0.5);
	}

	this.draw = function() {
		noStroke();
		fill(this.color);
		ellipse(mapX(this.x), mapY(this.y), this.r);
	}
}