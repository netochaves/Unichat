/* eslint-disable react-native/split-platform-components */
import React, { Component } from "react"
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  BackHandler
} from "react-native"
import LanguagesHeader from "~/Components/Languages/languagesHeader"
import { CheckBox } from "react-native-elements"
import firebase from "react-native-firebase"
import data from "~/assets/languages/languages.json"

export default class Languages extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: [],
      currentLanguageName: "",
      checkBoxIndex: -1,
      checkBox: true,
      disabled: false
    }
    this.user = firebase.auth().currentUser

    this.ref = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)

    this.setState({
      dataSource: data
    })

    this.ref.get().then(doc => {
      this.updateLanguageName(doc.data().language_code)
    })
  }

  componentWillUnmount() {
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

  changeLanguage = item => {
    firebase
      .firestore()
      .collection("users")
      .doc(this.user.uid)
      .update({ language_code: item.code })

    this.updateLanguageName(item.code)
    ToastAndroid.show("Idioma alterado com sucesso!", ToastAndroid.SHORT)
  }

  updateLanguageName = code => {
    const { dataSource } = this.state
    dataSource.map((languages, index) => {
      if (languages.code === code) {
        this.setState({
          currentLanguageName: languages.name,
          checkBoxIndex: index
        })
      }
      return true
    })
  }

  render() {
    const {
      currentLanguageName,
      dataSource,
      checkBox,
      checkBoxIndex
    } = this.state
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        <LanguagesHeader navigation={navigation} />
        <View style={styles.headerTitle}>
          <Text style={styles.headerText}>Idioma atual</Text>
          <Text style={styles.itemTextHeader}>{currentLanguageName}</Text>
          <Text style={styles.headerText}>Selecione um idioma</Text>
        </View>
        <View style={styles.container}>
          <FlatList
            data={dataSource}
            keyExtractor={item => item.id}
            extraData={this.state}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => this.changeLanguage(item)}
                >
                  <Text style={styles.itemText}>{item.name}</Text>
                  <View style={styles.checkBoxView}>
                    <CheckBox
                      checkedColor="#00aced"
                      size={26}
                      checkedIcon="check-circle"
                      uncheckedIcon="circle-o"
                      checked={index === checkBoxIndex ? checkBox : !checkBox}
                      onPress={() => this.changeLanguage(item)}
                    />
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F8"
  },
  itemTextHeader: {
    backgroundColor: "#fff",
    fontSize: 18,
    paddingTop: 15,
    paddingLeft: 20,
    paddingBottom: 15
  },
  itemText: {
    fontSize: 18
  },
  headerTitle: {
    backgroundColor: "#F4F5F8"
  },
  headerText: {
    fontSize: 24,
    alignSelf: "flex-start",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20
  },
  buttonStyle: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    paddingLeft: 20
  },
  checkBoxView: {
    flex: 1,
    paddingRight: 10,
    alignItems: "flex-end"
  }
})
