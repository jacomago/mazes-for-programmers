import type { Cell } from './grids/cell';

export class Helpers {
	static sample(array: Cell[]) {
		if (array.length == 0) {
			return undefined;
		}
		return array[Math.floor(Math.random() * array.length)];
	}
}
