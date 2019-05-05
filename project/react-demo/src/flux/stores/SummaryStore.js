import { EventEmitter } from 'events';
import CounterStore from './CounterStore';
import AppDispatcher from '../Dispather';
import * as ActionTypes from '../ActionTypes';

function computeSummary(counterValues) {
  let summary = 0;
  for (let i in counterValues) {
    if (counterValues.hasOwnProperty(i)) {
      summary += counterValues[i]
    }
  }
  return summary
}

const SummaryrStore = Object.assign({}, EventEmitter.prototype, {
  getsummary() {
    return computeSummary(CounterStore.getCounterVals())
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
SummaryrStore.dispatchToken = AppDispatcher.register((action) => {
  if ((action.type === ActionTypes.INCREMENT) || (action.type === ActionTypes.DECREMENT)) {
    AppDispatcher.waitFor([CounterStore.dispatchToken])
    SummaryrStore.emitChange()
  }
})
export default SummaryrStore