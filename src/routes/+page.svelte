<script lang="ts">
	import Curtain from "$components/curtain.svelte";
	import Map from "$components/map.svelte";
	import MapNav from "$components/mapNav.svelte";
	import Report from "$components/report.svelte";
	import Sidebar from "$components/sidebar.svelte";

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
	<!-- <div class="content-container">
		<h1 class="title">Live AI-powered News.</h1>
	</div> -->
	<!-- <p class="intro">
		Welcome to <i>heroiamslava.co.uk</i>, a project created by Nathan (also known as Ok-Ranger). Our
		aim is to provide a lasting tribute to the brave Ukrainian soldiers who have lost their lives in
		the conflict. We understand that the current way of sharing news of these fallen heroes on
		platforms like Reddit and Telegram can result in their stories being lost or forgotten amidst
		the constant stream of other posts.
		<br />
		To combat this, our platform uses AI and specialized bots to scrape through these channels for relevant
		information. In cases where there isn't enough information available, we manually search for additional
		details to ensure that every soldier's story is properly documented. Our mission is to provide a
		space where these soldiers can be remembered and honored for their bravery and sacrifice.
		<br />
		We believe that it's important to pay tribute to those who have fought and died in defense of their
		country, and to ensure that their memory lives on. By providing a centralized platform for sharing
		information and stories, we hope to create a lasting record of these heroic individuals.
		<br />
		Thank you for visiting heroiamslava.co.uk, and we hope that you find it a meaningful and valuable
		resource for remembering and honoring the fallen soldiers of Ukraine.
		<br />
		We are considering adding a section of this website dedicated to innocent Ukrainian civilians who
		have lost their lives in the conflict. If you have any thoughts or suggestions on this, please contact
		me on Reddit
	</p> -->
	<Map />
	<Report />
</section>

<MapNav />
<Curtain />
<Sidebar />


<style>
	section {
		display: flex;
		flex-direction: column;
		flex: 0.6;
		height: 0;
	}
	@media (min-width: 600px) {
		section {
			position: relative;
			flex-direction: row-reverse;
			justify-content: space-between;
			flex: 1;
		}
	}
</style>
