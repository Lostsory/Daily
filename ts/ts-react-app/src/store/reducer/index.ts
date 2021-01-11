import { combineReducers } from '@reduxjs/toolkit'

import common from './commonSlice';
import tree from './treeSlice';

const rootReducer = combineReducers({
  common,
  tree
})

export default rootReducer