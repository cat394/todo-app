<script lang="ts">
	import { Check, Trash } from "lucide-svelte";
	import { fly, slide } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { superForm } from 'sveltekit-superforms/client';
	import { todoSchema } from '$lib/validateSchema';

	export let data;

	let creating = false;
	let deleting: number[] = [];

	const { form, errors } = superForm(data.form, {
		validators: todoSchema
	});
</script>

<svelte:options immutable={true} />
<div class="container">
	<div class="form">
		<form 
			method="POST" 
			action="?/create"
			use:enhance={() => {
				creating = true;
				return async ({ update }) => {
					await update();
					creating = false;
				};
			}}
		>
			<label>
				Title:
				<input 
					type="text" 
					name="title" 
					bind:value={$form.title} 
					aria-invalid={$errors.title ? "true" : undefined} 
					required
					disabled={creating}
				/>
			</label>
			<label>
				Description:
				<textarea name="description" bind:value={$form.description} aria-invalid={$errors.description ? "true" : undefined} required />
			</label>
			<button type="submit">Add todo</button>
		</form>
	</div>
	<div class="todos">
		<h1>Todos:</h1>
		<ul>
			{#each data.todos.filter((todo) => !deleting.includes(todo.id)) as todo (todo.id)}
				<li in:fly={{ y: 20 }} out:slide class:completed={todo.completed}>
					<div class="text">
						<b>{todo.title}</b>
						<p>{todo.description}</p>
					</div>
					<div class="buttons">
						<form method="POST" action="?/complete">
							<button type="submit" aria-label="completed">
								<Check />
							</button>
							<input type="hidden" name="id" value={todo.id} />
						</form>
						<form 
							method="POST"
							action="?/delete"
							use:enhance={() => {
								deleting = [...deleting, todo.id];
								return async ({ update }) => {
									await update();
									deleting = deleting.filter((id) => id !== todo.id);
								};
							}}
						>
							<button type="submit" class="secondary" aria-label="delete">
								<Trash />
							</button>
							<input type="hidden" name="id" value={todo.id} />
						</form>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	ul {
		padding: 0;
	}

	textarea {
		resize: vertical;
	}
	.container {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.todos {
		max-height: 100%;
		overflow: auto;
	}

	.todos > ul {
		display: grid;
		gap: var(--size-4);
		padding-inline: var(--size-2);
	}

	.todos > ul > li {
		list-style: none;
		border-radius: var(--radius-1);
		padding: var(--size-3);
		gap: var(--size-3);
		display: grid;
		grid-template-columns: 1fr auto;
		box-shadow: 2px 2px 10px 3px var(--gray-7);
	}
	.buttons {
		display: flex;
		gap: var(--size-3);
	}

	.buttons > form > button {
		border-radius: var(--radius-round);
	}

	.form {
		height: 100%;
		display: flex;
		align-items: center;
	}

	.completed {
		border: 1px solid var(--green-2);
	}
</style>
