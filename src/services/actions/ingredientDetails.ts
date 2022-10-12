import { INGREDIENT_MODAL_OPEN, INGREDIENT_MODAL_CLOSE } from '../constants';
import { TIngredient } from '../types/data';

export interface IOpenIgredientModalAction {
  type: typeof INGREDIENT_MODAL_OPEN;
  payload: TIngredient;
}

export interface ICloseIngredientModalAction {
  type: typeof INGREDIENT_MODAL_CLOSE;
}

export type TIngredientDetailsModalActions = 
  | IOpenIgredientModalAction
  | ICloseIngredientModalAction;

export const openIngredientModal = (ingredient: TIngredient): IOpenIgredientModalAction => ({
  type: INGREDIENT_MODAL_OPEN,
  payload: {
    ...ingredient,
  },
});

export const closeIngredientModal = (): ICloseIngredientModalAction => ({
  type: INGREDIENT_MODAL_CLOSE,
});
