import axios from 'axios';
import qs from 'qs';
import { API } from '../../../common/Config';
import { LOGIN_TOKEN_NAME, saveToStorage, checkEmail, getToken } from '../../../common/Helpers';
import { CHECK_YOUR_MAIL } from '../../../common/ErrorMessages';
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
        if (checkEmail(form.email)) {
            dispatch(startedRequest());
            axios.post(API.submitLoginForm, qs.stringify({
                ...form,
                app_token: getToken()
            }))
            .then((response) => {
                dispatch(resolvedSubmitLoginForm(response));
                saveToStorage(LOGIN_TOKEN_NAME, response.data.login_token);
                window.location.href = window.location.href; // eslint-disable-line no-undef
            })
            .catch((message) => {
                message = (message.response) ? message.response.data.error.message : message;
                dispatch(errorSubmitLoginForm(message));
                dispatch(openModal(message));
            });
        }
        else {
            dispatch(errorSubmitLoginForm(CHECK_YOUR_MAIL));
            dispatch(openModal(CHECK_YOUR_MAIL));
        }
    };
}
