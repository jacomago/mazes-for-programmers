import { RecursiveBacktracker } from '$lib/generators/recursivebacktraker';
import { ColoredGrid } from '$lib/grids/colored_grid';
import type { Direction } from '$lib/grids/directions';
import type { DistanceGrid } from '$lib/grids/distance_grid';

export function backtrack_colored_grid(
	grid_size: number,
	weights: Map<Direction, number>,
	origin_x = Math.floor(grid_size / 2),
	origin_y = Math.floor(grid_size / 2)
): DistanceGrid {
	const grid = new ColoredGrid(grid_size, grid_size);
	const start = grid.get(origin_x, origin_y);
	RecursiveBacktracker.on(grid, start, weights);
	grid.set_distances(start.distances());
	return grid;
}
