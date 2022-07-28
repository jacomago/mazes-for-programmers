import p5, { Color } from "p5";
import { Cell } from "./cell";
import { Distances } from "./distances";
import { Grid } from "./grid";

export class ColoredGrid extends Grid {
    distances: Distances;
    maximum: number;
    set_distances(distances: Distances) {
        this.distances = distances;
        this.maximum = distances.max().distance;
    }

    background_color_for(p: p5, cell: Cell): Color | undefined {
        let distance = this.distances.get(cell);
        if (distance == undefined) {
            return;
        }

        let intensity = (this.maximum - distance) / this.maximum;
        let dark = Math.round(255 * intensity);
        let bright = 128 + Math.round(127 * intensity);
        let c = p.color(dark, bright, dark);
        return c;
    }
}