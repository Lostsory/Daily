/* import _ from 'lodash'
import './style/index.css'

import { print } from './utils/index';

function component() {
  var element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack', ',I am coming, HAHAHAHAAH'], ' ');

  return element;
}
print('my webpack')

document.body.appendChild(component()); */

import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})