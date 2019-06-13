import React, { Component } from "react"

import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import unichatIcon from "../../assets/imgs/unichat-icon-no-background.png"

export default class Feedback extends Component {
  constructor() {
    super()
    this.state = {
      content: ""
    }
  }

  render() {
    const { content } = this.state

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#547BF0" barStyle="light-content" />
        <LinearGradient colors={["#547BF0", "#6AC3FB"]} style={styles.painel1}>
          <Image source={unichatIcon} style={styles.logo} />
          <View style={styles.painelText}>
            <Text style={styles.textoTitulo}>FEEDBACK</Text>
            <Text style={styles.textApresentacao}>
              Envie-nos um feedback elogiando ou relatando algum bug que você
              encontrou!
            </Text>
          </View>
        </LinearGradient>
        <View style={styles.painel2}>
          <View style={styles.textInputView}>
            <TextInput
              // style={styles.textInputView}
              placeholder="Digite aqui..."
              onChangeText={text => this.setState({ content: text })}
              value={content}
              multiline
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity>
              <LinearGradient
                colors={["#547BF0", "#6AC3FB"]}
                style={styles.button}
              >
                <Text style={styles.textButton}>Enviar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const altura = Dimensions.get("window").height

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  painel1: {
    // flex: 3
    height: altura / 2.5
  },
  painelText: {
    // flex: 1,
    marginLeft: 30,
    marginRight: 20,
    marginBottom: 20
    // backgroundColor: "red"
  },
  logo: {
    flex: 1,
    aspectRatio: 1,
    marginLeft: 30
  },
  textoTitulo: {
    color: "#fff",
    fontSize: 30,
    elevation: 20
  },
  textApresentacao: {
    marginTop: 20,
    color: "#fff"
  },
  painel2: {
    height: altura - altura / 2.5
  },
  textInputView: {
    height: "70%"
    // marginLeft: 10,
    // marginRight: 10
    // borderWidth: 1
  },
  textButton: {
    alignSelf: "center",
    fontSize: 20,
    color: "white"
  },
  button: {
    height: 60,
    alignSelf: "center",
    borderRadius: 20,
    justifyContent: "center",
    width: "80%"
  },
  buttonContainer: {
    height: "30%",
    justifyContent: "center"
  }
})
