<div class="container">
  <form method="POST">
    <label>
        Your email:<input type="email" name="email">
    </label>
    <label>
      Setting password:<input type="password" name="password">
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