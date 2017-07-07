import axios from 'axios';
import qs from 'qs';
import { API, baseUrl } from '../../../common/Config';
import { LOGIN_TOKEN_NAME, saveToStorage, checkEmail, getAppToken, createErrorMessage } from '../../../common/Helpers';
import { CHECK_YOUR_MAIL } from '../../../common/ErrorMessages';
import { openModal } from '../../../modules/common/modal/ModalActions';
import startedRequest from '../../../common/actions/StartedRequest';

export function resolvedSubmitLoginForm (response) {
    return {
        type: 'RESOLVED_SUBMIT_LOGIN_FORM',
        data: response.data
    };
}
export function errorSubmitLoginForm (response) {
    return {
        type: 'COMMON_ERROR',
        data: response
    };
}

export function submitLoginForm (form) {
    return (dispatch) => {
        if (checkEmail(form.email)) {
            dispatch(startedRequest());
            axios.post(API.submitLoginForm, qs.stringify({
                ...form,
                app_token: getAppToken()
            }))
            .then((response) => {
                dispatch(resolvedSubmitLoginForm(response));
                saveToStorage(LOGIN_TOKEN_NAME, response.data.login_token);
                window.location.href = baseUrl; // eslint-disable-line no-undef
            })
            .catch((message) => {
                message = createErrorMessage(message);
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
