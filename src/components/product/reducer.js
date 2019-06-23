import AnimalService from "./productService";
import update from '../../helpers/update'

export const GET_LIST_DATA_STARTED = "product/GET_LIST_DATA_STARTED";
export const GET_LIST_DATA_SUCCESS = "product/GET_LIST_DATA_SUCCESS";
export const GET_LIST_DATA_FAILED = "product/GET_LIST_DATA_FAILED";



const initialState = {
    list: {
        data: [],
        error: false,
        loading: false
    },
}

export const productReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {

        case GET_LIST_DATA_STARTED: {
            newState = update.set(state, 'list.loading', true);

           // newState = Object.assign({}, state, { list: { data: state.list.data, error: state.list.error, loading: true, } }); //update.set(state, 'list.loading', true);
            break;
        }
        case GET_LIST_DATA_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.data', action.payload.data);  
            break;
        }
        case GET_LIST_DATA_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.error', true);
           // newState = Object.assign({}, state, { list: { data: state.list.data, error: state.list.error, loading: true, } }); //update.set(state, 'list.loading', true);
            break;
        }


        default: {
            return newState;
        }
    }

    return newState;
}


export const getListData = () => {
    return (dispatch) => {
        dispatch(getListActions.started());

        AnimalService.getListData()
            .then((response) => {
            //     setTimeout(() => {
            //         dispatch(getListActions.success(response));

            // }, 3000);
                dispatch(getListActions.success(response));
            })
            .catch(() => {
                dispatch(getListActions.failed());
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: GET_LIST_DATA_STARTED
        }
    },

    success: (data) => {
        return {
            type: GET_LIST_DATA_SUCCESS,
            payload: data
        }
    },

    failed: (error) => {
        return {
            type: GET_LIST_DATA_FAILED
        }
    }
}

//
//
//
//

// import { createAction, createActions, handleActions } from 'redux-actions';
// const initState = {
//     showModalWindow: false,
//     messageStore: '',
//     urlLinkStore:''
// };

// export const { showModal, hideModal } = createActions('SHOW_MODAL', 'HIDE_MODAL');
// export const setMessage = createAction('SET_MESSAGE', message => ({ message }));


// export default handleActions({
//     [showModal]: (state) => Object.assign({}, state, { showModalWindow: true }), //як варіант
//     [hideModal]: (state) => ({ ...state, showModalWindow: false }),
//     [setMessage]: (state, { payload }) => ({ ...state, messageStore: payload.message })
// }, initState);