import { combineReducers } from 'redux';

import { ingredientsReducer } from './ingredients';
import { burgerReducer } from './burger';
import { ingredientDetailsReducer } from './ingredientDetails';
import { orderReducer } from './order';
import { passwordRestoreReducer } from './password-restore';
import { passwordResetReducer } from './password-reset';
import { userReducer } from './user';
import { feedReducer } from './feed';



export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
  passwordRestore: passwordRestoreReducer,
  passwordReset: passwordResetReducer,
  user: userReducer,
  feed: feedReducer,
});
