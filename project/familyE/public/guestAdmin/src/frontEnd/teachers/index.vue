<template>
  <div id="teachers">
    teachers
  </div>
</template>
<script>
export default {
  created () {
    this.$store.commit('SET_ACTIVEROUTER', '/frontEndLayout/teachers')
  }
}
</script>
<style scoped>

</style>
