import { TPasswordRestoreActions } from '../actions/password-restore';
import {
  PASSWORD_RESTORE_REQUEST,
  PASSWORD_RESTORE_SUCCESS,
  PASSWORD_RESTORE_FAIL,
} from '../constants';

type TPasswordRestoreState = {
  response: string | null;  // unknown?
  isPswdRestoreRequestSent: boolean;
  isLoading: boolean;
  hasError: boolean;
};

const passwordRestoreInitialState: TPasswordRestoreState = {
  response: null,
  isPswdRestoreRequestSent: false,
  isLoading: false,
  hasError: false,
};

export const passwordRestoreReducer = (
  state = passwordRestoreInitialState,
  action: TPasswordRestoreActions
) => {
  switch (action.type) {
    case PASSWORD_RESTORE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case PASSWORD_RESTORE_SUCCESS: {
      return {
        ...state,
        response: action.payload,
        isPswdRestoreRequestSent: true,
        isLoading: false,
        hasError: false,
      };
    }
    case PASSWORD_RESTORE_FAIL: {
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
