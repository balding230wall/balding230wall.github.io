// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CELL_SIZE = 20;
const RENDER_ON_FRAME = 1;
const LIVE_CELL = 1;
const DEAD_CELL = 0;
let autoPlayIsOn = true;
let grid;
let rows;
let columns;
let gosper;

function preload(){
  gosper = loadJSON("gosper.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(width/CELL_SIZE);
  columns = Math.floor(height/CELL_SIZE);
  grid = generateRandomGrid(columns, rows);
}

function draw() {
  background(220);
  if (autoPlayIsOn && frameCount % RENDER_ON_FRAME === 0){
    grid = updateGrid();
  }
  displayGrid();
}

function displayGrid(){
  for (let i = 0; i < rows; i++){
    for (let j = 0; j < columns; j++){
      if (grid[i][j] === DEAD_CELL){
        fill("white");
      }
      else if (grid[i][j] === LIVE_CELL){
        fill("black");
      }
      square(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE);
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
    if (grid[i][j] === DEAD_CELL){
      grid[i][j] = LIVE_CELL;
    }
    else if (grid[i][j] === LIVE_CELL){
      grid[i][j] = DEAD_CELL;
    }
  }
}

function keyPressed(){
  if (key === "r"){
    grid = generateRandomGrid(columns, rows);
  }
  if (key === "o"){
    grid = generateRandomGrid(columns, rows);
  }
  if (key === "e"){
    grid = generateEmptyGrid(columns, rows);
  }
  if (key === "a"){
    autoPlayIsOn = !autoPlayIsOn;
  }
  if (key === " "){
    grid = updateGrid();
  }
  if ( key === "g"){
    grid = gosper;
  }
}

function generateEmptyGrid(){
  let newGrid = [];
  for (let i = 0; i < rows; i++){
    newGrid.push([]);
    for (let j = 0; j< columns; j++){
      newGrid[i].push(DEAD_CELL);
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
        newGrid[i].push(DEAD_CELL);
      } 
      else{
        newGrid[i].push(LIVE_CELL);
      }
    }
  }
  return newGrid;
}

function updateGrid(){
  let nextTurn = generateEmptyGrid(columns, rows);

  for (let i = 0; i < rows; i++){
    for (let j = 0; j < columns; j++){
      let neighbors = 0;

      for (let y = -1; y <=1; y++){
        for (let x = -1; x <= 1; x++){
          if (j+x >= 0 && j+x < columns && i+y >= 0 && i+y < rows){
            neighbors += grid[i+y][j+x];
          }
        }
      }

      neighbors -= grid[i][j];

      if (grid[i][j] === LIVE_CELL){
        if (neighbors === 2 || neighbors === 3){
          nextTurn[i][j] = LIVE_CELL;
        }
        else{
          nextTurn[i][j] = DEAD_CELL;
        }
      }
      
      if (grid[i][j] === DEAD_CELL){
        if (neighbors === 3){
          nextTurn[i][j] = LIVE_CELL;
        }
        else{
          nextTurn[i][j] = DEAD_CELL;
        }
      }
    }
  }
  return nextTurn;
}