<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { todoSchema } from '$lib/validateSchema';

	export let data;

	const { form, errors } = superForm(data.form, {
		validators: todoSchema
	});
</script>

<div class="container">
	<div class="form">
		<form method="POST" action="?/create">
			<label>
				Title:
				<input type="text" name="title" bind:value={$form.title} aria-invalid={$errors.title ? "true" : undefined} required />
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
			{#each data.todos as todo (todo.id)}
				<li>
					<div class="text">
						<b>{todo.title}</b>
						<p>{todo.description}</p>
					</div>
					<div class="buttons">
						<form method="POST" action="?/complete">
							<button type="submit" class="outline">Completed</button>
							<input type="hidden" name="id" value={todo.id} />
						</form>
						<form method="POST" action="?/delete">
							<button type="submit" class="secondary">Delete</button>
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
	li {
		list-style: none;
		border: 2px solid var(--gray-3);
		border-radius: var(--radius-1);
		padding: var(--size-3);
		display: flex;
		gap: var(--size-3);
	}

	textarea {
		resize: vertical;
	}
	.container {
		height: 100%;
		margin-inline: var(--size-8);
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
	}

	.todos > ul > li {
		display: grid;
		grid-template-columns: 1fr auto;
	}
	.buttons {
		display: flex;
		gap: var(--size-3);
	}

	.form {
		height: 100%;
		display: flex;
		align-items: center;
	}
</style>
