import React, {useState} from 'react'
// import ReactDOM from 'react-dom';
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import {createSlice, configureStore} from '@reduxjs/toolkit';
import { connect } from 'react-redux'
// import Text from './Text';

const LayoutWrap: any = styled.div`
  background: ${({isOver}: any) => isOver ? 'skyblue' : '#fff'};
  /* border: 1px solid  ${({isOver}: any) => isOver ? 'red' : 'transparent'}; */
  width: 100%;
  height: 100%;
  min-height: 300px;
  display: ${({display}: any) => display};
  transition: all 200ms ease;
  box-sizing: border-box;
`
const ComponentWrap = styled.div`
  background: #fff;
  transition: all 300ms ease;
  overflow: hidden;
`

interface MyLayoutProps {
  data?: Array<any>,
  display?: string,
  dragTargetType?: string[],
  [x: string]: any
}

interface MyLayoutState {
  [x: string]: any
}

interface InitialState{
  display: string,
  children: any[]
}

class MyLayout extends React.Component<MyLayoutProps, MyLayoutState>{
  constructor(s: any) {
    super(s)
    this.initStore()
    this.state = {
      content: []
    }
    console.log(this.props);
  }

  public info = {
    name: '布局',
    type: 'layout',
  }

  static info = {
    name: '布局',
    type: 'layout',
  }

  public store: any
  public actions: any
  public layoutCon: any = React.createRef()
  initStore() {
    const initialState: InitialState = {
      display: 'inline',
      children: []
    }
    const cardSlice = createSlice({
      name: 'button',
      initialState,
      reducers: {
        addChild: (state, action) => {
          console.log(action);
          state.children.push(action.payload)
        }
      },
    });
    this.actions = cardSlice.actions
    this.store = configureStore({
      reducer: cardSlice.reducer,
    })
  }
  pushContend(Component: any) {
  }
  render() {
    return <LayoutWrap>

    </LayoutWrap>
  }
}


const mapStateToProps = state => ({
  tree: state.tree
});

export default connect(
  mapStateToProps
)(MyLayout);
