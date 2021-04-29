import {createStore, compose, applyMiddleware} from "redux";

import reducers from "./redux";
import thunk from "redux-thunk";


const store = compose(applyMiddleware(thunk))(createStore)(reducers);

export default store;
