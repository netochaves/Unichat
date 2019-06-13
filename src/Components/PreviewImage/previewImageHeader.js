import React from "react"

import { View, StyleSheet, Text, StatusBar } from "react-native"
import Touchable from "react-native-platform-touchable"
import { Icon } from "react-native-elements"

const previewImageHeader = props => {
  const { navigation } = props
  const userName = navigation.getParam("name")

  return (
    <View style={styles.header}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={styles.headerContent}>
        <Touchable
          background={Touchable.Ripple("white", true)}
          style={styles.backButton}
          onPress={() => {
            navigation.goBack()
          }}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Icon name="md-arrow-back" color="#fff" type="ionicon" />
        </Touchable>
        <Text style={styles.previewImageInfo}>{userName}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#000",
    elevation: 5,
    marginTop: 0,
    fontFamily: "OpenSans"
  },
  headerContent: {
    marginBottom: 15,
    marginTop: 15,
    alignContent: "center",
    flexDirection: "row"
  },
  previewImageInfo: {
    fontSize: 22,
    color: "#fff",
    marginLeft: 10
  },
  backButton: {
    justifyContent: "center",
    width: 40,
    marginLeft: 10
  }
})

export default previewImageHeader
