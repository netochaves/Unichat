import React, { Component } from "react"

import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Picker,
  StyleSheet,
  Dimensions,
  Alert,
  BackHandler
} from "react-native"
import { Icon } from "react-native-elements"
import firebase from "react-native-firebase"
import shortid from "shortid"
import LinearGradient from "react-native-linear-gradient"
import ImagePicker from "react-native-image-picker"
import profileImage from "../../assets/imgs/profile-placeholder.png"
import languagelist from "../../assets/languages/languages"

export default class PerfilSettings extends Component {
  constructor() {
    super()
    this.state = {
      language: [],
      code: "",
      img: profileImage,
      userName: "",
      eMail: "",
      profileImageUrl: ""
    }
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)
    this.setState({ language: languagelist })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress)
  }

  handleBackPress = () => {
    return true
  }

  confirmPerfilSettings = () => {
    const { navigation } = this.props
    const user = firebase.auth().currentUser
    const { userName, eMail, code, profileImageUrl } = this.state
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set({
        phone: user.phoneNumber,
        username: userName,
        email: eMail,
        language_code: code,
        profile_img_url: profileImageUrl
      })
    navigation.navigate("Conversas")
  }

  uploadphotos = () => {
    const user = firebase.auth().currentUser
    const { img } = this.state

    firebase
      .storage()
      .ref(`profile_pics/${user.uid}`)
      .putFile(img.path)
      .on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
        let state = {}
        state = {
          ...state,
          progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Progress bar
        }
        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
          Alert.alert("Image upload successful.")
          state = {
            uploading: false,
            progress: 0,
            profileImageUrl: snapshot.downloadURL
          }
        }

        this.setState(state)
      })
  }

  handleChooseImage = () => {
    const options = {
      noData: true,
      title: "Escolha uma foto"
    }

    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({ img: response })
        this.uploadphotos()
      }
    })
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
            {img && (
              <Image
                source={{ uri: img.uri }}
                style={styles.imagePlaceHolder}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.roundbutton}
            onPress={this.handleChooseImage}
          >
            <Icon name="create" />
          </TouchableOpacity>
        </View>
        <Text style={styles.labeltext}>Nome:</Text>
        <TextInput
          style={styles.entrada}
          onChangeText={text => this.setState({ userName: text })}
          placeholder="Digite seu nome"
        />
        <Text style={styles.labeltext}>Email:</Text>
        <TextInput
          style={styles.entrada}
          onChangeText={text => this.setState({ eMail: text })}
          placeholder="Digite seu e-mail"
        />
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
        <TouchableOpacity onPress={this.confirmPerfilSettings}>
          <LinearGradient colors={["#547BF0", "#6AC3FB"]} style={styles.button}>
            <Text style={styles.textButton}>Cadastrar</Text>
          </LinearGradient>
        </TouchableOpacity>
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
