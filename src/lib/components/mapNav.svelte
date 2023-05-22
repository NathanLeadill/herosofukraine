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
    border-radius: var(--max-radius);
    display: flex;
    flex: 1;
    height: 44px;
    padding: 6px 10px;
  `;
  
  const leftButtonStyle = `
    ${buttonsStyle}
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    justify-content: start;
  `;
  const rightButtonStyle = `
    ${buttonsStyle}
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    justify-content: end;
  `;

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
    style={rightButtonStyle}
  >
    <div class="icon" slot="icon">
      <Icon 
        name="chevron-up" 
        style={`
          transform: rotate(90deg);
          ${isToday(selectedDate) ? "opacity: 0.25;" : ""}
        `}
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
  @media (min-width: 600px) {
    .mapNav {
      margin: 0 auto;
      justify-content: initial;
    }
  }
  
  .icon {
    height: 28px;
    width: 28px;
  }
  .date {
    flex: 1;
  }
  .date-input {
    background-color: rgba(96, 96, 96, 0.2);
    backdrop-filter: blur(10px) saturate(180%);
    border: 2px solid var(--primary);
    border-left: none;
    border-right: none;
    color: var(--secondary);
    font-size: 16px;
    font-weight: 500;
    height: 44px;
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