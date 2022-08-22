import type { Cell } from '$lib/grids/cell';
import type { Grid } from '$lib/grids/grid';
import { Helpers } from '$lib/helpers';

export class Wilson {
	static on(grid: Grid) {
		const unvisited = new Set(grid.cells());

		const first: Cell = unvisited.keys().next().value;
		unvisited.delete(first);

		while (unvisited.size > 0) {
			let cell = unvisited.keys().next().value;
			let path = [cell];

			while (unvisited.has(cell)) {
				cell = Helpers.sample(cell.neighbours());
				const position = path.indexOf(cell);

				if (position != undefined) {
					path = path.slice(0, position);
				} else {
					path.push(cell);
				}
			}
			for (let cell_index = 0; cell_index < path.length - 2; cell_index++) {
				path[cell_index].link(path[cell_index + 1]);
				unvisited.delete(path[cell_index]);
			}
		}
		return grid;
	}
}
