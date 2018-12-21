<template>
  <div id="frontEnd" :class="{'showBottom': device==='mobile'}">
    <am-topbar :inverse="true">
      <am-topbar-brand><a href="#">LOGO</a></am-topbar-brand>
      <am-topbar-toggle></am-topbar-toggle>
      <am-topbar-collapse>
        <am-nav :pill="true" :topbar="true">
          <am-nav-item v-for="(item, index) in routes" :active="$store.state.activeRouter == item.path" :to="item.path" :key="index">{{item.name}}</am-nav-item>
        </am-nav>
        <am-topbar-slot>
          <am-button color="primary" @click="loginModal = true" custom-class="am-topbar-btn">加入我们</am-button>
        </am-topbar-slot>
        <am-topbar-slot>
          <am-button color="secondary" @click="registerModal = true" custom-class="am-topbar-btn">注册</am-button>
          <am-modal :is-show.sync="registerModal" :width="320">
            <am-modal-header>注册</am-modal-header>
            <am-modal-body>
              <am-form>
                  <am-input-group block>
                      <am-input-label transparent slot="prepend">
                          <am-icon type="user" placeholder="请输入您的帐号"></am-icon>
                      </am-input-label>
                      <am-input placeholder="请输入新用户名"></am-input>
                  </am-input-group>
                  <am-input-group block>
                      <am-input-label transparent slot="prepend">
                          <am-icon type="lock"></am-icon>
                      </am-input-label>
                      <am-input type="password" placeholder="请输入您的密码"></am-input>
                  </am-input-group>
                  <am-input-group block>
                      <am-input-label transparent slot="prepend">
                          <am-icon type="lock"></am-icon>
                      </am-input-label>
                      <am-input type="password" placeholder="请确认您的密码"></am-input>
                  </am-input-group>
                  <am-input-group>
                      <am-checkbox>男</am-checkbox>
                      <am-checkbox>女</am-checkbox>
                  </am-input-group>
                  <am-input-group>
                      <am-select width="300px" placeholder="请选择您的身份" :options="sections"></am-select>
                  </am-input-group>
              </am-form>
            </am-modal-body>
            <am-modal-footer>
              <am-button color="primary" @click="register">注册</am-button>
              <am-button @click="registerModal=false">取消</am-button>
            </am-modal-footer>
          </am-modal>
        </am-topbar-slot>
        <am-topbar-slot>
          <am-button color="primary" @click="loginModal = true" custom-class="am-topbar-btn">登录</am-button>
          <am-modal :is-show.sync="loginModal" :width="320">
            <am-modal-header>注册</am-modal-header>
            <am-modal-body>
              <am-form>
                <am-form-group>
                    <label>帐 号</label>
                    <am-input placeholder="请输入您的帐号"></am-input>
                </am-form-group>
                <am-form-group>
                    <label>密 码</label>
                    <am-input placeholder="请输入您的密码"></am-input>
                </am-form-group>
                <am-button @click="login">登录</am-button>
              </am-form>
            </am-modal-body>
          </am-modal>
        </am-topbar-slot>
      </am-topbar-collapse>
    </am-topbar>
    <div style="width: 100%;height:300px;background: url('http://s.amazeui.org/media/i/demos/bing-1.jpg') center center;background-size:cover"></div>
    <router-view class="content"/>
    <!-- <div class="contact-us" v-if="device==='mobile'">
      <am-button-group>
        <am-button :round="true" color="primary"><a href="tel:13068035571">电话</a></am-button>
        <am-button :round="true" color="success"><a href="sms:13068035571">短信</a></am-button>
        <am-button :round="true" color="danger" @click="toTeacher">预约</am-button>
      </am-button-group>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      routes: [
        {
          path: '/frontEndLayout/home',
          name: '首页'
        },
        {
          path: '/frontEndLayout/pleaseTeach',
          name: '请家教'
        },
        {
          path: '/frontEndLayout/doTeach',
          name: '做家教'
        },
        {
          path: '/frontEndLayout/teachers',
          name: '教员库'
        },
        {
          path: '/frontEndLayout/students',
          name: '学员库'
        },
        {
          path: '/frontEndLayout/partners',
          name: '合作机构'
        }
      ],
      sections: [{
        value: 1,
        label: '在校大学生(研究生) ,不含留学生',
        guesser: 'anquan'
      }, {
        value: 2,
        label: '教师(在职/进修/离职/退休)',
        guesser: 'it'
      }, {
        value: 2,
        label: '外籍人士(留学生/外教/海归人员)',
        guesser: 'it'
      }, {
        value: 2,
        label: '其他(已毕业离校的人员)',
        guesser: 'it'
      }],
      registerModal: false,
      loginModal: false
    }
  },
  computed: {
    swiperH() {
      const width = document.body.clientWidth
      if (width < 500) {
        return 200
      }
    },
    device() {
      return this.$store.state.app.device
    }
  },
  methods: {
    register() {

    },
    login() {

    },
    toTeacher() {
      this.$router.push('/frontEndLayout/pleaseTeach')
    }
  }
}
</script>

<style lang="less">
#frontEnd {
  color: #2c3e50;
  &.showBottom{
    padding-bottom: 6rem;
  }
  header{
    margin-bottom: 0px;
  }
  .am-slider-default{
    margin-bottom: 32px;
  }
  .am-container{
    max-width: 1200px
  }
  .contact-us{
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 6rem;
    padding: 1rem;
    background-color: rgba(0, 0, 0, .6);
    .am-btn-group{
      width: 100%;
    }
    .am-btn{
      line-height: 4rem;
      font-size: 1.8rem;
      padding: 0;
      width: 33.333333%
    }
    a{
      color: #fff;
      display: block;
      .am-icon-btn{
        margin-right: 12px
      }
    }
  }
  .content{
    background: #fffaee;
    min-height: 200px;
  }
}
</style>
