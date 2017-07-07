const initialState = false;

const ValidationReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'RESOLVED_SUBMIT_VALIDATION':
        return action.data;
    default:
        return state;
    }
};

export default ValidationReducer;
