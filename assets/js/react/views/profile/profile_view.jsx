import React from "react"
import PropTypes from "prop-types"

class ProfileView extends React.Component {
  componentDidMount() {
    if (!this.props.profile) {
      this.props.requestProfile()
    }
  }

  render() {
    return <div>
      <h3>Your profile</h3>
      {this.renderProfile()}
    </div>
  }

  renderProfile() {
    let request = this.props.profileRequest || {}
    if (this.props.profile) {
      return JSON.stringify(this.props.profile)
    } else if (request && request.status == "started") {
      return "Loading..."
    } else if (request && request.status == "failure") {
      return "Unable to load your profile: "+request.message
    } else {
      return "Just a moment..."
    }
  }
}

ProfileView.propTypes = {
  profile: PropTypes.object,
  profileRequest: PropTypes.object,
  requestProfile: PropTypes.func.isRequired
}

export default ProfileView
