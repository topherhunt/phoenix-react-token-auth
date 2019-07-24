import React from "react"
import { Provider } from "react-redux"
import store from "../redux/store"
import MainContainer from "./main_container.jsx"

class Root extends React.Component {
  render() {
    return <Provider store={store}>
      <MainContainer />
    </Provider>
  }
}

export default Root
