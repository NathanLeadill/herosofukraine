<script>
	</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h3>Hero's of Ukraine, coming soon.</h3>
	<p>This website aims to log all the hero's of Ukraine that have sadly died defending freedom.
		It is crowd sourced, using volunteers, and reddit scraping to find the information.
	</p>
	<p>If you would like to get involved please contact me on <a href="https://www.reddit.com/user/Ok-Ranger-8016">Reddit</a></p>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
