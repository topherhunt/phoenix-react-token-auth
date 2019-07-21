defmodule JwtWeb.PageController do
  use JwtWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
