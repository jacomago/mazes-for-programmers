import { RecursiveBacktracker } from '$lib/generators/recursivebacktraker';
import type { Direction } from '$lib/grids/directions';
import { Mask, MaskGrid } from '$lib/grids/mask';

export function mask_grid(
	grid_size: number,
    weights: Map<Direction, number>,
    mask: Mask
): MaskGrid {
	const grid = new MaskGrid(grid_size, grid_size, mask);
	grid.init();
	const origin_x = Math.floor(grid_size / 2);
	const origin_y = Math.floor(grid_size / 2);
	const start = grid.get(origin_x, origin_y);
	RecursiveBacktracker.on(grid, start, weights);
	return grid;
}
