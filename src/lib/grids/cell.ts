
import type * as p5 from "p5";
import { cell_distances } from "../distances/djikstra";

interface Coords {
    x1: number, y1: number, x2: number, y2: number
}
export class Cell {
    row: number;
    column: number;
    links: Set<Cell>;
    north?: Cell;
    south?: Cell;
    west?: Cell;
    east?: Cell;

    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
        this.links = new Set();
    }

    link(cell: Cell, bidi = true) {
        this.links.add(cell);
        if (bidi) { cell.link(this, false); }
        return this;
    }

    unlink(cell: Cell, bidi = true) {
        this.links.delete(cell);
        if (bidi) cell.unlink(this, false);
        return this;
    }

    neighbours(): Cell[] {
        const s: Cell[] = [];
        if (this.north != null) {
            s.push(this.north);
        }
        if (this.east != null) {
            s.push(this.east);
        }
        if (this.south != null) {
            s.push(this.south);
        }
        if (this.west != null) {
            s.push(this.west);
        }
        return s;

    }
    
    rand_neighbour(): Cell {
        const n = this.neighbours();
        const r = Math.floor(Math.random() * n.length);
        return n[r];
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
            y2: (this.row + 1) * d - thickness,
        }
    }

    draw(p: p5, cell_size: number, thickness = 0, c = p.color(255, 255, 255), contents = " ") {
        const coords = this.coords(cell_size, thickness);
        this.draw_rect(p, coords, cell_size, c);
        this.draw_walls(p, coords);
        this.draw_interior(p, cell_size, contents)
    }

    draw_rect(p: p5, coords: Coords, cell_size: number, c = p.color(255, 255, 255)) {
        p.noStroke();
        p.fill(c);
        p.rect(coords.x1 + cell_size * 0.5, coords.y1 + cell_size * 0.5, cell_size, cell_size);
        p.noFill();
    }

    draw_walls(p: p5, coords: Coords,) {
        p.stroke(0);

        if (!(this.linked(this.north))) p.line(coords.x1, coords.y1, coords.x2, coords.y1); // north
        if (!(this.linked(this.west))) p.line(coords.x1, coords.y1, coords.x1, coords.y2); // west
        if (!(this.linked(this.east))) p.line(coords.x2, coords.y1, coords.x2, coords.y2); // east
        if (!(this.linked(this.south))) p.line(coords.x1, coords.y2, coords.x2, coords.y2); // south
    }

    draw_graph(p: p5, cell_size: number, color: number) {
        p.stroke(color);
        const c = this.centre(cell_size);
        if ((this.linked(this.east))) p.line(c[0], c[1],
            this.east.centre(cell_size)[0], this.east.centre(cell_size)[1]); // east
        if ((this.linked(this.north))) p.line(c[0], c[1],
            this.north.centre(cell_size)[0], this.north.centre(cell_size)[1]); // north
        if ((this.linked(this.south))) p.line(c[0], c[1],
            this.south.centre(cell_size)[0], this.south.centre(cell_size)[1]); // south
        if ((this.linked(this.west))) p.line(c[0], c[1],
            this.west.centre(cell_size)[0], this.west.centre(cell_size)[1]); // west
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
        if (this.north != null) {
            s += 'north,';
        }
        if (this.south != null) {
            s += 'south,';
        }
        if (this.east != null) {
            s += 'east,';
        }
        if (this.west != null) {
            s += 'west,';
        }
        s += ']';
        return s;
    }

    toString() {
        return this.row + ', ' + this.column + ', ' + this.linksString() + ' ' + this.neighboursString();
    }
}