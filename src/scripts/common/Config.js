const home = 'http://localhost:3001/api';
const membership = 'membership';

export const API = { // eslint-disable-line import/prefer-default-export
    someAction: home,
    submitLoginForm: `${home}/${membership}/login`
};
