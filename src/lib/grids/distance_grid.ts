import type { Cell } from "./cell";
import type { Distances } from "../distances/distances";
import { Grid } from "./grid";

export class DistanceGrid extends Grid {
    maximum: number;
    distances: Distances;
    set_distances(distances: Distances) {
        this.distances = distances;
        this.maximum = distances.max().distance;
    }

    get_distances() {
        return this.distances;
    }
    constructor(rows: number, columns: number) {
        super(rows, columns);
    }

    contents_of(cell: Cell): string {
        if (this.distances && this.distances.get(cell)) {
            return String(this.distances.get(cell));
        } else {
            return super.contents_of(cell);
        }
    }
}