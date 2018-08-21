import { combineReducers } from 'redux';
import boardReducer from './boardReducer';

const reducers = combineReducers({
  boardReducer,
});

export default reducers;
