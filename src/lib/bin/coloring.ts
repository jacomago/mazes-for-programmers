import { ColoredGrid } from "$lib/colored_grid";
import type { DistanceGrid } from "$lib/distance_grid";
import { Sidewinder } from "$lib/sidewinder";

export function colored_grid(grid_size: number): DistanceGrid {
    const grid = new ColoredGrid(grid_size, grid_size);
    Sidewinder.on(grid);
    const start = grid.get(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2));
    grid.set_distances(start.distances());
    return grid;
}
