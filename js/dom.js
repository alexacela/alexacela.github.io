//define variables
let dropzone;

//create the canvas 
function setup() {

//Requirement: full-screen P5 sketch running as a background canvas behind web page elements
  let canvas = createCanvas(windowWidth, windowHeight);

//Requirement: position() an element on the page using P5
  canvas.position(0,0);

//Requirement: style() a DOM element with CSS from within P5
  canvas.style("z-index", "-1");

//Requirement: accept a file into the DOM and/or sketch via drag / drop
  dropzone = select("#dropZone");
// citation: initial idea from from Dan Shiffman p5js drag & drop file tutorial, but modified 
// to include adaptation from user GoToLoop on Processing.org forum. Details at link below:
// https://forum.processing.org/two/discussion/24750/p5js-drag-n-drop-hover-not-working-why
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
  unhighlight();
  this.file = file;
  //Requirement: create an element BESIDES a canvas element using P5
  this.img = createImg(file.data);
  this.img.size(150, 150);

  //Requirement: element-specific event handler and callback function
  this.img.mousePressed(function(){
    console.log(this.file.name + " pressed");
    collector = new Follower(size, speed, this.img);
    this.img.remove();
  }.bind(this));
}

//object following mouse
function Follower(size, speed, img=null) {
  this.x = 0;
  this.size = size;
  this.speed = speed;
  this.y = 0;
  this.draw = function() {
    if(img){
      this.x = this.speed * mouseX + (1 - this.speed) * this.x;
      this.y = this.speed * mouseY + (1 - this.speed) * this.y;
      image(img, this.x, this.y);
    }
  };
}

//declare object that follows mouse
let speed = 0.05;
let size = 50;
let collector = new Follower(50,.05);




//drawing function
function draw() {
  background(0);
  collector.draw();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(70,137,161);
}