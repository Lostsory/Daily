<template>
  <div id="app">
    <input type="" name="" id="zane-calendar">
    <input type="" name="" id="zane-calendar1">
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import zaneDate from 'zane-calendar'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  created() {
    this.$nextTick(() => {
      zaneDate({
        elem:'#zane-calendar',
      })
      zaneDate({
        elem:'#zane-calendar1',
      })
    })
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
