import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAIL,
  GET_INGREDIENT_REQUEST,
  GET_INGREDIENT_SUCCESS,
  GET_INGREDIENT_FAIL
} from '../actions/ingredients';

// список всех полученных ингредиентов,
const ingredientsInitialState = {
  items: [],
  isLoading: false,
  hasError: false,
  itemsInBurger: [],
  ingredient: null, // данные КБЖУ ингредиента, которые выводим на отдельной странице 
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
    case GET_INGREDIENT_REQUEST: {
      return {
        ...state, 
        isLoading: true,
      }
    }
    case GET_INGREDIENT_SUCCESS: {
      return {
        ...state,
        ingredient: action.payload,
        isLoading: false,
        hasError: false,
      }
    }
    case GET_INGREDIENT_FAIL: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    }

    default: {
      return state;
    }
  }
};