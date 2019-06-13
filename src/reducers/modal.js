import { createAction, createActions, handleActions } from 'redux-actions';
const initState = {
    showModalWindow: false,
    messageStore: ''
};

export const { showModal, hideModal } = createActions('SHOW_MODAL', 'HIDE_MODAL');
export const setMessage = createAction('SET_MESSAGE', message => ({ message }));


export default handleActions({
    [showModal]: (state) => Object.assign({}, state, { showModalWindow: true }), //як варіант
    [hideModal]: (state) => ({ ...state, showModalWindow: false }),
    [setMessage]: (state, { payload }) => ({ ...state, messageStore: payload.message })
}, initState);