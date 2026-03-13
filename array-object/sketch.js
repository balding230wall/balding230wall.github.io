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

let myCurve = {
  lastControlWidth: 0,
  lastControlHeightMultiplier: 1/4,
  firstControlHeightMultiplier: -1,
  firstXPoint: 0,
  firstYPoint: 0
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  circleOne.circleDiameterOne = windowHeight + 100;
  circleTwo.circleDiameterTwo = circleOne.circleDiameterOne - 25;

}

function draw() {
  background(0);
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
  
  let myCurve = {
    lastControlWidth: 0,
    lastControlHeightMultiplier: 1/4,
    firstControlHeightMultiplier: -1,
    firstXPoint: 0,
    firstYPoint: 0
  };




  stroke("#00F7FF");
  noFill();
  curve(windowWidth/2, windowHeight * -1, 0, 0, windowWidth/2, windowHeight/2, windowWidth, windowHeight * 1/4);
  curve(windowWidth/2, windowHeight * -1, windowWidth, 0, windowWidth/2, windowHeight/2, 0, windowHeight * 1/4);
  curve(windowWidth/2, windowHeight * 2, windowWidth, windowHeight, windowWidth/2, windowHeight/2, 0, windowHeight * 3/4);
  curve(windowWidth/2, windowHeight * 2, 0, windowHeight, windowWidth/2, windowHeight/2, windowWidth, windowHeight * 3/4);
}

function animateCurve(){
  let counter1 = 10;
  let counter2 = 0.5/(windowWidth/10);
  let counter3 = 2/(windowWidth/10);
  
  if (myCurve.lastControlWidth === windowWidth || myCurve.lastControlWidth === 0){
    counter1 *= -1;
  }
  myCurve.lastControlWidth += counter1;

  if (myCurve.lastControlHeightMultiplier === 1/4 || myCurve.lastControlHeightMultiplier === 3/4){
    counter2 *= -1;
  }
  myCurve.lastControlHeightMultiplier += counter2;

  if (myCurve.firstControlHeightMultiplier === 2 || myCurve.firstControlHeightMultiplier === -1){
    counter3 -1;
  }
}