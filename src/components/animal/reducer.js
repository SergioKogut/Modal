import AnimalService from "./animalService";

export const GET_LIST_DATA_STARTED = "animal/GET_LIST_DATA_STARTED";
export const GET_LIST_DATA_SUCCESS = "animal/GET_LIST_DATA_SUCCESS";
export const GET_LIST_DATA_FAILED = "animal/GET_LIST_DATA_FAILED";



const initialState = {
    list: {
        data: [],
        error: false,
        loading: false
    },
}

export const animalReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {

        case GET_LIST_DATA_STARTED: {
            newState = Object.assign({}, state, { list: { data: state.list.data, error: state.list.error, loading: true, } }); //update.set(state, 'list.loading', true);
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