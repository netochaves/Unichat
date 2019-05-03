import React, { Component } from "react"

import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Picker,
  StyleSheet
} from "react-native"
import { Icon } from "react-native-elements"
import shortid from "shortid"
import LinearGradient from "react-native-linear-gradient"
import nouser from "../../assets/imgs/nouser.png"
import languagelist from "../../assets/languages/languages"

export default class PerfilSettings extends Component {
  static navigationoptions = {}

  constructor() {
    super()
    this.state = {
      language: [],
      code: ""
    }
  }

  componentDidMount() {
    this.setState({ language: languagelist })
  }

  render() {
    const { language, code } = this.state

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.Titulo}>Configurações de Perfil</Text>
          <View>
            <Image source={nouser} style={styles.image} />
            <TouchableOpacity style={styles.roundbutton}>
              <Icon name="create" />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={styles.labeltext}>Nome:</Text>
          <View>
            <TextInput style={styles.entrada} />
          </View>
        </View>

        <View>
          <Text style={styles.labeltext}>Email:</Text>
          <View>
            <TextInput style={styles.entrada} />
          </View>
        </View>

        <View>
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
        </View>

        <View>
          <LinearGradient colors={["#547BF0", "#6AC3FB"]} style={styles.button}>
            <Text style={styles.textButton}>Avançar</Text>
          </LinearGradient>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
    fontFamily: "OpenSans"
  },
  Titulo: {
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 30,
    marginLeft: 40,
    marginRight: 40,
    alignSelf: "center"
  },
  image: {
    justifyContent: "center",
    marginTop: 35,
    borderRadius: 30,
    borderColor: "#547BF0",
    marginLeft: 40,
    marginRight: 40,
    alignSelf: "center"
  },
  roundbutton: {
    borderWidth: 1,
    borderColor: "#6AC3FB",
    justifyContent: "center",
    height: 40,
    backgroundColor: "#6AC3FB",
    borderRadius: 20,
    marginLeft: 230,
    marginRight: 140
  },
  languagePicker: {
    borderBottomWidth: 2,
    borderColor: "#6AC3FB",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 5,
    marginBottom: 10
  },
  button: {
    borderRadius: 20,
    justifyContent: "center",
    marginTop: 20,
    height: 40,
    color: "#547BF0",
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 36
  },
  textButton: {
    alignSelf: "center",
    fontSize: 20,
    color: "white"
  },
  labeltext: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginTop: 25,
    marginLeft: 40,
    marginRight: 40
  },
  entrada: {
    marginTop: 5,
    marginBottom: 10,
    borderBottomWidth: 2,
    textAlign: "center",
    fontSize: 18,
    borderColor: "#6AC3FB",
    marginLeft: 40,
    marginRight: 40
  }
})
