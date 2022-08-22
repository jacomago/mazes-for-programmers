import { DistanceGrid } from "$lib/grids/distance_grid";
import { Sidewinder } from "$lib/generators/sidewinder";


export function longest_path_grid(grid_size: number): DistanceGrid {
    const grid = new DistanceGrid(grid_size, grid_size);
    Sidewinder.on(grid);
    const start = grid.get(0, 0);
    const distances = start.distances();
    const max = distances.max();
    const new_distances = max.cell.distances();
    const max_goal = new_distances.max();

    grid.distances = new_distances.path_to(max_goal.cell);
    return grid;
}
