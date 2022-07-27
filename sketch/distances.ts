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

    path_to(goal: Cell): Distances {
        let current = goal;

        let breadcrumbs = new Distances(this.root);
        breadcrumbs.set(current, this.cells.get(current));

        while (current != this.root) {
            for (let link of current.link_keys()) {
                if (this.cells.get(current) > this.cells.get(link)) {
                    current = link;
                    break;
                }
            }
        }
        return breadcrumbs;
    }
}