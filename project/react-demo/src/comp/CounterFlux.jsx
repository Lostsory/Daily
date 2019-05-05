import React, { Component } from 'react';
import CounterStore from '../flux/stores/CounterStore';
import * as Actions from '../flux/Actions';
import PropTypes from 'prop-types';
class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: CounterStore.getCounterVals()[props.caption]
    }
    this.onChange = this.onChange.bind(this)
    this.onClickIncrementBtn = this.onClickIncrementBtn.bind(this)
    this.onClickDecrementBtn = this.onClickDecrementBtn.bind(this)
  }
  static propTypes = {
    caption: PropTypes.string,
  }
  onChange() {
    const count = CounterStore.getCounterVals()[this.props.caption]
    this.setState({
      count
    })
  }
  onClickIncrementBtn() {
    Actions.increment(this.props.caption)
  }
  onClickDecrementBtn() {
    Actions.decrement(this.props.caption)
  }
  componentDidMount() {
    CounterStore.addChangeListener(this.onChange)
  }
  render() {
    return (
      <div>
        <button onClick={this.onClickIncrementBtn}>+</button>
        <span>{this.state.count}</span>
        <button onClick={this.onClickDecrementBtn}>-</button>
      </div>
    )
  }
}
export default Counter