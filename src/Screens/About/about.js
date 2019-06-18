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
import { scale } from "~/Components/responsive"

const aboutScreen = props => {
  const { navigation } = props

  const openURL = url => {
    Linking.openURL(url)
  }

  const devCards = [
    {
      id: "1",
      name: "José Chaves",
      desc: "Cara que fez (quase) tudo",
      avatar: require("../../assets/imgs/dev_profiles/neto.jpeg"),
      socialMedia: {
        twitter: "https://twitter.com/dctlol",
        github: "https://github.com/netochaves"
      }
    },
    {
      id: "2",
      name: "João Pedro",
      desc: "Só ajudou mesmo",
      avatar: require("../../assets/imgs/dev_profiles/jpe.jpeg"),
      socialMedia: {
        twitter: "https://twitter.com/",
        github: "https://github.com/sosolidkk"
      }
    },
    {
      id: "3",
      name: "Max Nícolas",
      desc: "100% estresse",
      avatar: require("../../assets/imgs/dev_profiles/max.jpeg"),
      socialMedia: {
        twitter: "https://twitter.com/Mex978",
        github: "https://github.com/Mex978"
      }
    },
    {
      id: "4",
      name: "Evandro Monte",
      desc: "Foi o último team leader",
      avatar: require("../../assets/imgs/dev_profiles/evandro.jpeg"),
      socialMedia: {
        twitter: "https://twitter.com/",
        github: "https://github.com/mrvan04"
      }
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
        <TouchableOpacity
          onPress={() =>
            openURL("https://github.com/ES2-UFPI/Unichat/blob/master/LICENSE")
          }
        >
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
    fontSize: scale(16),
    color: "#0000ff",
    textDecorationLine: "underline"
  },
  titleTextStyle: {
    fontSize: scale(16),
    fontFamily: "OpenSans",
    color: "#999295"
  }
})

export default aboutScreen
