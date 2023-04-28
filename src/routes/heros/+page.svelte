<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<p>Placeholders</p>
	<table>
		<thead>
			<tr>
				<th>Image</th>
				<th>heroes Name</th>
				<th>Age</th>
				<th>Location</th>
				<th>Death</th>
				<td>Links</td>
				<th>Details</th>
			</tr>
		</thead>
		<tbody>
			{#each data.heros as hero}
				<tr>
					<td>
						<img class="profile" src={hero.images[0]} alt="Profile picture of {hero.name}" />
					</td>
					<td>{hero.name}</td>
					<td>{hero.age}</td>
					<td>{hero.location}</td>
					<td>{hero.death}</td>
					<td>
						{#if hero.link}
							<a href={hero.link.url}>{hero.link.name}</a>
						{:else}
							<p>No link</p>
						{/if}
					</td>
					<td>
						<a href="/details">Details</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	.profile {
		width: 150px;
		height: 150px;
	}
	table {
		width: 100%;
	}

	td {
		text-align: center;
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
