class Cell {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.links = new Map();
  }

  link(cell, bidi = true) {
    this.links[[cell.row, cell.column]] = true;
    if (bidi) { cell.link(this, false); }
    return this;
  }

  unlink(cell, bidi = true) {
    delete this.links[[cell.row, cell.column]];
    if (bidi) cell.unlink(this, false);
    return this;
  }

  links() {
    return Object.keys(this.links);
  }

  linked(cell) {
    if (cell == null) return false;
    return this.links[[cell.row, cell.column]];
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

  draw(cell_size) {
    let d = cell_size;
    stroke(0);

    let x1 = this.column * d;
    let y1 = this.row * d;
    let x2 = (this.column + 1) * d;
    let y2 = (this.row + 1) * d;
    if ((this.north === null)) line(x1, y1, x2, y1); // north
    if ((this.west === null)) line(x1, y1, x1, y2); // west
    if (!(this.linked(this.east))) line(x2, y1, x2, y2); // east
    if (!(this.linked(this.south))) line(x1, y2, x2, y2); // south
    text('' + this.row + ',' + this.column, x1, y1);
  }

  linksString() {
    let s = 'links(' + this.links.size + '): [';
    for (let cell in this.links) {
      s += cell.toString();
    }
    s += ']';
    return s;
  }

  neighboursString() {
    let s = 'neighbours: [';
    if (this.north != null) {
      s += 'north,';
    }
    if (this.south != null) {
      s += 'south,';
    }
    if (this.east != null) {
      s += 'east,';
    }
    if (this.west != null) {
      s += 'west,';
    }
    s += ']';
    return s;
  }

  toString() {
    return this.row + ', ' + this.column + ', ' + this.linksString() + ' ' + this.neighboursString();
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

class BinaryTree {
  static on(grid) {
    let cells = grid.cells();
    for (var cell_index = 0; cell_index < cells.length; cell_index++) {
      let cell = cells[cell_index];
      let neighbours = [];
      if (cell.north != null) neighbours.push(cell.north);
      if (cell.east != null) neighbours.push(cell.east);

      if (neighbours.length > 0) {
        let index = floor(random() * neighbours.length);
        let neighbour = neighbours[index];
        cell.link(neighbour);
      }
    }

    return grid;
  }
}

function setup() {
  createCanvas(400, 400);
  grid = new Grid(1, 2);
  BinaryTree.on(grid);
  console.log(grid.get(0, 0).toString());
  console.log(grid.get(0, 1).toString());
  frameRate(10);
}

function draw() {
  background(220);
  translate(10, 10);
  grid.draw(90);

}
