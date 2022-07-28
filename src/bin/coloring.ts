import { BinaryTree } from "../lib/binary_tree";
import { ColoredGrid } from "../lib/colored_grid";
import { DistanceGrid } from "../lib/distance_grid";
import { Sidewinder } from "../lib/sidewinder";

export function colored_grid(grid_size: number): DistanceGrid {
    let grid = new ColoredGrid(grid_size, grid_size);
    Sidewinder.on(grid);
    let start = grid.get(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2))!;
    grid.set_distances(start.distances());
    return grid;
}
