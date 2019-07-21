defmodule Jwt.Repo do
  use Ecto.Repo,
    otp_app: :jwt,
    adapter: Ecto.Adapters.Postgres
end
