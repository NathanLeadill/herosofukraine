<script lang="ts">
	import type { IconType } from '$models/icon';
	import Chevron from './icons/Chevron.svelte';
	import Globe from './icons/Globe.svelte';
	import Link from './icons/Link.svelte';
	import LogoTransparent from './icons/LogoTransparent.svelte';
	import Photo from './icons/Photo.svelte';
	import Rose from './icons/Rose.svelte';
	import User from './icons/User.svelte';

	export let name: IconType;
	export let color = '--secondary';
	export let style = '';

	let defaultStyle = `fill: var(${color});`;
	$: styled = `${defaultStyle + ' ' + style}`;
</script>

{#if name === 'globe'}
	<Globe {styled} />
{:else if name === 'image'}
	<Photo {styled} />
{:else if name === 'rose'}
	<Rose {styled} />
{:else if name === 'user'}
	<User {styled} />
{:else if name === 'chevron-up'}
	<Chevron {styled} />
{:else if name === 'link'}
	<Link {styled} />
{:else if name === 'logo-transparent'}
	<LogoTransparent {styled} />
{/if}

<style>
</style>
