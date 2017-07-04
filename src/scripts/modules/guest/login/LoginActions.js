import axios from 'axios';
import Storage from 'common/Storage';
import { API } from 'common/Config';
import StartedRequest from 'common/actions/StartedRequest';

export function ResolvedSubmitLoginForm(response) {
  return {
    type: 'RESOLVED_SUBMIT_LOGIN_FORM',
    data: response.data.response
  };
}

export function submitLoginForm(form) {
	return (dispatch) => {
    dispatch(StartedRequest());
		axios.get(API.submitLoginForm, {
				params: {
					...form
				}
			})
		.then((response) => dispatch(ResolvedSubmitLoginForm(response)));
	};
}
