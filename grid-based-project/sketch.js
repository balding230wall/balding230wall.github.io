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
const RED_PIECE = 1;
const BLACK_PIECE = 2;
const RED_KING = 3;
const BLACK_KING = 4;
const WHITE_BOARD = 5;
const BROWN_BOARD = 6;
const EMPTY = 0;



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
        pieces[r][c] = EMPTY;
        if (r <= 2){
          pieces[r][c] = RED_PIECE;
        }
        else if ( r >= 5){
          pieces [r][c] = BLACK_PIECE;
        }
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
        fill(255);
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

      if (pieces[r][c] === RED_PIECE){
        fill("#8B0000");
        circle(gridSize * (c + 0.5), gridSize * (r + 0.5), gridSize * 0.8);
      }
      else if (pieces[r][c] === BLACK_PIECE){
        fill("black");
        circle(gridSize * (c + 0.5), gridSize * (r + 0.5), gridSize * 0.8);
      }
    }
  }
}


function mouseClicked(){
  let c = Math.floor(mouseX/gridSize);
  let r = Math.floor(mouseY/gridSize);

  let selection = null;

  if (board[r][c] === RED_PIECE || board [r][c] === BLACK_PIECE){
  }
}