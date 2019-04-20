/* eslint-disable object-curly-newline */
import React, { Component } from "react"

import { View, StyleSheet, Dimensions, StatusBar, Text } from "react-native"
import { Avatar, Icon } from "react-native-elements"
import { ScrollView } from "react-native-gesture-handler"
import shortid from "shortid"
import firebase from "react-native-firebase"

import MessageInput from "../../Components/MessageInput"
import Message from "../../Components/mensagem"

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window")

export default class Conversas extends Component {
  constructor() {
    super()
    this.scrollView = null
    this.state = {
      messageText: "",
      messages: []
    }
    // This line right here needs to be changed later
    this.ref = firebase.firestore().collection("Messages")
  }

  componentDidMount() {
    this.unsubscribe = this.ref
      .orderBy("date", "asc")
      .onSnapshot(querySnapshot => {
        const messages = []
        querySnapshot.forEach(doc => {
          const { content, date, source } = doc.data()
          messages.push({
            key: doc.id,
            content,
            date,
            source
          })
        })
        this.setState({ messages })
      })
  }

  onChangeHandler = text => {
    this.setState({ messageText: text })
  }

  sendMessage = () => {
    const { messageText, messages } = this.state
    const newMessage = {
      content: messageText,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      source: "1"
    }

    this.ref
      .add({
        content: newMessage.content,
        date: newMessage.date,
        source: newMessage.source
      })
      .then(() => true)
      .catch(error => error)

    this.setState({ messages: [...messages, newMessage] })
    this.setState({ messageText: "" })
  }

  getTime = date => {
    let TimeType
    let hour
    let minutes

    hour = date.getHours()
    if (hour <= 11) {
      TimeType = "AM"
    } else {
      TimeType = "PM"
    }
    if (hour > 12) {
      hour -= 12
    }
    if (hour === 0) {
      hour = 12
    }
    minutes = date.getMinutes()
    if (minutes < 10) {
      minutes = 0 + minutes.toString()
    }
    return `${hour.toString()} : ${minutes.toString()} ${TimeType.toString()}`
  }

  render() {
    const { messages, messageText } = this.state
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Avatar rounded title="NC" size={40} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Neto Chaves</Text>
              <Text style={styles.lastSeen}>Visto por ultimos às 8:10pm</Text>
            </View>
            <Icon
              containerStyle={styles.moreInfo}
              name="dots-vertical"
              type="material-community"
            />
          </View>
        </View>
        <View style={styles.messageContainer}>
          <ScrollView
            ref={ref => {
              this.scrollView = ref
            }}
            onContentSizeChange={() => {
              this.scrollView.scrollToEnd({ animated: true })
            }}
          >
            {messages.map(message => (
              <Message
                key={shortid.generate()}
                content={message.content}
                date={this.getTime(message.date.toDate())}
                source={message.source}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.input}>
          <MessageInput
            value={messageText}
            onPress={this.sendMessage}
            onChangeHandler={text => this.onChangeHandler(text)}
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
  header: {
    width: WIDTH,
    height: HEIGHT - 600,
    backgroundColor: "#fff",
    elevation: 5
  },
  input: {
    alignContent: "center",
    flex: 0,
    justifyContent: "flex-end",
    marginBottom: 10
  },
  headerContent: {
    flex: 1,
    left: 40,
    top: 20,
    flexDirection: "row"
  },
  userInfo: {
    marginLeft: 10
  },
  userName: {
    fontSize: 18
  },
  lastSeen: {
    fontSize: 10
  },
  moreInfo: {
    flex: 1,
    top: 5,
    left: 60
  },
  messageContainer: {
    flex: 1
  }
})
