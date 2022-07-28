import { Cell } from "./cell";
import { Grid } from "./grid";

export class Sidewinder {

  static on(grid: Grid) {
    let cells = grid.cell_rows();
    for (let cell_row_index = 0; cell_row_index < cells.length; cell_row_index++) {
      let row = cells[cell_row_index];
      let run: Cell[] = [];
      for (let cell_index = 0; cell_index < row.length; cell_index++) {
        let cell = row[cell_index];
        run.push(cell);

        let at_eastern_boundary = (cell.east == null);
        let at_northern_boundary = (cell.north == null);

        let should_close_out = at_eastern_boundary ||
          (!at_northern_boundary && Math.floor(Math.random() * 2) == 0);

        if (should_close_out) {
          let index = Math.floor(Math.random() * run.length);
          let member = run[index];
          if (member.north != null) member.link(member.north);
          run = [];
        } else {
          if (cell.east != undefined) {
            cell.link(cell.east);
          }
        }
      }
    }

    return grid;
  }
}