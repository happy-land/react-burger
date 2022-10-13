import { INGREDIENT_MODAL_OPEN, INGREDIENT_MODAL_CLOSE } from '../constants';

import { TIngredientDetailsModalActions } from '../actions/ingredientDetails';
import { TIngredient } from '../types/data';

type TIngredientDetailsState = {
  isIngredientDetailsOpened: boolean;
  item: TIngredient | null;
};

// объект текущего просматриваемого ингредиента,
const ingredientInitialState: TIngredientDetailsState = {
  isIngredientDetailsOpened: false,
  item: null,
};

export const ingredientDetailsReducer = (
  state = ingredientInitialState,
  action: TIngredientDetailsModalActions
): TIngredientDetailsState => {
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
