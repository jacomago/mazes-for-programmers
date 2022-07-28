function setup_binary_tree_grid(grid_size: number): Grid {

    let grid = new Grid(grid_size, grid_size);
    BinaryTree.on(grid);
    return grid;
}