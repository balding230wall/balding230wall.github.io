// Cool Spiral Animation
// Chuyan Wang
// March 18, 2026
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

let circleThree = {
  circleDiameterThree: 0,
  radiusGrowthOne: 15
};

let circleFour = {
  circleDiameterFour: 0,
  radiusGrowthTwo: 15
};

let circleFive = {
  circleDiameterFive: 0,
  radiusGrowthThree: 15
};

let colorPalette = ["FF1900", "FF8800", "FFCC00", "FFFA00", "D8FF00","B6FF00", "00FF2E", "00FFA5", "00FFE1", "00DDFF", "057DF", "9800FF", "D400FF", "FF00E4", "FF008C"];

let myButton = {
  x: 0,
  y: 0,
  w: 200,
  h: 100,
};

let curveRotation = 0;

let button1 = false;
let button2 = false;

let numberOfSegments = 40;
let numberOfArms = 10;

let colorGradient = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  circleOne.circleDiameterOne = windowHeight + 100;
  circleTwo.circleDiameterTwo = circleOne.circleDiameterOne - 25;
  circleFour.circleDiameterFour = windowHeight/3;
  circleFive.circleDiameterFive = windowHeight * 2/3;

  myButton.x = windowWidth/2;
  myButton.y = windowHeight/2 - 100;

}

function draw() {
  background(0);
  createButtons();
}

function drawRing1() {
  fill(colorGradient);
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

  if (colorGradient === 255){
    colorGradient = 0;
  }
  else{
    colorGradient += 1;
  }
}

function drawCurves1() {
  push();
  translate(windowWidth/2, windowHeight/2);
  rotate(curveRotation);

  stroke(colorGradient);
  strokeWeight(5);
  noFill();
  curve(0, windowHeight * -1, windowWidth/2 * -1, windowHeight/2 * -1, 0, 0, windowWidth/2, windowHeight/2 * -1);
  curve(0, windowHeight * -1, windowWidth/2, windowHeight/2 * -1, 0, 0, windowWidth/2 * -1, windowHeight/2 * -1);
  curve(0, windowHeight * 2, windowWidth/2, windowHeight/2, 0, 0, windowWidth/2 * -1, windowHeight/2);
  curve(0, windowHeight * 2, windowWidth/2 * -1, windowHeight/2, 0, 0, windowWidth/2, windowHeight/2);

  pop();

  push();
  translate(windowWidth/2, windowHeight/2);
  rotate(-curveRotation);

  stroke(colorGradient);
  strokeWeight(5);
  noFill();
  curve(0, windowHeight * -1, windowWidth/2 * -1, windowHeight/2 * -1, 0, 0, windowWidth/2, windowHeight/2 * -1);
  curve(0, windowHeight * -1, windowWidth/2, windowHeight/2 * -1, 0, 0, windowWidth/2 * -1, windowHeight/2 * -1);
  curve(0, windowHeight * 2, windowWidth/2, windowHeight/2, 0, 0, windowWidth/2 * -1, windowHeight/2);
  curve(0, windowHeight * 2, windowWidth/2 * -1, windowHeight/2, 0, 0, windowWidth/2, windowHeight/2);

  pop();

  curveRotation = curveRotation + 0.05;

  if (colorGradient === 255){
    colorGradient = 0;
  }
  else{
    colorGradient += 1;
  }
}

function createButtons(){
  if (button1){
    drawRing1();
    drawCurves1();
  }
  
  if (button2){
    drawRings2();
    drawCurves2();
  }
 
  if (!button1 && !button2){
    fill(255);
    rect(myButton.x - 425, myButton.y, myButton.w, myButton.h);
    rect(myButton.x + 225, myButton.y, myButton.w, myButton.h);

    fill(0);
    textSize(20);
    stroke("white");
    text("Cool Animation", myButton.x - 400, myButton.y + myButton.h/2);
    text("Cooler Animation", myButton.x + 250, myButton.y + myButton.h/2);
  }

  if (button1 || button2){
    noStroke();
    fill(255);
    rect(0, 0, 50, 20);

    textSize(10);
    fill(0);
    stroke("white");
    text("Return", 0, 10);
  }
}


function mousePressed() {
  if (!button1 && !button2){
    if (mouseX > myButton.x - 425 && mouseX < myButton.x - 425 + myButton.w && mouseY > myButton.y && mouseY < myButton.y + myButton.h) {
      button1 = !button1;
    }
    
    if (mouseX > myButton.x + 225 && mouseX < myButton.x + 225 + myButton.w && mouseY > myButton.y && mouseY < myButton.y + myButton.h){
      button2 = !button2;
    }
  }
  if (button1 || button2){
    if (mouseX > 0 && mouseX < 50 && mouseY > 0 && mouseY < 20){
      if (button1){
        button1 = !button1;
      }
      else if(button2){
        button2 = !button2;
      }
    }
  }
}

function drawCurves2(){
  push();

  translate(windowWidth/2, windowHeight/2);
  rotate(curveRotation);

  stroke("#FF5F1F");
  strokeWeight(1);
  noFill();

  for (let armCounter = 0; armCounter < numberOfArms; armCounter++){
    let armAngle = armCounter/numberOfArms * TWO_PI;

    beginShape();

    for (let segmentCounter = 0; segmentCounter < numberOfSegments; segmentCounter++){
      let p = segmentCounter/numberOfSegments;
      let distanceFromCenter = 10 * pow(40, p * 1.1);
      let theta = armAngle + p * PI;

      let x = distanceFromCenter * cos(theta);
      let y = distanceFromCenter * sin(theta);

      vertex(x, y);
    }
    endShape();
  }

  pop();

  push();

  translate(windowWidth/2, windowHeight/2);
  rotate(-curveRotation);

  stroke("#39FF14");
  strokeWeight(1);
  noFill();

  for (let armCounter = 0; armCounter < numberOfArms; armCounter++){
    let armAngle = armCounter/numberOfArms * TWO_PI;

    beginShape();

    for (let segmentCounter = 0; segmentCounter < numberOfSegments; segmentCounter++){
      let segmentProgress = segmentCounter/numberOfSegments;
      let distanceFromCenter = 10 * pow(40, segmentProgress * 1.1);
      let theta = armAngle + segmentProgress * PI;

      let x = distanceFromCenter * cos(theta);
      let y = distanceFromCenter * sin(theta);

      vertex(x, y);
    }
    endShape();
  }

  pop();
  
  curveRotation = curveRotation + 0.03;
}

function drawRings2(){
  stroke("#FF69B4");
  strokeWeight(3);
  noFill();
  
  circle(windowWidth/2, windowHeight/2, circleThree.circleDiameterThree);
  circle(windowWidth/2, windowHeight/2, circleFour.circleDiameterFour);
  circle(windowWidth/2, windowHeight/2, circleFive.circleDiameterFive);

  if (circleThree.circleDiameterThree <= windowHeight + 200){
    circleThree.circleDiameterThree = circleThree.circleDiameterThree + circleThree.radiusGrowthOne;
  }
  else{
    circleThree.circleDiameterThree = 0;
  }

  if (circleFour.circleDiameterFour <= windowHeight + 200){
    circleFour.circleDiameterFour = circleFour.circleDiameterFour + circleFour.radiusGrowthTwo;
  }
  else{
    circleFour.circleDiameterFour = 0;
  }

  if (circleFive.circleDiameterFive <= windowHeight + 200){
    circleFive.circleDiameterFive = circleFive.circleDiameterFive + circleFive.radiusGrowthThree;
  }
  else{
    circleFive.circleDiameterFive = 0;
  }
}