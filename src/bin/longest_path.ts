import { DistanceGrid } from "../lib/distance_grid";
import { Sidewinder } from "../lib/sidewinder";

export function longest_path_grid(grid_size: number): DistanceGrid {
    let grid = new DistanceGrid(grid_size, grid_size);
    Sidewinder.on(grid);
    let start = grid.get(0, 0)!;
    let distances = start.distances();
    let max = distances.max();
    let new_distances = max.cell.distances();
    let max_goal = new_distances.max();

    grid.distances = new_distances.path_to(max_goal.cell);
    return grid;
}
