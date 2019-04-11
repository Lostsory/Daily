import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Counter extends Component {
  constructor(s) {
    super(s)
    console.log(s)
    this.state = {
      count: s.initCount,
    }
    this.change = this.changeNum.bind(this)
  }
  static propTypes = {
    initCount: PropTypes.number.isRequired,
    desc: PropTypes.string,
    showTip: PropTypes.func
  }
  static defaultProps = {
    desc: '我是一个counter',
    showTip: f => f
  }
  changeNum(num) {
    if (this.state.count >= 5) {
      this.props.showTip(true)
    } else {
      this.setState({
        count: this.state.count + num
      })
    }
  }
  componentWillMount() {
    console.log('componentWillMount')
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  render() {
    return (
      <div>
        <span>{this.props.desc}</span>
        <button onClick={this.changeNum.bind(this, 1)}>+</button>
        <span>{this.state.count}</span>
        <button onClick={() => {
          this.change(-1)
        }}>-</button>
      </div>
    )
  }
}
export default Counter