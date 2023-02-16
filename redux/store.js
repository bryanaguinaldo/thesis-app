import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import urlReducer from "./reducers";

const rootReducer = combineReducers({ urlReducer });

export const store = createStore(rootReducer, applyMiddleware(thunk));
