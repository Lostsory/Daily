import React, { Component } from 'react';
import * as Actions from '../redux/Actions';
import Store from '../redux/Store';
import PropTypes from 'prop-types';

class Counter extends Component{
  constructor(props) {
    super(props)
    console.log(Store.getState());
    this.state = {
      count: Store.getState()[this.props.caption]
    }
    this.onChange = this.onChange.bind(this)
  }
  static propTypes = {
    caption: PropTypes.string
  }
  getOwnState() {
    return {
      count: Store.getState()[this.props.caption]
    }
  }
  onChange() {
    this.setState({
      count: Store.getState()[this.props.caption]
    })
  }
  componentDidMount() {
    Store.subscribe(this.onChange)
  }
  componentWillUnmount() {
    Store.unsubscribe(this.onChange)
  }
  onClickIncrementBtn() {
    Store.dispatch(Actions.increment(this.props.caption))
  }
  onClickDecrementBtn() {
    Store.dispatch(Actions.decrement(this.props.caption))
  }
  render() {
    return (
      <div>
        <button onClick={this.onClickIncrementBtn.bind(this)}>+</button>
        <span>{this.state.count}</span>
        <button onClick={this.onClickDecrementBtn.bind(this)}>-</button>
      </div>
    )
  }
}

export default Counter

