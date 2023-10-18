<script>
	export let data;
</script>

<div class="container">
	<div class="layout">
		<div class="form">
			<form method="POST" action="?/create">
				<label>
					Title: <input type="text" name="title" required />
				</label>
				<label>
					Description: <textarea name="description" />
				</label>
				<button type="submit">Add todo</button>
			</form>
		</div>
		<div class="todos">
			<h1>Todos：</h1>
			<ul>
				{#each data.todos as todo (todo.id)}
					<li>
						<div class="text">
							<b>{todo.title}</b>
							<p>{todo.description}</p>
						</div>
						<div class="buttons">
							<form method="POST" action="?/complete">
								<button type="submit">Completed</button>
								<input type="hidden" name="id" value={todo.id} />
							</form>
							<form method="POST" action="?/delete">
								<button type="submit">Delete</button>
								<input type="hidden" name="id" value={todo.id} />
							</form>
						</div>
					</li>
				{/each}
			</ul>
		</div>
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
	}

	textarea {
		resize: vertical;
	}
	.container {
		height: 100%;
		margin-inline: var(--size-8);
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
