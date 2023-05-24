<script lang='ts'>
	import { page } from "$app/stores";
	import NavItem from "./NavItem.svelte";
	import Icon from "./icon.svelte";
	import Logo from "./logo.svelte";
  
  let user = false;

  $: iconStyle = `
    fill: var(--secondary-light);
    height: 24px;
    margin-right: 8px;
    width: 24px;
  `;
</script>

<div class="sidebar">
  <div class="topside">
    <Logo />
    <div class="links-container">
      <NavItem pageName="" label="Home" />
      <NavItem comingSoon pageName="stats" label="Stats" />
      <NavItem comingSoon pageName="media" label="Media" />
      <NavItem comingSoon pageName="memorial" label="Memorial" />
    </div>
  </div>
  <div class="sidebar-footer">
    {#if user}
      <a href="#" class="btn">
        <Icon 
          name="user" 
          style={iconStyle}
        />
        <span class="label">Profile</span>
      </a>
      <a href="#" class="btn">
        <Icon 
          name="chevron-up" 
          style={iconStyle}
        />
        <span class="label">Logout</span>
      </a>
    {:else}
      <a href="#" class="btn">
        <Icon 
          name="user" 
          style="
            fill: var(--secondary-light);
            height: 24px;
            margin-right: 10px;
            width: 24px;
          "
        />
        <span class="label">Login</span>
      </a>
      <a href="#" class="btn">
        <Icon 
          name="login" 
          style={iconStyle}
        />
        <span class="label">Sign up</span>
      </a>
    {/if}
  </div>
</div>

<style>
  .sidebar {
    background-color: var(--primary-light);
    box-shadow: 0 0 8px var(--shadow);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 22px;
    width: 260px;
    z-index: 9;
  }
  .links-container {
    border-top: 2px solid var(--secondary-lighter);
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    padding: 24px 0;
  }
  .link {
    align-items: center;
    border-radius: 10px;
    color: var(--secondary-light);
    display: flex;
    font-size: 14px;
    margin-bottom: 12px;
    padding: 10px 16px;
    text-decoration: none;
    transition: all ease .2s;
  }
  .link:hover {
    background: var(--primary-lighter);
    opacity: 0.75;
    transition: all ease .2s;
  }
  .link:focus,
  .link:active {
    opacity: 0.5;
    transition: all ease .2s;
  }
  .active {
    background: var(--primary-lighter);
    box-shadow: 0 2px 4px var(--shadow);
    color: var(--secondary);
  }
  .sidebar-footer {
    background: var(--primary);
    border-radius: 10px;
    box-shadow: 0 4px 6px var(--shadow);
    display: flex;
    flex-direction: row;
    margin-top: 24px;
    padding: 2px;
    justify-content: space-around;
  }
  .btn {
    align-items: center;
    border-radius: 10px;
    color: var(--secondary-light);
    display: flex;
    flex: 1;
    font-size: 14px;
    justify-content: center;
    margin: 4px 0;
    padding: 8px 8px;
    text-decoration: none;
    transition: all ease .2s;
  }
  .btn:hover {
    background: var(--primary-lighter);
    opacity: 0.75;
    transition: all ease .2s;
  }
</style>