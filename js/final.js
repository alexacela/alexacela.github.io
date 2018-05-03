
//Credits and Reference: this game uses images from openclipart.org by author sixsixfive
  // https://openclipart.org/detail/211679/matticonsbookmarknew
  // https://openclipart.org/detail/211678/matticonsbookmarkminus
  // https://openclipart.org/detail/211677/matticonsbookmarkadd

//define variables
let dropzone;
let scoreHtml;

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
  scoreHtml = select("#score");
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
  this.points = 0;
  this.draw = function() {
    this.x = Math.round(this.speed * mouseX + (1 - this.speed) * this.x);
    this.y = Math.round(this.speed * mouseY + (1 - this.speed) * this.y);
  
    if(img){
      image(img, this.x, this.y, this.size, this.size);
    }
  };

  this.touches = function(pos, size) {
    // console.log("item coord: " + pos)
    touchX = (this.x + size >= pos[0]) & (this.x <= pos[0] + size);
    touchY = (this.y + size >= pos[1]) & (this.y <= pos[1] + size);
    // console.log("item coord: " + pos + " touchX: " + touchX + "touchY: " + touchY)
    return touchX & touchY;
  }

  this.collect = function(item) {
    if (typeof item !== 'undefined'){
      let pos = item.getPos();
      let size = item.getSize();
      let points = item.getPoints();
      if (this.touches(pos, size)) {
        this.points += points;
        item.collect();
      }
    }
  }
}

//level object
function Level(duration, pointTh){
  this.dur = duration * 1000; //store in milisec so it works with now()
  this.pointTh = pointTh;
  this.startTime = now();
  // know how much time is left
  this.getTimeRemaining = function() {
    let remaining = this.dur - (now() - this.startTime);
    if (remaining < 0) {
      return 0; 
    } else {
      return remaining;
    }
  }
  //win or lose
  this.getWin = function(points) {
    if (this.getTimeRemaining() < 0) {
      return points >= this.pointTh;
    } else {
      return false;
    }
  }
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
  // console.log("New item made" + this.typeInd);
  
  this.attr = this.types[this.typeInd];
  this.done = false;
  this.deadline = now() + this.attr.duration*1000;
  //draw shape at random position
  this.x = Math.floor(Math.random() * (width-this.attr.size));
  this.y = Math.floor(Math.random() * (height-this.attr.size));
 
 //get  size and position of item
  this.getSize = function() {
    return this.attr.size;
  }

  this.getPoints = function() {
    return this.attr.points;
  }

  this.getPos = function() {
    return [this.x, this.y];
  }

  this.isDone = function() {
    if (!this.done) {
      this.done = now() > this.deadline;
    }
    return this.done;
  }

  this.collect = function() {
    this.done = true;
  }

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
let maxItems = 2;
let collector = new Follower(50,.05);
let collectibles = [];


//drawing function
function draw() {
  background(50);
  collector.draw();
  //draws the items and keeps drawing till enough items
  if (collectibles.length < maxItems){
    collectibles.push(new Item())
  }
  for(i in collectibles) {
    //erases expired items
    if(collectibles[i].isDone()) {
      collectibles.splice(i, 1);
    };
    collector.collect(collectibles[i]);
    if(typeof collectibles[i] !== 'undefined'){
       collectibles[i].draw();   
     }
  }
// console.log("points: " + collector.points);
  scoreHtml.html(collector.points);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(70,137,161);
}