import React, { Component } from 'react';
import './App.css';
import Counter from './comp/Counter';

import CounterFlux from './comp/CounterFlux';
import SummaryStore from './flux/stores/SummaryStore';

import CounterRedux from './comp/CounterRedux';

class App extends Component {
  constructor(s) {
    super(s)
    this.state = {
      isShowTip: false,
      summary: SummaryStore.getsummary()
    }
    this.onchange = this.onchange.bind(this)
  }
  showTip(bool) {
    this.setState({
      isShowTip: bool
    })
  }
  onchange(){
    const summary = SummaryStore.getsummary()
    this.setState({
      summary
    })
  }
  componentDidMount() {
    SummaryStore.addChangeListener(this.onchange)
  }
  render() {
    return (
      <div className="App">
        {this.state.isShowTip && <h2>已经有一个counter到了5</h2>}
        <Counter showTip={this.showTip.bind(this)} desc={'hello counter'} initCount={0}></Counter>
        <Counter initCount={10}></Counter>
        <Counter initCount={20}></Counter>
        <hr></hr>
        {/* 以下是flux实现 */}
        <CounterFlux caption="first"/>
        <CounterFlux caption="second"/>
        <CounterFlux caption="third"/>
        <h3>总数是： {this.state.summary}</h3>
        <hr></hr>
        {/* 以下是redux实现 */}
        <CounterRedux caption="first"/>
        <CounterRedux caption="second"/>
        <CounterRedux caption="third"/>
      </div>
    );
  }
}

export default App;
