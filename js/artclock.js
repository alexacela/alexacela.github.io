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
  stroke(190);
  strokeWeight(2);
  fill(60,58,112);

//variables for the counting
  let h = hour();
  let m = minute();
  let s = second();

  let hBin = h.toString(2);
  let mBin = m.toString(2);
  let sBin = s.toString(2);
  let size = 100;
  let on = color(255, 255, 255);
  let off = color(100, 100, 100);

  push();
  translate (250, 250);

  //hour 
  for (let i in hBin) {
    push();
    translate(i*size, 0);
    if(hBin[i]=='1'){
      fill(on);
    } else {
      fill(off);
    }
    rect(0, 0, size, size);
    pop();
  }

  //minutes
  for (let i in mBin) {
    push();
    translate(i*size, 1.5*size);
    if(mBin[i]=='1'){
      fill(on);
    } else {
      fill(off);
    }
    rect(0, 0, size, size);
    pop(); 
  }

    //seconds
  for (let i in sBin) {
    push();
    translate(i*size, 3*size);
    if(sBin[i]=='1'){
      fill(on);
    } else {
      fill(off);
    }
    rect(0, 0, size, size);
    pop();
  }
    pop();

  //design top white and gray squares
  for (let i = 0; i<10; i++) {
    push();
    translate(i*size+10, size-50);
    fill(on);
    if (i%3==0) {
      fill(off);
    }
    rect(0, 0, size, size);
    pop();
  }

 

}