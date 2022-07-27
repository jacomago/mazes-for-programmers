class BinaryTree {
    static on(grid) {
        let cells = grid.cells();
        for (let cell_index = 0; cell_index < cells.length; cell_index++) {
            let cell = cells[cell_index];
            let neighbours = [];
            if (cell.north != null)
                neighbours.push(cell.north);
            if (cell.east != null)
                neighbours.push(cell.east);
            if (neighbours.length > 0) {
                let index = floor(random() * neighbours.length);
                let neighbour = neighbours[index];
                cell.link(neighbour);
            }
        }
        return grid;
    }
}
class Cell {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.links = new Set();
    }
    link(cell, bidi = true) {
        this.links.add(cell);
        if (bidi) {
            cell.link(this, false);
        }
        return this;
    }
    unlink(cell, bidi = true) {
        this.links.delete(cell);
        if (bidi)
            cell.unlink(this, false);
        return this;
    }
    centre(cell_size) {
        let d = cell_size;
        let x = (this.column + 0.5) * d;
        let y = (this.row + 0.5) * d;
        return [x, y];
    }
    link_keys() {
        return this.links;
    }
    linked(cell) {
        if (cell == null)
            return false;
        return this.links.has(cell);
    }
    neighbours() {
        let list = [];
        for (let n in this.neighbours) {
            if (n != null) {
                list.push(n);
            }
        }
        return list;
    }
    distances() {
        let distances = new Distances(this);
        let frontier = [this];
        while (frontier.length > 0) {
            let new_frontier = [];
            for (let i = 0; frontier.length > i; i++) {
                let cell = frontier[i];
                let links = cell.link_keys();
                for (const linked of links) {
                    if (distances.get(linked) == null) {
                        distances.set(linked, distances.get(cell) + 1);
                        new_frontier.push(linked);
                    }
                }
                frontier = new_frontier;
            }
        }
        return distances;
    }
    draw(cell_size, thickness = 0) {
        let d = cell_size;
        stroke(0);
        let x1 = this.column * d + thickness;
        let y1 = this.row * d + thickness;
        let x2 = (this.column + 1) * d - thickness;
        let y2 = (this.row + 1) * d - thickness;
        if (!(this.linked(this.north)))
            line(x1, y1, x2, y1);
        if (!(this.linked(this.west)))
            line(x1, y1, x1, y2);
        if (!(this.linked(this.east)))
            line(x2, y1, x2, y2);
        if (!(this.linked(this.south)))
            line(x1, y2, x2, y2);
    }
    draw_graph(cell_size, color) {
        stroke(color);
        let c = this.centre(cell_size);
        if ((this.linked(this.east)))
            line(c[0], c[1], this.east.centre(cell_size)[0], this.east.centre(cell_size)[1]);
        if ((this.linked(this.north)))
            line(c[0], c[1], this.north.centre(cell_size)[0], this.north.centre(cell_size)[1]);
        if ((this.linked(this.south)))
            line(c[0], c[1], this.south.centre(cell_size)[0], this.south.centre(cell_size)[1]);
        if ((this.linked(this.west)))
            line(c[0], c[1], this.west.centre(cell_size)[0], this.west.centre(cell_size)[1]);
    }
    draw_interior(cell_size, thing) {
        stroke(0);
        let c = this.centre(cell_size);
        text(thing, c[0], c[1]);
    }
    linksString() {
        let s = 'links: [';
        for (let cell in this.links) {
            s += 'cell: ' + cell.toString() + ', ';
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
class Distances {
    constructor(root) {
        this.root = root;
        this.cells = new Map();
        this.cells.set(root, 0);
    }
    get(cell) {
        return this.cells.get(cell);
    }
    set(cell, distance) {
        this.cells.set(cell, distance);
    }
    cells_keys() {
        return this.cells.keys();
    }
}
class Grid {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.grid = Grid.prepare_grid(rows, columns);
        this.configure_cells();
    }
    static prepare_grid(rows, columns) {
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
        if (!(this.rows > row && row >= 0))
            return null;
        if (!(this.columns > col && col >= 0))
            return null;
        return this.grid[row][col];
    }
    set(row, col, cell) {
        if (!(this.rows > row && row >= 0))
            return null;
        if (!(this.columns > col && col >= 0))
            return null;
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
    rand_cell() {
        let row = floor(random() * this.rows);
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
class DistanceGrid extends Grid {
    constructor(rows, columns) {
        super(rows, columns);
    }
    contents_of(cell) {
        if (this.distances && this.distances.get(cell)) {
            return str(this.distances.get(cell));
        }
        else {
            return super.contents_of(cell);
        }
    }
}
class Sidewinder {
    static on(grid) {
        let cells = grid.cell_rows();
        for (let cell_row_index = 0; cell_row_index < cells.length; cell_row_index++) {
            let row = cells[cell_row_index];
            let run = [];
            for (let cell_index = 0; cell_index < row.length; cell_index++) {
                let cell = row[cell_index];
                run.push(cell);
                let at_eastern_boundary = (cell.east == null);
                let at_northern_boundary = (cell.north == null);
                let should_close_out = at_eastern_boundary ||
                    (!at_northern_boundary && floor(random() * 2) == 0);
                if (should_close_out) {
                    let index = floor(random() * run.length);
                    let member = run[index];
                    if (member.north != null)
                        member.link(member.north);
                    run = [];
                }
                else {
                    cell.link(cell.east);
                }
            }
        }
        return grid;
    }
}
let numberOfShapesControl;
let grid_size;
let border;
let cell_size;
let grid;
let grid2;
let grid_distance;
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER).noFill().frameRate(30);
    numberOfShapesControl = createSlider(1, 30, 15, 1).position(10, 10).style("width", "100px");
    grid_size = 10;
    border = 40;
    calcCellSize();
    grid = new Grid(grid_size, grid_size);
    BinaryTree.on(grid);
    grid2 = new Grid(grid_size, grid_size);
    Sidewinder.on(grid2);
    console.log('made first grids');
    grid_distance = new DistanceGrid(grid_size, grid_size);
    BinaryTree.on(grid_distance);
    let start = grid_distance.get(0, 0);
    let distances = start.distances();
    grid_distance.distances = distances;
    console.log('made distance grid');
    frameRate(10);
}
function calcCellSize() {
    cell_size = (windowWidth * 0.45 - border) / grid_size;
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    calcCellSize();
}
function draw() {
    background(255);
    translate(border, border);
    grid.draw(cell_size, 0);
    translate(0, windowWidth * 0.5);
    grid2.draw(cell_size, 0);
    translate(windowWidth * 0.5, 0);
    grid_distance.draw(cell_size, 0);
}
//# sourceMappingURL=build.js.map