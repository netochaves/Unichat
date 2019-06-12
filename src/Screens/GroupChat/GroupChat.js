import React, { Component } from "react"
import { View, StyleSheet } from "react-native"

import ChatHeader from "~/Components/Chat/chatHeader"
import ChatContainer from "~/Components/Chat/chatContainer"
import ChatInput from "~/Components/Chat/chatInput"

export default class GroupChat extends Component {
  constructor(props) {
    super(props)
    const { navigation } = this.props
    this.state = {
      messageText: "",
      groupName: navigation.getParam("text"),
      groupImg: navigation.getParam("img"),
      messages: []
    }
  }

  onChangeHandler = text => {
    this.setState({ messageText: text, isValueNull: false })
  }

  sendMessage = () => {}

  render() {
    const {
      messages,
      messageText,
      isValueNull,
      groupName,
      groupImg
    } = this.state
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <ChatHeader
          userName={groupName}
          userPhoto={groupImg.uri}
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
