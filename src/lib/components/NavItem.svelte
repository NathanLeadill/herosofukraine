<script lang="ts">
	import { page } from '$app/stores';
	import { iconNames } from '$lib/obects/icons';
	import type { IconType } from '$models/icon';
	import Icon from './icon.svelte';
	export let label: string;
	export let pageName: string;
	$: activePage = $page.url.pathname === `/${pageName}`;
	$: color = activePage ? '--accent' : '--secondary-light';
	$: iconName = iconNames[label as keyof typeof iconNames] as IconType;
</script>

<a href={`/${pageName}`} class:active={activePage} class="icon-container">
	<Icon name={iconName} {color} style={`width: 24px; padding-top: 8px; fill: var(${color})`} />
	<span class="icon-subtext"> {label} </span>
</a>

<style>
	.active :global(span) {
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
	/* 
	:global(.icon-container.active svg) {
		fill: var(--accent);
	}
	:global(.icon-container:not(.active) svg) {
		fill: var(--secondary-light) !important;
	} */
</style>
