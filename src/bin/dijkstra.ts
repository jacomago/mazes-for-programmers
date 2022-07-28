import { DistanceGrid } from "../lib/distance_grid";
import { Sidewinder } from "../lib/sidewinder";

function setup_distance_grid(grid_size: number): DistanceGrid {
    let grid_distance = new DistanceGrid(grid_size, grid_size);
    Sidewinder.on(grid_distance);
    let start = grid_distance.get(0, 0);
    let distances = start.distances();
    grid_distance.distances = distances;
    return grid_distance;
}

function with_path(grid_size: number): DistanceGrid {
    let grid = setup_distance_grid(grid_size);
    grid.distances = grid.distances.path_to(grid.get(grid.rows - 1, 0));
    return grid;
}
