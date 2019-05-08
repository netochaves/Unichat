import React from "react"

import {
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation"
import PerfilSettings from "~/Screens/PerfilSettings/perfilsettings"
import PreviewImage from "~/Screens/PreviewImage/previewImg"
import Auth from "~/Screens/Auth/auth"
import Verification from "~/Screens/Verification/verification"
import Chat from "~/Screens/Chat/chat"
import Contatos from "~/Screens/Contacts/contacts"
import Conversas from "~/Screens/Conversas/conversas"
import { Icon } from "react-native-elements"
import firebase from "react-native-firebase"

let rota = "AuthScreen"
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    rota = "Conversas"
  } else {
    rota = "AuthScreen"
  }
})

const tabBarNavigator = createMaterialTopTabNavigator(
  {
    ContactsScreen: {
      screen: Contatos,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-people" size={28} type="ionicon" color={tintColor} />
        ),
        tabBarLabel: "Contatos"
      }
    },

    Conversas: {
      screen: Conversas,
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

    SettingsScreen: {
      screen: Contatos,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-settings" size={28} type="ionicon" color={tintColor} />
        ),
        tabBarLabel: "Configurações"
      }
    }
  },
  {
    initialRouteName: "Conversas",
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
    PerfilSettings: {
      screen: PerfilSettings,
      navigationOptions: {
        header: null
      }
    },
    PreviewImage: {
      screen: PreviewImage,
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
    Conversas: {
      screen: tabBarNavigator,
      navigationOptions: {
        header: null
      }
    },
    ContactsScreen: {
      screen: tabBarNavigator,
      navigationOptions: {
        header: null
      }
    },
    ChatScreen: {
      screen: Chat,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: rota
  },
  { header: null }
)
export default createAppContainer(appStackNavigator)
