import { createAction,createReducer } from 'redux-starter-kit';
import AnimalService from "./animalService";
import update from '../../helpers/update'

export const createGirlStarted = createAction('girl/create_Girl_Started');
export const createGirlSuccess = createAction('girl/create_Girl_Success');
export const createGirlFailed = createAction('girl/create_Girl_Failed');

const initialState = {
     create: {
        error: false,
        loading: false,
        success: false
    }
};

export const girlReducer = createReducer(initialState, {
    
    
    [createGirlStarted] : state => {
        let newState = state;
        newState = update.set(state, 'create.loading', true);
        newState = update.set(newState, 'create.success', false);
        return newState;

    },
    [createGirlSuccess] : (state, action) => {
        let newState = state;
        const data = action.payload.data;
        console.log("create girl",data);
        newState = update.set(state, 'create.loading', false);
        newState = update.set(newState, 'create.success', true);
        return newState;
    },
    [createGirlFailed] : state => {
            let newState = state;
        newState = update.set(state, 'create.loading', false);
        newState = update.set(newState, 'create.error', true);
        return newState;
    }
});

export const createNewGirl = (model) => {
    return (dispatch) => {
        dispatch(createGirlStarted());

        AnimalService.createNewGirl(model)
            .then((response) => {
                console.log('--success create--', response.data);
                dispatch(createGirlSuccess(response));
            })
            .catch(() => {
                console.log('--failed--');
                dispatch(createGirlFailed());
            });
    }
}