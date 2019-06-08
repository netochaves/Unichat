import React, { Component } from "react"

import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert
} from "react-native"
import { ListItem, Avatar, CheckBox } from "react-native-elements"
import { FAB } from "react-native-paper"
import AsyncStorage from "@react-native-community/async-storage"

import Header from "~/Components/SelectContacts/header"
import SearchBar from "~/Components/SearchBar"

export default class SelectContacts extends Component {
  state = {
    contacts: [],
    selectedContacts: [],
    selectedContactsKey: [],
    isSearchable: false,
    text: "",
    arrayholder: []
  }

  componentDidMount() {
    AsyncStorage.getItem("@contacts").then(contacts => {
      this.setState({
        contacts: JSON.parse(contacts),
        arrayholder: JSON.parse(contacts)
      })
    })
  }

  addContact = contact => {
    const {
      selectedContacts,
      selectedContactsKey,
      contacts,
      arrayholder,
      isSearchable
    } = this.state
    const selectedContactsAux = [...selectedContacts]
    const selectedContactsKeyAux = [...selectedContactsKey]
    let contatsAux = [...contacts]
    if (isSearchable) contatsAux = [...arrayholder]

    if (!selectedContactsKeyAux.includes(contact.recordID)) {
      selectedContactsAux.push(contact)
      selectedContactsKeyAux.push(contact.recordID)
    } else {
      const index = selectedContactsKeyAux.indexOf(contact.recordID)
      if (index > -1) {
        selectedContactsKeyAux.splice(index, 1)
      }
    }
    this.setState({
      selectedContacts: selectedContactsAux,
      selectedContactsKey: selectedContactsKeyAux,
      arrayholder: contatsAux
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
      arrayholder: [...prevState.contacts],
      isSearchable: false,
      text: ""
    }))
  }

  onBackHandler = () => {
    const { navigation } = this.props
    Alert.alert(
      "Voltar",
      "Você deseja cancelar a criação do grupo?",
      [
        { text: "Sim", onPress: () => navigation.navigate("Conversas") },
        {
          text: "Não",
          style: "cancel"
        }
      ],
      { cancelable: false }
    )
  }

  render() {
    const { selectedContactsKey, isSearchable, text, arrayholder } = this.state
    let toolbar
    if (isSearchable) {
      toolbar = (
        <SearchBar
          onChangeText={t => this.searchFilterFunction(t)}
          value={text}
          onBackPressHandler={this.backPressHandler}
        />
      )
    } else {
      toolbar = (
        <Header
          onPressSearch={() => this.setState({ isSearchable: true })}
          onBackHandler={this.onBackHandler}
        />
      )
    }
    return (
      <>
        <View style={styles.container}>
          {toolbar}
          <FlatList
            data={arrayholder.sort((a, b) => a.givenName.localeCompare(b))}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => this.addContact(item)}
                  style={styles.item}
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
                  <View style={styles.checkBox}>
                    <CheckBox
                      checkedColor="#007AFF"
                      size={26}
                      checkedIcon="check-circle"
                      checked={selectedContactsKey.includes(item.recordID)}
                      uncheckedIcon="circle-o"
                      onPress={() => this.addContact(item)}
                    />
                  </View>
                </TouchableOpacity>
              )
            }}
            keyExtractor={i => i.recordID}
            onEndThreshold={0}
            keyboardShouldPersistTaps="always"
          />
        </View>
        <FAB icon="arrow-forward" style={styles.fab} onPress={() => {}} />
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F8"
  },
  contact: {
    flex: 1,
    backgroundColor: "#F4F5F8",
    marginBottom: 1
  },
  fab: {
    backgroundColor: "#007AFF",
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  },
  item: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2
  },
  checkBox: {
    alignItems: "flex-end"
  }
})
