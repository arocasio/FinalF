let xoff1=0.0;
let x1;
let pic;
var song;
var button;
var vol;
let stars = [];
let speed;
var volhistory = [];
let amt, startColor, newColor;

function toggleSong() {
  if(song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
  }
function preload() {
   song= loadSound('run.mp3');
  pic=loadImage('Planet.png')
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES);
  //button
  button=createButton('toggle');
  button.mousePressed(toggleSong);
  //music
  song.play();
   amp=new p5.Amplitude();
  
  //background
  startColor = color(255,255,255);
  newColor = color(random(255),random(255),random(255));
  amt = 0;
  background(startColor);

  // starfield
    function Star() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    
    this.display = function() {
      noStroke();
      fill(255);
      let sx = map(this.x / this.z, 0, 1, 0, width);
      let sy = map(this.y / this.z, 0, 1, 0, height);
      let r = map(this.z, 0, width, 12, 0);
      ellipse(sx, sy, r, r);
    }
    
    this.update = function() {
      this.z -= speed;
      
      if(this.z < 1) {
        this.z = width;
        this.x = random(-width, width);
        this.y = random(-height, height);}
    } 
  } 
  for(let i = 0; i < 500; i += 1) {
    stars[i] = new Star();}
} 

function draw() {
  
  //background
   background(lerpColor(startColor, newColor, amt));
  amt += 0.005;
  if(amt >= 1){
    amt = 0.0;
    startColor = newColor;
    newColor = color(random(255),random(255),random(255));}
    
  //Movement
  translate(width/2, height/2);
  speed = map(mouseX, 0, width, 2, 20);
  for(let i = 0; i < stars.length; i += 1) {
    stars[i].display();
    stars[i].update();
     x1 = noise(xoff1)*width/8 ;
   xoff1 = xoff1 + 0.002;
    
    //planet
   image(pic, (x1)-100,(height/50)-200);
   
    //amp
    vol= amp.getLevel();
    
    //Dipper
  fill('white')
    ellipse(width*(100/400)-400,height*(50/600)-200,vol*75);

  fill(vol*800,225,300);
    ellipse(width*(150/400)-400,height*(300/600)-200,vol*150);
  
  fill(vol*800,25,50,750)
  ellipse(width*(225/400)-400,height*(360/600)-200,vol*200);
  
 fill('rgb(136,201,198)');
    ellipse(width*(125/400)-400,height*(125/600)-200,vol*75);
  
  fill(vol*800,75,250);
  ellipse(width*(275/400)-400,height*(250/600)-200,vol*100);
  
   fill(vol*800)
    ellipse(width*(175/400)-400,height*(140/400)-200,vol*75);
  }
} 