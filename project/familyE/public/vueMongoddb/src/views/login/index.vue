<template>
  <div class="login_container">
    <el-form :rules="loginRules" class="loginForm" :model="loginForm" ref="loginForm">
      <h1 class="text_center title">welcome to my world</h1>
      <el-form-item prop="name">
        <el-input v-model="loginForm.name" auto-complete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="paw">
        <el-input v-model="loginForm.paw" :type="pwdType" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="display:block; width:100%" @click="onSubmit">登 录</el-button>
        <!-- <el-button>取消</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {login} from '@/api'
export default {
  data () {
    return {
      loginForm: {
        paw: '',
        name: ''
      },
      loginRules: {
        paw: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]
      },
      pwdType: 'password'
    }
  },
  methods: {
    onSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          login(this.loginForm).then((res) => {
            if (res.data.httpCode === '0') {
              this.$router.push({path: '/list'})
              window.localStorage.setItem('token', res.data.token)
            }
          })
        }
      })
    }
  }
}
</script>
<style>
.login_container{
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/loginBg.jpg') no-repeat center center;
}
.login_container .loginForm{
  width: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%)
}
.login_container .el-form-item__label{
  color: #fff
}
.login_container .title{
  color: #fff;
  padding-bottom: 24px;
  font-size: 42px;
  font-weight: 500
}
.login_container .el-form-item.is-required .el-form-item__label:before{
  color: transparent
}
.login_container .el-form-item__error{
  color: #c5bfbf
}
</style>
