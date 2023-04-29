<script>
	let tableData = [
		{ id: 1, name: 'John Doe', email: 'john.doe@example.com' },
		{ id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
		{ id: 3, name: 'Bob Smith', email: 'bob.smith@example.com' },
		{ id: 4, name: 'Alice Johnson', email: 'alice.johnson@example.com' }
	];
</script>

<main>
	<h1>Modern Table in Svelte</h1>
	<table>
		<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Email</th>
			</tr>
		</thead>
		<tbody>
			{#each tableData as row}
				<tr>
					<td>{row.id}</td>
					<td>{row.name}</td>
					<td>{row.email}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>

<style>
	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
			'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
		background-color: #f5f5f5;
	}

	main {
		width: 80%;
		margin: 2rem auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 1rem;
	}

	th,
	td {
		padding: 1rem;
		text-align: left;
		border-bottom: 1px solid #e0e0e0;
	}

	th {
		background-color: #4a4a4a;
		color: white;
		font-weight: 500;
	}

	tr:nth-child(even) {
		background-color: #f2f2f2;
	}

	@media screen and (max-width: 600px) {
		table,
		tr,
		td {
			display: block;
		}

		tr {
			padding: 0.5rem;
			margin-bottom: 1rem;
		}

		td {
			padding: 0.5rem 0;
			border: none;
			border-bottom: 1px solid #e0e0e0;
		}

		th {
			display: none;
		}
	}
</style>
