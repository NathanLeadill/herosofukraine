<script lang="ts">
	import NavItem from '$components/NavItem.svelte';
	import logo from "../lib/images/logo-y.png";
</script>

<header>
	<!-- Mobile -->
	<a class="logo-container" href="/">
		Heroiam
		<img class="logo" src={logo} alt="logo" /> Slava
	</a>
	<div class="nav">
		<NavItem pageName="" label={'Home'} />
		<NavItem pageName="media" label={'Media'} />
		<NavItem pageName="memorial" label={'Memorial'} />
		<NavItem pageName="profile" label={'Profile'} />
	</div>
	<!-- <p>Слава Україні. Героям слава!</p> -->
	<!-- Desktop -->
	<div class="desktop-header">
		Header
	</div>
</header>

<style>
	header {
		background-color: var(--primary);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		left: 0;
		padding: 10px 20px;
		padding-bottom: 0;
		position: fixed;
		right: 0;
		top: 0;
		z-index: 100;
	}
	@media (min-width: 600px) {
		header {
			background-color: transparent;
			padding: 0;
			position: absolute;
		}
	}
	
	/* Mobile */
	.nav {
		display: flex;
		justify-content: space-around;
		margin: 4px auto 0;
		width: 100%;
	}
	@media (min-width: 600px) {
		.nav {
			display: none;
		}
	}

	.logo-container {
		align-items: center;
		color: var(--dark);
		display: flex;
		font-family: 'Rufina';
		font-weight: 400;
		font-size: 32px;
		margin: 0 auto;
		text-decoration: none;
	}
	@media (min-width: 600px) {
		.logo-container {
			display: none;
		}
	}

	:global(.icon-container.active svg) {
		fill: var(--accent);
	}
	:global(.icon-container:not(.active) svg) {
		fill: var(--secondary-light);
	}

	@media (min-width: 600px) {
		.logo-container {
			margin: 0 20px;
		}
	}

	.logo {
		display: inline;
		height: 42px;
		margin: 0 10px;
		width: 42px;
	}

	/* Desktop */
	.desktop-header {
		display: none;
	}
	@media (min-width: 600px) {
		.desktop-header {
			display: flex;
			justify-content: space-between;
			margin: 0 auto;
			padding: 18px 48px;
			position: absolute;
			left: 280px;
			width: calc(100vw - 300px);
		}
		.desktop-header .sidebar-on {
			margin-left: 0;
		}
	}
</style>
