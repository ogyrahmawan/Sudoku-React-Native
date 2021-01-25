import { setLeaderBoard } from './learderBoardAction'
import {Alert} from 'react-native'

export const setInitialBoard = (payload) => {
    return {
        type: 'SETINITIALBOARD',
        payload
    }
}

export const setLoadingBoard = () => {
    return {
        type: 'SETLOADINGBOARD'
    }
}

export const doneLoadingBoard = () => {
    return {
        type: 'DONELOADINGBOARD'
    }
}

export const fetchInitialBoard = (difficulty) => (dispatch) => {
    dispatch(setLoadingBoard())
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
    .then(res => res.json())
    .then(data => {
        dispatch(setInitialBoard(data.board))
    })
    .catch(err => {
      console.log(err)
    })  
    .finally(e => {
        dispatch(doneLoadingBoard())
    })
}

export const usingSolve = () => {
    return {
        type: "USINGSOLVE"
    }
}
export const getSolved = (initBoard) => (dispatch) => {
    dispatch(setLoadingBoard())
    let data = {board: initBoard }
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
    const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');
    fetch('https://sugoku.herokuapp.com/solve', {
    method: 'POST',
    body: encodeParams(data),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(response => response.json())
    .then(response => {
        dispatch(setInitialBoard(response.solution))
        dispatch(usingSolve())
    })
    .catch(console.warn)
    .finally(e => {
        dispatch(doneLoadingBoard())
    })
} 

export const updateStatus = (payload) => {
    return {
        type: 'UPDATESTATUS',
        payload
    }
}

export const emptyStatus = () => {
    return {
        type: 'EMPTYSTATUS'
    }
}

export const usingSolveFalse = () => {
    return {
        type: 'USINGSOLVEFALSE'
    }
}

export const validate = (temp, name, score) => (dispatch, getState) => {
    let data = {board: temp }
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
    
    const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

    const state = getState()
    const leaderBoard = state.leaderBoard.data

    fetch('https://sugoku.herokuapp.com/validate', {
    method: 'POST',
    body: encodeParams(data),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(response => response.json())
    .then(response => {
        dispatch(updateStatus(response.status))
        if (response.status === 'unsolved') {
            console.log('this puzzle unsolved')
            Alert.alert('WARNING!!','this puzzle unsolved')
        } else if (response.status === 'broken') {
            console.log('this puzzle broken')
            Alert.alert('WARNING!!', 'this puzzle broken')
          }
          if(!state.board.usingSolve && response.status === 'solved') {
            let newLeaderBoard = leaderBoard.concat({
                name,
                score
            })
            dispatch(setLeaderBoard(newLeaderBoard))
        }
    })
    .catch(console.warn)
}