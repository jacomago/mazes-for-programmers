<script lang="ts">
	import P5, { type Sketch } from 'p5-svelte';
	import type * as p5 from 'p5';
	import type { Grid } from '$lib/grids/grid';
	import { setup_bias_binary_tree_grid } from '$lib/bin/binary_tree_demo';
	import { Direction } from '$lib/grids/directions';
	let grid_size = 15;

	let sketch: Sketch = function (p: p5) {
		let grid_size_value: number;
		let border: number;
		let cell_size: number;
		let grid_distance: Grid;
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
			grid_distance = setup_bias_binary_tree_grid(grid_size_value, [
				Direction.South,
				Direction.West
			]);
			p.frameRate(10);
		};

		function saveAsCanvas() {
			p.save('output_canvas' + 'colored_longest_path' + '.png');
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
				grid_distance = setup_bias_binary_tree_grid(grid_size_value, [
					Direction.South,
					Direction.West
				]);
			}
		}

		function update() {
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

<h2>binary_tree_ south west</h2>
<label>
	Grid Size
	<input type="range" bind:value={grid_size} min="4" max="100" step="1" />
	{grid_size}
</label>
<div width="100">
	<P5 {sketch} />
</div>
