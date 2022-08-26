import { Cell } from "./cell";
import { Grid } from "./grid";

export class Mask {
	rows: number;
	columns: number;
    grid: number[][];

    isOn(row: number, col: number) : boolean {
        return this.grid[row][col] > 0;
    }

    setUp(row: number, col: number) {
        this.grid[row][col] += 1;
    }

    setOff(row: number, col: number) {
        this.grid[row][col] = 0;
    }
    flip(row: number, col: number) {
        if (this.isOn(row, col))
            this.grid[row][col] = 0;
        else this.grid[row][col] = 1;
    }

    constructor(rows: number, columns: number) {
		this.rows = rows;
		this.columns = columns;
    }

    init() {
        this.grid = [];
		for (let row = 0; row < this.rows; row++) {
			this.grid[row] = [];
            for (let col = 0; col < this.columns; col++) {
                this.grid[row][col] = 1;
			}
		}
    }
}

export class MaskGrid extends Grid {
    mask: Mask;

    prepare_grid(rows: number, columns: number): Cell[][] {
        console.log('prep grid mask');
        
        const boxes: Cell[][] = [];
		for (let row = 0; row < rows; row++) {
			boxes[row] = [];
            for (let col = 0; col < columns; col++) {
                if (this.mask.isOn(row, col))
				    boxes[row][col] = new Cell(row, col);
			}
		}
		return boxes;
    }

    constructor(rows: number, columns: number, mask: Mask) {
        super(rows, columns);
        this.mask = mask;
    }

    cells() {
		const cells: Cell[] = [];
		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.columns; col++) {
                if (this.mask.isOn(row, col)) {
                    cells.push(this.grid[row][col]);
                }
			}
		}
		return cells;
    }
}