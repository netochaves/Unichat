import React, { Component } from "react"

import {
  View,
  Text,
  StyleSheet,
  Picker,
  TextInput,
  Alert
} from "react-native"
import LinearGradient from "react-native-linear-gradient"

export default class Auth extends Component {
  constructor() {
    super()
    this.state = {
      countryCode: ""
    }
  }

  sendNumber = () => {
    const { countryCode } = this.state
    if (countryCode === "") {
      Alert.alert("sendNumber()", "Selecione um ID no picker.")
    } else {
      Alert.alert("sendNumber()", countryCode)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.textBig}>Verifique seu número de telefone</Text>
        </View>
        <View>
          <Text style={styles.textSmall}>Digite o número do seu telefone junto com o DDD</Text>
          <Picker
            selectedValue={this.state.countryCode}
            onValueChange={itemValue => this.setState({ countryCode: itemValue })}
          >
            <Picker.Item label="Selecione um ID do País" value="" />
            <Picker.Item label="+55 - Brasil" value="+55" />
            <Picker.Item label="+1 - Country" value="+1" />
          </Picker>
        </View>
        <View>
          <TextInput
            placeholder={this.state.countryCode}
            underlineColorAndroid="transparent"
            keyboardType="number-pad"
            maxLength={9}
            style={styles.textInputStyle}
          />
          <LinearGradient colors={["#547BF0", "#6AC3FB"]} style={styles.button}>
            <Text style={styles.textButton} onPress={this.sendNumber}>
              Verificar
            </Text>
          </LinearGradient>

        </View>
        <Text style={styles.textEnd}>Custos de SMS talvez possam ser aplicados</Text>
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
    padding: 5,
  },
  textBig: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  textSmall: {
    fontSize: 12,
    color: "gray",
    marginBottom: 10,
  },
  textEnd: {
    fontSize: 12,
    color: "gray",
    marginTop: 50,
  },
  textInputStyle: {
    textAlign: "center",
    width: 260,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#6AC3FB",
    marginTop: 10,
    marginBottom: 10,
  },
  textButton: {
    alignSelf: "center",
    fontSize: 18,
    color: "white"
  },
  button: {
    width: 130,
    height: 50,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  }
})
