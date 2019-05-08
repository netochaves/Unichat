/* eslint-disable camelcase */
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
import LinearGradient from "react-native-linear-gradient"
import firebase from "react-native-firebase"
import AsyncStorage from "@react-native-community/async-storage"

export default class Conversas extends Component {
  constructor() {
    super()
    this.state = {
      conversas: [],
      myName: "",
      myPicture: null,
      contacts: []
    }
    this.lastMessage = null

    this.ref = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)

    this.ref.get().then(doc => {
      this.setState({
        myName: doc.data().username,
        myPicture: doc.data().profile_img_url
      })
    })

    this.getAllChats()

    this.ref.collection("conversas").onSnapshot(querySnapshot => {
      const conversas = []
      querySnapshot.forEach(doc => {
        const { contactName, profileImgUrl } = doc.data()
        conversas.push({
          key: doc.id,
          profileImage: profileImgUrl,
          contactName
        })
      })
      this.setState({ conversas })
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress)
  }

  getAllChats = () => {
    this.snapshot = this.ref
      .collection("conversas")
      .get()
      .then(querySnapshot => {
        const conversas = []
        querySnapshot.forEach(doc => {
          const { contactName, profileImgUrl } = doc.data()
          conversas.push({
            key: doc.id,
            profileImage: profileImgUrl,
            contactName
          })
        })
        this.setState({ conversas })
      })
  }

  handleBackPress = () => {
    return true
  }

  getData = async () => {
    AsyncStorage.getItem("@contacts").then(contactsResponse => {
      const contacts = JSON.parse(contactsResponse)
      const contactsAux = []
      firebase
        .firestore()
        .collection("users")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            contacts.forEach(contactFromPhone => {
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
          this.setState({ contacts: contactsAux })
        })
    })
  }

  goToChat = id => {
    this.getData()
    const { navigation } = this.props
    const { contacts } = this.state
    contacts.forEach(item => {
      if (item.key === id) {
        navigation.navigate("ChatScreen", { item })
      }
    })
  }

  newConversa = () => {}

  search = () => {}

  render() {
    const { conversas, myName, myPicture } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image source={{ uri: myPicture }} style={styles.myPicture} />
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
          renderItem={({ item }) => {
            return (
              <ListItem
                onPress={() => {
                  this.goToChat(item.key)
                }}
                style={styles.conversa}
                subtitle={
                  <View style={styles.containerSub}>
                    <Text style={styles.name}>{item.contactName}</Text>
                    <Text style={styles.lastMsg}>{item.lastMessage}</Text>
                    <View style={styles.rightInformation}>
                      <Text style={styles.data}>{item.lastMessage}</Text>
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
                  source: { uri: item.profileImage },
                  size: "medium"
                }}
              />
            )
          }}
          keyExtractor={i => i.key}
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
