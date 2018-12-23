<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <div class="sidebar-container">
      <el-menu
          mode="vertical"
          :show-timeout="200"
          :default-active="$route.path"
          :collapse="isCollapse"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
          :router="true"
        >
        <el-menu-item index="/admin/homeSetting">
          <i class="iconfont icon-shouye"></i>
          <span slot="title">首页管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/student">
          <i class="iconfont icon-xueyuanguanli"></i>
          <span slot="title">学员管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/teacher">
          <i class="iconfont icon-laoshi"></i>
          <span slot="title">教员管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/subject">
          <i class="iconfont icon-kemu"></i>
          <span slot="title">科目管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/partners" v-if='admin'>
          <i class="iconfont icon-hezuojigou"></i>
          <span slot="title">合作机构</span>
        </el-menu-item>
        <el-menu-item index="/admin/city" v-if='admin'>
          <i class="iconfont icon-chengshiguanli"></i>
          <span slot="title">城市管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/agency" v-if='admin'>
          <i class="iconfont icon-dailiguanli"></i>
          <span slot="title">代理管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main-container">
      <Navbar></Navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapGetters } from 'vuex'
export default {
  name: 'layout',
  components: {
    Navbar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    admin() {
      return this.$store.state.user.userInfo.identity === '0'
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
