import React, { Component } from "react"

import {
  View, Text, StyleSheet, Picker, Alert
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import TextInputMask from "react-native-text-input-mask"
import firebase from "react-native-firebase"
import { StackActions, NavigationActions } from "react-navigation"

export default class Auth extends Component {
  static navigationOptions = {
  }

  constructor() {
    super()
    this.state = {
      countryCode: "",
      phoneNumber: null
    }
  }

  signIn = () => {
    const { phoneNumber } = this.state
    // eslint-disable-next-line no-unused-vars
    let message = ""

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(_confirmResult => {
        message = `Código de confirmação enviado para o número ${phoneNumber}`
        // Encaminhar a variável message e o confirmResult como prop para o componente Verification
      })
      .catch(error => {
        // eslint-disable-next-line max-len
        // message = "Ocorreu algum erro ao enviar o código para o número digitado! Verifique o número e tente novamente!"
        Alert.alert("Erro na verificação", error.message)
      })
  }

  render() {
    const { countryCode } = this.state
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.textBig}>Insira seu número de telefone</Text>
        </View>
        <View>
          <Text style={styles.textSmall}>
            Digite o número do seu telefone junto com o DDD
          </Text>
          <Picker
            selectedValue={countryCode}
            onValueChange={itemValue => this.setState({ countryCode: itemValue })
            }
          >
            <Picker.Item label="Selecione um ID do País" value="" />
            <Picker.Item label="+55 - Brasil" value="+55" />
            <Picker.Item label="+1 - Country" value="+1" />
          </Picker>
        </View>
        <View>
          <TextInputMask
            style={styles.textInputStyle}
            placeholder={countryCode}
            refInput={ref => {
              this.input = ref
            }}
            onChangeText={extracted => {
              this.setState({ phoneNumber: extracted })
            }}
            mask={`${countryCode} ([00]) [00000]-[0000]`}
            keyboardType="number-pad"
          />
          <LinearGradient colors={["#547BF0", "#6AC3FB"]} style={styles.button}>
            <Text
              style={styles.textButton}
              onPress={() => {
                this.signIn()
                this.props.navigation.dispatch(StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({ routeName: "VerificationScreen" })
                  ],
                }))
              }}
            >
              Verificar
            </Text>
          </LinearGradient>
        </View>
        <Text style={styles.textEnd}>
          Custos de SMS talvez possam ser aplicados
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "OpenSans",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 5
  },
  textBig: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 30
  },
  textSmall: {
    fontSize: 12,
    color: "gray",
    marginBottom: 10
  },
  textEnd: {
    fontSize: 12,
    color: "gray",
    marginTop: 50
  },
  textInputStyle: {
    textAlign: "center",
    fontSize: 20,
    width: 280,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#6AC3FB",
    marginTop: 10,
    marginBottom: 10
  },
  textButton: {
    alignSelf: "center",
    fontSize: 20,
    color: "white"
  },
  button: {
    width: 130,
    height: 50,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  }
})
