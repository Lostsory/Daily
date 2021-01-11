import React from 'react';
import { Card } from 'antd';
import {createSlice, configureStore} from '@reduxjs/toolkit';
import base from '../base';
import {FuckComponent} from '../../interface';

const {Text, Layout} = base

const cardSlice = createSlice({
  name: 'card',
  initialState: {
    display: 'block',
    bordered: false,
    children: [
      {...Layout},
      {...Text}
    ]
  },
  reducers: {
		setBorder: (state, action) => {
      state.bordered = action.payload
    }
  },
});
const store = configureStore({
  reducer: cardSlice.reducer,
})

interface MyCardProps{
  [x: string]: any
}

const MyCard: FuckComponent<MyCardProps> = () => {
  
  const title = <Text content="卡片标题" />
  const extra = <Layout display="inline"></Layout>
  return <Card title={title} bordered={false} extra={extra}>
    <Layout></Layout>
  </Card>
}

MyCard.store = store
MyCard.info = {
  name: '卡片',
  type: 'card',
}

export default MyCard

