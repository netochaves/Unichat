/* eslint-disable camelcase */
/* eslint-disable react-native/split-platform-components */
import React, { Component } from "react"
import {
  View,
  FlatList,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity
} from "react-native"
import { ListItem, Avatar } from "react-native-elements"
import Contacts from "react-native-contacts"
import AsyncStorage from "@react-native-community/async-storage"
import firebase from "react-native-firebase"
import ContactHeader from "~/Components/Contacts/contactHeader"
import SearchBar from "~/Components/SearchBar"

export default class Contatos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSerchable: false,
      text: "",
      contacts: [],
      arrayholder: []
    }
    this.ref = firebase.firestore().collection("users")
  }

  componentDidMount() {
    this.getData()
    const { navigation } = this.props
    this.willBlur = navigation.addListener("willBlur", () => {
      this.setState(prevState => ({
        arrayholder: prevState.contacts,
        isSerchable: false,
        text: ""
      }))
    })
  }

  componentWillUnmount() {
    this.willBlur.remove()
  }

  getData = async () => {
    AsyncStorage.getItem("@contacts").then(contactsResponse => {
      this.setState({
        contacts: JSON.parse(contactsResponse),
        arrayholder: JSON.parse(contactsResponse)
      })
    })
  }

  storeData = async contactsFromPhone => {
    const contactsAux = []
    this.ref.get().then(async querySnapshot => {
      querySnapshot.forEach(doc => {
        contactsFromPhone.forEach(contactFromPhone => {
          const contactName = `${contactFromPhone.givenName} ${
            contactFromPhone.middleName !== null
              ? contactFromPhone.middleName
              : ""
          } ${
            contactFromPhone.familyName !== null
              ? contactFromPhone.familyName
              : ""
          }`
          if (contactFromPhone.phoneNumbers.length > 0) {
            let numberFromPhone = contactFromPhone.phoneNumbers[0].number
            numberFromPhone = numberFromPhone.split(" ").join("")
            numberFromPhone = numberFromPhone.split("-").join("")
            if (doc.data().phone === numberFromPhone) {
              const { profile_img_url } = doc.data()
              contactsAux.push({
                ...contactFromPhone,
                contactName,
                key: doc.id,
                contactPhoto: profile_img_url
              })
            }
          }
        })
      })
      AsyncStorage.setItem("@contacts", JSON.stringify(contactsAux)).then(
        () => {
          this.getData()
        }
      )
    })
  }

  syncronize = () => {
    Contacts.getAll((err, contacts) => {
      if (err === "denied") {
        // error
      } else {
        this.storeData(contacts)
      }
      ToastAndroid.showWithGravityAndOffset(
        "Sincronização concluida",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      )
    })
  }

  searchFilterFunction = text => {
    this.setState({ text })
    const { contacts } = this.state
    const newContacts = contacts.filter(item => {
      const contact = `${item.contactName.toUpperCase()}`
      const textData = text.toUpperCase()
      return contact.indexOf(textData) > -1
    })
    this.setState({ arrayholder: newContacts })
  }

  backPressHandler = () => {
    this.setState(prevState => ({
      arrayholder: prevState.contacts,
      isSerchable: false,
      text: ""
    }))
  }

  render() {
    const { arrayholder, text, isSerchable } = this.state
    const { navigation } = this.props
    let toolbar
    if (isSerchable)
      toolbar = (
        <SearchBar
          onChangeText={t => this.searchFilterFunction(t)}
          value={text}
          onBackPressHandler={this.backPressHandler}
        />
      )
    else
      toolbar = (
        <ContactHeader
          syncronize={this.syncronize}
          onPressSearch={() => this.setState({ isSerchable: true })}
        />
      )
    return (
      <View style={styles.container}>
        {toolbar}
        <FlatList
          data={arrayholder.sort((a, b) => a.givenName.localeCompare(b))}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("ChatScreen", { item })}
              >
                <ListItem
                  style={styles.contact}
                  title={item.contactName}
                  subtitle={
                    item.phoneNumbers.length > 0
                      ? item.phoneNumbers[0].number
                      : null
                  }
                  leftAvatar={
                    item.contactPhoto === "" ? (
                      <Avatar
                        rounded
                        icon={{ name: "user", type: "font-awesome" }}
                        size="medium"
                      />
                    ) : (
                      {
                        source: { uri: item.contactPhoto },
                        size: "medium"
                      }
                    )
                  }
                />
              </TouchableOpacity>
            )
          }}
          keyExtractor={i => i.recordID}
          onEndThreshold={0}
          keyboardShouldPersistTaps="always"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F8"
  },
  contact: {
    backgroundColor: "#F4F5F8",
    marginBottom: 1
  }
})
