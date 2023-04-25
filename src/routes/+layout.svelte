<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />
	<main>
		<slot />
	</main>

	<footer>
		<p>
			Copyright © 2023 <br /> Developed and Managed by
			<a href="https://www.reddit.com/user/Ok-Ranger-8016">Ok-Ranger-8016</a>
			<br />If you would like to submit info about a hero, please contact me on Reddit.
		</p>
		<a href="/privacy">Privacy Policy</a>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 85%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}
	footer p {
		text-align: center;
	}
	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
