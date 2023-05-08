<script lang="ts">
  import type { ReportType } from '$models/report';
  import { reportState } from '$lib/stores';
  import { browser } from '$app/environment';
	import { curtainState } from '$lib/stores';
  import type { Map } from 'leaflet';
  import { onDestroy, onMount } from 'svelte';
	import { reports } from '$lib/objects/dummyData';
	import { mainActiveReport } from '$lib/helpers';
  
  // Map variables
  let mapElement: HTMLElement | null;
  let map: Map;
  
  
  // Subscribe to curtain state in the store
  let curtainOpen;
  curtainState.subscribe(value => {
    curtainOpen = value;
  });
  
  function toggleCurtain() {
    curtainState.toggle();
  }
  
  onMount(async () => {
    if (browser) {
      // Dynamically import leaflet to avoid SSR issues
      const leaflet = await import('leaflet');
      
      // Check map element
      mapElement = document.getElementById('map');
      if (!mapElement) {
          console.log('No map element found.');
          return;
      }
      
      // Create map
      const lastReportLocation = reports[Object.keys(reports)[0] as keyof typeof reports];
      const mapOptions = {
        center: lastReportLocation.location,
        zoom: 5,
        locale: 'en'
      }
      map = leaflet.map(mapElement, mapOptions)
      
      // Load openstreetmap tiles & add to map
      leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://carto.com/">carto.com</a>'
      }).addTo(map);
      
      // Add markers for each location
      for (const key in reports) {
        const report = reports[key];
        
        // Create a button within the popups to open the curtain
        const button = leaflet.DomUtil.create('button', 'btn-view-report');
        button.innerHTML = 'Open';
        button.addEventListener('click', toggleCurtain);
        
        // Create markers
        const marker = leaflet.marker(
          report.location,
          // {
          //   icon: leaflet.icon({
          //     iconUrl: '/images/marker.svg',
          //     iconSize: [30, 30],
          //     iconAnchor: [15, 30],
          //     popupAnchor: [0, -30],
          //   }),
          // },
        )
          .addTo(map)
          // Create marker popups
          .bindPopup(
            leaflet.popup().setContent(`<h3 class="popup-title">${report.title} </h3>`),
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
          reportState.setSelectedReport(report);
        });

        // Event to clear the selected report when the map is clicked
        // NOTE: Could be improved by detecting if any popup is open but couldn't find a way to do it in a clean way
        map.on('click', function(e) {
          mainActiveReport && reportState.setSelectedReport(mainActiveReport);
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