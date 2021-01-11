import React from 'react';
import { Input, Form } from 'antd';
import {createSlice, configureStore} from '@reduxjs/toolkit';
import base from '../base';
import {FuckComponent} from '../../interface';

const {Text} = base

const cardSlice = createSlice({
  name: 'input',
  initialState: {
    display: 'inline',
    children: [
      {...Text}
    ]
  },
  reducers: {
		setBorder: (state, action) => {
      
    }
  },
});
const store = configureStore({
  reducer: cardSlice.reducer,
})

const MyInput: FuckComponent<any> = () => {
  return <Form.Item label={<Text content='labelName' />}>
    <Input
      placeholder="请输入关键词"
      style={{ width: 300 }}
    />
  </Form.Item>
}

MyInput.store = store
MyInput.info = {
  name: '输入框',
  type: 'input',
}

export default MyInput