import axios from 'axios';
import qs from 'qs';
import { API } from '../../../common/Config';
import startedRequest from '../../../common/actions/StartedRequest';

export function resolvedSubmitLoginForm (response) {
    return {
        type: 'RESOLVED_SUBMIT_LOGIN_FORM',
        data: response.data.response
    };
}
export function errorSubmitLoginForm () {
    return {
        type: 'ERROR_SUBMIT_LOGIN_FORM',
        data: true
    };
}

export function submitLoginForm (form) {
    return (dispatch) => {
        dispatch(startedRequest());
        axios.post(API.submitLoginForm, qs.stringify({
            ...form
        }))
        .then(response => dispatch(resolvedSubmitLoginForm(response)))
        .catch(error => dispatch(errorSubmitLoginForm()));
    };
}
