import { createAppContainer, createSwitchNavigator } from "react-navigation"

// import Conversas from "~/Screens/Conversas/conversas"
import Auth from "~/Screens/Auth/auth"

const Routes = createAppContainer(createSwitchNavigator({ Auth }))

export default Routes
