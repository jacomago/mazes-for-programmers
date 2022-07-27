
let grid;
let grid2;
function setup() {
  width = 400;
  height = 800;
  createCanvas(width, height);
  grid_size = 40;
  border = 40;
  grid = new Grid(grid_size, grid_size);
  grid2 = new Grid(grid_size, grid_size);
  BinaryTree.on(grid);
  Sidewinder.on(grid2);
  cell_size = (width - border) / grid_size;
  frameRate(10);
}

function draw() {
  background(255);

  translate(border, border);
  grid.draw(cell_size, 0);
  grid.draw_graph(cell_size, 200);
  translate(0, 400);
  grid2.draw(cell_size, 0);
  grid2.draw_graph(cell_size, 200);

}
