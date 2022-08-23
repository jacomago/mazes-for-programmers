
import { AldousBroder } from '$lib/generators/aldousbroder';
import { BinaryTree } from '$lib/generators/binary_tree';
import { HuntKill } from '$lib/generators/huntkill';
import { Sidewinder } from '$lib/generators/sidewinder';
import { Wilson } from '$lib/generators/wilson';
import { Grid } from '$lib/grids/grid';

export function comparison_deadends(
    grid_size: number,
    attempts: number
) {
    const results: Map<string, number> = new Map();
    const algs = [BinaryTree, Sidewinder, AldousBroder, Wilson,
        HuntKill];

    for (const alg of algs) {
        let total = 0.0;
        for (let i = 0; attempts > i; i++) {
            let grid = new Grid(grid_size, grid_size);
            grid = alg.on(grid);
            total += grid.deadends().length;
        }

        results.set(alg.name, (total / attempts) * 100 / (grid_size * grid_size));
    }
    return results;

} 
