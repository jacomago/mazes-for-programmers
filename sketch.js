
import Grid from "grid";
import BinaryTree from "binary_tree";

function setup() {
  createCanvas(400, 400);
  grid = new Grid(4, 4);
  BinaryTree.on(grid);
  frameRate(10);
}

function draw() {
  background(255);
  translate(40, 40);
  grid.draw(80);
}
