import React from 'react';
import { Table } from 'antd';
import styled from 'styled-components'
import {createSlice, configureStore} from '@reduxjs/toolkit';
import base from '../base';
import {FuckComponent} from '../../interface';

const {Text} = base

const cardSlice = createSlice({
  name: 'table',
  initialState: {
    display: 'block',
    children: [
      {...Text},
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

const Wrap = styled.div`
  background: #fff;
`
const MyTable: FuckComponent<any> = () => {
  const dataSource: Array<any> = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  const columns: Array<any> = [
    {
      title: <Text content="姓名" />,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <Text content="年龄" />,
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: <Text content="住址" />,
      dataIndex: 'address',
      key: 'address',
    },
  ]
  return <Wrap>
    <Table dataSource={dataSource} columns={columns} />
  </Wrap>
}

MyTable.store = store
MyTable.info = {
  name: '表格',
  type: 'table',
}

export default MyTable