import { Cell } from "./cell";

export class Distances {
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
        let dist = this.cells.get(current) ?? 0;
        breadcrumbs.set(current, dist);

        while (current != this.root) {
            for (let link of current.link_keys()) {
                if ((this.cells.get(current) ?? 0) > (this.cells.get(link) ?? 0)) {
                    breadcrumbs.set(link, this.cells.get(link) ?? 0);
                    current = link;
                    break;
                }
            }
        }
        return breadcrumbs;
    }

    max(): { cell: Cell, distance: number } {
        let max_distance = 0;
        let max_cell = this.root;

        for (let [cell, distance] of this.cells) {
            if (distance > max_distance) {
                max_cell = cell;
                max_distance = distance;
            }
        }
        return { cell: max_cell, distance: max_distance }
    }
}