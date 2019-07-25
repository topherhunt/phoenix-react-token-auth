# TokenAuth

This is a sample app demonstrating a token-auth-restricted Phoenix API consumed by a simple React SPA.

I experimented with Redux and Thunk for managing state, but I found it added an enormous amount of code complexity & layering for minimal benefit. It seems state is easier to reason about when it's kept local as much as possible. You can check out the Redux spike on the `redux` branch. See also my [Redux cheatsheet](https://github.com/topherhunt/cheatsheets/blob/master/js/redux.md).

---

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
