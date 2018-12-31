<template>
  <div id="frontEnd" v-if="homeInfo.banner" class="showBottom">
    <div class="top">
      <div class="brand"></div>
      <ul>
        <li class="hidden">
          <i class="iconfont icon-fuwu1"></i>
          <p>
            <span>精品一对一</span>
            <span>带来最优质的服务</span>
          </p>
        </li>
        <li class="hidden">
          <i class="iconfont icon-jiaoyu"></i>
          <p>
            <span>网罗全国名师</span>
            <span>带来最顶尖的教学</span>
          </p>
        </li>
        <li>
          <i class="iconfont icon-customer"></i>
          <p>
            <span>24小时贴心服务</span>
            <span style="color: #f7c864;font-weight: 600">{{homeInfo.banner.phone}}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="navCon">
      <am-topbar :inverse="true">
        <!-- <am-topbar-brand> -->
        <am-topbar-toggle></am-topbar-toggle>
        <am-topbar-collapse>
          <am-nav :pill="true" :topbar="true">
            <am-nav-item v-for="(item, index) in routes" :active="activeRouter == item.path" :to="item.path" :key="index">{{item.name}}</am-nav-item>
          </am-nav>
        </am-topbar-collapse>
      </am-topbar>
    </div>
    <div class="banner" :class="bannerImg">
      <div class="animated fadeInUp" v-if="activeRouter == '/frontEndLayout/home'">
        <h2>在家学习没有老师？作业不会怎么办？</h2>
        <h3>全国优质名师</h3>
        <h4>让你把家当课堂,从此学习不再发愁</h4>
        <p><span v-for="item in 3" :key="item"></span></p>
        <span class="btn" @click="$router.push('/frontEndLayout/pleaseTeach')">助 力 学 习</span>
      </div>
    </div>
    <router-view class="content"/>
      <!-- am-button-group>
        <am-button :round="true" color="primary"><a href="tel:13068035571">电话</a></am-button>
        <am-button :round="true" color="success"><a href="sms:13068035571">短信</a></am-button>
        <am-button :round="true" color="danger" @click="toTeacher">预约</am-button>
      </am-button-group> -->
    <el-row class="contact-us show">
      <el-col :span="8">
        <a :href="'sms:'+homeInfo.banner.phone">短信 <i class="iconfont icon-duanxin"></i></a>
      </el-col>
      <el-col :span="8">
        <a :href="'tel:'+homeInfo.banner.phone">
          <i class="iconfont icon-phone"></i>
          <p>{{homeInfo.banner.phone}}</p>
        </a>
      </el-col>
      <el-col :span="8">
        <span></span>
        <a @click="$router.push('/frontEndLayout/pleaseTeach')"><i class="iconfont icon-yuyue"></i> 预约</a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { homeDetail } from '@/api'
