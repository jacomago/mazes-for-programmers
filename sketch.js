import { Grid } from "grid";
import { BinaryTree } from "binary_tree";
import { Sidewinder } from "sidewinder";

function setup() {
  createCanvas(400, 400);
  grid = new Grid(10, 10);
  BinaryTree.on(grid);
  frameRate(10);
}

function draw() {
  background(255);
  translate(40, 40);
  grid.draw(30, 5);
  grid.draw_graph(30, 200);
}
