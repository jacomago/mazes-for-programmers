import { AldousBroder } from '$lib/generators/aldousbroder';
import { BinaryTree } from '$lib/generators/binary_tree';
import { HuntKill } from '$lib/generators/huntkill';
import { RecursiveBacktracker } from '$lib/generators/recursivebacktraker';
import { Sidewinder } from '$lib/generators/sidewinder';
import { Wilson } from '$lib/generators/wilson';
import { Grid } from '$lib/grids/grid';

export enum Property {
	Deadends,
	Horizontal,
	Vertical,
	Cross
}
export function comparisons(
	grid_size: number,
	attempts: number
): Map<string, Map<Property, number>> {
	const results: Map<string, Map<Property, number>> = new Map();
	const algs = [BinaryTree, Sidewinder, AldousBroder, Wilson, HuntKill, RecursiveBacktracker];
	const props = [Property.Deadends, Property.Horizontal, Property.Vertical, Property.Cross];

	for (const alg of algs) {
		const alg_results = new Map();
		alg_results.set(Property.Deadends, 0.0);
		alg_results.set(Property.Horizontal, 0.0);
		alg_results.set(Property.Vertical, 0.0);
		alg_results.set(Property.Cross, 0.0);
		for (let i = 0; attempts > i; i++) {
			let grid = new Grid(grid_size, grid_size);
			grid.init();
			grid = alg.on(grid);
			alg_results.set(
				Property.Deadends,
				alg_results.get(Property.Deadends) + grid.deadends().length
			);
			alg_results.set(
				Property.Horizontal,
				alg_results.get(Property.Horizontal) + grid.horizontal().length
			);
			alg_results.set(
				Property.Vertical,
				alg_results.get(Property.Vertical) + grid.vertical().length
			);
			alg_results.set(Property.Cross, alg_results.get(Property.Cross) + grid.cross().length);
		}

		for (const p of props) {
			alg_results.set(p, ((alg_results.get(p) / attempts) * 100) / (grid_size * grid_size));
		}
		results.set(alg.name, alg_results);
	}
	return results;
}
