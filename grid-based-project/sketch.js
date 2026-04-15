// Checkers
// Chuyan Wang
// April 13, 2026
//
// Extra for Experts:
// Uses null to indicate nothing, such as no piece is selected. Used HSB colormode. Used sin to create a smooth glowing effect for my kings

//sets empty 2D arrays to represent the board and pieces.
let board = [];
let pieces = [];

//sets constants
const COLS = 8;
const ROWS = 8;
const RED_PIECE = 1;
const BLACK_PIECE = 2;
const RED_KING = 3;
const BLACK_KING = 4;
const WHITE_BOARD = 5;
const BROWN_BOARD = 6;
const EMPTY = 0;
const PIECESIZE = 0.8;
const GLOWFACTOR = 0.08;
const HIGHLIGHTER_SIZE = 0.3;

//sets variables
let gridSize;
let selection = null;
let turn = true;
let glow = 0;
let redCounter = 12;
let blackCounter = 12;
let gameOver = false;

//Function to check for out of bounds
function inBounds(r, c){
  return r >= 0 && r < ROWS && c >= 0 && c < COLS;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  //sets the grid size
  if (windowWidth > windowHeight){
    gridSize = windowHeight/COLS;
  }
  else{
    gridSize = windowWidth/ROWS;
  }
  
  //initializes board
  for (let r = 0; r < ROWS; r++) {
    board[r] = [];
    for (let c = 0; c < COLS; c++) {
      //alternates to draw colored board
      if ((r + c) % 2 === 0){
        board[r][c] = WHITE_BOARD;
      }
      else{
        board[r][c] = BROWN_BOARD;
      }
    }
  }

  //initializes pieces
  for (let r = 0; r < ROWS; r++) {
    pieces[r] = [];
    for (let c = 0; c < COLS; c++) {
      pieces[r][c] = EMPTY;
      //places pieces on brown squares only
      if ((r + c) % 2 === 1){
        //places red pieces on top, black pieces on the bottom
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
  //draws the board
  drawBoard();
  //draws the pieces
  drawPieces();
  //promotes pieces to king
  promotion();
  //highlights possible moves that can be made
  highlightValidMoves();
  //displays win screen when the game is over
  displayWin();

  //animates the king glow effect
  glow += GLOWFACTOR;
}

function drawBoard(){
  //draws the board with alternating white and brown colors 
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
  //sets constants that adjust the kings' glowing colors and changing sizes
  const BLACK_GLOW_MULTIPLIER = 8;
  const BLACK_GLOW_ADJUSTER = 20;
  const RED_GLOW_MULTIPLIER = 15;
  const RED_GLOW_ADJUSTER = 85;
  const PIECE_SIZE_MULTIPLIER = 0.05;
  const PIECE_SIZE_ADJUSTER = 0.8;



  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {

      //highlights selected piece
      if (selection !== null && selection.row === r && selection.column === c){
        push();

        noFill();
        stroke("yellow");
        strokeWeight(3);
      
        circle(gridSize * (c + 0.5), gridSize * (r + 0.5), gridSize * PIECESIZE);

        pop();
      }
      
      //Draws red pieces
      if (pieces[r][c] === RED_PIECE){
        fill("#8B0000");
        circle(gridSize * (c + 0.5), gridSize * (r + 0.5), gridSize * PIECESIZE);
      }
      //Draws black pieces
      else if (pieces[r][c] === BLACK_PIECE){
        fill("black");
        circle(gridSize * (c + 0.5), gridSize * (r + 0.5), gridSize * PIECESIZE);
      }

      //Draws kings with glowing, pulsing animation
      push();
      colorMode(HSB, 360, 100, 100, 100);

      //calculates a value for the glow animation
      let glowPulse = sin(glow);

      if (pieces[r][c] === RED_KING){
        
        //changes color
        let brightness = RED_GLOW_ADJUSTER + glowPulse * RED_GLOW_MULTIPLIER;
        //changes size
        let changingSize = gridSize * (PIECE_SIZE_ADJUSTER + glowPulse * PIECE_SIZE_MULTIPLIER);

        //draws the changing circles
        fill(0, 100, brightness);
        circle(gridSize * (c + 0.5), gridSize * (r + 0.5), changingSize);
      }
      else if (pieces[r][c] === BLACK_KING){
        
        //changes color
        let brightness = BLACK_GLOW_ADJUSTER + glowPulse * BLACK_GLOW_MULTIPLIER;
        //changes size
        let changingSize = gridSize * (PIECE_SIZE_ADJUSTER + glowPulse * PIECE_SIZE_MULTIPLIER);
        
        //draws the changing circles
        fill(0, 0, brightness);
        circle(gridSize * (c + 0.5), gridSize * (r + 0.5), changingSize);
      }

      pop();
    }
  }
}


function mouseClicked(){
  
  //Stops function if the game ends
  if (gameOver){
    return;
  }

  //Grid specified based on where the mouse is clicked
  let c = Math.floor(mouseX/gridSize);
  let r = Math.floor(mouseY/gridSize);

  //Ensures the game does not crash if out of bounds
  if (!inBounds(r, c)){
    return;
  }

  //Determines if a move has been made
  let moved = false;
  
  //Selecting a piece
  if (selection === null){
    if (turn === true && (pieces[r][c] === BLACK_PIECE || pieces[r][c] === BLACK_KING) || turn === false && (pieces[r][c] === RED_PIECE || pieces[r][c] === RED_KING)){
      selection = {
        row: r,
        column: c
      };
    }
    return;
  }
  //Allows smooth swapping between two pieces when a move has not been made
  if (turn === true && (pieces[r][c] === BLACK_PIECE || pieces[r][c] === BLACK_KING) || turn === false && (pieces[r][c] === RED_PIECE || pieces[r][c] === RED_KING)){
    selection = {
      row: r,
      column: c
    };
    return;
  }



  //Normal movement for a black piece. Checks for correct turn, piece selection, square to move to, and if that square is empty
  if (turn === true && pieces[selection.row][selection.column] === BLACK_PIECE && r === selection.row - 1 && (c === selection.column + 1 || c === selection.column - 1) && pieces[r][c] === EMPTY){
    //Moves piece
    pieces[r][c] = pieces[selection.row][selection.column];
    //Removes piece from old square
    pieces[selection.row][selection.column] = EMPTY;
    //Signals that a move has been made
    moved = true;
  }
  
  //Normal movement for a red piece. Checks for correct turn, piece selection, square to move to, and if that square is empty
  else if (turn === false && pieces[selection.row][selection.column] === RED_PIECE && r === selection.row + 1 && (c === selection.column + 1 || c === selection.column - 1) && pieces[r][c] === EMPTY){
    //Moves piece
    pieces[r][c] = pieces[selection.row][selection.column];
    //Removes piece from old square
    pieces[selection.row][selection.column] = EMPTY;
    //Indicate that a move has been made
    moved = true;
  }
  


  //Capture logic for black piece
  else if (turn === true && pieces[selection.row][selection.column] === BLACK_PIECE && r === selection.row - 2 &&
 (c === selection.column + 2 && inBounds(selection.row - 1, selection.column + 1) && inBounds(selection.row - 2, selection.column + 2) && pieces[selection.row - 1][selection.column + 1] === RED_PIECE && pieces[selection.row - 2][selection.column + 2] === EMPTY || 
  c === selection.column - 2 && inBounds(selection.row - 1, selection.column - 1) && inBounds(selection.row - 2, selection.column - 2) && pieces[selection.row - 1][selection.column - 1] === RED_PIECE && pieces[selection.row - 2][selection.column - 2] === EMPTY)){
    
    if (r === selection.row - 2 && c === selection.column - 2){
      //Check if in bounds
      if (inBounds(selection.row - 1, selection.column - 1)){
        //Removes captured piece
        pieces[selection.row - 1][selection.column - 1] = EMPTY;
        //Updates total number of pieces red has
        redCounter--;
      }
    }
    else if (r === selection.row - 2 && c === selection.column + 2){
      //Check if in bounds
      if (inBounds(selection.row - 1, selection.column + 1)){
        //Removes captured piece
        pieces[selection.row - 1][selection.column + 1] = EMPTY;
        //Updates total number of pieces red has
        redCounter--;
      }
    }
    
    //Moves piece
    pieces[r][c] = pieces[selection.row][selection.column];
    //Removes piece from old square
    pieces[selection.row][selection.column] = EMPTY;
    //Indicate that a move has been made
    moved = true;
  }
  
  //Capture logic for red piece
  else if (turn === false && pieces[selection.row][selection.column] === RED_PIECE && r === selection.row + 2 &&
 (c === selection.column + 2 && inBounds(selection.row + 1, selection.column + 1) && inBounds(selection.row + 2, selection.column + 2) && pieces[selection.row + 1][selection.column + 1] === BLACK_PIECE && pieces[selection.row + 2][selection.column + 2] === EMPTY || 
  c === selection.column - 2 && inBounds(selection.row + 1, selection.column - 1) && inBounds(selection.row + 2, selection.column - 2) && pieces[selection.row + 1][selection.column - 1] === BLACK_PIECE && pieces[selection.row + 2][selection.column - 2] === EMPTY)){
    
    if (r === selection.row + 2 && c === selection.column - 2){
      //Check if in bounds
      if (inBounds(selection.row + 1, selection.column - 1)){
        //Removes captured piece
        pieces[selection.row + 1][selection.column - 1] = EMPTY;
        //Updates total number of pieces black has
        blackCounter--;
      }
    }
    else if (r === selection.row + 2 && c === selection.column + 2){
      //Check if in bounds
      if (inBounds(selection.row + 1, selection.column + 1)){
        //Removes captured piece
        pieces[selection.row + 1][selection.column + 1] = EMPTY;
        //Updates total number of pieces black has
        blackCounter--;
      }
    }
    
    //Moves piece
    pieces[r][c] = pieces[selection.row][selection.column];
    //Removes piece from old square
    pieces[selection.row][selection.column] = EMPTY;
    //Indicate that a move has been made
    moved = true;
  }

  
  
  //Normal movement for a black king
  else if (turn === true && pieces[selection.row][selection.column] === BLACK_KING && pieces[r][c] === EMPTY && (r === selection.row + 1 || r === selection.row - 1) && (c === selection.column + 1 || c === selection.column - 1)){
    //Moves king
    pieces[r][c] = pieces[selection.row][selection.column];
    //Removes king from old square
    pieces[selection.row][selection.column] = EMPTY;
    //Indicate a move has been made
    moved = true;
  }
  
  //Normal movement for a red king
  else if (turn === false && pieces[selection.row][selection.column] === RED_KING && pieces[r][c] === EMPTY && (r === selection.row + 1 || r === selection.row - 1) && (c === selection.column + 1 || c === selection.column - 1)){
    //Moves king
    pieces[r][c] = pieces[selection.row][selection.column];
    //Removes king from old square
    pieces[selection.row][selection.column] = EMPTY;
    //Indicate that a move has been made
    moved = true;
  }
  

  //Capture logic for black king
  else if (turn === true && pieces[selection.row][selection.column] === BLACK_KING &&
 (r === selection.row - 2 && c === selection.column + 2 && inBounds(selection.row - 1, selection.column + 1) && inBounds(selection.row - 2, selection.column + 2) && (pieces[selection.row - 1][selection.column + 1] === RED_PIECE || pieces[selection.row - 1][selection.column + 1] === RED_KING) && pieces[selection.row - 2][selection.column + 2] === EMPTY || 
  r === selection.row + 2 && c === selection.column + 2 && inBounds(selection.row + 1, selection.column + 1) && inBounds(selection.row + 2, selection.column + 2) && (pieces[selection.row + 1][selection.column + 1] === RED_PIECE || pieces[selection.row + 1][selection.column + 1] === RED_KING) && pieces[selection.row + 2][selection.column + 2] === EMPTY ||
  r === selection.row - 2 && c === selection.column - 2 && inBounds(selection.row - 1, selection.column - 1) && inBounds(selection.row - 2, selection.column - 2) && (pieces[selection.row - 1][selection.column - 1] === RED_PIECE || pieces[selection.row - 1][selection.column - 1] === RED_KING) && pieces[selection.row - 2][selection.column - 2] === EMPTY ||
  r === selection.row + 2 && c === selection.column - 2 && inBounds(selection.row + 1, selection.column - 1) && inBounds(selection.row + 2, selection.column - 2) && (pieces[selection.row + 1][selection.column - 1] === RED_PIECE || pieces[selection.row + 1][selection.column - 1] === RED_KING) && pieces[selection.row + 2][selection.column - 2] === EMPTY)){
    
    //Checks captures for all four ways, removes captured piece, and updates the number of pieces red has
    if (r === selection.row + 2 && c === selection.column - 2 && inBounds(selection.row + 1, selection.column - 1)){
      pieces[selection.row + 1][selection.column - 1] = EMPTY;
      redCounter--;
    }
    else if (r === selection.row + 2 && c === selection.column + 2 && inBounds(selection.row + 1, selection.column + 1)){
      pieces[selection.row + 1][selection.column + 1] = EMPTY;
      redCounter--;
    }
    else if (r === selection.row - 2 && c === selection.column + 2 && inBounds(selection.row - 1, selection.column + 1)){
      pieces[selection.row - 1][selection.column + 1] = EMPTY;
      redCounter--;
    }
    else if (r === selection.row - 2 && c === selection.column - 2 && inBounds(selection.row - 1, selection.column - 1)){
      pieces[selection.row - 1][selection.column - 1] = EMPTY;
      redCounter--;
    }

    //Moves king, removes king from old square, indicate a move has been made
    pieces[r][c] = pieces[selection.row][selection.column];
    pieces[selection.row][selection.column] = EMPTY;
    moved = true;
  }

  //capture logic for red king
  else if (turn === false && pieces[selection.row][selection.column] === RED_KING &&
 (r === selection.row - 2 && c === selection.column + 2 && inBounds(selection.row - 1, selection.column + 1) && inBounds(selection.row - 2, selection.column + 2) && (pieces[selection.row - 1][selection.column + 1] === BLACK_PIECE || pieces[selection.row - 1][selection.column + 1] === BLACK_KING) && pieces[selection.row - 2][selection.column + 2] === EMPTY || 
  r === selection.row + 2 && c === selection.column + 2 && inBounds(selection.row + 1, selection.column + 1) && inBounds(selection.row + 2, selection.column + 2) && (pieces[selection.row + 1][selection.column + 1] === BLACK_PIECE || pieces[selection.row + 1][selection.column + 1] === BLACK_KING) && pieces[selection.row + 2][selection.column + 2] === EMPTY ||
  r === selection.row - 2 && c === selection.column - 2 && inBounds(selection.row - 1, selection.column - 1) && inBounds(selection.row - 2, selection.column - 2) && (pieces[selection.row - 1][selection.column - 1] === BLACK_PIECE || pieces[selection.row - 1][selection.column - 1] === BLACK_KING) && pieces[selection.row - 2][selection.column - 2] === EMPTY ||
  r === selection.row + 2 && c === selection.column - 2 && inBounds(selection.row + 1, selection.column - 1) && inBounds(selection.row + 2, selection.column - 2) && (pieces[selection.row + 1][selection.column - 1] === BLACK_PIECE || pieces[selection.row + 1][selection.column - 1] === BLACK_KING) && pieces[selection.row + 2][selection.column - 2] === EMPTY)){
  
    //Checks captures for all four ways, removes captured piece, and updates the number of pieces black has
    if (r === selection.row + 2 && c === selection.column - 2 && inBounds(selection.row + 1, selection.column - 1)){
      pieces[selection.row + 1][selection.column - 1] = EMPTY;
      blackCounter--;
    }
    else if (r === selection.row + 2 && c === selection.column + 2 && inBounds(selection.row + 1, selection.column + 1)){
      pieces[selection.row + 1][selection.column + 1] = EMPTY;
      blackCounter--;
    }
    else if (r === selection.row - 2 && c === selection.column + 2 && inBounds(selection.row - 1, selection.column + 1)){
      pieces[selection.row - 1][selection.column + 1] = EMPTY;
      blackCounter--;
    }
    else if (r === selection.row - 2 && c === selection.column - 2 && inBounds(selection.row - 1, selection.column - 1)){
      pieces[selection.row - 1][selection.column - 1] = EMPTY;
      blackCounter--;
    }

    //Moves king, removes king from old square, indicate a move has been made
    pieces[r][c] = pieces[selection.row][selection.column];
    pieces[selection.row][selection.column] = EMPTY;
    moved = true;
  }

  //If a move happened, switch turns
  if (moved){
    selection = null;
    turn = !turn;
  }
}

function promotion(){

  //Promotes black and red pieces if they reach the other side
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (pieces[r][c] === BLACK_PIECE && r === 0) {
        pieces[r][c] = BLACK_KING;
      }
      else if (pieces[r][c] === RED_PIECE && r === ROWS - 1){
        pieces[r][c] = RED_KING;
      }
    }
  }
}

