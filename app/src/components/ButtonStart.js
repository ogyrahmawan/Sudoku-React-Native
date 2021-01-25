import { useNavigation } from '@react-navigation/native'
import React, { useState, } from 'react'
import {View, Button, Alert} from 'react-native'

const ButtonStart = ({difficulty, name}) => {
    const navigation = useNavigation()
    return (
        <View style={{marginTop: 10, width: 200}}>
            <Button
            title={difficulty}
            color="#292b2c"
            onPress={() => {
                // let playerName
                if(!name) {
                    Alert.alert('Name Required', 'Please Input Your Name')
                } else {
                    navigation.push('Game', {
                        difficulty: difficulty,
                        name: name
                    });
                }
            }}
            />
        </View>   
    )
}

export default ButtonStart