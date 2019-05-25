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
      currentLanguageCode: ""
    }

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
      this.setState({
        currentLanguageCode: doc.data().language_code
      })
    })
  }

  render() {
    const { currentLanguageCode, dataSource } = this.state
    return (
      <View>
        <View>
          <Text style={styles.headerText}>Selecione um idioma</Text>
        </View>
        <View>
          <Text style={styles.headerText}>Idioma atual</Text>
          <Text style={styles.itemText}>{currentLanguageCode}</Text>
        </View>
        <View>
          <FlatList
            data={dataSource}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity>
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
  itemText: {
    fontSize: 18
  },
  headerText: {
    fontSize: 24
  }
})
