// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CELL_SIZE = 50;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const PLAYER = 9;
let grid;
let rows;
let columns;
let thePlayer = {
  x: 0,
  y: 0
};

let grassImg;
let pathImg;

function preload(){
  grassImg = loadImage("grass.png");
  pathImg = loadImage("paving.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(width/CELL_SIZE);
  columns = Math.floor(height/CELL_SIZE);
  grid = generateRandomGrid(columns, rows);

  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid(){
  for (let i = 0; i < rows; i++){
    for (let j = 0; j < columns; j++){
      if (grid[i][j] === OPEN_TILE){
        //fill("white");
        image(pathImg, j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE);
      }
      else if (grid[i][j] === IMPASSIBLE){
        //fill("black");
        image(grassImg, j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE);
      }
      if(grid[i][j] === PLAYER){
        fill("red");
        square(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE);
      }
    }
  }
}

function mouseClicked(){
  let j = Math.floor(mouseX/CELL_SIZE);
  let i = Math.floor(mouseY/CELL_SIZE);

  toggleCell(j, i);
}

function toggleCell(j, i){
  if (j >= 0 && j < columns && i >= 0 && i < rows){
    if (grid[i][j] === OPEN_TILE){
      grid[i][j] = IMPASSIBLE;
    }
    else if (grid[i][j] === IMPASSIBLE){
      grid[i][j] = OPEN_TILE;
    }
  }
}

function keyPressed(){
  if (key === "r"){
    grid = generateRandomGrid(columns, rows);
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
  if (key === "o"){
    grid = generateRandomGrid(columns, rows);
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
  if (key === "e"){
    grid = generateEmptyGrid(columns, rows);
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
  if (key === "s"){
    movePlayer(thePlayer.x, thePlayer.y + 1);
  }
  if (key === "w"){
    movePlayer(thePlayer.x, thePlayer.y - 1);
  }
  if (key === "a"){
    movePlayer(thePlayer.x - 1, thePlayer.y);
  }
  if (key === "d"){
    movePlayer(thePlayer.x + 1, thePlayer.y);
  }

}

function movePlayer(x, y){
  if (x >= 0 && x < columns && y >= 0 && y < rows && grid[y][x] === OPEN_TILE){
    let oldX = thePlayer.x;
    let oldY = thePlayer.y;
    
    thePlayer.x = x;
    thePlayer.y = y;

    grid[thePlayer.y][thePlayer.x] = PLAYER;

    grid[oldY][oldX] = OPEN_TILE;
  }
}

function generateEmptyGrid(){
  let newGrid = [];
  for (let i = 0; i < rows; i++){
    newGrid.push([]);
    for (let j = 0; j< columns; j++){
      newGrid[i].push(OPEN_TILE);
    }
  }
  return newGrid;
}




function generateRandomGrid(){
  let newGrid = [];
  for (let i = 0; i < rows; i++){
    newGrid.push([]);
    for (let j = 0; j< columns; j++){
      if (random(100) < 50){
        newGrid[i].push(OPEN_TILE);
      } 
      else{
        newGrid[i].push(IMPASSIBLE);
      }
    }
  }
  return newGrid;
}
