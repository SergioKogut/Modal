import { createSlice } from 'redux-starter-kit';  // createAction, createReducer,
import AnimalService from "./animalService";
import update from '../../helpers/update'

//import {put,takeEvery,takeLatest,call} from 'redux-saga/effects';
// export const createGirlStarted = createAction('girl/create_Girl_Started');
// export const createGirlSuccess = createAction('girl/create_Girl_Success');
// export const createGirlFailed = createAction('girl/create_Girl_Failed');

//Action saga
//export const createGirlSaga = createAction('create_Girl_Saga');

const initialState = {
    like: {
        error: false,
        loading: false,
        success: false
    },
    create: {
        error: false,
        loading: false,
        success: false
    }
};
//- EXAMPLE


const defaultState = {
    status: "new"
  };
  
  export const game =  createSlice({
    slice: "game",
    initialState: defaultState,
    reducers: {
      startGame: s => void (s.status = "playing"),
      pauseGame: s => void (s.status = "paused"),
      gameOver: s => void (s.status = "over")
    }
  });
  



//-----------------CREATESLICE

// const initialState2 = {
//     error: false,
//     loading: false,
//     success: false
// };

// export const girl = createSlice({
//     slice: 'girl',
//     initialState: initialState,
//     reducers: {
//         createGirlStarted: state => {
//             return { ...state, loading: true, success: false }
//         },
//         createGirlSuccess: (state, action) => {
//             return { ...state, loading: false, success: true }
//         },
//         createGirlFailed: state => {
//             return { ...state, loading: false, error: true }
//         }
//     }
// });


export const girl = createSlice({
    slice: 'girl',
    initialState: initialState,
    reducers: {
        createGirlStarted: state => {
            let newState = state;
            newState = update.set(state, 'create.loading', true);
            newState = update.set(newState, 'create.success', false);
         return newState;
        },
        createGirlSuccess: (state, action) => {
            let newState = state;
            const data = action.payload.data;
            console.log("create girl", data);
            newState = update.set(state, 'create.loading', false);
            newState = update.set(newState, 'create.success', true);
            return newState;
        },
        createGirlFailed: state => {
            let newState = state;
            newState = update.set(state, 'create.loading', false);
            newState = update.set(newState, 'create.error', true);
            return newState;
        }
    }
});
 
//saga
// export  function* watchCreateGirl() {
//   yield takeLatest(createGirlSaga,createGirlAsync);
//  }

//  function* createGirlAsync() {
//     yield put(console.log('Hello Sagas!'));
//  }

//  function* createGirlAsync(model) {
//     try {
//         yield put(createGirlStarted());
//         const data = yield call((model) => {
//           return  AnimalService.createNewGirl(model)
//           .then((response) => {
//               console.log('--success create--', response.data)
//            ;})
//           }
//         );
//         yield put(createGirlSuccess(data));
//       } catch (error) {
//         yield put(createGirlFailed());
//       }
//  }


// export const girlReducer = createReducer(initialState, {


//     [createGirlStarted]: state => {
//         return {
//             ...state,
//             create: {
//                 loading: true,
//                 success: false
//             }
//         }
//         // let newState = state;
//         // newState = update.set(state, 'create.loading', true);
//         // // let view= {...newState};
//         // // console.log('view',view);
//         // newState = update.set(newState, 'create.success', false);
//         // return newState;



//     },
//     [createGirlSuccess]: (state, action) => {

//         return {
//             ...state,
//             create: {
//                 loading: false,
//                 success: true
//             }
//         }

//         //     let newState = state;
//         //     const data = action.payload.data;
//         //     console.log("create girl", data);
//         //     newState = update.set(state, 'create.loading', false);
//         //     newState = update.set(newState, 'create.success', true);
//         //     return newState;
//     },
//     [createGirlFailed]: state => {
//         //     let newState = state;
//         // newState = update.set(state, 'create.loading', false);
//         // newState = update.set(newState, 'create.error', true);
//         // return newState;
//         return {
//             ...state,
//             create: {
//                 loading: false,
//                 error: true
//             }
//         }

//     }
// });

export const createNewGirl = (model) => {
    return (dispatch) => {
        dispatch(girl.actions.createGirlStarted());

        AnimalService.createNewGirl(model)
            .then((response) => {
                console.log('--success create--', response.data);
                dispatch(girl.actions.createGirlSuccess(response));
            })
            .catch(() => {
                console.log('--failed--');
                dispatch(girl.actions.createGirlFailed());
            });
    }
}