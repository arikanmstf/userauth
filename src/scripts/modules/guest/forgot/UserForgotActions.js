import axios from 'axios';
import qs from 'qs';
import { API, ErrorMessages } from '../../../common/Config';
import { checkEmail, createErrorMessage } from '../../../common/Helpers';
import { openModal } from '../../../modules/common/modal/ModalActions';
import startedRequest from '../../../common/actions/StartedRequest';

export function resolvedSubmitForgotForm (response) {
    return {
        type: 'RESOLVED_SUBMIT_REGISTER_FORM',
        data: response
    };
}
export function errorSubmitForgotForm (response) {
    return {
        type: 'COMMON_ERROR',
        data: response
    };
}

export function submitForgotForm (form) {
    return (dispatch) => {
        if (checkEmail(form.email)) {
            dispatch(startedRequest());
            axios.post(API.submitForgotForm, qs.stringify({
                ...form
            }))
            .then(() => {
                dispatch(resolvedSubmitForgotForm());
                dispatch(openModal('Your new password has been sent your email address if you registered before.'));
            })
            .catch((message) => {
                message = createErrorMessage(message);
                dispatch(errorSubmitForgotForm(message));
                dispatch(openModal(message));
            });
        }
        else {
            dispatch(errorSubmitForgotForm(ErrorMessages.CHECK_YOUR_MAIL));
            dispatch(openModal(ErrorMessages.CHECK_YOUR_MAIL));
        }
    };
}
