<div class="container">
  <form method="POST">
    <label>
      Your first name:
      <input type="text" name="first_name">
    </label>
    <label>
      Your last name:
      <input type="text" name="last_name">
    </label>
    <label>
       Your email:
      <input type="email" name="email">
    </label>
    <label>
      Setting password:
      <input type="password" name="password">
    </label>
    <button type="submit">Create account</button>
  </form>
  <a href="/sign-in" role="button" class="outline">Sign in</a>
</div>

<style>
  .container {
    display: grid;
    place-items: center;
  }
</style>