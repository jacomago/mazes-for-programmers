import type { Grid } from '$lib/grids/grid';
import { Helpers } from '$lib/helpers';

export class RecursiveBacktracker {
	static on(grid: Grid, start = grid.rand_cell()) {
		const stack = [];
		stack.push(start);

		while (stack.length > 0) {
			const current = stack[stack.length - 1];
			const neighbours = current.neighbours().filter((n) => n.link_keys().size == 0);

			if (neighbours.length == 0) {
				stack.pop();
			} else {
				const neighbour = Helpers.sample(neighbours);
				current.link(neighbour);
				stack.push(neighbour);
			}
		}
		return grid;
	}
}
