import React from "react"

import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native"
import { Avatar, Icon } from "react-native-elements"
import firebase from "react-native-firebase"
import getTime from "~/functions/getTime"

const chatHeader = props => {
  const { userName, userPhoto, navigation, refDestDatabase } = props

  const parseTime = dateNanoScds => {
    const date = dateNanoScds.toDate()
    const atualDate = firebase.database().getServerTime()
    let textDate = ""
    if (atualDate.getDate() - date.getDate() === 0) {
      textDate = `Visto por último hoje às ${getTime(date)}`
    } else if (atualDate.getDate() - date.getDate() === 1) {
      textDate = `Visto por último ontem às ${getTime(date)}`
    } else if (atualDate.getDate() - date.getDate() >= 2) {
      textDate = `Visto por último em ${date
        .getDate()
        .toString()}/${date
        .getMonth()
        .toString()}/${date.getFullYear().toString()}`
    }
    return textDate
  }

  const getLastSeen = () => {
    firebase
      .database()
      .ref(`users/${refDestDatabase}`)
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          const date = snapshot.val().lastSeen
          Alert.alert("Eoq", parseTime(date))
          return parseTime(date)
        }
        return true
      })
  }

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Icon name="ios-arrow-back" color="#00aced" type="ionicon" />
        </TouchableOpacity>
        <Avatar
          containerStyle={styles.avatar}
          rounded
          source={{ uri: userPhoto }}
          size={40}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.lastSeen}>{getLastSeen()}</Text>
        </View>
        <Icon
          containerStyle={styles.moreInfo}
          name="dots-vertical"
          type="material-community"
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    elevation: 5
  },
  headerContent: {
    justifyContent: "space-between",
    alignContent: "center",
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    flexDirection: "row"
  },
  userInfo: {
    flex: 1,
    marginLeft: 10
  },
  userName: {
    fontSize: 18
  },
  lastSeen: {
    fontSize: 10
  },
  moreInfo: {
    marginTop: 10,
    right: 0
  },
  avatar: {
    marginLeft: 10
  },
  back: {
    justifyContent: "center"
  }
})

export default chatHeader
