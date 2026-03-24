// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let board = [];
let pieces = [];

let gridSize;
const COLS = 8;
const ROWS = 8;
const WHITE_BOARD = 0;
const BROWN_BOARD = 1;
const RED_PIECE = 2;
const BLACK_PIECE = 3;
const RED_KING = 4;
const BLACK_KING = 5;


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  if (windowWidth > windowHeight){
    gridSize = windowHeight/8;
  }
  else{
    gridSize = windowWidth/8;
  }
  
  for (let r = 0; r < ROWS; r++) {
    board[r] = [];
    for (let c = 0; c < COLS; c++) {
      if ((r + c) % 2 === 0){
        board[r][c] = WHITE_BOARD;
      }
      else{
        board[r][c] = BROWN_BOARD;
      }
    }
  }

 for (let r = 0; r < ROWS; r++) {
    pieces[r] = [];
    for (let c = 0; c < COLS; c++) {
      if ((r + c) % 2 === 1){
        if (r <= 2){
        
      }
      else{
        board[r][c] = BROWN_BOARD;
      }
    }
  }
}


function draw() {
  background(220);
  drawBoard();
  drawPieces();
}

function drawBoard(){
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c] === WHITE_BOARD){
        fill("255");
        square(gridSize * c, gridSize * r, gridSize);
      }
      else{
        fill("#A67C52");
        square(gridSize * c, gridSize * r, gridSize);
      }
    }
  }
}

function drawPieces(){
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if ((r + c) % 2 === 1){
        if (r <= 2){
          fill("#8B0000");
          circle(gridSize * (c + 1/2), gridSize * (r + 1/2), gridSize * 0.8);
        }
        if (r >= 5){
          fill("black");
          circle(gridSize * (c + 1/2), gridSize * (r + 1/2), gridSize * 0.8);
        }
      }
    }
  }
}
