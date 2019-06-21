import { createAction,  handleActions } from 'redux-actions'; //createActions,
const initState = {
    
    showModalWindow: false,
    modalWindow:{
            title:'Модальное окно',
            message: '',
            urlLink:''
                }
};

//export const {hideModal } = createActions('SHOW_MODAL', 'HIDE_MODAL');
export const setMessage = createAction('SET_MESSAGE', data => ({ data }));
export const showModal = createAction('SHOW_MODAL', data => ({ data }));
export const hideModal  = createAction('HIDE_MODAL');
export default handleActions({
   // [showModal]: (state) => Object.assign({}, state, { showModalWindow: true }), //як варіант
    [showModal]: (state, { payload }) => Object.assign({}, state, { showModalWindow: true, modalWindow:payload.data}), //як варіант
    [hideModal]: (state) => ({ ...state, showModalWindow: false }),
    [setMessage]: (state, { payload }) => ({ ...state, modalWindow: payload.data})
}, initState);