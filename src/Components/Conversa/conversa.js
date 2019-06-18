import React from "react"

import { View, StyleSheet, Text } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import getTime from "~/functions/getTime"
import firebase from "react-native-firebase"
import { Avatar } from "react-native-elements"
import Touchable from "react-native-platform-touchable"
import { scale } from "~/Components/responsive"

const conversa = props => {
  const { item, onPress, onLongPress } = props

  const parseTime = dateNanoScds => {
    const date = dateNanoScds.toDate()
    const atualDate = firebase.database().getServerTime()
    let textDate = ""
    if (atualDate.getDate() - date.getDate() === 0) {
      textDate = getTime(date)
    } else if (atualDate.getDate() - date.getDate() === 1) {
      textDate = "Ontem"
    } else if (atualDate.getDate() - date.getDate() >= 2) {
      textDate = `${date.getDate().toString()}/${(
        date.getMonth() + 1
      ).toString()}/${date.getFullYear().toString()}`
    }
    return textDate
  }

  return (
    <Touchable
      style={styles.button}
      background={Touchable.SelectableBackground()}
      onPress={() => onPress(item)}
      onLongPress={() => onLongPress(item)}
    >
      <View style={styles.conversa}>
        <Avatar
          containerStyle={styles.avatar}
          rounded
          source={{ uri: item.contactPhoto }}
          size="medium"
        />
        <View style={styles.mainInformation}>
          <Text style={styles.name}>{item.contactName}</Text>
          <Text style={styles.lastMsg}>{item.lastMessage}</Text>
        </View>
        <View style={styles.rightInformation}>
          <Text style={styles.data}>{parseTime(item.dateLastMessage)}</Text>
          {item.unreadMsgs && (
            <LinearGradient colors={["#547BF0", "#6AC3FB"]} style={styles.cont}>
              <Text style={styles.unread}>{item.numUnreadMsgs}</Text>
            </LinearGradient>
          )}
        </View>
      </View>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    marginBottom: 1
  },
  conversa: {
    flexDirection: "row",
    width: "100%"
  },
  avatar: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10
  },
  mainInformation: {
    flex: 1,
    marginRight: 60,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 15
  },
  name: {
    position: "absolute",
    top: 0
  },
  lastMsg: {
    position: "absolute",
    bottom: 0,
    color: "#a9a9a9",
    fontSize: scale(12)
  },
  cont: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 5
  },
  data: {
    fontSize: scale(8)
  },
  unread: {
    fontWeight: "bold",
    fontSize: scale(8),
    alignSelf: "center",
    color: "white"
  },
  rightInformation: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: 0,
    marginRight: 10,
    top: "50%",
    bottom: "50%"
  }
})

export default conversa
