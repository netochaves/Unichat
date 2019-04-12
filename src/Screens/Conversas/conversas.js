/* eslint-disable object-curly-newline */
/* eslint-disable arrow-parens */
import React, { Component } from "react"

import { View, StyleSheet, Dimensions, StatusBar, Text } from "react-native"
import { Avatar, Icon } from "react-native-elements"
import { ScrollView } from "react-native-gesture-handler"
import MessageInput from "../../Components/MessageInput"
import Message from "../../Components/mensagem"

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window")

export default class Conversas extends Component {
  constructor() {
    super()
    this.scrollView = null
  }

  state = {}

  render() {
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
            <Message content="Soso is a bitch" source="2" date="8:45pm" />
          </ScrollView>
        </View>
        <View style={styles.input}>
          <MessageInput onPress={text => this.sendMessage(text)} />
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
