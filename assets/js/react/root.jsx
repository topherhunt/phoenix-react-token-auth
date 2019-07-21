import React from "react"
import PropTypes from "prop-types"

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <div>Hello from React! Readiness status: {this.props.ready}</div>
  }
}

Root.propTypes = {
  ready: PropTypes.string.isRequired
}

export default Root
