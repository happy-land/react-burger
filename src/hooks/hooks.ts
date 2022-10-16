// "react-redux": "^8.0.4",
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '../services/types';

// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// "react-redux": "^7.2.4", как в тренажере
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
import { AppDispatch, AppThunk, RootState } from '../services/types';

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
