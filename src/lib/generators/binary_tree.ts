import type { Cell } from '../grids/cell';
import type { Grid } from '../grids/grid';

export class BinaryTree {
	static on(grid: Grid) {
		const cells = grid.cells();
		for (let cell_index = 0; cell_index < cells.length; cell_index++) {
			const cell = cells[cell_index];
			const neighbours: Cell[] = [];
			if (cell.north != undefined) neighbours.push(cell.north);
			if (cell.east != undefined) neighbours.push(cell.east);

			if (neighbours.length > 0) {
				const index = Math.floor(Math.random() * neighbours.length);
				const neighbour = neighbours[index];
				cell.link(neighbour);
			}
		}
		return grid;
	}
}
