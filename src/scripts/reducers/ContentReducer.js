const initialState = true;

const ContentReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'RESOLVED_CONTENT_LOADED':
    case 'RESOLVED_SUBMIT_LOGIN_FORM':
    case 'ERROR_SUBMIT_LOGIN_FORM':
        return true;
    case 'RESOLVED_CONTENT_NOT_LOADED':
        return false;
    default:
        return state;
    }
};

export default ContentReducer;
