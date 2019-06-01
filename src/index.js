import React from "react"

import "~/config/ReactotronConfig"
import firebase from "react-native-firebase"

import { createRootNavigator } from "~/routes"

const App = () => {
  let isAuth
  firebase.auth().onAuthStateChanged(user => {
    isAuth = user != null
  })
  const Routes = createRootNavigator(isAuth)
  return <Routes />
}

export default App
