import { ColoredGrid } from '$lib/grids/colored_grid';
import type { DistanceGrid } from '$lib/grids/distance_grid';
import { Wilson } from '$lib/generators/wilson';
import type { Direction } from '$lib/grids/directions';

export function wilson_colored_grid(
	grid_size: number,
	weights: Map<Direction, number>
): DistanceGrid {
	const grid = new ColoredGrid(grid_size, grid_size);
	grid.init();
	Wilson.on(grid, weights);
	const origin_x = Math.floor(grid_size / 2);
	const origin_y = Math.floor(grid_size / 2);
	const start = grid.get(origin_x, origin_y);
	grid.set_distances(start.distances());
	return grid;
}
