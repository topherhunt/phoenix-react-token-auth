import React from "react"
import HomeView from "./views/home_view.jsx"
import LoginView from "./views/login_view.jsx"
import RegisterView from "./views/register_view.jsx"
import ProfileView from "./views/profile_view.jsx"
import RedditView from "./views/reddit_view.jsx"

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: "home",
      authedUser: null // null if not logged in. If logged in, must have an :email key.
    }
  }

  componentDidMount() {
    // On page load, detect if user is already logged in.
    let token = localStorage.getItem("authToken")
    let email = localStorage.getItem("authedEmail")
    if (token) this.setState({authedUser: {email}})
  }

  render() {
    return <div>
      {this.renderNavbar()}
      {this.renderContent()}
    </div>
  }

  renderNavbar() {
    return <div>
      {this.renderViewLink("Home", "home")} &nbsp;
      {this.renderViewLink("Reddit", "reddit")} &nbsp;
      {this.renderLoginLogoutLinks()}
    </div>
  }

  renderLoginLogoutLinks() {
    if (this.state.authedUser) {
      return <span>
        {this.renderViewLink("My profile", "profile")} &nbsp;
        <a href="#" onClick={() => this.logout()}>Log out</a>
      </span>
    } else {
      return <span>
        {this.renderViewLink("Log in", "login")} &nbsp;
        {this.renderViewLink("Sign up", "register")}
      </span>
    }
  }

  renderViewLink(label, value) {
    if (this.state.view === value) {
      return <strong>{label}</strong>
    } else {
      return <a href="#" onClick={() => this.setState({view: value})}>{label}</a>
    }
  }

  renderContent() {
    switch (this.state.view) {
      case "home":
        return <HomeView />
      case "login":
        return <LoginView
          authedUser={this.state.authedUser}
          setAuthedUser={this.setAuthedUser.bind(this)} />
      case "register":
        return <RegisterView
          authedUser={this.state.authedUser}
          setAuthedUser={this.setAuthedUser.bind(this)} />
      case "profile":
        return <ProfileView />
      case "reddit":
        return <RedditView />
      default:
        throw(`Unknown view: ${this.state.view}`)
    }
  }

  setAuthedUser({token, email}) {
    localStorage.setItem("authToken", token)
    localStorage.setItem("authedEmail", email)
    this.setState({authedUser: {email}})
  }

  logout() {
    localStorage.removeItem("authToken")
    this.setState({authedUser: null})
  }
}

export default Main
