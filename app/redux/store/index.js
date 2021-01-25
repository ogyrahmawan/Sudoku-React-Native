import allReducer from '../reducers/index'
import {createStore, applyMiddleware} from 'redux'
import Thunk from 'redux-thunk'

const store = createStore(allReducer, applyMiddleware(Thunk))

export default store