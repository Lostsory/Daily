<template>
  <div id="home" cla>
    <div class="register showMobile" v-if="mainCon.register">
      <Titlecomp :content='mainCon.register' color="#fff" />
      <el-row>
        <el-col :span="12">
          <div class="content" @click="$router.push('/frontEndLayout/pleaseTeach')">
            <p><i class="iconfont icon-jiaoshi"></i></p>
            <p>请家教</p>
            <p>{{mainCon.register.studentDesc}}</p>
            <p><a style="color: #f7c864">精准匹配 ></a></p>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="content" style="background: #f7c864" @click="$router.push('/frontEndLayout/doTeach')">
            <p><i class="iconfont icon-jiaoshi1"></i></p>
            <p>做家教</p>
            <p>{{mainCon.register.teacherDesc}}</p>
            <p><a style="color: #fff">展现自我 ></a></p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="introduction">
      <Titlecomp :content='mainCon.introduction' />
      <el-row>
        <el-col :sm="8" :xs="12">
          <div class="temp">
            <span class="icon">
              <i class="iconfont icon-kaifaguifan"></i>
            </span>
            <p>教学规范</p>
            <p>科学严谨的教学规范,多年整理总结</p>
          </div>
        </el-col>
        <el-col :sm="8" :xs="12">
          <div class="temp">
            <span class="icon">
              <i class="iconfont icon-jiaoyan"></i>
            </span>
            <p>教研力量</p>
            <p>丰富经验的教研力量,多年一线经验</p>
          </div>
        </el-col>
        <el-col :sm="8" :xs="12">
          <div class="temp">
            <span class="icon">
              <i class="iconfont icon-suoshujiaoyanzu"></i>
            </span>
            <p>教务人员</p>
            <p>多年经验的教务人员,带来贴心服务</p>
            </div>
        </el-col>
        <el-col :sm="8" :xs="12">
          <div class="temp">
            <span class="icon">
              <i class="iconfont icon-neirong"></i>
            </span>
            <p>内容全面</p>
            <p>全方位的教学内容,总有一项适合你</p>
          </div>
        </el-col>
        <el-col :sm="8" :xs="12">
          <div class="temp">
            <span class="icon">
              <i class="iconfont icon-shenhe"></i>
            </span>
            <p>严格审核</p>
            <p>规范缜密的细致审核,严格把控环节</p>
          </div>
        </el-col>
        <el-col :sm="8" :xs="12">
          <div class="temp">
            <span class="icon">
              <i class="iconfont icon-baomi"></i>
            </span>
            <p>信息保密</p>
            <p>安全严格的保密系统,免除一切泄露</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="register hideMobile" v-if="mainCon.register ">
      <Titlecomp :content='mainCon.register' color="#fff" />
      <el-row>
        <el-col :span="12"> 
          <div class="content" @click="$router.push('/frontEndLayout/pleaseTeach')">
            <p><i class="iconfont icon-jiaoshi"></i></p>
            <p>请家教</p>
            <p>{{mainCon.register.studentDesc}}</p>
            <p><a style="color: #f7c864">精准匹配 ></a></p>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="content" style="background: #f7c864" @click="$router.push('/frontEndLayout/doTeach')">
            <p><i class="iconfont icon-jiaoshi1"></i></p>
            <p>做家教</p>
            <p>{{mainCon.register.teacherDesc}}</p>
            <p><a style="color: #fff">展现自我 ></a></p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="students" v-if="students">
      <Titlecomp :content='mainCon.students' />
      <el-row>
        <el-col v-for="(item, index) in students" :key="index" :sm="4" :xs="12">
          <div class="temp" @click="studentDetail(item)">
            <img src="../../assets/webImg/default-student.jpg" alt="">
            <div class="con">
              <p>{{item.name}}</p>
              <p>{{item.gradeName}} | {{item.subjects}}</p>
              <p>{{item.remark}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="success">
      <p class="title">改变从今天开始，你还等什么</p>
      <el-row>
        <el-col :sm="8" :xs="24">成功接洽：<span class="num">123123</span>对</el-col>
        <el-col :sm="8" :xs="24">学员数：<span class="num">123123</span>名</el-col>
        <el-col :sm="8" :xs="24">教师数：<span class="num">123123</span>名</el-col>
      </el-row>
    </div>
    <!-- <div class="teachers">
      <Titlecomp :content='mainCon.teachers' />
    </div> -->
    <div class="teachers students" v-if="teachers">
      <Titlecomp :content='mainCon.teachers' />
      <el-row>
        <el-col v-for="(item, index) in teachers" :key="index" :sm="6" :xs="12">
          <div class="temp" @click="teacherDetail(item)">
            <img src="../../assets/webImg/default-teacher.jpg" alt="">
            <div class="con">
              <p>{{item.name}}</p>
              <p>教龄<span>{{item.teachTime}}</span>年 | {{item.finishSchool}}</p>
              <p>{{item.remark}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Titlecomp from '@/components/Title'
import { homeStudents, homeTeachers } from '@/api'
import { mapGetters } from 'vuex'
export default {
  components: {
    Titlecomp
  },
  data() {
    return {
      // 学院推荐
      students: [],
      teachers: []
    }
  },
  computed: {
    ...mapGetters({
      mainCon: 'homeInfo'
    })
  },
  methods: {
    getStudent() {
      homeStudents().then((res) => {
        this.students = res.data.data
      })
    },
    getTeachers() {
      homeTeachers().then((res) => {
        this.teachers = res.data.data
      })
    },
    studentDetail(val) {
      // this.$router.push({ path: '/frontEndLayout/studentDetail', query: { d: val._id }})
    },
    teacherDetail(val) {
      this.$router.push({ path: '/frontEndLayout/teacherDetail', query: { d: val._id }})
    }
  },
  created() {
    this.$store.commit('SET_ACTIVEROUTER', '/frontEndLayout/home')
    this.getStudent()
    this.getTeachers()
  }
}
</script>
<style lang="less">
#home{
  .el-col{
    padding: 0 10px;
  }
  p{
    margin: 0px;
  }
  .introduction{
    background: #fbfbfb;
    .el-row{
      width: 800px;
      margin: 3.6rem auto 0;
      .el-col{
        overflow: hidden;
        margin-bottom: 3.2rem;
        cursor: pointer;
        .temp{
          margin: 0px auto;
          padding: 0 1rem 0 6.4rem;
          position: relative;
        }
        .icon{
          display: block;
          width: 5.4rem;
          height: 5.4rem;
          text-align: center;
          line-height: 5.6rem;
          border-radius: 50%;
          border: 1px solid #f7c864;
          position: absolute;
          top: 1rem;
          left: 0;
          transition: all 300ms ease;
          .iconfont{
            font-size: 3.2rem;
            color: #f7c864
          }
        }
        p:first-of-type{
          color: #333;
          font-size: 1.6rem;
          line-height: 3.6rem;
        }
        p:last-of-type{
          color: #666;
          font-size: 12px;
          line-height: 1.6rem;
          height: 3.2rem;
          overflow:hidden;
          text-overflow:ellipsis;
        }
        @media only screen and (max-width: 768px) {
          p:last-of-type{
            height: 4.8rem;
            overflow:hidden;
            text-overflow:ellipsis;
          }
        }
        &:hover{
          .icon{
            background: #f7c864;
            .iconfont{
              color: #fff
            }
          }
        }
      }
      
    }
  }
  .register{
    width: 100%;
    padding-bottom: 4rem;
    background: url('../../assets//webImg/home-regiser.jpg') center center;
    overflow: hidden;
    .el-row{
      width: 1200px;
      margin: 0px auto;
    }
    .el-col{
      position: relative;
      height: 240px;
      .content{
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 240px;
        height: 240px;
        border-radius: 50%;
        text-align: center;
        background-color: #fff;
        transition: all 300ms ease;
        padding: 18px 0;
        box-sizing: border-box;
        /* &:hover{
          background: #f7c864
        } */
        p:nth-of-type(2){
          color: #333;
          font-size: 24px;
          margin-bottom: 8px;
        }
        p:nth-of-type(3){
          color: #666;
          font-size: 14px;
          margin: 0 auto 12px;
          width: 70%;
        }
        @media only screen and (max-width: 768px) {
          p:nth-of-type(3){
            font-size: 12px;
            width: 35%;
          }
        }
        p:nth-of-type(4){
          position: absolute;
          bottom: 24px;
          width: 100%;
        }
        .iconfont{
          color: #f7c864;
          font-size: 48px;
          &.icon-jiaoshi1{
            color: #fff
          }
        }
        a:hover{
          text-decoration: underline
        }
      }
    }
  }
  .students{
    padding-bottom: 3rem;
    text-align: center;
    width: 1200px;
    margin: 0px auto;
    .el-row{
      font-size: 1.2rem;
      color: #666;
      .temp{
        border-radius: 4px;
        background: #fff;
        transition: all 300ms ease;
        border: 1px solid #e9e9e9;
        overflow: hidden;
        cursor: pointer;
        margin-bottom: 2rem;
        &:hover{
          transform: scale(1.1)
        }
        img{
          width: 100%;
        }
        .con{
          padding: 0.5rem 1rem;
          p:nth-of-type(1){
            font-size: 1.6rem;
            color: #333;
            line-height: 2rem;
          }
          p:nth-of-type(2){
            line-height: 1.8rem;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            span{
              color: #f7c864;
              font-size: 2rem;
              font-weight: 600;
            }
          }
          p:nth-of-type(3){
            color: #999;
            line-height: 1.6rem;
            height: 6.4rem;
            overflow:hidden;
            text-overflow:ellipsis;
          }
        }
      }
    }
  }
  .success{
    background: url('../../assets/webImg/home-success.jpg') no-repeat center center;
    background-size: cover;
    text-align: center;
    color: #fff;
    padding: 3.2rem 0 4.8rem;
    p.title{
      font-size: 2.4rem;
    }
    .el-row{
      margin: 3.6rem auto 0;
      width: 1200px;
      .el-col{
        font-size: 2rem;
        .num{
          margin: 0 3rem;
          color: #f7c864
        }
      }
    }
  }
  .teachers{
    width: 1000px;
  }
  .showMobile{
    display: none
  }
  .hideMobile{
    display: block
  }
  @media only screen and (max-width: 768px) {
    .introduction, .register, .students, .success{
      width: 100%;
      .el-row{
        width: 100%;
      }
    }
    .showMobile{
      display: block
    }
    .hideMobile{
      display: none
    }
  }
}
</style>
