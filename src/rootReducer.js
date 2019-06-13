import {combineReducers} from "redux";
import counter from "./reducers/counter";
import modal from "./reducers/modal";
import {animalReducer} from './components/animal/reducer'

export default  combineReducers({
    counter,
    modal,
    animal:animalReducer
});