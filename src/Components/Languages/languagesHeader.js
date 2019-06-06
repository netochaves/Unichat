import React from "react"

import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Icon } from "react-native-elements"

const languagesHeader = props => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            const { navigation } = props
            navigation.navigate("SettingsScreen")
          }}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Icon name="ios-arrow-back" color="#00aced" type="ionicon" />
        </TouchableOpacity>
        <Text style={styles.languagesInfo}>Idiomas</Text>
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
    paddingLeft: 15,
    marginRight: 10,
    flexDirection: "row"
  },
  backButton: {
    justifyContent: "center"
  },
  languagesInfo: {
    flex: 1,
    fontSize: 22,
    textAlign: "left",
    backgroundColor: "#fff",
    marginLeft: 20,
    paddingRight: 20
  }
})

export default languagesHeader
