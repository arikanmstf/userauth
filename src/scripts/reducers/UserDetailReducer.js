const initialState = [];

const UserDetailReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'RESOLVED_GET_ALL_LOGINS':
        return action.data;
    default:
        return state;
    }
};

export default UserDetailReducer;
