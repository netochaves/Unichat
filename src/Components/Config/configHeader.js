import React from "react"

import { View, StyleSheet, Text } from "react-native"
import { scale } from "~/Components/responsive"

const configHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.configInfo}>Configurações</Text>
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
    marginLeft: 15,
    marginRight: 10,
    flexDirection: "row"
  },
  configInfo: {
    flex: 1,
    fontSize: scale(20),
    textAlign: "center",
    backgroundColor: "#fff"
  }
})

export default configHeader
