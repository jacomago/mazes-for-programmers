import type { Cell } from '$lib/grids/cell';
import { default_weights } from '$lib/grids/directions';
import type { Grid } from '$lib/grids/grid';
import { Helpers } from '$lib/helpers';

export class Wilson {
	static on(grid: Grid, weights = default_weights, max = 900000) {
		const unvisited = new Set(grid.cells());

		const first: Cell = Helpers.sampleSet(unvisited);
		unvisited.delete(first);
		let count = 0;
		while (unvisited.size > 0 && max > count) {
			let cell = Helpers.sampleSet(unvisited);
			let path = [cell];
			while (unvisited.has(cell)) {
				cell = cell.rand_neighbour(weights);
				const position = path.indexOf(cell);

				if (position != -1) {
					path = path.slice(0, position + 1);
				} else {
					path.push(cell);
				}
				count++;
			}
			count++;

			for (let cell_index = 0; cell_index < path.length - 1; cell_index++) {
				path[cell_index].link(path[cell_index + 1]);
				unvisited.delete(path[cell_index]);
			}
		}
		return grid;
	}
}
