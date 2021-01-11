import React from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';
import {createSlice, configureStore} from '@reduxjs/toolkit';
import base from '../base';
import {FuckComponent} from '../../interface';

const {Text, Layout} = base

const { TabPane } = Tabs;

const cardSlice = createSlice({
  name: 'tab',
  initialState: {
    display: "block",
    children: [
      {...Text},
      {...Layout},
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

const TabWrap = styled(Tabs)`
  background: #fff;
`

const MyTab: FuckComponent<any> = () => {
  const callback = () => {
  
  }
  return <TabWrap defaultActiveKey="1" onChange={callback}>
    <TabPane tab={<Text content="Tab 1" />} key="1">
      <Layout></Layout>
    </TabPane>
    <TabPane tab={<Text content="Tab 2" />} key="2">
      <Layout></Layout>
    </TabPane>
    <TabPane tab={<Text content="Tab 3" />} key="3">
      <Layout></Layout>
    </TabPane>
  </TabWrap>
}

MyTab.config = store
MyTab.info = {
  name: '标签页',
  type: 'tab',
}

export default MyTab