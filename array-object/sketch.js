// Cool Spiral Animation
// Chuyan Wang
// March 18, 2026
//
// Extra for Experts:
/* Used the translate function to move (0, 0) to the center of the screen and push and pop to limit the rotation 
to the curves. I also used beginShape to make custom shapes with vertices.
*/ 

//Using object notations to contain properties of every circle used in both drawings
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

//Using object notation to contain properties for the buttons that are used to access drawings
let myButton = {
  x: 0,
  y: 0,
  w: 200,
  h: 100,
};

//Sets button parameters to false
let button1 = false;
let button2 = false;

//Sets the variable used to control the color for the first drawing
let colorGradient = 0;

//Sets the array that contains the colors for the second drawing
let colorPalette = ["#FF1900", "#FF8800", "#FFCC00", "#FFFA00", "#D8FF00","#B6FF00", "#00FF2E", "#00FFA5", "#00FFE1", "#00DDFF", "#057DFF", "#9800FF", "#D400FF", "#FF00E4", "#FF008C"];
//Stores the index of the randomly selected color from the colorPalette
let randomColorPicker = 0;

//Sets the variable that is used to rotate the curves in both drawings
let curveRotation = 0;

//Sets how many vertices each curve in the second drawing is made up of
let numberOfSegments = 40;
//Sets the variables that controls how many curves are in the second drawing
let numberOfCurves = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  //Updates the diameter for many circles after windowHeight is established
  circleOne.circleDiameterOne = windowHeight + 100;
  circleTwo.circleDiameterTwo = circleOne.circleDiameterOne - 25;
  circleFour.circleDiameterFour = windowHeight/3;
  circleFive.circleDiameterFive = windowHeight * 2/3;

  //Updates the button parameters after windowWidth is established
  myButton.x = windowWidth/2;
  myButton.y = windowHeight/2 - 100;

}

function draw() {
  background(0);
  //creates the buttons and runs the drawings 
  createButtons();
}

function drawRing1() {
  //push and pop temporarily change colorMode to set the fill color
  push();
  
  //changes the color mode
  colorMode(HSB, 255);
  //fills the circle based on colorGradient
  fill(colorGradient, 255, 255);
  

  //draws the first circle
  noStroke();
  circle(windowWidth/2, windowHeight/2, circleOne.circleDiameterOne);
  
  pop();

  //draws the second circle, filling it black to create the look of a ring
  fill("black");
  circle(windowWidth/2, windowHeight/2, circleTwo.circleDiameterTwo);

  //decreasing the diameter if the first circle repeatedly, creating a shrinking effect
  if (circleOne.circleDiameterOne >= 0){
    circleOne.circleDiameterOne = circleOne.circleDiameterOne - circleOne.radiusDecayOne;
  }
  else{
    circleOne.circleDiameterOne = windowHeight + 100;
  }

  //decreasing the diameter of the second circle repeatedly, creating a shrinking effect
  if (circleTwo.circleDiameterTwo >= 0){
    circleTwo.circleDiameterTwo = circleTwo.circleDiameterTwo - circleTwo.radiusDecayTwo;
  }
  else{
    circleTwo.circleDiameterTwo = circleOne.circleDiameterOne - 25;
  }

  //changes the color of the ring in a rainbow gradient repeatedly
  if (colorGradient === 255){
    colorGradient = 0;
  }
  else{
    colorGradient += 1;
  }
}

