import React from "react"
import PropTypes from "prop-types"

class RegisterView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {email: "", password: ""}
  }

  render() {
    let request = this.props.registerRequest || {}
    if (request.status === "started") {
      return <div>Registering...</div>
    } else if (this.props.authedUser) {
      return <div>{"Great! You're registered and logged in."}</div>
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
        <input type="submit" value="Sign up"
          onClick={(e) => {
            e.preventDefault()
            let params = {email: this.state.email, password: this.state.password}
            this.props.submitRegisterForm(params)
          }}
        />
      </div>
    </div>
  }

  renderFailureMessage() {
    let request = this.props.registerRequest || {}
    if (request.status === "failure") {
      return <div className="alert alert-danger">
        {request.message || "An unknown error occurred."}
      </div>
    }
  }
}

RegisterView.propTypes = {
  authedUser: PropTypes.object,
  submitRegisterForm: PropTypes.func.isRequired,
  registerRequest: PropTypes.object
}

export default RegisterView
