import axios from 'axios';
import qs from 'qs';
import { API } from '../../../common/Config';
import { getLoginToken, createErrorMessage } from '../../../common/Helpers';
import { openModal } from '../../../modules/common/modal/ModalActions';
import startedRequest from '../../../common/actions/StartedRequest';

export function resolvedGetAllUsers (response) {
    return {
        type: 'RESOLVED_GET_ALL_USERS',
        data: response.data.users
    };
}
export function errorGetAllUsers (response) {
    return {
        type: 'COMMON_ERROR',
        data: response
    };
}

export function getAllUsers () {
    return (dispatch) => {
        dispatch(startedRequest());
        axios.post(API.getAllUsers, qs.stringify({
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
