
import type { Color } from "p5";
import type * as p5 from "p5";
import { Cell } from "./cell";

export class Grid {
    rows: number;
    columns: number;
    grid: Cell[][];

    static prepare_grid(rows: number, columns: number): Cell[][] {
        const boxes: Cell[][] = [];
        for (let row = 0; row < rows; row++) {
            boxes[row] = [];
            for (let col = 0; col < columns; col++) {
                boxes[row][col] = new Cell(row, col);
            }
        }
        return boxes;
    }

    get(row: number, col: number) {
        if (!(this.rows > row && row >= 0)) return undefined;
        if (!(this.columns > col && col >= 0)) return undefined;
        return this.grid[row][col];
    }

    set(row: number, col: number, cell: Cell): void {
        if (!(this.rows > row && row >= 0)) return;
        if (!(this.columns > col && col >= 0)) return;
        this.grid[row][col] = cell;
    }

    configure_cells() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                this.grid[row][col].north = this.get(row - 1, col);
                this.grid[row][col].south = this.get(row + 1, col);
                this.grid[row][col].west = this.get(row, col - 1);
                this.grid[row][col].east = this.get(row, col + 1);
            }
        }
    }
    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
        this.grid = Grid.prepare_grid(rows, columns);
        this.configure_cells();
    }


    rand_cell() {
        const row = Math.floor(Math.random() * this.rows);
        const col = Math.floor(Math.random() * this.columns);
        return this.grid[row][col];
    }

    size() {
        return this.rows * this.columns;
    }

    cells() {
        const cells: Cell[] = [];
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                cells.push(this.grid[row][col]);
            }
        }
        return cells;
    }

    cell_rows() {
        const cells: Cell[][] = [];
        for (let row = 0; row < this.rows; row++) {
            cells.push(this.grid[row]);
        }
        return cells;
    }

    draw(p: p5, cell_size: number, thickness = 0, draw_contents = false) {
        const cells = this.cells();
        for (let index = 0; index < cells.length; index++) {
            const cell = cells[index];
            cell.draw(p, cell_size, thickness, this.background_color_for(p, cell), draw_contents ? this.contents_of(cell) : " ");

        }
    }
    draw_graph(p: p5, cell_size: number, color: number) {
        const cells = this.cells();
        for (let index = 0; index < cells.length; index++) {
            cells[index].draw_graph(p, cell_size, color);
        }
    }

    toString() {
        let s = '';
        const cells = this.cells();
        for (let index = 0; index < cells.length; index++) {
            s += cells[index].toString() + '\n';
        }
        return s;
    }

    contents_of(cell: Cell): string {
        return ' ';
    }

    background_color_for(p: p5, cell: Cell): Color | undefined {
        return;
    }
}

