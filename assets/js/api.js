// Helper for making requests to my api.
// Note that it uses `fetch`, decodes the json for you, and will throw on 5** responses.
export const makeApiRequest = (method, path, json) => {
  let token = localStorage.getItem("authToken")
  let headers = new Headers()
  headers.append("Content-Type", "application/json") // tell the api to parse the json body
  if (token) headers.append("Authorization", "Bearer "+token)

  let opts = {method: method, headers: headers}
  if (json) opts.body = JSON.stringify(json)

  return fetch(path, opts)
    .then((response) => {
      if (response.status && response.status < 500) {
        return response.json()
      } else {
        throw(`Got error response: ${response.status}`)
      }
    })
}
