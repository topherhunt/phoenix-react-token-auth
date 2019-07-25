import React from "react"

class RedditView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {currentSubredditId: "reactjs", dataBySubreddit: {}}
  }

  componentDidMount() {
    this.ensureSubredditLoaded(this.state.currentSubredditId)
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
        fontWeight: (id === this.state.currentSubredditId ? "bold" : "normal")
      }}
      onClick={(e) => {
        e.preventDefault()
        this.setState({currentSubredditId: id})
        this.ensureSubredditLoaded(id)
      }}
    >{id}</a>
  }

  renderThisSubreddit() {
    let id = this.state.currentSubredditId
    let subreddit = this.state.dataBySubreddit[id]

    return <div>
      <div style={{fontSize: "130%"}}>{id}</div>
      {this.renderRefreshLink(id, subreddit)}
      {this.renderPostsList(subreddit)}
    </div>
  }

  renderRefreshLink(id, subreddit) {
    if (!subreddit) return "Loading..."

    switch (subreddit.requestStatus) {
      case undefined:
        return "..."
      case "started":
        return "Loading..."
      case "success":
      case "failure":
        return <a href="#"
          onClick={(e) => {
            e.preventDefault()
            this.refreshCurrentSubreddit(id)
          }}
        >refresh</a>
      default: throw(`Unknown requestStatus: ${subreddit.requestStatus}`)
    }
  }

  renderPostsList(subreddit) {
    if (!subreddit) return ""

    switch (subreddit.requestStatus) {
      case undefined:
        return "..."
      case "started":
        return <div>...</div>
      case "success":
        return <div>
          <div>Last updated: {subreddit.lastUpdated}</div>
          {subreddit.posts.map((post) => this.renderPost(post))}
        </div>
      case "failure":
        return <div style={{color: "red"}}>Error loading posts. Try refreshing.</div>
      default:
        throw(`Unknown requestStatus status: ${subreddit.requestStatus}`)
    }
  }

  renderPost(post) {
    let styles = {border: "1px solid #eee", borderRadius: "5px", margin: "5px 0", padding: "5px"}
    let url = "https://www.reddit.com" + post.permalink

    return <div key={post.id} style={styles}>
      <div style={{fontSize: "110%", fontWeight: "bold"}}>
        <a href={url} target="_blank" rel="noopener noreferrer">{post.title}</a>
      </div>
      Posted by {post.author_fullname}. {post.num_comments} comments.
    </div>
  }

  ensureSubredditLoaded(id) {
    let subreddit = this.state.dataBySubreddit[id]
    if (!subreddit) this.refreshCurrentSubreddit(id)
  }

  refreshCurrentSubreddit(id) {
    this.updateSubredditState(id, {requestStatus: "started"})

    console.log("refreshCurrentSubreddit started for id: "+id)

    fetch(`https://www.reddit.com/r/${id}.json`)
      .then((response) => {
        if (!response.ok) throw(`Got bad response code: ${response.status}`)
        return response.json()
      })
      .then((json) => {
        console.log("Success.")
        let posts = json.data.children.map((child) => child.data)
        let subreddit = {requestStatus: "success", posts, updatedAt: Date.now()}
        this.updateSubredditState(id, subreddit)
      })
      .catch(() => {
        this.updateSubredditState(id, {requestStatus: "failure"})
      })
  }

  updateSubredditState(id, thisSubreddit) {
    let dataBySubreddit = this.state.dataBySubreddit
    this.setState({dataBySubreddit: {...dataBySubreddit, [id]: thisSubreddit}})
  }
}

export default RedditView
