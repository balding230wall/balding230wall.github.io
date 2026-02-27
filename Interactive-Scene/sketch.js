// Connect Four
// Chuyan Wang
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let turn;
let column = 25;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  playerOne();
  playerTwo();
  drawBack();
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
  fill(0, 100);
  rect(25, 10, 50, 390);
}

function keyPressed(){
  if (keyCode === RIGHT_ARROW){
    fill(0, 100);
    rect(column, 10, 50, 390);
    column = column + 25;
  }
  
  if (keyCode === LEFT_ARROW){
    fill(0, 100);
    rect(column, 10, 50, 390);
    column = column - 25;
  }
}
