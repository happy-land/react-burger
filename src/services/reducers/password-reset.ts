import { TPasswordResetActions } from '../actions/password-reset';
import {
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL
} from '../constants';

type TPasswordResetState = {
  response: unknown;
  isLoading: boolean;
  hasError: boolean;
}

const passwordResetInitialState: TPasswordResetState = {
  response: null,
  isLoading: false,
  hasError: false,
};

export const passwordResetReducer = (state = passwordResetInitialState, action: TPasswordResetActions) => {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    };
    case PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        response: action.payload,
        isLoading: false,
        hasError: false,
      }
    };
    case PASSWORD_RESET_FAIL: {
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