import {
  PASSWORD_RESTORE_REQUEST,
  PASSWORD_RESTORE_SUCCESS,
  PASSWORD_RESTORE_FAIL,
} from '../actions/password-restore';

const passwordRestoreInitialState = {
  response: null,
  isPswdRestoreRequestSent: false,
  isLoading: false,
  hasError: false,
};

export const passwordRestoreReducer = (state = passwordRestoreInitialState, action) => {
  switch (action.type) {
    case PASSWORD_RESTORE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    };
    case PASSWORD_RESTORE_SUCCESS: {
      return {
        ...state,
        response: action.payload,
        isPswdRestoreRequestSent: true,
        isLoading: false,
        hasError: false,
      }
    };
    case PASSWORD_RESTORE_FAIL: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    }
    
    default: 
    return state;
  }
}