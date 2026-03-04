// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  for (let ball of ballArray) {
    ball.x += ball.dx;
    ball.y += ball.dy;

    circle(ball.x, ball.y, ball.radius * 2);
  }
}

function mousePressed(){
  spawnBall(mouseX, mouseY);
}

function spawnBall(_x, _y){
  let someBall = {
    x: _x,
    y: _y,
    dx: random(-5, 5),
    dy: random(-5, 5),
    radius: random(10, 30),
    r: andom(0, 255),

    
  };
  ballArray.push(someBall);
}