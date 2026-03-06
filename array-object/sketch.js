// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

ctx.fillStyle = "#4efd54";

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  let r = random(0, 255);
  let g = random(0, 255);
  let b = random(0, 255);
  
  for ( let i = windowHeight; i > 0; i--) {
    fill();
    noStroke();
    ctx.fill();
    circle(windowWidth/2, windowHeight/2, i);
  }
}
