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

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';

export const USER_AUTH_REQUEST = 'USER_AUTH_REQUEST';
export const USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS';
export const USER_AUTH_FAIL = 'USER_AUTH_FAIL';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAIL = 'GET_USER_FAIL';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAIL = 'LOGOUT_USER_FAIL';

export const registerUser = (form) => (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
  });

  registerRequest(form)
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

export const authUser = (form) => (dispatch) => {
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

export const getUserData = () => async (dispatch) => {
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

export const updateUserData = (form) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER_REQUEST,
  });
  await updateUserRequest(form)
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

export const logout = () => async (dispatch) => {
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
