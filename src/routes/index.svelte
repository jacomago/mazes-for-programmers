<script lang="ts">
	import { comparison_deadends } from '$lib/bin/comparison';

	let grid_size = 15;
	let attempts = 10;
</script>

<h2>compare deadends</h2>
<label>
	Grid Size:
	<input type="range" bind:value={grid_size} min="4" max="100" step="1" />
	{grid_size}
</label>
<p />
<label>
	Attempts:
	<input type="range" bind:value={attempts} min="4" max="100" step="1" />
	{attempts}
</label>
<div width="100">
	{#each Array.from(comparison_deadends(grid_size, attempts).entries()) as pair}
		<p>{pair[0]}: {pair[1]} %</p>
	{/each}
</div>
