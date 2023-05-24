<script lang="ts">
  import type { ReportType } from '$models/report';
  import { dateState, reportState, viewportState } from '$lib/stores';
  import { browser } from '$app/environment';
	import { curtainState } from '$lib/stores';
  import type { Map } from 'leaflet';
  import { onDestroy, onMount } from 'svelte';
	import { dummyReports } from '$lib/objects/dummyData';
	import type { IconType } from '$models/icon';
	import { getMainActiveReport } from '$lib/helpers';
  import { reports } from '$lib/stores';
	
  let leaflet: typeof import('leaflet');
  
  // Subscribe to reports store
  let allReports: ReportType[] | undefined;
  reports.subscribe(value => allReports = value);
  
  // Subscribe to curtain state in the store
  let curtainOpen;
  curtainState.subscribe(value => curtainOpen = value);
  
  // Subscribe to selectedDate store
  let selectedDate: Date;
  const unsubscribeDateState = dateState.subscribe((value) => {
    selectedDate = value;
    handleStoreChange();
  });
  
  function handleStoreChange() {
    console.log('Date changed. Creating markers...');
    createMarkers();
  }

  // Dynamically import SVGs
  async function loadSvg(icon: IconType) {
    const { default: svg } = await import(`../images/${icon}.svg`);
    return svg;
  }
  
  // Check if mobile
  let isMobile = false;
  viewportState.subscribe(value => {
    isMobile = value.isMobile;
  });
  
  // Map variables
  let mapElement: HTMLElement | null;
  let map: Map;
  let markersLayer: any;

  function removeMarkers() {
    markersLayer && markersLayer.clearLayers();
  }
  
  function toggleCurtain() {
    curtainState.toggle();
  }
  
  function createMarkers() {
    if(allReports && leaflet) {
      
      removeMarkers();
      
      // Get daily reports only
      const dailyReports = allReports.filter(report => {
        return report.date.toDateString() === selectedDate.toDateString();
      });
      console.log('# dailyReports :', dailyReports)

      // Add markers for each report location
      dailyReports.forEach(async (report) => {
        
        // Create a button within the popups to open the curtain
        const button = leaflet.DomUtil.create('button', 'btn-view-report');
        button.innerHTML = 'Open';
        button.addEventListener('click', toggleCurtain);
        
        // Create markers
        const marker = leaflet.marker(
          report.location,
          {
            autoPanPadding: [50, 50],
            icon: leaflet.divIcon({
              className: 'marker',
              html: `
                <img src="${await loadSvg(report.icon)}" alt="icon" />
                <img src="${await loadSvg('marker')}" alt="marker" />
              `,
              iconSize: [36, 36],
              iconAnchor: [18, 18],
              popupAnchor: [0, -10],
            }),
          },
        ).addTo(markersLayer);
        
        if(isMobile) {
          // Create marker popups
          marker.bindPopup(
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
        } else {
          marker.bindPopup(
            leaflet.popup().setContent(`<h3 class="popup-title">${report.title} </h3>`),
            { 
              closeButton: false, 
              maxWidth: 200,
            },
          )
          marker.on('mouseover', function(e) {
            marker.openPopup();
          });
          marker.on('mouseout', function(e) {
            marker.closePopup();
          });
        }
        
        // Get the current map bounds
        const bounds = map.getBounds();
        // Calculate the longitude range of the current view
        const longitudeRange = bounds.getEast() - bounds.getWest();
        // Calculate the desired longitude offset (e.g., 75% of the longitude range)
        const longitudeOffset = 0.75 / longitudeRange;
        // Calculate the new longitude value for the center
        const desktopCenter = [bounds.getCenter().lat, bounds.getWest() + longitudeOffset];
        
        // onClick
        if(isMobile) {
          // Add an event listener to open the popup when the marker is clicked
          marker.on('click', (e) => {
            marker.openPopup();
            reportState.setSelectedReport(report);
            
            // Center the map on the marker
            const latlng = e.latlng;
            const zoom = map.getZoom();
            map.setView([latlng.lat + 1.5, latlng.lng], zoom)
          });
        } else {
          marker.on('click', function(e) {
            // Set the selected report in the store
            reportState.setSelectedReport(report);
            // Center the map on the marker
            const latlng = e.latlng;
            const zoom = map.getZoom();
            map.setView(desktopCenter, zoom)
          })
        }
        
        // Event to clear the selected report when the map is clicked
        // NOTE: Could be improved by detecting if any popup is open but couldn't find a way to do it in a clean way
        map.on('click', function(e) {
          reportState.setSelectedReport(getMainActiveReport());
        });
      });
    } else { // !reports
      console.log('No reports found.');
    }
  }
  
  onMount(async () => {
    if (browser) {
      // Dynamically import leaflet to avoid SSR issues
      leaflet = await import('leaflet');
      
      // Check map element
      mapElement = document.getElementById('map');
      if (!mapElement) {
          console.log('No map element found.');
          return;
      }
      
      // Create map
      const lastReportLocation = getMainActiveReport().location;
      const mapOptions = {
        center: lastReportLocation,
        zoom: 6,
        zoomControl: false,
        locale: 'en'
      }
      map = leaflet.map(mapElement, mapOptions)
      
      markersLayer = leaflet.layerGroup().addTo(map);
      
      // Add zoom control
      leaflet.control.zoom({
          position: 'bottomleft'
      }).addTo(map);
      
      // Load openstreetmap tiles & add to map
      leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png', {
        maxZoom: 16,
        minZoom: 3,
        attribution: '&copy; <a href="https://carto.com/">carto.com</a>'
      }).addTo(map);
      
      // Create markers
      createMarkers(); 

    } else { // !browser
      console.log('Leaflet map only works in browser.');
    }
  });

  onDestroy(async () => {
    // Unsubscribe from dateState store
    unsubscribeDateState();
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
    background-color: var(--primary);
    height: calc(100vh - 46px);
    max-width: 100%;
    position: absolute;
    inset: 0px;
    width: 100vw;
    z-index: 1;
  }
  
	@media (min-width: 600px) {
		#map {
      display: block;
      height: calc(100vh - 250px);
			position: absolute;
      width: 100%;
		}
    #map:after {
      background: linear-gradient(90deg, var(--primary) calc(564px - 120px), rgba(21, 22, 20, 0.8) 564px, rgba(21, 22, 20, 0) calc(564px + 120px), transparent 100%);
      content: "";
      display: block;
      height: 100%;
      pointer-events: none;
      position: absolute;
      top: 0; left: 0;
      width: 100%;
      z-index: 9999;
    }
	}
</style>