import React from 'react'
import { StyleSheet, Text, Button, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import LeaderBoard from '../components/LeaderBoard';

const FinishPage = ({route}) => {
    const navigation = useNavigation()
    const {difficulty, name, message, score} = route.params
    const handlePlayAgain = () => {
        navigation.replace('Game', {
            difficulty,
            name
        })
    }
    return (
        <View style={styles.container}>
            <View style={{marginBottom: 50, alignItems: 'center', height: 80}}>
            {
                message === 'congrat' ?
                <View style={{justifyContent: 'center', alignItems: 'center'}} >
                    <Text style={{fontSize: 30}}>{`Congratulation ${name}`}</Text>
                    <Text style={{ fontSize: 20}}>{`Your Score ${score}`}</Text>
                </View>
                :
                message !== 'times up' ?

                <View style={{justifyContent: 'center', alignItems: 'center'}} >
                    <Text style={{fontSize: 30}}>{`Sorry ${name}`}</Text>
                    <Text style={{ fontSize: 20}}>You Are Using Solver</Text>
                </View>
                :
                <View style={{justifyContent: 'center', alignItems: 'center'}} >
                    <Text style={{fontSize: 30}}>{`Sorry ${name}`}</Text>
                    <Text style={{ fontSize: 20}}>Times Up</Text>
                </View>
            }
            </View>
            <View>
                <Button onPress={handlePlayAgain} title='play Again'></Button>
            </View>
            <View>
                <LeaderBoard></LeaderBoard>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default FinishPage