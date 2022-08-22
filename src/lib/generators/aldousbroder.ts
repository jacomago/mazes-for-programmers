import type { Grid } from '$lib/grids/grid';

export class AldousBroder {
	static on(grid: Grid) {
		let cell = grid.rand_cell();
		let unvisited = grid.size() - 1;

		while (unvisited > 0) {
			const neighbour = cell.rand_neighbour();
			if (neighbour != undefined && neighbour.link_keys().size == 0) {
				cell.link(neighbour);
				unvisited -= 1;
			}
			cell = neighbour;
		}
		return grid;
	}
}
