import { Cell } from "./cell";
import { Distances } from "./distances";
import { Grid } from "./grid";

export class DistanceGrid extends Grid {
    distances: Distances;
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