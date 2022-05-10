import { v4 as uuid } from 'uuid';
import { baseUrl } from '../../utils/constants';
import { checkResponse } from '../../utils/utils';
import { openOrderModal } from './order';

export const CONSTRUCTOR_ADD_INGREDIENT = 'CONSTRUCTOR_ADD_INGREDIENT';
export const CONSTRUCTOR_REMOVE_INGREDIENT = 'CONSTRUCTOR_REMOVE_INGREDIENT';

export const CONSTRUCTOR_ADD_BUN = 'CONSTRUCTOR_ADD_BUN';
export const CONSTRUCTOR_REMOVE_BUN = 'CONSTRUCTOR_REMOVE_BUN';

export const ORDER_SAVE_REQUEST = 'ORDER_SAVE_REQUEST';
export const ORDER_SAVE_SUCCESS = 'ORDER_SAVE_SUCCESS';
export const ORDER_SAVE_FAIL = 'ORDER_SAVE_FAIL';

export const addIngredient = (ingredient) => ({
  type: CONSTRUCTOR_ADD_INGREDIENT,
  payload: {
    ...ingredient,
    id: uuid(),
    // counter: 1
  },
});

export const removeIngredient = (ingredient) => ({
  type: CONSTRUCTOR_REMOVE_INGREDIENT,
  payload: {
    ...ingredient,
  },
});

export const addBun = (bun) => ({
  type: CONSTRUCTOR_ADD_BUN,
  payload: bun
});

export const removeBun = (bun) => ({
  type: CONSTRUCTOR_REMOVE_BUN,
  payload: bun
});

export const saveOrder = (data) => (dispatch) => {
  dispatch({
    type: ORDER_SAVE_REQUEST,
  });
  return fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: data,
    }),
  })
    .then(checkResponse)
    .then((data) => {
      console.log(data);
      if (data.success) {
        dispatch({
          type: ORDER_SAVE_SUCCESS,
          payload: data,
        });
        dispatch(openOrderModal(data.order.number));
      } else {
        dispatch({
          type: ORDER_SAVE_FAIL,
        });
      }
    });
};