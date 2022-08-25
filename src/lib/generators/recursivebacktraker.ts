import { default_weights } from '$lib/grids/directions';
import type { Grid } from '$lib/grids/grid';
export class RecursiveBacktracker {
	static on(grid: Grid, start = grid.rand_cell(), weights = default_weights) {
		const stack = [];
		stack.push(start);

		while (stack.length > 0) {
			const current = stack[stack.length - 1];
			const neighbours = current.unvisited_neighbours_directions();

			if (neighbours.length == 0) {
				stack.pop();
			} else {
				const neighbour = current.rand_neighbour(weights, neighbours);
				current.link(neighbour);
				stack.push(neighbour);
			}
		}
		return grid;
	}
}
