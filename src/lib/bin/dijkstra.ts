import { DistanceGrid } from "../grids/distance_grid";
import { Sidewinder } from "../generators/sidewinder";


export function setup_distance_grid(grid_size: number): DistanceGrid {
    const grid_distance = new DistanceGrid(grid_size, grid_size);
    Sidewinder.on(grid_distance);
    const start = grid_distance.get(0, 0);
    const distances = start.distances();
    grid_distance.distances = distances;
    return grid_distance;
}

export function with_path(grid_size: number): DistanceGrid {
    const grid = setup_distance_grid(grid_size);
    grid.distances = grid.distances.path_to(grid.get(grid.rows - 1, 0));
    return grid;
}