function drawCurves1() {
  //uses push and pop to limit the rotation to the curves
  push();
  
  //moves (0, 0) to the center of the screen
  translate(windowWidth/2, windowHeight/2);
  //rotates the coordinate system around (0, 0)
  rotate(curveRotation);

  //changes the color mode and draws the curve with a color based on colorGradient
  colorMode(HSB, 255);
  stroke(colorGradient, 255, 255);
  
  //draws four curves
  strokeWeight(5);
  noFill();
  curve(0, windowHeight * -1, windowWidth/2 * -1, windowHeight/2 * -1, 0, 0, windowWidth/2, windowHeight/2 * -1);
  curve(0, windowHeight * -1, windowWidth/2, windowHeight/2 * -1, 0, 0, windowWidth/2 * -1, windowHeight/2 * -1);
  curve(0, windowHeight * 2, windowWidth/2, windowHeight/2, 0, 0, windowWidth/2 * -1, windowHeight/2);
  curve(0, windowHeight * 2, windowWidth/2 * -1, windowHeight/2, 0, 0, windowWidth/2, windowHeight/2);

  pop();

  //uses push and pop to limit the rotation to the curves
  push();
  
  //moves(0, 0) to the center of the screen
  translate(windowWidth/2, windowHeight/2);
  //rotates the coordinate system around (0, 0) the other way compared to earlier in the function
  rotate(-curveRotation);

  //changes the color mode and draws the curve with a color based on colorGradient
  colorMode(HSB, 255);
  stroke(colorGradient, 255, 255);
  
  //draws another four curves
  strokeWeight(5);
  noFill();
  curve(0, windowHeight * -1, windowWidth/2 * -1, windowHeight/2 * -1, 0, 0, windowWidth/2, windowHeight/2 * -1);
  curve(0, windowHeight * -1, windowWidth/2, windowHeight/2 * -1, 0, 0, windowWidth/2 * -1, windowHeight/2 * -1);
  curve(0, windowHeight * 2, windowWidth/2, windowHeight/2, 0, 0, windowWidth/2 * -1, windowHeight/2);
  curve(0, windowHeight * 2, windowWidth/2 * -1, windowHeight/2, 0, 0, windowWidth/2, windowHeight/2);

  pop();

  //increases the curveRotation value to create a gradual rotating effect for the curves
  curveRotation += 0.05;


  //changes the color of the curves in a rainbow gradient repeatedly
  if (colorGradient === 255){
    colorGradient = 0;
  }
  else{
    colorGradient += 1;
  }
}

