/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react"
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Switch,
  Linking,
  TouchableOpacity,
  Share
} from "react-native"
import Touchable from "react-native-platform-touchable"
import { Icon } from "react-native-elements"
import firebase from "react-native-firebase"
import { scale } from "~/Components/responsive"

export default class configBody extends Component {
  constructor() {
    super()
    this.state = {
      switchState: false
    }
    this.ref = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
  }

  componentDidMount() {
    this.ref.get().then(doc => {
      const { notifications } = doc.data()
      this.setState({ switchState: notifications })
    })
  }

  switchHandler = () => {
    const { switchState } = this.state
    this.ref.update({ notifications: !switchState })
    this.setState(prevState => ({ switchState: !prevState.switchState }))
  }

  render() {
    const { navigation } = this.props
    const { switchState } = this.state
    return (
      <View style={styles.elevationBody}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.innerBody}>
            <Text style={styles.touchableStyleTitle}>Conta</Text>
            <Text style={styles.line} />
            <Touchable
              style={styles.platformTouchable}
              onPress={() => {
                navigation.navigate("LanguagesScreen")
              }}
            >
              <View style={styles.touchableIcon}>
                <Icon name="language" size={28} color="#007AFF" />
                <Text style={styles.touchableStyle}>Idiomas</Text>
                <View style={styles.chevronStyle}>
                  <Icon
                    name="chevron-right"
                    size={28}
                    color="gray"
                    type="evilicon"
                  />
                </View>
              </View>
            </Touchable>

            <Touchable
              style={styles.platformTouchable}
              onPress={() => {
                navigation.navigate("EditPerfilScreen")
              }}
            >
              <View style={styles.touchableIcon}>
                <Icon name="person" size={28} color="#c6056c" />
                <Text style={styles.touchableStyle}>Perfil</Text>
                <View style={styles.chevronStyle}>
                  <Icon
                    name="chevron-right"
                    size={28}
                    color="gray"
                    type="evilicon"
                  />
                </View>
              </View>
            </Touchable>

            <Touchable style={styles.platformTouchable}>
              <View style={styles.touchableIcon}>
                <Icon name="notifications" size={28} color="#ef2390" />
                <Text style={styles.touchableStyle}>Notificação</Text>
                <View style={styles.chevronStyle}>
                  <Switch
                    onValueChange={this.switchHandler}
                    value={switchState}
                  />
                </View>
              </View>
            </Touchable>

            <Text style={styles.touchableStyleTitle}>Aplicativo</Text>
            <Text style={styles.line} />

            <Touchable
              style={styles.platformTouchable}
              onPress={() => {
                navigation.navigate("FeedbackScreen")
              }}
            >
              <View style={styles.touchableIcon}>
                <Icon name="chat" size={28} color="#e542f4" />
                <Text style={styles.touchableStyle}>Enviar Feedback</Text>
              </View>
            </Touchable>

            <Touchable
              style={styles.platformTouchable}
              onPress={() => {
                Share.share({
                  message:
                    "Olá, já instalou o Unichat? Se não, é bem fácil. Apenas clique no link a seguir https://github.com/ES2-UFPI/Unichat/releases"
                })
              }}
            >
              <View style={styles.touchableIcon}>
                <Icon name="share" size={28} color="#14d2e8" />
                <Text style={styles.touchableStyle}>Compartilhar App</Text>
              </View>
            </Touchable>

            <Touchable style={styles.platformTouchable}>
              <View style={styles.touchableIcon}>
                <Icon name="star" size={28} color="#deea2e" />
                <Text style={styles.touchableStyle}>Avaliar App</Text>
              </View>
            </Touchable>
            <Touchable
              style={styles.platformTouchable}
              onPress={() => {
                Linking.openURL(
                  "https://github.com/ES2-UFPI/Unichat/blob/dev/PRIVACY-POLICY.md"
                )
              }}
            >
              <View style={styles.touchableIcon}>
                <Icon name="notifications" size={28} color="#25e01f" />
                <Text style={styles.touchableStyle}>
                  Política de Privacidade
                </Text>
              </View>
            </Touchable>

            <Touchable
              style={styles.platformTouchable}
              onPress={() => {
                navigation.navigate("AboutScreen")
              }}
            >
              <View style={styles.touchableIcon}>
                <Icon name="info" size={28} color="#ef9739" />
                <Text style={styles.touchableStyle}>Sobre</Text>
              </View>
            </Touchable>
          </View>
          <TouchableOpacity style={{ alignSelf: "center" }}>
            <Text style={styles.touchableStyleExit}>Excluir Conta</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  elevationBody: {
    flex: 1,
    elevation: 5,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    backgroundColor: "#fff"
  },
  innerBody: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  },
  chevronStyle: {
    flex: 1,
    alignItems: "flex-end"
  },
  touchableIcon: {
    flexDirection: "row",
    alignItems: "center"
  },
  touchableStyle: {
    fontFamily: "OpenSans",
    fontSize: scale(16),
    marginLeft: 10
  },
  touchableStyleExit: {
    backgroundColor: "red",
    color: "#fff",
    fontFamily: "OpenSans",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
    borderColor: "#dce1ea",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12
  },
  touchableStyleTitle: {
    fontSize: scale(20),
    fontFamily: "OpenSans",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5
  },
  line: {
    borderTopColor: "#dce1ea",
    borderTopWidth: 2,
    marginRight: 20
  },
  platformTouchable: {
    marginBottom: 5
  }
})
