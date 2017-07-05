import axios from 'axios';
import qs from 'qs';
import { API } from '../../../common/Config';
import { LOGIN_TOKEN_NAME, saveToStorage } from '../../../common/Helpers';
import { openModal } from '../../../modules/common/modal/ModalActions';
import startedRequest from '../../../common/actions/StartedRequest';

export function resolvedSubmitLoginForm (response) {
    return {
        type: 'RESOLVED_SUBMIT_LOGIN_FORM',
        data: response.data.response
    };
}
export function errorSubmitLoginForm (response) {
    return {
        type: 'ERROR_SUBMIT_LOGIN_FORM',
        data: response
    };
}

export function submitLoginForm (form) {
    return (dispatch) => {
        dispatch(startedRequest());
        axios.post(API.submitLoginForm, qs.stringify({
            ...form
        }))
        .then((response) => {
            dispatch(resolvedSubmitLoginForm(response));
            saveToStorage(LOGIN_TOKEN_NAME, response.data.login_token);
            window.location.href = window.location.href; // eslint-disable-line no-undef
        })
        .catch((message) => {
            dispatch(errorSubmitLoginForm(message));
            dispatch(openModal(message));
        });
    };
}
