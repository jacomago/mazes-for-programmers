import { ColoredGrid } from "$lib/grids/colored_grid";
import type { DistanceGrid } from "$lib/grids/distance_grid";
import { Sidewinder } from "$lib/generators/sidewinder";

export function colored_grid(grid_size: number, origin_x = Math.floor(grid_size / 2), origin_y = Math.floor(grid_size / 2)): DistanceGrid {
    const grid = new ColoredGrid(grid_size, grid_size);
    Sidewinder.on(grid);
    const start = grid.get(origin_x, origin_y);
    grid.set_distances(start.distances());
    return grid;
}
