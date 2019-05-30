import React from "react"
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native"

const aboutScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.elevationBody}>
        <Text>Sobre</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F8"
  },
  elevationBody: {
    flex: 1,
    elevation: 1,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
})

export default aboutScreen
