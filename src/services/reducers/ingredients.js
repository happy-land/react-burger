import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAIL,
} from '../actions/ingredients';

// список всех полученных ингредиентов,
const ingredientsInitialState = {
  items: [],
  isLoading: false,
  hasError: false,
  itemsInBurger: [],
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        items: action.payload,
        isLoading: false,
        hasError: false,
      };
    }
    case GET_INGREDIENTS_FAIL: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    default: {
      return state;
    }
  }
};
