import React, { Component } from "react"
import { View, FlatList, StyleSheet } from "react-native"
import { ListItem } from "react-native-elements"

import ContactHeader from "../../Components/Contacts/contactHeader"

export default class Contatos extends Component {
  state = {
    contacts: [],
    isLoading: false,
    isRefreshing: false
  }

  componentDidMount() {
    this.loadContacts()
  }

  // Nessa função basicamente vamos verificar se existe um contato novo no firebase (movimento de arrastar pra baixo e soltar)
  handleRefresh = () => {
    const { isRefreshing } = this.state
    this.setState(
      {
        isRefreshing: true
      },
      () => {
        this.loadContacts()
      }
    )
  }

  // Nessa função é os contatos serão carregados devidamente
  loadContacts = () => {
    const { contacts, isLoading } = this.state
    this.setState({ isLoading: true })
  }

  onChangeHandler = () => {}

  render() {
    const { contacts, isRefreshing } = this.state

    return (
      <View style={styles.container}>
        <ContactHeader />
        <FlatList
          data={contacts}
          renderItem={({ item }) => (
            <ListItem
              style={styles.contact}
              title={item.name.first}
              subtitle={item.phone}
              leftAvatar={{
                source: { uri: item.picture.thumbnail },
                size: "medium"
              }}
            />
          )}
          keyExtractor={i => i.email}
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
