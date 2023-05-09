<script lang='ts'>
	import { browser } from "$app/environment";
	import Button from "./button.svelte";
	import Icon from "./icon.svelte";
  
  // Style
  const buttonsStyle = `
    border: none;
    background: var(--primary-light);
    border-radius: 10px;
    padding: 5px 16px;
  `
  
  // Format date
  const dateFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
	const formatter = new Intl.DateTimeFormat('en-US', dateFormatOptions);

</script>

<div class="mapNav">
  <Button
    disabled
    iconOnly
    inline
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
      value={new Date().toISOString().substring(0, 10)}
    />
  </div>
  <Button
    iconOnly
    inline
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
    margin-top: 8px;
    position: relative;
    z-index: 1;
  }
  .icon {
    height: 28px;
    width: 28px;
  }
  .date-input {
    background: var(--primary-light);
    border: none;
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