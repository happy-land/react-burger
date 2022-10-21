export const INGREDIENT_MODAL_OPEN = 'INGREDIENT_MODAL_OPEN';
export const INGREDIENT_MODAL_CLOSE = 'INGREDIENT_MODAL_CLOSE';

export const openIngredientModal = (ingredient) => ({
  type: INGREDIENT_MODAL_OPEN,
  payload: {
    ...ingredient
  }
})

export const closeIngredientModal = () => ({
  type: INGREDIENT_MODAL_CLOSE,
})