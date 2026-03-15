// Cool Spiral Animation
// Chuyan Wang
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let circleOne = {
  circleDiameterOne: 0,
  radiusDecayOne: 10
};

let circleTwo = {
  circleDiameterTwo: 0,
  radiusDecayTwo: 10
};

let curveRotation = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  circleOne.circleDiameterOne = windowHeight + 100;
  circleTwo.circleDiameterTwo = circleOne.circleDiameterOne - 25;

}

function draw() {
  background(0);
  animateRing();
  animateCurve();
}

function animateRing() {
  fill("#BC13FE");
  noStroke();
  circle(windowWidth/2, windowHeight/2, circleOne.circleDiameterOne);
  
  fill("black");
  circle(windowWidth/2, windowHeight/2, circleTwo.circleDiameterTwo);

  if (circleOne.circleDiameterOne >= 0){
    circleOne.circleDiameterOne = circleOne.circleDiameterOne - circleOne.radiusDecayOne;
  }
  else{
    circleOne.circleDiameterOne = windowHeight + 100;
  }

  if (circleTwo.circleDiameterTwo >= 0){
    circleTwo.circleDiameterTwo = circleTwo.circleDiameterTwo - circleTwo.radiusDecayTwo;
  }
  else{
    circleTwo.circleDiameterTwo = circleOne.circleDiameterOne - 25;
  }
}

function animateCurve() {
  push();
  translate(windowWidth/2, windowHeight/2);
  rotate(curveRotation);

  stroke("#00F7FF");
  strokeWeight(5);
  noFill();
  curve(0, windowHeight * -1, windowWidth/2 * -1, windowHeight/2 * -1, 0, 0, windowWidth/2, windowHeight/4 * -1);
  curve(0, windowHeight * -1, windowWidth/2, windowHeight/2 * -1, 0, 0, windowWidth/2 * -1, windowHeight/4 * -1);
  curve(0, windowHeight * 2, windowWidth/2, windowHeight/2, 0, 0, windowWidth/2 * -1, windowHeight/4);
  curve(0, windowHeight * 2, windowWidth/2 * -1, windowHeight/2, 0, 0, windowWidth/2, windowHeight/4);

  pop();

  curveRotation = curveRotation + 0.05;
}