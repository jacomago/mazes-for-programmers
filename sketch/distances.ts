class Distances {
    root: Cell;
    cells: Map<Cell, number>;

    constructor(root: Cell) {
        this.root = root;
        this.cells = new Map();
        this.cells.set(root, 0);
    }

    get(cell: Cell) {
        return this.cells.get(cell);
    }


    set(cell: Cell, distance: number) {
        this.cells.set(cell, distance);
    }

    cells_keys(): IterableIterator<Cell> {
        return this.cells.keys();
    }

}