import React, { Component } from "react"
import { View, FlatList, StyleSheet } from "react-native"
import { ListItem } from "react-native-elements"

export default class Contatos extends Component {
  state = {
    seed: 1,
    page: 1,
    contacts: [],
    isLoading: false,
    isRefreshing: false
  }

  componentDidMount() {
    this.loadContacts()
  }

  handleRefresh = () => {
    const { seed, isRefreshing } = this.state
    this.setState(
      {
        seed: seed + 1,
        isRefreshing: true
      },
      () => {
        this.loadContacts()
      }
    )
  }

  handleLoadMore = () => {
    const { page } = this.state
    this.setState(
      {
        page: page + 1
      },
      () => {
        this.loadContacts()
      }
    )
  }

  loadContacts = () => {
    const { seed, page, contacts, isLoading } = this.state
    this.setState({ isLoading: true })

    fetch(`https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          contacts:
            page === 1 ? response.results : [...contacts, ...response.results],
          isRefreshing: false
        })
      })
      .catch(() => {})
  }

  onChangeHandler = () => {}

  render() {
    const { contacts, isRefreshing } = this.state

    return (
        <View style={styles.scene}>
        <FlatList
          data={contacts}
          renderItem={({item}) => (
            <ListItem
                title={item.name.first}
                subtitle={item.phone}
                leftAvatar={{ source: {uri: item.picture.thumbnail} }}
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
  scene: {
    flex: 1,
    paddingTop: 25
  },
})
