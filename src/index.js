import React from "react"

import "~/config/ReactotronConfig"
import firebase from "react-native-firebase"
import { StatusBar } from "react-native"
import { createRootNavigator } from "~/routes"

const App = () => {
  let isAuth
  firebase.auth().onAuthStateChanged(user => {
    isAuth = user != null
  })
  const Routes = createRootNavigator(isAuth)
  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" animated />
      <Routes />
    </>
  )
}

export default App
