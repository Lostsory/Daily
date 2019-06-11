<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <el-badge :value="noticeNum" :hidden="noticeNum===0" class="notice">
      <el-button size="mini">消息</el-button>
    </el-badge>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" src='../../../assets/touxiang.gif'>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <el-dropdown-item>
          <span @click="$router.push('/frontEndLayout/home')" style="display:block;">网站首页</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span @click="logout" style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { mapActions } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      noticeNum: 0
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    ...mapActions({
      logout: 'Logout'
    }),
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    connectSocket() {
      const socket = new WebSocket(`${process.env.WSURL}?token=${getToken('Admin-Token')}`)
      socket.onopen = function() {
      }
      socket.onmessage = (evt) => {
        console.log(evt)
        this.noticeNum++
      }
    }
  },
  created() {
    // this.connectSocket()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .notice{
    position: absolute;
    right: 150px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
<style>
.el-badge__content.is-fixed{
  top: 13px;
  right: 16PX;
}
</style>
