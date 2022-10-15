import { TPasswordRestoreActions } from '../actions/password-restore';
import {
  PASSWORD_RESTORE_REQUEST,
  PASSWORD_RESTORE_SUCCESS,
  PASSWORD_RESTORE_FAIL,
} from '../constants';

type TPasswordRestoreState = {
  isPswdRestoreRequestSent: boolean;
  isLoading: boolean;
  hasError: boolean;
};

const passwordRestoreInitialState: TPasswordRestoreState = {
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
