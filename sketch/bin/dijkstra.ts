
function setup_distance_grid(grid_size: number): DistanceGrid {
    let grid_distance = new DistanceGrid(grid_size, grid_size);
    BinaryTree.on(grid_distance);
    let start = grid_distance.get(0, 0);
    let distances = start.distances();
    grid_distance.distances = distances;
    return grid_distance;
}