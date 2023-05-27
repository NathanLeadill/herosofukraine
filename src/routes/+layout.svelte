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
			Copyright © 2023 
			<!-- <br /> 
			Developed and Managed by
			<a href="https://www.reddit.com/user/Ok-Ranger-8016">Ok-Ranger-8016</a>
			<br />If you would like to submit info about a hero, please contact me on Reddit. -->
		</p>
		<a class="privacy" href="/privacy">Privacy Policy</a>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	
	main {
		box-sizing: border-box;
		margin: 0 auto;
		margin-top: 121px;
		width: 100%;
	}
	@media (min-width: 600px) {
		main {
			display: flex;
			flex-direction: row-reverse;
			justify-content: space-between;
			margin-top: 0;
			height: 100vh;
		}
	}
	
	footer {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 12px;
		margin-bottom: 36px;
	}
	@media (min-width: 600px) {
		footer {
			display: none;
		}
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

	.privacy {
		color: var(--dark);
		font-size: 12px;
		font-weight: 400;
		text-decoration: none;
	}
</style>
