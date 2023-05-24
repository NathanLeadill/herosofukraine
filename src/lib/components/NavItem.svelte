<script lang="ts">
	import { page } from '$app/stores';
	import { iconNames } from '$lib/objects/icons';
	import type { IconType } from '$models/icon';
	import { onMount } from 'svelte';
	import Icon from './icon.svelte';
	export let label: string;
	export let pageName: string;
	export let comingSoon: boolean = false;
	$: activePage = $page.url.pathname === `/${pageName}`;
	$: color = activePage ? '--accent' : '--secondary-light';
	$: iconName = iconNames[label as keyof typeof iconNames] as IconType;
	
	// check if mobile
	$: isMobile = false;
	onMount(() => {
		isMobile = window.innerWidth < 600;
	});
	
	// give different styles for mobile and desktop
	$: style = `
		padding-top: ${isMobile ? '8px' : '0'};
		fill: var(${isMobile ? color : 
			(activePage ? '--secondary' : '--secondary-light')
		});
		width: ${isMobile ? '24px' : '28px'};
	`;

</script>

<a href={`/${pageName}`} class:active={activePage} class="icon-container">
	<Icon 
		{color} 
		name={iconName} 
		{style} 
	/>
	<span 
		class="icon-subtext"
		class:comingSoon={comingSoon}
	>
		{label}
	</span>
</a>

<style>
	.active span {
		color: var(--accent);
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

	.active:before {
		background-color: var(--primary-light);
		border-radius: 8px 8px 0 0;
		content: '';
		display: block;
		height: 100%;
		position: absolute;
		width: 18vw;
		z-index: -1;
	}
	
	.icon-container:hover :global(svg) {
		fill: var(--accent);
	}

	.icon-subtext {
		font-size: 10px;
		font-weight: 400;
		margin-top: 2px;
		text-align: center;
	}

	@media (min-width: 600px) {
		.icon-container {
			border-radius: 10px;
			flex-direction: row;
			margin-bottom: 16px;
			padding: 10px 16px;
			width: 100%;
		}
		.active {
			background-color: var(--primary-lighter);
		}
		.icon-subtext {
			font-size: 16px;
			padding-left: 16px;
		}
		.comingSoon::after {
			bottom: 50%;
			content: "(Coming Soon)";
			color: var(--secondary-light);
			font-size: 10px;
			font-style: italic;
			position: absolute;
			right: 0;
			transform: translateY(50%);
		}
		.active:before {
			background: var(--accent);
			border-radius: 10px 0 0 10px;
			content: "";
			height: 100%;
			right: -22px;
			width: 4px;
		}
		.active span {
			color: var(--secondary);
		}
	}
</style>
