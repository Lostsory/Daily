import { EventEmitter } from 'events';
import AppDispatcher from '../Dispather';
import * as ActionTypes from '../ActionTypes';

const counterVal = {
  first: 1,
  second: 10,
  third: 20
};

const CounterStore = Object.assign({}, EventEmitter.prototype, {
  getCounterVals() {
    return counterVal
  },
  emitChange() {
    this.emit('CHANGE_EVENT')
  },
  addChangeListener(callback) {
    this.on('CHANGE_EVENT', callback)
  },
  removeChangeListener(callback) {
    this.removeListener('CHANGE_EVENT', callback)
  }
})
CounterStore.dispatchToken = AppDispatcher.register((action) => {
  if (action.type === ActionTypes.INCREMENT) {
    counterVal[action.counterCaption] ++;
    CounterStore.emitChange()
  } else if (action.type === ActionTypes.DECREMENT) {
    counterVal[action.counterCaption] --;
    CounterStore.emitChange()
  }
})

export default CounterStore