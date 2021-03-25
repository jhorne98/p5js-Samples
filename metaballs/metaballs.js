let width;
let height;
let ballArray;
let numBalls;

/* function preload() {
	myFont = loadFont('../paladin.ttf');
} */

function setup() {
	width = 200;
	height = 200;
	numBalls = 4; 
	createCanvas(width, height);
	
	ballArray = new Array();
	for (i = 0; i < numBalls; i++) {
		ballArray.push(new Metaball());
	}
}

function draw() {
	background(0);
	// the maximum distance possible to the center
	//maxDist = sqrt((centerX * centerX) + (centerY * centerY));
	maxDist = dist(0, 0, width/2, height/2) / 1.5;
	
	// iterate through all pixels
	for (i = 0; i < width; i++) {
		for (j = 0; j < height; j++) {
			// apply transformation based on each metaball position
			pointDist = 0
			for (b = 0; b < numBalls; b++) {
				pointDist += (ballArray[b].radius * ballArray[b].radius)/
					(((i - ballArray[b].x) * (i - ballArray[b].x)) +
					((j - ballArray[b].y) * (j - ballArray[b].y)));
			}
			
			if (pointDist >= 1) {
				// color can be fucked with
				stroke((i/width) * 255, (pointDist/2) * 255, (j/height) * 255);
				point(i, j);
			}
		}
	}
	
	// move them balls
	for (b = 0; b < numBalls; b++) {
		ballArray[b].move();
		ballArray[b].bounds();
	}
}

class Metaball {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.radius = random(10, 20);
		// if instantiated outside of box move 1 radius in
		if (this.x >= width - this.radius) this.x -= this.radius;
		if (this.x < this.radius) this.x += this.radius;
		if (this.y >= height - this.radius) this.y -= this.radius;
		if (this.y < this.radius) this.y += this.radius;
		
		this.dx = random(1, 2);
		this.dy = random(1, 2);
	}
	
	move() {
		this.x += this.dx;
		this.y += this.dy;
	}
	
	bounds() {
		if (this.x >= width - this.radius || this.x < this.radius) this.dx *= -1;
		if (this.y >= height - this.radius || this.y < this.radius) this.dy *= -1;
	}
}