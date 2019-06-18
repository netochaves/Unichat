import React from "react"

import { View, StyleSheet, Text } from "react-native"
import { Avatar } from "react-native-elements"
import Touchable from "react-native-platform-touchable"
import { scale } from "~/Components/responsive"

const Contato = props => {
  const { item, onPress } = props

  return (
    <Touchable
      style={styles.button}
      background={Touchable.SelectableBackground()}
      onPress={() => onPress(item)}
    >
      <View style={styles.contato}>
        <Avatar
          containerStyle={styles.avatar}
          rounded
          source={{ uri: item.contactPhoto }}
          size="medium"
        />
        <View style={styles.mainInformation}>
          <Text style={styles.name}>{item.contactName}</Text>
          <Text style={styles.phone}>{item.phoneNumbers[0].number}</Text>
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
  contato: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 1
  },
  avatar: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10
  },
  mainInformation: {
    flex: 1,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 15
  },
  name: {
    position: "absolute",
    top: 0,
    fontSize: scale(14)
  },
  phone: {
    position: "absolute",
    bottom: 0,
    color: "#a9a9a9",
    fontSize: scale(10)
  }
})

export default Contato
