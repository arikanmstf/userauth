import axios from 'axios';
import qs from 'qs';
import { API } from '../../../common/Config';
import startedRequest from '../../../common/actions/StartedRequest';

export function resolvedSubmitLoginForm (response) {
    return {
        type: 'RESOLVED_SUBMIT_LOGIN_FORM',
        data: response.data.response
    };
}

export function submitLoginForm (form) {
    return (dispatch) => {
        dispatch(startedRequest());
        axios.get(API.submitLoginForm, qs.stringify({
            ...form
        }))
        .then(response => dispatch(resolvedSubmitLoginForm(response)));
    };
}
