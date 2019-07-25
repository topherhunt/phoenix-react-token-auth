defmodule TokenAuthWeb.Router do
  use TokenAuthWeb, :router
  import TokenAuthWeb.AuthPlugs, only: [load_user_from_token: 2]

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :load_user_from_token
  end

  scope "/", TokenAuthWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/api", TokenAuthWeb, as: :api do
    pipe_through :api

    post "/login", Api.AuthController, :login
    post "/register", Api.AuthController, :register

    get "/users/me", Api.UserController, :me
  end
end
