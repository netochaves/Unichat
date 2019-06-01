import React from "react"
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking
} from "react-native"
import AboutHeader from "~/Components/About/aboutHeader"
import AboutCards from "~/Components/About/aboutCards"

const aboutScreen = props => {
  const { navigation } = props

  const openURL = path => {
    Linking.openURL(path)
  }

  const devCards = [
    {
      id: "1",
      name: "José Chaves",
      desc: "Cara que fez tudo",
      avatar: require("../../assets/imgs/dev_profiles/neto.jpeg")
    },
    {
      id: "2",
      name: "João Pedro",
      desc: "Só ajudou mesmo",
      avatar: require("../../assets/imgs/dev_profiles/jpe.jpeg")
    },
    {
      id: "3",
      name: "Max Nícolas",
      desc: "100% estresse",
      avatar: require("../../assets/imgs/dev_profiles/max.jpeg")
    },
    {
      id: "4",
      name: "Evandro Monte",
      desc: "é né...",
      avatar: require("../../assets/imgs/dev_profiles/evandro.jpeg")
    }
  ]

  return (
    <View style={styles.container}>
      <AboutHeader navigation={navigation} />
      <View style={styles.elevationBody}>
        <Text style={styles.titleTextStyle}>Unichat</Text>
        <Text style={styles.titleTextStyle}>Versão 0.3.0</Text>
        <Image
          source={require("../../assets/imgs/unichat-icon.png")}
          style={styles.imageStyle}
        />
        <Text style={styles.titleTextStyle}>2019 Unichat Inc.</Text>
        <TouchableOpacity onPress={() => openURL()}>
          <Text style={styles.linkStyle}>Licença</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textViewStyle}>
        <Text style={styles.titleTextStyle}>Créditos</Text>
      </View>
      <ScrollView>
        {devCards.map(dev => {
          return <AboutCards {...dev} key={dev.id} />
        })}
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
  imageStyle: {
    marginTop: 10,
    marginBottom: 10,
    width: 75,
    height: 75
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
  }
})

export default aboutScreen
