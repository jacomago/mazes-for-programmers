import { Cell } from "./cell";
import { Grid } from "./grid";

export class BinaryTree {
    static on(grid: Grid) {
        let cells = grid.cells();
        for (let cell_index = 0; cell_index < cells.length; cell_index++) {
            let cell = cells[cell_index];
            let neighbours: Cell[] = [];
            if (cell.north != undefined) neighbours.push(cell.north);
            if (cell.east != undefined) neighbours.push(cell.east);

            if (neighbours.length > 0) {
                let index = Math.floor(Math.random() * neighbours.length);
                let neighbour = neighbours[index];
                cell.link(neighbour);
            }
        }
        return grid;
    }
}