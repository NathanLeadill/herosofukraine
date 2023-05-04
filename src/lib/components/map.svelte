<script lang="ts">
  import { browser } from '$app/environment';
	import { curtainState } from '$lib/stores';
  import type { Map } from 'leaflet';
  import { onDestroy, onMount } from 'svelte';

  let mapElement: HTMLElement | null;
  let map: Map;
  
  const locations = {
    report1: {
      title: 'Ukraine war continues into another day with no resolution in sight',
      latlng: [51, 36],
      description: '3 tanks were destroyed this saturday during the conflict between the Ukrainian army and the Russian army.'
    },
    report2: {
      title: 'Intense Fighting Erupts in Eastern Ukraine as Russian-Backed Separatists Launch Major Offensive',
      latlng: [49.9, 39.2],
      description: 'A civilian was killed during the conflict between the Ukrainian army and the Russian army.'
    }
  };
  
  // Subscribe to updates in the store's state
  let curtainOpen;
  curtainState.subscribe(value => {
    curtainOpen = value;
  });
  
  function toggleCurtain(report) {
    curtainState.toggle(report);
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
      
      // Create map (centered on the last report location)
      const lastReportLocation = locations[Object.keys(locations)[0] as keyof typeof locations];
      const mapOptions = {
        center: lastReportLocation.latlng,
        zoom: 5,
        locale: 'en'
      }
      map = leaflet.map(mapElement, mapOptions)
        // .setView(lastReportLocation.latlng, 5);
      
      // Load openstreetmap tiles
      leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://carto.com/">carto.com</a>'
      }).addTo(map);
      
      // Add markers for each location
      for (const key in locations) {
        const location = locations[key];
        
        // Create a button within the popups to open the curtain
        const button = leaflet.DomUtil.create('button', 'btn-view-report');
        button.innerHTML = 'Open';
        button.addEventListener('click', toggleCurtain);
        
        // Create markers
        const marker = leaflet.marker(location.latlng)
          .addTo(map)
          // Create marker popups
          .bindPopup(
            leaflet.popup().setContent(`<h3 class="popup-title">${location.title} </h3>`),
            { 
              closeButton: false, 
              maxWidth: 200,
            },
          )
          // Add the button to the popup
          .on('popupopen', () => {
            const popupContent = marker?.getPopup()?.getContent();
            marker?.getPopup()?.getElement()?.appendChild(button);
            marker?.getPopup()?.setContent(`${popupContent}`);
          });
          
        // Add an event listener to open the popup when the marker is clicked
        marker.on('click', () => {
          marker.openPopup();
        });
      }
        
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