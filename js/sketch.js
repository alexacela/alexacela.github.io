
//define varialbles for canvas
var canvasWidth = 1024;
var canvasHeight = 768;

//define variables for object rotation
var on = false;
var rotation = 0.1;

//create the canvas 
function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

//new function for mouse event
function mousePressed(){
	on = !on;
}

//define drawing function
function draw() {
	var colorLight = color(255, 255, 255);
	var colorDark = color(0,0,0);
	var fillColor;

	//conditional for changing background color on mouse event
	if(on){
		fillColor=colorLight;
	} else {
		fillColor=colorDark;
	}
	  background(fillColor);

 	//set drawing variables
 	var strokeColor = color(0, 0, 0);
 	var strokeSoft = color(111, 95, 209);
 	var strokeWidth = 10;
 	strokeWeight(strokeWidth); 

	// function to draw the button 
	function button(x, y) {
		push(); // start a new drawing state
		//set color and object transparency
		fill(128, 128, 255, 80);
		stroke(strokeSoft);
		var width = 100;
		var height = 100;
		//move x y coordinates to center of rechtangle
		translate(-width/2, -height/2);
		//create button pattern using a for loop
		for (var i = 0; i < 10; i ++) {
			rect(x, y, width, height, 5);
			rotate(PI/5);
		}
		//create button top surface
		var width = 150;
		var height = 150;
		translate(-width/2+0, -height/2);
		fill(255, 255, 255);
		rect(x, y, width, height);
		fill(0, 0, 0);
		noStroke();
		//add button text
		textSize(32);
		fill(0, 0, 0);
		text(' Click ! ', 25, 87);
		pop(); // restore original state
	}

	// function to draw the body
	function body(x, y, c) {
		push(); // start a new drawing state
		fill(c);
		stroke(strokeColor);
		// draw a rectangle with rounded corners, each having a radius of 20.
		var width = 200;
		var height = 200;
		//move x y coordinates to center of rechtangle
		translate(-width/2, -height/2);
		rect(x, y, width, height, 1);
		pop(); // restore original state
	}

	// function to draw the arm
	function arm(x, y, c) {
		push(); // start a new drawing state
		fill(c);
		stroke(strokeColor);
		// draw a smaller rectangle with rounded corners, each having a radius of 20.
		var width = 50;
		var height = 150;
		//move x y coordinates to top of rechtangle
		translate(-width/2, 0);
		rect(x, y, width, height, 10);
		pop(); // restore original state
	}

	// function to draw the leg
	function leg(x, y, c) {
		push(); // start a new drawing state
		fill(c);
		stroke(strokeColor);
		// draw a smaller rectangle with rounded corners, each having a radius of 20.
		var width = 80;
		var height = 180;
		//move x y coordinates to top of rechtangle
		translate(-width/2, 0);
		rect(x, y, width, height, 10);
		pop(); // restore original state
	}

	// function to draw the head
	function head(x, y, c) {
		push(); // start a new drawing state
		fill(c);
		stroke(strokeColor);
		// draw an elipse
		var width = 100;
		var height = 200;
		//move x y coordinates to bottom of elipse
		translate(0, -width/2);
		ellipse(x, y, width, height);
		pop(); // restore original state
	}

	// function to draw the nose
	function nose(x, y, c) {
		push(); // start a new drawing state
		fill(c);
		stroke(strokeColor);
		// draw an triangle
		var width = 30;
		//move x y coordinates to top of triangle
		translate(0, width/2);
		triangle(x-width/2,y,x+width/2,y,x,y+width*2);
		pop(); // restore original state
	}
	// function to draw the eyes and set the follow mouse event
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

	// function to draw the windmill top
	function windmillTop(x, y){
	push();
	translate(-width/2+200, -height/2+200);
	// add movement to the windmill top
	rotate(rotation);
	rotation = 0.01+rotation;
    strokeWeight(strokeWidth-5); 
    // create windmill top pattern using vertex shapes with no fill
    for (var i = 0; i < 100; i ++) {
	    noFill();
	    beginShape();
		vertex(x+30, y+20);
		vertex(x+85, y+20);
		vertex(x+85, y+75);
		vertex(x+30, y+75);
		endShape();
		rotate(PI/5);
		}
 	push(); // start a new drawing state
 	// create windmill top detail using vertex points
 		stroke(strokeSoft);
    for (var i = 0; i < 100; i ++) {
	    beginShape(POINTS);
		vertex(x, y-10);
		vertex(x+55, y-10);
		vertex(x+55, y+45);
		vertex(x+0, y+45);
		endShape();
		rotate(PI/5);
		}
	pop(); // restore original state
	pop();
	} 

	//function for windmill base
	function windmill(x, y){
	noFill();
	strokeWeight(strokeWidth-5); 
	beginShape();
	vertex(x-0, y-93);
	vertex(x-40, y+165);
	vertex(x+150, y+165);
	vertex(x+110, y-90);
	endShape();
	}

 	// call the functions to draw the image robot, the windmill and the ground
 	line(0, 600, canvasWidth, 600);
	push(); // start a new drawing state
	translate(canvasWidth/2, canvasHeight/2);
	body(0, 0, fillColor);
	arm(-100,-100, fillColor);
	arm(100,-100, fillColor);
	leg(-40, 100, fillColor);
	leg(40, 100, fillColor);
	head(0, -100, fillColor);
	nose(0, -180, fillColor);
	windmillTop(50,0);
	windmill(-370,50);
	pop(); // restore original state

	//call the function to draw the eyes
	eye(-20+canvasWidth/2, -200+canvasHeight/2, 35);
    eye(20+canvasWidth/2, -200+canvasHeight/2, 35);

	//call the function to draw and position the button
	push(); // start a new drawing state
	translate(canvasWidth-150, 10+canvasHeight/2);
	button(0,0);
	pop(); // restore original state

}

