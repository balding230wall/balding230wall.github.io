// Checkers
// Chuyan Wang
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

let selection = null;
let turn = true;
let glow = 0;


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
      pieces[r][c] = EMPTY;
      if ((r + c) % 2 === 1){
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
  promotion();
  highlightValidMoves();
  glow += 0.08;
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

      if (selection !== null && selection.row === r && selection.column === c){
        push();

        noFill();
        stroke("yellow");
        strokeWeight(3);
      
        circle(gridSize * (c + 0.5), gridSize * (r + 0.5), gridSize * 0.8);

        pop();
      }

      if (pieces[r][c] === RED_PIECE){
        fill("#8B0000");
        circle(gridSize * (c + 0.5), gridSize * (r + 0.5), gridSize * 0.8);
      }
      else if (pieces[r][c] === BLACK_PIECE){
        fill("black");
        circle(gridSize * (c + 0.5), gridSize * (r + 0.5), gridSize * 0.8);
      }

      push();
      colorMode(HSB, 360, 100, 100, 100);

      let glowPulse = sin(glow);

      if (pieces[r][c] === RED_KING){
        
        let brightness = 85 + glowPulse * 15;
        let changingSize = gridSize * (0.8 + glowPulse * 0.05);

        fill(0, 100, brightness);
        circle(gridSize * (c + 0.5), gridSize * (r + 0.5), changingSize);
      }
      else if (pieces[r][c] === BLACK_KING){
        
        let brightness = 10 + glowPulse * 8;
        let changingSize = gridSize * (0.8 + glowPulse * 0.05);
        
        fill(0, 0, brightness);
        circle(gridSize * (c + 0.5), gridSize * (r + 0.5), changingSize);
      }

      pop();
    }
  }
}


