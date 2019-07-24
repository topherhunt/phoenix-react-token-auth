import { makeApiRequest } from "../api"

// Gratuitous pass-through function for readability
const Thunk = (theFunction) => theFunction

//
// Action creator functions
//
// My mental model for action creators & thunks:
// * Each action type must describe some real-world event that we must respond to.
// * Name each creator the same as the action it creates.
// * Thunks (async actions) will normally dispatch an immediate action named the same
//   as the thunk name. But there will be exceptions to this.
// * I don't define action type constants because I think it makes names too awkward.
//   Tests covering each action dispatch should give me the same safety as type constants.
//

export const VIEW_SELECTED = (view) => {
  return {type: "VIEW_SELECTED", view: view}
}

export const REGISTER_FORM_SUBMITTED = ({email, password}) => {
  return Thunk((dispatch) => {
    dispatch(REGISTER_REQUEST_STARTED())
    makeApiRequest("POST", "/api/register", {user: {email, password}})
      .then((json) => {
        if (json.ok) {
          localStorage.setItem("authToken", json.token)
          localStorage.setItem("authedEmail", email)
          dispatch(REGISTER_REQUEST_SUCCESS(email))
        } else {
          dispatch(REGISTER_REQUEST_FAILURE(json.message))
        }
      })
      .catch((error) => {
        dispatch(REGISTER_REQUEST_FAILURE("There was an error on the server."))
      })
  })
}

export const REGISTER_REQUEST_STARTED = () => {
  return {type: "REGISTER_REQUEST_STARTED"}
}

export const REGISTER_REQUEST_SUCCESS = (email) => {
  return {type: "REGISTER_REQUEST_SUCCESS", email}
}

export const REGISTER_REQUEST_FAILURE = (message) => {
  return {type: "REGISTER_REQUEST_FAILURE", message}
}

export const LOGIN_FORM_SUBMITTED = ({email, password}) => {
  return Thunk((dispatch) => {
    dispatch(LOGIN_REQUEST_STARTED())
    makeApiRequest("POST", "/api/login", {email, password})
      .then((json) => {
        if (json.ok) {
          localStorage.setItem("authToken", json.token)
          localStorage.setItem("authedEmail", email)
          dispatch(LOGIN_REQUEST_SUCCESS(email))
        } else if (json.message) {
          dispatch(LOGIN_REQUEST_FAILURE(json.message))
        } else {
          dispatch(LOGIN_REQUEST_FAILURE("There was an error on the server."))
        }
      })
      .catch((error) => {
        dispatch(LOGIN_REQUEST_FAILURE(error))
      })
  })
}

export const LOGIN_REQUEST_STARTED = () => {
  return {type: "LOGIN_REQUEST_STARTED"}
}

export const LOGIN_REQUEST_SUCCESS = (email) => {
  return {type: "LOGIN_REQUEST_SUCCESS", email}
}

export const LOGIN_REQUEST_FAILURE = (message) => {
  return {type: "LOGIN_REQUEST_FAILURE", message}
}

export const LOGOUT_CLICKED = () => {
  return Thunk((dispatch) => {
    localStorage.removeItem("authToken")
    dispatch({type: "LOGOUT_CLICKED"})
  })
}

export const PROFILE_DATA_REQUESTED = () => {
  return Thunk((dispatch) => {
    dispatch(PROFILE_REQUEST_STARTED())
    makeApiRequest("GET", "/api/users/me")
      .then((data) => {
        dispatch(PROFILE_REQUEST_SUCCESS(data))
      })
      .catch((error) => {
        dispatch(PROFILE_REQUEST_FAILURE(error))
      })
  })
}

export const PROFILE_REQUEST_STARTED = () => {
  return {type: "PROFILE_REQUEST_STARTED"}
}

export const PROFILE_REQUEST_SUCCESS = (profile) => {
  return {type: "PROFILE_REQUEST_SUCCESS", profile: profile}
}

export const PROFILE_REQUEST_FAILURE = (message) => {
  return {type: "PROFILE_REQUEST_FAILURE", message}
}

export const SUBREDDIT_SELECTED = (subredditId) => {
  return Thunk((dispatch, getState) => {
    dispatch({type: "SUBREDDIT_SELECTED", subredditId})

    let subreddit = getState().data.subreddits[subredditId]
    if (!subreddit || !subreddit.posts) {
      dispatch(POSTS_REQUESTED(subredditId))
    }
  })
}

export const POSTS_REQUESTED = (subredditId) => {
  return Thunk((dispatch) => {
    dispatch(POSTS_REQUEST_STARTED(subredditId))
    fetch(`https://www.reddit.com/r/${subredditId}.json`)
      .then((response) => {
        if (!response.ok) throw(`Got bad response code: ${response.status}`)
        return response.json()
      })
      .then((json) => {
        dispatch(POSTS_REQUEST_SUCCESS(subredditId, json))
      })
      .catch((error) => {
        dispatch(POSTS_REQUEST_FAILURE(subredditId, error))
      })
  })
}

export const POSTS_REQUEST_STARTED = (subredditId) => {
  return {type: "POSTS_REQUEST_STARTED", subredditId}
}

export const POSTS_REQUEST_SUCCESS = (subredditId, json) => {
  return {
    type: "POSTS_REQUEST_SUCCESS",
    subredditId: subredditId,
    posts: json.data.children.map((child) => child.data),
    receivedAt: Date.now()
  }
}

export const POSTS_REQUEST_FAILURE = (subredditId, error) => {
  return {type: "POSTS_REQUEST_FAILURE", subredditId, error}
}
