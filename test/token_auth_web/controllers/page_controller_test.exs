defmodule TokenAuthWeb.PageControllerTest do
  use TokenAuthWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "JWT Test"
  end
end
