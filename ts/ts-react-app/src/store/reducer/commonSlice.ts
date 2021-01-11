import { createSlice } from '@reduxjs/toolkit';
import {FuckComponent} from '../../interface';

interface CommonState {
  components: Array<FuckComponent<any>>,
}

const initialState: CommonState = {
  components: [],
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
		setComponents: (state: any, action: any) => {
			state.components = action.payload
    },
    // setComponents: {
    //   reducer(state, {payload}) {
    //     state.components = payload
    //   },
    //   // prepare(components) {
    //   //   return { payload: components }
    //   // }
    // }
  },
});

export const { setComponents } = commonSlice.actions;

// export const selectComponents = (state: CommonState) => state.common.components;

export default commonSlice.reducer;
