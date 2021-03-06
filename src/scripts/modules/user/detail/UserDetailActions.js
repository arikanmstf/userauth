import axios from 'axios';
import qs from 'qs';
import { API } from '../../../common/Config';
import { getLoginToken, createErrorMessage } from '../../../common/Helpers';
import { openModal } from '../../../modules/common/modal/ModalActions';
import startedRequest from '../../../common/actions/StartedRequest';

export function resolvedGetAllLogins (response) {
    return {
        type: 'RESOLVED_GET_ALL_LOGINS',
        data: response.data.logins
    };
}
export function errorGetAllLogins (response) {
    return {
        type: 'COMMON_ERROR',
        data: response
    };
}
export function getAllLogins (form) {
    return (dispatch) => {
        dispatch(startedRequest());
        axios.post(API.getAllLogins, qs.stringify({
            ...form,
            login_token: getLoginToken()
        }))
        .then((response) => {
            dispatch(resolvedGetAllLogins(response));
        })
        .catch((message) => {
            message = createErrorMessage(message);
            dispatch(errorGetAllLogins(message));
            dispatch(openModal(message));
        });
    };
}

export function resolvedRemoveUser (response) {
    return {
        type: 'RESOLVED_GET_ALL_USERS',
        data: response.data.users
    };
}
export function errorRemoveUser (response) {
    return {
        type: 'COMMON_ERROR',
        data: response
    };
}
export function removeUser (username) {
    return (dispatch) => {
        dispatch(startedRequest());
        axios.post(API.removeUser, qs.stringify({
            username,
            login_token: getLoginToken()
        }))
        .then((response) => {
            dispatch(resolvedRemoveUser(response));
        })
        .catch((message) => {
            message = createErrorMessage(message);
            dispatch(errorRemoveUser(message));
            dispatch(openModal(message));
        });
    };
}
