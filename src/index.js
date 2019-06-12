import React from "react"

import "~/config/ReactotronConfig"
import firebase from "react-native-firebase"
import { StatusBar } from "react-native"
import { createRootNavigator } from "~/routes"
import { Provider } from "react-native-paper"

const App = () => {
  let isAuth
  firebase.auth().onAuthStateChanged(user => {
    isAuth = user != null
  })
  const Routes = createRootNavigator(isAuth)
  return (
    <Provider>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" animated />
      <Routes />
    </Provider>
  )
}

export default App
