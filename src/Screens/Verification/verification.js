/* eslint-disable object-curly-newline */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react"

import { View, Text, StyleSheet, Linking } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import CodeInput from "react-native-confirmation-code-input"

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    fontFamily: "OpenSans",
    justifyContent: "center"
  },
  containerText1: {
    marginBottom: 10,
    alignSelf: "center"
  },
  text1: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold"
  },
  containerText2: {
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row"
  },
  text2: {
    marginLeft: 1,
    color: "black",
    fontWeight: "bold"
  },
  button: {
    width: 300,
    height: 60,
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "center"
  },
  code: {
    height: 80,
    paddingLeft: 20,
    marginBottom: 30,
    alignSelf: "center"
  }
})

export default class Verificacao extends Component {
  constructor() {
    super()
    this.state = {}
  }

  confirmChoice = () => {}

  render() {
    return (
      <View style={styles.principal}>
        <View style={styles.containerText1}>
          <Text style={styles.text1}>Entre com seu número de verificação</Text>
        </View>
        <View style={styles.code}>
          <CodeInput
            codeLength={4}
            className="border-b"
            space={20}
            size={50}
            inactiveColor="gray"
            activeColor="gray"
            inputPosition="left"
            onFulfill={codigo => this.confirmChoice(codigo)}
          />
        </View>
        <View style={styles}>
          <LinearGradient colors={["#547BF0", "#6AC3FB"]} style={styles.button}>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 25,
                color: "white"
              }}
            >
              Verificar
            </Text>
          </LinearGradient>
        </View>
        <View style={styles.containerText2}>
          <Text>Não recebeu o código de verificação?</Text>
          <Text style={styles.text2} onPress={() => Linking.openURL("#")}>
            Reenviar código
          </Text>
        </View>
      </View>
    )
  }
}
