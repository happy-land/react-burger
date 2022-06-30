import { deleteCookie, setCookie } from '../../utils/utils';
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
} from '../actions/user';

const userInitialState = {
  response: null,
  isLoading: false,
  hasError: false,
  accessToken: '',
  refreshToken: '',
  isAuth: false,
  user: {
    email: '',
    name: '',
  },
};

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case USER_REGISTER_SUCCESS: {
      let authToken;
      const res = action.payload;
      console.log('USER_REGISTER_SUCCESS');
      console.log(res);

      authToken = res.accessToken.split('Bearer ')[1];
      // сохраняем accessToken в куке
      if (authToken) {
        setCookie('accessToken', authToken);
      }

      // сохраняем refreshToken в localStorage
      if (res.refreshToken) {
        localStorage.setItem('refreshToken', res.refreshToken);
      }
      console.log('user:');
      console.log(res.user);

      return {
        ...state,
        accessToken: authToken,
        refreshToken: res.refreshToken,
        user: res.user,
        response: action.payload,
        isLoading: false,
        hasError: false,
      };
    }
    case USER_REGISTER_FAIL: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    case USER_AUTH_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case USER_AUTH_SUCCESS: {
      let authToken;
      const res = action.payload;
      console.log(USER_AUTH_SUCCESS);
      console.log(res);

      authToken = res.accessToken.split('Bearer ')[1];

      // сохраняем accessToken в куке
      if (authToken) {
        setCookie('accessToken', authToken);
      }

      // сохраняем refreshToken в localStorage
      if (res.refreshToken) {
        localStorage.setItem('refreshToken', res.refreshToken);
      }

      return {
        ...state,
        accessToken: authToken,
        refreshToken: res.refreshToken,
        isAuth: true,
        user: res.user,
        isLoading: false,
        hasError: false,
      };
    }
    case USER_AUTH_FAIL: {
      console.log(USER_AUTH_FAIL);
      return {
        ...state,
        isAuth: false,
        isLoading: false,
        hasError: true,
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_USER_SUCCESS: {
      const res = action.payload;
      // console.log(GET_USER_SUCCESS);

      return {
        ...state,
        isAuth: true,
        user: res.user,
        isLoading: false,
        hasError: false,
      };
    }
    case GET_USER_FAIL: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      const res = action.payload;
      return {
        ...state,
        isAuth: true,
        user: res.user,
        isLoading: false,
        hasError: false,
      };
    }
    case UPDATE_USER_FAIL: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOGOUT_USER_SUCCESS: {

      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        user: null
      }
    }
    case LOGOUT_USER_FAIL: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }

    default:
      return state;
  }
};
