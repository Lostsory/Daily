import React, { Component } from 'react'
import { PropType } from 'Prop-type';

export class Provider extends Component {
  static propTypes = {
    store: PropType.object
  }
  getChildContext() {
    return {
      store: this.props.store
    }
  }

  render() {
    return this.props.children
  }
}

export default Provider
