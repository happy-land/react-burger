import { ORDER_MODAL_OPEN, ORDER_MODAL_CLOSE } from '../constants';

import { TOrderActions } from '../actions/order';
import { TOrder } from '../types/data';

type TOrderState = {
  isOrderDetailsOpened: boolean;
  orderNumber: number | null;
  // order: TOrder | null;
}

// объект созданного заказа.
const orderInitialState: TOrderState = {
  isOrderDetailsOpened: false,
  orderNumber: null,
  // order: null
};

export const orderReducer = (state = orderInitialState, action: TOrderActions) => {
  switch (action.type) {
    case ORDER_MODAL_OPEN:
      return {
        ...state,
        isOrderDetailsOpened: true,
        orderNumber: action.payload,
      };
    case ORDER_MODAL_CLOSE:
      return {
        ...state,
        isOrderDetailsOpened: false,
        orderNumber: null
      };
    default:
      return state;
  }
};
