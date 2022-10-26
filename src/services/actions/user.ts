// REGISTER USER
// AUTH USER
import { checkResponse, checkSuccess, TResponse } from '../../utils/utils';
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  getUserRequest,
  updateUserRequest,
} from '../../utils/api';

import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_AUTH_REQUEST,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
} from '../constants';
import { AppDispatch, AppThunk } from '../types';
import { TLoginForm, TUser } from '../types/data';
import { baseUrl } from '../../utils/constants';

//=
export interface IUserRegisterRequestAction {
  type: typeof USER_REGISTER_REQUEST;
}

export interface IUserRegisterSuccessAction {
  type: typeof USER_REGISTER_SUCCESS;
  payload: {
    accessToken: string;
    refreshToken: string;
    user: TUser;
  };
}

export interface IUserRegisterFailAction {
  type: typeof USER_REGISTER_FAIL;
}
//=
export interface IUserAuthRequestAction {
  type: typeof USER_AUTH_REQUEST;
}

export interface IUserAuthSuccessAction {
  type: typeof USER_AUTH_SUCCESS;
  payload: {
    accessToken: string;
    refreshToken: string;
    user: TUser;
  };
}

export interface IUserAuthFailAction {
  type: typeof USER_AUTH_FAIL;
}

//=
export interface IGetUserRequestAction {
  type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
  type: typeof GET_USER_SUCCESS;
  payload: {
    user: TUser;
  };
}

export interface IGetUserFailAction {
  type: typeof GET_USER_FAIL;
}

//=
export interface IUpdateUserRequestAction {
  type: typeof UPDATE_USER_REQUEST;
}
export interface IUpdateUserSuccessAction {
  type: typeof UPDATE_USER_SUCCESS;
  payload: {
    user: TUser;
  };
}
export interface IUpdateUserFailAction {
  type: typeof UPDATE_USER_FAIL;
}

export interface ILogoutUserRequestAction {
  type: typeof LOGOUT_USER_REQUEST;
}
export interface ILogoutUserSuccessAction {
  type: typeof LOGOUT_USER_SUCCESS;
}
export interface ILogoutUserFailAction {
  type: typeof LOGOUT_USER_FAIL;
}

export type TUserActions =
  | IUserRegisterRequestAction
  | IUserRegisterSuccessAction
  | IUserRegisterFailAction
  | IUserAuthRequestAction
  | IUserAuthSuccessAction
  | IUserAuthFailAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailAction
  | IUpdateUserRequestAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailAction
  | ILogoutUserRequestAction
  | ILogoutUserSuccessAction
  | ILogoutUserFailAction;

// используется для типизации ответа сервера 
// при регистрации нового пользователя 
type TRegisterData = {
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

// при аутентификации пользователя с сервера приходят данные
// в том же формате, что и при регистрации нового пользователя
type TAuthUserData = TRegisterData;

// используется для типизации ответа сервера при получении
// данных пользователя
type TGetUserData = {
  user: TUser;
}

// используется для типизации ответа сервера 
// при выходе из личного кабинета
type TUserLogout = {
  message: string;
}

export const registerUserThunk: AppThunk = (user: TUser) => (dispatch: AppDispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
  });

  registerRequest(user)
    .then((result) => checkResponse<TRegisterData>(result))
    .then(checkSuccess)
    .then((responseBody) => {
      if (user) {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: {
            accessToken: responseBody.accessToken,
            refreshToken: responseBody.refreshToken,
            user: responseBody.user,
          },
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: err,
        isLoading: false,
        hasError: true,
      });
    });
};

export const authUserThunk: AppThunk = (form: TLoginForm) => (dispatch: AppDispatch) => {
  dispatch({
    type: USER_AUTH_REQUEST,
  });

  loginRequest(form)
    .then((result) => checkResponse<TAuthUserData>(result))
    .then(checkSuccess)
    .then((responseBody) => {
      dispatch({
        type: USER_AUTH_SUCCESS,
        payload: {
          accessToken: responseBody.accessToken,
          refreshToken: responseBody.refreshToken,
          user: responseBody.user,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: USER_AUTH_FAIL,
        payload: err,
        isLoading: false,
        hasError: true,
      });
    });
};

export const getUserDataThunk: AppThunk = () => async (dispatch: AppDispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
  });

  await getUserRequest()
    .then((result) => checkResponse<TGetUserData>(result))
    .then(checkSuccess)
    .then((responseBody) => {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: responseBody,
        isLoading: false,
        hasError: false,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_USER_FAIL,
        payload: err,
        isLoading: false,
        hasError: true,
      });
    });
};

export const updateUserDataThunk: AppThunk =
  (user: TUser) => async (dispatch: AppDispatch) => {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    await updateUserRequest(user)
      .then((result) => checkResponse<TGetUserData>(result))
      .then(checkSuccess)
      .then((responseBody) => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: responseBody,
          isLoading: false,
          hasError: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_USER_FAIL,
          payload: err,
          isLoading: false,
          hasError: true,
        });
      });
  };

export const logoutThunk: AppThunk = () => async (dispatch: AppDispatch) => {
  dispatch({
    type: LOGOUT_USER_REQUEST,
  });

  await logoutRequest()
    .then((result) => checkResponse<TUserLogout>(result))
    .then(checkSuccess)
    .then((responseBody) => {
      dispatch({
        type: LOGOUT_USER_SUCCESS,
        payload: responseBody,
        isLoading: false,
        hasError: false,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGOUT_USER_FAIL,
        payload: err,
        isLoading: false,
        hasError: true,
      });
    });
};
