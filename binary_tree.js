
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