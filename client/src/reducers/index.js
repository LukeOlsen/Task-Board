import { combineReducers } from 'redux';
import boardReducer from './boardReducers';
import userReducer from './userReducer';

export default combineReducers({
  boardReducer,
  userReducer
})