import { createAppContainer, createStackNavigator } from "react-navigation"

import Auth from "~/Screens/Auth/auth"
import Verification from "~/Screens/Verification/verification"
import Chat from "~/Screens/Chat/chat"
import Contatos from "~/Screens/Contacts/contacts"

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
    ChatScreen: {
      screen: Chat,
      navigationOptions: {
        header: null
      }
    },
    ContactsScreen: {
      screen: Contatos,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "ContactsScreen"
  },
  { header: null }
)

const Routes = createAppContainer(appStackNavigator)

export default Routes
