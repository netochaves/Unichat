import React, { Component, PureComponent } from "react"
import { View, FlatList, StyleSheet } from "react-native"
import { ListItem } from "react-native-elements"
import Contacts from "react-native-contacts"
import AsyncStorage from "@react-native-community/async-storage"

import ContactHeader from "../../Components/Contacts/contactHeader"

export default class Contatos extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      contacts: [],
      isRefreshing: false
    }
  }

  componentDidMount() {
    AsyncStorage.getItem("@contacts").then(contacts => {
      console.log("[DID MOUNT IS CALLING]")
      this.setState({ contacts: JSON.parse(contacts) })
    })
  }

  storeData = async contacts => {
    try {
      await AsyncStorage.setItem("@contacts", JSON.stringify(contacts))
    } catch (err) {
      throw err
    }
  }

  getData = async () => {}

  syncronize = () => {
    Contacts.getAll((err, contacts) => {
      if (err === "denied") {
        // error
      } else {
        this.storeData(contacts)
      }
    })
    this.getData()
  }

  // Nessa função basicamente vamos verificar se existe um contato novo no firebase (movimento de arrastar pra baixo e soltar)
  handleRefresh = () => {
    this.setState({
      isRefreshing: true
    })
  }

  render() {
    const { contacts, isRefreshing } = this.state
    console.log(this.state.contacts)

    return (
      <View style={styles.container}>
        <ContactHeader />
        <FlatList
          data={contacts}
          renderItem={({ item }) => {
            console.log(item)
            return (
              <ListItem
                style={styles.contact}
                title={item.givenName}
                subtitle={
                  item.phoneNumbers.length > 0
                    ? item.phoneNumbers[0].number
                    : null
                }
                leftAvatar={{
                  source: {
                    uri: item.thumbnailPath === "" ? null : item.thumbnailPath
                  },
                  size: "medium"
                }}
              />
            )
          }}
          keyExtractor={i => i.recordID}
          refreshing={isRefreshing}
          onRefresh={this.handleRefresh}
          onEndReached={this.handleLoadMore}
          onEndThreshold={0}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E3E3"
  },
  contact: {
    width: "100%",
    backgroundColor: "#E8E3E3",
    marginBottom: 1
  }
})
