<script lang='ts'>
	import Icon from "./icon.svelte";
  import logoText from "$images/aktualivia-text.png";
  import logoFusioned from "$images/logo-aktualivia-fusioned.png";
</script>

<a class="logo-container" href="/">
  <div class="logo-solo">
    <Icon 
      name="logo-transparent" 
      style="
        height: 38px;
        width: 38px;
      "
    />
  </div>
  <img 
    alt="aktualivia"
    class="logo-fusioned" 
    src={logoFusioned}
  />
</a>

<style global>
  .logo-container {
		align-items: center;
		display: flex;
		font-family: 'Rufina';
		font-weight: 400;
		font-size: 32px;
    justify-content: center;
		margin: 0 auto;
    position: relative;
    text-decoration: none;
    width: 200px;
	}
  .logo-container::after {
    background: var(--secondary);
    border-radius: var(--max-radius);
    content: "alpha";
    font-size: 12px;
    font-weight: 800;
    font-family: Poppins;
    font-weight: 400;
    padding: 0 8px;
    position: absolute;
    right: 0px;
    top: 4px;
  }
  .logo-fusioned {
    padding: 12px 0 8px;
    width: 200px;
  }
  .logo-solo {
    display: none;
  }
  @media (min-width: 600px) {
    .logo-container {
      width: auto;
    }
    .logo-container::after {
      right: 0;
      top: 0;
    }
    .logo-fusioned {
      padding: 8px 0;
      width: calc(260px - 44px);
    }
  }
</style>