<div class="container">
	<div>
		<h1>Welcome to this Todo App!!</h1>
		<p>Please sign in or sign up to use this app.</p>
		<div class="buttons">
			<a href="/sign-up" role="button" class="contrast">Sign up</a>
			<a href="/sign-in" role="button" class="secondary">Sign in</a>
		</div>
	</div>
</div>

<style>
	p {
		text-align: center;
	}
	.container {
		display: grid;
		height: 100%;
		place-items: center;
	}
	.buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--size-3);
	}
</style>
