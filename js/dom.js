//define variables
let dropzone;

//create the canvas 
function setup() {

//Requirement: full-screen P5 sketch running as a background canvas behind web page elements
  let canvas = createCanvas(windowWidth, windowHeight);

  canvas.position(0,0);
  canvas.style("z-index", "-1");

//Requirement: accept a file into the DOM and/or sketch via drag / drop
  dropzone = select("#dropZone");
  dropzone.drop(gotFile).dragOver(highlight).dragLeave(unhighlight);
}


function highlight(evt) {
  if (dropzone.class().search("highlight")<0){
    dropzone.addClass("highlight");
  }
  evt.preventDefault();
}

function unhighlight() {
  dropzone.removeClass("highlight");
}


function gotFile (file) {
  let img = createImg(file.data);
  img.size(150, 150);
  unhighlight();
}

//object following mouse
function Follower(size, speed) {
  this.x = 0;
  this.size = size;
  this.speed = speed;
  this.y = 0;
  this.draw = function() {
    push();
    this.x = this.speed * mouseX + (1 - this.speed) * this.x;
    this.y = this.speed * mouseY + (1 - this.speed) * this.y;
    fill(111, 95, 209);
    rect(this.x, this.y, this.size, this.size);
    pop();
  }
}

//declare object that follows mouse 
let collector = new Follower(20,.05);

//drawing function
function draw() {
  background(0);
  fill(60,58,112);
  collector.draw();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(70,137,161);
}