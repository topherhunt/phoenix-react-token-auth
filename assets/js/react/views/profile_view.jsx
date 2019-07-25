import React from "react"
import { makeApiRequest } from "../../api"

class ProfileView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {profile: null, requestStatus: null, failureMessage: null}
  }

  componentDidMount() {
    this.fetchProfile()
  }

  render() {
    return <div>
      <h3>Your profile</h3>
      {this.renderProfile()}
    </div>
  }

  renderProfile() {
    if (this.state.profile) {
      return JSON.stringify(this.state.profile)
    } else if (this.state.requestStatus === "started") {
      return "Loading..."
    } else if (this.state.failureMessage) {
      return <div className="text-danger">Error: {this.state.failureMessage}</div>
    } else {
      return "Just a moment..."
    }
  }

  fetchProfile() {
    this.setState({requestStatus: "started", failureMessage: null})

    makeApiRequest("GET", "/api/users/me")
      .then((json) => {
        if (json.ok) {
          let {email, inserted_at} = json
          this.setState({requestStatus: "success", profile: {email, inserted_at}})
        } else {
          this.setState({
            requestStatus: "failure",
            failureMessage: json.message || "Unexpected error."
          })
        }
      })
      .catch(() => {
        let message = "Can't connect to the server."
        this.setState({requestStatus: "failure", failureMessage: message})
      })
  }
}

export default ProfileView
