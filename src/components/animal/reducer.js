import AnimalService from "./animalService";
import update from '../../helpers/update'

export const GET_LIST_DATA_STARTED = "animal/GET_LIST_DATA_STARTED";
export const GET_LIST_DATA_SUCCESS = "animal/GET_LIST_DATA_SUCCESS";
export const GET_LIST_DATA_FAILED = "animal/GET_LIST_DATA_FAILED";

export const CREATE_ANIMAL_STARTED = "animal/CREATE_ANIMAL_STARTED";
export const CREATE_ANIMAL_SUCCESS = "animal/CREATE_ANIMAL_SUCCESS";
export const CREATE_ANIMAL_FAILED = "animal/CREATE_ANIMAL_FAILED";

export const ADD_ANIMAL_LIKE_STARTED = "animal/ADD_ANIMAL_LIKE_STARTED";
export const ADD_ANIMAL_LIKE_SUCCESS = "animal/ADD_ANIMAL_LIKE_SUCCESS";
export const ADD_ANIMAL_LIKE_FAILED = "animal/ADD_ANIMAL_LIKE_FAILED";




const initialState = {
    form: {
        name: null,
        image: null
    },
    error: false,
    loading: false,
    isValid: false,
    success: false,
    like: {
        error: false,
        loading: false,
        success: false
    },
    list: {
        data: [],
        error: false,
        loading: false
    },
}

export const animalReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {

        case CREATE_ANIMAL_STARTED: {
            newState = update.set(state, 'loading', true);
            newState = update.set(newState, 'success', false);
            break;
        }
        case CREATE_ANIMAL_FAILED: {
            newState = update.set(state, 'loading', false);
            newState = update.set(newState, 'error', true);
            break;
        }
        case CREATE_ANIMAL_SUCCESS: {
            newState = update.set(state, 'loading', false);
            newState = update.set(newState, 'success', true);
            break;
        }

        //---------------------------------------------

        case GET_LIST_DATA_STARTED: {
            newState = update.set(state, 'list.loading', true);
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
            break;
        }

        default: {
            return newState;
        }
    }

    return newState;
}

export const createNewAnimal = (model) => {
    return (dispatch) => {
        dispatch(createAnimalActions.started());

        AnimalService.createNewAnimal(model)
            .then((response) => {
                console.log('--success post--', response.data);
                dispatch(createAnimalActions.success(response));
            })
            .catch(() => {
                console.log('--failed--');
                dispatch(createAnimalActions.failed());
            });
    }
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


export const createAnimalActions = {
    started: () => {
        return {
            type: CREATE_ANIMAL_STARTED
        }
    },

    success: (data) => {
        return {
            type: CREATE_ANIMAL_SUCCESS,
            payload: data
        }
    },

    failed: (error) => {
        return {
            type: CREATE_ANIMAL_FAILED
        }
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

