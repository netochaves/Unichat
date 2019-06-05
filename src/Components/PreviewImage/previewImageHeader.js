import React from "react"

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar
} from "react-native"
import { Icon } from "react-native-elements"

const previewImageHeader = props => {
  const { navigation } = props
  const userName = navigation.getParam("name")

  return (
    <View style={styles.header}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={styles.headerContent}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Icon name="ios-arrow-back" color="#fff" type="ionicon" />
        </TouchableOpacity>
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
    backgroundColor: "#000",
    marginBottom: 15,
    marginTop: 15,
    marginRight: 10,
    paddingLeft: 15,
    flexDirection: "row"
  },
  previewImageInfo: {
    flex: 1,
    fontSize: 22,
    textAlign: "left",
    color: "#fff",
    backgroundColor: "#000",
    marginLeft: 20
  }
})

export default previewImageHeader
