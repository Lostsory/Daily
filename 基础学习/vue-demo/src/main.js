// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.directive('clickOut', {
  inserted: function(el, binding) {
    el.tabIndex = '0'
    el.style.outline = 'none'
    el.addEventListener('blur', function() {
      binding.value()
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
