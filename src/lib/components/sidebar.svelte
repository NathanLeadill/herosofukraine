<script lang='ts'>
	import { page } from "$app/stores";
  import logo from "$images/logo-y.png";
	import Icon from "./icon.svelte";
  
</script>

<div class="sidebar">
  <a class="logo-container" href="/">
		Heroiam
		<img class="logo" src={logo} alt="logo" /> Slava
	</a>
  <div class="links-container">
    <a href="#" class="link" class:active={$page.url.pathname === "/"}>
      <Icon 
        name="globe" 
        style="
          {$page.url.pathname === "/" ? "fill: var(--secondary);" : "fill: var(--secondary-light);"}
          height: 24px;
          margin-right: 12px;
          width: 24px;
        "
      />
      <span class="label">Home</span>
    </a>
    <a href="#" class="link" class:active={$page.url.pathname === "/media"}>
      <Icon 
        name="image" 
        style="
          {$page.url.pathname === "/media" ? "fill: var(--secondary);" : "fill: var(--secondary-light);"}
          height: 24px;
          margin-right: 12px;
          width: 24px;
        "
      />
      <span class="label">Media</span>
    </a>
    <a href="#" class="link" class:active={$page.url.pathname === "/memorial"}>
      <Icon 
        name="rose" 
        style="
          {$page.url.pathname === "/memorial" ? "fill: var(--secondary);" : "fill: var(--secondary-light);"}
          height: 24px;
          margin-right: 12px;
          width: 24px;
        "
      />
      <span class="label">Memorial</span>
    </a>
  </div>
</div>

<style>
  .sidebar {
    background-color: var(--primary-light);
    padding: 18px;
    width: 280px;
  }
  .logo-container {
		align-items: center;
		color: var(--dark);
		display: flex;
		font-family: 'Rufina';
		font-weight: 400;
		font-size: 28px;
		margin: 0 auto;
		text-decoration: none;
	}
  .logo {
		display: inline;
		height: 42px;
		margin: 0 10px;
		width: 42px;
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
    font-size: 16px;
    margin-bottom: 12px;
    padding: 8px 16px;
    text-decoration: none;
    transition: all ease .2s;
  }
  .link:hover {
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
    color: var(--secondary);
  }
</style>