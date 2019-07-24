import { connect } from "react-redux"
import {
  SUBREDDIT_SELECTED,
  POSTS_REQUESTED
} from "../../../redux/action_creators"
import RedditView from "./reddit_view.jsx"

// Define what state to provide to the child's props
const mapStateToProps = (state) => ({
  selectedSubredditId: state.ui.selectedSubredditId,
  subreddits: state.data.subreddits
})

// Define what dispatch callbacks to provide to the child's props
const mapDispatchToProps = (dispatch) => ({
  selectSubreddit: (id) => dispatch(SUBREDDIT_SELECTED(id)),
  refreshSubreddit: (id) => dispatch(POSTS_REQUESTED(id))
})

// See https://redux.js.org/basics/usage-with-react
const RedditViewContainer = connect(mapStateToProps, mapDispatchToProps)(RedditView)

export default RedditViewContainer
