import {createStore, combineReducers, applyMiddleware} from "redux";
import adminReducer from '../reducer/adminReducer';
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
    admin: adminReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
