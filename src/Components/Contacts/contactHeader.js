import React from "react"

import { View, StyleSheet, Text } from "react-native"
import { Icon } from "react-native-elements"

const contactsHeader = () => (
  <View style={styles.header}>
    <View style={styles.headerContent}>
      <Text style={styles.contactsInfo}>Contatos</Text>
      <Icon iconStyle={styles.searchIcon} name="search" color="#00aced" />
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
    justifyContent: "space-between",
    alignContent: "center",
    marginBottom: 20,
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    flexDirection: "row"
  },
  contactsInfo: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    fontSize: 28,
    textAlign: "center"
  },
  searchIcon: {
    marginTop: 10
  }
})

export default contactsHeader
