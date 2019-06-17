/* eslint-disable react-native/no-inline-styles */
/* eslint-disable camelcase */
import React, { Component } from "react"

import {
  View,
  StyleSheet,
  StatusBar,
  BackHandler,
  ActivityIndicator
} from "react-native"
import {
  ProviderTypes,
  TranslatorConfiguration,
  TranslatorFactory
} from "react-native-power-translator"
import firebase from "react-native-firebase"
import ChatInput from "../../Components/Chat/chatInput"
import ChatHeader from "../../Components/Chat/chatHeader"
import ChatContainer from "../../Components/Chat/chatContainer"
import getTime from "~/functions/getTime"

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
      userData: null,
      isValueNull: true,
      destUser: navigation.getParam("item"),
      status: "",
      numMsgsRender: 20,
      isRefreshing: false,
      load: true
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

    this.userDest = firebase
      .firestore()
      .collection("users")
      .doc(destUser.key)

    firebase
      .firestore()
      .collection("users")
      .doc(user)
      .get()
      .then(us => {
        const { phone, profile_img_url } = us.data()
        this.setState({ userData: { phone, profile_img_url } })
      })

    TranslatorConfiguration.setConfig(
      ProviderTypes.Google,
      "AIzaSyC0j0BsAskqVIvaX2fcdvjsaw4fqGP5ut8",
      "en"
    )
  }

  componentDidMount() {
    const { numMsgsRender } = this.state
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)
    this.unsubscribeDest = this.userDest.onSnapshot(() => {
      this.getTime()
    })
    this.unsubscribe = this.ref
      .collection("messages")
      .orderBy("date", "desc")
      .limit(numMsgsRender)
      .onSnapshot(querySnapshot => {
        const messages = []
        querySnapshot.forEach(doc => {
          const { content, contentTranslated, date, source } = doc.data()
          messages.push({
            key: doc.id,
            content,
            contentTranslated,
            date: date.toDate(),
            source
          })
          this.ref.get().then(conversa => {
            if (conversa.exists) {
              this.ref.update({ unreadMsgs: false, numUnreadMsgs: 0 })
            }
          })
        })
        this.setState({ messages })
      })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress)
    this.unsubscribeDest()
    this.unsubscribe()
  }

  handleLoadMore = () => {
    const { numMsgsRender, load } = this.state

    this.ref
      .collection("messages")
      .get()
      .then(doc => {
        if (numMsgsRender >= doc.size) {
          this.setState({ load: false })
        } else {
          this.setState({ load: true })
        }
      })
    if (load) {
      this.setState({ isRefreshing: true })
      this.setState({ numMsgsRender: numMsgsRender + 30 })
      this.ref
        .collection("messages")
        .orderBy("date", "desc")
        .limit(numMsgsRender)
        .get()
        .then(doc => {
          const messages = []
          doc.forEach(msgs => {
            const { content, contentTranslated, date, source } = msgs.data()
            messages.push({
              key: msgs.id,
              content,
              contentTranslated,
              date: date.toDate(),
              source
            })
          })
          this.setState({ isRefreshing: false, messages })
        })
    }
  }

  handleBackPress = () => {
    const { navigation } = this.props
    navigation.goBack()
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
    const { destUser, user, messageText, userData } = this.state
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
            dateLastMessage: newMessage.date,
            contactName: destUser.contactName,
            contactPhoto: destUser.contactPhoto
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
      firebase
        .firestore()
        .collection("users")
        .doc(destUser.key)
        .get()
        .then(doc => {
          // eslint-disable-next-line camelcase
          const { language_code } = doc.data()
          TranslatorConfiguration.setConfig(
            ProviderTypes.Google,
            "AIzaSyC0j0BsAskqVIvaX2fcdvjsaw4fqGP5ut8",
            language_code
          )
          const translator = TranslatorFactory.createTranslator()
          translator.translate(messageText, language_code).then(translated => {
            this.refDest.get().then(conversa => {
              if (!conversa.exists) {
                this.refDest.set({
                  userKey: user,
                  unreadMsgs: true,
                  numUnreadMsgs: 1,
                  lastMessage: this.proccessLastMsg(translated),
                  dateLastMessage: newMessage.date,
                  contactName: userData.phone,
                  contactPhoto: userData.profile_img_url
                })
              } else {
                const { numUnreadMsgs } = conversa.data()
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
                source: "2",
                isChanged: false
              })
              .then(() => true)
              .catch(error => error)
          })
        })

      this.setState({ messageText: "", isValueNull: true })
    }
  }

  parseTime = dateNanoScds => {
    const date = dateNanoScds.toDate()
    const atualDate = firebase.database().getServerTime()
    let textDate = ""
    if (atualDate.getDate() - date.getDate() === 0) {
      textDate = `Visto por último hoje às ${getTime(date)}`
    } else if (atualDate.getDate() - date.getDate() === 1) {
      textDate = `Visto por último ontem às ${getTime(date)}`
    } else if (atualDate.getDate() - date.getDate() >= 2) {
      let day = ""
      let month = ""
      const year = date.getFullYear().toString()
      if (date.getDate() < 10) {
        day = `0${date.getDate().toString()}`
      } else {
        day = date.getDate().toString()
      }
      if (date.getMonth() < 10) {
        month = `0${date.getMonth().toString()}`
      } else {
        month = date.getMonth().toString()
      }
      textDate = `Visto por último em ${day}/${month.toString()}/${year}`
    }
    return textDate
  }

  getTime = () => {
    this.userDest.get().then(doc => {
      if (doc.data().online === true) {
        this.setState({ status: "Online" })
      } else {
        const date = doc.data().lastSeen
        this.setState({ status: this.parseTime(date) })
      }
    })
  }

  render() {
    const {
      messages,
      messageText,
      isValueNull,
      destUser,
      status,
      isRefreshing
    } = this.state
    const { navigation } = this.props
    // firebase.auth().signOut()
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <ChatHeader
          userName={destUser.contactName}
          userPhoto={destUser.contactPhoto}
          navigation={navigation}
          status={status}
        />
        <View style={styles.chatContainer}>
          {isRefreshing && (
            <View style={{ width: "100%" }}>
              <ActivityIndicator size="small" color="#0000ff" />
            </View>
          )}
          <ChatContainer
            onLoadMore={this.handleLoadMore}
            messages={messages}
            destUserUid={destUser.key}
          />
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
