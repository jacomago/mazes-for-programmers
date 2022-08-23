
import type { Grid } from '$lib/grids/grid';
import { Helpers } from '$lib/helpers';

export class HuntKill {
    static on(grid: Grid) {
        let current = grid.rand_cell();

        while (current != undefined) {
            const unvisited_neighbours = current.neighbours().filter(n => n.link_keys().size == 0);

            if (unvisited_neighbours.length > 0) {
                const neighbour = Helpers.sample(unvisited_neighbours);
                current.link(neighbour);
                current = neighbour;
            } else {
                current = undefined;
                for (const cell of grid.cells()) {
                    const visited_neighbours = cell.neighbours().filter(n => n.link_keys().size > 0);
                    if (cell.link_keys().size == 0 && visited_neighbours.length > 0) {
                        current = cell;
                        const neighbour = Helpers.sample(visited_neighbours);
                        current.link(neighbour);
                        break;
                    }
                }
            }
        }
        return grid;
    }
}
