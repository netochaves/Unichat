import React, { Component } from "react"

import { View, StyleSheet, StatusBar, BackHandler, Alert } from "react-native"
import {
  ProviderTypes,
  TranslatorConfiguration,
  TranslatorFactory
} from "react-native-power-translator"
import { StackActions, NavigationActions } from "react-navigation"
import firebase from "react-native-firebase"
import ChatInput from "../../Components/Chat/chatInput"
import ChatHeader from "../../Components/Chat/chatHeader"
import ChatContainer from "../../Components/Chat/chatContainer"

export default class Conversas extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    const { navigation } = this.props
    this.scrollView = null
    this.state = {
      messageText: "",
      messages: [],
      user: firebase.auth().currentUser.uid,
      isValueNull: true,
      destUser: navigation.getParam("item"),
      isMounted: true
    }
    const { user, destUser } = this.state
    this.ref = firebase
      .firestore()
      .collection("users")
      .doc(user)
      .collection("conversas")
      .doc(destUser.key)

    this.refDest = firebase
      .firestore()
      .collection("users")
      .doc(destUser.key)
      .collection("conversas")
      .doc(user)

    TranslatorConfiguration.setConfig(
      ProviderTypes.Google,
      "AIzaSyC0j0BsAskqVIvaX2fcdvjsaw4fqGP5ut8",
      "en"
    )
  }

  componentDidMount() {
    const { navigation } = this.props
    const { isMounted } = this.state
    Alert.alert("Testando apenas", navigation.state.routeName)

    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)
    this.unsubscribe = this.ref
      .collection("messages")
      .orderBy("date", "asc")
      .onSnapshot(querySnapshot => {
        const messages = []
        querySnapshot.forEach(doc => {
          if (doc.exists) {
            const { content, contentTranslated, date, source } = doc.data()
            messages.push({
              key: doc.id,
              content,
              contentTranslated,
              date: date.toDate(),
              source
            })
          }
          if (isMounted) {
            this.ref.get().then(conversa => {
              if (conversa.exists) {
                this.ref.update({ unreadMsgs: false, numUnreadMsgs: 0 })
              }
            })
          }
        })
        this.setState({ messages })
      })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress)
  }

  handleBackPress = () => {
    const { navigation } = this.props
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName: "Conversas"
        })
      ]
    })
    this.setState({ isMounted: false })
    navigation.dispatch(resetAction)
    return true
  }

  onChangeHandler = text => {
    this.setState({ messageText: text, isValueNull: false })
  }

  proccessLastMsg = string => {
    let strProcs = ""
    if (string.length >= 25) {
      strProcs = `${string.substr(0, 25)}...`
    } else {
      strProcs = string
    }
    return strProcs
  }

  sendMessage = () => {
    const { destUser, user, messageText } = this.state
    if (messageText === "") {
      this.setState({ isValueNull: true })
    } else {
      const newMessage = {
        content: messageText,
        date: firebase.database().getServerTime(),
        source: "1"
      }

      this.ref.get().then(doc => {
        if (!doc.exists) {
          this.ref.set({
            userKey: destUser.key,
            unreadMsgs: false,
            numUnreadMsgs: 0,
            lastMessage: this.proccessLastMsg(newMessage.content),
            dateLastMessage: newMessage.date
          })
        } else {
          this.ref.update({
            lastMessage: this.proccessLastMsg(newMessage.content),
            dateLastMessage: newMessage.date
          })
        }
      })

      this.ref
        .collection("messages")
        .add({
          content: newMessage.content,
          date: newMessage.date,
          source: newMessage.source
        })
        .then(() => true)
        .catch(error => error)

      const translator = TranslatorFactory.createTranslator()
      translator.translate(messageText, "en").then(translated => {
        this.refDest.get().then(doc => {
          if (!doc.exists) {
            this.refDest.set({
              userKey: user,
              unreadMsgs: true,
              numUnreadMsgs: 1,
              lastMessage: this.proccessLastMsg(translated),
              dateLastMessage: newMessage.date
            })
          } else {
            const { numUnreadMsgs } = doc.data()
            this.refDest.update({
              numUnreadMsgs: numUnreadMsgs + 1,
              unreadMsgs: true,
              lastMessage: this.proccessLastMsg(translated),
              dateLastMessage: newMessage.date
            })
          }
        })
        this.refDest
          .collection("messages")
          .add({
            content: newMessage.content,
            date: newMessage.date,
            contentTranslated: translated,
            source: "2"
          })
          .then(() => true)
          .catch(error => error)
      })

      this.setState({ messageText: "", isValueNull: true })
    }
  }

  render() {
    const { messages, messageText, isValueNull, destUser } = this.state
    const { navigation } = this.props
    // firebase.auth().signOut()
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <ChatHeader
          userName={destUser.contactName}
          userPhoto={destUser.profile_img_url}
          navigation={navigation}
        />
        <View style={styles.chatContainer}>
          <ChatContainer messages={messages} />
        </View>
        <View style={styles.input}>
          <ChatInput
            value={messageText}
            onPress={this.sendMessage}
            onChangeHandler={text => this.onChangeHandler(text)}
            isValueNull={isValueNull}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E3E3"
  },

  input: {
    alignContent: "center",
    flex: 0,
    justifyContent: "flex-end",
    marginBottom: 10
  },
  chatContainer: {
    flex: 1
  }
})
