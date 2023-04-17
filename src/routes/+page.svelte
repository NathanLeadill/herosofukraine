<script>
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h3>Hero's of Ukraine, coming soon.</h3>
	<p>
		This website aims to log all the hero's of Ukraine that have sadly died defending freedom. It is
		crowd sourced, using volunteers, and reddit scraping to find the information.
	</p>
	<p>
		If you would like to get involved please contact me on <a
			href="https://www.reddit.com/user/Ok-Ranger-8016">Reddit</a
		>
	</p>
</section>

<section>
	<p>Placeholders</p>
	<table>
		<thead>
			<tr>
				<th>Image</th>
				<th>Hero's Name</th>
				<th>Age</th>
				<th>Location</th>
				<th>Death</th>
				<th>Details</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><img src="https://i.redd.it/c3efmpaoj8ua1.jpg" class="profile" /></td>
				<td>Artur Pashkulyak</td>
				<td>44</td>
				<td>Bakhmut</td>
				<td>March 22</td>
			</tr>
			<tr>
				<img
					src="https://preview.redd.it/jdm0iic7y0ua1.jpg?width=320&crop=smart&auto=webp&v=enabled&s=e74b2371972fc0dc60686e1cf2b75fd09cad2be3"
					class="profile"
				/>
				<td>Artur Asadov</td>
				<td>26</td>
				<td>Eastern Front</td>
				<td>End of March</td>
			</tr>
			<tr>
				<td>
					<img
						src="https://preview.redd.it/k1gviou8sena1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=599aa027e628d52fdd489c1f532c50cefd9dcb57"
						class="profile"
					/>
				</td>
				<td>Tatyana Fesenko</td>
				<td>30</td>
				<td>Bakhmut</td>
				<td>End of Feb</td>
			</tr>
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
