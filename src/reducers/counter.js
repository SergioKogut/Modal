
import {createAction,createActions,handleActions } from 'redux-actions';
const initState = {
    counterStore: 200
};

//як варіант
//export const increment = createAction('INCREMENT');
//export const decrement = createAction('DECREMENT');
export const { increment, decrement } = createActions('INCREMENT', 'DECREMENT');
export const incrementValue = createAction('INCREMENT_VALUE', value => ({ value }));
export const decrementValue = createAction('DECREMENT_VALUE', value => ({ value }));

export default handleActions({
    [increment]: (state) =>  Object.assign({}, state, {counterStore: state.counterStore+1}), //як варіант
    [decrement]: (state) =>  ({...state, counterStore: state.counterStore - 1}),  
    [incrementValue]: (state, { payload })=>  ({...state, counterStore: state.counterStore + payload.value}),  
    [decrementValue]: (state, { payload })=>  ({...state, counterStore: state.counterStore - payload.value})
    }, initState);





// необхідно проробити    
/*






*/