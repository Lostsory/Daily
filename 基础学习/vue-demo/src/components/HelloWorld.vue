<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-clickOut='print' id="box"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    print() {
      console.log(this.msg)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#box{
  width: 200px;
  height: 200px;
  background-color: red
}
</style>
