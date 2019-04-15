<template>
  <div>
    <h1>{{msg}}</h1>
    <demo/>
  </div>
</template>
<script>
import demo from './comp/demo'
export default {
  data() {
    return {
      mag: 'hello Vue'
    }
  },
  components: {
    demo
  }
}
</script>
<style>

</style>