const home = 'http://localhost:3001/api';
const membership = 'membership';
const users = 'users';

export const API = { // eslint-disable-line import/prefer-default-export
    someAction: home,
    submitLoginForm: `${home}/${membership}/login`,
    getAllUsers: `${home}/${users}/get_all`
};
