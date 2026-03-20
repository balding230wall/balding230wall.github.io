// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CELL_SIZE = 100;
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
  toggleCell(j + 1, i);
  toggleCell(j - 1, i);
  toggleCell(j, i + 1);
  toggleCell(j, i - 1);
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
