// RESET PASSWORD
import { baseUrl } from '../../utils/constants';
import { checkResponse, checkSuccess } from '../../utils/utils';

import {
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
} from '../constants';
import { AppDispatch, AppThunk } from '../types';
import { TResetPasswordForm } from '../types/data';

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

  // используется для типизации ответа сервера
  // POST-запрос к эндпоинту https://norma.nomoreparties.space/api/password-reset/reset.
  type TPasswordResetData = {
    message: string;
  }

export const resetPasswordThunk: AppThunk = (form: TResetPasswordForm) => (dispatch: AppDispatch) => {
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
    .then((result) => checkResponse<TPasswordResetData>(result))
    .then(checkSuccess)
    .then((responseBody) => {
      dispatch({
        type: PASSWORD_RESET_SUCCESS,
        payload: responseBody,
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
