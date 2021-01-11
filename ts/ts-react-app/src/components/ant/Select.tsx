import React from 'react';
import { Select, Form } from 'antd';
import {createSlice, configureStore} from '@reduxjs/toolkit';
import base from '../base';
import {FuckComponent} from '../../interface';

const {Text} = base

const cardSlice = createSlice({
  name: 'select',
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

const MySelect: FuckComponent<any> = () => {
  return <Form.Item label={<Text content='labelName' />}>
    <Select style={{width: '200px'}} placeholder="请选择关键词">
      <Select.Option value="demoA">DemoA</Select.Option>
      <Select.Option value="demoB">DemoB</Select.Option>
      <Select.Option value="demoC">DemoC</Select.Option>
    </Select>
  </Form.Item>
}

MySelect.store = store
MySelect.info = {
  name: '复选框',
  type: 'select',
}

export default MySelect

