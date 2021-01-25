import React from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const LeaderBoard = (props) => {
    const leaderBoard = useSelector(state => state.leaderBoard.data)
    const sortedleaderBoard = leaderBoard.sort((a,b) => b.score - a.score).slice(0, 10)
    
    return (
        <View style={styles.container}>
            <Text>Top Ten Leader Board</Text>
            <View style={{width: 500, height: 200, marginTop: 20, alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.rankField}>
                        <Text style={styles.headerItem}>Rank</Text>
                    </View>
                    <View style={styles.nameField}>
                        <Text style={styles.headerItem}>Name</Text>
                    </View>
                    <View style={styles.scoreField}>
                        <Text style={styles.headerItem}>Score</Text>
                    </View>
                </View>
                {
                    sortedleaderBoard.map((item, index) => (
                        <View key={index} style={{flexDirection: 'row',  alignItems: 'center'}}>
                            <View style={styles.rankBody}>
                                <Text style={styles.bodyItem}>{(index + 1)}</Text>
                            </View>
                            <View style={styles.nameBody}>
                                <Text style={styles.bodyItem}>{item.name}</Text>
                            </View>
                            <View style={styles.scoreBody}>
                                <Text style={styles.bodyItem}>{item.score}</Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        width: 200,
        height: 200,
        alignItems: 'center'
    },
    rankField: {
        height: 20,
        width: 60,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'grey',
    },
    nameField: {
        height: 20,
        width: 125,
        borderColor: 'black',
        borderWidth: 1,
        textAlign: 'center',
        backgroundColor: 'grey',
    },
    scoreField: {
        height: 20,
        width: 125,
        borderColor: 'black',
        borderWidth: 1,
        textAlign: 'center',
        backgroundColor: 'grey',
    },
    rankBody: {
        height: 20,
        width: 60,
        borderColor: 'black',
        borderWidth: 1,
        textAlign: 'center'
    },
    nameBody: {
        height: 20,
        width: 125,
        borderColor: 'black',
        borderWidth: 1,
        textAlign: 'center'
    },
    scoreBody: {
        height: 20,
        width: 125,
        borderColor: 'grey',
        borderWidth: 1,
        textAlign: 'center'
    },
    headerItem: {
        color: 'white',
        textAlign: 'center'
    },
    bodyItem: {
        color: 'grey',
        textAlign: 'center'
    }
})

export default LeaderBoard