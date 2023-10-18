<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { newUserSchema } from '$lib/validateSchema';
	export let data;

	const { form, errors, enhance } = superForm(data.form, {
		validators: newUserSchema
	});
</script>

<div class="container">
	<h1>Sign up</h1>
	<form method="POST" use:enhance>
		<label>
			User name
			<input type="text" name="name" bind:value={$form.name} aria-invalid={$errors.password ? "true" : undefined} required />
			{#if $errors.name}
				<small>{$errors.name}</small>
			{/if}
		</label>
		<label>
			Email
			<input type="email" name="email" bind:value={$form.email} aria-invalid={$errors.password ? "true" : undefined} required />
			{#if $errors.email}
				<small>{$errors.email}</small>
			{/if}
		</label>
		<label>
			Password:
			<input type="password" name="password" bind:value={$form.password} aria-invalid={$errors.password ? "true" : undefined} required />
			{#if $errors.password}
				<small>{$errors.password}</small>
			{/if}
		</label>
		<button type="submit">Sign up</button>
	</form>
	<a href="/sign-in" role="button" class="outline">Sign in</a>
</div>

<style>
	.container {
		display: grid;
		place-items: center;
	}
</style>
