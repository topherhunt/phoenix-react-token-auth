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

export const SUBREDDIT_SELECTED = (subredditId) => {
  return Thunk((dispatch, getState) => {
    dispatch({type: "SUBREDDIT_SELECTED", subredditId})

    let subreddit = getState().dataBySubreddit[subredditId]
    if (!subreddit || !subreddit.posts) {
      helpers.fetchPostsThenUpdateState(dispatch, subredditId)
    }
  })
}

export const SUBREDDIT_REFRESH_REQUESTED = (subredditId) => {
  return Thunk((dispatch) => {
    helpers.fetchPostsThenUpdateState(dispatch, subredditId)
  })
}

export const FETCH_POSTS_STARTED = (subredditId) => {
  return {type: "FETCH_POSTS_STARTED", subredditId}
}

export const FETCH_POSTS_SUCCESS = (subredditId, json) => {
  return {
    type: "FETCH_POSTS_SUCCESS",
    subredditId: subredditId,
    posts: json.data.children.map((child) => child.data),
    receivedAt: Date.now()
  }
}

export const FETCH_POSTS_FAILURE = (subredditId, error) => {
  return {type: "FETCH_POSTS_FAILURE", subredditId, error}
}

//
// Private helpers for fetching data etc.
//

let helpers = {
  fetchPostsThenUpdateState: (dispatch, subredditId) => {
    dispatch(FETCH_POSTS_STARTED(subredditId))
    fetch(`https://www.reddit.com/r/${subredditId}.json`)
      .then((response) => {
        if (!response.ok) throw(`Got bad response code: ${response.status}`)
        return response.json()
      })
      .then((json) => {
        dispatch(FETCH_POSTS_SUCCESS(subredditId, json))
      })
      .catch((error) => {
        dispatch(FETCH_POSTS_FAILURE(subredditId, error))
      })
  }
}
