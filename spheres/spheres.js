
function setup() {
	smooth();
	createCanvas(500, 500, WEBGL);
	createEasyCam();
	document.oncontextmenu = function() { return false; }
}

function draw() {
	background(250);
	
	normalMaterial();
	push();
	rotateY(frameCount * 0.01);
	sphere(100);
	pop();
	
	push();
	rotateY(frameCount * 0.01);
	translate(-170, 0, 0);
	sphere(30);
	
		push();
		rotateY(frameCount * 0.01);
		translate(-50, 0, 0);
		sphere(10);
		pop();
	
	pop();
}