import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import htmlReducer from './reducers/htmlReducer';
import kysymysReducer from './reducers/kysymysReducer';
import notifyReducer from './reducers/notifyReducer';

const reducer = combineReducers({
  html: htmlReducer,
  kysymys: kysymysReducer,
  notify: notifyReducer
});

const store = createStore(
  reducer,
  applyMiddleware(thunk),
)

export default store;

