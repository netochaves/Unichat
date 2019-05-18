import React from "react"

import { View, TextInput, StyleSheet } from "react-native"
import { Icon } from "react-native-elements"

const Components = props => {
  const { searchHandler, text } = props
  return (
    <View style={styles.container}>
      <View style={styles.itens}>
        <Icon
          containerStyle={styles.arrowIcon}
          name="arrowleft"
          type="antdesign"
          color="#00aced"
        />
        <TextInput
          style={styles.input}
          onChangeText={searchHandler}
          placeholder="Pesquisar..."
          value={text}
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
