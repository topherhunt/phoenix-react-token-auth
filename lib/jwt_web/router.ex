defmodule JwtWeb.Router do
  use JwtWeb, :router
  import JwtWeb.AuthPlugs, only: [load_user_from_token: 2]

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

  scope "/", JwtWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/api", JwtWeb, as: :api do
    pipe_through :api

    post "/login", Api.AuthController, :login
    post "/register", Api.AuthController, :register

    get "/users/me", Api.UserController, :me
  end
end
