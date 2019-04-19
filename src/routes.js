import { createAppContainer, createStackNavigator } from "react-navigation"

import Auth from "~/Screens/Auth/auth"
import Verification from "~/Screens/Verification/verification"
import Conversas from "~/Screens/Conversas/conversas"

const appStackNavigator = createStackNavigator({
  AuthScreen: {
    screen: Auth
  },
  VerificationScreen: {
    screen: Verification
  },
  ConversationScreen: {
    screen: Conversas
  }
}, {
  initialRouteName: "AuthScreen"
})

const Routes = createAppContainer(appStackNavigator)

export default Routes
