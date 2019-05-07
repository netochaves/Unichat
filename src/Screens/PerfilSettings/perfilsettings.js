import React, { Component } from "react"

import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Picker,
  StyleSheet,
  Dimensions
} from "react-native"
import { Icon } from "react-native-elements"
import shortid from "shortid"
import LinearGradient from "react-native-linear-gradient"
import profileImage from "../../assets/imgs/profile-placeholder.png"
import languagelist from "../../assets/languages/languages"

export default class PerfilSettings extends Component {
  constructor() {
    super()
    this.state = {
      language: [],
      code: "",
      img: profileImage
    }
  }

  componentDidMount() {
    this.setState({ language: languagelist })
  }

  previewImage = () => {
    const { navigation } = this.props
    const { img } = this.state
    navigation.navigate("PreviewImage", { img })
  }

  render() {
    const { language, code, img } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.Titulo}>Configurações de Perfil</Text>
        <View style={styles.image}>
          <TouchableOpacity
            onPress={() => {
              this.previewImage()
            }}
          >
            <Image source={img} style={styles.imagePlaceHolder} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundbutton}>
            <Icon name="create" />
          </TouchableOpacity>
        </View>
        <Text style={styles.labeltext}>Nome:</Text>
        <TextInput style={styles.entrada} placeholder="Digite seu nome" />
        <Text style={styles.labeltext}>Email:</Text>
        <TextInput style={styles.entrada} placeholder="Digite seu e-mail" />
        <Text style={styles.labeltext}>Idiomas:</Text>
        <View style={styles.languagePicker}>
          <Picker
            selectedValue={code}
            onValueChange={itemValue => this.setState({ code: itemValue })}
          >
            <Picker.Item label="Escolha seu idioma" value="" />
            {language.map(item => (
              <Picker.Item
                label={`${item.name}`}
                value={item.code}
                key={shortid.generate()}
              />
            ))}
          </Picker>
        </View>
        <LinearGradient colors={["#547BF0", "#6AC3FB"]} style={styles.button}>
          <Text style={styles.textButton}>Avançar</Text>
        </LinearGradient>
      </View>
    )
  }
}

const comprimento = Dimensions.get("window").width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "OpenSans"
  },
  Titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    alignSelf: "center",
    marginTop: 10
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    width: (comprimento - 50) / 2,
    height: (comprimento - 50) / 2,
    marginTop: 10,
    borderRadius: (comprimento - 50) / 4,
    borderColor: "#6AC3FB",
    borderWidth: 2,
    alignSelf: "center"
  },
  imagePlaceHolder: {
    width: (comprimento - 54) / 2,
    height: (comprimento - 54) / 2,
    borderRadius: (comprimento - 54) / 4
  },
  roundbutton: {
    borderWidth: 1,
    borderColor: "#6AC3FB",
    justifyContent: "center",
    height: 40,
    backgroundColor: "#6AC3FB",
    borderRadius: 20,
    width: 40,
    position: "absolute",
    right: 0,
    bottom: 0
  },
  languagePicker: {
    marginTop: 5,
    borderBottomWidth: 2,
    borderColor: "#6AC3FB",
    marginLeft: 40,
    marginRight: 40
  },
  button: {
    borderRadius: 20,
    justifyContent: "center",
    height: 60,
    marginTop: 40,
    marginLeft: 40,
    marginRight: 40
  },
  textButton: {
    alignSelf: "center",
    fontSize: 20,
    color: "white"
  },
  labeltext: {
    marginTop: 20,
    fontWeight: "bold",
    color: "black",
    marginLeft: 40,
    marginRight: 40
  },
  entrada: {
    borderBottomWidth: 2,
    borderColor: "#6AC3FB",
    marginLeft: 40,
    marginRight: 40
  }
})
