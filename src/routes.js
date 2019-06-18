import React from "react"
import {
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator
} from "react-navigation"
import PerfilSettings from "~/Screens/PerfilSettings/perfilsettings"
import PreviewImage from "~/Screens/PreviewImage/previewImg"
import Auth from "~/Screens/Auth/auth"
import Verification from "~/Screens/Verification/verification"
import Chat from "~/Screens/Chat/chat"
import Contatos from "~/Screens/Contacts/contacts"
import Conversas from "~/Screens/Conversas/conversas"
import Settings from "~/Screens/Config/config"
import EditPerfil from "~/Screens/EditPerfil/editperfil"
import Languages from "~/Screens/Languages/languages"
import About from "~/Screens/About/about"
import SelectContacts from "~/Screens/SelectContacts/SelectContacts"
import GroupChat from "~/Screens/GroupChat/GroupChat"

import { Icon } from "react-native-elements"
import Feedback from "./Screens/Feedback/feedback"

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
      screen: Settings,
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

const HomeStackNavigator = createStackNavigator(
  {
    SettingsScreen: {
      screen: tabBarNavigator,
      navigationOptions: {
        header: null
      }
    },
    EditPerfilScreen: {
      screen: EditPerfil,
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

    LanguagesScreen: {
      screen: Languages,
      navigationOptions: {
        header: null
      }
    },
    Contacts: {
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
    },
    Conversas: {
      screen: tabBarNavigator,
      navigationOptions: {
        header: null
      }
    },
    AboutScreen: {
      screen: About,
      navigationOptions: {
        header: null
      }
    },
    SelectContacts: {
      screen: SelectContacts,
      navigationOptions: {
        header: null
      }
    },
    GroupChat: {
      screen: GroupChat,
      navigationOptions: {
        header: null
      }
    },
    FeedbackScreen: {
      screen: Feedback,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Conversas"
  },
  { header: null }
)

const authStackNavigator = createStackNavigator(
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
    }
  },
  {
    initialRouteName: "AuthScreen"
  },
  { header: null }
)
export const createRootNavigator = (isAuth = false) => {
  return createAppContainer(
    createSwitchNavigator(
      {
        Home: HomeStackNavigator,
        Auth: authStackNavigator
      },
      { initialRouteName: isAuth ? "Home" : "Auth" }
    )
  )
}
