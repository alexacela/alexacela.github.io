//define varialble for canvas
var canvasWidth = 1024;
var canvasHeight = 768;

function setup() {
   // Create the canvas 
  createCanvas(canvasWidth, canvasHeight);
   // Set canvas color to dark grey
  background(50);
}

function draw() {
 

 	//set variables
 	var fillColor = color(255, 255, 255);
 	var strokeColor = color(0, 0, 0);
 	var strokeWidth = 10;
 	strokeWeight(strokeWidth); 

	// function to draw the body
	function body(x, y, c) {
		push(); // Start a new drawing state
		fill(c);
		stroke(strokeColor);
		// Draw a rectangle with rounded corners, each having a radius of 20.
		var width = 200;
		var height = 200;
		//move x y coordinates to center of rechtangle
		translate(-width/2, -height/2);
		rect(x, y, width, height, 10);
		pop(); // Restore original state
	}

	// function to draw the arm
	function arm(x, y, c) {
		push(); // Start a new drawing state
		fill(c);
		stroke(strokeColor);
		// Draw a smaller rectangle with rounded corners, each having a radius of 20.
		var width = 50;
		var height = 150;
		//move x y coordinates to top of rechtangle
		translate(-width/2, 0);
		rect(x, y, width, height, 10);
		pop(); // Restore original state
	}

	// function to draw the leg
	function leg(x, y, c) {
		push(); // Start a new drawing state
		fill(c);
		stroke(strokeColor);
		// Draw a smaller rectangle with rounded corners, each having a radius of 20.
		var width = 80;
		var height = 180;
		//move x y coordinates to top of rechtangle
		translate(-width/2, 0);
		rect(x, y, width, height, 10);
		pop(); // Restore original state
	}

	// function to draw the head
	function head(x, y, c) {
		push(); // Start a new drawing state
		fill(c);
		stroke(strokeColor);
		// Draw an elipse
		var width = 100;
		var height = 200;
		//move x y coordinates to bottom of elipse
		translate(0, -width/2);
		ellipse(x, y, width, height);
		pop(); // Restore original state
	}

	// function to draw the nose
	function nose(x, y, c) {
		push(); // Start a new drawing state
		fill(c);
		stroke(strokeColor);
		// Draw an triangle
		var width = 30;
		//move x y coordinates to top of triangle
		translate(0, width/2);
		triangle(x-width/2,y,x+width/2,y,x,y+width*2);
		pop(); // Restore original state
	}

 	// draw robot character
	push(); // Start a new drawing state
	translate(canvasWidth/2, canvasHeight/2);
	body(0, 0, fillColor);
	arm(-100,-100, fillColor);
	arm(100,-100, fillColor);
	leg(-40, 100, fillColor);
	leg(40, 100, fillColor);
	head(0, -100, fillColor);
	nose(0, -180, fillColor);
	pop(); // Restore original state
}
