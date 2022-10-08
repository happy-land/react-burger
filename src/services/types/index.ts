import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import store from '../store';

// type TApplicationActions = 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState>
>;