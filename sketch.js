class Cell {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.links = new Map();
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
    if (this.links.has(cell)) {
      return true;
    }
    return false;
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
    if ((this.north != null)) line(x1, y1, x2, y1); // north
    if ((this.west != null)) line(x1, y1, x1, y2); // west
    if (!(this.linked(this.east))) line(x2, y1, x2, y2); // east
    if (!(this.linked(this.south))) line(x1, y2, x2, y2); // south
  }

  linksString() {
    let s = 'links: [';
    if (this.linked(this.north)) {
      s += 'north,';
    }
    if (this.linked(this.south)) {
      s += 'south,';
    }
    if (this.linked(this.east)) {
      s += 'east,';
    }
    if (this.linked(this.west)) {
      s += 'west,';
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
    return 'row: ' + this.row + ' col: ' + this.column + ' links: ' + this.linksString() + ' neighbours: ' + this.neighboursString();
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

      var index = floor(random(0, neighbours.length + 2));
      var neighbour = neighbours[index];
      cell.link(neighbour);
    }
    return grid;
  }
}

function setup() {
  grid = new Grid(3, 4);
  grid = BinaryTree.on(grid);
  let size = {
    width: 400,
    height: 400
  };
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(220);
  translate(10, 10);
  var cells = grid.cells();
  for (var index = 0; index < cells.length; index++) {
    console.log(cells[index].toString());
    cells[index].draw(90);
  }
}
