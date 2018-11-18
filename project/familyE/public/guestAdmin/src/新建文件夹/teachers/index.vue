<template>
  <div id="teachers">
    teachers
  </div>
</template>
<script>
export default {
  created () {
    this.$store.commit('SET_ACTIVEROUTER', '/teachers')
  }
}
</script>
<style scoped>

</style>
