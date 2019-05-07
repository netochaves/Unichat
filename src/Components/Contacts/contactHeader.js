import React from "react"

import { View, StyleSheet, Text, TouchableNativeFeedback } from "react-native"
import { Icon } from "react-native-elements"

const contactsHeader = props => {
  const { syncronize } = props
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.contactsInfo}>Contatos</Text>
        <View style={styles.Icon}>
          <Icon name="search" color="#00aced" />
        </View>
        <TouchableNativeFeedback>
          <Icon
            containerStyle={styles.syncIcon}
            name="sync"
            color="#00aced"
            type="material"
            onPress={syncronize}
          />
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    elevation: 5,
    marginTop: 0
  },
  headerContent: {
    justifyContent: "center",
    alignContent: "center",
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    flexDirection: "row"
  },
  contactsInfo: {
    flex: 1,
    fontSize: 28,
    textAlign: "center"
  },
  Icon: {
    justifyContent: "center"
  },
  syncIcon: {
    justifyContent: "center",
    marginLeft: 10
  }
})

export default contactsHeader
