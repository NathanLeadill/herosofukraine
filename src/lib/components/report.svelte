<script lang='ts'>
  import { reportState } from "$lib/stores";
	import type { ReportType } from "$models/report";
	import Icon from "./icon.svelte";
  import { timeSinceUpdate } from "$lib/helpers";
  import { reports } from '$lib/stores';
	import MapNav from "./mapNav.svelte";
  
  // Subscribe to updates in the selectedReport store
  let selectedReport: ReportType | undefined;
  reportState.subscribe(state => {
    selectedReport = state.selectedReport;
  });
  
  // Subscribe to updates in the reports store
  let data: ReportType[] | undefined;
  reports.subscribe((value) => {
    data = value;
  });

  $: console.log('# selectedReport :', selectedReport);

</script>
  
{#if selectedReport}
  <div class="title-container">
    <h2 class="title">
      {selectedReport.title}
    </h2>
    <div class="report-icon">
      <Icon 
        name={selectedReport.icon}
        style="
          height: 100%;
          fill: var(--primary-light);
          position: absolute;
          right: 0;
          top: 0;
          transform: rotate(-20deg);
          width: 50%;
        "
      />
    </div>
  </div>
  <div class="report-info">
    <p class="date">
      {timeSinceUpdate(new Date(selectedReport.date))}
    </p>
    <p class="status">
      {#if selectedReport.status === "active"}
        <span class="label">
          Active
        </span>
        <span class="tooltip">This report is being updated in real time.</span>
        <span class="status-dot"/>
      {:else}
        <span class="label">
          Archived
        </span>
        <span class="tooltip">This report is no longer being updated.</span>
      {/if}
    </p>
  </div>
  <div class="images">
    {#if selectedReport.images}
      <!-- If single image -->
      {#if selectedReport.images.length === 1}
        <img alt="" class="image" src={selectedReport.images[0].url} />
        {#if selectedReport.images[0].caption}
          <span class="caption">
            {selectedReport.images[0].caption}
          </span>
        {/if}
        <!-- If multiple images -->
        {:else if selectedReport.images.length > 1}
          <div class="image-container">
            {#each selectedReport.images as image}
              <img class="image" alt="" src={image.url} />
              {#if image.caption}
                <span class="caption">
                  {image.caption}
                </span>
              {/if}
            {/each}
          </div>
        <!-- If no image -->
        {:else}
        <div class="image-placeholder">
          <img alt="" src="https://via.placeholder.com/150" />  
        </div>
      {/if}
    {/if}
  </div>
  <div class="content">
    {#if selectedReport.description}
      <p 
        class="description"
        class:has-img={selectedReport.images && selectedReport.images.length > 0}
      >
        <span class="first-letter">
          {selectedReport.description.charAt(0)}
        </span>
        {selectedReport.description.slice(1)}
      </p>
    {/if}
  </div>
{/if}

<style>
  .title-container {
    position: relative;
  }
  .title {
    color: var(--secondary);
    font-size: 24px;
    margin: 0;
    position: relative;
    z-index: 1;
  }
  .report-icon {
    inset: 0;
    position: absolute;
    width: 100%;
  }
  
  /* REPORT INFO */
  .report-info {
    display: flex;
    justify-content: space-between;
  }
  .date {
    color: var(--secondary-light);
    font-size: 14px;
    margin: 10px 0;
  }
  .status {
    align-items: center;
    color: var(--secondary-light);
    cursor: help;
    display: flex;
    font-size: 14px;
    margin: 10px 0;
    position: relative;
  }
  .status .label {
    border-bottom: 1px dotted var(--secondary-light);
    border-width: 2px;
    padding: 0 2px;
  }
  .tooltip {
    background-color: #555;
    bottom: 100%;
    border-radius: 6px;
    box-shadow: 0 0 10px var(--primary);
    color: #fff;
    margin-left: -75px;
    opacity: 0;
    padding: 5px;
    position: absolute;
    right: 0;
    text-align: center;
    transition: opacity 0.3s;
    visibility: hidden;
    width: 150px;
    z-index: 99999;
  }
  .status:hover .tooltip {
    opacity: 1;
    visibility: visible;
  }
  .status-dot {
    animation: pulse 1.8s ease infinite;
    background-color: var(--success);
    border-radius: 50%;
    display: inline-block;
    height: 9px;
    margin: 0 8px;
    width: 9px;
  }

  .images {
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;
  }
  .caption {
    background: #000000a9;
    bottom: 0;
    color: var(--secondary-light);
    display: block;
    font-size: 12px;
    position: relative;
    text-align: center;
    width: 100%;
  }
  .content p.has-img {
    margin: 10px 0 0;
  }
  .description {
    font-size: 16px;
    line-height: 1.5;
    padding: 8px 0 0px;
  }
  .first-letter {
    float: left;
    font-size: 48px;
    font-weight: bold;
    line-height: 1;
    margin-right: 8px;
    text-transform: uppercase;
  }
  
  @keyframes pulse {
    0% {
      scale: 0.88;
      box-shadow: 0 0 0 0 #00ce18b3;
    }
    
    70% {
      box-shadow: 0 0 0 8px #00ce1800;
      scale: 1;
    }
    
    100% {
      scale: 0.88;
      box-shadow: 0 0 0 0 #00ce1800;
    }
  }

  @media (min-width: 600px) {
    .title {
      font-size: 28px;
      margin-bottom: 16px;
    }
    .description {
      font-size: 18px;
      margin-bottom: 16px;
    }
    .report-icon {
      overflow: hidden;
    }
    .date {
      color: var(--secondary-light);
      margin-bottom: 16px;
    }
  }
</style>