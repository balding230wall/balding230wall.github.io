// Connect Four
// Chuyan Wang
// March 3, 2026
//
// Extra for Experts:
// Used a 2D array to create the board for the game

//setting variables
let turn = true;
let selectionColumn = 25;

//creating a 2D array
let board = [[0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0]];



function setup(){
  //create the canvas
  createCanvas(400, 400);
}


function draw(){
  //calls the functions below
  drawBackground();
  drawPieces();
  selectionBox();
}


function drawBackground(){
  //draws a green rectangle that acts for the game board
  fill(144, 238, 144);
  rect(25, 0, 350, 380);

  //using a nested loop to draw circles to create an empty board
  for (let boardRow = 0; boardRow < 7; boardRow++){
    for (let boardColumn = 0; boardColumn < 7; boardColumn++){
      fill("white");
      circle(boardColumn * 50 + 50, boardRow * 50 + 50, 40);
    }
  }
}


function selectionBox(){
  //creates a translucent box that highlights the currently selected column
  fill(0, 100);
  rect(selectionColumn, 0, 50, 380);
}


function keyPressed(){
  //moves the selection box to the right when right arrow is pressed
  if (keyCode === RIGHT_ARROW){
    fill(0, 100);
    rect(selectionColumn, 0, 50, 380);
    if (selectionColumn < 300){
      selectionColumn = selectionColumn + 50;
    }
  }
  
  //moves the selection box to the left when left arrow is pressed
  if (keyCode === LEFT_ARROW){
    fill(0, 100);
    rect(selectionColumn, 0, 50, 380);
    if (selectionColumn > 50){
      selectionColumn = selectionColumn - 50;
    }
  } 
}


function mouseClicked(){
  //converts selection box position to a position in the array
  let currentColumn = (selectionColumn - 25) / 50;
  
  //calls the place piece function
  placePiece(currentColumn);

  //checks whether someone has won
  checkWin();
  
  //swaps turns between the players
  turn = !turn;
}


function placePiece(currentColumn) {
  /*
  checks every row in the selected column to see if it has already been claimed by a player, 
  starting from the bottom. When it finds an unclaimed row, indicate whether it will now be claimed
  by player one or two, depending on the turn.
  */
  for (let pieceRow = 6; pieceRow >= 0; pieceRow--){
    if (board[pieceRow][currentColumn] === 0) {
      if (turn === true){
        board[pieceRow][currentColumn] = 1;
      }
      else{
        board[pieceRow][currentColumn] = 2;
      }
      break;
    }
  }
}


function drawPieces() {
/*
constantly checks each value in the array. If it finds a value claimed by a player (either turning to
one or two), it will create a colored circle there based on who claimed it.
*/
  for (let pieceRow = 0; pieceRow < 7; pieceRow++){
    for (let pieceColumn = 0; pieceColumn < 7; pieceColumn++){
        
      if (board[pieceRow][pieceColumn] === 1){
        fill("red");
        circle(pieceColumn * 50 + 50, pieceRow * 50 + 50, 40);
      }
       
      if (board[pieceRow][pieceColumn] === 2){
        fill("yellow");
        circle(pieceColumn * 50 + 50, pieceRow * 50 + 50, 40);
      }
    }
  }
}

function checkWin(){
  //checks for a possible horizontal win
  for (let boardRow = 0; boardRow < 7; boardRow++){
    for (let boardColumn = 0; boardColumn < 4; boardColumn++){
      let checkForFour = board[boardRow][boardColumn];
      if (checkForFour !== 0 && checkForFour === board[boardRow][boardColumn + 1] &&
          checkForFour === board[boardRow][boardColumn + 2] && checkForFour === board[boardRow][boardColumn + 3]){
        if (checkForFour === 1){
          console.log("Red Wins!");
        }
        else if (checkForFour === 2){
          console.log("Yellow Wins!");
        }
      }
    }
  }

  //checks for a possible vertical win
  for (let boardColumn = 0; boardColumn < 7; boardColumn++){
    for (let boardRow = 0; boardRow < 4; boardRow++){
      let checkForFour = board[boardRow][boardColumn];
      if (checkForFour !== 0 && checkForFour === board[boardRow + 1][boardColumn] &&
          checkForFour === board[boardRow + 2][boardColumn] && checkForFour === board[boardRow + 3][boardColumn]){
        if (checkForFour === 1){
          console.log("Red Wins!");
        }
        else if (checkForFour === 2){
          console.log("Yellow Wins!");
        }
      }
    }
  }

  //checks for a possible diagonal win one way
  for (let boardColumn = 0; boardColumn < 4; boardColumn++){
    for (let boardRow = 0; boardRow < 4; boardRow++){
      let checkForFour = board[boardRow][boardColumn];
      if (checkForFour !== 0 && checkForFour === board[boardRow + 1][boardColumn + 1] &&
          checkForFour === board[boardRow + 2][boardColumn + 2] && checkForFour === board[boardRow + 3][boardColumn + 3]){
        if (checkForFour === 1){
          console.log("Red Wins!");
        }
        else if (checkForFour === 2){
          console.log("Yellow Wins!");
        }
      }
    }
  }

  //checks for a possible diagonal win the other way
  for (let boardColumn = 3; boardColumn < 7; boardColumn++){
    for (let boardRow = 0; boardRow < 4; boardRow++){
      let checkForFour = board[boardRow][boardColumn];
      if (checkForFour !== 0 && checkForFour === board[boardRow + 1][boardColumn - 1] &&
          checkForFour === board[boardRow + 2][boardColumn - 2] && checkForFour === board[boardRow + 3][boardColumn - 3]){
        if (checkForFour === 1){
          console.log("Red Wins!");
        }
        else if (checkForFour === 2){
          console.log("Yellow Wins!");
        }
      }
    }
  }
}


