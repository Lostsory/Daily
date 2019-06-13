<template>
  <div class="login_more">
    <a @click="loginModal=true"><slot>点击登陆查看更多</slot></a>
    <el-dialog title="登陆" :visible.sync="loginModal">
      <el-form :model="form">
        <el-form-item label="账号：" :label-width="formLabelWidth">
          <el-input v-model="form.account" auto-complete="off" placeholder="请输入手机号或账号"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="formLabelWidth">
          <el-input v-model="form.passWord" type="password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <p>立即注册？（<a @click="$router.push('/frontEndLayout/pleaseTeach')">请家教</a> \ <a @click="$router.push('/frontEndLayout/doTeach')">做家教</a>）</p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="loginModal = false">取 消</el-button>
        <el-button type="warning" size="medium" @click="toLogin">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      loginModal: false,
      formLabelWidth: '60px',
      form: {}
    }
  },
  methods: {
    ...mapActions({
      login: 'Login'
    }),
    toLogin() {
      this.login(this.form).then((res) => {})
    }
  }
}
</script>
<style lang="less">
.login_more{
  padding-top: 20px;
  .el-dialog__body{
    padding: 10px 20px 0
  }
  .el-dialog{
    min-width: 300px;
    max-width: 400px;
  }
  p{
    color: #b1b1b1;
    font-size: 1rem;
    &:hover{
      text-decoration: underline;
    }
    text-align: left;
    a{
      color: #333;
    }
    a:hover{
      color: #f7c864
    }
  }
}
</style>
