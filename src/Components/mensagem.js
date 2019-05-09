import React, { Component } from "react"
import { Svg, Path } from "react-native-svg"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { moderateScale } from "react-native-size-matters"
import {
  Menu,
  MenuProvider,
  MenuTrigger,
  MenuOption,
  MenuOptions
} from "react-native-popup-menu"

const styles = StyleSheet.create({
  // Estilo para a mensagem do remetente
  menu: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: 10,
    marginTop: 5,
    marginRight: 60
  },
  remet: {
    marginTop: 5,
    flexDirection: "row",
    alignSelf: "flex-end",
    marginLeft: 60,
    marginRight: 10
  },
  boxRemet: {
    elevation: 5,
    alignSelf: "center",
    backgroundColor: "blue",
    borderColor: "blue",
    borderRadius: 10,
    borderWidth: 0.5,
    marginRight: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 5
  },
  arrowRemet: {
    elevation: 5,
    position: "absolute",
    bottom: 0,
    right: 5
  },
  textRemet: {
    fontSize: 14,
    color: "white"
  },
  dateRemet: {
    alignSelf: "center",
    color: "gray",
    fontSize: 8,
    marginRight: 10,
    alignItems: "center"
  },

  // Estilo para a mensagem do destinatario
  dest: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: 10,
    marginTop: 5,
    marginRight: 60
  },
  boxDest: {
    elevation: 5,
    alignSelf: "center",
    backgroundColor: "white",
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 0.5,
    marginLeft: 5,
    marginRight: 0,
    marginTop: 5,
    marginBottom: 5,
    padding: 10
  },
  arrowDest: {
    elevation: 5,
    position: "absolute",
    bottom: 0,
    left: 5
  },
  textDest: {
    fontSize: 14,
    color: "black"
  },
  dateDest: {
    alignSelf: "center",
    marginTop: 5,
    marginLeft: 10
  },
  texto: {
    fontSize: 8,
    color: "gray"
  }
})

export default class Mensagem extends Component {
  constructor() {
    super()
    this.state = {
      content: "",
      date: "",
      source: "",
      original: ""
    }
  }

  componentDidMount() {
    const { content, date, source, original } = this.props

    this.setState({ content, date, source, original })
  }

  verLinguaOriginal = () => {
    const { original } = this.state
    Alert.alert(
      "Confirmar",
      "Deseja ver a mensagem na linguagem original?",
      [
        { text: "Sim", onPress: () => this.setState({ content: original }) },
        { text: "Não" }
      ],
      { cancelable: false }
    )
  }

  render() {
    const { content, date, source } = this.state
    let message
    // Remetente
    if (source === "1") {
      message = (
        <View style={styles.remet}>
          <View style={styles.dateRemet}>
            <Text style={styles.texto}>{date}</Text>
          </View>
          <View style={styles.boxRemet}>
            <Text style={styles.textRemet}>{content}</Text>
          </View>
          <View style={styles.arrowRemet}>
            <Svg
              width={moderateScale(15.5, 0.6)}
              height={moderateScale(17.5, 0.6)}
              viewBox="32.485 17.5 15.515 17.5"
              enable-background="new 32.485 17.5 15.515 17.5"
            >
              <Path
                d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
                fill="blue"
                x="0"
                y="0"
              />
            </Svg>
          </View>
        </View>
      )
    } else {
      // Destinatario
      message = (
        <View style={styles.dest}>
          <MenuProvider>
            <Menu style={styles.menu}>
              <MenuTrigger triggerOnLongPress="true">
                <View style={styles.arrowDest}>
                  <Svg
                    width={moderateScale(15.5, 0.6)}
                    height={moderateScale(17.5, 0.6)}
                    viewBox="32.484 17.5 15.515 17.5"
                    enable-background="new 32.485 17.5 15.515 17.5"
                  >
                    <Path
                      d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                      fill="white"
                      x="0"
                      y="0"
                    />
                  </Svg>
                </View>
                <View style={styles.boxDest}>
                  <Text style={styles.textDest}>{content}</Text>
                </View>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption
                  onSelect={() => this.verLinguaOriginal()}
                  text="Traduzir para idioma original"
                />
              </MenuOptions>
            </Menu>
          </MenuProvider>

          <View style={styles.dateDest}>
            <Text style={styles.texto}>{date}</Text>
          </View>
        </View>
      )
    }
    return message
  }
}
