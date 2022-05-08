import {
  INGREDIENT_MODAL_OPEN,
  INGREDIENT_MODAL_CLOSE,
} from '../actions/ingredientDetails';

// объект текущего просматриваемого ингредиента,
const ingredientInitialState = {
  isIngredientDetailsOpened: false,
  item: null,
};

export const ingredientReducer = (state = ingredientInitialState, action) => {
  switch (action.type) {
    case INGREDIENT_MODAL_OPEN:
      return {
        ...state,
        isIngredientDetailsOpened: true,
        item: action.payload,
      };
    case INGREDIENT_MODAL_CLOSE:
      return {
        ...state,
        isIngredientDetailsOpened: false,
      };
    default: {
      return state;
    }
  }
};
