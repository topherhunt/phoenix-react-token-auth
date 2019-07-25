defmodule TokenAuthWeb.PageController do
  use TokenAuthWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
