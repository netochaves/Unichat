/* eslint-disable camelcase */
import React, { Component } from "react"
import { View, StyleSheet } from "react-native"

import ChatHeader from "~/Components/Chat/chatHeader"
import ChatContainer from "~/Components/Chat/chatContainer"
import ChatInput from "~/Components/Chat/chatInput"
import firebase from "react-native-firebase"
import {
  ProviderTypes,
  TranslatorConfiguration,
  TranslatorFactory
} from "react-native-power-translator"

export default class GroupChat extends Component {
  constructor(props) {
    super(props)
    const { navigation } = this.props
    this.state = {
      messageText: "",
      group: navigation.getParam("item"),
      messages: [],
      isValueNull: true
    }
    const { group } = this.state
    this.ref = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("conversas")
      .doc(group.key)

    TranslatorConfiguration.setConfig(
      ProviderTypes.Google,
      "AIzaSyC0j0BsAskqVIvaX2fcdvjsaw4fqGP5ut8",
      "en"
    )
  }

  componentDidMount() {
    this.unsubscribe = this.ref
      .collection("messages")
      .orderBy("date", "desc")
      .onSnapshot(querySnapshot => {
        const messages = []
        querySnapshot.forEach(doc => {
          const {
            content,
            contentTranslated,
            date,
            source,
            userName
          } = doc.data()
          messages.push({
            key: doc.id,
            content,
            contentTranslated,
            date: date.toDate(),
            source,
            userName
          })
          this.ref.get().then(group => {
            if (group.exists) {
              this.ref.update({ unreadMsgs: false, numUnreadMsgs: 0 })
            }
          })
        })
        this.setState({ messages })
      })
  }

  componentWillUnmount() {
    this.unsubscribe()
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

  sendMessage = async () => {
    const { group, messageText } = this.state

    if (messageText !== "" && messageText.replace(/\s/g, "").length) {
      const newMessage = {
        content: messageText,
        date: firebase.database().getServerTime(),
        source: "1"
      }

      this.ref.get().then(doc => {
        if (!doc.exists) {
          this.ref.set({
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

      const aux = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
      const { username } = aux.data()

      this.ref.collection("messages").add({
        content: newMessage.content,
        date: newMessage.date,
        source: newMessage.source
      })

      this.ref
        .collection("users")
        .get()
        .then(snapshot => {
          snapshot.forEach(async userDoc => {
            const { user } = userDoc.data()
            if (user !== firebase.auth().currentUser.uid) {
              this.userRef = firebase
                .firestore()
                .collection("users")
                .doc(user)
              const doc = await this.userRef.get()
              const { language_code } = doc.data()

              const docGroup = await this.userRef
                .collection("conversas")
                .doc(group.key)
                .get()

              const { numUnreadMsgs } = docGroup.data()
              TranslatorConfiguration.setConfig(
                ProviderTypes.Google,
                "AIzaSyC0j0BsAskqVIvaX2fcdvjsaw4fqGP5ut8",
                language_code
              )
              const translator = TranslatorFactory.createTranslator()
              const translated = await translator.translate(
                messageText,
                language_code
              )
              firebase
                .firestore()
                .collection("users")
                .doc(user)
                .collection("conversas")
                .doc(group.key)
                .update({
                  numUnreadMsgs: numUnreadMsgs + 1,
                  unreadMsgs: true,
                  lastMessage: this.proccessLastMsg(translated),
                  dateLastMessage: newMessage.date
                })
              firebase
                .firestore()
                .collection("users")
                .doc(user)
                .collection("conversas")
                .doc(group.key)
                .collection("messages")
                .add({
                  content: newMessage.content,
                  date: newMessage.date,
                  contentTranslated: translated,
                  source: "2",
                  isChanged: false,
                  userName: username
                })
            }
          })
        })
    } else {
      this.setState({ isValueNull: true })
    }
    this.setState({ messageText: "", isValueNull: true })
  }

  render() {
    const { messages, messageText, isValueNull, group } = this.state
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <ChatHeader
          userName={group.contactName}
          userPhoto={group.contactPhoto}
          navigation={navigation}
          status={null}
        />
        <View style={styles.chatContainer}>
          <ChatContainer messages={messages} destUserUid={null} />
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
