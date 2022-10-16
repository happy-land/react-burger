import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import store from '../store';
import { TBurgerActions } from '../actions/burger';
import { TFeedActions } from '../actions/feed';
import { TIngredientDetailsModalActions } from '../actions/ingredientDetails';
import { TIngredientsActions } from '../actions/ingredients';
import { TOrderActions } from '../actions/order';
import { TOrdersActions } from '../actions/orders';
import { TPasswordResetActions } from '../actions/password-reset';
import { TPasswordRestoreActions } from '../actions/password-restore';
import { TUserActions } from '../actions/user';

type TApplicationActions = TBurgerActions 
| TFeedActions 
| TIngredientDetailsModalActions
| TIngredientsActions
| TOrderActions
| TOrdersActions
| TPasswordResetActions
| TPasswordRestoreActions
| TUserActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
