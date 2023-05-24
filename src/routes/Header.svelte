<script lang="ts">
	import NavItem from '$components/NavItem.svelte';
	import Logo from '$components/logo.svelte';
	import MapNav from '$components/mapNav.svelte';
	import logo from "../lib/images/logo-y.png";
</script>

<header>
	<!-- Mobile Header -->
	<div class="mobile">
		<Logo />
		<div class="nav">
			<NavItem pageName="" label={'Home'} />
			<NavItem pageName="stats" label={'Stats'} />
			<NavItem pageName="media" label={'Media'} />
			<NavItem pageName="memorial" label={'Memorial'} />
			<NavItem pageName="profile" label={'Profile'} />
		</div>
	</div>
	<!-- Desktop Header -->
	<div class="desktop-header">
		<div class="mapNav-container">
			<MapNav />
		</div>
	</div>
</header>

<style>
	header {
		background-color: var(--primary);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		left: 0;
		padding: 0 20px;
		position: fixed;
		right: 0;
		top: 0;
		z-index: 100;
		box-shadow: 0 0 6px var(--shadow);
	}
	.nav {
		display: flex;
		justify-content: space-around;
		margin: 4px auto 0;
		width: 100%;
	}
	
	@media (min-width: 600px) {
		header {
			background-color: transparent;
			box-shadow: none;
			padding: 0;
			position: absolute;
		}
		.mobile {
			display: none;
		}
	}
	
	:global(.icon-container.active svg) {
		fill: var(--accent);
	}
	:global(.icon-container:not(.active) svg) {
		fill: var(--secondary-light);
	}

	/* Desktop */
	.desktop-header {
		display: none;
	}
	@media (min-width: 600px) {
		.mapNav-container {
			backdrop-filter: blur(16px);
			background: rgba(21, 22, 20, 0.5);
			border-bottom-right-radius: 32px;
			box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
			display: flex;
			height: 100%;
			padding: 0px 48px;
			width: 564px;
		}
		.desktop-header {
			align-items: center;
			display: flex;
			height: 100px;
			justify-content: space-between;
			margin: 0 auto;
			padding: 0px 48px;
			padding-top: 0;
			padding-left: 0;
			position: absolute;
			left: 260px;
			width: calc(100vw - 260px);
		}
		.desktop-header .sidebar-on {
			margin-left: 0;
		}
	}
</style>
