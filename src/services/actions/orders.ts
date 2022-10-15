import {
  ORDERS_CONNECTION_INIT,
  ORDERS_CONNECTION_CLOSE,
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_CONNECTION_CLOSED,
  ORDERS_CONNECTION_ERROR,
  ORDERS_GET_MESSAGE,
 } from '../constants';
import { TOrder } from '../types/data';

type TOrdersPayload = {
  data: {
    orders: Array<TOrder>;
  }
}

export interface IOrdersConnectionInitAction {
  type: typeof ORDERS_CONNECTION_INIT;
}

export interface IOrdersConnectionCloseAction {
  type: typeof ORDERS_CONNECTION_CLOSE;
}

export interface IOrdersConnectionSuccessAction {
  type: typeof ORDERS_CONNECTION_SUCCESS;
}

export interface IOrdersConnectionClosedAction {
  type: typeof ORDERS_CONNECTION_CLOSED;
}

export interface IOrdersConnectionErrorAction {
  type: typeof ORDERS_CONNECTION_ERROR;
  payload: string; // ?
}

export interface IOrdersGetMessageAction {
  type: typeof ORDERS_GET_MESSAGE;
  payload: TOrdersPayload;
}

export type TOrdersActions = 
  | IOrdersConnectionInitAction
  | IOrdersConnectionCloseAction
  | IOrdersConnectionSuccessAction
  | IOrdersConnectionClosedAction
  | IOrdersConnectionErrorAction
  | IOrdersGetMessageAction;