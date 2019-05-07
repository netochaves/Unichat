import React, { Component } from "react"
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  BackHandler
} from "react-native"
import { ListItem, Icon } from "react-native-elements"
import img from "~/assets/imgs/profile-placeholder.png"
import LinearGradient from "react-native-linear-gradient"
import shortid from "shortid"

export default class Conversas extends Component {
  constructor() {
    super()
    this.state = {
      conversas: [
        {
          id: shortid.generate(),
          name: "Evandro",
          lastMsg: "Olá tudo bem?",
          unread: 50,
          data: "17:40 PM"
        },
        {
          id: shortid.generate(),
          name: "João Pedro",
          lastMsg: "Bom dia",
          unread: 3,
          data: "1:26 PM"
        },
        {
          id: shortid.generate(),
          name: "Beton",
          lastMsg: "Sai fora",
          unread: 2,
          data: "1:40 AM"
        }
      ],
      myName: "Max Lima",
      myPicture: img
    }
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress)
  }

  handleBackPress = () => {
    return true
  }

  goToChat = () => {
    const { navigation } = this.props
    navigation.navigate("ChatScreen")
  }

  newConversa = () => {}

  search = () => {}

  render() {
    const { conversas, myName, myPicture } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image source={myPicture} style={styles.myPicture} />
            <Text style={styles.conversasInfo}>{myName}</Text>
            <TouchableOpacity
              onPress={() => {
                this.search()
              }}
            >
              <View style={styles.searchIcon}>
                <Icon name="search1" color="#00aced" type="antdesign" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={conversas}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => {
                this.goToChat()
              }}
              style={styles.conversa}
              subtitle={
                <View style={styles.containerSub}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.lastMsg}>{item.lastMsg}</Text>
                  <View style={styles.rightInformation}>
                    <Text style={styles.data}>{item.data}</Text>
                    <LinearGradient
                      colors={["#547BF0", "#6AC3FB"]}
                      style={styles.cont}
                    >
                      <Text style={styles.unread}>{item.unread}</Text>
                    </LinearGradient>
                  </View>
                </View>
              }
              leftAvatar={{
                source: img,
                size: "medium"
              }}
            />
          )}
          keyExtractor={i => i.id}
        />
        <LinearGradient colors={["#547BF0", "#6AC3FB"]} style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              this.newConversa()
            }}
          >
            <Icon name="plus" color="white" type="antdesign" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "OpenSans",
    backgroundColor: "#F4F5F8"
  },
  containerSub: {
    position: "absolute",
    width: "100%"
  },
  header: {
    backgroundColor: "#fff",
    elevation: 5,
    marginTop: 0,
    justifyContent: "center",
    alignContent: "center"
  },
  headerContent: {
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 20,
    marginTop: 10,
    marginRight: 20,
    flexDirection: "row"
  },
  conversasInfo: {
    fontSize: 18
  },
  searchIcon: {
    justifyContent: "center"
  },
  conversa: {
    width: "100%",
    backgroundColor: "#E8E3E3",
    marginBottom: 1
  },
  button: {
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    bottom: 5,
    right: 5
  },
  cont: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 5
  },
  data: {
    fontSize: 8
  },
  unread: {
    fontWeight: "bold",
    fontSize: 8,
    alignSelf: "center",
    color: "white"
  },
  rightInformation: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: 0,
    top: "50%",
    bottom: "50%"
  },
  lastMsg: {
    marginTop: 10,
    color: "#a9a9a9",
    fontSize: 13
  },
  myPicture: {
    width: 40,
    height: 40,
    borderRadius: 20
  }
})
