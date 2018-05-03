
//Credits and Reference: this game uses images from openclipart.org by author sixsixfive
  // https://openclipart.org/detail/211679/matticonsbookmarknew
  // https://openclipart.org/detail/211678/matticonsbookmarkminus
  // https://openclipart.org/detail/211677/matticonsbookmarkadd

//define variables
let dropzone;
let scoreHtml;
let timeHtml;
let levelHtml;
let winHtml; 
let loseHtml;
let levelTotalHtml;
let scoreTotalHtml;

//create the canvas 
function setup() {

//full-screen P5 sketch running as a background canvas behind web page elements
  let canvas = createCanvas(windowWidth, windowHeight);

//position() an element on the page using P5
  canvas.position(0,0);

//style() a DOM element with CSS from within P5
  canvas.style("z-index", "-1");

//accept a file into the DOM and/or sketch via drag / drop
  dropzone = select("#dropZone");
// citation: initial idea from from Dan Shiffman p5js drag & drop file tutorial, but modified 
// to include adaptation from user GoToLoop on Processing.org forum. Details at link below:
// https://forum.processing.org/two/discussion/24750/p5js-drag-n-drop-hover-not-working-why
  dropzone.drop(gotFile).dragOver(highlight).dragLeave(unhighlight);
  scoreHtml = select("#score");
  timeHtml = select("#time");
  levelHtml = select("#level");
  winHtml = select("#win");
  loseHtml = select("#lose");
  levelTotalHtml = select("#levelTotal");
  scoreTotalHtml = select("#scoreTotal");
  winHtml.hide();
  loseHtml.hide();
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
  //create an element BESIDES a canvas element using P5
  this.img = createImg(file.data);
  // this.img.size(150, 150);

  //element-specific event handler and callback function
  this.img.mousePressed(function(){
    console.log(this.file.name + " pressed");
    collector = new Follower(size, speed, this.img);
    this.img.remove();
  }.bind(this));
}

//avatar object following mouse
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
    } else {
      mouseDecor(this.x, this.y, this.size);
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

// transparent avater mouse decoration 
function mouseDecor(x, y, size) {
  let corner = 5;
  let width = size / corner;
  let height = size / corner;
  fill(color(128,128,225,80));

  //move x y coordinates to center of rechtangle
  translate(x, y);
  //create avatar mouse decoration pattern using a for loop
  for (let i = 0; i < corner; i ++) {
    rect(0, 0, width, height, corner);
    rotate(PI/(corner/2));
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
    if (this.getTimeRemaining() > 0) {
      return points >= this.pointTh;
    }
    return false;
  }

  this.getPointTh = function() {
    return this.pointTh;
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
let maxItems = 10;
let maxPoints = 20;
let maxLevels = 4;
let curLevel = 0;
let collector = new Follower(50, 0.05);
let level = new Level(60, maxPoints);
let collectibles = [];


//drawing function
function draw() {
  background(50);
  //draw the items and keeps drawing till enough items
  if (collectibles.length < maxItems) {
    collectibles.push(new Item())
  }
  for(i in collectibles) {
    //erase expired items
    if(collectibles[i].isDone()) {
      collectibles.splice(i, 1);
    };
    collector.collect(collectibles[i]);
    if(typeof collectibles[i] !== 'undefined'){
       collectibles[i].draw();   
     }
  }
  collector.draw();

  //display UI
  levelTotalHtml.html(maxLevels + 1);
  levelHtml.html(curLevel + 1);
  scoreTotalHtml.html(level.getPointTh());
  scoreHtml.html(collector.points);
  timeHtml.html(int(level.getTimeRemaining()/1000));

  //game Logic
  if (level.getWin(collector.points)) {
    if (curLevel < maxLevels) {
      curLevel++;
      level = new Level(60, maxPoints * 2 * curLevel);
    } else {
      winHtml.show();
      noLoop();  
    }
  } else {
    if (level.getTimeRemaining() <= 0) {
      loseHtml.show();
      noLoop();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(70,137,161);
}