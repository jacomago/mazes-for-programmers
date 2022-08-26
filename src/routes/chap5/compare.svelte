<script lang="ts">
	import { comparisons, Property } from '$lib/bin/comparison';

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
<div class="sketch-container" width="100">
	{#each Array.from(comparisons(grid_size, attempts).entries()) as pair}
		<h3>{pair[0]}:</h3>
		{#each Array.from(pair[1].entries()) as res}
			<p>{Property[res[0]]} : {res[1]} %</p>
		{/each}
	{/each}
</div>
