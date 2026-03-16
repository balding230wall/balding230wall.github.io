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

let curveRotation = 0;

let myButton = {
  x: 0,
  y: 0,
  w: 200,
  h: 100,
};

let button1 = false;
let button2 = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  circleOne.circleDiameterOne = windowHeight + 100;
  circleTwo.circleDiameterTwo = circleOne.circleDiameterOne - 25;

  myButton.x = windowWidth/2;
  myButton.y = windowHeight/2 - 100;

}

function draw() {
  background(0);
  createButtons();
}

function animateRing1() {
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

function animateCurve1() {
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

function createButtons(){
  if (button1){
    animateRing1();
    animateCurve1();
  }
  
  if (button2){
    console.log("Hi");
  }
 
  if (!button1 && !button2){
    fill(255);
    rect(myButton.x - 425, myButton.y, myButton.w, myButton.h);
    rect(myButton.x + 225, myButton.y, myButton.w, myButton.h);

    fill(0);
    textSize(20);
    text("Cool Animation", myButton.x - 400, myButton.y + myButton.h/2);
    text("Cooler Animation", myButton.x + 250, myButton.y + myButton.h/2);
  }

  if (button1 || button2){
    fill(255);
    rect(0, 0, 50, 20);

    textSize(10);
    fill(0);
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

