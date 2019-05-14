import React, { Component } from "react"
import {
  View,
  StyleSheet
} from "react-native"
import ConfigHeader from "~/Components/Config/configHeader"
import ConfigBody from "~/Components/Config/configBody"

export default class Config extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return (
      <View style={styles.content}>
        <ConfigHeader />
        <ConfigBody />
      </ View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex:1,
    backgroundColor: "#F4F5F8"
  }
})
