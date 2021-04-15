import {createStore, compose, applyMiddleware, combineReducers} from "redux";

import reducers from "./redux";
import thunk from "redux-thunk";

const preloadedState = {};
const composeFunc = compose;

const persistedState = null;

const store = compose(applyMiddleware(thunk))(createStore)(reducers);

export default store;
