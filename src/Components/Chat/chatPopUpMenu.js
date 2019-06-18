import React, { PureComponent } from "react"
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { Icon } from "react-native-elements"
import firebase from "react-native-firebase"
import { Menu, Provider } from "react-native-paper"

export default class MyPopUpMenu extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      user: firebase.auth().currentUser.uid
    }
  }

  openMenu = () => this.setState({ visible: true })

  closeMenu = () => this.setState({ visible: false })

  confirmDelete = () => {
    Alert.alert(
      "Apagar",
      "TODAS as mensagens serão apagadas do servidor, deseja continuar?",
      [
        { text: "Sim", onPress: () => this.clearChat() },
        {
          text: "Não",
          style: "cancel",
          onPress: () => this.closeMenu()
        }
      ],
      { cancelable: false }
    )
  }

  clearChat = () => {
    this.closeMenu()
    const { user } = this.state
    const { destUser } = this.props

    this.ref = firebase
      .firestore()
      .collection("users")
      .doc(user)
      .collection("conversas")
      .doc(destUser.key)

    this.ref
      .collection("messages")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(docs => {
          docs.ref.delete()
        })
      })

    this.ref.update({
      lastMessage: "",
      dateLastMessage: firebase.database().getServerTime()
    })
  }

  render() {
    const { visible } = this.state
    return (
      <Provider>
        <View>
          <Menu
            visible={visible}
            onDismiss={this.closeMenu}
            anchor={
              <TouchableOpacity onPress={this.openMenu}>
                <Icon
                  name="dots-vertical"
                  type="material-community"
                  containerStyle={styles.popUpMenu}
                />
              </TouchableOpacity>
            }
          >
            <Menu.Item
              onPress={this.confirmDelete}
              title="Limpar conversa"
              style={styles.menuItem}
            />
          </Menu>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  popUpMenu: {
    backgroundColor: "#fff",
    alignSelf: "flex-end"
  },
  menuItem: { fontSize: 18 }
})
