import axios from 'axios';
import qs from 'qs';
import { API } from '../../../common/Config';
import { getLoginToken, getAppToken, createErrorMessage } from '../../../common/Helpers';
import { openModal } from '../../../modules/common/modal/ModalActions';
import startedRequest from '../../../common/actions/StartedRequest';

export function resolvedGetAllUsers (response) {
    return {
        type: 'RESOLVED_GET_ALL_USERS',
        data: response.data.response
    };
}
export function errorGetAllUsers (response) {
    return {
        type: 'COMMON_ERROR',
        data: response
    };
}

export function getAllUsers (form) {
    return (dispatch) => {
        dispatch(startedRequest());
        axios.post(API.getAllUsers, qs.stringify({
            ...form,
            app_token: getAppToken(),
            login_token: getLoginToken()
        }))
        .then((response) => {

        })
        .catch((message) => {
            message = createErrorMessage(message);
            dispatch(errorGetAllUsers(message));
            dispatch(openModal(message));
        });
    };
}
