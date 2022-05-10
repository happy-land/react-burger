import {
  CONSTRUCTOR_ADD_INGREDIENT,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_REMOVE_BUN,
  ORDER_SAVE_SUCCESS,
  ORDER_SAVE_FAIL,
} from '../actions/burger';

// список всех ингредиентов в текущем конструкторе бургера,
const burgerInitialState = {
  items: [],
  bun: null,
  totalPrice: 0,
  orderData: null,
};

export const burgerReducer = (state = burgerInitialState, action) => {
  switch (action.type) {
    case CONSTRUCTOR_ADD_INGREDIENT:
      return {
        ...state,
        items: [...state.items, action.payload],
        totalPrice: state.totalPrice + action.payload.price,
      };
    case CONSTRUCTOR_REMOVE_INGREDIENT:
      return {
        ...state,
        items: [...state.items].filter((item) => item.id !== action.payload.id),
        totalPrice: state.totalPrice - action.payload.price,
      };
    case CONSTRUCTOR_ADD_BUN:
      console.log(action.payload);
      return {
        ...state,
        bun: action.payload,
        totalPrice: state.bun 
        ? state.totalPrice - state.bun.price * 2 + action.payload.price * 2
        : state.totalPrice + action.payload.price * 2
      };
    // case CONSTRUCTOR_REMOVE_BUN:
    //   return {
    //     ...state,
    //     bun: null,
    //     totalPrice: state.totalPrice - action.payload.price,
    //   };
    case ORDER_SAVE_SUCCESS:
      return {
        ...state,
        orderData: action.payload
      }
    default:
      return state;
  }
};
