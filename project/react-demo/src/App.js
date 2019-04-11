import React, { Component } from 'react';
import './App.css';
import Counter from './comp/Counter';

class App extends Component {
  constructor(s) {
    super(s)
    this.state = {
      isShowTip: false
    }
  }
  showTip(bool) {
    this.setState({
      isShowTip: bool
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.isShowTip && <h2>已经有一个counter到了5</h2>}
        <Counter showTip={this.showTip.bind(this)} desc={'hello counter'} initCount={0}></Counter>
        <Counter initCount={10}></Counter>
        <Counter initCount={20}></Counter>
      </div>
    );
  }
}

export default App;
