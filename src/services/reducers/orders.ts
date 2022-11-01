import {
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_CONNECTION_ERROR,
  ORDERS_CONNECTION_CLOSED,
  ORDERS_GET_MESSAGE
} from '../constants';
import { TOrder } from '../types/data';
import { TOrdersActions } from '../actions/orders';

type TOrdersState = {
  orders: Array<TOrder>;
  isOpen: boolean;
  error: unknown;
}

const initialState: TOrdersState = {
  orders: [],
  // total: 0,
  // totalToday: 0,
  isOpen: false,
  error: null,
};

export const ordersReducer = (state = initialState, action: TOrdersActions) => {
  switch (action.type) {
    case ORDERS_CONNECTION_SUCCESS: {
      return {
        ...state,
        isOpen: true,
        error: null,
      };
    }
    case ORDERS_CONNECTION_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ORDERS_CONNECTION_CLOSED: {
      return {
        ...state,
        isOpen: false,
      };
    }
    case ORDERS_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload.data.orders,
        // total: action.payload.data.total,
        // totalToday: action.payload.data.totalToday,
      };
    }
    default: {
      return state;
    }
  }
}