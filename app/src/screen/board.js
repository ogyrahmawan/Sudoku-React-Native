import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { emptyStatus, fetchInitialBoard, getSolved, usingSolveFalse, validate } from '../../redux/actions/boardAction';
import _ from 'lodash'
import Timer from '../components/Timer';


export default function Board({route}) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const {difficulty, name} = route.params

  const initBoard = useSelector(state => state.board.initialBoard)
  const loading = useSelector(state => state.board.loading)
  const statusGame = useSelector(state => state.board.status)
  const usingSolve = useSelector(state => state.board.usingSolve)
  
  const [timesUp, setTimesUp] = useState(false)
  const [temp, setTemp] = useState([])
  const [score, setScore] = useState('')
    

  useEffect(() => {
    dispatch(fetchInitialBoard(difficulty))
  }, [dispatch])

  useEffect(() => {
    let clone = _.cloneDeep(initBoard)
    setTemp(clone)
  }, [initBoard])

  useEffect(() => {
    if(statusGame === 'solved' && !usingSolve) {
      navigation.replace('Finish', {
        difficulty,
        name,
        message: `congrat`,
        score
      })
    } else if (statusGame === 'solved') {
      navigation.replace('Finish', {
        difficulty,
        name,
        message: `usingSolved`
      })
    } else if (statusGame === 'solved' && !timesUp ) {
      navigation.replace('Finish', {
        difficulty,
        name,
        message: `congrat`
      })
    } 
    else if (statusGame === 'unsolved' && timesUp ) {
      navigation.replace('Finish', {
        difficulty,
        name,
        message: `times up`
      })
    } 
    else if (statusGame === 'broken' && timesUp ) {
      navigation.replace('Finish', {
        difficulty,
        name,
        message: `times up`
      })
    } 

  }, [statusGame])

  useEffect(() => {
    return () => {
      dispatch(emptyStatus())
      dispatch(usingSolveFalse())
    }
  }, [])

  const handleChange = (value, row, col) => {
    let newBoard = _.cloneDeep(temp)
    newBoard[row][col] = +value
    setTemp(newBoard)
  }

  const handleSubmit = (message) => {
    if (message === 'times up') {
      setTimesUp(message)
    }
    dispatch(validate(temp, name, score))
  }

  const handleSolve = () => {
    Alert.alert('Solver', 'Using Solver Could Make You Dont Get Score & End Your Game', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'OK', 
        onPress: () => dispatch(getSolved(initBoard)) 
      }
    ],
    { cancelable: false }
    )
  }

  const handleScore = (e) => {
    let score
    if(difficulty === 'easy') {
      score = +e * 10 
    } else if(difficulty === 'medium') {
      score = +e * 13
    } else if (difficulty === 'hard') {
      score = +e * 16
    }
    setScore(score)
  }

  return (
    <View style={styles.container}>
      {
        loading  ?
        <View></View>
        :
        <View style={{width: "80%", flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{marginTop: 50, marginLeft: 20, color: 'grey', fontSize: 18}}>{`Hi ${name}`}</Text>
          <View style={{marginTop: 50, marginLeft: 20}}>
            <Text style={{textAlign: 'center', color: 'grey', fontSize: 18}}>{`Difficulty`}</Text>
            <Text style={{textAlign: 'center', color: 'grey', fontSize: 15}}>{difficulty}</Text> 
          </View>
          <Timer difficulty={difficulty} handleScore={handleScore} handleSubmit={handleSubmit}></Timer>
        </View>
      }
      
      {
        loading ? 
        <Text>Loading</Text>
        :
        initBoard.map((row, y) => (
        <View key={y} style={y === 3 || y === 6 ? styles.constainerRowBox: styles.containerRow }>
            {
            row.map((cell, x) => (
                <View key={y+x} style={x === 2 || x === 5 ? styles.containerColBox : styles.containerCol  }>
                {
                    +cell > 0 ?
                    <Text style={{color: "red", borderWidth:1, borderColor: 'grey', width: 30 , height: 30, textAlignVertical: 'center', textAlign: 'center'} } >{cell}</Text>
                    : 
                    <TextInput onChangeText={(value) => handleChange(value, y, x)} style={styles.cell} onChange={e => console.log(e)} />
                }
                </View>
            ))
            }
        </View>
        ))
    }
    {
        loading ?
        <Text></Text>
        :
        <View style={{flex: 1, flexDirection: "row", marginTop: 50 }}>
            <View>
                <Button color="#292b2c" onPress={handleSubmit} title='submit'></Button>
            </View>
            <View style={{marginLeft: 5,}}>
                <Button color="#d9534f" onPress={handleSolve} title='solve'></Button>
            </View>
        </View>
    }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    position: 'relative',
    height: "100%"
  },
  containerRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  constainerRowBox: {
    flexDirection: "row", 
    backgroundColor: 'white', 
    justifyContent: 'center', 
    marginTop: 5 
  },
  containerColBox: {
    flexDirection: 'row', 
    marginRight: 5
  },
  containerCol: {
    flexDirection: 'row'
  },
  cell: {
    color: 'black',
    textAlign: 'center',  
    borderColor: 'gray', 
    borderWidth: 1,
    width: 30,
    height: 30
  },
  cellBig: {
    color: 'black',
    fontSize: 5,
    textAlign: 'center',  
    borderColor: 'gray', 
    borderWidth: 1,
    width: 30,
    height: 30
  }
});