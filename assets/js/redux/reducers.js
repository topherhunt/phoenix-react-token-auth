// My Redux state schema:
// - UI related state goes under :ui.
// - State of each pending or completed api request goes under :requests.
//   (Each request is an object with a :state key plus optional other keys.)
// - Data (esp. data received from api requests) goes under :data.
// - Beyond those divisions, minimize nesting.

const rootReducer = (state = {}, action) => {
  return {
    ui: uiReducer(state.ui, action),
    data: dataReducer(state.data, action),
    requests: requestsReducer(state.requests, action)
  }
}

//
// UI reducers
//

const uiReducer = (ui = {}, action) => {
  return {
    currentView: currentViewReducer(ui.currentView, action),
    selectedSubredditId: selectedSubredditIdReducer(ui.selectedSubredditId, action)
  }
}

const currentViewReducer = (currentView = "home", action) => {
  switch (action.type) {
    case "VIEW_SELECTED": return action.view
    case "LOGOUT_CLICKED": return "home"
    default: return currentView
  }
}

const selectedSubredditIdReducer = (subredditId = "reactjs", action) => {
  switch (action.type) {
    case "SUBREDDIT_SELECTED": return action.subredditId
    default: return subredditId
  }
}

//
// Data reducers
//

const dataReducer = (data = {}, action) => {
  return {
    authedUser: authedUserReducer(data.authedUser, action),
    subreddits: subredditsReducer(data.subreddits, action)
  }
}

const authedUserReducer = (user = null, action) => {
  switch (action.type) {
    case "REGISTER_REQUEST_SUCCESS":
      return {email: action.email}
    case "LOGIN_REQUEST_SUCCESS":
      return {email: action.email}
    case "PROFILE_REQUEST_SUCCESS":
      return {...user, profile: action.profile}
    case "LOGOUT_CLICKED":
      return null
    default:
      return user
  }
}

const subredditsReducer = (subreddits = {}, action) => {
  let id = action.subredditId // (if relevant to this action type)
  switch (action.type) {
    case "POSTS_REQUEST_STARTED":
    case "POSTS_REQUEST_SUCCESS":
    case "POSTS_REQUEST_FAILURE":
      return {...subreddits, [id]: subredditReducer(subreddits[id], action)}
    default:
      return subreddits
  }
}

const subredditReducer = (subreddit, action) => {
  switch (action.type) {
    case "POSTS_REQUEST_STARTED":
      return {postsRequest: "started"}
    case "POSTS_REQUEST_SUCCESS":
      return {postsRequest: "success", posts: action.posts, updatedAt: action.receivedAt}
    case "POSTS_REQUEST_FAILURE":
      return {postsRequest: "failure", posts: null}
    default:
      throw(`Unexpected action type ${action.type} in subredditReducer!`)
  }
}

//
// Request reducers
//

const requestsReducer = (requests = {}, action) => {
  return {
    register: registerRequestReducer(requests.register, action),
    login: loginRequestReducer(requests.login, action),
    profile: profileRequestReducer(requests.profile, action)
    // Subreddit posts requests are stored under "data" instead of "requests".
  }
}

const registerRequestReducer = (request = null, action) => {
  switch (action.type) {
    case "REGISTER_REQUEST_STARTED": return {status: "started"}
    case "REGISTER_REQUEST_SUCCESS": return {status: "success"}
    case "REGISTER_REQUEST_FAILURE": return {status: "failure", message: action.message}
    default: return request
  }
}

const loginRequestReducer = (request = null, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST_STARTED": return {status: "started"}
    case "LOGIN_REQUEST_SUCCESS": return {status: "success"}
    case "LOGIN_REQUEST_FAILURE": return {status: "failure", message: action.message}
    default: return request
  }
}

const profileRequestReducer = (request = null, action) => {
  switch (action.type) {
    case "PROFILE_REQUEST_STARTED": return {status: "started"}
    case "PROFILE_REQUEST_SUCCESS": return {status: "success"}
    case "PROFILE_REQUEST_FAILURE": return {status: "failure", message: action.message}
    default: return request
  }
}



export { rootReducer }
