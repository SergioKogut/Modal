import { createAction, createActions, handleActions } from 'redux-actions';
const initState = {
    
    showModalWindow: false,
    modalWindow:{
            message: '',
            urlLink:''
                }
};

export const { showModal, hideModal } = createActions('SHOW_MODAL', 'HIDE_MODAL');
export const setMessage = createAction('SET_MESSAGE', data => ({ data }));


export default handleActions({
    [showModal]: (state) => Object.assign({}, state, { showModalWindow: true }), //як варіант
    [hideModal]: (state) => ({ ...state, showModalWindow: false }),
    [setMessage]: (state, { payload }) => ({ ...state, modalWindow: payload.data})
}, initState);