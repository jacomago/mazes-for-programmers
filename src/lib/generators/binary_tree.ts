import { Direction } from '$lib/grids/directions';
import type { Cell } from '../grids/cell';
import type { Grid } from '../grids/grid';

export class BinaryTree {
	static on(grid: Grid, directions = [Direction.North, Direction.East], halt?: number) {
		const cells = grid.cells();
		for (
			let cell_index = 0;
			cell_index < cells.length && (halt == undefined || halt > cell_index);
			cell_index++
		) {
			const cell = cells[cell_index];
			const neighbours: Cell[] = cell.neighbours(directions);

			if (neighbours.length > 0) {
				const neighbour = cell.rand_neighbour();
				cell.link(neighbour);
			}
		}
		return grid;
	}
}
