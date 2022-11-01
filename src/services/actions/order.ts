import { ORDER_MODAL_OPEN, ORDER_MODAL_CLOSE } from '../constants';

export interface IOpenOrderModalAction {
  type: typeof ORDER_MODAL_OPEN;
  payload: number;
}

export interface ICloseModalAction {
  type: typeof ORDER_MODAL_CLOSE;
}

export type TOrderActions = 
  | IOpenOrderModalAction
  | ICloseModalAction;

export const openOrderModalAction = (orderNumber: number): IOpenOrderModalAction => ({
  type: ORDER_MODAL_OPEN,
  payload: orderNumber,
});

export const closeOrderModalAction = (): ICloseModalAction => ({
  type: ORDER_MODAL_CLOSE,
});
