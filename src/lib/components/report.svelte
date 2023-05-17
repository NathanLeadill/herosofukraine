<script lang='ts'>
  import { reportState } from "$lib/stores";
	import type { ReportType } from "$models/report";
	import Icon from "./icon.svelte";
  import { timeSinceUpdate } from "$lib/helpers";

  let selectedReport: ReportType | undefined;
  reportState.subscribe(state => {
    selectedReport = state.selectedReport;
  });
</script>

{#if selectedReport}
  <div class="report-container">
    <div class="report-icon">
      <Icon 
        name={selectedReport.icon}
        style="
          bottom: -148px;
          height: 190px;
          fill: var(--primary-light);
          position: absolute;
          left: 16px;
          opacity: 0.75;
          width: 190px;
          transform: rotate(-20deg);
          z-index: -1;
        "
      />
    </div>
    <h1 class="title">
      {selectedReport?.title}
    </h1>
    <p class="date">
      {timeSinceUpdate(new Date(selectedReport.date))}
    </p>
    <div class="description-container">
      <p class="description">
        {selectedReport?.description}
      </p>
    </div>
  </div>
{/if}

<style>
  .report-container {
    display: none;
  }
  @media (min-width: 600px) {
    .report-container {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 250px);
      left: 0;
      max-width: 40%;
      padding-top: calc(100px + 18px);
      padding-left: 48px;
      position: absolute;
      z-index: 2;
    }
    .description-container {
      max-height: calc(100% - 50px);
      overflow: auto;
    }
    .title {
      font-size: 28px;
      margin-bottom: 16px;
    }
    .description {
      font-size: 18px;
      margin-bottom: 16px;
    }
    .report-icon {
      position: relative;
    }
    .date {
      color: var(--secondary-light);
      margin-bottom: 16px;
    }
  }
</style>