import React from "react"

import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Icon } from "react-native-elements"

const createGroupHeader = props => {
  const { onBackHandler } = props
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.Icon}>
          <TouchableOpacity
            onPress={onBackHandler}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Icon name="ios-arrow-back" color="#007AFF" type="ionicon" />
          </TouchableOpacity>
        </View>
        <Text style={styles.contactsInfo}>Novo grupo</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    elevation: 5,
    marginTop: 0,
    fontFamily: "OpenSans"
  },
  headerContent: {
    backgroundColor: "#fff",
    marginBottom: 15,
    marginTop: 15,
    marginRight: 10,
    flexDirection: "row"
  },
  contactsInfo: {
    flex: 1,
    justifyContent: "center",
    fontFamily: "Open Sans",
    fontSize: 22,
    backgroundColor: "#fff"
  },
  Icon: {
    justifyContent: "center",
    marginRight: 15,
    marginLeft: 15
  }
})

export default createGroupHeader
