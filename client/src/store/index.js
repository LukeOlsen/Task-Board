import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

const store = createStore(rootReducer, applyMiddleware(thunk, routerMiddleware(history)));

export default store;