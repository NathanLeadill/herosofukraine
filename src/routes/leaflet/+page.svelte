<script>
	import L from 'leaflet';
	import { onMount } from 'svelte';

	onMount(() => {
		let latlng = [0, 0];
		// 1st arg is tile server url
		// 2nd arg is zoom level
		var mymap = L.map('map').setView(location, 2);
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution:
				'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1
		}).addTo(mymap);
	});
</script>

<div id="map" />
