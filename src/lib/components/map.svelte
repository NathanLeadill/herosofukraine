<script lang="ts">
  import { browser } from '$app/environment';
	import { curtainState } from '$lib/stores';
  import type { Map } from 'leaflet';
  import { onDestroy, onMount } from 'svelte';

  let mapElement: HTMLElement | null;
  let map: Map;

  // Subscribe to updates in the store's state
  let curtainOpen;
  curtainState.subscribe(value => {
    curtainOpen = value;
  });
  
  function toggleCurtain() {
    curtainState.toggle();
  }
  
  onMount(async () => {
      if (browser) {
          // Dynamically import leaflet
          const leaflet = await import('leaflet');
          
          // Check map element
          mapElement = document.getElementById('map');
          if (!mapElement) {
              console.log('No map element found.');
              return;
          }
          
          // Create map
          map = leaflet.map(mapElement).setView([49.97, 36.209], 5);
          
          // Load openstreetmap tiles
          leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);
          
          // Add click event
          function onClick(e) {
            console.log(e.target);
            toggleCurtain();
          }
          function onMouseOver(e) {
            marker.bindPopup("<b>3 tanks destroyed</b><br>03/05/23 at 22:02").openPopup();
          }
          
          // Add markers
          const marker = leaflet.marker([49.97, 36.209]).addTo(map)
          
          // Add event listeners
          marker.on(
            'mousedown', onClick
          ).on(
            'mouseover', onMouseOver
          ).on(
            'mouseout', function(e) {
              marker.closePopup();
            }
          )
          
      } else {
          console.log('Leaflet map only works in browser.');
      }
  });

  onDestroy(async () => {
      if (map) {
          console.log('Unloading Leaflet map.');
          map.remove();
      }
  });
</script>

<div id="map" />

<style>
  @import 'leaflet/dist/leaflet.css';
  #map {
    height: calc(100vh - 46px);
    max-width: 100%;
    position: absolute;
    inset: 0px;
    width: 100vw;
    z-index: 1;
  }
</style>