<script lang='ts'>
	import { timeSinceUpdate } from "$lib/helpers";
	import { reports } from "$lib/objects/dummyData";
	import { reportState } from "$lib/stores";
	import type { ReportType } from "$models/report";
	import Icon from "./icon.svelte";
  
  let selectedReport: ReportType | undefined;
  reportState.subscribe(state => {
    selectedReport = state.selectedReport;
  });
  
  // Filter out the report that is currently being viewed
  $: excludedReportId = selectedReport?.id;
  $: suggestedReports = Object.keys(reports)
    .filter(key => reports[key].id !== excludedReportId)
    .map(key => reports[key]);

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
</script>

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
            opacity: 0.6;
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

<style>
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

  @media (min-width: 600px) {
    .reports-feed {
      bottom: 0;
      flex-direction: row;
      flex-wrap: wrap;
      height: 250px;
      justify-content: space-between;
      margin-top: 0;
      padding: 16px 48px;
      position: absolute;
    }
    .reports-feed-separator {
      display: none;
    }
    .reports-feed-separator:before {
      left: 0;
      top: -16px;
      transform: none;
    }
    .report-feed-card {
      margin: 16px 0;
      width: calc(25% - 16px);
    }
  }

</style>