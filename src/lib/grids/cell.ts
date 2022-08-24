import { Helpers } from '$lib/helpers';
import type * as p5 from 'p5';
import { cell_distances } from '../distances/djikstra';
import { Direction, standard_directions } from './directions';

interface Coords {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}
export class Cell {
	row: number;
	column: number;
	links: Set<Cell>;
	neighbours_map: Map<Direction, Cell>;

	constructor(row: number, column: number) {
		this.row = row;
		this.column = column;
		this.links = new Set();
		this.neighbours_map = new Map();
	}

	link(cell: Cell, bidi = true) {
		this.links.add(cell);
		if (bidi) {
			cell.link(this, false);
		}
		return this;
	}

	unlink(cell: Cell, bidi = true) {
		this.links.delete(cell);
		if (bidi) cell.unlink(this, false);
		return this;
	}

	neighbours(
		directions = [Direction.North, Direction.East, Direction.South, Direction.West]
	): Cell[] {
		const s: Cell[] = [];
		for (const d of directions) {
			if (this.neighbours_map.has(d)) {
				s.push(this.neighbours_map.get(d));
			}
		}
		return s;
	}

	direction(d: Direction) {
		if (this.neighbours_map.has(d)) {
			return this.neighbours_map.get(d);
		}
		return undefined;
	}

	setDirection(d: Direction, cell: Cell | undefined) {
		if (cell != undefined) {
			this.neighbours_map.set(d, cell);
		}
	}

	rand_neighbour(): Cell {
		return Helpers.sample(this.neighbours());
	}

	centre(cell_size: number) {
		const d = cell_size;
		const x = (this.column + 0.5) * d;
		const y = (this.row + 0.5) * d;
		return [x, y];
	}

	link_keys() {
		return this.links;
	}

	linked(cell: Cell | undefined) {
		if (cell == undefined) return false;
		return this.links.has(cell);
	}

	distances() {
		return cell_distances(this);
	}

	coords(cell_size: number, thickness = 0): Coords {
		const d = cell_size;
		return {
			x1: this.column * d + thickness,
			y1: this.row * d + thickness,
			x2: (this.column + 1) * d - thickness,
			y2: (this.row + 1) * d - thickness
		};
	}

	isDeadend(): boolean {
		if (this.link_keys().size == 1) return true;
		return false;
	}

	isDirections(directions: Direction[]): boolean {
		let poss = true;
		for (const d of directions) {
			if (!this.linked(this.direction(d))) {
				poss = false;
			}
		}
		if (poss) {
			return true;
		}
		return false;
	}

	draw(p: p5, cell_size: number, thickness = 0, c = p.color(255, 255, 255), contents = ' ') {
		const coords = this.coords(cell_size, thickness);
		this.draw_rect(p, coords, cell_size, c);
		this.draw_walls(p, coords);
		this.draw_interior(p, cell_size, contents);
	}

	draw_rect(p: p5, coords: Coords, cell_size: number, c = p.color(255, 255, 255)) {
		p.noStroke();
		p.fill(c);
		p.rect(coords.x1 + cell_size * 0.5, coords.y1 + cell_size * 0.5, cell_size, cell_size);
		p.noFill();
	}

	draw_walls(p: p5, coords: Coords) {
		p.stroke(0);

		if (!this.linked(this.direction(Direction.North)))
			p.line(coords.x1, coords.y1, coords.x2, coords.y1); // north
		if (!this.linked(this.direction(Direction.West)))
			p.line(coords.x1, coords.y1, coords.x1, coords.y2); // west
		if (!this.linked(this.direction(Direction.East)))
			p.line(coords.x2, coords.y1, coords.x2, coords.y2); // east
		if (!this.linked(this.direction(Direction.South)))
			p.line(coords.x1, coords.y2, coords.x2, coords.y2); // south
	}

	draw_graph(p: p5, cell_size: number, color: number) {
		p.stroke(color);
		const c = this.centre(cell_size);

		for (const d of standard_directions) {
			if (this.linked(this.direction(d))) {
				p.line(
					c[0],
					c[1],
					this.direction(d).centre(cell_size)[0],
					this.direction(d).centre(cell_size)[1]
				);
			}
		}
	}

	draw_interior(p: p5, cell_size: number, thing: string) {
		p.stroke(200);
		const c = this.centre(cell_size);
		p.text(thing, c[0], c[1]);
	}

	linksString() {
		let s = 'links: [';
		for (const cell in this.links) {
			s += 'cell: ' + cell.toString() + ', ';
		}
		s += ']';
		return s;
	}

	neighboursString() {
		let s = 'neighbours: [';
		for (const d of this.neighbours_map.keys()) {
			s += Direction[d] + ',';
		}
		s += ']';
		return s;
	}

	toString() {
		return (
			'cell: ' +
			this.row +
			', ' +
			this.column +
			', ' +
			this.linksString() +
			' ' +
			this.neighboursString()
		);
	}
}
