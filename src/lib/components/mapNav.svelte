<script lang='ts'>
	import { browser } from "$app/environment";
	import { setPreviousOrNextDay, isToday } from "$lib/helpers";
	import { dateState } from "$lib/stores";
	import { onMount } from "svelte";
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
  
  $: isMobile = false;
  onMount(() => {
    isMobile = window.innerWidth < 600;
  })
  
  $: day = (
    // if today display today else display the day of the week
    isToday(selectedDate)
      ? "Today"
      : (
        // if yesterday display yesterday else display the day of the week
        selectedDate.toLocaleDateString("en-US", { weekday: "long" }) ===
        new Date(Date.now() - 86400000).toLocaleDateString("en-US", { weekday: "long" })
          ? "Yesterday"
          : selectedDate.toLocaleDateString("en-US", { weekday: "long" })
      )
  )

  $: buttonsStyle = `
    align-items: center;
    border-radius: var(--max-radius);
    display: flex;
    flex: 1;
    height: 44px;
    padding: 6px 0px;
    ${isMobile ? 'background-color: rgba(21, 22, 20, 0.2);' : 'background-color: transparent;'}
    ${isMobile ? 'backdrop-filter: blur(10px) saturate(180%);' : ''}
    ${isMobile ? 'border: 2px solid var(--primary);' : 'border: none;'}
  `;
  $: leftButtonStyle = `
    ${buttonsStyle}
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    justify-content: start;
  `;
  $: rightButtonStyle = `
    ${buttonsStyle}
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    justify-content: end;
  `;
  
  $: buttonsIconStyle = `
    height: 24px;
    width: 24px; 
    ${isMobile ? 'fill: var(--secondary);' : 'fill: var(--accent);'}
  `
  $: leftButtonIconStyle = `
    ${buttonsIconStyle}
    transform: rotate(-90deg);
  `
  $: rightButtonIconStyle = `
    ${buttonsIconStyle}
    transform: rotate(90deg);
    ${isToday(selectedDate) ? "opacity: 0.5;" : ""}
  `

</script>

<div class="mapNav">
  <Button
      iconOnly
      inline
      on:click={() => handleChangeDay("previous")}
      style={leftButtonStyle}
    >
    <div class="icon" slot="icon">
      <Icon 
        name="chevron-up" 
        style={leftButtonIconStyle}
      />
    </div>
  </Button>
  <div class="date">
    <span class="day">
      {day}
    </span>
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
    style={rightButtonStyle}
  >
    <div class="icon" slot="icon">
      <Icon 
        name="chevron-up" 
        style={rightButtonIconStyle}
      />
    </div>
  </Button>
</div>

<style>
  .mapNav {
    align-items: center;
    display: flex;
    height: 44px;
    justify-content: space-around;
    margin: 10px 18px;
    justify-content: center;
  }
  
  .icon {
    height: 28px;
    width: 28px;
  }
  .date {
    align-items: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .day {
    background-color: var(--primary);
    border-top-left-radius: var(--max-radius);
    border-top-right-radius: var(--max-radius);
    background-color: rgba(21, 22, 20, 0.5);
    backdrop-filter: blur(16px) saturate(180%);
    border: 2px solid var(--primary);
    border-bottom: none;
    
    color: var(--secondary);
    font-size: 16px;
    font-weight: 500;
    min-width: 150px;
    padding: 4px 16px;
    position: absolute;
    text-align: center;
    top: calc(50% - 39px);
    transform: translateY(-50%);
    z-index: 1;
  }
  .date-input {
    background-color: rgba(21, 22, 20, 0.2);
    backdrop-filter: blur(16px) saturate(180%);
    border: 2px solid var(--primary);
    border-left: none;
    border-right: none;
    color: var(--secondary);
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    height: 44px;
    padding: 6px 18px;
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
  
  @media (min-width: 600px) {
    .mapNav {
      height: auto;
      margin: 0 auto;
      position: relative;
      justify-content: space-between;
      width: 100%;
    }
    .date {
      height: 100%;
    }
    .day {
      border-radius: 0;
      background-color: transparent;
      backdrop-filter: none;
      border: none;
      color: var(--secondary);
      font-size: 16px;
      font-weight: 500;
      min-width: 150px;
      padding: 4px 16px;
      position: absolute;
      text-align: center;
      top: calc(50% - 28px);
      transform: translateY(-50%);
      z-index: 1;
    }
    .date-input {
      background: transparent;
      backdrop-filter: none;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      height: auto;
      margin: auto;
      padding: 28px 4px;
      width: 132px;
      z-index: 2;
    }
    .date::before {
      background-color: var(--accent);
      border-radius: 10px;
      bottom: calc(50% - 28px);
      content: "";
      height: 4px;
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
      width: 18px;
    }
    .icon {
      align-items: center;
      display: flex;
    }
  }
</style>