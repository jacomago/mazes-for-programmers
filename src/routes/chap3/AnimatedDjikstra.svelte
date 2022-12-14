<script lang="ts">
	import P5, { type Sketch } from 'p5-svelte';
	import type * as p5 from 'p5';
	import { Sidewinder } from '$lib/generators/sidewinder';
	import { ColoredGrid } from '$lib/grids/colored_grid';
	import type { DistanceGrid } from '$lib/grids/distance_grid';
	import { Distances } from '$lib/distances/distances';
	import type { Cell } from '$lib/grids/cell';
	import type { Grid } from '$lib/grids/grid';
	import { step_distance } from '$lib/distances/djikstra';
	let grid_size = 15;

	function init_grid(grid_size: number): ColoredGrid {
		const grid = new ColoredGrid(grid_size, grid_size);
		grid.init();
		Sidewinder.on(grid);
		let start = grid.get(0, 0);
		grid.set_distances(new Distances(start));
		return grid;
	}

	function init_frontier(grid: Grid): Cell[] {
		return [grid.get(0, 0)];
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

			// Create a button for saving canvas image
			let saveImageBtn = p.createButton('Save Canvas');
			saveImageBtn.mousePressed(saveAsCanvas);

			p.createCanvas(p.windowWidth, p.windowHeight);
			p.rectMode(p.CENTER).noFill().frameRate(30);
			// NUMBER OF SHAPES SLIDER

			grid_size_value = grid_size;
			border = 40;
			calcCellSize(grid_size_value);

			console.log('make grid');
			grid_distance = init_grid(grid_size_value);
			frontier = init_frontier(grid_distance);
			p.frameRate(10);
		};

		function saveAsCanvas() {
			p.save('output_canvas' + 'colored_longest_path' + '.png');
		}

		function calcCellSize(grid_size: number) {
			cell_size = (p.windowWidth * 0.9 - border) / grid_size;
		}
		p.windowResized = (): void => {
			p.resizeCanvas(p.windowWidth, p.windowHeight);
			calcCellSize(grid_size_value);
		};

		function update_grid_size_value() {
			let current_val = grid_size;
			if (Math.abs(current_val - grid_size_value) > 0) {
				grid_size_value = current_val;
				calcCellSize(grid_size_value);
				grid_distance = init_grid(grid_size_value);
				frontier = init_frontier(grid_distance);
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
			//grid_distance.draw_graph(cell_size, 200);
		};
	};
</script>

<h2>Animated djikstra</h2>
<label>
	Grid Size
	<input type="range" bind:value={grid_size} min="4" max="100" step="1" />
	{grid_size}
</label>
<div class="sketch-container" width="100">
	<P5 {sketch} />
</div>
