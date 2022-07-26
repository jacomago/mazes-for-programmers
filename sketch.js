class Cell {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.links = {};
  }

  link(cell, bidi = true) {
    this.links[cell] = true;
    if (bidi) { cell.links(this, false); }
    return this;
  }

  unlink(cell, bidi = true) {
    delete this.links[cell];
    if (bidi) cell.unlink(this, false);
    return this;
  }

  links() {
    return Object.keys(this.links);
  }

  linked(cell) {
    return this.links[cell];
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
}

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
    if (!(this.rows > row && row > 0)) return undefined;
    if (!(this.columns > col && col > 0)) return undefined;
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
}

function setup() {
  grid = new Grid(3, 4);
  console.log(grid.size());
  console.log(grid.get(1, 1));
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
