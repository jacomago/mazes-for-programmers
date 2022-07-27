
import Grid from "grid";
import BinaryTree from "binary_tree";

function setup() {
  createCanvas(400, 400);
  grid = new Grid(4, 4);
  BinaryTree.on(grid);
  frameRate(10);
}

function draw() {
  background(220);
  translate(10, 10);
  grid.draw(90);
}
