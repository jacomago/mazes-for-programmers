class Cell {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.links = new Map();
    }

    link(cell, bidi = true) {
        this.links[[cell.row, cell.column]] = true;
        if (bidi) { cell.link(this, false); }
        return this;
    }

    unlink(cell, bidi = true) {
        delete this.links[[cell.row, cell.column]];
        if (bidi) cell.unlink(this, false);
        return this;
    }

    links() {
        return Object.keys(this.links);
    }

    linked(cell) {
        if (cell == null) return false;
        return this.links[[cell.row, cell.column]];
    }

    neighbours() {
        var list = [];
        for (var n in this.neighbours) {
            if (n != null) {
                list.push(n);
            }
        }
        return list;
    }

    draw(cell_size) {
        let d = cell_size;
        stroke(0);

        let x1 = this.column * d;
        let y1 = this.row * d;
        let x2 = (this.column + 1) * d;
        let y2 = (this.row + 1) * d;
        if ((this.north === null)) line(x1, y1, x2, y1); // north
        if ((this.west === null)) line(x1, y1, x1, y2); // west
        if (!(this.linked(this.east))) line(x2, y1, x2, y2); // east
        if (!(this.linked(this.south))) line(x1, y2, x2, y2); // south
    }

    linksString() {
        let s = 'links(' + this.links.size + '): [';
        for (let cell in this.links) {
            s += cell.toString();
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