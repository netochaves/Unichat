import React from "react"

import { View, StyleSheet, Text } from "react-native"
import { Avatar, Icon } from "react-native-elements"
import Touchable from "react-native-platform-touchable"

const chatHeader = props => {
  const { userName, userPhoto, navigation, status } = props

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Touchable
          background={Touchable.SelectableBackgroundBorderless()}
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.backButton}>
            <Icon name="md-arrow-back" color="#00aced" type="ionicon" />
            <Avatar
              containerStyle={styles.avatar}
              rounded
              source={{ uri: userPhoto }}
              size={40}
            />
          </View>
        </Touchable>
        <Touchable
          background={Touchable.SelectableBackground()}
          style={styles.userInfo}
          onPress={() =>
            navigation.navigate("PreviewImage", {
              img: userPhoto,
              name: userName,
              isLoggedIn: true
            })
          }
        >
          <View>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.lastSeen}>{status}</Text>
          </View>
        </Touchable>
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
  },
  backButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
})

export default chatHeader
