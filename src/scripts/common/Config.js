const home = 'http://localhost:8080';
const membership = 'membership';

export const API = { // eslint-disable-line import/prefer-default-export
    someAction: home,
    submitLoginForm: `${home}/${membership}/login`
};
