import React, { Component } from "react"

import {
  View,
  StyleSheet,
  Image
} from "react-native"

export default class PerfilSettings extends Component {
  static navigationoptions = {}

  render() {
    const { navigation } = this.props
    const img = navigation.getParam("img")
    return (
      <View style={styles.container}>
          <Image source={img} style={styles.img} resizeMode="contain"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  img: {
      flex: 1,
      width: "100%"
  }
})
