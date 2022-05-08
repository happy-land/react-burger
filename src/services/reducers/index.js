import { combineReducers } from 'redux';

import { ingredientsReducer } from './ingredients';
import { burgerReducer } from './burger';
import { ingredientReducer } from './ingredientDetails';
import { orderReducer } from './order';



export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  ingredient: ingredientReducer,
  order: orderReducer,
});
