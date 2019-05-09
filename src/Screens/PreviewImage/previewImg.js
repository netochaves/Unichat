import React, { Component } from "react"

import { View, StyleSheet, Image, BackHandler } from "react-native"

export default class PerfilSettings extends Component {
  static navigationoptions = {}

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress)
  }

  handleBackPress = () => {
    const { navigation } = this.props
    navigation.goBack()
    return true
  }

  render() {
    const { navigation } = this.props
    const img = navigation.getParam("img")
    return (
      <View style={styles.container}>
        <Image source={img} style={styles.img} resizeMode="contain" />
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
