use Mix.Config

# Configure your database
config :token_auth, TokenAuth.Repo,
  username: "postgres",
  password: "postgres",
  database: "token_auth_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :token_auth, TokenAuthWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Make bcrypt faster in tests
config :bcrypt_elixir, log_rounds: 4
