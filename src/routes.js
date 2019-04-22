import { createAppContainer, createStackNavigator } from "react-navigation"

import Auth from "~/Screens/Auth/auth"
import Verification from "~/Screens/Verification/verification"
import Conversas from "~/Screens/Conversas/conversas"

const appStackNavigator = createStackNavigator(
  {
    AuthScreen: {
      screen: Auth,
      navigationOptions: {
        header: null
      }
    },
    VerificationScreen: {
      screen: Verification,
      navigationOptions: {
        header: null
      }
    },
    ConversationScreen: {
      screen: Conversas,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "AuthScreen"
  },
  { header: null }
)

const Routes = createAppContainer(appStackNavigator)

export default Routes
