// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let board = [];

let gridSize;
let cols = 8;
let rows = 8;
let white = 0;
let black = 1;


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  if (windowWidth > windowHeight){
    gridSize = windowHeight/8;
  }
  else{
    gridSize = windowWidth/8;
  }
  
  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; cols < 8; c++) {
      if (r % 2 === 0){
        if (c % 2 === 0){
          board[r][c] = white;
        }
        else{
          board[r][c] = black;
        }

      }
      else{
        if (c % 2 === 0){
          board[r][c] = black;
        }
        else{
          board[r][c] = white;
        }

      }
    }
  }
}


function draw() {
  background(220);
  drawBoard();
}

function drawBoard(){
  for (let r = 0; r < rows; r++) {
    for (let c = 0; cols < 8; c++) {
      if (board[r][c] === white){
        fill(255);
        square(gridSize * c, gridSize * r, gridSize);
      }
      else{
        fill(0);
        square(gridSize * c, gridSize * r, gridSize);
      }
    }
  }
}