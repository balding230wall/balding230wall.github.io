// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let circle = {
  circleDiameter: windowHeight,
  radiusDecay: 2
};


function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  fill("black");
  noStroke();
  circle(windowWidth/2, windowHeight/2, circle.circleDiameter);
  circle.circleDiameter = circle.circleDiameter - circle.radiusDecay;
}
