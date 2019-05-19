import React from "react"

import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { Icon } from "react-native-elements"

const Components = props => {
  const { onChangeText, value, onBackPressHandler } = props
  return (
    <View style={styles.container}>
      <View style={styles.itens}>
        <TouchableOpacity onPress={onBackPressHandler}>
          <Icon
            containerStyle={styles.arrowIcon}
            name="arrowleft"
            type="antdesign"
            color="#00aced"
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          autoFocus
          placeholder="Pesquisar..."
          value={value}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    elevation: 5,
    marginTop: 0,
    fontFamily: "OpenSans"
  },
  input: {
    flex: 1,
    marginLeft: 10
  },
  itens: {
    marginLeft: 15,
    alignItems: "center",
    flexDirection: "row"
  }
})

export default Components
