
let grid;
let grid2;
let grid_distance;
function setup() {
  width = 800;
  height = 800;
  createCanvas(width, height);
  grid_size = 20;
  border = 40;
  cell_size = (width * 0.5 - border) / grid_size;

  grid = new Grid(grid_size, grid_size);
  BinaryTree.on(grid);
  grid2 = new Grid(grid_size, grid_size);
  Sidewinder.on(grid2);

  grid_distance = new DistanceGrid(grid_size, grid_size);
  BinaryTree.on(grid_distance);
  let start = grid_distance.get(0, 0);
  let distances = start.distances();
  grid_distance.distances = distances;
  console.log(distances);
  frameRate(10);
}

function draw() {
  background(255);

  translate(border, border);
  grid.draw(cell_size, 0);
  //grid.draw_graph(cell_size, 200);
  translate(0, 400);
  grid2.draw(cell_size, 0);
  //grid2.draw_graph(cell_size, 200);

  translate(400, 0);
  grid_distance.draw(cell_size, 0);
  //grid_distance.draw_graph(cell_size, 200);
}
