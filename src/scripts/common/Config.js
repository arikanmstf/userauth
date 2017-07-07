export const baseUrl = 'http://localhost:8080/';
const home = 'http://localhost:3001/api';
const membership = 'membership';
const users = 'users';

export const API = {
    submitLoginForm: `${home}/${membership}/login`,
    submitRegisterForm: `${home}/${membership}/register`,
    submitForgotForm: `${home}/${membership}/forgot`,
    submitValidation: `${home}/${membership}/validate`,
    getAllUsers: `${home}/${users}/get_all`,
    getAllLogins: `${home}/${users}/detail`,
    removeUser: `${home}/${users}/remove`
};
