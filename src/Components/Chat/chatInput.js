import React, { Component } from "react"

import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native"
import Icon from "react-native-vector-icons/Feather"

const { width: WIDTH } = Dimensions.get("window")

export default class MessageInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 40
    }
  }

  updtSize = height => {
    this.setState({
      height
    })
  }

  render() {
    const { onPress, value, onChangeHandler, isValueNull } = this.props
    const { height } = this.state

    const newStyle = {
      height,
      fontSize: 14,
      width: WIDTH - 60
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={[newStyle]}
          value={value}
          maxHeight={90}
          onChangeText={onChangeHandler}
          placeholder="Escreva uma mensagem"
          autoComplete="off"
          editable
          multiline
          onContentSizeChange={e =>
            this.updtSize(e.nativeEvent.contentSize.height)
          }
        />
        <TouchableOpacity
          onPress={onPress}
          disabled={isValueNull}
          style={styles.sendbutton}
        >
          <View style={styles.CircleShapeView}>
            <Icon style={styles.icon} name="send" size={22} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
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
    right: 1,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: "#00BCD4"
  },
  icon: {
    position: "absolute",
    top: 5,
    left: 2
  },
  sendbutton: {
    alignSelf: "center",
    bottom: 5
  }
})
