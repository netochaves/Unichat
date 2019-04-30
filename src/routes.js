import React from "react"
import {
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation"
import Auth from "~/Screens/Auth/auth"
import Verification from "~/Screens/Verification/verification"
import Chat from "~/Screens/Chat/chat"
import Contatos from "~/Screens/Contacts/contacts"
import { Icon } from "react-native-elements"

const tabBarNavigator = createMaterialTopTabNavigator(
  {
    ChatScreen: {
      screen: Chat,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="ios-chatbubbles"
            size={28}
            type="ionicon"
            color={tintColor}
          />
        ),
        tabBarLabel: "Conversas"
      }
    },
    ContactsScreen: {
      screen: Contatos,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-people" size={28} type="ionicon" color={tintColor} />
        ),
        tabBarLabel: "Contatos"
      }
    },

    SettingsScreen: {
      screen: Chat,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-settings" size={28} type="ionicon" color={tintColor} />
        ),
        tabBarLabel: "Configurações"
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      upperCaseLabel: false,
      activeTintColor: "#007AFF",
      inactiveTintColor: "#A1A1A1",
      indicatorStyle: {
        height: 0
      },
      style: {
        backgroundColor: "transparent"
      },
      labelStyle: {
        fontSize: 12,
        margin: 0
      },
      showIcon: true
    }
  }
)
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
      screen: tabBarNavigator,
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
    initialRouteName: "AuthScreen"
  },
  { header: null }
)

const Routes = createAppContainer(appStackNavigator)

export default Routes
