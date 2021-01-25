import React, { useState } from 'react'
import { StyleSheet, Text, StatusBar, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import ButtonStart from '../components/ButtonStart'


const Home = (props) => {
    const [name, setName] = useState('')
    return (
        <View style={styles.container}>
            <View style={{ width: 300, marginTop: 30, justifyContent: 'center', alignItems: 'center'}}>
                {/* <Text style={{color: "grey", fontSize: 40, marginBottom: 30}}>Sugoku</Text> */}
                <Text style={{textAlign: 'center', fontSize: 20, color: "#C5B358"}}>Life Isn't A Puzzled To Be Solved. It's Adventure to Be Savored</Text>
            </View>
            <View style={styles.container}>
                <TextInput 
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={{
                        textAlign: 'center',
                        borderColor: "grey",
                        borderWidth: 1,
                        width: 200,
                        height: 50,
                        margin: 20,
                        borderRadius: 10
                    }}
                    placeholder="input you name"
                />
                <View>
                    <ButtonStart difficulty="easy" name={name}></ButtonStart>
                    <ButtonStart difficulty="medium" name={name}></ButtonStart>
                    <ButtonStart difficulty="hard" name={name}></ButtonStart>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      margin: 30
    }
})

export default Home