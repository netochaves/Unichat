import React from "react"
import { View, StyleSheet } from "react-native"
import ConfigHeader from "~/Components/Config/configHeader"
import ConfigBody from "~/Components/Config/configBody"

const Config = props => {
  const { navigation } = props
  return (
    <View style={styles.content}>
      <ConfigHeader />
      <ConfigBody navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#F4F5F8"
  }
})

export default Config
