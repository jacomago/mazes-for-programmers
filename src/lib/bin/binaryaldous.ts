import { ColoredGrid } from '$lib/grids/colored_grid';
import type { DistanceGrid } from '$lib/grids/distance_grid';
import { BinaryAldous } from '$lib/generators/binaryaldours';

export function binary_aldous_setup(
    grid_size: number,
    amount
): DistanceGrid {
    const grid = new ColoredGrid(grid_size, grid_size);
    BinaryAldous.on(grid, amount);
    const origin_x = Math.floor(grid_size / 2);
    const origin_y = Math.floor(grid_size / 2);
    const start = grid.get(origin_x, origin_y);
    grid.set_distances(start.distances());
    return grid;
}
