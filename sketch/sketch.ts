// GLOBAL VARS & TYPES

let grid_size: p5.Element;
let grid_size_value: number;
let border: number;
let cell_size: number;
let grid_distance: DistanceGrid;

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
  console.log("🚀 - Setup initialized - P5 is running");

  createCanvas(windowWidth, windowHeight)
  rectMode(CENTER).noFill().frameRate(30);
  // NUMBER OF SHAPES SLIDER
  grid_size = createSlider(4, 100, 15, 1).position(20, 20).style("width", "100px");
  grid_size_value = <number>grid_size.value();
  border = 40;
  calcCellSize(grid_size_value);

  console.log('make grid');
  grid_distance = setup_distance_grid(grid_size_value);
  frameRate(10);
}

function calcCellSize(grid_size: number) {
  cell_size = (windowWidth * 0.9 - border) / grid_size;
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calcCellSize(grid_size_value);
}

function update_grid_size_value() {
  let current_val = <number>grid_size.value();
  if (abs(current_val - grid_size_value) > 0) {
    grid_size_value = current_val;
    calcCellSize(grid_size_value);
    grid_distance = setup_distance_grid(grid_size_value);
  }
}

function update() {
  update_grid_size_value();
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {
  background(255);
  update();
  translate(border, border);
  grid_distance.draw(cell_size, 0);
  //grid_distance.draw_graph(cell_size, 200);
}
