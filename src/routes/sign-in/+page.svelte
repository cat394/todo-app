<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { signInUserSchema } from '$lib/validateSchema';

	export let data;

	const { form, errors, enhance } = superForm(data.form, {
		validators: signInUserSchema
	});
</script>

<div class="container">
	<h1>Sign in</h1>
	<form method="POST" use:enhance>
		<label>
			Email
			<input type="email" name="email" bind:value={$form.email} aria-invalid={$errors.email ? "true" : undefined} required />
			{#if $errors.email}
				<small>{$errors.email}</small>
			{/if}
		</label>
		<label>
			Password
			<input type="password" name="password" bind:value={$form.password} aria-invalid={$errors.password ? "true" : undefined} required />
			{#if $errors.password}
				<small>{$errors.password}</small>
			{/if}
		</label>
		<button type="submit">Sign in</button>
	</form>
	<a href="/sign-up" role="button" class="outline">Sign up</a>
</div>

<style>
	.container {
		display: grid;
		place-items: center;
	}
</style>