function mouseClicked(){
  let c = Math.floor(mouseX/gridSize);
  let r = Math.floor(mouseY/gridSize);

  if (r < 0 || r >= ROWS || c < 0 || c >= COLS){
    return;
  }

  let moved = false;
  
  if (selection === null){
    if (turn === true && (pieces[r][c] === BLACK_PIECE || pieces[r][c] === BLACK_KING) || turn === false && (pieces[r][c] === RED_PIECE || pieces[r][c] === RED_KING)){
      selection = {
        row: r,
        column: c
      };
    }
    return;
  }
  if (turn === true && (pieces[r][c] === BLACK_PIECE || pieces[r][c] === BLACK_KING) || turn === false && (pieces[r][c] === RED_PIECE || pieces[r][c] === RED_KING)){
    selection = {
      row: r,
      column: c
    };
    return;
  }


  if (turn === true && pieces[selection.row][selection.column] === BLACK_PIECE && r === selection.row - 1 && (c === selection.column + 1 || c === selection.column - 1) && pieces[r][c] === EMPTY){
    pieces[r][c] = pieces[selection.row][selection.column];
    pieces[selection.row][selection.column] = EMPTY;
    moved = true;
  }
  else if (turn === false && pieces[selection.row][selection.column] === RED_PIECE && r === selection.row + 1 && (c === selection.column + 1 || c === selection.column - 1) && pieces[r][c] === EMPTY){
    pieces[r][c] = pieces[selection.row][selection.column];
    pieces[selection.row][selection.column] = EMPTY;
    moved = true;
  }
  else if(turn === true && pieces[selection.row][selection.column] === BLACK_PIECE && r === selection.row - 2 && (c === selection.column + 2 && pieces[selection.row - 1][selection.column + 1] === RED_PIECE && pieces[selection.row - 2][selection.column + 2] === EMPTY|| c === selection.column - 2 && pieces[selection.row - 1][selection.column - 1] === RED_PIECE && pieces[selection.row - 2][selection.column - 2] === EMPTY)){
    if (r === selection.row - 2 && c === selection.column - 2){
      pieces[selection.row - 1][selection.column - 1] = EMPTY;
    }
    else if (r === selection.row - 2 && c === selection.column + 2){
      pieces[selection.row - 1][selection.column + 1] = EMPTY;
    }
    pieces[r][c] = pieces[selection.row][selection.column];
    pieces[selection.row][selection.column] = EMPTY;
    moved = true;
  }
  else if(turn === false && pieces[selection.row][selection.column] === RED_PIECE && r === selection.row + 2 && (c === selection.column + 2 && pieces[selection.row + 1][selection.column + 1] === BLACK_PIECE && pieces[selection.row + 2][selection.column + 2] === EMPTY|| c === selection.column - 2 && pieces[selection.row + 1][selection.column - 1] === BLACK_PIECE && pieces[selection.row + 2][selection.column - 2] === EMPTY)){
    if (r === selection.row + 2 && c === selection.column - 2){
      pieces[selection.row + 1][selection.column - 1] = EMPTY;
    }
    else if (r === selection.row + 2 && c === selection.column + 2){
      pieces[selection.row + 1][selection.column + 1] = EMPTY;
    }
    pieces[r][c] = pieces[selection.row][selection.column];
    pieces[selection.row][selection.column] = EMPTY;
    moved = true;
  }


  else if (turn === true && pieces[selection.row][selection.column] === BLACK_KING && pieces[r][c] === EMPTY && (r === selection.row + 1 || r === selection.row - 1) && (c === selection.column + 1 || c === selection.column - 1)){
    pieces[r][c] = pieces[selection.row][selection.column];
    pieces[selection.row][selection.column] = EMPTY;
    moved = true;
  }
  else if (turn === false && pieces[selection.row][selection.column] === RED_KING && pieces[r][c] === EMPTY && (r === selection.row + 1 || r === selection.row - 1) && (c === selection.column + 1 || c === selection.column - 1)){
    pieces[r][c] = pieces[selection.row][selection.column];
    pieces[selection.row][selection.column] = EMPTY;
    moved = true;
  }
  else if (turn === true && pieces[selection.row][selection.column] === BLACK_KING && (r === selection.row - 2 && c === selection.column + 2 && (pieces[selection.row - 1][selection.column + 1] === RED_PIECE || pieces[selection.row - 1][selection.column + 1] === RED_KING) && pieces[selection.row - 2][selection.column + 2] === EMPTY || 
  r === selection.row + 2 && c === selection.column + 2 && (pieces[selection.row + 1][selection.column + 1] === RED_PIECE || pieces[selection.row + 1][selection.column + 1] === RED_KING) && pieces[selection.row + 2][selection.column + 2] === EMPTY ||
  r === selection.row - 2 && c === selection.column - 2 && (pieces[selection.row - 1][selection.column - 1] === RED_PIECE || pieces[selection.row - 1][selection.column - 1] === RED_KING) && pieces[selection.row - 2][selection.column - 2] === EMPTY ||
  r === selection.row + 2 && c === selection.column - 2 && (pieces[selection.row + 1][selection.column - 1] === RED_PIECE || pieces[selection.row + 1][selection.column - 1] === RED_KING) && pieces[selection.row + 2][selection.column - 2] === EMPTY)){
    
    if (r === selection.row + 2 && c === selection.column - 2){
      pieces[selection.row + 1][selection.column - 1] = EMPTY;
    }
    else if (r === selection.row + 2 && c === selection.column + 2){
      pieces[selection.row + 1][selection.column + 1] = EMPTY;
    }
    else if (r === selection.row - 2 && c === selection.column + 2){
      pieces[selection.row - 1][selection.column + 1] = EMPTY;
    }
    else if (r === selection.row - 2 && c === selection.column - 2){
      pieces[selection.row - 1][selection.column - 1] = EMPTY;
    }

    pieces[r][c] = pieces[selection.row][selection.column];
    pieces[selection.row][selection.column] = EMPTY;
    moved = true;
  }

  else if (turn === false && pieces[selection.row][selection.column] === RED_KING && (r === selection.row - 2 && c === selection.column + 2 && (pieces[selection.row - 1][selection.column + 1] === BLACK_PIECE || pieces[selection.row - 1][selection.column + 1] === BLACK_KING) && pieces[selection.row - 2][selection.column + 2] === EMPTY || 
  r === selection.row + 2 && c === selection.column + 2 && (pieces[selection.row + 1][selection.column + 1] === BLACK_PIECE || pieces[selection.row + 1][selection.column + 1] === BLACK_KING) && pieces[selection.row + 2][selection.column + 2] === EMPTY ||
  r === selection.row - 2 && c === selection.column - 2 && (pieces[selection.row - 1][selection.column - 1] === BLACK_PIECE || pieces[selection.row - 1][selection.column - 1] === BLACK_KING) && pieces[selection.row - 2][selection.column - 2] === EMPTY ||
  r === selection.row + 2 && c === selection.column - 2 && (pieces[selection.row + 1][selection.column - 1] === BLACK_PIECE || pieces[selection.row + 1][selection.column - 1] === BLACK_KING) && pieces[selection.row + 2][selection.column - 2] === EMPTY)){
  
    if (r === selection.row + 2 && c === selection.column - 2){
      pieces[selection.row + 1][selection.column - 1] = EMPTY;
    }
    else if (r === selection.row + 2 && c === selection.column + 2){
      pieces[selection.row + 1][selection.column + 1] = EMPTY;
    }
    else if (r === selection.row - 2 && c === selection.column + 2){
      pieces[selection.row - 1][selection.column + 1] = EMPTY;
    }
    else if (r === selection.row - 2 && c === selection.column - 2){
      pieces[selection.row - 1][selection.column - 1] = EMPTY;
    }

    pieces[r][c] = pieces[selection.row][selection.column];
    pieces[selection.row][selection.column] = EMPTY;
    moved = true;
  }


  if (moved){
    selection = null;
    turn = !turn;
  }
}

