import Cell from "cell";
class Grid {
    prepare_grid() {
        var grid = [];
        for (let row = 0; row < this.rows; row++) {
            var grid_row = [];
            for (let col = 0; col < this.columns; col++) {
                grid_row[col] = new Cell(row, col);
            }
            grid[row] = grid_row;
        }
        return grid;
    }

    get(row, col) {
        if (!(this.rows > row && row >= 0)) return null;
        if (!(this.columns > col && col >= 0)) return null;
        return this.grid[row][col];
    }

    configure_cells() {
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.columns; col++) {
                this.grid[row][col].north = this.get(row - 1, col);
                this.grid[row][col].south = this.get(row + 1, col);
                this.grid[row][col].west = this.get(row, col - 1);
                this.grid[row][col].east = this.get(row, col + 1);
            }
        }
    }

    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.grid = this.prepare_grid();
        this.configure_cells();
    }


    rand_cell() {
        row = random(0, this.rows);
        col = random(0, this.grid[row].length);
        return this.grid[row][col];
    }

    size() {
        return this.rows * this.columns;
    }

    cells() {
        let cells = [];
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                cells.push(this.grid[row][col]);
            }
        }
        return cells;
    }

    draw(cell_size) {
        let cells = grid.cells();
        for (let index = 0; index < cells.length; index++) {
            cells[index].draw(cell_size);
        }
    }
}
