import { createAppContainer, createSwitchNavigator } from "react-navigation"

import Conversas from "~/Screens/Conversas/conversas"

const Routes = createAppContainer(createSwitchNavigator({ Conversas }))

export default Routes
