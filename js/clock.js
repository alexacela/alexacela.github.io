//define variables
let canvasWidth = 1024;
let canvasHeight = 768;


//create the canvas 
function setup() {
  createCanvas(canvasWidth, canvasHeight);
}


//drawing function
function draw() {
	clear();
	background(0);

	//digital clock traits
	stroke(190);
	strokeWeight(2);
	textSize(50);
	fill(60,58,112);

	// digital clock display current hour in hh:mm:ss format 
	let h = hour();
	let m = minute();
	let s = second();
	text(nf(h, 2) + ':' + nf(m, 2) + ':' + nf(s, 2), 20, 50);

	push(); // start a new drawing state
	
	//variables for clock arms
	let handWidth = 14;
	let hourLength = 150;
	let minutesLength = 200;
	let secondsLength = 230;

	//move x y coordinates to center of canvas
	translate(canvasWidth/2, canvasHeight/2);
	
	//clock body
	stroke(190);
	rect(-260, -260, 520, 520, 100);
	strokeWeight(10);
	rect(-250, -250, 500, 500, 100);
	strokeWeight(2);

	//clock hour in 12h format
	push();
	rotate(2*PI*((h%12)/12 + m/720 + s/43200));
	rect(-handWidth/2, -hourLength, handWidth, hourLength);
	pop(); // restore original state

	//clock minutes
	push();
	rotate(2*PI*(m/60+s/3600));
	rect(-handWidth/2, -minutesLength, handWidth, minutesLength);
	pop();

	//clock seconds
	push();
	fill(190);
	rotate(2*PI*s/60);
	rect(-handWidth/4, -secondsLength, handWidth/2, secondsLength);
	pop();
}
