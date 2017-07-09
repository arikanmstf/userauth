import axios from 'axios';
import qs from 'qs';
import { API } from '../../../common/Config';
import { getLoginToken, createErrorMessage } from '../../../common/Helpers';
import { openModal } from '../../../modules/common/modal/ModalActions';
import startedRequest from '../../../common/actions/StartedRequest';

export function resolvedGetAllUsers (response) {
    return {
        type: 'RESOLVED_GET_ALL_USERS',
        data: response.data
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
            login_token: getLoginToken()
        }))
        .then((response) => {
            dispatch(resolvedGetAllUsers(response));
        })
        .catch((message) => {
            message = createErrorMessage(message);
            dispatch(errorGetAllUsers(message));
            dispatch(openModal(message));
        });
    };
}

export function resolvedRemoveUser (response) {
    return {
        type: 'RESOLVED_GET_ALL_USERS',
        data: response.data
    };
}
export function errorRemoveUser (response) {
    return {
        type: 'COMMON_ERROR',
        data: response
    };
}
export function removeUser (form) {
    return (dispatch) => {
        dispatch(startedRequest());
        axios.post(API.removeUser, qs.stringify({
            ...form,
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
