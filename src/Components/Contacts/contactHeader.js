import React from "react"

import { View, StyleSheet, Text, Dimensions } from "react-native"
import { Icon } from "react-native-elements"
import Touchable from "react-native-platform-touchable"

const contactsHeader = props => {
  const { syncronize, onPressSearch } = props
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.contactsInfo}>Contatos</Text>
        <View style={styles.Icon}>
          <Touchable
            onPress={onPressSearch}
            background={Touchable.SelectableBackgroundBorderless()}
          >
            <Icon name="search1" color="#00aced" type="antdesign" />
          </Touchable>
        </View>
        <View style={styles.Icon}>
          <Touchable
            onPress={syncronize}
            background={Touchable.SelectableBackgroundBorderless()}
          >
            <Icon name="sync" color="#00aced" type="material" />
          </Touchable>
        </View>
      </View>
    </View>
  )
}

const comprimento = Dimensions.get("window").width

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
    marginLeft: comprimento / 6,
    marginRight: 10,
    flexDirection: "row"
  },
  contactsInfo: {
    flex: 1,
    fontSize: 22,
    textAlign: "center",
    backgroundColor: "#fff"
  },
  Icon: {
    justifyContent: "center",
    marginRight: 5,
    marginLeft: 5
  }
})

export default contactsHeader
