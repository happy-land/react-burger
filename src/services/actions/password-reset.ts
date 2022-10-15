// RESET PASSWORD
import { baseUrl } from '../../utils/constants';
import { checkResponse, checkSuccess } from '../../utils/utils';

import {
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
} from '../constants';
import { AppDispatch, AppThunk } from '../types';

export interface IPasswordResetRequestAction {
  type: typeof PASSWORD_RESET_REQUEST;
}

export interface IPasswordResetSuccessAction {
  type: typeof PASSWORD_RESET_SUCCESS;
}

export interface IPasswordResetFailAction {
  type: typeof PASSWORD_RESET_FAIL;
}

export type TPasswordResetActions = 
  | IPasswordResetRequestAction
  | IPasswordResetSuccessAction
  | IPasswordResetFailAction;


export const resetPasswordThunk: AppThunk = (form) => (dispatch: AppDispatch) => {
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
      dispatch({
        type: PASSWORD_RESET_SUCCESS,
        payload: response,
      });
    })
    .catch((err) => {
      dispatch({
        type: PASSWORD_RESET_FAIL,
        payload: err,
        isLoading: false,
        hasError: true,
      });
    });
};
