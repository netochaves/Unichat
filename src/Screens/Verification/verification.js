import React, { Component } from "react"

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Alert,
  Image,
  Dimensions
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import CodeInput from "react-native-confirmation-code-input"
import firebase from "react-native-firebase"
import unichatIcon from "../../assets/imgs/unichat-icon.png"
import { scale } from "~/Components/responsive"

export default class Verificacao extends Component {
  constructor() {
    super()
    this.state = {
      code: "",
      confirmResult: null,
      disableResend: true
    }
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)
    setTimeout(() => {
      this.setState({ disableResend: false })
    }, 60000)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress)
  }

  handleBackPress = () => {
    return true
  }

  submitCode = () => {
    const { code } = this.state

    this.confirmChoice(code)
  }

  confirmChoice = code => {
    const { navigation } = this.props
    const { confirmResult } = this.state
    const cR = navigation.getParam("confirmResultFirebase")
    if (!confirmResult) {
      this.setState({ confirmResult: cR })
    }
    if (confirmResult && code.length) {
      confirmResult
        .confirm(code)
        // Continuar as rotas se a confirmação ocorrer com sucesso aqui
        .then(user => {
          const userRef = firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
          userRef.get().then(doc => {
            if (!doc.exists) {
              navigation.navigate("PerfilSettings")
            } else {
              navigation.navigate("Conversas")
            }
          })
        })
        // Caso dê algum erro, o tratamento é feito aqui
        .catch(() => {})
    }
  }

  reenviarCodigo = () => {
    const { navigation } = this.props
    const phoneNumber = navigation.getParam("phoneNumber")
    this.setState({ disableResend: true })
    setTimeout(() => {
      this.setState({ disableResend: false })
    }, 60000)

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(cR => {
        this.setState({ confirmResult: cR })
      })
      .catch(erro => Alert.alert("Erro", erro))
  }

  render() {
    const { disableResend } = this.state

    return (
      <View style={styles.principal}>
        <View style={styles.logo}>
          <Image style={styles.icon} source={unichatIcon} />
        </View>
        <View style={styles.containerText1}>
          <Text style={styles.text1}>Entre com seu número de verificação</Text>
        </View>
        <View style={styles.code}>
          <CodeInput
            codeLength={6}
            className="border-b"
            space={20}
            size={40}
            inactiveColor="gray"
            activeColor="gray"
            inputPosition="center"
            keyboardType="number-pad"
            onFulfill={code => {
              this.setState({ code })
              this.confirmChoice(code)
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => this.submitCode()}
        >
          <LinearGradient colors={["#547BF0", "#6AC3FB"]} style={styles.button}>
            <Text style={styles.text3}>Verificar</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.containerText2}>
          <Text>Não recebeu o código de verificação?</Text>
          <TouchableOpacity
            disabled={disableResend}
            onPress={this.reenviarCodigo}
          >
            {disableResend && (
              <>
                <Text style={styles.text2_inactive}>Reenviar código</Text>
              </>
            )}
            {!disableResend && (
              <>
                <Text style={styles.text2_active}>Reenviar código</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.containerText3}>
          <Text style={styles.text4}>
            Caso o número seja do celular atual, o código será verificado
            automaticamente
          </Text>
        </View>
      </View>
    )
  }
}

const largura = Dimensions.get("window").width

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    fontFamily: "OpenSans",
  },
  containerText1: {
    marginBottom: 10,
    alignSelf: "center"
  },
  text1: {
    fontSize: scale(18),
    color: "black",
    fontWeight: "bold"
  },
  containerText2: {
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    fontSize: scale(8)
  },
  containerText3: {
    marginTop: 50,
    alignSelf: "center"
  },
  text2_active: {
    marginLeft: 1,
    color: "#007AFF"
  },
  text2_inactive: {
    marginLeft: 1,
    color: "black",
    fontWeight: "bold"
  },
  button: {
    height: 60,
    borderRadius: 20,
    justifyContent: "center"
  },
  code: {
    height: 80,
    marginBottom: 30
  },
  text3: {
    alignSelf: "center",
    fontSize: scale(24),
    color: "white"
  },
  text4: {
    textAlign: "center",
    fontSize: scale(8),
    color: "gray"
  },
  touchable: {
    marginLeft: 40,
    marginRight: 40
  },
  icon: {
    width: largura / 3,
    height: largura / 3
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    height: (1/2)*largura,
    top: 0
  }
})
