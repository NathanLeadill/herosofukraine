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
				<td>
					<img
						src="https://preview.redd.it/jdm0iic7y0ua1.jpg?width=320&crop=smart&auto=webp&v=enabled&s=e74b2371972fc0dc60686e1cf2b75fd09cad2be3"
						class="profile"
					/>
				</td>

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
			<tr>
				<td>
					<img
						src="https://preview.redd.it/whmarfhkf1qa1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=ecd478c2b7c1d69bb766fb7f41eae3da783e2f55"
						class="profile"
					/>
				</td>
				<td>Maksym Galinichev</td>
				<td>22</td>
				<td>Chervonopopivka</td>
				<td>March 27</td>
			</tr>
			<tr>
				<td
					><img
						src="https://preview.redd.it/jcmt7osqx5ta1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=0af76fb81a4ebe8ced658cac3fb49d93fbdd6b94"
						class="profile"
					/></td
				>
				<td>Andriy Vorobkalo</td>
				<td>26</td>
				<td>Bakhmut</td>
				<td>Feb 24</td>
			</tr>
			<tr>
				<td
					><img
						src="https://preview.redd.it/kt8uzx1i3fra1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=50c890ef391b3d78f1145fb9cb17eeed29e964c4"
						class="profile"
					/></td
				>
				<td>Daniil Liashuk</td>
				<td>32</td>
				<td>Bakhmut</td>
				<td>Apr 3</td>
			</tr>
			<tr>
				<td>
					<img src="https://i.redd.it/dts2rnbkv9sa1.jpg" class="profile" />
				</td>
				<td> Kateryna Yushchenko </td>
				<td>33</td>
				<td>Glukhiva</td>
				<td>Apr 4</td>
			</tr>
			<tr>
				<td>
					<img
						src="https://preview.redd.it/s4jwb1v1knsa1.jpg?width=960&crop=smart&auto=webp&v=enabled&s=678d83c2de78eb11c816b293a1c3bb89f622d956"
						class="profile"
					/>
				</td>
				<td>Oleg Martymyanov</td>
				<td>Unknown</td>
				<td>Bakhmut</td>
				<td>April 11</td>
			</tr>
			<tr>
				<td>
					<img
						src="https://preview.redd.it/rvbs5fqo80ta1.jpg?width=960&crop=smart&auto=webp&v=enabled&s=8b5c34db113d60e2e6a680bef8bd6cfc5068aff2"
						class="profile"
					/>
				</td>
				<td>Andriy Boyko</td>
				<td>Unknown</td>
				<td>Gulyaipol</td>
				<td>April 6</td>
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
