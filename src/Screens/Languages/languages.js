import React, { Component } from "react"
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native"
import firebase from "react-native-firebase"
import data from "~/assets/languages/languages.json"

export default class Languages extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: [],
      currentLanguageName: ""
    }
    this.user = firebase.auth().currentUser

    this.ref = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
  }

  componentDidMount() {
    this.setState({
      dataSource: data
    })

    this.ref.get().then(doc => {
      this.updateLanguageName(doc.data().language_code)
    })
  }

  changeLanguage = item => {
    firebase
      .firestore()
      .collection("users")
      .doc(this.user.uid)
      .update({ language_code: item.code })

    this.updateLanguageName(item.code)
  }

  updateLanguageName = code => {
    const { dataSource } = this.state
    dataSource.map(languages => {
      if (languages.code === code) {
        this.setState({
          currentLanguageName: languages.name
        })
      }
      return true
    })
  }

  render() {
    const { currentLanguageName, dataSource } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.headerTitle}>
          <Text style={styles.headerText}>Idioma atual</Text>
          <Text style={styles.itemTextHeader}>{currentLanguageName}</Text>
          <Text style={styles.headerText}>Selecione um idioma</Text>
        </View>
        <View style={styles.container}>
          <FlatList
            data={dataSource}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => this.changeLanguage(item)}
                >
                  <Text style={styles.itemText}>{item.name}</Text>
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
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10
  },
  itemText: {
    fontSize: 18
  },
  headerTitle: {
    backgroundColor: "#F4F5F8"
  },
  headerText: {
    fontSize: 24,
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    backgroundColor: "#fff",
    marginBottom: 2,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10
  }
})
