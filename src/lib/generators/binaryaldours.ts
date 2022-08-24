import type { Grid } from '$lib/grids/grid';
import { AldousBroder } from './aldousbroder';
import { BinaryTree } from './binary_tree';

export class BinaryAldous {
    static on(grid: Grid, amount = 20) {
        BinaryTree.on(grid, undefined, amount);
        AldousBroder.on(grid);
        return grid;
	}
}
