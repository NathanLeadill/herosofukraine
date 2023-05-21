<script lang='ts'>
	import { browser } from "$app/environment";
	import { setPreviousOrNextDay, isToday } from "$lib/helpers";
	import { dateState } from "$lib/stores";
	import Button from "./button.svelte";
	import Icon from "./icon.svelte";
  
  // Subscribe to date state in the store
  let selectedDate = new Date();
  dateState.subscribe((value) => {
    selectedDate = value;
  });
  
  function handleChangeDay(type: "previous" | "next") {
    // If date is today and button is clicked to go to next day, do nothing
    if (isToday(selectedDate) && type === "next") {
      return;
    } else {
      setPreviousOrNextDay(selectedDate, type);
    }
  }
  
  // Style
  const buttonsStyle = `
    border: none;
    background-color: rgba(96, 96, 96, 0.2);
    backdrop-filter: blur(10px) saturate(180%);
    border: 2px solid var(--primary);
    border-radius: 10px;
    padding: 5px 16px;
  `;

</script>

<div class="mapNav">
  <Button
      iconOnly
      inline
      on:click={() => handleChangeDay("previous")}
      style={buttonsStyle}
    >
    <div class="icon" slot="icon">
      <Icon 
        name="chevron-up" 
        style="transform: rotate(-90deg);"
      />
    </div>
  </Button>
  <div class="date">
    <input
      class="date-input"
      type="date"
      value={selectedDate.toISOString().split('T')[0]}  
    />
  </div>
  <Button
    disabled={isToday(selectedDate)}
    iconOnly
    inline
    on:click={() => handleChangeDay('next')}
    style={buttonsStyle}
  >
    <div class="icon" slot="icon">
      <Icon 
        name="chevron-up" 
        style="transform: rotate(90deg);"
      />
    </div>
  </Button>
</div>

<style>
  .mapNav {
    align-items: center;
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    position: relative;
    z-index: 1;
  }
  @media (min-width: 600px) {
    .mapNav {
      position: absolute;
      right: 0;  
      top: 100px;
    }
  }

  .icon {
    height: 28px;
    width: 28px;
  }
  .date-input {
    background-color: rgba(96, 96, 96, 0.2);
    backdrop-filter: blur(10px) saturate(180%);
    border: 2px solid var(--primary);
    border-radius: 10px;
    color: var(--secondary);
    font-size: 16px;
    font-weight: 500;
    padding: 6px 18px;
    cursor: pointer;
    text-align: center;
    transition: al ease .3s;
    outline: 2px solid transparent;
    width: 100%;
  }
  .date-input:active,
  .date-input:focus {
    outline: 2px solid var(--accent);
    transition: all ease .3s;
  }
</style>