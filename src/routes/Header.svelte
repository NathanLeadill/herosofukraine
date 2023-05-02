<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/logo-y.png';
	import Icon from '$components/icon.svelte';

	$: currentPage = $page.url.pathname;
	$: console.log('# currentPage :', currentPage)
</script>

<header>
	<a class="logo-container" href="/">
		Heroiam <img class="logo" src={logo} alt="logo"/> Slava
	</a>
	<div class="nav">
		<a 
			href="/"
			class:active={currentPage === "/"}
			class="icon-container"
		>
			<Icon 
				name="globe" 
				color={currentPage === "/" ? "--accent" : "--secondary-light"} 
				style={"width: 24px; padding-top: 8px;"} 
			/>
			<span class="icon-subtext">
				News
			</span>
		</a>
		<a 
			href="/media" 
			class:active={currentPage === "/media"}
			class="icon-container"
		>
			<Icon 
				name="image" 
				color={currentPage === "/media" ? "--accent" : "--secondary-light"} 
				style={"width: 24px; padding-top: 8px;"}
			/>
			<span class="icon-subtext">
				Media
			</span>
		</a>
		<a 
			href="/memorial" 
			class:active={currentPage === "/memorial"}
			class="icon-container"
		>
			<Icon 
				name="rose" 
				color={currentPage === "/memorial" ? "--accent" : "--secondary-light"} 
				style={"width: 24px; padding-top: 8px;"}
			/>
			<span class="icon-subtext">
				Memorial
			</span>
		</a>
		<a 
			href="/profile" 
			class:active={currentPage === "/profile"}
			class="icon-container"
		>
			<Icon 
				name="user" 
				color={currentPage === "/profile" ? "--accent" : "--secondary-light"} 
				style={"width: 24px; padding-top: 8px;"}
			/>
			<span class="icon-subtext">
				Profile
			</span>
		</a>
	</div>
	<!-- <p>Слава Україні. Героям слава!</p> -->
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
	
	.nav {
		display: flex;
		justify-content: space-around;
		margin: 0 auto;
		margin-top: 6px;
		width: 100%;
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
	
	.icon-container {
		align-items: center;
		color: var(--secondary-light);
		display: flex;
		flex-direction: column;
		padding-bottom: 8px;
		position: relative;
		text-decoration: none;
		width: 24px;
	}
	
	.active {
		color: var(--accent);
	}
	.active:before {
		background-color: var(--primary-light);
		border-radius: 10px 10px 0 0;
		content: "";
		display: block;
		position: absolute;
		width: 20vw;
		height: 100%;
		z-index: -1;
	}

	.icon-subtext {
		font-size: 10px;
		font-weight: 400;
		margin-top: 2px;
		text-align: center;
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
</style>
