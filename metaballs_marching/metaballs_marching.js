let width;
let height;
let divisionSize;
let halfDiv;
let ballArray;
let balls;

/* function preload() {
	myFont = loadFont('../paladin.ttf');
} */

function setup() {
	width = 1000;
	height = 900;
	divisionSize = 8;
	halfDiv = divisionSize/2;
	
	balls = 6; 
	createCanvas(width, height);
	
	ballArray = new Array();
	for (i = 0; i < balls; i++) {
		ballArray.push(new Metaball());
	}
}

function draw() {
	background(0);
	
	// the maximum distance possible to the center
	//maxDist = sqrt((centerX * centerX) + (centerY * centerY));
	//maxDist = dist(0, 0, width/2, height/2) / 1.5;
	
	// iterate through all equal divisionSize
	for (i = 0; i < width; i += divisionSize) {
		for (j = 0; j < height; j += divisionSize) {
			// apply transformation to cube around current pos
			// "marching squares" clockwise from top left
			distArray = [0, 0, 0, 0];
			for (b = 0; b < balls; b++) {
				distArray[0] += (ballArray[b].radius * ballArray[b].radius) /
					(((i - ballArray[b].x) * (i - ballArray[b].x)) +
					((j - ballArray[b].y) * (j - ballArray[b].y)));
					
				distArray[1] += (ballArray[b].radius * ballArray[b].radius) /
					(((i + divisionSize - ballArray[b].x) * (i + divisionSize - ballArray[b].x)) +
					((j - ballArray[b].y) * (j - ballArray[b].y)));
					
				distArray[2] += (ballArray[b].radius * ballArray[b].radius) /
					(((i + divisionSize - ballArray[b].x) * (i + divisionSize - ballArray[b].x)) +
					((j + divisionSize - ballArray[b].y) * (j + divisionSize - ballArray[b].y)));
				
				distArray[3] += (ballArray[b].radius * ballArray[b].radius) /
					(((i - ballArray[b].x) * (i - ballArray[b].x)) +
					((j + divisionSize - ballArray[b].y) * (j + divisionSize - ballArray[b].y)));		
			}
			
			// floor to 1 or 0
			for (d = 0; d < 4; d++) {
				if (distArray[d] >= 1) distArray[d] = 1;
				else distArray[d] = 0;
			
			}
			
			// color
			stroke((i/width) * 255, 255, (j/height) * 255);
			
			// convert to decimal and draw lines
			// the values of the lines are constant
			switch(parseInt(distArray.join(''), 2)) {
				case 1:
				case 14:
					line(i, j + halfDiv, i + halfDiv, j + divisionSize);
					break;
				case 2:
				case 13:
					line(i + halfDiv, j + divisionSize, i + divisionSize, j + halfDiv);
					break;
				case 3:
				case 12:
					line(i, j + halfDiv, i + divisionSize, j + halfDiv);
					break;
				case 4:
				case 11:
					line(i + halfDiv, j, i + divisionSize, j + halfDiv);
					break;
				case 5:
					line(i + halfDiv, j + divisionSize, i + divisionSize, j + halfDiv);
					line(i, j + halfDiv, i + halfDiv, j);
					break;
				case 6:
				case 9:
					line(i + halfDiv, j, i + halfDiv, j + divisionSize);
					break;
				case 7:
				case 8:
					line(i, j + halfDiv, i + halfDiv, j);
					break;
				case 10:
					line(i, j + halfDiv, i + halfDiv, j + divisionSize);
					line(i + halfDiv, j, i + divisionSize, j + halfDiv);
					break;
			}
		}
	}
	
	// move them balls
	for (b = 0; b < balls; b++) {
		ballArray[b].move();
		ballArray[b].bounds();
	}
}

class Metaball {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.radius = random(30, 60);
		// if instantiated outside of box move 1 radius in
		if (this.x >= width - this.radius) this.x -= this.radius;
		if (this.x < this.radius) this.x += this.radius;
		if (this.y >= height - this.radius) this.y -= this.radius;
		if (this.y < this.radius) this.y += this.radius;
		
		this.dx = random(1, 5);
		this.dy = random(1, 5);
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