import { v4 as uuid } from 'uuid';
import { saveOrderRequest } from '../../utils/api';
import { baseUrl } from '../../utils/constants';
import { checkResponse, checkSuccess, TResponse } from '../../utils/utils';
import { openOrderModalAction } from './order';

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
import { TIngredient, TOrder } from '../types/data';
import { AppDispatch, AppThunk } from '../types';

type TIngredientWithUUID = TIngredient & {
  id: string;
};

type TConstructorReorderPayload = {
  to: number;
  from: number;
};

export interface IAddIngredientAction {
  type: typeof CONSTRUCTOR_ADD_INGREDIENT;
  payload: TIngredientWithUUID;
}

export interface IRemoveIngredientAction {
  type: typeof CONSTRUCTOR_REMOVE_INGREDIENT;
  payload: TIngredient;
}

export interface IAddBunAction {
  type: typeof CONSTRUCTOR_ADD_BUN;
  payload: TIngredient;
}

export interface IRemoveBunAction {
  type: typeof CONSTRUCTOR_REMOVE_BUN;
  payload: TIngredient;
}

export interface IConstructorReorderAction {
  type: typeof CONSTRUCTOR_REORDER;
  payload: TConstructorReorderPayload;
}

export interface IConstructorResetAction {
  type: typeof CONSTRUCTOR_RESET;
}

export interface IOrderSaveRequestAction {
  type: typeof ORDER_SAVE_REQUEST;
}

export interface IOrderSaveSuccessAction {
  type: typeof ORDER_SAVE_SUCCESS;
  payload: TOrder;
}

export interface IOrderSaveFailAction {
  type: typeof ORDER_SAVE_FAIL;
}

export type TBurgerActions =
  | IAddIngredientAction
  | IRemoveIngredientAction
  | IAddBunAction
  | IRemoveBunAction
  | IConstructorReorderAction
  | IConstructorResetAction
  | IOrderSaveRequestAction
  | IOrderSaveSuccessAction
  | IOrderSaveFailAction;

export const addIngredientAction = (ingredient: TIngredient): IAddIngredientAction => ({
  type: CONSTRUCTOR_ADD_INGREDIENT,
  payload: {
    ...ingredient,
    id: uuid(),
  },
});

export const removeIngredientAction = (ingredient: TIngredient): IRemoveIngredientAction => ({
  type: CONSTRUCTOR_REMOVE_INGREDIENT,
  payload: {
    ...ingredient,
  },
});

export const addBunAction = (bun: TIngredient): IAddBunAction => ({
  type: CONSTRUCTOR_ADD_BUN,
  payload: bun,
});

export const removeBunAction = (bun: TIngredient): IRemoveBunAction => ({
  type: CONSTRUCTOR_REMOVE_BUN,
  payload: bun,
});

export const saveOrderThunk: AppThunk =
  (data: Array<TIngredient>, bun: TIngredient) => (dispatch: AppDispatch) => {
    dispatch({
      type: ORDER_SAVE_REQUEST,
    });
    // складываем ингредиенты: булка + соусы, начинка
    const ingrIdArray = data.map((ingr: TIngredient) => ingr._id);
    const concatenatedIngredients = [...ingrIdArray, bun._id];
    saveOrderRequest(concatenatedIngredients)
      .then(checkResponse)
      .then(checkSuccess)
      .then((data) => {
        dispatch({
          type: ORDER_SAVE_SUCCESS,
          payload: data,
        });
        dispatch(openOrderModalAction(data.order.number));
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
