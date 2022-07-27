
import { Grid } from "grid";
import { BinaryTree } from "binary_tree";
import { Sidewinder } from "sidewinder";

function setup() {
  createCanvas(400, 400);
  grid = new Grid(64, 64);
  BinaryTree.on(grid);
  console.log(grid.toString());
  frameRate(10);
}

function draw() {
  background(255);
  translate(40, 40);
  grid.draw(5);
}
 