function mousePressed() {
  //Makes the selection buttons only clickable if they are both false
  if (!button1 && !button2){
    //Turns the selection button one from false to true when clicked 
    if (mouseX > myButton.x - 425 && mouseX < myButton.x - 425 + myButton.w && mouseY > myButton.y && mouseY < myButton.y + myButton.h) {
      button1 = !button1;
    }
    //Turns the selection button two from false to true when clicked 
    if (mouseX > myButton.x + 225 && mouseX < myButton.x + 225 + myButton.w && mouseY > myButton.y && mouseY < myButton.y + myButton.h){
      button2 = !button2;
    }
  }

  //Makes the return buttons only clickable if one of the selection buttons is true
  if (button1 || button2){
    //When the return button is clicked, if selection button one is true, turn it to false. Vice versa for selection button two
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

function createButtons(){
  //Draws the curves and rings to make up the first drawing if selection button one is true
  if (button1){
    drawRing1();
    drawCurves1();
  }
  
  //Draws the curves and rings to make up the second drawing if selection button two is true
  if (button2){
    drawRings2();
    drawCurves2();
  }
 
  //Draws selection buttons one and two only if they are both false
  if (!button1 && !button2){
    fill(255);
    rect(myButton.x - 425, myButton.y, myButton.w, myButton.h);
    rect(myButton.x + 225, myButton.y, myButton.w, myButton.h);

    //Draws the text on top of the selection buttons
    fill(0);
    textSize(20);
    stroke("white");
    text("Cool Animation", myButton.x - 400, myButton.y + myButton.h/2);
    text("Cooler Animation", myButton.x + 250, myButton.y + myButton.h/2);
  }

  //Makes a return button if one of the buttons is true
  if (button1 || button2){
    noStroke();
    fill(255);
    rect(0, 0, 50, 20);

    //Draws the text for the return button
    textSize(10);
    fill(0);
    stroke("white");
    text("Return", 0, 10);
  }
}

function drawCurves2(){
  //uses push and pop to limit the rotation to the curves
  push();

  //moves(0, 0) to the center of the screen
  translate(windowWidth/2, windowHeight/2);
  //rotates the coordinate system around (0, 0)
  rotate(curveRotation);

  //changes the color every 10 frames to create a smoother effect
  if (frameCount % 10 === 0){
    randomColorPicker = floor(random(colorPalette.length));
  }

  //Sets the stroke weight and stroke color for the curves
  stroke(colorPalette[randomColorPicker]);
  strokeWeight(1);
  noFill();

  //Draws the number of curves as set earlier
  for (let curveCounter = 0; curveCounter < numberOfCurves; curveCounter++){
    //Spreads the curves evenly around a circle
    let curveAngle = curveCounter/numberOfCurves * TWO_PI;

    //Begins drawing the custom shape
    beginShape();

    //Creates the points for each curve
    for (let segmentCounter = 0; segmentCounter < numberOfSegments; segmentCounter++){
      //Creates a variable that tracks how far along the curve each point is
      let segmentProgress = segmentCounter/numberOfSegments;
      //Calculates how far each point is from the center. This value grows exponentially
      let distanceFromCenter = 10 * pow(40, segmentProgress * 1.1);
      //Calculates the angle around the center. The curve rotates as it moves outwards
      let theta = curveAngle + segmentProgress * PI;

      //Converts the polar coordinates into the coordinates on screen
      let x = distanceFromCenter * cos(theta);
      let y = distanceFromCenter * sin(theta);

      //Draws the point. Many of the these for each curve
      vertex(x, y);
    }
    //Stops drawing the custom shape
    endShape();
  }

  pop();

  //uses push and pop to limit the rotation to the curves
  push();

  //moves(0, 0) to the center of the screen
  translate(windowWidth/2, windowHeight/2);
  //rotates the coordinate system around (0, 0) the other way compared to earlier in the function
  rotate(-curveRotation);

  //changes the color every 10 frames to create a smoother effect
  if (frameCount % 10 === 0){
    randomColorPicker = floor(random(colorPalette.length));
  }
  
  //Sets the stroke weight and stroke color for the curves
  stroke(colorPalette[randomColorPicker]);
  strokeWeight(1);
  noFill();

  //Draws the number of curves as set earlier
  for (let curveCounter = 0; curveCounter < numberOfCurves; curveCounter++){
    //Spreads the curves evenly around a circle
    let curveAngle = curveCounter/numberOfCurves * TWO_PI;
    
    //Begins drawing the custom shape
    beginShape();

    //Creates the points for each curve
    for (let segmentCounter = 0; segmentCounter < numberOfSegments; segmentCounter++){
      //Creates a variable that tracks how far along the curve each point is
      let segmentProgress = segmentCounter/numberOfSegments;
      //Calculates how far each point is from the center. This value grows exponentially
      let distanceFromCenter = 10 * pow(40, segmentProgress * 1.1);
      //Calculates the angle around the center. The curve rotates as it moves outwards
      let theta = curveAngle + segmentProgress * PI;

      //Converts the polar coordinates into the coordinates on screen
      let x = distanceFromCenter * cos(theta);
      let y = distanceFromCenter * sin(theta);

      //Draws the point. Many of the these for each curve
      vertex(x, y);
    }
    //Stops drawing the custom shape
    endShape();
  }

  pop();
  
  //increases the curveRotation value to create a gradual rotating effect for the curves
  curveRotation = curveRotation + 0.03;
}

function drawRings2(){

  //changes the color every 10 frames to create a smoother effect
  if (frameCount % 10 === 0){
    randomColorPicker = floor(random(colorPalette.length));
  }

  //Sets the stroke weight and stroke color for the circle
  stroke(colorPalette[randomColorPicker]);
  strokeWeight(3);
  noFill();
  
  //Draws the three circles used
  circle(windowWidth/2, windowHeight/2, circleThree.circleDiameterThree);
  circle(windowWidth/2, windowHeight/2, circleFour.circleDiameterFour);
  circle(windowWidth/2, windowHeight/2, circleFive.circleDiameterFive);

  //increasing the diameter if the third circle repeatedly, creating a growing effect
  if (circleThree.circleDiameterThree <= windowHeight + 200){
    circleThree.circleDiameterThree = circleThree.circleDiameterThree + circleThree.radiusGrowthOne;
  }
  else{
    circleThree.circleDiameterThree = 0;
  }

  //increasing the diameter if the fourth circle repeatedly, creating a growing effect
  if (circleFour.circleDiameterFour <= windowHeight + 200){
    circleFour.circleDiameterFour = circleFour.circleDiameterFour + circleFour.radiusGrowthTwo;
  }
  else{
    circleFour.circleDiameterFour = 0;
  }

  //increasing the diameter if the fifth circle repeatedly, creating a growing effect
  if (circleFive.circleDiameterFive <= windowHeight + 200){
    circleFive.circleDiameterFive = circleFive.circleDiameterFive + circleFive.radiusGrowthThree;
  }
  else{
    circleFive.circleDiameterFive = 0;
  }
}