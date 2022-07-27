// GLOBAL VARS & TYPES
let numberOfShapesControl: p5.Element;
let grid_size: number;
let border: number;
let cell_size: number;
let grid: Grid;
let grid2: Grid;
let grid_distance: DistanceGrid;

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
  console.log("🚀 - Setup initialized - P5 is running");

  createCanvas(windowWidth, windowHeight)
  rectMode(CENTER).noFill().frameRate(30);
  // NUMBER OF SHAPES SLIDER
  numberOfShapesControl = createSlider(1, 30, 15, 1).position(10, 10).style("width", "100px");
  grid_size = 10;
  border = 40;
  calcCellSize();

  grid = new Grid(grid_size, grid_size);
  BinaryTree.on(grid);
  grid2 = new Grid(grid_size, grid_size);
  Sidewinder.on(grid2);
  console.log('made first grids');
  grid_distance = new DistanceGrid(grid_size, grid_size);
  BinaryTree.on(grid_distance);
  let start = grid_distance.get(0, 0);
  let distances = start.distances();
  grid_distance.distances = distances;
  console.log('made distance grid');
  frameRate(10);
}

function calcCellSize() {
  cell_size = (windowWidth * 0.45 - border) / grid_size;
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calcCellSize();
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {
  background(255);

  translate(border, border);
  grid.draw(cell_size, 0);
  //grid.draw_graph(cell_size, 200);
  translate(0, windowWidth * 0.5);
  grid2.draw(cell_size, 0);
  //grid2.draw_graph(cell_size, 200);

  translate(windowWidth * 0.5, 0);
  grid_distance.draw(cell_size, 0);
  //grid_distance.draw_graph(cell_size, 200);
}
