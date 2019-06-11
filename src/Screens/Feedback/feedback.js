import React, { Component } from "react"

import { View, StyleSheet, Image } from "react-native"
import unichatIcon from "../../assets/imgs/unichat-icon.png"

export default class Feedback extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.painel1}>
          <Image source={unichatIcon} style={styles.logo} />
        </View>
        <View style={styles.painel2} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  painel1: {
    flex: 2
  },
  logo: {
    flex: 1,
    position: "absolute"
  },
  painel2: {
    flex: 1
  }
})
