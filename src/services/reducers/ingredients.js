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
  itemsInBurger: []  
  // [{id: 09090, count: 0}, {id: 9829849328, count: 2}]
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
      // console.log(GET_INGREDIENTS_SUCCESS);
      // console.log(action);
      return {
        ...state,
        items: action.payload,
        // items: [...state.items, action.payload],
        isLoading: false,
        hasError: false,
      };
    }
    case GET_INGREDIENTS_FAIL: {
      console.log(GET_INGREDIENTS_FAIL);
      console.log(action.err);
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