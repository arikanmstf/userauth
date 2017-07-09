const API_PORT_NUMBER = 3001;
const home = `http://localhost:${API_PORT_NUMBER}/api`;
const membership = 'membership';
const users = 'users';
module.exports = {
    API: {
        submitLoginForm: `${home}/${membership}/login`,
        submitRegisterForm: `${home}/${membership}/register`,
        submitForgotForm: `${home}/${membership}/forgot`,
        submitValidation: `${home}/${membership}/validate`,
        getAllUsers: `${home}/${users}/get_all`,
        getAllLogins: `${home}/${users}/detail`,
        removeUser: `${home}/${users}/remove`
    },
    ErrorMessages: {
        CHECK_YOUR_MAIL: 'Your email address is not valid.',
        AN_ERROR_HAS: 'An error has occured',
        PASSWORD_NOT_MATCH: 'Passwords you entered not match',
        PASSWORD_TOO_SHORT: 'Password you entered is too short, should be 8 chars min.',
        PASSWORD_INVALID: 'Password you entered is invalid',
        MAIL_SENT_FOR_REGISTER: 'A confirmation mail has ben sent. Please check and confirm your registration.',
        INVALID_ACCOUNT: 'Your account is invalid, please validate your email.',
        USERNAME_TOO_SHORT: 'Your username is too short, should be 3 chars min.',
        USER_NOTFOUND: 'Requested user not found.',
        SESSION_EXP: 'Session Expired',
        EMAIL_PW: 'Email or password wrong',
        UN_EXISTS: 'Username or email already exists',
        VALIDATION_NOT_FOUND: 'Your validation record couldn"t be found. Try to re-register'
    },
    apiUrl: `http://localhost:${API_PORT_NUMBER}/api`,
    baseUrl: 'http://localhost:8080',
    EMAIL_REGEX: /^[0-9a-zA-Z\._+%-]+@[0-9a-zA-Z\.-]+\.[a-zA-Z\.]{2,6}$/, // eslint-disable-line no-useless-escape
    MIN_PASSWORD_LENGTH: 8,
    MIN_USERNAME_LENGTH: 3,
    RECORDS_PER_PAGE: 5,
    API_PORT_NUMBER
};
