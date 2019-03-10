import {combineReducers} from "redux";
import newItemReducer from "./newItemReducer";
import addReducer from "./addReducer";
import sellReducer from "./sellReducer";

export default combineReducers({
    newItem: newItemReducer,
    addItem: addReducer,
    sellItem: sellReducer
});