import { connect } from "react-redux"
import { REGISTER_FORM_SUBMITTED } from "../../../redux/action_creators"
import RegisterView from "./register_view.jsx"

// Define what state to provide to the child's props
const mapStateToProps = (state) => ({
  authedUser: state.data.authedUser,
  registerRequest: state.requests.register
})

// Define what dispatch callbacks to provide to the child's props
const mapDispatchToProps = (dispatch) => ({
  submitRegisterForm: (email, pwd) => dispatch(REGISTER_FORM_SUBMITTED(email, pwd))
})

// See https://redux.js.org/basics/usage-with-react
const RegisterViewContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterView)

export default RegisterViewContainer
