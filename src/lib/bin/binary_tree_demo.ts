import { BinaryTree } from "$lib/binary_tree";
import { Grid } from "$lib/grid";



export function setup_binary_tree_grid(grid_size: number): Grid {

    const grid = new Grid(grid_size, grid_size);
    BinaryTree.on(grid);
    return grid;
}