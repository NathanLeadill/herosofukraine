<script lang="ts">
	import Curtain from "$components/curtain.svelte";
	import Map from "$components/map.svelte";
	import MapNav from "$components/mapNav.svelte";
	import Report from "$components/report.svelte";
	import ReportsFeed from "$components/reportsFeed.svelte";
	import Sidebar from "$components/sidebar.svelte";
	import { reports } from "$lib/stores";
	import { reportState } from "$lib/stores";
	import { onMount } from "svelte";

	export let data: any;
	let fetchedReports = data.filteredReports;
	for (const item of fetchedReports) {
		reports.addReport(item);
	}
	
	onMount(() => {
		reportState.setSelectedReport(fetchedReports[0]);
	});
</script>

<svelte:head>
	<!-- <title>Heroes of Ukraine - A place to remember fallen heros</title> -->
	<title>Heroiam Slava - News Map</title>
	<meta
		name="description"
		content="Slava Ukraini, Heroiam Slava. Welcome to heroiamslava, and open source project to help record the fallen heroes of Ukraine, lest they be forgotten like wars before current events. The heros of Ukraine deserve recognition, they deserve respect and most of all, I believe it is our duty, as the living member of a free and democratic society, to ensure that the memories of those that died defending freedom, will never be forgotten"
	/>
</svelte:head>
<section>
	<Map />
	<div class="report-container">
		<Report />
	</div>
	<ReportsFeed />
</section>

<div class="mapNav-container">
	<MapNav />
</div>
<Curtain />
<Sidebar />


<style>
	section {
		display: flex;
		flex-direction: column;
		flex: 0.6;
		height: 0;
	}

	.report-container {
		display: none;
	}
	.mapNav-container {
    bottom: 70px;
    left: 0;
		position: absolute;
		right: 0;
		z-index: 1;	
	}

	@media (min-width: 600px) {
		section {
			height: 100vh;
			position: relative;
			flex-direction: row-reverse;
			justify-content: space-between;
			flex: 1;
		}
		.report-container {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 250px);
      left: 0;
      overflow: auto;
      padding-top: calc(100px + 18px);
      padding-left: 48px;
      padding-right: 48px;
      position: absolute;
      width: 564px;
      z-index: 2;
		}
		.mapNav-container {
			display: none;
		}
	}
</style>
