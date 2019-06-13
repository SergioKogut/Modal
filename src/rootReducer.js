import {combineReducers} from "redux";
import counter from "./reducers/counter";
import modal from "./reducers/modal";

export default  combineReducers({
    counter,
    modal
});