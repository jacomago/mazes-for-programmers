import { default_weights } from '$lib/grids/directions';
import type { Grid } from '$lib/grids/grid';

export class HuntKill {
	static on(grid: Grid, weights = default_weights) {
		let current = grid.rand_cell();

		while (current != undefined) {
			const unvisited_neighbours = current.unvisited_neighbours_directions();

			if (unvisited_neighbours.length > 0) {
				const neighbour = current.rand_neighbour(weights, unvisited_neighbours);
				current.link(neighbour);
				current = neighbour;
			} else {
				current = undefined;
				for (const cell of grid.cells()) {
					const visited_neighbours = cell.visited_neighbours_directions();
					if (cell.link_keys().size == 0 && visited_neighbours.length > 0) {
						current = cell;
						const neighbour = cell.rand_neighbour(weights, visited_neighbours);
						current.link(neighbour);
						break;
					}
				}
			}
		}
		return grid;
	}
}
