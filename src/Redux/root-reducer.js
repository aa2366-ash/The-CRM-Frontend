import {combineReducers} from 'redux'
import userReducer from './User/user-reduder'

export default combineReducers({
    user : userReducer
})
