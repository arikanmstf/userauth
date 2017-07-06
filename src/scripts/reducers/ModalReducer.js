const initialState = '';

const ModalReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'RESOLVED_OPEN_MODAL':
        return action.data;
    case 'RESOLVED_CLOSE_MODAL':
        return action.data;
    default:
        return state;
    }
};

export default ModalReducer;
