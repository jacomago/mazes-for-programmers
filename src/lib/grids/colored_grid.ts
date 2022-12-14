import type { Color } from 'p5';
import type * as p5 from 'p5';
import type { Cell } from './cell';
import { DistanceGrid } from './distance_grid';

export class ColoredGrid extends DistanceGrid {
	background_color_for(p: p5, cell: Cell): Color | undefined {
		const distance = this.distances.get(cell);
		if (distance == undefined) {
			return;
		}

		const intensity = (this.maximum - distance) / this.maximum;
		const dark = Math.round(255 * intensity);
		const bright = 128 + Math.round(127 * intensity);
		const c = p.color(dark, bright, dark);
		return c;
	}
}
