// REGISTER USER
// AUTH USER
import { checkResponse, checkSuccess } from '../../utils/utils';
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
  }
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
  }
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
  }
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
  }
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

export const registerUserThunk: AppThunk = (user: TUser) => (dispatch: AppDispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
  });

  registerRequest(user)
    .then(checkResponse)
    .then(checkSuccess)
    .then((res) => {
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: res,
      });
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
    .then(checkResponse)
    .then(checkSuccess)
    .then((res) => {
      dispatch({
        type: USER_AUTH_SUCCESS,
        payload: res,
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
    // .then(checkResponse)
    .then(checkSuccess)
    .then((res) => {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: res,
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

export const updateUserDataThunk: AppThunk = (user: TUser) => async (dispatch: AppDispatch) => {
  dispatch({
    type: UPDATE_USER_REQUEST,
  });
  await updateUserRequest(user)
    // .then(checkResponse)
    .then(checkSuccess)
    .then((res) => {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: res,
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
    .then(checkResponse)
    .then(checkSuccess)
    .then((res) => {
      dispatch({
        type: LOGOUT_USER_SUCCESS,
        payload: res,
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
