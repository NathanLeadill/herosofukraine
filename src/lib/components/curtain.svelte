<script lang='ts'>
	import { timeSinceUpdate } from "$lib/helpers";
  import { curtainState, reportState } from "$lib/stores";
	import { reports } from '$lib/objects/dummyData';
	import type { ReportType } from "$models/report";
	import Button from "./button.svelte";
	import Icon from "./icon.svelte";
  
  // Subscribe to updates in the stores states
  let curtainOpen: boolean;
  curtainState.subscribe(state => {
    curtainOpen = state;
  });
  let selectedReport: ReportType | undefined;
  reportState.subscribe(state => {
    selectedReport = state.selectedReport;
  });
  
  // Toggle curtain state
  function toggleCurtain() {
    curtainState.toggle();
  }
  
  // Update the selected report & scroll to top
  function updateReport(report: ReportType) {
    reportState.setSelectedReport(report);
    const scrollableContainer = document.querySelector('.curtain-body');
    if(scrollableContainer){
      // Delay scroll to top to prevent overlapping with the curtain animation
      setTimeout(() => {
        scrollableContainer.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 10);
    }
  }
  
  // Handle keyboard navigation
  function handleKeyDown(event: KeyboardEvent, report: ReportType) {
    if (event.key === 'Enter' || event.key === ' ') {
      updateReport(report);
    }
  }
  
  // Filter out the report that is currently being viewed
  $: excludedReportId = selectedReport?.id;
  $: suggestedReports = Object.keys(reports)
    .filter(key => reports[key].id !== excludedReportId)
    .map(key => reports[key]);
  
</script>

<div 
  class="open-window-btn"
  class:curtainActive={$curtainState}
>
  <Button
    on:click={toggleCurtain}
    style="
      color: var(--primary);
      border-radius: 0px;
      font-weight: 500;
    "
  >
    {#if selectedReport && selectedReport?.type === 'secondary'}
      Open selected
    {:else}
      View Summary
    {/if}
  </Button>
  <div class="curtain">
    <div class="close-btn-container">
      <Button
        invisible
        iconOnly
        noHover
        style="
          align-items: center;
          display: flex;
          height: 38px;
          justify-content: center;
          width: 100%;
        "
        on:click={toggleCurtain}
      >
        <Icon 
          slot="icon" 
          name="chevron-up"
          style="
            fill: var(--accent);
            height: 32px;
            transform: rotate(180deg); 
            width: 32px;
          "
        />
      </Button>
    </div>
    <div class="curtain-body">
      {#if selectedReport}
        <div class="title-container">
          <h2 class="title">
            {selectedReport.title}
          </h2>
          <div class="report-icon">
            <Icon 
              name={selectedReport.icon}
              style="
                height: 175%;
                fill: var(--primary-light);
                position: absolute;
                right: 0;
                width: 50%;
                top: -50%;
                transform: rotate(-20deg);
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
          <p 
            class="description"
            class:has-img={selectedReport.images && selectedReport.images.length > 0}
          >
            <span class="first-letter">
              {selectedReport.description.charAt(0)}
            </span>
            {selectedReport.description.slice(1)}
          </p>
        </div>
        <!-- LIVE FEED -->
        <div class="reports-feed">
          <div class="reports-feed-separator" />
          {#each suggestedReports as report}
            <div 
              class="report-feed-card"
              on:click={() => updateReport(report)}
              on:keydown={event => handleKeyDown(event, report)}
            >
              <div class="background-icon">
                <Icon 
                  name={report.icon}
                  style="
                    fill: var(--primary);
                    flex-shrink: 0;
                    height: 200%;
                    position: absolute;
                    right: 0;
                    top: -50%;
                    transform: rotate(-20deg);
                    width: 50%;
                  "
                />
              </div>
              <div class="top-side">
                <div class="card-title-container">
                  <h4 class="card-title">
                    {report.title}
                  </h4>
                  <Icon 
                    name="link"
                    style="
                      fill: var(--accent);
                      flex-shrink: 0;
                      height: 22px;
                      width: 18px;
                    "
                  />
                </div>
              </div>
              <p class="card-date">
                {timeSinceUpdate(new Date(report.date))}
              </p>
            </div>
          {/each}
        </div>
      {:else}
        <h2>
          Error: No report selected - Please reload the page and contact support if the problem persists.
        </h2>
      {/if}
    </div>
  </div>
</div>

<style>
  .open-window-btn {
		bottom: 0%;
		height: 46px;
    left: 0;
    right: 0;
		position: absolute;
		transition: all .3s ease;
		width: 100%;
		z-index: 4;
	}
	.curtainActive {
		bottom: calc(100% - 121px);
		transition: all .3s ease;
	}
	.curtain {
		background: var(--primary);
		height: 0;
    overflow: hidden;
    position: relative;
		transition-delay: .2s;
	}
	.curtainActive .curtain {
		height: calc(100vh - 121px);
		transition-delay: 0s;
	}
	.close-btn-container {
    background: linear-gradient(to bottom, rgba(21, 22, 20, 1), rgba(21, 22, 20, 0));
		display: flex;
		padding: 4px 0;
		justify-content: center;
    position: absolute;
    opacity: 0.9;
		width: 100%;
    z-index: 9;
	}
	.curtain-body {
    height: calc(100vh - 121px);
    padding: 42px 16px 16px;
    overflow: auto;
	}
  
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
    border-bottom: 1px dotted var(--accent);
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
    z-index: 1;
  }
  .status:hover .tooltip {
    opacity: 1;
    visibility: visible;
  }
  .status-dot {
    animation: pulse 1s ease-in-out infinite alternate;
    background-color: var(--success);
    border-radius: 50%;
    display: inline-block;
    height: 8px;
    margin: 0 8px;
    width: 8px;
  }

  .images {
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }
  .caption {
    background: #000000a9;
    bottom: 0;
    color: var(--secondary-light);
    display: block;
    font-size: 12px;
    position: absolute;
    text-align: center;
    width: 100%;
  }
  .content p.has-img {
    margin: 10px 0;
  }
  .description {
    font-size: 16px;
    line-height: 1.5;
    padding: 8px 0 18px;
  }
  .first-letter {
    float: left;
    font-size: 48px;
    font-weight: bold;
    line-height: 1;
    margin-right: 8px;
    text-transform: uppercase;
  }
  
  /* LIVE FEED */

  .reports-feed {
    border-top: 2px solid var(--primary-light);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 16px;
    padding-top: 24px;
  }
  .reports-feed-separator {
    position: relative;
  }
  .reports-feed-separator:before {
    background: var(--primary);
    color: var(--secondary-light);
    content: "Live Feed";
    font-size: 12px;
    font-weight: 500;
    left: 50%;
    letter-spacing: 1px;
    margin-bottom: 8px;
    padding: 0 8px;
    position: absolute;
    text-transform: uppercase;
    top: -34px;
    transform: translateX(-50%);
  }
  .report-feed-card {
    background-color: var(--primary-light);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    overflow: hidden;
    padding: 16px;
    position: relative;
    margin: 8px 0;
  }
  .background-icon {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  .top-side {
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  
  .card-title-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    width: 100%;
  }
  .card-title {
    color: var(--secondary);
    font-size: 16px;
    margin: 0 8px 0 0;
  }
  
  .card-date {
    color: var(--secondary-light);
    font-size: 12px;
    margin: 0;
    position: relative;
  }

  @keyframes pulse {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.5);
    }
  }
</style>