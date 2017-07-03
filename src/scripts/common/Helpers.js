import CryptoJS from 'crypto-js';
import Storage from './Storage';

const EMAIL_REGEX = /^[0-9a-zA-Z\._+%-]+@[0-9a-zA-Z\.-]+\.[a-zA-Z\.]{2,6}$/; // eslint-disable-line no-useless-escape
const TOKEN_PREFIX = '2kE-Ke|@22t&g@<';
const STORAGE_TOKEN_NAME = 'UserAuthAppToken';

export const validateNonEmpty = (field) => {
    return field;
};

export const validateEmail = (email) => {
    return validateNonEmpty(email) && EMAIL_REGEX.test(email);
};

const getToken = () => {
    return Storage.get(STORAGE_TOKEN_NAME);
};
const setToken = () => {
    const randomString = Math.random() + new Date().getTime();
    const hash = CryptoJS.SHA1(TOKEN_PREFIX + randomString).toString(CryptoJS.enc.Hex); // eslint-disable-line new-cap
    Storage.set(STORAGE_TOKEN_NAME, hash);
    return getToken();
};
export const setOrGetToken = () => {
    return (getToken() || setToken());
};
