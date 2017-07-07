import axios from 'axios';
import qs from 'qs';
import { API } from '../../../common/Config';
import { createErrorMessage } from '../../../common/Helpers';
import { openModal } from '../../../modules/common/modal/ModalActions';
import startedRequest from '../../../common/actions/StartedRequest';

export function resolvedSubmitValidation (response) {
    return {
        type: 'RESOLVED_SUBMIT_VALIDATION',
        data: response.data
    };
}
export function errorSubmitValidation (response) {
    return {
        type: 'COMMON_ERROR',
        data: response
    };
}

export function submitValidation (form) {
    return (dispatch) => {
        dispatch(startedRequest());
        axios.post(API.submitValidation, qs.stringify({
            ...form
        }))
        .then((response) => {
            dispatch(resolvedSubmitValidation(response));
        })
        .catch((message) => {
            message = createErrorMessage(message);
            dispatch(errorSubmitValidation(message));
            dispatch(openModal(message));
        });
    };
}
