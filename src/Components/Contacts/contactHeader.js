import React from "react"

import { View, StyleSheet, Text } from "react-native"
import { Icon } from "react-native-elements"

const contactsHeader = () => (
  <View style={styles.header}>
    <View style={styles.headerContent}>
      <Text style={styles.contactsInfo}>Contatos</Text>
      <View style={styles.searchIcon}>
        <Icon name="search" color="#00aced" />
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    elevation: 5,
    marginTop: 0
  },
  headerContent: {
    justifyContent: "center",
    alignContent: "center",
    marginBottom: 20,
    marginLeft: 10,
    marginTop: 20,
    marginRight: 10,
    flexDirection: "row"
  },
  contactsInfo: {
    flex: 1,
    fontSize: 28,
    textAlign: "center"
  },
  searchIcon: {
    justifyContent: "center",
  }
})

export default contactsHeader
