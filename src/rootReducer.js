import {combineReducers} from "redux";
import counter from "./reducers/counter";
import modal from "./reducers/modal";
import {animalReducer} from './components/animal/reducer'
import {productReducer} from './components/product/reducer'
//import {girlReducer} from './components/animal/girlReducer'
import {girl as girlSlice} from './components/animal/girlReducer'
import {game as gameSlice} from './components/animal/girlReducer'


export default  combineReducers({
    counter,
    modal,
    animal:animalReducer,
    girl:girlSlice.reducer,
    game:gameSlice.reducer,
    product:productReducer
});