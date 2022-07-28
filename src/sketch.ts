// GLOBAL VARS & TYPES

import p5 from "p5";
import { longest_path_grid } from "./bin/longest_path";
import { DistanceGrid } from "./lib/distance_grid";

let sketch = function (p: p5) {
  let grid_size: p5.Element;
  let grid_size_value: number;
  let border: number;
  let cell_size: number;
  let grid_distance: DistanceGrid;
  p.preload = (): void => { };
  // P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
  p.setup = (): void => {
    console.log("🚀 - Setup initialized - P5 is running");

    p.createCanvas(p.windowWidth, p.windowHeight)
    p.rectMode(p.CENTER).noFill().frameRate(30);
    // NUMBER OF SHAPES SLIDER
    grid_size = p.createSlider(4, 100, 15, 1).position(20, 20).style("width", "100px");
    grid_size_value = <number>grid_size.value();
    border = 40;
    calcCellSize(grid_size_value);

    console.log('make grid');
    grid_distance = longest_path_grid(grid_size_value);
    p.frameRate(10);
  }

  function calcCellSize(grid_size: number) {
    cell_size = (p.windowWidth * 0.9 - border) / grid_size;
  }

  p.windowResized = (): void => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    calcCellSize(grid_size_value);
  }

  function update_grid_size_value() {
    let current_val = <number>grid_size.value();
    if (Math.abs(current_val - grid_size_value) > 0) {
      grid_size_value = current_val;
      calcCellSize(grid_size_value);
      grid_distance = longest_path_grid(grid_size_value);
    }
  }

  function update() {
    update_grid_size_value();
  }

  // p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
  p.draw = (): void => {
    p.background(255);
    update();
    p.translate(border, border);
    grid_distance.draw(p, cell_size, 0, true);
    //grid_distance.draw_graph(cell_size, 200);
  }
}
new p5(sketch);