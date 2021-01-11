import React from 'react';
import { Radio, Form } from 'antd';
import {createSlice, configureStore} from '@reduxjs/toolkit';
import base from '../base';
import {FuckComponent} from '../../interface';

const {Text} = base

const cardSlice = createSlice({
  name: 'radio',
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

const MyRadio: FuckComponent<any> = () => {
  return <Form.Item  label={<Text content='labelName' />}>
    <Radio.Group>
      <Radio value={1}><Text content='A' /></Radio>
      <Radio value={2}><Text content='B' /></Radio>
      <Radio value={3}><Text content='C' /></Radio>
      <Radio value={4}><Text content='D' /></Radio>
    </Radio.Group>
  </Form.Item>
}

MyRadio.store = store
MyRadio.info = {
  name: '单选框',
  type: 'radio',
}

export default MyRadio