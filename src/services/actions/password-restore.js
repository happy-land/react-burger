// RESTORE PASSWORD
import { baseUrl } from '../../utils/constants';
import { checkResponse, checkSuccess } from '../../utils/utils';

export const PASSWORD_RESTORE_REQUEST = 'PASSWORD_RESTORE_REQUEST';
export const PASSWORD_RESTORE_SUCCESS = 'PASSWORD_RESTORE_SUCCESS';
export const PASSWORD_RESTORE_FAIL = 'PASSWORD_RESTORE_FAIL';

export const restorePassword = () => (dispatch) => {
  dispatch({
    type: PASSWORD_RESTORE_REQUEST,
  });

  return fetch(`${baseUrl}/password-reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: '',
    }),
  })
    .then(checkResponse)
    .then(checkSuccess)
    .then((response) => {
      dispatch({
        type: PASSWORD_RESTORE_SUCCESS,
        payload: response,
      });
    })
    .catch((err) => {
      dispatch({
        type: PASSWORD_RESTORE_FAIL,
        payload: err,
        isLoading: false,
        hasError: true,
      });
    });
};
