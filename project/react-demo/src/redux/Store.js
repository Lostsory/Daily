import {createStore} from 'redux';
import reducer from './Reducer';

const initValues = {
  'first': 1,
  'second': 10,
  'third': 20
}

export default createStore(reducer, initValues)