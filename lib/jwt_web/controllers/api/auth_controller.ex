defmodule JwtWeb.Api.AuthController do
  use JwtWeb, :controller
  alias Jwt.Accounts

  def login(conn, %{"email" => email, "password" => password}) do
    case Accounts.authenticate_user(email, password) do
      {:ok, user} ->
        token = Accounts.new_token_for_user(user)
        json(conn, %{"token" => token})

      {:error, reason} ->
        conn
        |> put_status(401)
        |> json(%{"error" => reason})
    end
  end

  def register(conn, %{"user" => user_params}) do
    case Accounts.insert_user(user_params) do
      {:ok, user} ->
        token = Accounts.new_token_for_user(user)
        json(conn, %{"ok" => true, "token" => token})

      {:error, changeset} ->
        conn
        |> put_status(422)
        |> json(%{"errors" => summarize_errors(changeset)})
    end
  end

  #
  # Helpers
  #

  defp summarize_errors(changeset) do
    Enum.map(changeset.errors, fn({field, {msg, _}}) -> "#{field} #{msg}" end)
  end
end
