defmodule JwtWeb.Api.UserController do
  use JwtWeb, :controller

  plug :require_user

  def me(conn, _params) do
    user = conn.assigns.current_user
    json(conn, %{ok: true, email: user.email, inserted_at: user.inserted_at})
  end
end
