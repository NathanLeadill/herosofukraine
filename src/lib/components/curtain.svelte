<script lang='ts'>
	import { curtainState } from "$lib/stores";
	import Button from "./button.svelte";
	import Icon from "./icon.svelte";
  
  // Subscribe to updates in the store's state
  let curtainOpen;
  curtainState.subscribe(value => {
    curtainOpen = value;
  });
  
  function toggleCurtain() {
    curtainState.toggle();
  }

  $: console.log('# curtainOpen :', curtainOpen)

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
    View News
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
            height: 32px;
            transform: rotate(180deg); 
            width: 32px;
          "
        />
      </Button>
    </div>
    <div class="add-leave-body">
      <h2>
        Ukraine war continues into another day with no resolution in sight
      </h2>
      <div class="content">
        <p>
          International efforts to broker a lasting peace agreement have so far been unsuccessful. The United States and European Union have imposed sanctions on Russia over its involvement in the conflict, while Ukraine has sought to strengthen its military capabilities with support from NATO.
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  /* .container {
    background: var(--primary);
    border-radius: 10px 10px 0 0;
    bottom: 0;
    box-shadow: 0 0 10px var(--primary);
    color: var(--secondary);
    left: 0;
    padding: 0 36px;
    position: fixed;
    right: 0;
    width: 100%;
    z-index: 2;
  }
  .opener {
    justify-content: center;
    display: flex;
    width: 100%;
  }
  .icon {
    height: 26px;
    width: 26px;
  } */
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
		transition-delay: .2s;
	}
	.curtainActive .curtain {
		height: calc(100vh - 121px);
		transition-delay: 0s;
	}
	.close-btn-container {
		display: flex;
		padding: 4px 0;
		justify-content: center;
		width: 100%;
	}
	.add-leave-body {
		padding: 16px;
	}

  .content {
    padding: 16px 0;
  }
</style>