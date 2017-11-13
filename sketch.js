const PADDING_RIGHT = 30;
const WIDTH = 30;
const earthquakes = [
	{
		"location": "Mariana Islands",
		"magnitude": 4.4,
		"color": "#66c"
	},
	{
		"location": "Indonesia",
		"magnitude": 6.1,
		"color": "#c66"
	},
	{
		"location": "Chile",
		"magnitude": 8.3,
		"color": "#6c6"
	}
];

function setup() {
	createCanvas(windowWidth - 100, windowHeight - 100);
	// background(200, 200, 200);
	noLoop();
}

function draw() {
	// title
	fill(0);
	textSize(30);
	textAlign(CENTER);
	text("Earthquake data visualisations", 600, 50);

	draw1Bar();
	draw1Plot();
	draw1Houses();
}

function _drawHouse(color, row, count, value=1) {
	const WIDTH = 20;
	const CURRENT_WIDTH = 20 * value;
	const HEIGHT = 26;
	const ROW_PADDING = 12;
	const COL_PADDING = 3;
	fill(color);
	beginShape();
	if (value === 1) {
		vertex(count * (WIDTH + COL_PADDING) + CURRENT_WIDTH / 2, row * (HEIGHT + ROW_PADDING));
		vertex(count * (WIDTH + COL_PADDING) + CURRENT_WIDTH, row * (HEIGHT + ROW_PADDING) + HEIGHT / 2);
	} else {
		vertex(
			count * (WIDTH + COL_PADDING) + CURRENT_WIDTH,
			row * (HEIGHT + ROW_PADDING) + HEIGHT / 2 - (HEIGHT * value));
	}
	vertex(count * (WIDTH + COL_PADDING) + CURRENT_WIDTH, row * (HEIGHT + ROW_PADDING) + HEIGHT);
	vertex(count * (WIDTH + COL_PADDING), row * (HEIGHT + ROW_PADDING) + HEIGHT);
	vertex(count * (WIDTH + COL_PADDING), row * (HEIGHT + ROW_PADDING) + HEIGHT / 2);
	endShape();
}

function _drawHouseChart(row, data) {
	for (let i = 1; i < data.magnitude; i++) {
		_drawHouse(data.color, row, i);
	}
	let frac = data.magnitude - Math.trunc(data.magnitude);
	if (frac > 0) {
		_drawHouse(data.color, row, Math.floor(data.magnitude) + 1, frac);
	}
}

function draw1Houses() {
	translate(0, 140);
	const SCALE = 40;
	for (let [i, e] of earthquakes.entries()) {
		_drawHouseChart(i, e);
	}
}

function draw1Plot() {
	translate(500, -150);
	const SCALE = 40;

	noStroke();
	for (let [i, e] of earthquakes.entries()) {
		fill(color(e.color), 10);
		ellipse(e.magnitude * SCALE, 0, 12, 12);
	}

	stroke(0);
	fill(0);
	line(
		0,
		0,
		10 * SCALE,
		0
	);
	textSize(10);
	for (let i = 0; i <= 8; i += 2) {
		let markerX = i * SCALE;
		stroke(0);
		line(markerX, -3, markerX, 3);
		if (i > 0) {
			noStroke();
			text(i, markerX, 20);
		}
	}
	stroke(0);
	line(10 * SCALE - 3, -3, 10 * SCALE, 0);
	line(10 * SCALE - 3, 3, 10 * SCALE, 0);
	noStroke();
	text("magnitude", 10 * SCALE + 12, 3);
}

function draw1Bar() {
	const SCALE = 20;
	translate(100, 350);
	stroke(0);

    // x axis
	line(
		- PADDING_RIGHT * 1.5,
		0,
		+ earthquakes.length * (WIDTH + PADDING_RIGHT),
		0
	);
    // y axis
	line(
		- PADDING_RIGHT,
		PADDING_RIGHT / 2,
		- PADDING_RIGHT,
		0 - 10 * SCALE
	);
	textAlign(LEFT);
	noStroke();
	textSize(10);
	text("magnitude", -65, -10 * SCALE - 12);

    // scale
	fill(0);
	for (let i = 2; i <= 8; i += 2) {
		let markerY = - i * SCALE;
		text(i,	- PADDING_RIGHT * 1.5, markerY);
	}

    // bars & legend
	rectMode(CORNERS);
	textSize(12);
	for (let [i, e] of earthquakes.entries()) {
		fill(color(e.color));
		rect(
			i * (WIDTH + PADDING_RIGHT),
			0,
			WIDTH + i * (WIDTH + PADDING_RIGHT),
			- e.magnitude * SCALE
		);
		text(
			e.location,
			earthquakes.length * (WIDTH + PADDING_RIGHT) + PADDING_RIGHT * 4,
		 	- 40 - i * 30
		);
	}

    // lines
	stroke(255);
	for (let i = 2; i <= 8; i += 2) {
		let markerY = - i * SCALE;
		line(
		 	- PADDING_RIGHT,
			markerY,
			earthquakes.length * (WIDTH + PADDING_RIGHT),
			markerY
		)
	}
}
