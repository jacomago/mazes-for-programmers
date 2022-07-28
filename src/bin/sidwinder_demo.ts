import { Grid } from "../lib/grid";
import { Sidewinder } from "../lib/sidewinder";

function setup_sidewinder_grid(grid_size: number): Grid {

    let grid = new Grid(grid_size, grid_size);
    Sidewinder.on(grid);
    return grid;
}