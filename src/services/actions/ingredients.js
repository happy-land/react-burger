import { baseUrl } from '../../utils/constants';
import { checkResponse } from '../../utils/utils';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAIL = 'GET_INGREDIENTS_FAIL';

export const getIngredients = () => (dispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });

  return fetch(`${baseUrl}/ingredients`)
    .then(checkResponse)
    .then((data) => {
      if (data.success) {
        return data.data;
      } else {
        return Promise.reject('Error data');
      }
    })
    .then((ingredients) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: ingredients,
        isLoading: false,
        hasError: false,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_INGREDIENTS_FAIL,
        payload: err,
        isLoading: false,
        hasError: true,
      });
    });
};
