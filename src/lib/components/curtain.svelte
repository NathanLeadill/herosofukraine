<script lang='ts'>
	import { timeSinceUpdate } from "$lib/helpers";
  import { curtainState, reportState } from "$lib/stores";
	import type { ReportType } from "$models/report";
	import Button from "./button.svelte";
	import Icon from "./icon.svelte";
	import Report from "./report.svelte";
	import ReportsFeed from "./reportsFeed.svelte";
  
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
      <Report />
      <ReportsFeed />
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

	@media screen and (min-width: 600px) {
    .open-window-btn {
      display: none;
    }
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
</style>