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

  draw() {
    let d = 90;
    stroke(0);
    line(this.row * d, this.column * d + d, this.row * d + d, this.column * d + d); // north
    line(this.row * d, this.column * d, this.row * d + d, this.column * d); // south
    line(this.row * d, this.column * d, this.row * d, this.column * d + d); // west
    line(this.row * d + d, this.column * d, this.row * d + d, this.column * d + d); // east

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

  cells() {
    var cells = [];
    for (var row = 0; row < this.rows; row++) {
      for (var col = 0; col < this.columns; col++) {
        cells.push(this.grid[row][col]);
      }
    }
    return cells;
  }
}

class BinaryTree {
  static on(grid) {
    for (var cell in grid.cells()) {
      var neighbours = [];
      if (cell.north != undefined) neighbours.push(cell.north);
      if (cell.east != undefined) neighbours.push(cell.east);

      var index = random(0, neighbours.length);
      var neighbour = neighbours[index];
      if (neighbour) cell.link(neighbour);
    }
    return grid;
  }
}

function setup() {
  grid = new Grid(3, 4);
  console.log(grid.size());
  grid = BinaryTree.on(grid);
  let size = {
    width: 400,
    height: 400
  };
  createCanvas(400, 400);
}

function draw() {
  background(220);
  translate(10, 10);
  var cells = grid.cells();
  for (var index = 0; index < cells.length; index++) {
    cells[index].draw();
  }
}
