<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/logo4.png';
</script>

<header>
	<div class="corner logo-corner">
		<a href="/">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<div class="nav-container">
		<nav>
			<svg viewBox="0 0 2 3" aria-hidden="true">
				<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
			</svg>
			<ul>
				<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a href="/">Home</a>
				</li>
				<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
					<a href="/about">About This project</a>
				</li>
				<li aria-current={$page.url.pathname.startsWith('/heros') ? 'page' : undefined}>
					<a href="/heros">Heros Of Ukraine</a>
				</li>
			</ul>
			<svg viewBox="0 0 2 3" aria-hidden="true">
				<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
			</svg>
		</nav>
		<div class="content">
			<p>Слава Україні. Героям слава!</p>
		</div>
	</div>

	<div class="corner coming-soon">
		<a href="https://github.com/sveltejs/kit">
			Translation, coming soons <sub class="helper">If you want to help please contact me</sub></a
		>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		background-color: #ffd500;
	}

	.corner {
		width: 135px;
		height: 125px;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		margin-left: 0;
	}

	.corner.logo-corner {
		margin-left: 65px;
	}

	.corner.coming-soon a {
		display: flex;
		flex-direction: column;
		color: #005bbb;
		font-family: 'Poppins';
		text-align: center;
		font-weight: 800;
		font-size: 1.25rem;
		position: relative;
		right: 50px;
		width: 150px;
		margin-bottom: 8px;
		gap: 10px;
	}
	.helper {
		font-size: 0.4rem;
		width: 225px;
		font-size: 0.6rem;
		font-style: italic;
		font-weight: 400;
	}

	.corner img {
		width: 125px;
		height: 125px;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: #005bbb;
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid #ffd500;
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: #ffd500;
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	.content {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: calc(125px - 48px);
	}

	.content p {
		font-size: 1.75rem;
		font-weight: 700;
		color: #005bbb;
		margin: 0;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
