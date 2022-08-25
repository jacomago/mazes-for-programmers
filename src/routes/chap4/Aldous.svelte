<script lang="ts">
	import P5, { type Sketch } from 'p5-svelte';
	import type * as p5 from 'p5';
	import type { DistanceGrid } from '$lib/grids/distance_grid';
	import type { Cell } from '$lib/grids/cell';
	import { aldous_colored_grid } from '$lib/bin/aldousbroder';
	import { Direction } from '$lib/grids/directions';

	let grid_size = 15;
	// Vertical vs horizontal weight
	let v_vs_h_weight = 0.5;

	let sketch: Sketch = function (p: p5) {
		let grid_size_value: number;
		let border: number;
		let cell_size: number;
		let grid_distance: DistanceGrid;
		let curr_weights: Map<Direction, number>;
		p.preload = (): void => {};
		p.setup = (): void => {
			console.log('🚀 - Setup initialized - P5 is running');

			p.createCanvas(p.windowWidth, p.windowWidth);
			p.rectMode(p.CENTER).noFill().frameRate(30);
			// NUMBER OF SHAPES SLIDER

			// Create a button for saving canvas image
			let saveImageBtn = p.createButton('Save Canvas');
			saveImageBtn.position(290, 20, 'relative');
			saveImageBtn.mousePressed(saveAsCanvas);

			grid_size_value = grid_size;
			border = 40;
			calcCellSize(grid_size_value);

			console.log('make grid');
			curr_weights = calcWeights();
			grid_distance = aldous_colored_grid(grid_size_value, curr_weights);
			p.frameRate(10);
		};

		function init_distances(in_start?: Cell) {
			let start = in_start ?? grid_distance.get(0, 0);
			console.log('init grid at ' + start.row + ' ' + start.column);
			grid_distance.set_distances(start.distances());
		}
		p.mousePressed = (): void => {
			console.log('mouse pressed ' + p.mouseX + ' ' + p.mouseY);
			let column = Math.floor(p.mouseX / cell_size) - 1;
			let row = Math.floor(p.mouseY / cell_size) - 1;
			console.log('mouse pressed at grid point' + row + ' ' + column);
			let cell = grid_distance.get(row, column);
			init_distances(cell);
		};

		function saveAsCanvas() {
			p.save('output_canvas' + 'aldous coloured' + '.png');
		}

		function calcCellSize(grid_size: number) {
			cell_size = (p.windowWidth * 0.9 - border) / grid_size;
		}

		p.windowResized = (): void => {
			p.resizeCanvas(p.windowWidth, p.windowWidth);
			calcCellSize(grid_size_value);
		};

		function update_grid_size_value() {
			let current_val = grid_size;
			if (Math.abs(current_val - grid_size_value) > 0) {
				grid_size_value = current_val;
				calcCellSize(grid_size_value);
				grid_distance = aldous_colored_grid(grid_size_value, curr_weights);
			}
		}

		function calcWeights() {
			return new Map([
				[Direction.South, v_vs_h_weight * 0.5],
				[Direction.West, (1 - v_vs_h_weight) * 0.5],
				[Direction.North, (1 - v_vs_h_weight) * 0.5],
				[Direction.East, v_vs_h_weight * 0.5]
			]);
		}
		function update_weights() {
			if (Math.abs(curr_weights.get(Direction.South) * 2.0 - v_vs_h_weight) > 0) {
				curr_weights = calcWeights();
				grid_distance = aldous_colored_grid(grid_size_value, curr_weights);
			}
		}

		function update() {
			update_grid_size_value();
			update_weights();
		}

		// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
		p.draw = (): void => {
			p.background(255);
			update();
			p.translate(border, border);
			grid_distance.draw(p, cell_size, 0, false);
		};
	};
</script>

<h2>aldousbroder</h2>
<label>
	Grid Size
	<input type="range" bind:value={grid_size} min="4" max="100" step="1" />
	{grid_size}
</label>
<br />
<p>
	weights must be close to 0.25 as otherwise the random walk will not necessarily finish covering
	every part of the grid.
</p>
<label
	>Vertical vs horizontal weight
	<input type="range" bind:value={v_vs_h_weight} min="0.40" max="0.60" step="0.01" />
	{v_vs_h_weight}
</label>
<br />

<div width="100">
	<P5 {sketch} />
</div>
