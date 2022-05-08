import { v4 as uuid } from 'uuid';
import { baseUrl } from '../../utils/constants';
import { checkResponse } from '../../utils/utils';
import { openOrderModal } from './order';

export const CONSTRUCTOR_ADD = 'CONSTRUCTOR_ADD';
export const CONSTRUCTOR_REMOVE = 'CONSTRUCTOR_REMOVE';
export const ORDER_SAVE_REQUEST = 'ORDER_SAVE_REQUEST';
export const ORDER_SAVE_SUCCESS = 'ORDER_SAVE_SUCCESS';
export const ORDER_SAVE_FAIL = 'ORDER_SAVE_FAIL';

export const addToConstructor = (ingredient) => ({
  type: CONSTRUCTOR_ADD,
  payload: {
    ...ingredient,
    id: uuid(),
  },
});

export const removeFromConstructor = (ingredient) => ({
  type: CONSTRUCTOR_REMOVE,
  payload: {
    ...ingredient,
  },
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
