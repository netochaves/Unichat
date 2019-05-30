import React from "react"
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView
} from "react-native"
import { Avatar } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"
import LinearGradient from "react-native-linear-gradient"

const aboutScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.elevationBody}>
        <Text style={styles.titleTextStyle}>Unichat Messenger</Text>
        <Text style={styles.titleTextStyle}>Versão 0.3.0</Text>
        <Image style={styles.imageStyle} />
        <Text style={styles.titleTextStyle}>2019 Unichat Inc.</Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              "https://github.com/ES2-UFPI/Unichat/blob/master/LICENSE"
            )
          }}
        >
          <Text style={styles.linkStyle}>Licença</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textViewStyle}>
        <Text style={styles.titleTextStyle}>Créditos</Text>
      </View>
      <ScrollView>
        <LinearGradient colors={["#fff", "#F4F5F8"]} style={styles.cardView}>
          <Avatar
            rounded
            icon={{ name: "user", type: "font-awesome" }}
            size="medium"
          />
          <View style={styles.cardViewText}>
            <Text style={styles.titleTextStyle}>José Chaves</Text>
            <Text style={styles.bodyTextStyle}>Fez tudo praticamente</Text>
            <View style={styles.iconView}>
              <Icon name="twitter" size={30} color="#2ECCFA" />
              <Icon name="github" size={30} color="#333" />
            </View>
          </View>
        </LinearGradient>

        <LinearGradient colors={["#fff", "#F4F5F8"]} style={styles.cardView}>
          <Avatar
            rounded
            icon={{ name: "user", type: "font-awesome" }}
            size="medium"
          />
          <View style={styles.cardViewText}>
            <Text style={styles.titleTextStyle}>João Pedro</Text>
            <Text style={styles.bodyTextStyle}>Fez algo ali e aqui</Text>
            <View style={styles.iconView}>
              <Icon name="twitter" size={30} color="#2ECCFA" />
              <Icon name="github" size={30} color="#333" />
            </View>
          </View>
        </LinearGradient>

        <LinearGradient colors={["#fff", "#F4F5F8"]} style={styles.cardView}>
          <Avatar
            rounded
            icon={{ name: "user", type: "font-awesome" }}
            size="medium"
          />
          <View style={styles.cardViewText}>
            <Text style={styles.titleTextStyle}>Max Nícolas</Text>
            <Text style={styles.bodyTextStyle}>
              Tiltou mais do que programou
            </Text>
            <View style={styles.iconView}>
              <Icon name="twitter" size={30} color="#2ECCFA" />
              <Icon name="github" size={30} color="#333" />
            </View>
          </View>
        </LinearGradient>

        <LinearGradient colors={["#fff", "#F4F5F8"]} style={styles.cardView}>
          <Avatar
            rounded
            icon={{ name: "user", type: "font-awesome" }}
            size="medium"
          />
          <View style={styles.cardViewText}>
            <Text style={styles.titleTextStyle}>Evandro Monte</Text>
            <Text style={styles.bodyTextStyle}>hehehe</Text>
            <View style={styles.iconView}>
              <Icon name="twitter" size={30} color="#2ECCFA" />
              <Icon name="github" size={30} color="#333" />
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F8"
  },
  elevationBody: {
    backgroundColor: "#fff",
    elevation: 1,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  textViewStyle: {
    marginTop: 15,
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 30
  },
  cardView: {
    elevation: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    flexDirection: "row"
  },
  cardViewText: {
    marginLeft: 10
  },
  iconView: {
    flexDirection: "row"
  },
  imageStyle: {
    width: 100,
    height: 100
  },
  linkStyle: {
    fontSize: 20,
    color: "#0000ff",
    textDecorationLine: "underline"
  },
  titleTextStyle: {
    fontSize: 20,
    fontFamily: "OpenSans",
    color: "#999295"
  },
  bodyTextStyle: {
    fontSize: 14,
    fontFamily: "OpenSans",
    color: "#999295"
  }
})

export default aboutScreen
