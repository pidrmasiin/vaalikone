import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import htmlReducer from './reducers/htmlReducer';
import kysymysReducer from './reducers/kysymysReducer';
import kysymyksetReducer from './reducers/kysymyksetReducer';
import notifyReducer from './reducers/notifyReducer';
import userReducer from './reducers/userReducer';
import kayttajaReducer from './reducers/kayttajaReducer';

const reducer = combineReducers({
  html: htmlReducer,
  kysymys: kysymysReducer,
  notify: notifyReducer,
  kysymykset: kysymyksetReducer,
  user: userReducer,
  kayttaja: kayttajaReducer
}); 

const store = createStore(
  reducer,
  applyMiddleware(thunk),
)

export default store;

