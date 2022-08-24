import { default_weights } from '$lib/grids/directions';
import type { Grid } from '$lib/grids/grid';

export class AldousBroder {
	static on(grid: Grid, weights = default_weights) {
		let cell = grid.rand_linked_cell();
		let unvisited = grid.unlinked_cells().length - 1;

		while (unvisited > 0) {
			
			const neighbour = cell.rand_neighbour(weights);
			if (neighbour != undefined && neighbour.link_keys().size == 0) {
				cell.link(neighbour);
				unvisited -= 1;
			}
			cell = neighbour;
		}
		return grid;
	}
}
