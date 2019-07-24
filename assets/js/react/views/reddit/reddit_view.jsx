import React from "react"
import PropTypes from "prop-types"

class RedditView extends React.Component {
  componentDidMount() {
    this.props.refreshSubreddit(this.props.selectedSubredditId)
  }

  render() {
    return <div>
      <h3>Explore Reddit posts</h3>
      <div>
        Available subreddits:

        {this.renderSubredditLink("funny")}
        {this.renderSubredditLink("politics")}
        {this.renderSubredditLink("reactjs")}
        {this.renderSubredditLink("gaming")}
        {this.renderSubredditLink("movies")}
        {this.renderSubredditLink("science")}
        {this.renderSubredditLink("vive")}
      </div>

      <div style={{borderTop: "1px solid #ddd", paddingTop: "1em", marginTop: "1em"}}>
        {this.renderThisSubreddit()}
      </div>
    </div>
  }

  renderSubredditLink(id) {
    return <a href="#"
      style={{
        margin: "0 5px 0 5px",
        fontWeight: (id === this.props.selectedSubredditId ? "bold" : "normal")
      }}
      onClick={(e) => {
        e.preventDefault()
        this.props.selectSubreddit(id)
      }}
    >{id}</a>
  }

  renderThisSubreddit() {
    let id = this.props.selectedSubredditId
    let subreddit = this.props.subreddits[id]

    return <div>
      <div style={{fontSize: "130%"}}>{id}</div>
      {this.renderRefreshLink(id, subreddit)}
      {this.renderPostsList(subreddit)}
    </div>
  }

  renderRefreshLink(id, subreddit) {
    if (!subreddit) return "Loading..."

    switch (subreddit.postsRequest) {
      case "started":
        return "Loading..."
      case "success":
      case "failure":
        return <a href="#"
          onClick={(e) => {
            e.preventDefault()
            this.props.refreshSubreddit(id)
          }}
        >refresh</a>
      default: throw(`Unknown postsRequest status: ${subreddit.postsRequest}`)
    }
  }

  renderPostsList(subreddit) {
    if (!subreddit) return ""

    switch (subreddit.postsRequest) {
      case "started":
        return <div>...</div>
      case "success":
        return <div>
          <div>Last updated: {subreddit.lastUpdated}</div>
          {subreddit.posts.map((post) => this.renderPost(post))}
        </div>
      case "failure":
        return <div style={{color: "red"}}>Error loading posts. Try refreshing.</div>
      default: throw(`Unknown postsRequest status: ${subreddit.postsRequest}`)
    }
  }

  renderPost(post) {
    return <div key={post.id}
      style={{border: "1px solid #eee", borderRadius: "5px", margin: "5px 0", padding: "5px"}}
    >
      <div style={{fontSize: "110%", fontWeight: "bold"}}>
        <a href={"https://www.reddit.com" + post.permalink}
          target="_blank" rel="noopener noreferrer"
        >
          {post.title}
        </a>
      </div>
      Posted by {post.author_fullname}. {post.num_comments} comments.
    </div>
  }
}

RedditView.propTypes = {
  selectedSubredditId: PropTypes.string.isRequired,
  subreddits: PropTypes.object.isRequired,
  selectSubreddit: PropTypes.func.isRequired,
  refreshSubreddit: PropTypes.func.isRequired
}

export default RedditView
