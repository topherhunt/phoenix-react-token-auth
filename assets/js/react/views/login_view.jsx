import React from "react"
import PropTypes from "prop-types"
import { makeApiRequest } from "../../api"

class LoginView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {email: "", password: "", requestStatus: null, failureMessage: null}
  }

  render() {
    if (this.props.authedUser) {
      return <div>You&apos;re logged in as {this.props.authedUser.email}.</div>
    } else {
      return this.renderLoginForm()
    }
  }

  renderLoginForm() {
    return <div>
      {this.renderFailureMessage()}
      <div>
        <input type="email"
          value={this.state.email}
          onChange={(e) => this.setState({email: e.target.value})}
          placeholder="Email"
        />
      </div>
      <div>
        <input type="password"
          value={this.state.password}
          onChange={(e) => this.setState({password: e.target.value})}
          placeholder="Password"
        />
      </div>
      <div>
        {this.renderSubmitButtonOrStatus()}
      </div>
    </div>
  }

  renderFailureMessage() {
    if (this.state.requestStatus === "failure") {
      return <div className="alert alert-danger">
        {this.state.failureMessage || "An unknown error occurred."}
      </div>
    }
  }

  renderSubmitButtonOrStatus() {
    if (this.state.requestStatus === "started") {
      return "Logging in..."
    } else {
      return <input type="submit" value="Log in"
        onClick={(e) => { e.preventDefault(); this.submit() }}
      />
    }
  }

  submit() {
    this.setState({requestStatus: "started", failureMessage: null})
    let params = {email: this.state.email, password: this.state.password}

    makeApiRequest("POST", "/api/login", params)
      .then((json) => {
        if (json.ok) {
          this.props.setAuthedUser({token: json.token, email: this.state.email})
          this.setState({requestStatus: "success"})
        } else {
          this.setState({requestStatus: "failure", failureMessage: json.message})
        }
      })
      .catch(() => {
        let message = "Can't connect to the server."
        this.setState({requestStatus: "failure", failureMessage: message})
      })
  }
}

LoginView.propTypes = {
  authedUser: PropTypes.object, // null if not logged in
  setAuthedUser: PropTypes.func.isRequired
}

export default LoginView
