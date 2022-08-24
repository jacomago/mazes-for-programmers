import type { Cell } from '$lib/grids/cell';
import type { Grid } from '$lib/grids/grid';
import { Helpers } from '$lib/helpers';

export class Wilson {
	static on(grid: Grid) {
		const unvisited = new Set(grid.cells());

		const first: Cell = Helpers.sampleSet(unvisited);
		unvisited.delete(first);

		while (unvisited.size > 0) {
			let cell = Helpers.sampleSet(unvisited);
			let path = [cell];
			while (unvisited.has(cell)) {
				cell = cell.rand_neighbour();
				const position = path.indexOf(cell);

				if (position != -1) {
					path = path.slice(0, position + 1);
				} else {
					path.push(cell);
				}
			}

			for (let cell_index = 0; cell_index < path.length - 1; cell_index++) {
				path[cell_index].link(path[cell_index + 1]);
				unvisited.delete(path[cell_index]);
			}
		}
		return grid;
	}
}
