// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Vehicle{
  constructor(type, name){
    this.type = type;
    this.name = name;
  }

  getName(){
    return this.name;
  }

  getType(){
    return this.type;
  }
}

class Car extends Vehicle{
  constructor(name) {
    super("car", name);
  }

  getName(){
    return "This is a car called" + super.getName;
  }
}

//let myCar = new Vehicle("Car", "Kona");
let myCar = new Car("Kona");

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(myCar.getType());
  console.log(myCar.getName());
}

function draw() {
  background(220);
}
