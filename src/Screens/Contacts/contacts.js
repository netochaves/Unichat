/* eslint-disable camelcase */
/* eslint-disable react-native/split-platform-components */
import React, { Component } from "react"
import {
  View,
  FlatList,
  StyleSheet,
  ToastAndroid,
  PermissionsAndroid,
} from "react-native"
import { ListItem, Avatar } from "react-native-elements"
import Contacts from "react-native-contacts"
import AsyncStorage from "@react-native-community/async-storage"
import firebase from "react-native-firebase"
import ContactHeader from "../../Components/Contacts/contactHeader"

export default class Contatos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: []
    }
    this.ref = firebase.firestore().collection("users")
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    AsyncStorage.getItem("@contacts").then(contactsResponse => {
      const contacts = JSON.parse(contactsResponse)
      const contactsAux = []
      this.ref.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          contacts.forEach(contactFromPhone => {
            if (contactFromPhone.phoneNumbers.length > 0) {
              let numberFromPhone = contactFromPhone.phoneNumbers[0].number
              numberFromPhone = numberFromPhone.split(" ").join("")
              numberFromPhone = numberFromPhone.split("-").join("")
              if (doc.data().phone === numberFromPhone) {
                const { profile_img_url } = doc.data()
                contactsAux.push({ ...contactFromPhone, profile_img_url })
              }
            }
          })
        })
        this.setState({ contacts: contactsAux })
      })
    })
  }

  storeData = async contactsFromPhone => {
    try {
      await AsyncStorage.setItem("@contacts", JSON.stringify(contactsFromPhone))
    } catch (err) {
      throw err
    }
  }

  syncronize = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: "Contacts",
      message: "This app would like to view your contacts."
    }).then(() => {
      Contacts.getAll((err, contacts) => {
        if (err === "denied") {
          // error
        } else {
          this.storeData(contacts)
        }
        this.getData()
      })
    })
    ToastAndroid.showWithGravityAndOffset(
      "Sincronização concluida",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    )
  }

  render() {
    const { contacts } = this.state
    return (
      <View style={styles.container}>
        <ContactHeader syncronize={this.syncronize} />
        <FlatList
          data={contacts.sort((a, b) => a.givenName.localeCompare(b))}
          renderItem={({ item }) => {
            return (
              <ListItem
                style={styles.contact}
                title={`${item.givenName} ${
                  item.middleName !== null ? item.middleName : ""
                } ${item.familyName !== null ? item.familyName : ""}`}
                subtitle={
                  item.phoneNumbers.length > 0
                    ? item.phoneNumbers[0].number
                    : null
                }
                leftAvatar={
                  item.profile_img_url === "" ? (
                    <Avatar
                      rounded
                      icon={{ name: "user", type: "font-awesome" }}
                      size="medium"
                    />
                  ) : (
                    {
                      source: { uri: item.profile_img_url },
                      size: "medium"
                    }
                  )
                }
              />
            )
          }}
          keyExtractor={i => i.recordID}
          onEndThreshold={0}
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
