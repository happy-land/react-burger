import {
  CONSTRUCTOR_ADD_INGREDIENT,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_REORDER,
  CONSTRUCTOR_RESET,
  ORDER_SAVE_SUCCESS,
  ORDER_SAVE_FAIL,
  ORDER_SAVE_REQUEST,
} from '../constants';
import { TIngredient, TOrder } from '../types/data';

import { TBurgerActions } from '../actions/burger';

type TBurgerState = {
  items: Array<TIngredient>;
  bun: TIngredient | null;
  totalPrice: number;
  orderData: TOrder | null;
  isLoading: boolean;
  hasError: boolean;
}

// список всех ингредиентов в текущем конструкторе бургера,
const burgerInitialState:TBurgerState = {
  items: [],
  bun: null,
  totalPrice: 0,
  orderData: null,
  isLoading: false,
  hasError: false,
};

export const burgerReducer = (state = burgerInitialState, action: TBurgerActions): TBurgerState => {
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
      return {
        ...state,
        bun: action.payload,
        totalPrice: state.bun
          ? state.totalPrice - state.bun.price * 2 + action.payload.price * 2
          : state.totalPrice + action.payload.price * 2,
      };

    case CONSTRUCTOR_REORDER: {
      const items = [...state.items];
      items.splice(action.payload.to, 0, items.splice(action.payload.from, 1)[0]);
      return {
        ...state,
        items,
      };
    }
    case CONSTRUCTOR_RESET:
      return burgerInitialState;

    case ORDER_SAVE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ORDER_SAVE_SUCCESS: {
      return {
        ...state,
        orderData: action.payload,
        isLoading: false,
        hasError: false,
      };
    }
    case ORDER_SAVE_FAIL: {
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
