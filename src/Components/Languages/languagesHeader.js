import React from "react"

import { View, StyleSheet, Text } from "react-native"
import Touchable from "react-native-platform-touchable"
import { Icon } from "react-native-elements"
import { scale } from "~/Components/responsive"

const languagesHeader = props => {
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
          <View>
            <Icon name="md-arrow-back" color="#00aced" type="ionicon" />
          </View>
        </Touchable>
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
    flexDirection: "row",
    alignContent: "center",
    marginBottom: 15,
    marginTop: 15
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

export default languagesHeader
