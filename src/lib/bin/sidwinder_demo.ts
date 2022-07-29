import { Grid } from "$lib/grid";
import { Sidewinder } from "$lib/sidewinder";


export function setup_sidewinder_grid(grid_size: number): Grid {

    const grid = new Grid(grid_size, grid_size);
    Sidewinder.on(grid);
    return grid;
}