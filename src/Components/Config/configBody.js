import React from "react"

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native"

const configBody = () => {
  return (
    <View style={styles.elevationBody}>
      <Text>Conta</Text>
      <TouchableOpacity>
        <Text>Idiomas</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Notificação</Text>
      </TouchableOpacity>

      <Text>Aplicativo</Text>
      <TouchableOpacity>
        <Text>Enviar Feedback</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Compartilhar App</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Avaliar App</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Política de Privacidade</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Sobre</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text>Excluir Conta</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  elevationBody: {
    backgroundColor: "#fff",
    elevation: 5,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  }
})

export default configBody