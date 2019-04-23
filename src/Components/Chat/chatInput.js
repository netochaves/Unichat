import React, { Component } from "react"

import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { NativeViewGestureHandler } from "react-native-gesture-handler";

const { width: WIDTH } = Dimensions.get("window")

export default class MessageInput extends Component  {
  constructor (props) {
    super(props);
    this.state = {
      value: '',
      height: 40
    }
  }  

  updtSize = (height) => {
    this.setState({
    height
    });
  }
  render (){
  const {onPress} = this.props;
  const {value, height} = this.state;

  let newStyle = {
    height,
    fontSize: 14,
    width: WIDTH - 55
  }
    return (
       <View style={styles.container}>
      <TextInput
        style={[newStyle]}       
        onChangeText={(value) => this.setState({value})}
        placeholder="Escreva uma mensagem"
        autoComplete="off"
        editable={true}
        multiline={true}
        value={value}
        onContentSizeChange={(e) => this.updtSize(e.nativeEvent.contentSize.height)}
      />
      <TouchableOpacity onPress={onPress}>
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

