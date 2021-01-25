import boardReducer from './boardReducer'
import leaderBoardReducer from './leaderBoardReducer'
import {combineReducers} from 'redux'

const allReducer = combineReducers({
    board: boardReducer,
    leaderBoard: leaderBoardReducer
})

export default allReducer