export default {
  data() {
    return {
      homeInfo: {},
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
    ...mapGetters({
      activeRouter: 'activeRouter'
    }),
    swiperH() {
      const width = document.body.clientWidth
      if (width < 500) {
        return 200
      }
    },
    bannerImg() {
      const nowRouter = this.activeRouter
      if (nowRouter === '/frontEndLayout/home') {
        return { 'home': true }
      } else if (nowRouter === '/frontEndLayout/teachers') {
        return { 'teacher': true }
      } else if (nowRouter === '/frontEndLayout/students') {
        return { 'student': true }
      } else {
        return { 'none': true }
      }
    }
  },
  methods: {
    getHomeInfo() {
      homeDetail().then((res) => {
        this.homeInfo = res.data.data.homeSetting
        this.$store.commit('SET_HOMEINFO', this.homeInfo)
      })
    },
    toTeacher() {
      this.$router.push('/frontEndLayout/pleaseTeach')
    }
  },
  created() {
    this.getHomeInfo()
  }
}
</script>

<style lang="less">
#frontEnd {
  color: #2c3e50;
  .top{
    background-color: #fff;
    color: #666;
    overflow: hidden;
    width: 1200px;
    margin: 0 auto;
    position: relative;
    .brand{
      height: 6rem;
      width: 30rem;
      background: url('../../assets/logo.png') no-repeat left center;
      background-size: 80%;
      position: absolute;
      left: 1rem;
    }
    @media only screen and (max-width: 768px) {
      .brand{
        width: 18rem
      }
    }
    ul{
      list-style: none;
      overflow: hidden;
      height: 6rem;
      margin: 0px;
      float: right;
      li{
        height: 100%;
        float: left;
        padding: 1.2rem 2rem 1.2rem 4.2rem;
        position: relative;
        i{
          position: absolute;
          top: 1.2rem;
          left: 0;
          font-size: 3.2rem;
        }
        p{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin: 0;
          line-height: 1;
          span:first-child{
            font-size: 1.5rem;
            margin-bottom: 1rem;
          }
          span:last-child{
            font-size: 2rem;
          }
        }
      }
    }
  }
  .navCon{
    background-color: #f7c864;
  }
  header{
    margin-bottom: 0px;
  }
  .am-topbar{
    height: 60px;
    .am-topbar-brand{
      height: 60px;
      line-height: 60px;
    }
    .am-topbar-btn{
      margin-top: 15px;
    }
    .am-btn-primary, .am-btn-primary:focus, .am-btn-primary:hover {
      background-color: #f7c864;
      border-color: #f7c864
    }
    .am-topbar-collapse{
      background-color: #f7c864;
      z-index: 999;
    }
  }
  .am-topbar-inverse {
    background-color: #f7c864;
    border-color: #f7c864;
    color: #eee;
    width: 1200px;
    margin: 0 auto;
    .router-link-exact-active.router-link-active{
      background-color: #302d26;
      color: #f7c864;
    }
    .am-nav-pills>li+li{
      margin-left: 0px;
    }
    .am-topbar-nav>li>a{
      color: #333;
      height: 60px;
      line-height: 60px;
      padding: 0 1.5rem;
      font-size: 1.6rem;
      &::after{
        border-bottom-color: #f7c864
      }
      &:hover, &:focus{
        background-color: #302d26;
        color: #f7c864;
        &::after{
          border-bottom-color: #f7c864
        }
      }
    }
  }
  .show{
    display: none
  }
  @media only screen and (max-width: 768px) {
    .am-topbar-inverse, .top{
      width: 100%;
    }
    .hidden{
      display: none;
    }
    .contact-us{
      position: fixed;
      left: 0px;
      bottom: 0;
      width: 100%;
      height: 8rem;
      background: rgba(0, 0, 0, 0.8);
      padding: 1rem 0;
      .el-col{
        height: 100%;
        position: relative;
        a{
          width: 90%;
          height: 100%;
          margin: 0 auto;
          color: #fff;
          display: block;
          background: #f7c864;
          border-radius: 3rem;
          padding: 0 1rem;
          line-height: 6rem;
          font-size: 2rem;
          .iconfont{
            font-size: 2rem;
          }
          p{
            margin: 0
          }
        }
        &:nth-of-type(1) {
          text-align: center;
        }
        &:nth-of-type(2) {
          text-align: center;
          a{
            line-height: 2rem;
            font-size: 12px;
            padding: 1rem;
          }
        }
        &:nth-of-type(3) {
          text-align: center;
        }
      }
    }
    .show{
      display: block;
    }
    &.showBottom{
      padding-bottom: 8rem;
    }
  }
  .am-slider-default{
    margin-bottom: 32px;
  }
  .am-container{
    max-width: 1200px
  }
  .banner{
    width: 100%;
    padding: 0 1rem 5.6rem;
    text-align: center;
    overflow: hidden;
    &.home{
      background: url('../../assets/webImg/home-banner.jpg') no-repeat center center;
      background-size: cover;
    }
    &.teacher{
      background: url('../../assets/webImg/teacher-banner.jpg') no-repeat center center;
      background-size: cover;
      min-height: 28rem;
    }
    &.student{
      background: url('../../assets/webImg/student-banner.jpg') no-repeat center center;
      background-size: cover;
      min-height: 28rem;
    }
    &.none{
      display: none;
    }
    .animated{
      animation-duration: 1.5s
    }
    h2{
      margin: 0;
      color: #281e09;
      font-size: 3.2rem;
      padding-top: 4.8rem;
      line-height: 3.2rem;
    }
    h3{
      margin: 1rem 0 0;
      color: #281e09;
      font-size: 2.8rem;
      line-height: 4.8rem;
    }
    h4{
      margin: 0;
      color: #564520;
      font-size: 2.4rem;
      line-height: 2.6rem;
    }
    .btn{
      display: inline-block;
      font-size: 1.4rem;
      line-height: 3.2rem;
      padding: 0 4rem;
      border-radius: 2rem;
      background: #f7c864;
      color: #564520;
      cursor: pointer;
      &:hover{
        background-color: #fbce6e
      }
    }
    p{
      margin: 0 0 3.6rem;
      span{
        width: 4px;
        height: 4px;
        transform: rotate(45deg);
        background: #3f3011;
        display: inline-block;
        margin: 0 4px;
      }
    }
  }
  &>.content{
    background: #fffaee;
    min-height: 20rem;
    &>div{
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
}
</style>
