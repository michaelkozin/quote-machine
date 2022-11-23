import {addMessage, messageReducer} from './quotes'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const store = createStore(messageReducer, applyMiddleware(thunk));

export default store;