import CryptoJS from 'crypto-js';
import Storage from './Storage';
import AN_ERROR_HAS from './ErrorMessages';
import { baseUrl } from './Config';

const EMAIL_REGEX = /^[0-9a-zA-Z\._+%-]+@[0-9a-zA-Z\.-]+\.[a-zA-Z\.]{2,6}$/; // eslint-disable-line no-useless-escape
const TOKEN_PREFIX = '2kE-Ke|@22t&g@<';
const APP_TOKEN_NAME = 'UserAuthAppToken';
export const LOGIN_TOKEN_NAME = 'UserAuthLoginToken';

export const validateNonEmpty = (field) => {
    return field;
};

export const validateEmail = (email) => {
    return validateNonEmpty(email) && EMAIL_REGEX.test(email);
};

export const getAppToken = () => {
    return Storage.get(APP_TOKEN_NAME);
};
export const getLoginToken = () => {
    return Storage.get(LOGIN_TOKEN_NAME);
};
const setToken = () => {
    const randomString = Math.random() + new Date().getTime();
    const hash = CryptoJS.SHA1(TOKEN_PREFIX + randomString).toString(CryptoJS.enc.Hex); // eslint-disable-line new-cap
    Storage.set(APP_TOKEN_NAME, hash);
    return getAppToken();
};
export const setOrGetToken = () => {
    return (getAppToken() || setToken());
};

export const isLoggedIn = () => {
    return Storage.get(LOGIN_TOKEN_NAME);
};
export const logOut = () => {
    Storage.delete(LOGIN_TOKEN_NAME);
    window.location.href = baseUrl; // eslint-disable-line no-undef
};

export const saveToStorage = (key, value) => {
    return Storage.set(key, value);
};

export const checkEmail = (email) => {
    return EMAIL_REGEX.test(email);
};
export const createErrorMessage = (message) => {
    console.error(message);
    if (typeof message !== 'string') {
        if (message.response && message.response.data) {
            if (message.response.data.error) {
                message = message.response.data.error.message;
            }
            else {
                message = message.response.statusText;
            }
        }
        else {
            message = AN_ERROR_HAS;
        }
    }
    return message;
};
