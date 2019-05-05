import * as ActionTypes from './ActionTypes';

export const increment = (caption) => {
  return {
    type: ActionTypes.INCREMENT,
    counterCaption: caption
  }
}
export const decrement = (caption) => {
  return {
    type: ActionTypes.DECREMENT,
    counterCaption: caption
  }
}