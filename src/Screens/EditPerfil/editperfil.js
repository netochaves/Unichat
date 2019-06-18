/* eslint-disable react-native/no-inline-styles */
/* eslint-disable camelcase */
import React, { Component } from "react"
import {
  View,
  StyleSheet,
  Text,
  Image,
  BackHandler,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  TextInput,
  Alert
} from "react-native"
import Touchable from "react-native-platform-touchable"
import AsyncStorage from "@react-native-community/async-storage"
import firebase from "react-native-firebase"
import LinearGradient from "react-native-linear-gradient"
import { Icon } from "react-native-elements"
import ImagePicker from "react-native-image-picker"
import { scale } from "~/Components/responsive"

export default class Conversas extends Component {
  constructor() {
    super()
    this.state = {
      myImage: {
        uri: null
      },
      myName: null,
      email: "",
      phone: "",
      uploading: false,
      disabled: false,
      editName: false,
      editEmail: false,
      emailTemp: "",
      nameTemp: ""
    }

    this.user = firebase.auth().currentUser

    this.ref = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)
    this.ref.get().then(doc => {
      if (doc.exists) {
        const { profile_img_url, username, email, phone } = doc.data()
        this.setState({
          myImage: { uri: profile_img_url },
          myName: username,
          email,
          phone
        })
      }
    })
  }

  componentWillUnmount() {
    this.setState({ uploading: false })
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress)
  }

  handleBackPress = () => {
    const { navigation } = this.props
    const { disabled } = this.state
    if (!disabled) {
      navigation.navigate("SettingsScreen")
    }
    return true
  }

  uploadphotos = () => {
    const { myImage } = this.state
    this.setState({ uploading: true })
    const { navigation } = this.props

    firebase
      .storage()
      .ref(`profile_pics/${this.user.uid}`)
      .putFile(myImage.path)
      .on(firebase.storage.TaskEvent.STATE_CHANGED, async snapshot => {
        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
          if (navigation.isFocused()) {
            this.setState({ uploading: false })
          }
        }
        await AsyncStorage.setItem("@profileImageUrl", snapshot.downloadURL)
        firebase
          .firestore()
          .collection("users")
          .doc(this.user.uid)
          .update({
            profile_img_url: snapshot.downloadURL
          })
      })
  }

  handleChooseImage = () => {
    const options = {
      noData: true,
      title: "Escolha uma foto",
      cancelButtonTitle: "Sair",
      takePhotoButtonTitle: "Tirar uma foto",
      chooseFromLibraryButtonTitle: "Escolha uma foto da galeria"
    }

    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        if (response.fileSize <= 600000) {
          this.setState({ myImage: response })
          this.uploadphotos()
        } else {
          Alert.alert(
            "Erro",
            "Selecione uma foto com tamanho inferior a 600 kB"
          )
        }
      }
    })
  }

  handleEditName = () => {
    const { myName } = this.state
    this.setState({ editName: true, nameTemp: myName })
  }

  handleEditEmail = () => {
    const { email } = this.state
    this.setState({ editEmail: true, emailTemp: email })
  }

  cancelEditName = () => {
    this.setState({ editName: false })
  }

  cancelEditEmail = () => {
    this.setState({ editEmail: false })
  }

  confirmName = async () => {
    const { nameTemp } = this.state
    this.setState({ editName: false, myName: nameTemp })
    firebase
      .firestore()
      .collection("users")
      .doc(this.user.uid)
      .update({
        username: nameTemp
      })
    await AsyncStorage.setItem("@username", nameTemp)
  }

  confirmEmail = () => {
    const { emailTemp } = this.state
    this.setState({ editEmail: false, email: emailTemp })

    firebase
      .firestore()
      .collection("users")
      .doc(this.user.uid)
      .update({
        email: emailTemp
      })
  }

  previewImage = () => {
    const { navigation } = this.props
    const { myImage } = this.state
    const img = myImage
    navigation.navigate("PreviewImage", { img })
  }

  render() {
    const {
      myImage,
      myName,
      uploading,
      editName,
      editEmail,
      email,
      phone,
      nameTemp,
      emailTemp
    } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Touchable
              background={Touchable.SelectableBackgroundBorderless()}
              style={styles.back}
              onPress={this.handleBackPress}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Icon name="md-arrow-back" color="#00aced" type="ionicon" />
            </Touchable>
            <Text style={styles.perfilInfo}>Perfil</Text>
          </View>
        </View>
        {editName && (
          <View style={styles.editNameContainer}>
            <View style={styles.editNameMenu}>
              <Text style={styles.editMenuTitle}>Digite o nome</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Digite aqui"
                autoFocus
                value={nameTemp}
                onChangeText={text => {
                  this.setState({ nameTemp: text })
                }}
              />
              <View style={styles.options}>
                <View style={styles.editMenuButton}>
                  <TouchableOpacity onPress={this.confirmName}>
                    <Text style={styles.editMenuButtonText}>SALVAR</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.editMenuButton}>
                  <TouchableOpacity onPress={this.cancelEditName}>
                    <Text style={styles.editMenuButtonText}>VOLTAR</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
        {editEmail && (
          <View style={styles.editNameContainer}>
            <View style={styles.editNameMenu}>
              <Text style={styles.editMenuTitle}>Digite o email</Text>
              <TextInput
                keyboardType="email-address"
                style={styles.textInput}
                placeholder="Digite aqui"
                autoFocus
                value={emailTemp}
                onChangeText={text => {
                  this.setState({ emailTemp: text })
                }}
              />
              <View style={styles.options}>
                <View style={styles.editMenuButton}>
                  <TouchableOpacity onPress={this.confirmEmail}>
                    <Text style={styles.editMenuButtonText}>SALVAR</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.editMenuButton}>
                  <TouchableOpacity onPress={this.cancelEditEmail}>
                    <Text style={styles.editMenuButtonText}>VOLTAR</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}

        <View style={styles.elevationBody}>
          <View style={styles.editImage}>
            <TouchableOpacity
              onPress={() => {
                this.previewImage()
              }}
            >
              {myImage && (
                <Image
                  source={myImage}
                  style={styles.imagePlaceHolder}
                  blurRadius={uploading ? 5 : 0}
                />
              )}
              {uploading && (
                <ActivityIndicator
                  size={64}
                  color="#6AC3FB"
                  style={styles.loadingIcon}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconImage}
              onPress={this.handleChooseImage}
            >
              <LinearGradient
                colors={["#547BF0", "#6AC3FB"]}
                style={styles.linearIconImage}
              >
                <Icon name="create" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.editBox}>
            <Text style={styles.rotulo}>Nome</Text>
            <Text style={styles.label}>{myName}</Text>
            <Touchable
              background={Touchable.SelectableBackgroundBorderless()}
              style={styles.iconName}
              onPress={this.handleEditName}
            >
              <Icon name="create" iconStyle={{ color: "#616161" }} />
            </Touchable>
          </View>
          <View style={styles.editBox}>
            <Text style={styles.rotulo}>Email</Text>
            <Text style={styles.label}>{email}</Text>
            <Touchable
              background={Touchable.SelectableBackgroundBorderless()}
              style={styles.iconName}
              onPress={this.handleEditEmail}
            >
              <Icon name="create" iconStyle={{ color: "#616161" }} />
            </Touchable>
          </View>
          <View style={styles.editBox}>
            <Text style={styles.rotulo}>Telefone</Text>
            <Text style={styles.label}>{phone}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const screenWidth = Dimensions.get("window").width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F8",
    fontFamily: "OpenSans"
  },
  header: {
    backgroundColor: "#fff",
    elevation: 5,
    marginTop: 0,
    fontFamily: "OpenSans"
  },
  headerContent: {
    flexDirection: "row",
    alignContent: "center",
    marginBottom: 15,
    marginTop: 15
  },
  perfilInfo: {
    fontSize: scale(20),
    textAlign: "left",
    marginLeft: 10
  },
  editImage: {
    justifyContent: "center",
    alignItems: "center",
    width: (screenWidth - 50) / 2,
    height: (screenWidth - 50) / 2,
    marginTop: 25,
    borderRadius: (screenWidth - 50) / 4,
    borderColor: "#6AC3FB",
    borderWidth: 2,
    alignSelf: "center"
  },
  imagePlaceHolder: {
    width: (screenWidth - 54) / 2,
    height: (screenWidth - 54) / 2,
    borderRadius: (screenWidth - 54) / 4
  },
  editBox: {
    marginTop: 20,
    backgroundColor: "white",
    borderBottomWidth: 2,
    borderColor: "#6AC3FB",
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15
  },
  label: {
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 15,
    fontSize: scale(16),
    color: "black"
  },
  iconImage: {
    justifyContent: "center",
    height: 40,
    borderRadius: 20,
    width: 40,
    position: "absolute",
    right: 5,
    bottom: 5
  },
  iconName: {
    marginRight: 5,
    justifyContent: "center",
    height: 40,
    width: 40
  },
  loadingIcon: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  editNameMenu: {
    elevation: 20,
    padding: 15,
    backgroundColor: "white",
    borderWidth: 0.1,
    borderRadius: 15,
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 2
  },
  textInput: {
    borderBottomWidth: 2,
    borderColor: "#6AC3FB"
  },
  options: {
    marginTop: 25,
    marginBottom: 25,
    flexDirection: "row"
  },
  editMenuTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: scale(14)
  },
  editMenuButton: {
    flex: 1,
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginLeft: 10
    // backgroundColor: "green"
  },
  editMenuButtonText: {
    color: "#6AC3FB",
    fontWeight: "bold"
  },
  elevationBody: {
    zIndex: 1,
    flex: 1,
    elevation: 5,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    backgroundColor: "#fff"
  },
  back: {
    justifyContent: "center",
    width: 40,
    marginLeft: 10
  },
  editNameContainer: {
    elevation: 6,
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "#00000090",
    zIndex: 2
  },
  rotulo: {
    position: "absolute",
    left: 0,
    top: 0,
    fontSize: scale(12),
    marginLeft: 2,
    color: "#6AC3FB"
  },
  linearIconImage: {
    height: 40,
    justifyContent: "center",
    borderRadius: 20,
    width: 40
  }
})