function highlighter(r, c){
  //Check for out of bounds
  if (!inBounds(r, c)){
    return;
  }

  //Not highlighting if the square is not empty and a move there cannot be made there
  if (pieces[r][c] !== EMPTY){
    return;
  }

  //Draws a small circle indicating a possible square to move to
  push();
  
  fill(255, 255, 0, 50);
  noStroke();

  circle(gridSize * (c + 0.5), gridSize * (r + 0.5), gridSize * HIGHLIGHTER_SIZE);

  pop();

}

function highlightValidMoves(){
  //No highlights if a piece is not selected
  if (selection === null){
    return;
  }

  //Sets the selected row and column as r and c
  let r = selection.row;
  let c = selection.column;

  if (pieces[r][c] === BLACK_PIECE){
    //Highlight black pieces' normal moves
    highlighter(r - 1, c - 1);
    highlighter(r - 1, c + 1);
    
    //Highlight black pieces' captures
    if (inBounds(r - 1, c - 1) && pieces[r - 1][c - 1] === RED_PIECE){
      highlighter(r - 2, c - 2);
    }
    if (inBounds(r - 1, c + 1) && pieces[r - 1][c + 1] === RED_PIECE){
      highlighter(r - 2, c + 2);
    }
  }

  else if (pieces[r][c] === RED_PIECE){
    //Highlights red pieces' normal moves
    highlighter(r + 1, c - 1);
    highlighter(r + 1, c + 1);
    
    //Highlights red pieces' capture moves
    if (inBounds(r + 1, c - 1) && pieces[r + 1][c - 1] === BLACK_PIECE){
      highlighter(r + 2, c - 2);
    }
    if (inBounds(r + 1, c + 1) && pieces[r + 1][c + 1] === BLACK_PIECE){
      highlighter(r + 2, c + 2);
    }
  }


  else if (pieces[r][c] === BLACK_KING){
    //Highlights black kings' normal moves
    highlighter(r - 1, c - 1);
    highlighter(r - 1, c + 1);
    highlighter(r + 1, c - 1);
    highlighter(r + 1, c + 1);

    //Highlights black kings' capture moves
    if (inBounds(r - 1, c - 1) && (pieces[r - 1][c - 1] === RED_PIECE || pieces[r - 1][c - 1] === RED_KING)){
      highlighter(r - 2, c - 2);
    }
    if (inBounds(r - 1, c + 1) && (pieces[r - 1][c + 1] === RED_PIECE || pieces[r - 1][c + 1] === RED_KING)){
      highlighter(r - 2, c + 2);
    }
    if (inBounds(r + 1, c - 1) && (pieces[r + 1][c - 1] === RED_PIECE || pieces[r + 1][c - 1] === RED_KING)){
      highlighter(r + 2, c - 2);
    }
    if (inBounds(r + 1, c + 1) && (pieces[r + 1][c + 1] === RED_PIECE || pieces[r + 1][c + 1] === RED_KING)){
      highlighter(r + 2, c + 2);
    }
  }

  else if (pieces[r][c] === RED_KING){
    //Highlights red kings' normal moves
    highlighter(r - 1, c - 1);
    highlighter(r - 1, c + 1);
    highlighter(r + 1, c - 1);
    highlighter(r + 1, c + 1);

    //Highlights red kings' capture moves
    if (inBounds(r - 1, c - 1) && (pieces[r - 1][c - 1] === BLACK_PIECE || pieces[r - 1][c - 1] === BLACK_KING)){
      highlighter(r - 2, c - 2);
    }
    if (inBounds(r - 1, c + 1) && (pieces[r - 1][c + 1] === BLACK_PIECE || pieces[r - 1][c + 1] === BLACK_KING)){
      highlighter(r - 2, c + 2);
    }
    if (inBounds(r + 1, c - 1) && (pieces[r + 1][c - 1] === BLACK_PIECE || pieces[r + 1][c - 1] === BLACK_KING)){
      highlighter(r + 2, c - 2);
    }
    if (inBounds(r + 1, c + 1) && (pieces[r + 1][c + 1] === BLACK_PIECE || pieces[r + 1][c + 1] === BLACK_KING)){
      highlighter(r + 2, c + 2);
    }
  }
}

function displayWin(){
  //Creates a black background and sets text settings when one side wins
  if (redCounter === 0 || blackCounter === 0){
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(50);
  }

  //Display black wins
  if (redCounter === 0){
    text("Black Wins", width/2, height/2);
    //Ends the game
    !gameOver;
  }

  //Displays red wins
  else if (blackCounter === 0){
    text("Red Wins", width/2, height/2);
    //Ends the game
    !gameOver;
  }
}
