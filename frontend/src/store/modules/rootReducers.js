import { combineReducers } from 'redux';
import userReducer from './User/reducers';
import postReducer from './Post/reducers';
import commentReducer from './Comment/reducers';

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  comment: commentReducer,
});

export default rootReducer;