import React from "react"
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch
} from "react-native"
import { Icon } from "react-native-elements"

const configBody = () => {
  return (
      <View style={styles.elevationBody}>
        <ScrollView
        showsVerticalScrollIndicator={false}>
          <View style={styles.innerBody}>
            <Text style={styles.touchableStyleTitle}>Conta</Text>
            <Text style={styles.line} />

            <TouchableOpacity style={styles.touchableIcon}>
              <Icon name="language" size={28} color="#007AFF" />
              <Text style={styles.touchableStyle}>Idiomas</Text>
              <View style={styles.chevronStyle}>
                <Icon 
                  name="chevron-right" 
                  size={28} 
                  color="gray" 
                  type="evilicon" />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.touchableIcon}>
              <Icon name="person" size={28} color="#c6056c" />
              <Text style={styles.touchableStyle}>Perfil</Text>
              <View style={styles.chevronStyle}>
                <Icon 
                  name="chevron-right" 
                  size={28} 
                  color="gray" 
                  type="evilicon" />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.touchableIcon}>
              <Icon 
                name="notifications" 
                size={28} 
                color="#ef2390" />
              <Text style={styles.touchableStyle}>Notificação</Text>
              <View style={styles.chevronStyle}>
                <Switch />
              </ View>
            </TouchableOpacity>

            <Text style={styles.touchableStyleTitle}>Aplicativo</Text>
            <Text style={styles.line} />

            <TouchableOpacity style={styles.touchableIcon}>
              <Icon 
                name="chat" 
                size={28} 
                color="#e542f4" />
              <Text style={styles.touchableStyle}>Enviar Feedback</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.touchableIcon}>
              <Icon 
                name="share" 
                size={28} 
                color="#14d2e8" />
              <Text style={styles.touchableStyle}>Compartilhar App</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.touchableIcon}>
              <Icon 
                name="star" 
                size={28} 
                color="#deea2e" />
              <Text style={styles.touchableStyle}>Avaliar App</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.touchableIcon}>
              <Icon 
                name="notifications" 
                size={28} 
                color="#25e01f" />
              <Text style={styles.touchableStyle}>Política de Privacidade</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.touchableIcon}>
              <Icon 
                name="info" 
                size={28} 
                color="#ef9739" />
              <Text style={styles.touchableStyle}>Sobre</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
              <Text style={styles.touchableStyleExit}>Excluir Conta</Text>
          </TouchableOpacity>
        </ScrollView>
      </View> 
  )
}

const styles = StyleSheet.create({
  elevationBody: {
    flex:1,
    elevation: 5,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
  },
  innerBody: {
    marginTop: 10,
    marginLeft: 30
  },
  chevronStyle: {
    flex: 1,
    marginRight: 10,
    alignItems: "flex-end"
  },  
  touchableIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  touchableStyle: {
    fontFamily: "OpenSans",
    fontSize: 18,
    marginLeft: 10,
  },
  touchableStyleExit: {
    backgroundColor: "red",
    color: "#fff",
    fontFamily: "OpenSans",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
    borderColor: "#dce1ea",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12
  },
  touchableStyleTitle: {
    fontSize: 22,
    fontFamily: "OpenSans",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5
  },
  line: {
    borderTopColor: "#dce1ea",
    borderTopWidth: 2,
    marginRight: 20
  },
})

export default configBody
