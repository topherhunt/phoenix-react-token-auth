import { connect } from "react-redux"
import { PROFILE_DATA_REQUESTED } from "../../../redux/action_creators"
import ProfileView from "./profile_view.jsx"

// Define what state to provide to the child's props
const mapStateToProps = (state) => ({
  profile: (state.data.authedUser || {}).profile,
  profileRequest: state.requests.profile
})

// Define what dispatch callbacks to provide to the child's props
const mapDispatchToProps = (dispatch) => ({
  requestProfile: () => dispatch(PROFILE_DATA_REQUESTED())
})

// See https://redux.js.org/basics/usage-with-react
const ProfileViewContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileView)

export default ProfileViewContainer
