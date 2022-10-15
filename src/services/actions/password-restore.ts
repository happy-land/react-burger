// RESTORE PASSWORD
import { baseUrl } from '../../utils/constants';
import { checkResponse, checkSuccess } from '../../utils/utils';

import {
  PASSWORD_RESTORE_REQUEST,
  PASSWORD_RESTORE_SUCCESS,
  PASSWORD_RESTORE_FAIL,
} from '../constants';
import { AppDispatch, AppThunk } from '../types';

export interface IPasswordRestoreRequestAction {
  type: typeof PASSWORD_RESTORE_REQUEST;
}

export interface IPasswordRestoreSuccessAction {
  type: typeof PASSWORD_RESTORE_SUCCESS;
}

export interface IPasswordRestoreFailAction {
  type: typeof PASSWORD_RESTORE_FAIL;
}

export type TPasswordRestoreActions = 
  | IPasswordRestoreRequestAction
  | IPasswordRestoreSuccessAction
  | IPasswordRestoreFailAction;


export const restorePasswordThunk: AppThunk = () => (dispatch: AppDispatch) => {
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