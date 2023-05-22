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
		text-decoration: none;
	}
  .logo-fusioned {
    padding: 12px 0;
    width: calc(100% - 44px - 72px);
  }
  .logo-solo {
    display: none;
  }
  @media (min-width: 600px) {
    .logo-container {
      
    }
    .logo-fusioned {
      width: calc(270px - 44px);
    }
  }
</style>