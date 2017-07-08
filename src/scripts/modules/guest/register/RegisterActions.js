import axios from 'axios';
import qs from 'qs';
import { API, ErrorMessages } from '../../../common/Config';
import { checkEmail, createErrorMessage, validatePassword } from '../../../common/Helpers';
import { openModal } from '../../../modules/common/modal/ModalActions';
import startedRequest from '../../../common/actions/StartedRequest';

export function resolvedSubmitRegisterForm (response) {
    return {
        type: 'RESOLVED_SUBMIT_REGISTER_FORM',
        data: response.data
    };
}
export function errorSubmitRegisterForm (response) {
    return {
        type: 'COMMON_ERROR',
        data: response
    };
}

export function submitRegisterForm (form) {
    return (dispatch) => {
        if (checkEmail(form.email)) {
            const passwordNotValid = validatePassword(form.password, form.password_again);
            if (!passwordNotValid) {
                dispatch(startedRequest());
                axios.post(API.submitRegisterForm, qs.stringify({
                    ...form
                }))
                .then((response) => {
                    if (!response.error) {
                        dispatch(resolvedSubmitRegisterForm(response));
                        dispatch(openModal(ErrorMessages.MAIL_SENT_FOR_REGISTER));
                    }
                })
                .catch((message) => {
                    message = createErrorMessage(message);
                    dispatch(errorSubmitRegisterForm(message));
                    dispatch(openModal(message));
                });
            }
            else {
                dispatch(errorSubmitRegisterForm(passwordNotValid));
                dispatch(openModal(passwordNotValid));
            }
        }
        else {
            dispatch(errorSubmitRegisterForm(ErrorMessages.CHECK_YOUR_MAIL));
            dispatch(openModal(ErrorMessages.CHECK_YOUR_MAIL));
        }
    };
}
