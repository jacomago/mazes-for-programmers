import type { Cell } from '../grids/cell';
import type { Grid } from '../grids/grid';

export class Sidewinder {
	static on(grid: Grid) {
		const cells = grid.cell_rows();
		for (let cell_row_index = 0; cell_row_index < cells.length; cell_row_index++) {
			const row = cells[cell_row_index];
			let run: Cell[] = [];
			for (let cell_index = 0; cell_index < row.length; cell_index++) {
				const cell = row[cell_index];
				run.push(cell);

				const at_eastern_boundary = cell.east == null;
				const at_northern_boundary = cell.north == null;

				const should_close_out =
					at_eastern_boundary || (!at_northern_boundary && Math.floor(Math.random() * 2) == 0);

				if (should_close_out) {
					const index = Math.floor(Math.random() * run.length);
					const member = run[index];
					if (member.north != null) member.link(member.north());
					run = [];
				} else {
					if (cell.east != undefined) {
						cell.link(cell.east());
					}
				}
			}
		}

		return grid;
	}
}
