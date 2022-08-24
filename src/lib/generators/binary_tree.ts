import { Direction } from '$lib/grids/directions';
import { Helpers } from '$lib/helpers';
import type { Cell } from '../grids/cell';
import type { Grid } from '../grids/grid';

export class BinaryTree {
	static on(grid: Grid, directions = [Direction.North, Direction.East], halt?: number) {
		const cells = grid.cells();
		const weights = new Map(directions.map(d => [d, 0.5]));
		console.log(weights);
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
