import { ORDER_MODAL_OPEN, ORDER_MODAL_CLOSE } from '../actions/order';

// объект созданного заказа.
const orderInitialState = {
  isOrderDetailsOpened: false,
  orderNumber: null,
};

export const orderReducer = (state = orderInitialState, action) => {
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
