import React from "react"
import PropTypes from "prop-types"
import HomeView from "./views/home/home_view.jsx"
import RedditViewContainer from "./views/reddit/reddit_view_container.jsx"
import LoginViewContainer from "./views/login/login_view_container.jsx"
import RegisterViewContainer from "./views/register/register_view_container.jsx"
import ProfileViewContainer from "./views/profile/profile_view_container.jsx"

class Main extends React.Component {
  componentDidMount() {
    // On re-mount, detect if user is already logged in.
    let token = localStorage.getItem("authToken")
    let email = localStorage.getItem("authedEmail")
    if (token) this.props.setLoggedIn(email)
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
    if (this.props.isLoggedIn) {
      return <span>
        {this.renderViewLink("My profile", "profile")} &nbsp;
        <a href="#" onClick={() => this.props.logout()}>Log out</a>
      </span>
    } else {
      return <span>
        {this.renderViewLink("Log in", "login")} &nbsp;
        {this.renderViewLink("Sign up", "register")}
      </span>
    }
  }

  renderViewLink(label, value) {
    if (this.props.currentView === value) {
      return <strong>{label}</strong>
    } else {
      return <a href="#" onClick={() => this.props.setView(value)}>{label}</a>
    }
  }

  renderContent() {
    switch (this.props.currentView) {
      case "home":
        return <HomeView />
      case "reddit":
        return <RedditViewContainer />
      case "login":
        return <LoginViewContainer />
      case "register":
        return <RegisterViewContainer />
      case "profile":
        return <ProfileViewContainer />
      default:
        throw(`Unknown view: ${this.props.currentView}`)
    }
  }
}

Main.propTypes = {
  currentView: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  setView: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  setLoggedIn: PropTypes.func.isRequired
}

export default Main
