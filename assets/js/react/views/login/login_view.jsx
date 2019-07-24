import React from "react"
import PropTypes from "prop-types"

class LoginView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {email: "", password: ""}
  }

  render() {
    let request = this.props.loginRequest || {}
    if (request.status === "started") {
      return <div>Logging in...</div>
    } else if (this.props.authedUser) {
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
        <input type="submit" value="Log in"
          onClick={(e) => {
            e.preventDefault()
            let params = {email: this.state.email, password: this.state.password}
            this.props.submitLoginForm(params)
          }}
        />
      </div>
    </div>
  }

  renderFailureMessage() {
    let request = this.props.loginRequest || {}
    if (request.status === "failure") {
      return <div className="alert alert-danger">
        {request.message || "An unknown error occurred."}
      </div>
    }
  }
}

LoginView.propTypes = {
  authedUser: PropTypes.object,
  submitLoginForm: PropTypes.func.isRequired,
  loginRequest: PropTypes.object
}

export default LoginView
