import { connect } from "react-redux"
import {
  VIEW_SELECTED,
  LOGOUT_CLICKED,
  LOGIN_REQUEST_SUCCESS
} from "../redux/action_creators"
import Main from "./main.jsx"

// Define what state to provide to the child's props
const mapStateToProps = (state) => ({
  currentView: state.ui.currentView,
  isLoggedIn: !!state.data.authedUser
})

// Define what dispatch callbacks to provide to the child's props
const mapDispatchToProps = (dispatch) => ({
  setView: (view) => dispatch(VIEW_SELECTED(view)),
  logout: () => dispatch(LOGOUT_CLICKED()),
  setLoggedIn: (email) => dispatch(LOGIN_REQUEST_SUCCESS(email))
})

// See https://redux.js.org/basics/usage-with-react
const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main)

export default MainContainer
