import { combineReducers } from 'redux';

import { ingredientsReducer } from './ingredients';
// import { ingredientReducer } from './ingredient';
import { burgerReducer } from './burger';
import { ingredientDetailsReducer } from './ingredientDetails';
import { orderReducer } from './order';



export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  // ingredient: ingredientReducer,
  burger: burgerReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
});
