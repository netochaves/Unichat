import React from "react"

import { View, TextInput, StyleSheet } from "react-native"
import { Icon } from "react-native-elements"
import Touchable from "react-native-platform-touchable"

const Components = props => {
  const { onChangeText, value, onBackPressHandler } = props
  return (
    <View style={styles.container}>
      <View style={styles.itens}>
        <Touchable
          background={Touchable.SelectableBackgroundBorderless()}
          onPress={onBackPressHandler}
        >
          <Icon
            containerStyle={styles.arrowIcon}
            name="md-arrow-back"
            type="ionicon"
            color="#00aced"
          />
        </Touchable>
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
