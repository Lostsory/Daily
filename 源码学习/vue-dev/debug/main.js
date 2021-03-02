/* eslint-disable */

Vue.component('my-component-demo', {
  name: 'my-component-demo',
  props: ['title'],
  inject: ['global'],
  template: '<h1 @click="popMsg">{{ title }}</h1>',
  methods: {
    popMsg() {
      console.log('this.title', this.title);
      this.$emit('alert-msg', this.title);
    }
  },
  created() {},
  mounted() {
    console.log('my-component-demo', this);
  },
})

const app = new Vue({
  template: `
    <div data-diy="qzx">
      <button type="button" @click="reverseMessage">reverse</button>
      <my-component-demo :title="message"  @alert-msg="alertMessage" />
    </div>
  `,
  el: '#app',
  name: 'app',
  provide() {
    return { 
      global: {
        name: this.message,
      }
    }
  },
  data() {
    return {
      message: 'Hello Vue!',
    }
  },
  methods: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('')
    },
    alertMessage(msg) {
      console.log('parnet', msg);
      alert(msg)
    }
  },
  created() {},
  mounted() {
    console.log('app', this);
  }
})


console.warn('Vue instance', app);