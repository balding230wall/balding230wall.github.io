// Connect Four
// Chuyan Wang
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let turn;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  drawBack();
  playerOne();
  playerTwo();
  selection();
}

function drawBack(){
  rect(25, 10, 350, 390);
  for (let step1 = 0.70; step1 < 8; step1++){
    for (let step = 1; step < 8; step++){
      circle(step * 50, step1 * 50, 25);
    }
  }
}

function mouseClicked(){
  turn = !turn;

}

function playerOne(){
  if (turn === true){
    fill("red");
  }
}

function playerTwo(){
  if (turn === false){
    fill("yellow");
  }
}

function selection(){
  rect(25, 10, 50, 390);
  fill("grey");
}
