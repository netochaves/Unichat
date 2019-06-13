import React, { Component } from "react"

import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Keyboard
} from "react-native"
import { Icon } from "react-native-elements"
import Touchable from "react-native-platform-touchable"
import LinearGradient from "react-native-linear-gradient"
import unichatIcon from "../../assets/imgs/unichat-icon-no-background.png"

export default class Feedback extends Component {
  constructor() {
    super()
    this.state = {
      content: ""
    }
  }

  componentDidMount() {
    this.unsubscribe1 = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    )
    this.unsubscribe2 = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    )
  }

  componentWillUnmount() {
    this.unsubscribe1()
    this.unsubscribe2()
  }

  keyboardDidShow = () => {
    this.scrollView.scrollToEnd({ animated: true, duration: 100000 })
  }

  keyboardDidHide = () => {
    this.textInput.focus()
  }

  handleBackPress = () => {
    const { navigation } = this.props
    const { disabled } = this.state
    if (!disabled) {
      navigation.navigate("SettingsScreen")
    }
    return true
  }

  render() {
    const { content } = this.state

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Touchable
              background={Touchable.SelectableBackgroundBorderless()}
              style={styles.back}
              onPress={this.handleBackPress}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Icon name="md-arrow-back" color="#00aced" type="ionicon" />
            </Touchable>
            <Text style={styles.feedbackInfo}>Feedback</Text>
          </View>
        </View>
        <ScrollView
          ref={view => {
            this.scrollView = view
          }}
        >
          <LinearGradient colors={["#547BF0", "#6AC3FB"]}>
            <Image source={unichatIcon} style={styles.logo} />
            <View style={styles.painelText}>
              <Text style={styles.textoTitulo}>FEEDBACK</Text>
              <Text style={styles.textApresentacao}>
                Envie-nos um feedback elogiando ou relatando algum bug que você
                encontrou!
              </Text>
            </View>
          </LinearGradient>
          {/* <View style={styles.painel2}> */}
          <TouchableWithoutFeedback
            onPress={() => {
              this.textInput.focus()
            }}
          >
            <View style={styles.textInputView}>
              <TextInput
                ref={textInput => {
                  this.textInput = textInput
                }}
                // style={styles.textInputView}
                placeholder="Digite aqui..."
                onChangeText={text => this.setState({ content: text })}
                value={content}
                multiline
              />
            </View>
          </TouchableWithoutFeedback>
          {/* <View style={styles.buttonContainer}> */}
          <TouchableOpacity>
            <LinearGradient
              colors={["#547BF0", "#6AC3FB"]}
              style={styles.button}
            >
              <Text style={styles.textButton}>Enviar</Text>
            </LinearGradient>
          </TouchableOpacity>
          {/* </View> */}
          {/* </View> */}
        </ScrollView>
      </View>
    )
  }
}

const altura = Dimensions.get("window").height
const largura = Dimensions.get("window").width

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "#fff",
    elevation: 5,
    marginTop: 0,
    fontFamily: "Open Sans"
  },
  headerContent: {
    flexDirection: "row",
    alignContent: "center",
    marginBottom: 15,
    marginTop: 15
  },
  feedbackInfo: {
    fontSize: 22,
    textAlign: "left",
    marginLeft: 10
  },
  painelText: {
    // flex: 1,
    marginLeft: 30,
    marginRight: 20,
    marginBottom: 20
    // backgroundColor: "red"
  },
  logo: {
    // flex: 1,
    width: largura / 2,
    height: largura / 2,
    // aspectRatio: 3 / 2,
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
  textInputView: {
    flex: 1,
    // backgroundColor: "green"
    height: altura / 3
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
    width: "80%",
    marginTop: 5,
    marginBottom: 5
  },
  back: {
    justifyContent: "center",
    width: 40,
    marginLeft: 10
  }
})
