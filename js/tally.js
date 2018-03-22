
//define variables
let canvasWidth = 1024;
let canvasHeight = 768;
//tracking mouse click
let countMouse = 0;
// space between the tally marks
let tallySpace = 20;
// space between the tally groups
let groupSpace = 150;
// tally groups per row
let rowLenght = 6;
// tallys per group
let groupLength = 5;
// position to start horizontally
let originX = 100;
// position to start vertically
let originY = 130;
// how long each Tally is
let tallyLength = 50;
// height of the rows
let rowHeight = 120;

//create the canvas 
function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

//function for mouse event
function mousePressed(){
	countMouse++;
}

function keyPressed() {
	countMouse=0;
}


//drawing function
function draw() {
	clear();
	background(0);
	//set the color the same as the site's background
	stroke(60,58,112);
	strokeWeight(1);
	textSize(50);
	fill(60,58,112);
	// display the number of clicks
	text(countMouse, canvasWidth-100, canvasHeight-30);

	//compute how many groups we have
	let groups = int(countMouse / groupLength);
	let remainder = countMouse % groupLength;
	if (remainder > 0){
		groups = groups + 1;
	}
	//compute how many rows
	let rows = int(groups / rowLenght);
	remainder = groups % rowLenght;
	if (remainder > 0) {
		rows = rows + 1;
	}
	//draw the Tally lines using nested loops
	strokeWeight(5);
	for (let r = 0; r < rows; r++) {
		let rowLimit = rowLenght;
		if (groups - r * rowLenght < rowLenght) {
			rowLimit = groups - r * rowLenght;
		}
		for (let g = 0; g < rowLimit; g++) {
			let tallyLimit = groupLength; 
			if (countMouse - r * rowLenght * groupLength - g * groupLength < groupLength){
				tallyLimit = countMouse - r * rowLenght * groupLength - g * groupLength;
			}
			for (let t = 0; t < tallyLimit; t++) {
				let x1 = originX + g * groupSpace + t * tallySpace;
				let y1 = originY + r * rowHeight;
				let x2 = x1;
				let y2 = y1 - tallyLength;
				// select the 5th tally and make it diagonal
				if (t == groupLength - 1) {
					x1 = x1 - groupLength * tallySpace;

				}
				line(x1, y1,
					 x2, y2);
			}
		}
	}
}


