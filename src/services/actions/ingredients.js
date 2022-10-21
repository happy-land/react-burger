import { baseUrl } from '../../utils/constants';
import { checkResponse, checkSuccess } from '../../utils/utils';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAIL = 'GET_INGREDIENTS_FAIL';

// set
export const SET_INGREDIENT_COUNTER = 'SET_INGREDIENT_COUNTER';

export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const DECREASE_COUNTER = 'DECREASE_COUNTER';

export const getIngredients = () => (dispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });

  return fetch(`${baseUrl}/ingredients`)
    .then(checkResponse)
    .then(checkSuccess)
    .then((ingredients) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: ingredients.data,
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

export const addToBurger = (id, count) => (dispatch) => {
  dispatch( {
    type: INCREASE_COUNTER,
    payload: {
      id,
      count
    }
  })
};