// Connect Four
// Chuyan Wang
// March 3, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let turn;
let column = 25;
let board = [];



function setup() {
  createCanvas(400, 400);

  for (let r = 0; r < 7; r++) {
    board[r] = [];
    for (let c = 0; c < 7; c++) {
      board [r] [c] = 0;
    }
  }
}

function draw() {
  playerOne();
  playerTwo();
  drawBackground();
  selectionBox();
}

function drawBackground(){
  fill("black");
  rect(25, 0, 350, 380);

  fill("white")
  for (let r = 0; r < 7; r++){
    for (let c = 0; c < 7; c++){
      circle(c * 50 + 50, r * 50 + 50, 40);
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

function selectionBox(){
  fill(0, 100);
  rect(column, 0, 50, 370);
}

function keyPressed(){
  if (keyCode === RIGHT_ARROW){
    fill(0, 100);
    rect(column, 0, 50, 380);
    if (column < 300){
      column = column + 50;
    }
  }
  
  if (keyCode === LEFT_ARROW){
    fill(0, 100);
    rect(column, 0, 50, 380);
    if (column > 50){
      column = column - 50;
    }
  } 
}