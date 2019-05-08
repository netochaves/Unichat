/* eslint-disable camelcase */
/* eslint-disable react-native/split-platform-components */
import React, { Component } from "react"
import {
  View,
  FlatList,
  StyleSheet,
  ToastAndroid,
  PermissionsAndroid,
  TouchableOpacity
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
      this.setState({ contacts: JSON.parse(contactsResponse) })
    })
  }

  storeData = async contactsFromPhone => {
    const contactsAux = []
    this.ref.get().then(querySnapshot => {
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
                profile_img_url
              })
            }
          }
        })
      })
      return AsyncStorage.setItem("@contacts", JSON.stringify(contactsAux))
    })
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
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <ContactHeader syncronize={this.syncronize} />
        <FlatList
          data={contacts.sort((a, b) => a.givenName.localeCompare(b))}
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
              </TouchableOpacity>
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
