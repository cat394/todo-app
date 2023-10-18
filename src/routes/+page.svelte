<div class="container">
  <div>
    <h1>Welcome to this website!</h1>
    <p>Please sign in or sign up to use the todo app.</p>
    <div class="buttons">
      <a href="/sign-up" role="button">Create new account</a>
      <a href="/sign-in" role="button">Sign in</a>    
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
    display: flex;
    justify-content: center;
    gap: var(--size-3);
  }
</style>