//define varialble for canvas
var canvasWidth = 1024;
var canvasHeight = 768;

var on = false;

function setup() {
   // Create the canvas 
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
	var colorLight = color(255, 255, 255);
	var colorDark = color(0,0,0);
	var fillColor;

	if(on){
		fillColor=colorLight;
	} else {
		fillColor=colorDark;
	}
	  background(fillColor);

 	//set variables
 	var strokeColor = color(0, 0, 0);
 	var strokeSoft = color(128, 128, 255);
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
		rect(x, y, width, height, 1);
		pop(); // Restore original state
	}
	// function to draw the button 
	function pattern(x, y) {
		push(); // Start a new drawing state
		fill(128, 128, 255, 10);
		stroke(strokeSoft);
		var width = 100;
		var height = 100;
		//move x y coordinates to center of rechtangle
		translate(-width/2, -height/2);
		//create button pattern
		for (var i = 0; i < 10; i ++) {
			rect(x, y, width, height, 0);
			rotate(PI/5);
		}
		var width = 150;
		var height = 150;
		translate(-width/2+0, -height/2);
		fill(255, 255, 255);
		rect(x, y, width, height);
		fill(0, 0, 0);
		noStroke();
		textSize(32);
		fill(0, 0, 0);
		text(' Click ! ', 25, 87);
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
	// function to draw the eyes
	function eye(x, y, dia){
        push();
        strokeWeight(dia/10);
        fill(255,255,255);
        stroke(0,0,0);
        ellipse(x, y, dia, dia);
        fill(0,0,0);
        translate(
            max(-dia/6, min(dia/6, mouseX-x)),
            max(-dia/6, min(dia/6, mouseY-y)));
        ellipse(x, y, dia/2, dia/2);
        pop();
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

	push(); // Start a new drawing state
	translate(canvasWidth-150, 10+canvasHeight/2);
	pattern(0,0);
	pop(); // Restore original state

	eye(-20+canvasWidth/2, -200+canvasHeight/2, 35);
    eye(20+canvasWidth/2, -200+canvasHeight/2, 35);

}

//new function for mouse event
function mousePressed(){
	on = !on;
}
