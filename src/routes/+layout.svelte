<script lang="ts">
  import "open-props/style";
  import "@picocss/pico";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
</script>

<div class="layout">
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</div>

<style>
  .layout {
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
  }
</style>