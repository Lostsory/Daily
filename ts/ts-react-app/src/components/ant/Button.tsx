import React from 'react';
import { Button } from 'antd';
import {createSlice, configureStore} from '@reduxjs/toolkit';

import base from '../base';
import {FuckComponent} from '../../interface';

const {Text} = base

class MyButton extends React.Component<any, any>{
  constructor(s: any) {
    super(s)
    this.initStore()
  }

  public info = {
    name: '按钮',
    type: 'button',
  }
  static info = {
    name: '按钮',
    type: 'button',
  }

  public store: any
  initStore() {
    const cardSlice = createSlice({
      name: 'button',
      initialState: {
        display: 'inline',
        children: [
          {...Text}
        ]
      },
      reducers: {
        // setBorder: (state, action) => {
          
        // }
      },
    });
    this.store = configureStore({
      reducer: cardSlice.reducer,
    })
  }
  render() {
    return <Button {...this.props}><Text /></Button>
  }
}

export default MyButton