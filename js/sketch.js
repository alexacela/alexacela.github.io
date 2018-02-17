
//define varialbles for canvas
let canvasWidth = 1024;
let canvasHeight = 768;

//define variables for object rotation
let on = false;
let rotation = 0.1;

//create the canvas 
function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

//function for mouse event
function mousePressed(){
	on = !on;
}
//declaring a custom function for a square shape to move at different speeds according to the mouse horizontal position
function Follower(size, speed, y) {
	this.x = 0;
	this.size = size;
	this.speed = speed;
	this.y = y;
	this.draw = function() {
		push();
		this.x = this.speed * mouseX + (1 - this.speed) * this.x;
		fill(0, 0, 0);
		rect(this.x, this.y, this.size, this.size);
		pop();
	}
}

//instantiate the squares that follows mouse horizontaly on the lower canvas like moving pebblles 
let pebble1 = new Follower(10,.1,600);
let pebble2 = new Follower(15,.15,620);
let pebble3 = new Follower(20,.25,640);


//define drawing function
function draw() {
	let colorLight = color(255, 255, 255);
	let colorDark = color(0,0,0);
	let fillColor;

	//conditional for changing background color on mouse event
	if(on){
		fillColor=colorLight;
	} else {
		fillColor=colorDark;
	}
	  background(fillColor);

 	//set drawing variables
 	let strokeColor = color(0, 0, 0);
 	let strokeSoft = color(111, 95, 209);
 	let strokeWidth = 10;
 	strokeWeight(strokeWidth); 



	// transparent button 
	function button() {
		//instantiate the button transparent section as object with properties
		let section = {
			width: 100,
			height: 100, 
			corner: 5,
			fColor: color(128,128,225,80),
			stColor: strokeSoft 
		};
		push(); // start a new drawing state
		fill(section.fColor);
		stroke(section.stColor);

		//move x y coordinates to center of rechtangle
		translate(-section.width/2, -section.height/2);
		//create button pattern using a for loop
		for (let i = 0; i < 10; i ++) {
			rect(0, 0, section.width, section.height, section.corner);
			rotate(PI/5);
		}
		//instantiate the button non-transparent top surface
		let surface = {
			width: 150,
			height: 150,
			corner: 5,
			fColor: colorLight,
			stColor: strokeSoft
		};
		fill(surface.fColor);
		stroke(surface.stColor);
		//move x y coordinates to center of surface
		translate(-surface.width/2+0, -surface.height/2); 
		rect(0, 0, surface.width, surface.height, surface.corner);


		//instantiate the button text
		let label = {
			size: 32,
			fColor: colorDark,
			text: ' Click! '
		}
		fill(label.fColor);
		noStroke();
		textSize(label.size);
		text(label.text, 25, 87);
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
        //eyeball area
        strokeWeight(dia/10);
        fill(255,255,255);
        stroke(0,0,0);
        ellipse(x, y, dia, dia);
        //black eyeball follows the mouse, but remains in the eyeball area
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
    for (let i = 0; i < 100; i ++) {
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
    for (let i = 0; i < 100; i ++) {
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
 	//call the horizontal moving pebbles on the lower side of canvas
	pebble1.draw();
	pebble2.draw();
	pebble3.draw();
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
	eye(canvasWidth/2-20, canvasHeight/2-200, 35);
    eye(canvasWidth/2+20, canvasHeight/2-200, 35);

	//call the function to draw and position the button
	push(); // start a new drawing state
	translate(canvasWidth-150, canvasHeight/2+10);
	button();
	pop(); // restore original state

}