function promotion(){
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (pieces[r][c] === BLACK_PIECE && r === 0) {
        pieces[r][c] = BLACK_KING;
      }
      else if (pieces[r][c] === RED_PIECE && r === 7){
        pieces[r][c] = RED_KING;
      }
    }
  }
}

function highlighter(r, c){
  if (r < 0 || r >= ROWS || c < 0 || c >= COLS){
    return;
  }

  if (pieces[r][c] !== EMPTY){
    return;
  }

  push();
  
  fill(255, 255, 0, 50);
  noStroke();

  circle(gridSize * (c + 0.5), gridSize * (r + 0.5), gridSize * 0.3);

  pop();

}

function highlightValidMoves(){
  if (selection === null){
    return;
  }

  let r = selection.row;
  let c = selection.column;

  if (pieces[r][c] === BLACK_PIECE){
    highlighter(r - 1, c - 1);
    highlighter(r - 1, c + 1);
    if (pieces[r - 1][c - 1] === RED_PIECE){
      highlighter(r - 2, c - 2);
    }
    else if (pieces[r - 1][c + 1] === RED_PIECE){
      highlighter(r - 2, c + 2);
    }
  }
  else if (pieces[r][c] === RED_PIECE){
    highlighter(r + 1, c - 1);
    highlighter(r + 1, c + 1);
    if (pieces[r + 1][c - 1] === BLACK_PIECE){
      highlighter(r + 2, c - 2);
    }
    else if (pieces[r + 1][c + 1] === BLACK_PIECE){
      highlighter(r + 2, c + 2);
    }
  }

  else if (pieces[r][c] === BLACK_KING){
    highlighter(r - 1, c - 1);
    highlighter(r - 1, c + 1);
    highlighter(r + 1, c - 1);
    highlighter(r + 1, c + 1);

    if (pieces[r - 1][c - 1] === RED_PIECE || pieces[r - 1][c - 1] === RED_KING){
      highlighter(r - 2, c - 2);
    }
    else if (pieces[r - 1][c + 1] === RED_PIECE || pieces[r - 1][c + 1] === RED_KING ){
      highlighter(r - 2, c + 2);
    }
    else if (pieces[r + 1][c - 1] === RED_PIECE || pieces[r + 1][c - 1] === RED_KING){
      highlighter(r + 2, c - 2);
    }
    else if (pieces[r + 1][c + 1] === RED_PIECE || pieces[r + 1][c + 1] === RED_KING){
      highlighter(r + 2, c + 2);
    }
  }

  else if (pieces[r][c] === RED_KING){
    highlighter(r - 1, c - 1);
    highlighter(r - 1, c + 1);
    highlighter(r + 1, c - 1);
    highlighter(r + 1, c + 1);

    if (pieces[r - 1][c - 1] === BLACK_PIECE || pieces[r - 1][c - 1] === BLACK_KING){
      highlighter(r - 2, c - 2);
    }
    else if (pieces[r - 1][c + 1] === BLACK_PIECE || pieces[r - 1][c + 1] === BLACK_KING ){
      highlighter(r - 2, c + 2);
    }
    else if (pieces[r + 1][c - 1] === BLACK_PIECE || pieces[r + 1][c - 1] === BLACK_KING){
      highlighter(r + 2, c - 2);
    }
    else if (pieces[r + 1][c + 1] === BLACK_PIECE || pieces[r + 1][c + 1] === BLACK_KING){
      highlighter(r + 2, c + 2);
    }
  }
}
