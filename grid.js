
class Grid {
    static prepare_grid(rows, columns)  {
        let boxes = [];
        for (let row = 0; row < rows; row++) {
            boxes[row] = [];
            for (let col = 0; col < columns; col++) {
                boxes[row][col] = new Cell(row, col);
            }
        }
        return boxes;
    }

    get(row, col) {
        if (!(this.rows > row && row >= 0)) return null;
        if (!(this.columns > col && col >= 0)) return null;
        return this.grid[row][col];
    }
    set(row, col, cell) {
        if (!(this.rows > row && row >= 0)) return null;
        if (!(this.columns > col && col >= 0)) return null;
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

    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.grid = Grid.prepare_grid(rows, columns);
        this.configure_cells();
    }


    rand_cell() {
        let row = rfloor(random() * this.rows);
        let col = random(0, this.grid[row].length);
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

    cell_rows() {
        let cells = [];
        for (let row = 0; row < this.rows; row++) {
            cells.push(this.grid[row]);
        }
        return cells;
    }

    draw(cell_size, thickness = 0) {
        let cells = this.cells();
        for (let index = 0; index < cells.length; index++) {
            let cell = cells[index];
            cell.draw(cell_size, thickness);
            cell.draw_interior(cell_size, this.contents_of(cell));
        }
    }
    draw_graph(cell_size, color) {
        let cells = this.cells();
        for (let index = 0; index < cells.length; index++) {
            cells[index].draw_graph(cell_size, color);
        }
    }

    toString() {
        let s = '';
        let cells = this.cells();
        for (let index = 0; index < cells.length; index++) {
            s += cells[index].toString() + '\n';
        }
        return s;
    }

    contents_of(cell) {
        return ' ';
    }
}
