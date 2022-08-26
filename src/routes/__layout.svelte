<script>
	import Navbar from '../components/Navbar.svelte';

	import '../app.css';
</script>

<div id="app" class="flex flex-col min-h-screen font-mono">
	<Navbar />
	<br />
	<div class="p-2">
		<slot />
	</div>
</div>
