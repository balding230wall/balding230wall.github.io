// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CELL_SIZE = 20;
const RENDER_ON_FRAME = 1;
let autoPlayIsOn = true;
let grid;
let rows;
let columns;

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
      if (grid[i][j] === 0){
        fill("white");
      }
      else if (grid[i][j] === 1){
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
    if (grid[i][j] === 0){
      grid[i][j] = 1;
    }
    else if (grid[i][j] === 1){
      grid[i][j] = 0;
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
}

function generateEmptyGrid(){
  let newGrid = [];
  for (let i = 0; i < rows; i++){
    newGrid.push([]);
    for (let j = 0; j< columns; j++){
      newGrid[i].push(0);
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
        newGrid[i].push(0);
      } 
      else{
        newGrid[i].push(1);
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

      if (grid[i][j] === 1){
        if (neighbors === 2 || neighbors === 3){
          nextTurn[i][j] = 1;
        }
        else{
          nextTurn[i][j] = 0;
        }
      }
      
      if (grid[i][j] === 0){
        if (neighbors === 3){
          nextTurn[i][j] = 1;
        }
        else{
          nextTurn[i][j] = 0;
        }
      }
    }
  }
  return nextTurn;
}