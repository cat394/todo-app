<script lang="ts">
  import { page } from '$app/stores';
</script>

<header>
  <b>Todo App</b>
  <a href="/sign-out" role="button" class="outline">Sign-out</a>
</header>

<style>
  header {
    text-align: center;
    padding-block: var(--size-4);
    display: flex;
    justify-content: space-between;
    padding-inline: var(--size-5);
  }
</style>