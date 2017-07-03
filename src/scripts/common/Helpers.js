const EMAIL_REGEX = /^[0-9a-zA-Z\._+%-]+@[0-9a-zA-Z\.-]+\.[a-zA-Z\.]{2,6}$/; // eslint-disable-line no-useless-escape

export const validateNonEmpty = (field) => {
    return field;
};

export const validateEmail = (email) => {
    return validateNonEmpty(email) && EMAIL_REGEX.test(email);
};
