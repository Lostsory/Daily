<template>
  <div id="students">
    students
  </div>  
</template>
<script>
export default {
  created () {
    this.$store.commit('SET_ACTIVEROUTER', '/students')
  }
}
</script>
<style scoped>

</style>
