// RESET PASSWORD
import { baseUrl } from '../../utils/constants';
import { checkResponse, checkSuccess } from '../../utils/utils';

export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAIL = 'PASSWORD_RESET_FAIL';

export const resetPassword = (form) => (dispatch) => {
  dispatch({
    type: PASSWORD_RESET_REQUEST,
  });
  return fetch(`${baseUrl}/password-reset/reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })
    .then(checkResponse)
    .then(checkSuccess)
    .then((response) => {
      console.log(response);
      dispatch({
        type: PASSWORD_RESET_SUCCESS,
        payload: response,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: PASSWORD_RESET_FAIL,
        payload: err,
        isLoading: false,
        hasError: true,
      });
    });
};
