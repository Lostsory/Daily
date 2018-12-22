<template>
  <div id="students">
    students
  </div>  
</template>
<script>
export default {
  created() {
    this.$store.commit('SET_ACTIVEROUTER', '/frontEndLayout/students')
  }
}
</script>
<style scoped>

</style>
