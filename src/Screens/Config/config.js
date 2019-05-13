import React, { Component } from "react"
import {
  View,
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
      <View>
        <ConfigHeader />
        <ConfigBody />
      </ View>
    )
  }
}