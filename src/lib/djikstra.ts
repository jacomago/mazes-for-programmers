
import type { Cell } from "./cell";
import { Distances } from "./distances";


function cell_frontier(distances: Distances, cell: Cell) {
    const new_frontier: Cell[] = [];

    const links = cell.link_keys();
    for (const linked of links) {
        if (distances.get(linked) == null) {
            const d = distances.get(cell) ?? 0;
            distances.set(linked, d + 1);
            new_frontier.push(linked);
        }
    }
    return new_frontier;
}

export function cell_distances(start: Cell): Distances {
    let distances: Distances = new Distances(start);
    let frontier: Cell[] = [start];

    while (frontier.length > 0) {
        const step = step_distance(distances, frontier);
        distances = step.distances;
        frontier = step.frontier;
    }
    return distances;
}

export function step_distance(distances: Distances, frontier: Cell[]) {

    if (frontier.length > 0) {
        const new_frontier: Cell[] = [];

        for (let i = 0; frontier.length > i; i++) {
            new_frontier.push(...cell_frontier(distances, frontier[i]));

            frontier = new_frontier;
        }
    }
    return { distances: distances, frontier: frontier };

}