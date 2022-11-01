import {
  FEED_CONNECTION_INIT,
  FEED_CONNECTION_CLOSE,
  FEED_CONNECTION_SUCCESS,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_CLOSED,
  FEED_GET_MESSAGE,
} from '../constants';
import { TOrder } from '../types/data';

type TFeedPayload = {
  data: {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
  }
}

export interface IFeedConnectionInitAction {
  type: typeof FEED_CONNECTION_INIT;
}

export interface IFeedConnectionCloseAction {
  type: typeof FEED_CONNECTION_CLOSE;
}

export interface IFeedConnectionSuccessAction {
  type: typeof FEED_CONNECTION_SUCCESS;
}

export interface IFeedConnectionErrorAction {
  type: typeof FEED_CONNECTION_ERROR;
  payload: string;
}

export interface IFeedConnectionClosedAction {
  type: typeof FEED_CONNECTION_CLOSED;
}

export interface IFeedGetMessage {
  type: typeof FEED_GET_MESSAGE;
  payload: TFeedPayload;
}

export type TFeedActions = 
  | IFeedConnectionInitAction
  | IFeedConnectionCloseAction
  | IFeedConnectionSuccessAction
  | IFeedConnectionErrorAction
  | IFeedConnectionClosedAction
  | IFeedGetMessage;