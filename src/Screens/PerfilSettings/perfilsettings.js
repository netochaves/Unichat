import React, { Component } from "react"

import {View,
        Text,
        TextInput,
        Image,
        TouchableOpacity,
        Picker,
        StyleSheet} from "react-native"
import { Icon } from "react-native-elements"        
import shortid from "shortid"
import LinearGradient from "react-native-linear-gradient"
import nouser from  "../../assets/imgs/nouser.png"
import languagelist from "../../assets/languages/languages"

export default class PerfilSettings extends Component{
    static navigationoptions = {}
    
    constructor() {
        super()
        this.state = {
            language: [],
            code: ""
        }
      }

      componentDidMount() {
        this.setState({language: languagelist})

      }

    render(){
        const {language, code} = this.state

        return(
            <View style={styles.container}>
                <Text style={styles.Titulo}>Configurações de Perfil</Text>

                <View>
                    <Image source={nouser}  style={styles.imagem}/>
                    <TouchableOpacity style={styles.roundbutton}>
                        <Icon name="create" />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.viewtext}>


                    <View>
                        <Text style={styles.labeltext}>
                        Nome:
                        </Text>
                        <TextInput style={styles.entrada}>
                    
                        </TextInput>
                       
                        <Text style={styles.labeltext}>
                            Email:
                        </Text>
                        <TextInput style={styles.entrada}>
                        </TextInput>


                        <Text style={styles.labeltext}>
                        Idiomas:
                        </Text>
                        <View style={styles.languagePicker}>
                        <Picker 
                            
                            selectedValue={code}
                            onValueChange={itemValue =>
                            this.setState({ code: itemValue })}>
                             <Picker.Item label="Escolha seu idioma" value="" />
                             {language.map(item => (
                                <Picker.Item
                                    label={`${item.name}`}
                                    value={item.code} 
                                    key={shortid.generate()}
                                /> ))}

                        </Picker>
                        </View>
                        
                    </View>


                  
                </View>
		            


                    <LinearGradient
                        colors={["#547BF0", "#6AC3FB"]}
                        style={styles.button}
                    >
                        <Text style={styles.textButton}>
                            Avançar
                        </Text>
                    </LinearGradient>

                

            </View>






        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white"

    },
    viewtext:{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    imagem:{
        marginTop: 50,
        width: 125,
        height: 125,
        borderRadius: 50,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        borderColor:"#547BF0"

    },
    Titulo:{
        alignContent: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginTop: 50
    },
    languagePicker: {
        width: 250,
        borderBottomWidth: 2,
        borderColor: "#6AC3FB"
      },
    button: {
        width: 280,
        height: 50,
        borderRadius: 20,
        justifyContent: "center",
        marginTop: 40,
        color: "#547BF0"
      },
      textButton: {
        alignSelf: "center",
        fontSize: 20,
        color: "white",
      },
      labeltext:{
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        marginTop: 5 
      },
      entrada: {
          width: 250,
          height: 30,
          marginRight: 40,
          marginTop: 5,
          marginBottom: 10,
          borderBottomWidth: 2,
          textAlign: "center",
          fontSize: 18,
          borderColor: "#6AC3FB"
      },
      roundbutton:{
        borderWidth:1,
        borderColor:"#6AC3FB",
        alignItems: "center",
        justifyContent:"center",
        width:40,
        height:40,
        backgroundColor:"#6AC3FB",
        borderRadius:20,
        marginLeft: 80,
        marginBottom: 20
      }

})
