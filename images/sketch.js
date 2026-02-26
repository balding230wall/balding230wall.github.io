// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let pikachu;

function preload() {
  pikachu = loadImage("pikachu.avif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  image(pikachu, mouseX, mouseY, pikachu.width * 0.25, pikachu.height * 0.25);
  imageMode(CENTER);
}
