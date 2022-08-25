import { default_weights } from '$lib/grids/directions';
import type { Grid } from '$lib/grids/grid';

export class AldousBroder {
	static on(grid: Grid, weights = default_weights, max = 900000) {
		let cell = grid.rand_linked_cell();
		let unvisited = grid.unlinked_cells().length - 1;
		let count = 0;
		while (unvisited > 0 && max > count) {
			const neighbour = cell.rand_neighbour(weights);
			if (neighbour != undefined && neighbour.link_keys().size == 0) {
				cell.link(neighbour);
				unvisited -= 1;
			}
			cell = neighbour;
			count++;
		}
		return grid;
	}
}
