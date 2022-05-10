import { INCREASE_COUNTER, DECREASE_COUNTER } from "../actions/ingredient";

const ingredientInitialState = {
  counter: 0
}

export const ingredientReducer = (state = ingredientInitialState, action) => {
  switch (action.type) {
    case INCREASE_COUNTER: 
      return {
        ...state,
        counter: state.counter + 1
      }
      case DECREASE_COUNTER: 
      return {
        ...state,
        counter: state.counter - 1
      }
    default:
      return state;
  }
}