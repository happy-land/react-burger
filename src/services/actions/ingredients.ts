import { baseUrl } from '../../utils/constants';
import { checkResponse, checkSuccess } from '../../utils/utils';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAIL,
  SET_INGREDIENT_COUNTER,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
} from '../constants';
import { AppDispatch, AppThunk } from '../types';
import { TIngredient } from '../types/data';

export interface IGetIngredientsAction {
  type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  type: typeof GET_INGREDIENTS_SUCCESS;
  payload: Array<TIngredient>;
}

export interface IGetIngredientsFailAction {
  type: typeof GET_INGREDIENTS_FAIL;
}

export interface IIncreaseCounterAction {
  type: typeof INCREASE_COUNTER;
  payload: {
    id: string;
    count: number;
  };
}

export type TIngredientsActions =
  | IGetIngredientsAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailAction
  | IIncreaseCounterAction;

type TRegisterData = {
  
}

export const getIngredientsThunk: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });

  return fetch(`${baseUrl}/ingredients`)
    // .then((result) => checkResponse<TIngredient[]>(result))
    .then((result) => checkResponse<TIngredient[]>(result))
    .then(checkSuccess)
    .then(({ data }) => {
      console.log(data);
      if (data) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: data,
          isLoading: false,
          hasError: false,
        });
      }
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

export const addToBurgerThunk: AppThunk =
  (id: string, count: number) => (dispatch: AppDispatch) => {
    dispatch({
      type: INCREASE_COUNTER,
      payload: {
        id,
        count,
      },
    });
  };
