import { createSlice } from '@reduxjs/toolkit';

interface TreeState {
  treeMap: {
    [id: string]: any
  },
  layout: any[],
  layoutMap: {
    [id: string]: any
  },
  layoutIndex: number,
  childIndex: number
}

const initialState: TreeState = {
  treeMap: {},
  layoutMap: {},
  layout: [],
  layoutIndex: 1,
  childIndex: 1,
}

export const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
		add: (state: TreeState, { payload }) => {
			state.treeMap[payload.id] = payload
    },
    addLayout: (state: TreeState, { payload }) => {
      const layout = {
        id: state.layoutIndex.toString(),
        component: payload,
        children: []
      }
      // state.layoutMap[state.layoutIndex] = layout
      state.layout.push(layout)
      state.layoutIndex++
    },
    addChildByLayoutId: (state: TreeState, {payload: {id, child}}) => {
      // console.log(state);
      state.layout.forEach(v => {
        if (v.id === id) {
          v.children.push({
            id: state.childIndex.toString(),
            component: child,
          })
          state.childIndex++
        }
      })
    }
  },
});

export const { addLayout } = treeSlice.actions;
export const { addChildByLayoutId } = treeSlice.actions;

// export const selectComponents = (state: treeState) => state.tree.components;

export default treeSlice.reducer;
