class Distances {
    constructor(root) {
        this.root = root;
        this.cells = new Map();
        this.cells[root.key()] = 0;
    }

    get(cell) {
        return this.cells[cell.key()];
    }

    get_by_key(key) {
        return this.cells[key];
    }

    set(cell, distance) {
        this.cells[cell.key()] = distance;
    }

    set_by_key(key, distance) {
        this.cells[key] = distance;
    }

    cells() {
        return Object.keys(this.cells);
    }

}