<script lang="ts">
	import P5, { type Sketch } from 'p5-svelte';
	import type * as p5 from 'p5';
	import { Sidewinder } from '$lib/generators/sidewinder';
	import { ColoredGrid } from '$lib/grids/colored_grid';
	import { Distances } from '$lib/distances/distances';
	import type { Cell } from '$lib/grids/cell';
	import type { Grid } from '$lib/grids/grid';
	import { step_distance } from '$lib/distances/djikstra';
	let grid_size = 15;

	function init_grid(grid_size: number): ColoredGrid {
		const grid = new ColoredGrid(grid_size, grid_size);
		Sidewinder.on(grid);
		return grid;
	}

	function init_frontier(grid: Grid, in_start?: Cell): Cell[] {
		let cell = in_start ?? grid.get(0, 0);
		return [cell];
	}

	function update_grid(grid: ColoredGrid, frontier: Cell[]) {
		let distances = grid.get_distances();

		if (frontier.length > 0) {
			return step_distance(distances, frontier);
		}
	}

	let sketch: Sketch = function (p: p5) {
		let grid_size_value: number;
		let border: number;
		let cell_size: number;
		let grid_distance: ColoredGrid;
		let frontier: Cell[];
		p.preload = (): void => {};
		p.setup = (): void => {
			console.log('🚀 - Setup initialized - P5 is running');

			p.createCanvas(p.displayWidth, p.windowHeight);
			p.rectMode(p.CENTER).noFill().frameRate(30);
			// NUMBER OF SHAPES SLIDER

			// Create a button for saving canvas image
			let saveImageBtn = p.createButton('Save Canvas');
			saveImageBtn.position(290, 20);
			saveImageBtn.mousePressed(saveAsCanvas);

			grid_size_value = grid_size;
			border = 40;
			calcCellSize(grid_size_value);

			console.log('make grid');
			grid_distance = init_grid(grid_size_value);
			init_distances();
			p.frameRate(10);
		};

		function saveAsCanvas() {
			p.save('output_canvas' + 'colored_longest_path' + '.png');
		}

		function init_distances(in_start?: Cell) {
			let start = in_start ?? grid_distance.get(0, 0);
			console.log('init grid at ' + start.row + ' ' + start.column);
			grid_distance.set_distances(new Distances(start));
			frontier = init_frontier(grid_distance, in_start);
		}
		p.mousePressed = (): void => {
			console.log('mouse pressed ' + p.mouseX + ' ' + p.mouseY);
			let column = Math.floor(p.mouseX / cell_size) - 1;
			let row = Math.floor(p.mouseY / cell_size) - 1;
			console.log('mouse pressed at grid point' + row + ' ' + column);
			let cell = grid_distance.get(row, column);
			init_distances(cell);
		};

		function calcCellSize(grid_size: number) {
			cell_size = (p.windowWidth * 0.9 - border) / grid_size;
		}
		p.windowResized = (): void => {
			p.resizeCanvas(p.displayWidth, p.windowHeight);
			calcCellSize(grid_size_value);
		};

		function update_grid_size_value() {
			let current_val = grid_size;
			if (Math.abs(current_val - grid_size_value) > 0) {
				grid_size_value = current_val;
				calcCellSize(grid_size_value);
				grid_distance = init_grid(grid_size_value);
				init_distances();
			}
		}

		function update() {
			if (frontier.length > 0) {
				let step = update_grid(grid_distance, frontier);
				grid_distance.set_distances(step.distances);
				frontier = step.frontier;
			}
			update_grid_size_value();
		}

		// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
		p.draw = (): void => {
			p.background(255);
			update();
			p.translate(border, border);
			grid_distance.draw(p, cell_size, 0, true);
		};
	};
</script>

<label>
	Grid Size
	<input type="range" bind:value={grid_size} min="4" max="100" step="1" />
	{grid_size}
</label>
<div width="100">
	<P5 {sketch} />
</div>
