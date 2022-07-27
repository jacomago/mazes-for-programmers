export class Cell {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.links = new Map();
    }

    key() {
        return [this.row, this.column];
    }
    link(cell, bidi = true) {
        this.links[cell.key()] = true;
        if (bidi) { cell.link(this, false); }
        return this;
    }

    unlink(cell, bidi = true) {
        delete this.links[cell.key()];
        if (bidi) cell.unlink(this, false);
        return this;
    }

    centre(cell_size) {
        let d = cell_size;
        let x = (this.column + 0.5) * d;
        let y = (this.row + 0.5) * d;
        return [x, y];
    }

    draw_graph(cell_size, color) {
        stroke(color);
        let c = this.centre(cell_size);
        if ((this.linked(this.east))) line(c[0], c[1],
            this.east.centre(cell_size)[0], this.east.centre(cell_size)[1]); // east
        if ((this.linked(this.north))) line(c[0], c[1],
            this.north.centre(cell_size)[0], this.north.centre(cell_size)[1]); // north
        if ((this.linked(this.south))) line(c[0], c[1],
            this.south.centre(cell_size)[0], this.south.centre(cell_size)[1]); // south
        if ((this.linked(this.west))) line(c[0], c[1],
            this.west.centre(cell_size)[0], this.west.centre(cell_size)[1]); // west
    }

    links() {
        return Object.keys(this.links);
    }

    linked(cell) {
        if (cell == null) return false;
        return this.links[cell.key()];
    }

    neighbours() {
        let list = [];
        for (let n in this.neighbours) {
            if (n != null) {
                list.push(n);
            }
        }
        return list;
    }


    distances() {
        let distances = new Distances(this);
        let frontier = [this.key()];

        while (frontier.length > 0) {
            new_frontier = [];

            for (let i = 0; frontier.length > i; i++) {
                for (let linked in this.links()) {
                    if (distances.get_by_key(linked) != null) {
                        distances.set_by_key(linked) = distances.get_by_key(linked) + 1;
                        new_frontier.push(linked);
                    }
                }

                frontier = new_frontier;
            }
        }
        return distances;
    }

    draw(cell_size, thickness = 0) {
        let d = cell_size;
        stroke(0);

        let x1 = this.column * d + thickness;
        let y1 = this.row * d + thickness;
        let x2 = (this.column + 1) * d - thickness;
        let y2 = (this.row + 1) * d - thickness;
        if (!(this.linked(this.north))) line(x1, y1, x2, y1); // north
        if (!(this.linked(this.west))) line(x1, y1, x1, y2); // west
        if (!(this.linked(this.east))) line(x2, y1, x2, y2); // east
        if (!(this.linked(this.south))) line(x1, y2, x2, y2); // south
    }

    linksString() {
        let s = 'links: [';
        for (let cell in this.links) {
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