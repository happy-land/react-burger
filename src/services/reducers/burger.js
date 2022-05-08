import {
  CONSTRUCTOR_ADD,
  CONSTRUCTOR_REMOVE,
  ORDER_SAVE_SUCCESS,
  ORDER_SAVE_FAIL,
} from '../actions/burger';

// список всех ингредиентов в текущем конструкторе бургера,
const burgerInitialState = {
  items: [],
  bun: null,
  totalPrice: 0,
  orderData: null,
  // isOrderDetailsOpened: false,
};

export const burgerReducer = (state = burgerInitialState, action) => {
  switch (action.type) {
    case CONSTRUCTOR_ADD:
      console.log(action.payload.price);
      return {
        ...state,
        items: [...state.items, action.payload],
        totalPrice: state.totalPrice + action.payload.price,
      };
    case CONSTRUCTOR_REMOVE:
      console.log(action.payload.id);
      return {
        ...state,
        items: [...state.items].filter((item) => item.id !== action.payload.id),
        totalPrice: state.totalPrice - action.payload.price,
      };
    case ORDER_SAVE_SUCCESS:
      return {
        ...state,
        orderData: action.payload
      }
    default:
      return state;
  }
};
