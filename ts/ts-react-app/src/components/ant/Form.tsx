import React from 'react';
import { Form } from 'antd';
import {createSlice, configureStore} from '@reduxjs/toolkit';
import base from '../base';
import {FuckComponent} from '../../interface';

const {Layout} = base

const cardSlice = createSlice({
  name: 'form',
  initialState: {
    display: 'block',
    children: [
      {...Layout}
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

const MyForm: FuckComponent<any> = () => {
  return (
    <Form
      initialValues={{ remember: true }}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
    >
      {/* <Layout dragTargetType={['input']}></Layout> */}
      <Layout></Layout>
    </Form>
  );
}

MyForm.store = store
MyForm.info = {
  name: '表单',
  type: 'form',
}

export default MyForm