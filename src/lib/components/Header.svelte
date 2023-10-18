<script lang="ts">
	import { page } from '$app/stores';
</script>

<header>
	<b><a href="/">Todo App</a></b>
	{#if $page.url.pathname.startsWith('/todos')}
		<a href="/sign-out" role="button" class="outline">Sign-out</a>
	{/if}
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
