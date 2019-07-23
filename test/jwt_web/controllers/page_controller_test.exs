defmodule JwtWeb.PageControllerTest do
  use JwtWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "JWT Test"
  end
end
