import { Direction } from '$lib/grids/directions';
import type { Grid } from '../grids/grid';

export class BinaryTree {
	static on(grid: Grid, weights = new Map([[Direction.North,0.5],  [Direction.East, 0.5]]), halt?: number) {
		const cells = grid.cells();

		for (
			let cell_index = 0;
			cell_index < cells.length && (halt == undefined || halt > cell_index);
			cell_index++
		) {
			const cell = cells[cell_index];
			const neighbour = cell.rand_neighbour(weights);

			if (neighbour != undefined) {
				cell.link(neighbour);
			}
		}
		return grid;
	}
}
