import React from "react"

import { View, StyleSheet, Text } from "react-native"
import Touchable from "react-native-platform-touchable"
import { Icon } from "react-native-elements"
import { scale } from "~/Components/responsive"

const aboutHeader = props => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Touchable
          background={Touchable.SelectableBackgroundBorderless()}
          style={styles.backButton}
          onPress={() => {
            const { navigation } = props
            navigation.navigate("SettingsScreen")
          }}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Icon name="md-arrow-back" color="#00aced" type="ionicon" />
        </Touchable>
        <Text style={styles.languagesInfo}>Sobre</Text>
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
    marginBottom: 15,
    marginTop: 15,
    flexDirection: "row"
  },
  backButton: {
    justifyContent: "center",
    width: 40,
    marginLeft: 10
  },
  languagesInfo: {
    fontSize: scale(20),
    textAlign: "left",
    marginLeft: 10
  }
})

export default aboutHeader
