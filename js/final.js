
//Credits and Reference: this game uses images from openclipart.org by author sixsixfive
  // https://openclipart.org/detail/211679/matticonsbookmarknew
  // https://openclipart.org/detail/211678/matticonsbookmarkminus
  // https://openclipart.org/detail/211677/matticonsbookmarkadd

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

//give the current number of milliseconds
function now() {
  return new Date().getTime(); 
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
      this.x = Math.round(this.speed * mouseX + (1 - this.speed) * this.x);
      this.y = Math.round(this.speed * mouseY + (1 - this.speed) * this.y);
      image(img, this.x, this.y, this.size, this.size);
    }
  };
}

//objects that appear
function Item(){
//define all possible types
  this.types = [
    {name: "hazard", duration: 3, image:"minus.png", size: 42, points: -10},
    {name: "gear", duration: 5, image:"plus.png", size: 42, points: 5},
    {name: "gearPlus", duration: 5, image:"star.png", size: 69, points: 10}, 
  ];
  //probability to display
  let typeSelection = [0,0,1,1,2];
  this.typeInd = typeSelection[Math.round(Math.random()*(typeSelection.length-1))];
  console.log("New item made" + this.typeInd);
  
  this.attr = this.types[this.typeInd];
  this.visible = true;
  this.deadline = now() + this.attr.duration*1000;
  //draw shape at random position
  this.x = Math.floor(Math.random() * (width-this.attr.size));
  this.y = Math.floor(Math.random() * (height-this.attr.size));
 
  this.draw = function() {
    //console.log("image at " + this.x + ", " + this.y);
    let img = createImg("img/" + this.attr.image);
    img.hide();
    image(img, this.x, this.y, this.attr.size, this.attr.size);
    // loadImage("img/" + this.attr.image, function(img){
    //   console.log("Image loaded here");
    //   console.log(img);
    //   image(img, this.x, this.y);      
    // }.bind(this), function(err){
    //   console.log("Error loading Image");
    //   console.log(err);
    // });
    // rect(this.x, this.y, this.attr.size, this.attr.size);
  };
}

//declare object that follows mouse and objects that appear randomly
let speed = 0.05;
let size = 50;
let maxItems = 15;
let collector = new Follower(50,.05);
let collectibles = [];


//drawing function
function draw() {
  background(50);
  collector.draw();
  if (collectibles.length < maxItems){
    collectibles.push(new Item())
  }
  for(i in collectibles) {
    if(collectibles[i].deadline < now()) {
      collectibles.splice(i, 1);
    };
    collectibles[i].draw();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(70,137,161);
}