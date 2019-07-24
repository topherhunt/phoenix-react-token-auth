import { connect } from "react-redux"
import { LOGIN_FORM_SUBMITTED } from "../../../redux/action_creators"
import LoginView from "./login_view.jsx"

// Define what state to provide to the child's props
const mapStateToProps = (state) => ({
  authedUser: state.data.authedUser,
  loginRequest: state.requests.login
})

// Define what dispatch callbacks to provide to the child's props
const mapDispatchToProps = (dispatch) => ({
  submitLoginForm: (email, pw) => dispatch(LOGIN_FORM_SUBMITTED(email, pw))
})

// See https://redux.js.org/basics/usage-with-react
const LoginViewContainer = connect(mapStateToProps, mapDispatchToProps)(LoginView)

export default LoginViewContainer
