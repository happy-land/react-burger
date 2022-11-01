import { TFeedActions } from '../actions/feed';
import {
  FEED_CONNECTION_SUCCESS,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_CLOSED,
  FEED_GET_MESSAGE
} from '../constants';
import { TOrder } from '../types/data';

type TFeedState = {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  isOpen: boolean;
  error: unknown;
}

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isOpen: false,
  error: null,
};

export const feedReducer = (state = initialState, action: TFeedActions) => {
  switch (action.type) {
    case FEED_CONNECTION_SUCCESS: {
      return {
        ...state,
        isOpen: true,
        error: null,
      };
    }
    case FEED_CONNECTION_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case FEED_CONNECTION_CLOSED: {
      return {
        ...state,
        isOpen: false,
      };
    }
    case FEED_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload.data.orders,
        total: action.payload.data.total,
        totalToday: action.payload.data.totalToday,
      };
    }
    default: {
      return state;
    }
  }
};