import React from "react"

import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native"
import Icon from "react-native-vector-icons/Feather"

const { width: WIDTH } = Dimensions.get("window")

const MessageInput = props => {
  const { onChangeHandler, onPress } = props
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeHandler}
        placeholder="Escreva uma mensagem"
        autoComplete="off"
        multiline
      />
      <TouchableOpacity onPress={onPress}>
        <View style={styles.CircleShapeView}>
          <Icon style={styles.icon} name="send" size={22} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    margin: 5,
    borderColor: "#BCC4C5",
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "#ffffff"
  },
  CircleShapeView: {
    alignContent: "center",
    justifyContent: "center",
    top: 5,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: "#00BCD4"
  },
  input: {
    width: WIDTH - 55,
    height: 40,
    fontSize: 14
  },
  icon: {
    position: "absolute",
    top: 5,
    left: 2
  }
})

export default MessageInput
