import React, { useState } from 'react';
import styled from 'styled-components';
import {createSlice, configureStore} from '@reduxjs/toolkit';
import {FuckComponent} from '../../interface';

const TextWrap = styled.span`
  position: relative;
  color: rgba(0, 0, 0, 0.65);
  &::selection, *::selection{
    background: transparent;
    color: rgba(0, 0, 0, 0.65);
  }
`
const InputWrap = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  outline: none;
  border: none;
  width: 100%;
  background: #fff;
  padding: 0;
  margin: 0;
  &::-webkit-input-placeholder{
    color: red;
    text-shadow: none;
    -webkit-text-fill-color: initial;
  }
`
interface MyTextProps{
  content?: string,
  edit?: boolean,
}
interface MyTextState{
  value: string,
  showInput: boolean,
}

class MyText extends React.Component<MyTextProps, MyTextState>{
  constructor(s: any) {
    super(s)
    this.initStore()
    this.state = {
      value: this.props.content || '默认文案',
      showInput: false
    }
  }

  public info = {
    name: '文本',
    type: 'text',
  }
  static info = {
    name: '文本',
    type: 'text',
  }
  public store: any
  initStore() {
    const cardSlice = createSlice({
      name: 'button',
      initialState: {
        display: 'inline',
        children: [
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

  toggleInputShowStatus = (showInput: boolean) => {
    this.setState((pre) => ({
      showInput,
      value: !pre.value && !showInput ? '默认文案' : pre.value
    }))
  }

  inputChange = (ev: any) => {
    this.setState({
      value: ev.target.value
    })
  }

  render() {
    const {
      edit,
      content,
    } = this.props

    const {
      value,
      showInput
    } = this.state
    return <TextWrap {...this.props}>
    <span onDoubleClick={() => edit && this.toggleInputShowStatus(true)}>{value}</span>
    {
      showInput  && <InputWrap type="text" value={value} autoFocus placeholder={content} onChange={ev => this.inputChange(ev)} onBlur={() => this.toggleInputShowStatus(false)} />
    }    
  </TextWrap>
  }
}

export default MyText