import { v4 as uuid } from 'uuid';
import { saveOrderRequest } from '../../utils/api';
import { baseUrl } from '../../utils/constants';
import { checkResponse, checkSuccess } from '../../utils/utils';
import { openOrderModal } from './order';

import {
  CONSTRUCTOR_ADD_INGREDIENT,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_REMOVE_BUN,
  CONSTRUCTOR_REORDER,
  CONSTRUCTOR_RESET,
  ORDER_SAVE_REQUEST,
  ORDER_SAVE_SUCCESS,
  ORDER_SAVE_FAIL,
} from '../constants';

export const addIngredient = (ingredient) => ({
  type: CONSTRUCTOR_ADD_INGREDIENT,
  payload: {
    ...ingredient,
    id: uuid(),
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
  payload: bun,
});

export const removeBun = (bun) => ({
  type: CONSTRUCTOR_REMOVE_BUN,
  payload: bun,
});

export const saveOrder = (data, bun) => (dispatch) => {
  dispatch({
    type: ORDER_SAVE_REQUEST,
  });
  // складываем ингредиенты: булка + соусы, начинка
  const ingrIdArray = data.map((ingr) => ingr._id);
  const concatenatedIngredients = [...ingrIdArray, bun._id];
  saveOrderRequest(concatenatedIngredients)
    // .then(checkResponse)
    .then(checkSuccess)
    .then((data) => {
      dispatch({
        type: ORDER_SAVE_SUCCESS,
        payload: data,
      });
      dispatch(openOrderModal(data.order.number));
      dispatch({
        type: CONSTRUCTOR_RESET,
      });
    })
    .catch((err) => {
      dispatch({
        type: ORDER_SAVE_FAIL,
      });
    });
};
