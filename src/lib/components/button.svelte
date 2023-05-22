<script lang="ts">
	export let id: string | undefined = undefined;
	export let active = false;
	export let disabled = false;
	export let iconOnly = false;
	export let inline = false;
	export let invisible = false;
	export let noHover = false;
	export let sidebar = false;
	export let transparent = false;
	export let type: 'button' | 'reset' | 'submit' | null | undefined = 'button';
	export let style = '';
	export { className as class };
</script>

<button
	class:active
	class:disabled
	class:iconOnly
	class:inline={inline || iconOnly}
	class:invisible
	class:noHover
	class:sidebar
	class:transparent
	{id}
	{style}
	{type}
	on:click
>
	<!-- default slot (text) -->
	<slot name="icon" />
	<span>
		<slot />
	</span>
</button>

<style>
	button {
		background-color: var(--accent);
		border: 1px solid transparent;
		border-radius: var(--max-radius);
		color: var(--primary);
		cursor: pointer;
		display: block;
		outline: none;
		padding: 10px 18px;
		transition: all ease 0.2s;
		width: 100%;
	}
	button:focus,
	button:hover {
		background-color: var(--accent);
		border: 1px solid transparent;
		outline: none;
		opacity: 0.7;
	}
	button:active {
		opacity: 0.65;
	}
	.transparent {
		background-color: transparent;
		border: 1px solid var(--primary-light);
		color: var(--primary-inverse);
	}
	.transparent:focus,
	.transparent:hover {
		background-color: var(--primary-light);
		border: 1px solid var(--primary-light);
		outline: none;
		transition: all ease 0.2s;
	}
	.iconOnly {
		padding: 0;
		background-color: transparent;
		border: 1px solid var(--primary-light);
		border-radius: var(--max-radius);
	}
	.iconOnly:focus,
	.iconOnly:hover {
		background-color: var(--primary-light);
		border: 1px solid var(--primary-light);
		outline: none;
		transition: all ease 0.2s;
	}
	.invisible {
		background-color: transparent;
		border: 1px solid #d06e6e00;
		color: var(--primary-inverse);
		transition: all ease 0.2s;
	}
	.invisible:hover,
	.invisible:focus {
		color: var(--primary-inverse);
		transition: all ease 0.2s;
	}
	.inline {
		display: inline-block;
		width: auto;
	}
	.sidebar {
		color: var(--light);
	}
	.sidebar:hover,
	.sidebar:focus {
		color: var(--light);
		background-color: var(--accent-hover);
		border: 1px solid var(--accent-hover);
	}
	.active {
		background-color: var(--accent-hover);
	}
	.disabled {
		border: 1px solid var(--primary-light);
		color: var(--primary-inverse);
		cursor: not-allowed;
	}
	
	.invisible, 
	.noHover:hover,
	.noHover:focus {
		background-color: transparent;
		outline: none;
		border: none;
	}
</style>
