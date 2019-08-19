import {combineReducers} from 'redux'
import user from './user'
import listPage from './listPage'

export default combineReducers({
  user,
  listPage
})