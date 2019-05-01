import React, { Component } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Picker,
  Alert,
  YellowBox,
  TouchableOpacity
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { TextInputMask } from "react-native-masked-text"
import firebase from "react-native-firebase"
import shortid from "shortid"
import countryList from "../../assets/country_dials/dials"

YellowBox.ignoreWarnings([
  "Warning: componentWillMount is deprecated",
  "Warning: componentWillReceiveProps is deprecated"
])

export default class Auth extends Component {
  static navigationOptions = {}

  constructor() {
    super()
    this.state = {
      countries: [],
      countryCode: "",
      phoneNumber: null,
      notValid: true,
      loading: true
    }
  }

  componentDidMount() {
    const { navigation } = this.props
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loading: false })
        navigation.navigate("ChatScreen")
      } else {
        this.setState({ loading: false })
      }
    })
    this.setState({ countries: countryList })
  }

  confirmPhone = () => {
    const { phoneNumber } = this.state

    Alert.alert(
      "Confirmar",
      `O número ${  phoneNumber  } está correto?`,
      [
        {text: "Sim", onPress: () => this.signIn()},
        {
          text: "Não",
          style: "cancel",
        },
      ],
      {cancelable: false},
    )
  }

  signIn = () => {
    const { phoneNumber } = this.state

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(_confirmResult => {
        const { navigation } = this.props
        navigation.navigate("VerificationScreen", {
          confirmResultFirebase: _confirmResult,
          phoneNumber
        })
      })
      .catch(() => {
        Alert.alert("Erro na verificação", `O número ${  phoneNumber  } não é válido!`)
      })
  }

  render() {
    const { countries, countryCode, loading, notValid } = this.state

    if (loading) return null
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.textBig}>Insira seu número de telefone</Text>
          <Text style={styles.textSmall}>
            {" "}
            Digite o número do seu telefone junto com o DDD{" "}
          </Text>
        </View>
        <View>
          <View style={styles.countryPicker}>
            <Picker
              selectedValue={countryCode}
              onValueChange={itemValue =>
                this.setState({ countryCode: itemValue })
              }
            >
              <Picker.Item label="Escolha seu País" value="" />
              {countries.map(item => (
                <Picker.Item
                  label={`${item.flag} ${item.name} (${item.dial_code})`}
                  value={item.dial_code}
                  key={shortid.generate()}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.textInputView}>
          <TextInput style={styles.countryTextInput} value={countryCode} />
          <TextInputMask
            style={styles.textInputStyle}
            refInput={ref => {
              this.input = ref
            }}
            type="cel-phone"
            options={{
              maskType: "BRL",
              withDDD: true,
              dddMask: "(99)"
            }}
            onChangeText={text => {
              this.setState({ phoneNumber: `${countryCode}${text}`, notValid: false })
            }}
          />
        </View>
        <TouchableOpacity onPress={() => this.confirmPhone()} disabled={notValid}>
          <LinearGradient
            colors={["#547BF0", "#6AC3FB"]}
            style={styles.button}
          >
            <Text style={styles.textButton}>
              Enviar
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.textEnd}>
          Custos de SMS talvez possam ser aplicados
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "OpenSans",
    justifyContent: "center",
    marginTop: 10,
    padding: 5
  },
  textBig: {
    alignSelf: "center",
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 30
  },
  textSmall: {
    alignSelf: "center",
    fontSize: 12,
    color: "gray",
    marginBottom: 10
  },
  textEnd: {
    alignSelf: "center",
    fontSize: 12,
    color: "gray",
    marginTop: 50
  },
  countryPicker: {
    marginLeft: 40,
    marginRight: 40,
    borderBottomWidth: 2,
    borderColor: "#6AC3FB"
  },
  textInputView: {
    flexDirection: "row"
  },
  countryTextInput: {
    fontSize: 18,
    width: 50,
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    textAlign: "center",
    color: "gray",
    borderColor: "#6AC3FB"
  },
  textInputStyle: {
    flex: 1,
    fontSize: 18,
    marginLeft: 20,
    marginRight: 40,
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    textAlign: "center",
    borderColor: "#6AC3FB",
    color: "gray"
  },
  textButton: {
    alignSelf: "center",
    fontSize: 20,
    color: "white"
  },
  button: {
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20
  }
})
