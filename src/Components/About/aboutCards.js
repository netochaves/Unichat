import React from "react"
import { View, StyleSheet, Text, Linking } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { Avatar } from "react-native-elements"
import LinearGradient from "react-native-linear-gradient"
import { scale } from "~/Components/responsive"

const aboutCards = props => {
  const { name, desc, avatar, socialMedia } = props

  const openURL = url => {
    Linking.openURL(url)
  }

  return (
    <LinearGradient colors={["#fff", "#F4F5F8"]} style={styles.cardView}>
      <Avatar
        rounded
        icon={{ name: "user", type: "font-awesome" }}
        source={avatar}
        size="medium"
      />
      <View style={styles.cardViewText}>
        <Text style={styles.titleTextStyle}>{name}</Text>
        <Text style={styles.bodyTextStyle}>{desc}</Text>
        <View style={styles.iconView}>
          <Icon
            name="twitter"
            size={30}
            color="#38A1F3"
            onPress={() => openURL(socialMedia.twitter)}
          />
          <Icon
            name="github"
            size={30}
            color="#333"
            onPress={() => openURL(socialMedia.github)}
          />
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  cardView: {
    elevation: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 15,
    flexDirection: "row"
  },
  iconView: {
    flexDirection: "row"
  },
  cardViewText: {
    marginLeft: 10
  },
  titleTextStyle: {
    fontSize: scale(14),
    fontFamily: "OpenSans",
    color: "#999295"
  },
  bodyTextStyle: {
    fontSize: scale(12),
    fontFamily: "OpenSans",
    color: "#999295"
  }
})

export default aboutCards
